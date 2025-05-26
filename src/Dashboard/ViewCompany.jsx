import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCompaniesData,
  companyReset,
  deleteCompanyData,
} from "../features/company/companySlice";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axios from "axios";

// Retrieve token from Redux state or localStorage
const getAuthToken = (state) =>
  state.auth?.token || localStorage.getItem("token");

const StatusBadge = ({ status }) => {
  const isActive = status === "Active";
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full mr-1 ${
          isActive ? "bg-green-600" : "bg-gray-500"
        }`}
      ></span>
      {status}
    </span>
  );
};

const ViewCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companys, companyLoading, companyError, companyMessage } =
    useSelector((state) => state.company || {});
  const token = useSelector(getAuthToken);

  const [editableCompanys, setEditableCompanys] = useState([]);

  useEffect(() => {
    dispatch(companyReset());
    dispatch(getAllCompaniesData());

    return () => {
      dispatch(companyReset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (companys && companys.length > 0) {
      setEditableCompanys([...companys]);
    }
  }, [companys]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCompanyData(id)).unwrap();
      dispatch(getAllCompaniesData());
      toast.success("Company deleted successfully!", {
        toastId: `delete-company-success-${id}`,
      });
    } catch (error) {
      toast.error(error || "Failed to delete company", {
        toastId: `delete-company-error-${id}`,
      });
    }
  };

  const handleCompanyClick = (companyId) => {
    dispatch(companyReset());
    setTimeout(() => {
      navigate(`/ViewEmployees/${companyId}`, { replace: true });
    }, 300);
  };

  const handleEditCompany = (companyId) => {
    console.log("Edit Company clicked for companyId:", companyId);
    dispatch(companyReset());
    setTimeout(() => {
      navigate(`/EditCompany/${companyId}`, { replace: true });
    }, 300);
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Map Excel data to company schema
        const importedCompanys = jsonData.map((row) => ({
          _id: row.ID || undefined,
          company_name: row["Company Name"] || "",
          company_email: row["Email address"] || "",
          company_number: row.Phone || "",
          company_city: row.City || "",
          company_country: row.Country || "",
          company_department: row.Department || "Default Department",
          company_job_title: row["Job Title"] || "Default Title",
          company_industry_type: row["Industry Type"] || "Default Industry",
          company_state: row.State || "Default State",
          company_zip_code: row["Zip Code"] || "00000",
        }));

        // Validate imported data
        const validCompanys = importedCompanys.filter((company) =>
          Object.values(company).every(
            (value) => value !== "" && value !== undefined && value !== null
          )
        );

        if (validCompanys.length === 0) {
          toast.error("No valid company data found in the Excel file.");
          return;
        }

        // Merge imported data with existing data
        const mergedCompanys = [...editableCompanys];
        validCompanys.forEach((imported) => {
          const index = mergedCompanys.findIndex((c) => c._id === imported._id);
          if (index !== -1) {
            mergedCompanys[index] = { ...mergedCompanys[index], ...imported };
          } else {
            mergedCompanys.push(imported);
          }
        });

        setEditableCompanys(mergedCompanys);
        await handleSave(mergedCompanys);
      } catch (error) {
        toast.error("Failed to import data: " + error.message);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSave = async (companiesToSave = editableCompanys) => {
    if (!companiesToSave.length) {
      toast.error("No companies to save.");
      return;
    }

    if (!token) {
      toast.error("Authentication token missing. Please log in again.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3001/api/company/bulk-update-companys",
        companiesToSave,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(getAllCompaniesData());
      toast.success(response.data.message || "Changes saved successfully!");
      if (response.data.errors && response.data.errors.length > 0) {
        response.data.errors.forEach((error) => {
          toast.error(`Error for ${error.company}: ${error.error}`);
        });
      }
    } catch (error) {
      console.error("Save error:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || error.message;
      const errorDetails = error.response?.data?.errors || [];
      toast.error(`Failed to save changes: ${errorMessage}`);
      errorDetails.forEach((error) => {
        toast.error(`Error for ${error.company}: ${error.error}`);
      });
    }
  };

  const handleExport = () => {
    const exportData = editableCompanys.map((c) => ({
      ID: c._id,
      "Company Name": c.company_name,
      "Email address": c.company_email,
      Phone: c.company_number,
      City: c.company_city,
      Country: c.company_country,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Companys");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Companys.xlsx");
    toast.success("Data exported successfully!");
  };

  if (companyLoading) {
    return <div className="p-6 text-center">Loading companies...</div>;
  }

  if (companyError) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: {companyMessage || "Failed to load companies"}
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#FAFAFA] min-h-screen w-[80%] absolute top-20 right-0 float-right">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Company Menu</h2>
        <div className="space-x-2 flex">
          <label className="px-4 py-2 bg-[#6461fc] text-white rounded-full flex gap-1 items-center cursor-pointer">
            <HiDownload /> Import
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-600 text-white rounded-full"
          >
            Save Changes
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-teal-600 text-white rounded-full"
          >
            Export to Excel
          </button>
          <Link
            to="/Addcompany"
            onClick={() => dispatch(companyReset())}
            className="px-4 py-[.6rem] bg-green-600 text-white rounded-full"
          >
            Add new Company
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 text-gray-600 text-sm">
            <tr>
              <th className="px-6 py-3 text-left font-medium">ID</th>
              <th className="px-6 py-3 text-left font-medium">Company Name</th>
              <th className="px-6 py-3 text-left font-medium">Email address</th>
              <th className="px-6 py-3 text-left font-medium">Phone</th>
              <th className="px-6 py-3 text-left font-medium">City</th>
              <th className="px-6 py-3 text-left font-medium">Country</th>
              <th className="px-6 py-3 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm divide-y divide-gray-100">
            {companys && companys.length > 0 ? (
              companys.map((c) => (
                <tr
                  key={c._id}
                  onClick={() => handleCompanyClick(c._id)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <td className="px-6 py-4">{c._id}</td>
                  <td className="px-6 py-4">{c.company_name}</td>
                  <td className="px-6 py-4">{c.company_email}</td>
                  <td className="px-6 py-4">{c.company_number}</td>
                  <td className="px-6 py-4">{c.company_city}</td>
                  <td className="px-6 py-4">{c.company_country}</td>
                  <td className="px-6 py-4 flex space-x-2 text-gray-500">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(c._id);
                      }}
                      className="bg-orange-100 p-2 rounded-md hover:text-gray-700"
                    >
                      <FaTrash size={14} />
                    </button>
                    <button className="bg-orange-100 p-2 rounded-md hover:text-gray-700">
                      <FaEye size={14} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditCompany(c._id);
                      }}
                      className="bg-orange-100 p-2 rounded-md hover:text-gray-700"
                    >
                      <FaEdit size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">
                  No companies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md">
          Previous
        </button>
        <div className="flex space-x-1">
          {[1, 2, 3, "...", 8, 9, 10].map((page, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded-md ${
                page === 1
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md">
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewCompany;
