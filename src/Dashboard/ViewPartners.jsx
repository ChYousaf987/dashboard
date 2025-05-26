// frontend/src/Dashboard/ViewPartners.js (updated)
import React, { useEffect } from "react";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getPartnerData,
  partnerReset,
  deletePartnerData,
} from "../features/partners/partnerSlice";
import { toast } from "react-toastify";

const ViewPartners = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { partners, partnerLoading, partnerError, partnerMessage } =
    useSelector((state) => state.partner || {});

  useEffect(() => {
    dispatch(partnerReset());
    dispatch(getPartnerData());

    return () => {
      dispatch(partnerReset());
    };
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deletePartnerData(id)).unwrap();
      dispatch(getPartnerData());
      toast.success("Partner deleted successfully!", {
        toastId: `delete-partner-success-${id}`,
      });
    } catch (error) {
      toast.error(error || "Failed to delete partner", {
        toastId: `delete-partner-error-${id}`,
      });
    }
  };

  const handleEditPartner = (partnerId) => {
    console.log("Edit Partner clicked for partnerId:", partnerId);
    dispatch(partnerReset());
    setTimeout(() => {
      navigate(`/EditPartner/${partnerId}`, { replace: true });
    }, 300);
  };

  if (partnerLoading) {
    return <div className="p-6 text-center">Loading partners...</div>;
  }

  if (partnerError) {
    return (
      <div className="p-6 text-center text-red-500">
        Error: {partnerMessage || "Failed to load partners"}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-[80%] absolute top-20 right-0">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Partners MENU</h1>
        <div className="space-x-2">
          <Link
            to="/ViewAffiliates"
            className="bg-orange-500 text-white px-4 py-2 rounded-full"
          >
            View Affiliates
          </Link>
          <Link
            to="/AddNewPartner"
            className="bg-green-600 text-white px-4 py-2 rounded-full"
          >
            Add new Partner
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Email address</th>
              <th className="p-4">Partner</th>
              <th className="p-4">Commission</th>
              <th className="p-4">Payout Amount</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {partners && partners.length > 0 ? (
              partners.map((partner) => (
                <tr key={partner._id} className="border-t">
                  <td className="p-4">{partner._id}</td>
                  <td className="p-4 flex items-center gap-2">
                    <input type="checkbox" className="mr-2" />
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                      {partner.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{partner.name}</div>
                      <div className="text-gray-500">
                        @{partner.name.toLowerCase().split(" ")[0]}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{partner.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${
                        partner.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {partner.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full font-semibold">
                      {partner.commission}%
                    </span>
                  </td>
                  <td className="p-4">${partner.total_payout}</td>
                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() => handleDelete(partner._id)}
                      className="bg-orange-100 p-2 rounded-full text-orange-600"
                    >
                      <FaTrash />
                    </button>
                    <button className="bg-orange-100 p-2 rounded-full text-orange-600">
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEditPartner(partner._id)}
                      className="bg-orange-100 p-2 rounded-full text-orange-600"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No partners found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6 my-3 mx-3">
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
    </div>
  );
};

export default ViewPartners;
