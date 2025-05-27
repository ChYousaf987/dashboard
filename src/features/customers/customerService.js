import axios from "axios";

const base_url = "https://apis-production-b478.up.railway.app/api/customer";

export const addCustomer = async (customerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    console.log("Sending customer data:", customerData, "Token:", token);
    const response = await axios.post(
      `${base_url}/add-customer`,
      customerData,
      config
    );
    console.log("Add customer response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Add customer error:", error.response?.data);
    throw error.response?.data?.message || "Failed to add customer";
  }
};

export const getAllCustomers = async () => {
  const response = await axios.get(`${base_url}/get-customers`);
  return response.data;
};

export const deleteCustomer = async (customerId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `${base_url}/delete-customer/${customerId}`,
    config
  );
  return response.data;
};

export const updateCustomer = async (customerId, customerData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    console.log(
      "Sending update customer data:",
      customerData,
      "for customer:",
      customerId
    );
    const response = await axios.put(
      `${base_url}/update-customer/${customerId}`,
      customerData,
      config
    );
    console.log("Update customer response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update customer error:", error.response?.data);
    throw error.response?.data?.message || "Failed to update customer";
  }
};
