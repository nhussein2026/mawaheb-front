// src/pages/AdminDashboard.js
import React from "react";
import Users from "./AllUsers";

const AdminDashboard = () => (
  <div className="container mx-auto p-8">
    <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
    <div className="">
      <p className="mt-4 text-mediumGray">All users</p>
      <Users />
    </div>
    <div className="">
      <p className="mt-4 text-mediumGray">All students Reports</p>
      {/* <AllStudentR /> */}
    </div>
  </div>
);

export default AdminDashboard;
