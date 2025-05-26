import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCompany,
  deleteCompany,
  getAllCompanies,
  addEmployee,
  getEmployeesByCompany,
  deleteEmployee,
  updateEmployee,
  updateCompany,
} from "./companyService";

const initialState = {
  companys: [],
  employees: [],
  companyLoading: false,
  companyError: false,
  companySuccess: false,
  companyMessage: "",
  employeeLoading: false,
  employeeError: false,
  employeeSuccess: false,
  employeeMessage: "",
};

export const addCompanyData = createAsyncThunk(
  "add-company",
  async (companyData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      console.log("Token in addCompanyData:", token);
      return await addCompany(companyData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to add company");
    }
  }
);

export const getAllCompaniesData = createAsyncThunk(
  "get-companys",
  async (_, thunkAPI) => {
    try {
      return await getAllCompanies();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch companies"
      );
    }
  }
);

export const deleteCompanyData = createAsyncThunk(
  "delete-company",
  async (company_id, thunkAPI) => {
    try {
      return await deleteCompany(company_id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to delete company"
      );
    }
  }
);

export const updateCompanyData = createAsyncThunk(
  "update-company",
  async ({ companyId, companyData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      console.log("Token in updateCompanyData:", token);
      return await updateCompany(companyId, companyData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update company"
      );
    }
  }
);

export const addEmployeeData = createAsyncThunk(
  "add-employee",
  async ({ companyId, employeeData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      console.log("Token in addEmployeeData:", token);
      return await addEmployee(companyId, employeeData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to add employee"
      );
    }
  }
);

export const getEmployeesByCompanyData = createAsyncThunk(
  "get-employees",
  async (companyId, thunkAPI) => {
    try {
      return await getEmployeesByCompany(companyId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch employees"
      );
    }
  }
);

export const deleteEmployeeData = createAsyncThunk(
  "delete-employee",
  async (employeeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      console.log("Token in deleteEmployeeData:", token);
      return await deleteEmployee(employeeId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to delete employee"
      );
    }
  }
);

export const updateEmployeeData = createAsyncThunk(
  "update-employee",
  async ({ employeeId, employeeData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      console.log("Token in updateEmployeeData:", token);
      return await updateEmployee(employeeId, employeeData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update employee"
      );
    }
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    companyReset: (state) => {
      console.log(
        "Resetting company state, employeeSuccess:",
        state.employeeSuccess
      );
      state.companyError = false;
      state.companySuccess = false;
      state.companyLoading = false;
      state.companyMessage = "";
      state.employeeError = false;
      state.employeeSuccess = false;
      state.employeeLoading = false;
      state.employeeMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCompanyData.pending, (state) => {
        state.companyLoading = true;
      })
      .addCase(addCompanyData.rejected, (state, action) => {
        state.companyLoading = false;
        state.companyError = true;
        state.companyMessage = action.payload;
      })
      .addCase(addCompanyData.fulfilled, (state, action) => {
        state.companyLoading = false;
        state.companySuccess = true;
        state.companys.push(action.payload);
      })
      .addCase(getAllCompaniesData.pending, (state) => {
        state.companyLoading = true;
      })
      .addCase(getAllCompaniesData.rejected, (state, action) => {
        state.companyLoading = false;
        state.companyError = true;
        state.companyMessage = action.payload;
      })
      .addCase(getAllCompaniesData.fulfilled, (state, action) => {
        state.companyLoading = false;
        state.companySuccess = true;
        state.companys = action.payload;
      })
      .addCase(deleteCompanyData.pending, (state) => {
        state.companyLoading = true;
      })
      .addCase(deleteCompanyData.fulfilled, (state) => {
        state.companyLoading = false;
      })
      .addCase(deleteCompanyData.rejected, (state, action) => {
        state.companyLoading = false;
        state.companyError = true;
        state.companyMessage = action.payload;
      })
      .addCase(updateCompanyData.pending, (state) => {
        state.companyLoading = true;
      })
      .addCase(updateCompanyData.rejected, (state, action) => {
        state.companyLoading = false;
        state.companyError = true;
        state.companyMessage = action.payload;
      })
      .addCase(updateCompanyData.fulfilled, (state, action) => {
        console.log("Company updated successfully:", action.payload);
        state.companyLoading = false;
        state.companySuccess = true;
        state.companys = state.companys.map((company) =>
          company._id === action.payload._id ? action.payload : company
        );
      })
      .addCase(addEmployeeData.pending, (state) => {
        state.employeeLoading = true;
      })
      .addCase(addEmployeeData.rejected, (state, action) => {
        state.employeeLoading = false;
        state.employeeError = true;
        state.employeeMessage = action.payload;
      })
      .addCase(addEmployeeData.fulfilled, (state, action) => {
        console.log("Employee added successfully:", action.payload);
        state.employeeLoading = false;
        state.employeeSuccess = true;
        state.employees.push(action.payload);
      })
      .addCase(getEmployeesByCompanyData.pending, (state) => {
        state.employeeLoading = true;
      })
      .addCase(getEmployeesByCompanyData.rejected, (state, action) => {
        state.employeeLoading = false;
        state.employeeError = true;
        state.employeeMessage = action.payload;
      })
      .addCase(getEmployeesByCompanyData.fulfilled, (state, action) => {
        state.employeeLoading = false;
        state.employeeSuccess = true;
        state.employees = action.payload;
      })
      .addCase(deleteEmployeeData.pending, (state) => {
        state.employeeLoading = true;
      })
      .addCase(deleteEmployeeData.rejected, (state, action) => {
        state.employeeLoading = false;
        state.employeeError = true;
        state.employeeMessage = action.payload;
      })
      .addCase(deleteEmployeeData.fulfilled, (state, action) => {
        state.employeeLoading = false;
        state.employees = state.employees.filter(
          (employee) => employee._id !== action.meta.arg
        );
      })
      .addCase(updateEmployeeData.pending, (state) => {
        state.employeeLoading = true;
      })
      .addCase(updateEmployeeData.rejected, (state, action) => {
        state.employeeLoading = false;
        state.employeeError = true;
        state.employeeMessage = action.payload;
      })
      .addCase(updateEmployeeData.fulfilled, (state, action) => {
        console.log("Employee updated successfully:", action.payload);
        state.employeeLoading = false;
        state.employeeSuccess = true;
        state.employees = state.employees.map((employee) =>
          employee._id === action.payload._id ? action.payload : employee
        );
      });
  },
});

export const { companyReset } = companySlice.actions;
export default companySlice.reducer;
