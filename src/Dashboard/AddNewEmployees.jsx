import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployeeData,
  companyReset,
} from "../features/company/companySlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const AddNewEmployees = () => {
  const { companyId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    job_title: "",
    country: "",
    status: "Active",
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { name, email, phone, department, job_title, country, status } =
    formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employeeLoading, employeeError, employeeSuccess, employeeMessage } =
    useSelector((state) => {
      console.log("AddNewEmployees Redux state:", state.company);
      return state.company || {};
    });

  useEffect(() => {
    console.log(
      "AddNewEmployees mounting, resetting state. Current employeeSuccess:",
      employeeSuccess
    );
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
      !name ||
      !email ||
      !phone ||
      !department ||
      !job_title ||
      !country ||
      !status
    ) {
      toast.error("Please fill in all fields", {
        toastId: "add-employee-error",
      });
      return;
    }
    setHasSubmitted(true);
    console.log(
      "Submitting employee data:",
      formData,
      "for companyId:",
      companyId
    );
    try {
      await dispatch(
        addEmployeeData({ companyId, employeeData: formData })
      ).unwrap();
    } catch (error) {
      console.error("Add employee error:", error);
      toast.error(error || "Failed to add employee", {
        toastId: "add-employee-error",
      });
      setHasSubmitted(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      job_title: "",
      country: "",
      status: "Active",
    });
    dispatch(companyReset());
    navigate(`/ViewEmployees/${companyId}`, { replace: true });
  };

  useEffect(() => {
    console.log(
      "employeeSuccess changed:",
      employeeSuccess,
      "hasSubmitted:",
      hasSubmitted
    );
    if (employeeError && hasSubmitted) {
      toast.error(employeeMessage, { toastId: "add-employee-error" });
      dispatch(companyReset());
      setHasSubmitted(false);
    }
    if (employeeSuccess && hasSubmitted) {
      toast.success("Employee added successfully!", {
        toastId: `add-employee-success-${companyId}`,
      });
      dispatch(companyReset());
      setFormData({
        name: "",
        email: "",
        phone: "",
        department: "",
        job_title: "",
        country: "",
        status: "Active",
      });
      setHasSubmitted(false);
      setTimeout(() => {
        navigate(`/ViewEmployees/${companyId}`, { replace: true });
      }, 300);
    }
  }, [
    employeeError,
    employeeSuccess,
    employeeMessage,
    dispatch,
    navigate,
    companyId,
    hasSubmitted,
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center gap-10 absolute top-20 right-0 w-[80%]">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 mt-10 pt-20 relative">
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
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Phone</label>
              <input
                type="text"
                name="phone"
                value={phone}
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
                name="department"
                value={department}
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
                name="job_title"
                value={job_title}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Country</label>
              <input
                type="text"
                name="country"
                value={country}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Status</label>
              <select
                name="status"
                value={status}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded-full"
                required
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
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
              disabled={employeeLoading}
            >
              {employeeLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewEmployees;
