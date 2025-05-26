import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoGridOutline } from "react-icons/io5";
import { RiUserStarFill } from "react-icons/ri";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { PiBuildingOfficeFill } from "react-icons/pi";
import { FaGear } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/users/userSlice";
import { companyReset } from "../features/company/companySlice";
import { logout } from "../features/users/userService";

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSubMenu = (menu) => {
    setOpenMenu(openMenu === menu ? "" : menu);
  };

  const linkClasses = ({ isActive }) =>
    `flex items-center rounded-md gap-3 px-4 py-3 text-lg font-semibold ${
      isActive ? "bg-green-500 text-white" : "hover:bg-gray-100"
    }`;

  const sectionClasses =
    "flex items-center gap-3 px-4 py-3 hover:bg-gray-100 rounded-md text-lg font-semibold cursor-pointer";

  const handleLogout = async () => {
    console.log("Logging out, clearing state and storage");
    try {
      await logout();
      dispatch(logoutUser());
      dispatch(companyReset());
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleAddCompanyClick = () => {
    dispatch(companyReset());
  };

  return (
    <div className="w-[20%] flex flex-col justify-between border-r-2 min-h-[120vh] bg-white py-5 relative z-50">
      <div>
        <p className="text-4xl text-center mb-6 ">LOGO</p>
        <hr />
        <div className="flex flex-col gap-5 p-3 mt-4">
          <NavLink to="/Dashboard" className={linkClasses}>
            <IoGridOutline size={24} />
            Dashboard
          </NavLink>

          <div
            onClick={() => toggleSubMenu("customers")}
            className={sectionClasses}
          >
            <RiUserStarFill className="text-[#e45252]" size={24} />
            Customers
            {openMenu === "customers" ? (
              <MdKeyboardArrowDown size={24} />
            ) : (
              <MdKeyboardArrowRight size={24} />
            )}
          </div>
          {openMenu === "customers" && (
            <div className="pl-12 flex flex-col gap-3">
              <NavLink to="/customers" className={linkClasses}>
                View Customers
              </NavLink>
              <NavLink to="/Addcustomers" className={linkClasses}>
                Add Customer
              </NavLink>
            </div>
          )}

          <div
            onClick={() => toggleSubMenu("companies")}
            className={sectionClasses}
          >
            <PiBuildingOfficeFill className="text-orange-600" size={24} />
            Companies
            {openMenu === "companies" ? (
              <MdKeyboardArrowDown size={24} />
            ) : (
              <MdKeyboardArrowRight size={24} />
            )}
          </div>
          {openMenu === "companies" && (
            <div className="pl-12 flex flex-col gap-3">
              <NavLink to="/ViewCompany" className={linkClasses}>
                View Companies
              </NavLink>
              <NavLink
                to="/Addcompany"
                onClick={handleAddCompanyClick}
                className={linkClasses}
              >
                Add Company
              </NavLink>
            </div>
          )}

          <div
            onClick={() => toggleSubMenu("partners")}
            className={sectionClasses}
          >
            <HiUsers className="text-orange-600" size={24} />
            Partners
            {openMenu === "partners" ? (
              <MdKeyboardArrowDown size={24} />
            ) : (
              <MdKeyboardArrowRight size={24} />
            )}
          </div>
          {openMenu === "partners" && (
            <div className="pl-12 flex flex-col gap-3">
              <NavLink to="/ViewPartners" className={linkClasses}>
                View Partners
              </NavLink>
              <NavLink to="/AddNewPartner" className={linkClasses}>
                Add Partner
              </NavLink>
              <NavLink to="/AffiliateProgram" className={linkClasses}>
                Affiliate Program
              </NavLink>
            </div>
          )}

          <div
            onClick={() => toggleSubMenu("settings")}
            className={sectionClasses}
          >
            <FaGear className="text-[#e45252]" size={24} />
            Settings
            {openMenu === "settings" ? (
              <MdKeyboardArrowDown size={24} />
            ) : (
              <MdKeyboardArrowRight size={24} />
            )}
          </div>
          {openMenu === "settings" && (
            <div className="pl-12 flex flex-col gap-3">
              <NavLink to="/settings/profile" className={linkClasses}>
                Profile Settings
              </NavLink>
              <NavLink to="/settings/security" className={linkClasses}>
                Security Settings
              </NavLink>
            </div>
          )}

          <div className="px-4 mt-7">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full bg-gray-300 text-black text-base font-medium px-4 py-4 rounded-md hover:bg-gray-200"
            >
              <FiLogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
