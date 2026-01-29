"use client";

import React, { useState } from "react";
import AddNewSaleForm from "./AddNewSaleForm";
import AccountsApprovalForm from "./AccountsApprovalForm";
import OperationProcessForm from "./OperationProcessForm";
import InstallationForm from "./InstallationForm";

const Sales = () => {
  const [activeForm, setActiveForm] = useState("addSale"); // default active

  // Button config array – professional way, scalable
  const buttons = [
    { key: "addSale", label: "Add New Sale" },
    { key: "accountsApproval", label: "Accounts Approval" },
    { key: "operationsProcess", label: "Operations Process" },
    { key: "installation", label: "Installation By Technician" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-6 flex gap-6 flex-wrap md:flex-nowrap">
      {/* Left buttons */}
      <div className="flex flex-col gap-4 shrink-0">
        {buttons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setActiveForm(btn.key)}
            className={`
              w-48 h-14 text-lg  flex items-center justify-center rounded-xl transition
              ${activeForm === btn.key 
                ? "bg-customGreen text-white shadow-md" 
                : "bg-gray-200 text-gray-900 hover:bg-gray-300 cursor-pointer"}
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Right form area */}
      <div className="flex-1">
        {activeForm === "addSale" && <AddNewSaleForm />}
        {activeForm === "accountsApproval" && <AccountsApprovalForm />}
        {activeForm === "operationsProcess" && <OperationProcessForm />}
        {activeForm === "installation" && <InstallationForm />}
      </div>
    </div>
  );
};

export default Sales;
