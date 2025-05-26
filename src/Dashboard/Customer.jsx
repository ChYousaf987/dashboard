import React, { useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerData,
  customerReset,
  deleteCustomerData,
} from "../features/customers/customerSlice";
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

const Customer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customers, customerLoading, customerError, customerMessage } =
    useSelector((state) => state.customer || {});

  useEffect(() => {
    dispatch(customerReset());
    dispatch(getCustomerData());

    return () => {
      dispatch(customerReset());
    };
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCustomerData(id)).unwrap();
      dispatch(getCustomerData());
      toast.success("Customer deleted successfully!", {
        toastId: `delete-customer-success-${id}`,
      });
    } catch (error) {
      toast.error(error || "Failed to delete customer", {
        toastId: `delete-customer-error-${id}`,
      });
    }
  };

  const handleEditCustomer = (customerId) => {
    console.log("Edit Customer clicked for customerId:", customerId);
    dispatch(customerReset());
    setTimeout(() => {
      navigate(`/EditCustomer/${customerId}`, { replace: true });
    }, 300);
  };

  if (customerLoading) {
    return <div className="p-6 text-center">Loading customers...</div>;
  }

  if (customerError) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: {customerMessage || "Failed to load customers"}
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#FAFAFA] min-h-screen w-[80%] absolute top-20 right-0 float-right">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Customers</h2>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-full">
            View Customers
          </button>
          <Link
            to="/Addcustomers"
            className="px-4 py-[.6rem] bg-green-600 text-white rounded-full"
          >
            Add new Customer
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-6 py-3 text-left font-medium">ID</th>
              <th className="px-6 py-3 text-left font-medium">Company Name</th>
              <th className="px-6 py-3 text-left font-medium">Status</th>
              <th className="px-6 py-3 text-left font-medium">Customer Name</th>
              <th className="px-6 py-3 text-left font-medium">Email address</th>
              <th className="px-6 py-3 text-left font-medium">Partner</th>
              <th className="px-6 py-3 text-left font-medium">Country</th>
              <th className="px-6 py-3 text-left font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm divide-y divide-gray-100">
            {customers && customers.length > 0 ? (
              customers.map((c) => (
                <tr key={c._id}>
                  <td className="px-6 py-4">{c._id}</td>
                  <td className="px-6 py-4">
                    {c.company?.company_name || c.company_name || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {c.customer_name}
                  </td>
                  <td className="px-6 py-4">{c.email}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={c.partner?.status || "Unknown"} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{c.country}</td>
                  <td className="px-6 py-4 flex space-x-2 text-gray-500">
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-orange-100 p-2 rounded-md hover:text-gray-700"
                    >
                      <FaTrash size={14} />
                    </button>
                    <button className="bg-orange-100 p-2 rounded-md hover:text-gray-700">
                      <FaEye size={14} />
                    </button>
                    <button
                      onClick={() => handleEditCustomer(c._id)}
                      className="bg-orange-100 p-2 rounded-md hover:text-gray-700"
                    >
                      <FaEdit size={14} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  No customers found
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

export default Customer;
