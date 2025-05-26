import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "./Dashboard/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import Navbar from "./Dashboard/Navbar";
import Customer from "./Dashboard/Customer";
import AddCustomers from "./Dashboard/AddCustomers";
import ViewCompany from "./Dashboard/ViewCompany";
import AddCompany from "./Dashboard/AddCompany";
import ViewPartners from "./Dashboard/ViewPartners";
import ViewAffiliates from "./Dashboard/ViewAffiliates";
import AddNewPartner from "./Dashboard/AddNewPartner";
import AffiliateProgram from "./Dashboard/AffiliateProgram";
import SignIn from "./Dashboard/SignIn";
import ViewEmployees from "./Dashboard/ViewEmployees";
import AddNewEmployees from "./Dashboard/AddNewEmployees";
import EditEmployee from "./Dashboard/EditEmployee";
import EditCompany from "./Dashboard/EditCompany";
import EditPartner from "./Dashboard/EditPartner";
import EditCustomer from "./Dashboard/EditCustomer";
import ProtectedRoute from "./Dashboard/ProtectedRoute";
import ProfileCard from "./Dashboard/ProfileCard";

const AppLayout = () => {
  const location = useLocation();
  console.log("Current route:", location.pathname);
  const hideLayout = location.pathname === "/";

  return (
    <>
      {!hideLayout && <Sidebar />}
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/Addcustomers" element={<AddCustomers />} />
          <Route path="/ViewCompany" element={<ViewCompany />} />
          <Route path="/Addcompany" element={<AddCompany />} />
          <Route path="/ViewEmployees/:companyId" element={<ViewEmployees />} />
          <Route
            path="/AddNewEmployees/:companyId"
            element={<AddNewEmployees />}
          />
          <Route
            path="/EditEmployee/:companyId/:employeeId"
            element={<EditEmployee />}
          />
          <Route path="/EditCompany/:companyId" element={<EditCompany />} />
          <Route path="/ViewPartners" element={<ViewPartners />} />
          <Route path="/ViewAffiliates" element={<ViewAffiliates />} />
          <Route path="/AddNewPartner" element={<AddNewPartner />} />
          <Route path="/EditPartner/:partnerId" element={<EditPartner />} />
          <Route path="/EditCustomer/:customerId" element={<EditCustomer />} />
          <Route path="/AffiliateProgram" element={<AffiliateProgram />} />
          <Route path="/ProfileCard" element={<ProfileCard />} />
        </Route>
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
