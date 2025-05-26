import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCompanyData,
  companyReset,
} from "../features/company/companySlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditCompany = () => {
  const { companyId } = useParams();
  const [formData, setFormData] = useState({
    company_name: "",
    company_email: "",
    company_number: "",
    company_department: "",
    company_job_title: "",
    company_industry_type: "",
    company_country: "",
    company_state: "",
    company_city: "",
    company_zip_code: "",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    company_name,
    company_email,
    company_number,
    company_department,
    company_job_title,
    company_industry_type,
    company_country,
    company_state,
    company_city,
    company_zip_code,
  } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    companys,
    companyLoading,
    companyError,
    companySuccess,
    companyMessage,
  } = useSelector((state) => {
    console.log("EditCompany Redux state:", state.company);
    return state.company || {};
  });

  useEffect(() => {
    console.log("EditCompany mounting, resetting state");
    dispatch(companyReset());
    const company = companys?.find((c) => c._id === companyId);
    if (company) {
      setFormData({
        company_name: company.company_name,
        company_email: company.company_email,
        company_number: company.company_number,
        company_department: company.company_department,
        company_job_title: company.company_job_title,
        company_industry_type: company.company_industry_type,
        company_country: company.company_country,
        company_state: company.company_state,
        company_city: company.company_city,
        company_zip_code: company.company_zip_code,
      });
    }
  }, [dispatch, companys, companyId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !company_name ||
      !company_email ||
      !company_number ||
      !company_department ||
      !company_job_title ||
      !company_industry_type ||
      !company_country ||
      !company_state ||
      !company_city ||
      !company_zip_code
    ) {
      toast.error("Please fill in all fields", {
        toastId: "edit-company-error",
      });
      return;
    }
    setHasSubmitted(true);
    console.log(
      "Submitting updated company data:",
      formData,
      "for companyId:",
      companyId
    );
    try {
      await dispatch(
        updateCompanyData({ companyId, companyData: formData })
      ).unwrap();
    } catch (error) {
      console.error("Update company error:", error);
      toast.error(error || "Failed to update company", {
        toastId: "edit-company-error",
      });
      setHasSubmitted(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      company_name: "",
      company_email: "",
      company_number: "",
      company_department: "",
      company_job_title: "",
      company_industry_type: "",
      company_country: "",
      company_state: "",
      company_city: "",
      company_zip_code: "",
    });
    dispatch(companyReset());
    navigate("/ViewCompany", { replace: true });
  };

  useEffect(() => {
    console.log(
      "companySuccess changed:",
      companySuccess,
      "hasSubmitted:",
      hasSubmitted
    );
    if (companyError && hasSubmitted) {
      toast.error(companyMessage, { toastId: "edit-company-error" });
      dispatch(companyReset());
      setHasSubmitted(false);
    }
    if (companySuccess && hasSubmitted) {
      toast.success("Company updated successfully!", {
        toastId: `edit-company-success-${companyId}`,
      });
      dispatch(companyReset());
      setFormData({
        company_name: "",
        company_email: "",
        company_number: "",
        company_department: "",
        company_job_title: "",
        company_industry_type: "",
        company_country: "",
        company_state: "",
        company_city: "",
        company_zip_code: "",
      });
      setHasSubmitted(false);
      setTimeout(() => {
        navigate("/ViewCompany", { replace: true });
      }, 300);
    }
  }, [
    companyError,
    companySuccess,
    companyMessage,
    dispatch,
    navigate,
    companyId,
    hasSubmitted,
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center gap-10 absolute top-20 right-0 w-[80%]">
      <h2 className="text-2xl font-bold mb-6">Edit Company</h2>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 mt-10 pt-20 relative">
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          <div className="rounded-full bg-gray-300 w-40 h-40 flex items-center justify-center shadow-md">
            <img
              src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              alt="Company Icon"
              className="w-20 h-20/2 object-contain rounded-full"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Company Name
              </label>
              <input
                type="text"
                name="company_name"
                value={company_name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                name="company_email"
                value={company_email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Phone Number
              </label>
              <input
                type="text"
                name="company_number"
                value={company_number}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Department
              </label>
              <input
                type="text"
                name="company_department"
                value={company_department}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Job Title
              </label>
              <input
                type="text"
                name="company_job_title"
                value={company_job_title}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Industry Type
              </label>
              <input
                type="text"
                name="company_industry_type"
                value={company_industry_type}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Country</label>
              <input
                type="text"
                name="company_country"
                value={company_country}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">State</label>
              <input
                type="text"
                name="company_state"
                value={company_state}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">City</label>
              <input
                type="text"
                name="company_city"
                value={company_city}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Zip Code</label>
              <input
                type="text"
                name="company_zip_code"
                value={company_zip_code}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-black text-white w-full px-6 py-2 rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border border-black w-full px-6 py-2 rounded-full"
              disabled={companyLoading}
            >
              {companyLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompany;
