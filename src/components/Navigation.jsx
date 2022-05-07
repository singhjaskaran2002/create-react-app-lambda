import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CreateSlot from "./CreateSlot";
import SlotListing from "./SlotListing";

export const appRoutes = {
  SLOT_CREATE: "/create-slot",
  SLOT_LIST: "/list-slot",
};

const Navigation = () => {
  return (
    <Routes>
      <Route path={appRoutes.SLOT_CREATE} element={<CreateSlot />} />
      <Route path={appRoutes.SLOT_LIST} element={<SlotListing />} />
      <Route path="/" element={<Navigate to={appRoutes.SLOT_LIST} />} />
    </Routes>
  );
};

export default Navigation;
