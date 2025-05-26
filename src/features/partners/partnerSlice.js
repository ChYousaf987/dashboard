// frontend/src/features/partners/partnerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addPartner,
  getAllPartners,
  deletePartner,
  updatePartner,
} from "./partnerService";

const initialState = {
  partners: [],
  partnerLoading: false,
  partnerError: false,
  partnerSuccess: false,
  partnerMessage: "",
};

export const addPartnerData = createAsyncThunk(
  "add-partner",
  async (partnerData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      console.log("Token in addPartnerData:", token);
      return await addPartner(partnerData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Failed to add partner");
    }
  }
);

export const getPartnerData = createAsyncThunk(
  "get-partners",
  async (_, thunkAPI) => {
    try {
      return await getAllPartners();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to fetch partners"
      );
    }
  }
);

export const deletePartnerData = createAsyncThunk(
  "delete-partner",
  async (partnerId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      console.log("Token in deletePartnerData:", token);
      return await deletePartner(partnerId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to delete partner"
      );
    }
  }
);

export const updatePartnerData = createAsyncThunk(
  "update-partner",
  async ({ partnerId, partnerData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      console.log("Token in updatePartnerData:", token);
      return await updatePartner(partnerId, partnerData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.message || "Failed to update partner"
      );
    }
  }
);

export const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {
    partnerReset: (state) => {
      state.partnerError = false;
      state.partnerSuccess = false;
      state.partnerLoading = false;
      state.partnerMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPartnerData.pending, (state) => {
        state.partnerLoading = true;
      })
      .addCase(addPartnerData.rejected, (state, action) => {
        state.partnerLoading = false;
        state.partnerError = true;
        state.partnerMessage = action.payload;
      })
      .addCase(addPartnerData.fulfilled, (state, action) => {
        state.partnerLoading = false;
        state.partnerSuccess = true;
        state.partners.push(action.payload);
      })
      .addCase(getPartnerData.pending, (state) => {
        state.partnerLoading = true;
      })
      .addCase(getPartnerData.rejected, (state, action) => {
        state.partnerLoading = false;
        state.partnerError = true;
        state.partnerMessage = action.payload;
      })
      .addCase(getPartnerData.fulfilled, (state, action) => {
        state.partnerLoading = false;
        state.partnerSuccess = true;
        state.partners = action.payload;
      })
      .addCase(deletePartnerData.pending, (state) => {
        state.partnerLoading = true;
      })
      .addCase(deletePartnerData.rejected, (state, action) => {
        state.partnerLoading = false;
        state.partnerError = true;
        state.partnerMessage = action.payload;
      })
      .addCase(deletePartnerData.fulfilled, (state, action) => {
        state.partnerLoading = false;
        state.partners = state.partners.filter(
          (partner) => partner._id !== action.meta.arg
        );
      })
      .addCase(updatePartnerData.pending, (state) => {
        state.partnerLoading = true;
      })
      .addCase(updatePartnerData.rejected, (state, action) => {
        state.partnerLoading = false;
        state.partnerError = true;
        state.partnerMessage = action.payload;
      })
      .addCase(updatePartnerData.fulfilled, (state, action) => {
        console.log("Partner updated successfully:", action.payload);
        state.partnerLoading = false;
        state.partnerSuccess = true;
        state.partners = state.partners.map((partner) =>
          partner._id === action.payload._id ? action.payload : partner
        );
      });
  },
});

export const { partnerReset } = partnerSlice.actions;
export default partnerSlice.reducer;
