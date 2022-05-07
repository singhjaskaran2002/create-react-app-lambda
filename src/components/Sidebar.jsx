import React from "react";
import { Link, useLocation } from "react-router-dom";
import { appRoutes } from "./Navigation";

const Sidebar = () => {
  const location = useLocation();

  return (
    <nav className="nav flex-column sidebar">
      <ul className="sidemenu-list">
        <li
          className={
            location.pathname === appRoutes.SLOT_LIST
              ? "sidemenu active"
              : "sidemenu"
          }
        >
          <i className="fa-solid fa-list"></i>
          <Link to={appRoutes.SLOT_LIST}>List Appointment Slots</Link>
        </li>
        <li
          className={
            location.pathname === appRoutes.SLOT_CREATE
              ? "sidemenu active"
              : "sidemenu"
          }
        >
          <i className="fa-solid fa-list"></i>
          <Link to={appRoutes.SLOT_CREATE}>Create Appointment Slots</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
