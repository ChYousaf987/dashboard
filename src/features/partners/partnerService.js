// frontend/src/features/partners/partnerService.js
import axios from "axios";

const base_url = "https://apis-production-b478.up.railway.app/api/partner";

export const addPartner = async (partnerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    console.log("Sending partner data:", partnerData, "Token:", token);
    const response = await axios.post(
      `${base_url}/add-partner`,
      partnerData,
      config
    );
    console.log("Add partner response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Add partner error:", error.response?.data);
    throw error.response?.data?.message || "Failed to add partner";
  }
};

export const getAllPartners = async () => {
  const response = await axios.get(`${base_url}/get-partners`);
  return response.data;
};

export const deletePartner = async (partnerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `${base_url}/delete-partner/${partnerId}`,
    config
  );
  return response.data;
};

export const updatePartner = async (partnerId, partnerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    console.log(
      "Sending update partner data:",
      partnerData,
      "for partner:",
      partnerId
    );
    const response = await axios.put(
      `${base_url}/update-partner/${partnerId}`,
      partnerData,
      config
    );
    console.log("Update partner response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update partner error:", error.response?.data);
    throw error.response?.data?.message || "Failed to update partner";
  }
};
