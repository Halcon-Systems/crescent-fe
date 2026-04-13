import React, { useEffect, useState } from 'react'
import { FiChevronDown, FiCalendar } from "react-icons/fi";
import FieldWrapper from '../ui/FieldWrapper';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/TextArea';
import DateInput from '../ui/DateInput';
import { useSaleById } from '../../hooks/sales/useSaleById';

const AccountsApprovalForm = () => {
    // Use saleId = 1 for now
    const saleId = 1;
    const { data: sale, loading } = useSaleById(saleId);

    // Use sale as the single source of truth for autofill
    const [form, setForm] = useState({});

    // No useEffect needed; form state is only for user edits, sale is always the default

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <div>Loading...</div>;

    // Helper to get value: prefer local edit, else sale, else ''
    const getValue = (field) =>
        form[field] !== undefined ? form[field] : (sale?.[field] ?? '');

    return (
        <>
            <div className="flex-1 flex flex-col gap-3 md:gap-4">
                {/* Heading */}
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Accounts Approval
                </h2>

                {/* Form Grid - 2 columns on medium and large screens */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                    {/* Column 1 - Client Information */}
                    <div className="flex flex-col gap-3 md:gap-3">
                        <FieldWrapper label="Select Client Category" required className="text-sm">
                            <Select name="clientCategory" value={getValue('clientCategory')} onChange={handleChange} placeholder="Select" className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="Select IR No." className="text-sm">
                            <Select name="irNo" value={getValue('irNo')} onChange={handleChange} placeholder="Select" className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="Full Name" className="text-sm">
                            <Input name="fullName" value={getValue('fullName')} onChange={handleChange} placeholder="Full Name" className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="CNIC No." className="text-sm">
                            <Input name="cnic" value={getValue('cnic')} onChange={handleChange} placeholder="CNIC No." className="text-sm py-2" />
                        </FieldWrapper>
                        
                        <FieldWrapper label="Phone Home" className="text-sm">
                            <Input name="phoneHome" value={getValue('phoneHome')} onChange={handleChange} placeholder="Phone Home" className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="Email ID" className="text-sm">
                            <Input name="email" value={getValue('email')} onChange={handleChange} placeholder="Email ID" className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="Address" className="text-sm">
                            <Input name="address" value={getValue('address')} onChange={handleChange} placeholder="Address" className="text-sm py-2" />
                        </FieldWrapper>
                    </div>

                    {/* Column 2 - Client Details */}
                    <div className="flex flex-col gap-3 md:gap-3">
                        <FieldWrapper label="Select Client Status" required className="text-sm">
                            <Select name="clientStatus" value={getValue('clientStatus')} onChange={handleChange} placeholder="Select" className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="Cell No." className="text-sm">
                            <Input name="cellNo" value={getValue('cellNo')} onChange={handleChange} placeholder="Cell No." className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="Father Name" className="text-sm">
                            <Input name="fatherName" value={getValue('fatherName')} onChange={handleChange} placeholder="Father Name" className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="Date of Birth" className="text-sm">
                            <DateInput name="dob" value={getValue('dob')} onChange={handleChange} placeholder="Date of Birth" className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="Phone Office" className="text-sm">
                            <Input name="phoneOffice" value={getValue('phoneOffice')} onChange={handleChange} placeholder="Phone Office" className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="Company/ Department" className="text-sm">
                            <Input name="company" value={getValue('company')} onChange={handleChange} placeholder="Company/Department" className="text-sm py-2" />
                        </FieldWrapper>
                        
                        <FieldWrapper label="Address Line 2" className="text-sm">
                            <Input name="address2" value={getValue('address2')} onChange={handleChange} placeholder="Address Line 2" className="text-sm py-2" />
                        </FieldWrapper>
                    </div>
                </div>

                {/* Product & Package Section */}
                <div className="mt-4 md:mt-6">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 md:mb-4">
                        Select Product & Package
                    </h2>

                    {/* Product Grid - 2 columns on medium and large screens */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                        {/* Column 1 */}
                        <div className="flex flex-col gap-3 md:gap-3">
                            <FieldWrapper label="Select Product" required className="text-sm">
                                <Select name="product" value={getValue('product')} onChange={handleChange} placeholder="Select" className="text-sm py-2" />
                            </FieldWrapper>
                            
                            <FieldWrapper label="Sale Amount" required className="text-sm">
                                <Input name="saleAmount" value={getValue('saleAmount')} onChange={handleChange} placeholder="Sale Amount" className="text-sm py-2" />
                            </FieldWrapper>
                            
                            <FieldWrapper label="Sale Type" required className="text-sm">
                                <Input name="saleType" value={getValue('saleType')} onChange={handleChange} placeholder="Sale Type" className="text-sm py-2" />
                            </FieldWrapper>
                            
                            <FieldWrapper label="Account Remarks" className="text-sm">
                                <Textarea 
                                    name="accountRemarks"
                                    value={getValue('accountRemarks')}
                                    onChange={handleChange}
                                    placeholder="Account Remarks"
                                    className="min-h-[60px] md:min-h-[80px] text-sm"
                                />
                            </FieldWrapper>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-3 md:gap-3">
                            <FieldWrapper label="Select Package Type" required className="text-sm">
                                <Select name="packageType" value={getValue('packageType')} onChange={handleChange} placeholder="Select" className="text-sm py-2" />
                            </FieldWrapper>

                            <FieldWrapper label="Renewal Charges" required className="text-sm">
                                <Input name="renewalCharges" value={getValue('renewalCharges')} onChange={handleChange} placeholder="Renewal Charges" className="text-sm py-2" />
                            </FieldWrapper>

                            <FieldWrapper label="Sales Remarks" className="text-sm">
                                <Textarea 
                                    name="salesRemarks"
                                    value={getValue('salesRemarks')}
                                    onChange={handleChange}
                                    placeholder="Sales Remarks"
                                    className="min-h-[60px] md:min-h-[80px] text-sm"
                                />
                            </FieldWrapper>
                        </div>
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="flex flex-col md:flex-row justify-end gap-3 mt-6 md:mt-8">
                    <button
                        className="
                            w-full md:w-auto
                            bg-red-600
                            text-gray-100
                            px-4 py-2
                            rounded-lg
                            cursor-pointer
                            text-sm font-medium
                            transition
                            hover:bg-red-700
                        "
                    >
                        Hold
                    </button>

                    <button
                        className="
                            w-full md:w-auto
                            bg-customBlue
                            text-gray-100
                            px-4 py-2
                            rounded-lg
                            cursor-pointer
                            text-sm font-medium
                            transition
                            hover:bg-customBlue/90
                        "
                    >
                        Save & Submit
                    </button>
                </div>
            </div>
        </>
    )
}

export default AccountsApprovalForm;