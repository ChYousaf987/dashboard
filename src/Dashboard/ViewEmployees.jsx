import React, { useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployeesByCompanyData,
  companyReset,
  deleteEmployeeData,
} from "../features/company/companySlice";
import { toast } from "react-toastify";

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

const ViewEmployees = () => {
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    employees,
    employeeLoading,
    employeeError,
    employeeMessage,
    employeeSuccess,
  } = useSelector((state) => {
    console.log("ViewEmployees Redux state:", state.company);
    return state.company || {};
  });

  useEffect(() => {
    console.log(
      "ViewEmployees mounting, resetting state, employeeSuccess:",
      employeeSuccess
    );
    dispatch(companyReset());
    dispatch(getEmployeesByCompanyData(companyId));

    return () => {
      console.log("ViewEmployees unmounting, resetting state");
      dispatch(companyReset());
    };
  }, [dispatch, companyId]);

  const handleAddEmployeeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(
      "Add New Employee clicked, resetting state and navigating to /AddNewEmployees for companyId:",
      companyId
    );
    dispatch(companyReset());
    setTimeout(() => {
      navigate(`/AddNewEmployees/${companyId}`, { replace: true });
    }, 300);
  };

  const handleEditEmployee = (employeeId) => {
    console.log("Edit Employee clicked for employeeId:", employeeId);
    dispatch(companyReset());
    setTimeout(() => {
      navigate(`/EditEmployee/${companyId}/${employeeId}`, { replace: true });
    }, 300);
  };

  const handleDeleteEmployee = async (employeeId) => {
    try {
      await dispatch(deleteEmployeeData(employeeId)).unwrap();
      toast.success("Employee deleted successfully!", {
        toastId: `delete-employee-success-${employeeId}`,
      });
      dispatch(getEmployeesByCompanyData(companyId));
    } catch (error) {
      toast.error(error || "Failed to delete employee", {
        toastId: `delete-employee-error-${employeeId}`,
      });
    }
  };

  if (employeeLoading) {
    return <div className="p-6 text-center">Loading employees...</div>;
  }

  if (employeeError) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: {employeeMessage || "Failed to load employees"}
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#FAFAFA] min-h-screen w-[80%] absolute top-20 right-0 float-right">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Employees List</h2>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-full">
            Import
          </button>
          <button
            onClick={handleAddEmployeeClick}
            className="px-4 py-[.6rem] bg-green-600 text-white rounded-full"
          >
            Add New Employee
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-6 py-3 text-left font-medium">ID</th>
              <th className="px-6 py-3 text-left font-medium">Company Name</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
              <th className="px-6 py-3 text-left font-medium">Employee Name</th>
              <th className="px-6 py-3 text-left font-medium">Email address</th>
              <th className="px-6 py-3 text-left font-medium">Country</th>
              <th className="px-6 py-3 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm divide-y divide-gray-100">
            {employees && employees.length > 0 ? (
              employees.map((e) => (
                <tr key={e._id}>
                  <td className="px-6 py-4">{e._id}</td>
                  <td className="px-6 py-4">
                    {e.company?.company_name || "Unknown"}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{e.name}</td>
                  <td className="px-6 py-4">{e.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{e.country}</td>
                  <td className="px-6 py-4 flex space-x-2 text-gray-500">
                    <button
                      onClick={() => handleDeleteEmployee(e._id)}
                      className="bg-orange-100 p-2 rounded-md hover:text-gray-700"
                    >
                      <FaTrash size={14} />
                    </button>
                    <button className="bg-orange-100 p-2 rounded-md hover:text-gray-700">
                      <FaEye size={14} />
                    </button>
                    <button
                      onClick={() => handleEditEmployee(e._id)}
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
                  No employees found for this company
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

export default ViewEmployees;
