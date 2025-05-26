import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addCustomer,
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
} from "./customerService";

const initialState = {
  customers: [],
  customerLoading: false,
  customerError: false,
  customerSuccess: false,
  customerMessage: "",
};

export const addCustomerData = createAsyncThunk(
  "add-customer",
  async (customerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      console.log("Token in addCustomerData:", token);
      return await addCustomer(customerData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to add customer"
      );
    }
  }
);

export const getCustomerData = createAsyncThunk(
  "get-customers",
  async (_, thunkAPI) => {
    try {
      return await getAllCustomers();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch customers"
      );
    }
  }
);

export const deleteCustomerData = createAsyncThunk(
  "delete-customer",
  async (customerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      console.log("Token in deleteCustomerData:", token);
      return await deleteCustomer(customerId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to delete customer"
      );
    }
  }
);

export const updateCustomerData = createAsyncThunk(
  "update-customer",
  async ({ customerId, customerData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      console.log("Token in updateCustomerData:", token);
      return await updateCustomer(customerId, customerData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update customer"
      );
    }
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    customerReset: (state) => {
      state.customerError = false;
      state.customerSuccess = false;
      state.customerLoading = false;
      state.customerMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCustomerData.pending, (state) => {
        state.customerLoading = true;
      })
      .addCase(addCustomerData.rejected, (state, action) => {
        state.customerLoading = false;
        state.customerError = true;
        state.customerMessage = action.payload;
      })
      .addCase(addCustomerData.fulfilled, (state, action) => {
        state.customerLoading = false;
        state.customerSuccess = true;
        state.customers.push(action.payload);
      })
      .addCase(getCustomerData.pending, (state) => {
        state.customerLoading = true;
      })
      .addCase(getCustomerData.rejected, (state, action) => {
        state.customerLoading = false;
        state.customerError = true;
        state.customerMessage = action.payload;
      })
      .addCase(getCustomerData.fulfilled, (state, action) => {
        state.customerLoading = false;
        state.customerSuccess = true;
        state.customers = action.payload;
      })
      .addCase(deleteCustomerData.pending, (state) => {
        state.customerLoading = true;
      })
      .addCase(deleteCustomerData.rejected, (state, action) => {
        state.customerLoading = false;
        state.customerError = true;
        state.customerMessage = action.payload;
      })
      .addCase(deleteCustomerData.fulfilled, (state, action) => {
        state.customerLoading = false;
        state.customers = state.customers.filter(
          (customer) => customer._id !== action.meta.arg
        );
      })
      .addCase(updateCustomerData.pending, (state) => {
        state.customerLoading = true;
      })
      .addCase(updateCustomerData.rejected, (state, action) => {
        state.customerLoading = false;
        state.customerError = true;
        state.customerMessage = action.payload;
      })
      .addCase(updateCustomerData.fulfilled, (state, action) => {
        console.log("Customer updated successfully:", action.payload);
        state.customerLoading = false;
        state.customerSuccess = true;
        state.customers = state.customers.map((customer) =>
          customer._id === action.payload._id ? action.payload : customer
        );
      });
  },
});

export const { customerReset } = customerSlice.actions;
export default customerSlice.reducer;
