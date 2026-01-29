"use client";

import { useClientContext } from "@/context/clientContext";
import React from "react";
import { FiChevronDown, FiCalendar } from "react-icons/fi";
import FieldWrapper from "../ui/FieldWrapper";
import Input from "../ui/Input";
import Select from "../ui/Select";
import DateInput from "../ui/DateInput";
import Textarea from "../ui/TextArea";

// const FieldWrapper = ({ label, required, children }) => (
//     <div className="bg-gray-100 rounded-lg p-3 flex flex-col gap-1">
//         <label className="text-sm font-medium text-gray-700">
//             {label} {required && <span className="text-red-500">*</span>}
//         </label>
//         {children}
//     </div>
// );

// const Input = ({ placeholder, type = "text" }) => (
//     <input
//         type={type}
//         placeholder={placeholder}
//         className="bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
//     />
// );

// const Textarea = ({ placeholder, rows = 4 }) => (
//     <textarea
//         rows={rows}
//         placeholder={placeholder}
//         className="bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 resize-none w-full"
//     />
// );

// const Select = ({ placeholder }) => (
//     <div className="flex items-center justify-between cursor-pointer">
//         <span className="text-sm text-gray-400">{placeholder}</span>
//         <FiChevronDown className="text-gray-400" />
//     </div>
// );

// const DateInput = ({ placeholder }) => (
//     <div className="flex items-center justify-between">
//         <input
//             type="text"
//             placeholder={placeholder}
//             className="bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400 flex-1"
//         />
//         <FiCalendar className="text-gray-400 ml-2" />
//     </div>
// );

const AddClientForm = () => {
    const { closeAddClientForm } = useClientContext();

    return (
        <div className="bg-white rounded-xl shadow p-6 flex gap-6">
            {/* Left Tag */}
            <div className="w-48 h-25 text-xl font-semibold text-gray-100 bg-customGreen rounded-xl flex items-center justify-center">
                Client Information
            </div>

            {/* Right Form */}
            <div className="flex-1 flex flex-col gap-6">
                {/* Heading */}
                <h2 className="text-xl font-semibold text-gray-800">
                    Add Information
                </h2>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* col 1 */}
                    <div className="flex flex-col gap-4">
                        <FieldWrapper label="Contact No. / Client ID" required>
                            <Input placeholder="Type here" />
                        </FieldWrapper>

                        <FieldWrapper label="Select Type" required>
                            <Select placeholder="Select" />
                        </FieldWrapper>

                        <FieldWrapper label="Industry" required>
                            <Input placeholder="12345-1234567-1" />
                        </FieldWrapper>

                        <FieldWrapper label="Phone Office 1" required>
                            <Input placeholder="Type here" />
                        </FieldWrapper>

                        <FieldWrapper label="Email ID" required>
                            <Input placeholder="Type here" />
                        </FieldWrapper>

                        <FieldWrapper label="City" required>
                            <Select placeholder="Select" />
                        </FieldWrapper>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col gap-4">
                        <FieldWrapper label="Date" required>
                            <DateInput placeholder="25/12/2025" />
                        </FieldWrapper>

                        <FieldWrapper label="Client Name" required>
                            <Input placeholder="Type here" />
                        </FieldWrapper>

                        <FieldWrapper label="Client Website">
                            <Input placeholder="Type here" />
                        </FieldWrapper>

                        <FieldWrapper label="Phone Office 2">
                            <Input placeholder="Type here" />
                        </FieldWrapper>

                        <FieldWrapper label="Address">
                            <Input placeholder="Type here" />
                        </FieldWrapper>

                        <FieldWrapper label="Province" required>
                            <Select placeholder="Select" />
                        </FieldWrapper>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-xl font-semibold text-gray-800">
                    Contact Person (POC)
                </h2>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* col 1 */}
                    <div className="flex flex-col gap-4">
                        <FieldWrapper label="Full Name" required>
                            <Input placeholder="Type here" />
                        </FieldWrapper>
                        <FieldWrapper label="POC Email">
                            <Input placeholder="Type here" />
                        </FieldWrapper>
                        <FieldWrapper label="Add Remarks">
                            <Textarea placeholder="Type here" />
                        </FieldWrapper>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col gap-4">
                        <FieldWrapper label="POC Designation" required>
                            <DateInput placeholder="Type here" />
                        </FieldWrapper>

                        <FieldWrapper label="POC Contact No." required>
                            <Input placeholder="Type here" />
                        </FieldWrapper>

                        <div className="flex flex-col items-end gap-3">
                            <div className="flex flex-col gap-3 w-full max-w-md">
                                {/* Top full-width button */}
                                <button
                                    className="
      w-full
      border border-customBlue
      text-customBlue
      px-4 py-2.5
      rounded-lg
      cursor-pointer
      text-sm font-medium
      transition
      hover:bg-customBlue/10
    "
                                >
                                    Assign POC Company Manager
                                </button>

                                {/* Bottom buttons */}
                                <div className="flex gap-3 w-full">
                                    <button
                                        onClick={closeAddClientForm}
                                        className="
        flex-1
        border border-customBlue
        text-customBlue
        px-4 py-2.5
        rounded-lg
        cursor-pointer
        text-sm font-medium
        transition
        hover:bg-customBlue/10
      "
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        className="
        flex-1
        bg-customBlue
        text-gray-100
        px-4 py-2.5
        rounded-lg
        cursor-pointer
        text-sm font-medium
        transition
        hover:bg-customBlue/90
      "
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>



                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddClientForm;
