import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCompanyData, companyReset } from "../features/company/companySlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCompany = () => {
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

  const companyState = useSelector((state) => state.company || {});
  const {
    companyLoading = false,
    companyError = false,
    companySuccess = false,
    companyMessage = "",
  } = companyState;

  useEffect(() => {
    dispatch(companyReset());
  }, [dispatch]);

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
        toastId: "add-company-error",
      });
      return;
    }
    console.log("Submitting form data:", formData);
    try {
      const result = await dispatch(addCompanyData(formData)).unwrap();
      console.log("API response:", result);
    } catch (error) {
      console.error("Add company error:", error);
      toast.error(error || "Failed to add company", {
        toastId: "add-company-error",
      });
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
    navigate("/ViewCompany");
  };

  useEffect(() => {
    if (companyError) {
      toast.error(companyMessage, { toastId: "add-company-error" });
      dispatch(companyReset());
    }
    if (companySuccess) {
      toast.success("Company added successfully!", {
        toastId: "add-company-success",
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
      navigate("/ViewCompany");
    }
  }, [companyError, companySuccess, companyMessage, dispatch, navigate]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center gap-10 absolute top-20 right-0 w-[80%]">
      <h2 className="text-xl font-semibold mb-6 mt-2">Add Company</h2>

      <div className="bg-white rounded-2xl shadow-md mt-9 w-full max-w-3xl p-8 pt-20 relative">
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          <div className="rounded-full bg-gray-300 w-40 h-40 flex items-center justify-center shadow-md">
            <img
              src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
              alt="User Icon"
              className="w-20 h-20 object-contain rounded-full"
            />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 mt-9 gap-4">
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
              <label className="block mb-1 text-sm font-medium">
                Company Email
              </label>
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
                Company Phone
              </label>
              <input
                type="number"
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
              className="bg-black text-white px-6 w-full py-2 rounded-full"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border border-[#000000] w-full px-6 py-2 rounded-full"
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

export default AddCompany;
