import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import Profile from "../profile/Profile";
import Sidebar from "../../components/sidebar/Sidebar";

function Layout() {
  return (
    <>
      <Profile />
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;

//https://nt-shopping-list.onrender.com/api
