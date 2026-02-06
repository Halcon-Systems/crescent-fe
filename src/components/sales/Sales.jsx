"use client";

import React, { useState } from "react";
import AddNewSaleForm from "./AddNewSaleForm";
import AccountsApprovalForm from "./AccountsApprovalForm";
import OperationProcessForm from "./OperationProcessForm";
import InstallationForm from "./InstallationForm";

const Sales = () => {
  const [activeForm, setActiveForm] = useState("addSale");

  // Button config array
  const buttons = [
    { key: "addSale", label: "Add New Sale" },
    { key: "accountsApproval", label: "Accounts Approval" },
    { key: "operationsProcess", label: "Operations Process" },
    { key: "installation", label: "Installation by Technician" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6">
      {/* Left buttons - Always vertical, responsive width */}
      <div className="flex flex-col items-stretch gap-2 md:gap-3 md:shrink-0 w-full md:w-auto">
        {buttons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setActiveForm(btn.key)}
            className={`
              w-full md:w-auto px-4 py-3 text-sm md:text-base 
              flex items-center justify-center rounded-lg transition-all duration-200
              whitespace-normal text-center min-h-[48px] md:min-h-[56px]
              ${activeForm === btn.key 
                ? "bg-customGreen text-white shadow-md" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300 cursor-pointer"}
            `}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Right form area */}
      <div className="flex-1 min-w-0">
        {activeForm === "addSale" && <AddNewSaleForm />}
        {activeForm === "accountsApproval" && <AccountsApprovalForm />}
        {activeForm === "operationsProcess" && <OperationProcessForm />}
        {activeForm === "installation" && <InstallationForm />}
      </div>
    </div>
  );
};

export default Sales;