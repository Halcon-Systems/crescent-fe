"use client";

import React, { useState } from "react";
import { Eye, Pencil, Plus, Search, ToggleLeft, ToggleRight, Trash2 } from "lucide-react";
import FieldWrapper from "@/components/ui/FieldWrapper";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Image from "next/image";

const FormButton = ({
  theme = "primary",
  text,
  onClick,
  type = "button",
  className = "",
}) => {
  const base = "w-40 py-3.5 rounded-lg text-md font-medium transition cursor-pointer";
  const themeClass =
    theme === "primary"
      ? "bg-customPurple text-white hover:bg-customPurple/90"
      : theme === "cancel"
        ? "border border-customPurple text-customPurple hover:bg-gray-50"
        : "bg-gray-200 text-gray-700";

  return (
    <button type={type} onClick={onClick} className={`${base} ${themeClass} ${className}`}>
      {text}
    </button>
  );
};

const FormActions = ({ primaryClassName = "bg-customBlue hover:bg-customBlue/90" }) => (
  <div className="flex gap-3 md:pt-4 mt-4 md:mt-6 justify-end">
    <FormButton theme="cancel" text="Cancel" />
    <FormButton theme="primary" text="Save" className={primaryClassName} />
  </div>
);

// Button Components
const ViewButton = ({ onClick }) => (
  <button
    className="rounded-lg bg-[#FEB000] p-2 px-3 text-white transition hover:bg-[#FEB000]/80 cursor-pointer"
    onClick={onClick}
  >
    <Eye className="w-4 h-4" />
  </button>
);

const EditButton = ({ onClick }) => (
  <button
    className="rounded-lg bg-[#006EC4] p-2 px-3 text-white transition hover:bg-[#006EC4]/80 cursor-pointer"
    onClick={onClick}
  >
    <Pencil className="w-4 h-4" />
  </button>
);

const DeleteButton = ({ onClick }) => (
  <button
    className="rounded-lg bg-[#E03137] p-2 px-3 text-white transition hover:bg-[#E03137]/80 cursor-pointer"
    onClick={onClick}
  >
    <Trash2 className="w-4 h-4" />
  </button>
);

const ToggleButton = ({ onClick, isActive = true }) => (
  <button
    className={`rounded-lg p-2 px-3 text-white transition cursor-pointer ${
      isActive ? "bg-[#03A12B] hover:bg-[#03A12B]/80" : "bg-gray-400 hover:bg-gray-500"
    }`}
    onClick={onClick}
  >
    {isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
  </button>
);

const SearchToolbar = () => (
  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between h-12">
    <div className="flex flex-row items-center gap-4 relative w-full sm:max-w-105 border border-gray-200 rounded-xl px-4 py-2.5 h-full">
      <Search className="h-6 w-6 text-black" />
      <Input placeholder="Search Item" className="py-2.5 font-lexend font-light caret-gray-200" />
    </div>

    <button
      type="button"
      className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-8 py-2.5 text-md font-lexend text-gray-700 transition hover:bg-gray-50 h-full"
    >
      <Image src="/icons/filter.svg" alt="Filter Icon" width={22} height={22} />
      Filter
    </button>
  </div>
);

const SearchList = ({
  items,
  showView = true,
  showEdit = true,
  showDelete = true,
  showToggle = true,
  onView,
  onEdit,
  onDelete,
  onToggle,
}) => {
  const [toggleStates, setToggleStates] = useState(() =>
    Object.fromEntries(items.map((_, index) => [index, true]))
  );

  const handleToggle = (item, index) => {
    const nextValue = !toggleStates[index];
    setToggleStates((prev) => ({ ...prev, [index]: nextValue }));
    if (onToggle) onToggle(item, index, nextValue);
  };

  return (
    <div>
      <SearchToolbar />
      <div className="mt-15 sm:mt-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-[#F6FBF8] px-4 py-3 transition hover:bg-[#EEF6F2]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-purple-100 text-xs font-semibold text-purple-600">
                {index + 1}
              </div>
              <span className="text-sm font-medium text-gray-800">{item}</span>
            </div>

            <div className="flex items-center gap-3">
              {showView && <ViewButton onClick={() => onView && onView(item, index)} />}
              {showEdit && <EditButton onClick={() => onEdit && onEdit(item, index)} />}
              {showDelete && <DeleteButton onClick={() => onDelete && onDelete(item, index)} />}
              {showToggle && (
                <ToggleButton
                  isActive={!!toggleStates[index]}
                  onClick={() => handleToggle(item, index)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function OrganizationSetup() {
  const [activeTab, setActiveTab] = useState("addOffice");

  const tabs = [
    { key: "addOffice", label: "Add Office" },
    { key: "addProducts", label: "Add Products" },
    { key: "addBankAccount", label: "Add Bank Account" },
    { key: "addVendors", label: "Add Vendors & Suppliers" },
    { key: "addEmployees", label: "Add Employees" },
    { key: "addClientsCategory", label: "Add Clients Category" },
    { key: "addPackageType", label: "Add Package Type" },
    { key: "createZone", label: "Create Zone & Technician" },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 min-h-200 font-inter">
      {/* Left tabs - vertical on desktop */}
      <div className="flex flex-col items-stretch gap-2 md:gap-3 md:max-w-40 shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              w-full px-4 py-3 text-sm md:text-base 
              flex items-center justify-center rounded-lg transition-all duration-200
              whitespace-normal text-center min-h-12 md:min-h-14
              ${activeTab === tab.key 
                ? "bg-customGreen text-white shadow-md" 
                : "bg-gray-300 text-gray-700 hover:bg-gray-200 cursor-pointer"}
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right content area */}
      <div className="flex-1 min-w-0">
        {activeTab === "addOffice" && <AddOfficeTabContent />}
        {activeTab === "addProducts" && <AddProductsTabContent />}
        {activeTab === "addBankAccount" && <AddBankAccountTabContent />}
        {activeTab === "addVendors" && <AddVendorsTabContent />}
        {activeTab === "addEmployees" && <AddEmployeesTabContent />}
        {activeTab === "addClientsCategory" && <AddClientsCategoryTabContent />}
        {activeTab === "addPackageType" && <AddPackageTypeTabContent />}
        {activeTab === "createZone" && <CreateZoneTabContent />}
      </div>
    </div>
  );
}

// 1. Add Office Tab Content
const AddOfficeTabContent = () => {
  return (
    <div className="flex-1 flex flex-col">
      {/* SECTION 1: Add Office */}
      <div className="pb-6 md:pb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
          Add Office
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <FieldWrapper label="Office Name" className="text-sm">
              <Input placeholder="Type here" className="text-sm py-2 " />
            </FieldWrapper>
          </div>
          
          <div className="space-y-1">
            <FieldWrapper label="Account ID" className="text-sm">
              <Input 
                value="Auto" 
                readOnly 
                className="text-sm py-2 bg-gray-50"
                placeholder="Auto"
              />
            </FieldWrapper>
          </div>
        </div>
        
        <FormActions />
      </div>
      
      {/* SECTION 2: Search Item */}
      <div className=" pb-6 md:pb-8">
        
        <SearchList
          items={[
            "Head Office",
            "Karachi DHA Branch",
            "Lahore Regional Office",
            "Islamabad Office",
          ]}
          showView={false}
          showEdit={true}
          showDelete={true}
          showToggle={true}
          onView={(item, index) => console.log('View:', item, index)}
          onEdit={(item, index) => console.log('Edit:', item, index)}
          onDelete={(item, index) => console.log('Delete:', item, index)}
          onToggle={(item, index) => console.log('Toggle:', item, index)}
        />
      </div>
    </div>
  );
};

// 2. Add Products Tab Content
const AddProductsTabContent = () => {
  return (
    <div className="flex-1 flex flex-col ">
      <div className=" pb-6 md:pb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
          Add Product
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <FieldWrapper label="Product Name" required className="text-sm py-0" >
              <Input placeholder="Type here" className="text-sm py-2" />
            </FieldWrapper>
          </div>
          
          <div className="space-y-1">
            <FieldWrapper label="Product ID" required className="text-sm">
              <Input 
                value="Auto" 
                readOnly 
                className="text-sm py-2 bg-gray-50"
              />
            </FieldWrapper>
          </div>
        </div>
        
        <FormActions />
      </div>
      
      <div className=" pb-6 md:pb-8">
        
        <SearchList
          items={[
            "Tracker",
            "Dash Cam",
            "Weight Sensor",
            "Fuel Sensors",
          ]}
          showView={false}
          showEdit={true}
          showDelete={true}
          showToggle={true}
          onView={(item, index) => console.log('View:', item, index)}
          onEdit={(item, index) => console.log('Edit:', item, index)}
          onDelete={(item, index) => console.log('Delete:', item, index)}
          onToggle={(item, index) => console.log('Toggle:', item, index)}
        />
      </div>
    </div>
  );
};

// 3. Add Bank Account Tab Content
const AddBankAccountTabContent = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className=" pb-6 md:pb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
          Add Bank Account
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <FieldWrapper label="Bank Name" required className="text-sm">
              <Select placeholder="Select Here" className="text-sm py-2" />
            </FieldWrapper>
          </div>
          
          <div className="space-y-1">
            <FieldWrapper label="Bank Code" required className="text-sm">
              <Input 
                placeholder="Enter (HABB)" 
                className="text-sm py-2"
              />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Account No." required className="text-sm">
              <Input 
                placeholder="Enter Account No." 
                className="text-sm py-2"
              />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="IBAN" required className="text-sm">
              <Input 
                placeholder="Enter IBAN" 
                className="text-sm py-2"
              />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Branch Code" required className="text-sm">
              <Input 
                placeholder="Enter Branch Code" 
                className="text-sm py-2"
              />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Branch" required className="text-sm">
              <Input 
                placeholder="Enter Branch" 
                className="text-sm py-2"
              />
            </FieldWrapper>
          </div>
        </div>
        
        <FormActions primaryClassName="bg-customBlue hover:bg-customBlue/90" />
      </div>
      
      <div className=" pb-6 md:pb-8">
        
        <SearchList
          items={[
            "Bank Al Falah",
            "United Bank Limited",
            "Habib Bank Limited",
            "Meezan Bank",
          ]}
          showView={true}
          showEdit={true}
          showDelete={true}
          showToggle={true}
          onView={(item, index) => console.log('View:', item, index)}
          onEdit={(item, index) => console.log('Edit:', item, index)}
          onDelete={(item, index) => console.log('Delete:', item, index)}
          onToggle={(item, index) => console.log('Toggle:', item, index)}
        />
      </div>
    </div>
  );
};

// 4. Add Vendors & Suppliers Tab Content
const AddVendorsTabContent = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className=" pb-6 md:pb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
          Add New Vendor/ Supplier
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <FieldWrapper label="Business Name" required className="text-sm">
              <Input placeholder="Type here" className="text-sm py-2" />
            </FieldWrapper>
          </div>
          
          <div className="space-y-1">
            <FieldWrapper label="Select City" required className="text-sm">
              <Select placeholder="Select" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Address" required className="text-sm">
              <Input placeholder="Enter Business Address" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Email ID" required className="text-sm">
              <Input placeholder="Email here" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Contact Person" required className="text-sm">
              <Input placeholder="Enter Name here" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Primary Mobile No." required className="text-sm">
              <Input placeholder="0300-1234567" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Mobile No. (2)" className="text-sm">
              <Input placeholder="0300-1234567" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Vendor ID" required className="text-sm">
              <Input placeholder="Auto generate (1075)" className="text-sm py-2 bg-gray-50" readOnly />
            </FieldWrapper>
          </div>
        </div>
        
        <FormActions primaryClassName="bg-customBlue hover:bg-customBlue/90" />
      </div>
      
      <div className=" pb-6 md:pb-8">
        
        <SearchList
          items={[
            "ABC Traders",
            "ABC Technologies",
            "Computer Zone",
            "Service Provider",
          ]}
          showView={true}
          showEdit={true}
          showDelete={true}
          showToggle={true}
          onView={(item, index) => console.log('View:', item, index)}
          onEdit={(item, index) => console.log('Edit:', item, index)}
          onDelete={(item, index) => console.log('Delete:', item, index)}
          onToggle={(item, index) => console.log('Toggle:', item, index)}
        />
      </div>
    </div>
  );
};

// 5. Add Employees Tab Content
const AddEmployeesTabContent = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className=" pb-6 md:pb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
          Add Employee
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <FieldWrapper label="Employee Name" required className="text-sm">
              <Input placeholder="Type here" className="text-sm py-2" />
            </FieldWrapper>
          </div>
          
          <div className="space-y-1">
            <FieldWrapper label="Service No." required className="text-sm">
              <Input placeholder="Type here or Auto Generate" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Email ID" required className="text-sm">
              <Input placeholder="Email here" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Primary Mobile No." required className="text-sm">
              <Input placeholder="0300-1234567" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="CNIC No." required className="text-sm">
              <Input placeholder="12345-1234567-1" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Designation" required className="text-sm">
              <Input placeholder="GM / Manager / Staff / Technician" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Next of Kin" className="text-sm">
              <Input placeholder="Name here" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Next of Kin Contact" className="text-sm">
              <Input placeholder="92-300-1234567" className="text-sm py-2" />
            </FieldWrapper>
          </div>
        </div>

        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6 mt-8">
          Assign User Rights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <FieldWrapper label="User Name" required className="text-sm">
              <Input placeholder="Type User name here" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Assign Role" required className="text-sm">
              <Input placeholder="Type here or Auto Generate" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Temporary Password" required className="text-sm">
              <Input placeholder="Type here or Auto Generate" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Re-Type Temporary Password" required className="text-sm">
              <Input placeholder="Type here or Auto Generate" className="text-sm py-2" />
            </FieldWrapper>
          </div>
        </div>
        
        <FormActions primaryClassName="bg-customBlue hover:bg-customBlue/90" />
      </div>
      
      <div className=" pb-6 md:pb-8">
        
        <SearchList
          items={[
            "ABC Traders",
            "ABC Technologies",
            "Computer Zone",
            "Service Provider",
          ]}
          showView={true}
          showEdit={true}
          showDelete={true}
          showToggle={true}
          onView={(item, index) => console.log('View:', item, index)}
          onEdit={(item, index) => console.log('Edit:', item, index)}
          onDelete={(item, index) => console.log('Delete:', item, index)}
          onToggle={(item, index) => console.log('Toggle:', item, index)}
        />
      </div>
    </div>
  );
};

// 6. Add Clients Category Tab Content
const AddClientsCategoryTabContent = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className=" pb-6 md:pb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
          Add Client Category
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <FieldWrapper label="Client Type" required className="text-sm">
              <Input placeholder="Type here" className="text-sm py-2" />
            </FieldWrapper>
          </div>
          
          <div className="space-y-1">
            <FieldWrapper label="Category Code" required className="text-sm">
              <Input placeholder="Type here" className="text-sm py-2" />
            </FieldWrapper>
          </div>
        </div>
        
        <FormActions primaryClassName="bg-customBlue hover:bg-customBlue/90" />
      </div>
      
      <div className=" pb-6 md:pb-8">
        
        <SearchList
          items={[
            "Individual - 001",
            "Corporate - 002",
            "Department - 003",
            "Company 004",
          ]}
          showView={true}
          showEdit={true}
          showDelete={true}
          showToggle={true}
          onView={(item, index) => console.log('View:', item, index)}
          onEdit={(item, index) => console.log('Edit:', item, index)}
          onDelete={(item, index) => console.log('Delete:', item, index)}
          onToggle={(item, index) => console.log('Toggle:', item, index)}
        />
      </div>
    </div>
  );
};

// 7. Add Package Type Tab Content
const AddPackageTypeTabContent = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className=" pb-6 md:pb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
          Add Package Type
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <FieldWrapper label="Package Name" required className="text-sm">
              <Input placeholder="Type here" className="text-sm py-2" />
            </FieldWrapper>
          </div>
          
          <div className="space-y-1">
            <FieldWrapper label="Package ID" required className="text-sm">
              <Input placeholder="001" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Set Minimum Charges" required className="text-sm">
              <Input placeholder="Type here" className="text-sm py-2" />
            </FieldWrapper>
          </div>

          <div className="space-y-1">
            <FieldWrapper label="Set Minimum Renewal Charges" required className="text-sm">
              <Input placeholder="001" className="text-sm py-2" />
            </FieldWrapper>
          </div>
        </div>
        
        <FormActions primaryClassName="bg-customBlue hover:bg-customBlue/90" />
      </div>
      
      <div className=" pb-6 md:pb-8">
        
        <SearchList
          items={[
            "Rental - 001",
            "Sale - 002",
            "Trip - 003",
            "Company 004",
          ]}
          showView={true}
          showEdit={true}
          showDelete={true}
          showToggle={true}
          onView={(item, index) => console.log('View:', item, index)}
          onEdit={(item, index) => console.log('Edit:', item, index)}
          onDelete={(item, index) => console.log('Delete:', item, index)}
          onToggle={(item, index) => console.log('Toggle:', item, index)}
        />
      </div>
    </div>
  );
};

// 8. Create Zone & Technician Tab Content
const CreateZoneTabContent = () => {
  const [employees] = useState([
    { name: "Dhulain Ahmed", call: "92-300-1234567", cnic: "12345-1234567-1", zone: "Zone Name", office: "Office Name", city: "Karachi" },
    { name: "Faraz Khan", call: "92-300-1234567", cnic: "12345-1234567-1", zone: "Zone name", office: "Office Name", city: "Quetta" },
    { name: "Amess Ali", call: "92-300-1234567", cnic: "12345-1234567-1", zone: "Zone Name", office: "Office Name", city: "Lahore" },
  ]);
  const [employeeToggleStates, setEmployeeToggleStates] = useState(() =>
    Object.fromEntries(employees.map((_, index) => [index, true]))
  );

  return (
    <div className="flex-1 flex flex-col">
      <div className=" pb-6 md:pb-8">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
          Create Zone
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <FieldWrapper label="Select Office" required className="text-sm">
              <Input placeholder="Type here" className="text-sm py-2" />
            </FieldWrapper>
          </div>
          
          <div className="space-y-1">
            <FieldWrapper label="Zone Name" required className="text-sm">
              <Input placeholder="Karachi South" className="text-sm py-2" />
            </FieldWrapper>
          </div>
        </div>

        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6 mt-8">
          Add Employees in Zone
        </h2>

        <div className="flex flex-col md:flex-row items-stretch mb-6 ">
          <FieldWrapper label="Select Employee" required className="text-sm flex-1">
            <Input placeholder="Type & Search" className="text-sm py-2" />
          </FieldWrapper>
          <button className="w-full md:w-42 bg-customBlue text-white py-2 rounded-lg text-xl font-light hover:bg-customBlue/90 transition flex items-center justify-center gap-2 ">
            <Plus></Plus> Add
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#EEF0FB]">
                <th className="py-5 px-4 text-left border-r border-gray-300 rounded-l-xl">
                    <input type="checkbox" className="mr-2 w-4 h-4 rounded-md border border-gray-300 accent-customBlue cursor-pointer appearance-none" />
                </th>
                <th className="text-left py-5 px-4 whitespace-nowrap">Employee Name</th>
                <th className="text-left py-5 px-4">Call No.</th>
                <th className="text-left py-5 px-4">CNIC No.</th>
                <th className="text-left py-5 px-4">Zone</th>
                <th className="text-left py-5 px-4">Office</th>
                <th className="text-left py-5 px-4">City</th>
                <th className="text-left py-5 px-4 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-5 px-4">
                    <input type="checkbox" className="mr-2 w-4 h-4 rounded-md border border-gray-300 accent-customBlue cursor-pointer appearance-none" />
                  </td>
                  <td className="py-5 px-4">{emp.name}</td>
                  <td className="py-5 px-4">{emp.call}</td>
                  <td className="py-5 px-4">{emp.cnic}</td>
                  <td className="py-5 px-4">{emp.zone}</td>
                  <td className="py-5 px-4">{emp.office}</td>
                  <td className="py-5 px-4">{emp.city}</td>
                  <td className="py-5 px-4">
                    <div className="flex items-center gap-2">
                      <EditButton onClick={() => console.log('Edit employee:', emp.name)} />
                      <DeleteButton onClick={() => console.log('Delete employee:', emp.name)} />
                      <ToggleButton
                        isActive={!!employeeToggleStates[idx]}
                        onClick={() =>
                          setEmployeeToggleStates((prev) => ({
                            ...prev,
                            [idx]: !prev[idx],
                          }))
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <FormActions primaryClassName="bg-customBlue hover:bg-customBlue/90" />
      </div>

      <div className=" pb-6 md:pb-8">
        
        <SearchList
          items={[
            "Zone Name - 10 (Total Technicians)",
            "Zone Name - 10 (Total Technicians)",
            "Zone Name - 10 (Total Technicians)",
            "Zone Name - 10 (Total Technicians)",
          ]}
          showView={true}
          showEdit={true}
          showDelete={true}
          showToggle={true}
          onView={(item, index) => console.log('View:', item, index)}
          onEdit={(item, index) => console.log('Edit:', item, index)}
          onDelete={(item, index) => console.log('Delete:', item, index)}
          onToggle={(item, index) => console.log('Toggle:', item, index)}
        />
      </div>
    </div>
  );
};
