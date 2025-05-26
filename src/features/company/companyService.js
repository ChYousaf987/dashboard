import axios from "axios";
const base_url = "http://localhost:3001/api/company";

export const addCompany = async (companyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    console.log("Sending company data:", companyData, "Token:", token);
    const response = await axios.post(
      `${base_url}/add-company`,
      companyData,
      config
    );
    console.log("Add company response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Add company error:", error.response?.data);
    throw error.response?.data?.message || "Failed to add company";
  }
};

export const getAllCompanies = async () => {
  const response = await axios.get(`${base_url}/get-companys`);
  return response.data;
};

export const deleteCompany = async (company_id) => {
  const response = await axios.delete(
    `${base_url}/delete-company/${company_id}`
  );
  return response.data;
};

export const updateCompany = async (companyId, companyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    console.log(
      "Sending update company data:",
      companyData,
      "for company:",
      companyId
    );
    const response = await axios.put(
      `${base_url}/update-company/${companyId}`,
      companyData,
      config
    );
    console.log("Update company response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update company error:", error.response?.data);
    throw error.response?.data?.message || "Failed to update company";
  }
};

export const addEmployee = async (companyId, employeeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    console.log(
      "Sending employee data:",
      employeeData,
      "for company:",
      companyId
    );
    const response = await axios.post(
      `${base_url}/add-employee/${companyId}`,
      employeeData,
      config
    );
    console.log("Add employee response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Add employee error:", error.response?.data);
    throw error.response?.data?.message || "Failed to add employee";
  }
};

export const getEmployeesByCompany = async (companyId) => {
  const response = await axios.get(`${base_url}/get-employees/${companyId}`);
  return response.data;
};

export const deleteEmployee = async (employeeId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    `${base_url}/delete-employee/${employeeId}`,
    config
  );
  return response.data;
};

export const updateEmployee = async (employeeId, employeeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    console.log(
      "Sending update employee data:",
      employeeData,
      "for employee:",
      employeeId
    );
    const response = await axios.put(
      `${base_url}/update-employee/${employeeId}`,
      employeeData,
      config
    );
    console.log("Update employee response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update employee error:", error.response?.data);
    throw error.response?.data?.message || "Failed to update employee";
  }
};
