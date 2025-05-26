import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/users/userSlice";
import companyReducer from "../features/company/companySlice";
import partnerReducer from "../features/partners/partnerSlice";
import customerReducer from "../features/customers/customerSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    company: companyReducer,
    partner: partnerReducer,
    customer: customerReducer,
  },
});
