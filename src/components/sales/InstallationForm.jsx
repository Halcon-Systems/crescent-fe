"use client";
import React, { useState } from "react";
import FieldWrapper from "../ui/FieldWrapper";
import Select from "../ui/Select";
import Input from "../ui/Input";
import Textarea from "../ui/TextArea";
import DateInput from "../ui/DateInput";

const TABS = {
    CLIENT: "client",
    PRODUCT: "product",
    VEHICLE: "vehicle",
};

const InstallationForm = () => {
    const [activeTab, setActiveTab] = useState(TABS.CLIENT);

    const tabButtonClasses = (isActive) =>
        `
    px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
    ${isActive
            ? "bg-customGreen text-gray-100 shadow-sm"
            : "border border-customGreen text-gray-900 hover:bg-customGreen/10 cursor-pointer"
        }
  `;

    const handleNext = () => {
        if (activeTab === TABS.CLIENT) {
            setActiveTab(TABS.PRODUCT);
        } else if (activeTab === TABS.PRODUCT) {
            setActiveTab(TABS.VEHICLE);
        }
    };


    return (
        <div className="flex-1 flex flex-col gap-6">
            {/* Tabs */}
            <div className="flex flex-wrap gap-3">
                <button
                    className={tabButtonClasses(activeTab === TABS.CLIENT)}
                    onClick={() => setActiveTab(TABS.CLIENT)}
                >
                    Client Details
                </button>

                <button
                    className={tabButtonClasses(activeTab === TABS.PRODUCT)}
                    onClick={() => setActiveTab(TABS.PRODUCT)}
                >
                    Product & Package Details
                </button>

                <button
                    className={tabButtonClasses(activeTab === TABS.VEHICLE)}
                    onClick={() => setActiveTab(TABS.VEHICLE)}
                >
                    Vehicle & Installation Details
                </button>
            </div>

            {/* ================= Client Details Form ================= */}
            {activeTab === TABS.CLIENT && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-4">
                            <FieldWrapper label="Select Client Category" required>
                                <Select placeholder="Select" />
                            </FieldWrapper>

                            <FieldWrapper label="Select IR No.">
                                <Select placeholder="Select" />
                            </FieldWrapper>

                            <FieldWrapper label="Full Name" required>
                                <Input placeholder="Type here" />
                            </FieldWrapper>

                            <FieldWrapper label="CNIC No." required>
                                <Input placeholder="12345-1234567-1" />
                            </FieldWrapper>

                            <FieldWrapper label="Phone Home" required>
                                <Input placeholder="Type here" />
                            </FieldWrapper>

                            <FieldWrapper label="Email ID" required>
                                <Input placeholder="Type here" />
                            </FieldWrapper>

                            <FieldWrapper label="Address" required>
                                <Input placeholder="Type here" />
                            </FieldWrapper>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-4">
                            <FieldWrapper label="Select Client Status" required>
                                <Select placeholder="Select" />
                            </FieldWrapper>

                            <FieldWrapper label="Cell No." required>
                                <Input placeholder="Type here" />
                            </FieldWrapper>

                            <FieldWrapper label="Father Name" required>
                                <Input placeholder="Type here" />
                            </FieldWrapper>

                            <FieldWrapper label="Date of Birth">
                                <DateInput placeholder="Select (dd/mm/yyyy)" />
                            </FieldWrapper>

                            <FieldWrapper label="Phone Office">
                                <Input placeholder="Type here" />
                            </FieldWrapper>

                            <FieldWrapper label="Company / Department">
                                <Input placeholder="Type here" />
                            </FieldWrapper>

                            <FieldWrapper label="Address Line 2">
                                <Input placeholder="Type here" />
                            </FieldWrapper>
                        </div>
                    </div>
                </>
            )}

            {/* ================= Product & Package ================= */}
            {activeTab === TABS.PRODUCT && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-4">
                            <FieldWrapper label="Select Product" required>
                                <Select placeholder="Select" />
                            </FieldWrapper>

                            <FieldWrapper label="Installation Date" required>
                                <DateInput placeholder="Select (dd/mm/yyyy)" />
                            </FieldWrapper>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-4">
                            <FieldWrapper label="Select Package Type" required>
                                <Select placeholder="Select" />
                            </FieldWrapper>

                            <FieldWrapper label="Renewal Date" required>
                                <DateInput placeholder="Select (dd/mm/yyyy)" />
                            </FieldWrapper>
                        </div>
                    </div>
                    {/* Heading */}
                    <h2 className="text-xl font-semibold text-gray-800">
                        Device & Accessories
                    </h2>

                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* col 1 */}
                        <div className="flex flex-col gap-4">
                            <FieldWrapper label="Select Product" required>
                                <Select placeholder="Select" />
                            </FieldWrapper>
                            <FieldWrapper label="Select Zone" required>
                                <Select placeholder="Select" />
                            </FieldWrapper>
                            <FieldWrapper label="Select Device Combo" required>
                                <Select placeholder="Select" />
                            </FieldWrapper>
                            <FieldWrapper label="Select SIM" required>
                                <Select placeholder="Select" />
                            </FieldWrapper>
                            <FieldWrapper label="Select Accessories 2" required>
                                <Select placeholder="Select" />
                            </FieldWrapper>
                        </div>

                        {/* Row 2 */}
                        <div className="flex flex-col gap-4">
                            <FieldWrapper label="Select Package Type" required>
                                <Select placeholder="Select" />
                            </FieldWrapper>

                            <FieldWrapper label="Assign Technician" required>
                                <Input placeholder="Type here" />
                            </FieldWrapper>

                            <FieldWrapper label="Select Device" required>
                                <Select placeholder="Select" />
                            </FieldWrapper>
                            <FieldWrapper label="Select Accessories 1" required>
                                <Select placeholder="Select" />
                            </FieldWrapper>
                            <FieldWrapper label="Select Accessories 3" required>
                                <Select placeholder="Select" />
                            </FieldWrapper>
                        </div>
                    </div>
                </>
            )}

            {/* ================= Vehicle & Installation ================= */}
            {activeTab === TABS.VEHICLE && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-4">
                            <FieldWrapper label="Registration No." required>
                                <Input placeholder="Type (ABC-1234)" />
                            </FieldWrapper>
                            <FieldWrapper label="Engine No." required>
                                <Input placeholder="Auto" />
                            </FieldWrapper>
                            <FieldWrapper label="Chassis No." required>
                                <Input placeholder="Type here" />
                            </FieldWrapper>

                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-4">
                            <FieldWrapper label="Make/Model" required>
                                <Input placeholder="Type here" />
                            </FieldWrapper>

                            <FieldWrapper label="Year" required>
                                <DateInput placeholder="Select (dd/mm/yyyy)" />
                            </FieldWrapper>

                            <FieldWrapper label="Color" required>
                                <Input placeholder="Type here" />
                            </FieldWrapper>

                        </div>
                    </div>
                </>
            )}

            {/* Bottom Buttons */}
            <div className="flex justify-end gap-3 pt-4">
                <button
                    className="
            text-customBlue
            border border-customBlue
            px-5 py-2.5
            rounded-lg
            text-sm font-medium
            transition
            hover:bg-gray-100
          "
                >
                    Save
                </button>

                <button
                    onClick={handleNext}
                    disabled={activeTab === TABS.VEHICLE}
                    className={`
        px-5 py-2.5 rounded-lg text-sm font-medium transition
        ${activeTab === TABS.VEHICLE
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-customBlue text-gray-100 hover:bg-customBlue/90"
                        }
    `}
                >
                    {activeTab === TABS.VEHICLE ? "Submit" : "Next"}
                </button>
            </div>
        </div>
    );
};

export default InstallationForm;
