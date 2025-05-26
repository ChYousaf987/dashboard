import React, { useState, useEffect } from "react";
import { FaShareAlt, FaCopy } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCustomerData,
  customerReset,
  getCustomerData,
} from "../features/customers/customerSlice";
import { getAllCompaniesData } from "../features/company/companySlice";
import { getPartnerData } from "../features/partners/partnerSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditCustomer = () => {
  const { customerId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    customers,
    customerLoading,
    customerError,
    customerSuccess,
    customerMessage,
  } = useSelector((state) => state.customer || {});
  const { companys } = useSelector((state) => state.company || {});
  const { partners } = useSelector((state) => state.partner || {});

  const [formData, setFormData] = useState({
    company: "",
    partner: "",
    company_name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    customer_name: "",
    status: "Active",
    youtube_link: "www.kuicktag.com/?ref=affiliate123",
  });

  useEffect(() => {
    dispatch(getCustomerData());
    dispatch(getAllCompaniesData());
    dispatch(getPartnerData());
  }, [dispatch]);

  useEffect(() => {
    const customer = customers.find((c) => c._id === customerId);
    if (customer) {
      setFormData({
        company: customer.company._id,
        partner: customer.partner._id,
        company_name: customer.company_name,
        email: customer.email,
        phone: customer.phone,
        country: customer.country,
        city: customer.city,
        customer_name: customer.customer_name,
        status: customer.status,
        youtube_link: customer.youtube_link,
      });
    }
  }, [customers, customerId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateCustomerData({ customerId, customerData: formData })
      ).unwrap();
      toast.success("Customer updated successfully!");
      setTimeout(() => {
        navigate("/customers", { replace: true });
      }, 1000);
    } catch (error) {
      toast.error(error || "Failed to update customer");
    }
  };

  useEffect(() => {
    if (customerSuccess) {
      dispatch(customerReset());
    }
  }, [customerSuccess, dispatch]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen absolute top-20 right-0 w-[80%]">
      <h2 className="text-2xl font-semibold mb-6 mt-2">Edit Customer</h2>
      <div className="flex flex-col items-center gap-10">
        <div className="bg-white rounded-2xl shadow-md w-full max-w-3xl p-8 mt-9 pt-20 relative">
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Company
                </label>
                <select
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-full"
                  required
                >
                  <option value="">Select Company</option>
                  {companys.map((comp) => (
                    <option key={comp._id} value={comp._id}>
                      {comp.company_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Partner
                </label>
                <select
                  name="partner"
                  value={formData.partner}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-full"
                  required
                >
                  <option value="">Select Partner</option>
                  {partners.map((part) => (
                    <option key={part._id} value={part._id}>
                      {part.name}
                    </option>
                  ))}
                </select>
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
                  Customer Name
                </label>
                <input
                  type="text"
                  name="customer_name"
                  value={formData.customer_name}
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
            </div>

            <div className="mt-6">
              <label className="block mb-1 text-sm font-medium">
                YouTube video intro
              </label>
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-100">
                <input
                  type="text"
                  name="youtube_link"
                  value={formData.youtube_link}
                  onChange={handleChange}
                  className="bg-transparent flex-grow outline-none text-sm"
                />
                <FaShareAlt className="text-gray-600 cursor-pointer mx-2" />
                <FaCopy className="text-gray-600 cursor-pointer" />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => navigate("/customers")}
                className="bg-black w-full text-white px-6 py-2 rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={customerLoading}
                className="border w-full border-black px-6 py-2 rounded-full"
              >
                {customerLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>

          {customerError && (
            <div className="text-red-500 text-center mt-4">
              Error: {customerMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
