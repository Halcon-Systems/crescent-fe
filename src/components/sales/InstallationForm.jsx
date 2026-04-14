"use client";
import React, { useEffect, useMemo, useState } from "react";
import FieldWrapper from "../ui/FieldWrapper";
import Select from "../ui/Select";
import Input from "../ui/Input";
import Textarea from "../ui/TextArea";
import DateInput from "../ui/DateInput";
import ConfidentialForm from "./ConfidentialForm";
import { useUpdateTechnicianStage } from "@/hooks/sales/useUpdateTechnicianStage";
import { useSaleById } from "@/hooks/sales/useSaleById";
import { useClientCategories } from "@/hooks/client-category/useClientCategories";

const TABS = {
    CLIENT: "client",
    PRODUCT: "product",
    VEHICLE: "vehicle",
};

const mapOptions = (items, idKeys, labelKeys) =>
    (items || []).map((item) => {
        const value = idKeys.map((k) => item?.[k]).find((v) => v !== undefined && v !== null);
        const label = labelKeys.map((k) => item?.[k]).find((v) => typeof v === 'string' && v.trim() !== '');
        return { value: String(value ?? ''), label: label || `ID: ${value}` };
    }).filter((opt) => opt.value);

const InstallationForm = ({ saleId }) => {
    const [activeTab, setActiveTab] = useState(TABS.CLIENT);
    const [confidentialForm, setConfidentialForm] = useState(false)
    const { update, loading, error } = useUpdateTechnicianStage();
    const { data: sale } = useSaleById(saleId);
    const { data: clientCategories = [] } = useClientCategories();
    const [successMessage, setSuccessMessage] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [form, setForm] = useState({
        installationDate: "",
        renewalDate: "",
        registrationNo: "",
        engineNo: "",
        transmissionType: "AUTO",
        chassisNo: "",
        makeModel: "",
        vehicleYear: "",
        color: "",
    });

    // Create client category options
    const clientCategoryOptions = useMemo(
        () => mapOptions(clientCategories, ['id', 'clientCategoryId', '_id'], ['categoryName', 'name', 'label']),
        [clientCategories]
    );

    const normalizedSale = useMemo(() => {
        const client = sale?.clientDetails || {};
        const product = sale?.productDetails || {};
        return {
            clientCategory: client?.clientCategory?.categoryName || sale?.clientCategory?.categoryName || "",
            irNo: client?.irNo || sale?.irNo || "",
            fullName: client?.fullName || sale?.fullName || "",
            cnicNo: client?.cnicNo || sale?.cnicNo || "",
            phoneHome: client?.phoneHome || sale?.phoneHome || "",
            emailId: client?.emailId || sale?.emailId || "",
            address: client?.address || sale?.address || "",
            clientStatus: client?.clientStatus || sale?.clientStatus || "",
            cellNo: client?.cellNo || sale?.cellNo || "",
            fatherName: client?.fatherName || sale?.fatherName || "",
            dateOfBirth: (client?.dateOfBirth || sale?.dateOfBirth || "").slice(0, 10),
            phoneOffice: client?.phoneOffice || sale?.phoneOffice || "",
            companyDepartment: client?.companyDepartment || sale?.companyDepartment || "",
            addressLine2: client?.addressLine2 || sale?.addressLine2 || "",
            productName: product?.product?.productName || sale?.product?.productName || "",
            packageName: product?.package?.packageName || sale?.package?.packageName || "",
        };
    }, [sale]);

    useEffect(() => {
        const stage = sale?.installation || sale?.technicianStage || sale?.technician || {};
        setForm((prev) => ({
            ...prev,
            installationDate: stage.installationDate || prev.installationDate,
            renewalDate: stage.renewalDate || prev.renewalDate,
            registrationNo: stage.registrationNo || prev.registrationNo,
            engineNo: stage.engineNo || prev.engineNo,
            transmissionType: stage.transmissionType || prev.transmissionType,
            chassisNo: stage.chassisNo || prev.chassisNo,
            makeModel: stage.makeModel || prev.makeModel,
            vehicleYear: stage.vehicleYear ? String(stage.vehicleYear) : prev.vehicleYear,
            color: stage.color || prev.color,
        }));
        
        // Set selected category from sale data
        if (sale?.clientDetails?.clientCategoryId || sale?.clientCategoryId) {
            setSelectedCategoryId(String(sale?.clientDetails?.clientCategoryId || sale?.clientCategoryId || ''));
        }
    }, [sale]);

    const tabButtonClasses = (isActive) =>
        `
    px-3 py-2 md:px-4 md:py-2.5 rounded-lg text-sm md:text-sm font-medium transition-all duration-200
    whitespace-nowrap
    ${isActive
            ? "bg-customGreen text-gray-100 shadow-sm"
            : "border border-customGreen text-gray-900 hover:bg-customGreen/10 cursor-pointer"
        }
  `;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSuccessMessage("");
        setValidationMessage("");
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = async () => {
        if (activeTab === TABS.CLIENT) {
            setActiveTab(TABS.PRODUCT);
        } else if (activeTab === TABS.PRODUCT) {
            setActiveTab(TABS.VEHICLE);
        } else if (activeTab === TABS.VEHICLE && saleId) {
            const requiredFields = [
                "installationDate",
                "renewalDate",
                "registrationNo",
                "engineNo",
                "transmissionType",
                "chassisNo",
                "makeModel",
                "vehicleYear",
                "color",
            ];
            const missing = requiredFields.filter((field) => !form[field]);
            if (missing.length) {
                setValidationMessage("Please complete all required installation fields before submit.");
                return;
            }
            await update(saleId, {
                installationDate: form.installationDate || undefined,
                renewalDate: form.renewalDate || undefined,
                registrationNo: form.registrationNo || undefined,
                engineNo: form.engineNo || undefined,
                transmissionType: form.transmissionType || undefined,
                chassisNo: form.chassisNo || undefined,
                makeModel: form.makeModel || undefined,
                vehicleYear: Number(form.vehicleYear) || undefined,
                color: form.color || undefined,
                markComplete: true,
            });
            setSuccessMessage("Installation submitted successfully.");
        }
    };


    return (
        <div className="flex-1 flex flex-col gap-4 md:gap-6">
            {!saleId && <div className="text-sm text-yellow-700">Create a sale first, then complete installation by technician.</div>}
            {/* Tabs */}
            {
                !confidentialForm && (
                    <div className="flex flex-wrap gap-2 md:gap-3 overflow-x-auto pb-1">
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
                            Product & Package
                        </button>

                        <button
                            className={tabButtonClasses(activeTab === TABS.VEHICLE)}
                            onClick={() => setActiveTab(TABS.VEHICLE)}
                        >
                            Vehicle & Installation
                        </button>
                    </div>
                )
            }

            {/* ================= Client Details Form ================= */}
            {activeTab === TABS.CLIENT && !confidentialForm && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-3 md:gap-3">
                            <FieldWrapper label="Select Client Category" required className="text-sm">
                                <Select 
                                    value={selectedCategoryId} 
                                    onChange={(e) => setSelectedCategoryId(e.target.value)} 
                                    placeholder="Choose client category" 
                                    className="text-sm py-2" 
                                    options={clientCategoryOptions}
                                />
                            </FieldWrapper>

                            <FieldWrapper label="Select IR No." className="text-sm">
                                <Input value={normalizedSale.irNo || ""} placeholder="Select" className="text-sm py-2" disabled />
                            </FieldWrapper>

                            <FieldWrapper label="Full Name" required className="text-sm">
                                <Input value={normalizedSale.fullName || ""} placeholder="Type here" className="text-sm py-2" disabled />
                            </FieldWrapper>

                            <FieldWrapper label="CNIC No." required className="text-sm">
                                <Input value={normalizedSale.cnicNo || ""} placeholder="12345-1234567-1" className="text-sm py-2" disabled />
                            </FieldWrapper>

                            <FieldWrapper label="Phone Home" required className="text-sm">
                                <Input value={normalizedSale.phoneHome || ""} placeholder="Type here" className="text-sm py-2" disabled />
                            </FieldWrapper>

                            <FieldWrapper label="Email ID" required className="text-sm">
                                <Input value={normalizedSale.emailId || ""} placeholder="Type here" className="text-sm py-2" disabled />
                            </FieldWrapper>

                            <FieldWrapper label="Address" required className="text-sm">
                                <Input value={normalizedSale.address || ""} placeholder="Type here" className="text-sm py-2" disabled />
                            </FieldWrapper>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-3 md:gap-3">
                            <FieldWrapper label="Select Client Status" required className="text-sm">
                                <Input value={normalizedSale.clientStatus || ""} placeholder="Select" className="text-sm py-2" disabled />
                            </FieldWrapper>

                            <FieldWrapper label="Cell No." required className="text-sm">
                                <Input value={normalizedSale.cellNo || ""} placeholder="Type here" className="text-sm py-2" disabled />
                            </FieldWrapper>

                            <FieldWrapper label="Father Name" required className="text-sm">
                                <Input value={normalizedSale.fatherName || ""} placeholder="Type here" className="text-sm py-2" disabled />
                            </FieldWrapper>

                            <FieldWrapper label="Date of Birth" className="text-sm">
                                <Input value={normalizedSale.dateOfBirth || ""} placeholder="Select (dd/mm/yyyy)" className="text-sm py-2" disabled />
                            </FieldWrapper>

                            <FieldWrapper label="Phone Office" className="text-sm">
                                <Input value={normalizedSale.phoneOffice || ""} placeholder="Type here" className="text-sm py-2" disabled />
                            </FieldWrapper>

                            <FieldWrapper label="Company / Department" className="text-sm">
                                <Input value={normalizedSale.companyDepartment || ""} placeholder="Type here" className="text-sm py-2" disabled />
                            </FieldWrapper>

                            <FieldWrapper label="Address Line 2" className="text-sm">
                                <Input value={normalizedSale.addressLine2 || ""} placeholder="Type here" className="text-sm py-2" disabled />
                            </FieldWrapper>
                        </div>
                    </div>
                </>
            )}

            {/* ================= Product & Package ================= */}
            {activeTab === TABS.PRODUCT && !confidentialForm && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-3 md:gap-3">
                            <FieldWrapper label="Select Product" required className="text-sm">
                                <Input value={normalizedSale.productName || ""} placeholder="Select" className="text-sm py-2" disabled />
                            </FieldWrapper>

                            <FieldWrapper label="Installation Date" required className="text-sm">
                                <DateInput name="installationDate" value={form.installationDate} onChange={handleChange} placeholder="Select (dd/mm/yyyy)" className="text-sm py-2" />
                            </FieldWrapper>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-3 md:gap-3">
                            <FieldWrapper label="Select Package Type" required className="text-sm">
                                <Input value={normalizedSale.packageName || ""} placeholder="Select" className="text-sm py-2" disabled />
                            </FieldWrapper>

                            <FieldWrapper label="Renewal Date" required className="text-sm">
                                <DateInput name="renewalDate" value={form.renewalDate} onChange={handleChange} placeholder="Select (dd/mm/yyyy)" className="text-sm py-2" />
                            </FieldWrapper>
                        </div>
                    </div>
                    
                    {/* Device & Accessories Section */}
                    <div className="mt-4 md:mt-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
                            Device & Accessories
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                            {/* col 1 */}
                            <div className="flex flex-col gap-3 md:gap-3">
                                <FieldWrapper label="Select Product" required className="text-sm">
                                    <Input value={normalizedSale.productName || ""} placeholder="Select" className="text-sm py-2" disabled />
                                </FieldWrapper>
                                <FieldWrapper label="Select Zone" required className="text-sm">
                                    <Select placeholder="Select" className="text-sm py-2" />
                                </FieldWrapper>
                                <FieldWrapper label="Select Device Combo" required className="text-sm">
                                    <Select placeholder="Select" className="text-sm py-2" />
                                </FieldWrapper>
                                <FieldWrapper label="Select SIM" required className="text-sm">
                                    <Select placeholder="Select" className="text-sm py-2" />
                                </FieldWrapper>
                                <FieldWrapper label="Select Accessories 2" required className="text-sm">
                                    <Select placeholder="Select" className="text-sm py-2" />
                                </FieldWrapper>
                            </div>

                            {/* Column 2 */}
                            <div className="flex flex-col gap-3 md:gap-3">
                                <FieldWrapper label="Select Package Type" required className="text-sm">
                                    <Input value={normalizedSale.packageName || ""} placeholder="Select" className="text-sm py-2" disabled />
                                </FieldWrapper>

                                <FieldWrapper label="Assign Technician" required className="text-sm">
                                    <Input placeholder="Type here" className="text-sm py-2" />
                                </FieldWrapper>

                                <FieldWrapper label="Select Device" required className="text-sm">
                                    <Select placeholder="Select" className="text-sm py-2" />
                                </FieldWrapper>
                                <FieldWrapper label="Select Accessories 1" required className="text-sm">
                                    <Select placeholder="Select" className="text-sm py-2" />
                                </FieldWrapper>
                                <FieldWrapper label="Select Accessories 3" required className="text-sm">
                                    <Select placeholder="Select" className="text-sm py-2" />
                                </FieldWrapper>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* ================= Vehicle & Installation ================= */}
            {activeTab === TABS.VEHICLE && !confidentialForm && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-3 md:gap-3">
                            <FieldWrapper label="Registration No." required className="text-sm">
                                <Input name="registrationNo" value={form.registrationNo} onChange={handleChange} placeholder="Type (ABC-1234)" className="text-sm py-2" />
                            </FieldWrapper>
                            <FieldWrapper label="Engine No." required className="text-sm">
                                <Input name="engineNo" value={form.engineNo} onChange={handleChange} placeholder="Type here" className="text-sm py-2" />
                            </FieldWrapper>
                            <FieldWrapper label="Transmission Type" required className="text-sm">
                                <Select
                                    name="transmissionType"
                                    value={form.transmissionType}
                                    onChange={handleChange}
                                    placeholder="Select"
                                    className="text-sm py-2"
                                    options={[
                                        { value: "AUTO", label: "Auto" },
                                        { value: "MANUAL", label: "Manual" },
                                    ]}
                                />
                            </FieldWrapper>
                            <FieldWrapper label="Chassis No." required className="text-sm">
                                <Input name="chassisNo" value={form.chassisNo} onChange={handleChange} placeholder="Type here" className="text-sm py-2" />
                            </FieldWrapper>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-3 md:gap-3">
                            <FieldWrapper label="Make/Model" required className="text-sm">
                                <Input name="makeModel" value={form.makeModel} onChange={handleChange} placeholder="Type here" className="text-sm py-2" />
                            </FieldWrapper>

                            <FieldWrapper label="Year" required className="text-sm">
                                <Input name="vehicleYear" value={form.vehicleYear} onChange={handleChange} placeholder="Type year (e.g. 2023)" className="text-sm py-2" />
                            </FieldWrapper>

                            <FieldWrapper label="Color" required className="text-sm">
                                <Input name="color" value={form.color} onChange={handleChange} placeholder="Type here" className="text-sm py-2" />
                            </FieldWrapper>
                        </div>
                    </div>
                </>
            )}

            {
                confidentialForm && <ConfidentialForm />
            }

            {/* Bottom Buttons */}
            {
                !confidentialForm && (
                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                        <button
                            className="
                w-full sm:w-auto
                text-customBlue
                border border-customBlue
                px-4 py-2
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
                            disabled={loading || !saleId}
                            className={`
                w-full sm:w-auto
                px-4 py-2 rounded-lg text-sm font-medium transition
                ${loading || !saleId
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-customBlue text-gray-100 hover:bg-customBlue/90"
                                }
            `}
                        >
                            {activeTab === TABS.VEHICLE ? (loading ? "Submitting..." : "Submit") : "Next"}
                        </button>
                    </div>
                )
            }
            {validationMessage && <div className="text-sm text-amber-700">{validationMessage}</div>}
            {error && <div className="text-sm text-red-600">{error}</div>}
            {successMessage && <div className="text-sm text-green-600">{successMessage}</div>}
        </div>
    );
};

export default InstallationForm;