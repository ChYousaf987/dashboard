// frontend/src/Dashboard/AddNewPartner.js (updated)
import React, { useState, useEffect } from "react";
import { FaShareAlt, FaCopy } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addPartnerData,
  partnerReset,
} from "../features/partners/partnerSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddNewPartner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { partnerLoading, partnerError, partnerSuccess, partnerMessage } =
    useSelector((state) => state.partner || {});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    job_title: "",
    status: "Active",
    commission: "",
    total_payout: "",
    affiliate_link: "www.kuicktag.com/?ref=affiliate123",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addPartnerData(formData)).unwrap();
      toast.success("Partner added successfully!");
      setTimeout(() => {
        navigate("/ViewPartners", { replace: true });
      }, 1000);
    } catch (error) {
      toast.error(error || "Failed to add partner");
    }
  };

  useEffect(() => {
    if (partnerSuccess) {
      dispatch(partnerReset());
    }
  }, [partnerSuccess, dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen absolute top-20 right-0 w-[80%]">
      <h2 className="text-2xl font-semibold mb-6 mt-2">
        Add New Partners MENU
      </h2>
      <div className="flex flex-col items-center gap-10">
        {/* Partner Info Form */}
        <div className="bg-white rounded-2xl shadow-md w-full max-w-3xl p-8 mt-9 pt-20 relative">
          {/* Custom User Icon */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
            <div className="rounded-full bg-gray-300 w-40 h-40 flex items-center justify-center shadow-md">
              <img
                src="https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
                alt="User Icon"
                className="w-20 h-20 object-contain rounded-full"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-8">
            {/* Form Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  First & Last Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
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
                  value={formData.email}
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
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
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
                  value={formData.job_title}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-full"
                  required
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Commission (%)
                </label>
                <input
                  type="number"
                  name="commission"
                  value={formData.commission}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-full"
                  placeholder="e.g., 95%"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Total Payout
                </label>
                <input
                  type="number"
                  name="total_payout"
                  value={formData.total_payout}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-full"
                  placeholder="e.g., $1,878.50"
                  required
                />
              </div>
            </div>

            {/* Affiliate Link Section */}
            <div className="mt-6">
              <label className="block mb-1 text-sm font-medium">
                Your affiliate link
              </label>
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-100">
                <input
                  type="text"
                  name="affiliate_link"
                  value={formData.affiliate_link}
                  onChange={handleChange}
                  className="bg-transparent flex-grow outline-none text-sm"
                />
                <FaShareAlt className="text-gray-600 cursor-pointer mx-2" />
                <FaCopy className="text-gray-600 cursor-pointer" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/ViewPartners")}
                className="bg-black w-full text-white px-6 py-2 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={partnerLoading}
                className="border w-full border-black px-6 py-2 rounded-full"
              >
                {partnerLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>

          {partnerError && (
            <div className="text-red-500 text-center mt-4">
              Error: {partnerMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNewPartner;
