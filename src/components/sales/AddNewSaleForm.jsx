
import React, { useState } from 'react';
import { FiChevronDown, FiCalendar } from "react-icons/fi";
import FieldWrapper from '../ui/FieldWrapper';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/TextArea';
import DateInput from '../ui/DateInput';
import { useCreateSale } from '../../hooks/sales/useUpdateSalesStage';
import { useClientCategories } from '../../hooks/client-category/useClientCategories';
import { useProducts } from '../../hooks/product/useProducts';
import { usePackages } from '../../hooks/package/usePackages';

const initialForm = {
    clientCategoryId: '',
    irNo: '',
    fullName: '',
    cnicNo: '',
    phoneHome: '',
    email: '',
    address: '',
    clientStatus: '',
    cellNo: '',
    fatherName: '',
    dateOfBirth: '',
    phoneOffice: '',
    company: '',
    address2: '',
    product: '',
    saleAmount: '',
    saleType: '',
    packageType: '',
    renewalCharges: '',
    salesRemarks: '',
};

const AddNewSaleForm = ({ onSuccess }) => {
    const [form, setForm] = useState(initialForm);
    const { create, loading, error, data } = useCreateSale();
    const { data: clientCategories, isLoading: loadingCategories } = useClientCategories();
    const { data: products, isLoading: loadingProducts } = useProducts();
    const { data: packages, isLoading: loadingPackages } = usePackages();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const sale = await create(form);
            if (onSuccess && sale) onSuccess(sale);
            // Optionally reset form or show success
        } catch (err) {
            // Error handled by hook
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex-1 flex flex-col gap-3 md:gap-4">
                {/* Heading */}
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Add New Sale
                </h2>

                {/* Form Grid - 2 columns on medium and large screens */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
                    {/* Column 1 - Client Information */}
                    <div className="flex flex-col gap-3 md:gap-3">
                        <FieldWrapper label="Select Client Category" required className="text-sm">
                            <Select
                                name="clientCategory"
                                value={form.clientCategory}
                                onChange={handleChange}
                                placeholder={loadingCategories ? "Loading client categories..." : "Choose client category"}
                                className="text-sm py-2"
                                options={
                                    clientCategories?.map(cat => ({
                                        value: cat.id || cat._id || cat.value || cat.categoryName,
                                        label: cat.categoryName || cat.label || cat.name
                                    })) || []
                                }
                                disabled={loadingCategories}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Select IR No." className="text-sm">
                            <Select
                                name="irNo"
                                value={form.irNo}
                                onChange={handleChange}
                                placeholder="Choose IR number"
                                className="text-sm py-2"
                                options={[
                                    { value: 'IR-1001', label: 'IR-1001' },
                                    { value: 'IR-1002', label: 'IR-1002' },
                                    { value: 'IR-1003', label: 'IR-1003' },
                                    { value: 'IR-1004', label: 'IR-1004' },
                                ]}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Full Name" className="text-sm">
                            <Input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter full name" className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="CNIC No." className="text-sm">
                            <Input
                                name="cnic"
                                value={form.cnic}
                                onChange={e => {
                                    let val = e.target.value.replace(/[^0-9]/g, '');
                                    if (val.length > 13) val = val.slice(0, 13);
                                    handleChange({ target: { name: 'cnic', value: val } });
                                }}
                                placeholder="Enter 13-digit CNIC (without dashes)"
                                className="text-sm py-2"
                                maxLength={13}
                            />
                        </FieldWrapper>
                        
                        <FieldWrapper label="Phone Home" className="text-sm">
                            <Input
                                name="phoneHome"
                                value={form.phoneHome}
                                onChange={e => {
                                    let val = e.target.value.replace(/[^0-9]/g, '');
                                    if (val.length > 11) val = val.slice(0, 11);
                                    handleChange({ target: { name: 'phoneHome', value: val } });
                                }}
                                placeholder="Enter home phone (11 digits)"
                                className="text-sm py-2"
                                maxLength={11}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Email ID" className="text-sm">
                            <Input name="email" value={form.email} onChange={handleChange} placeholder="Enter email address" className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="Address" className="text-sm">
                            <Input name="address" value={form.address} onChange={handleChange} placeholder="Enter address" className="text-sm py-2" />
                        </FieldWrapper>
                    </div>

                    {/* Column 2 - Client Details */}
                    <div className="flex flex-col gap-3 md:gap-3">
                        <FieldWrapper label="Select Client Status" required className="text-sm">
                            <Select
                                name="clientStatus"
                                value={form.clientStatus}
                                onChange={handleChange}
                                placeholder="Choose client status"
                                className="text-sm py-2"
                                options={[
                                    { value: 'active', label: 'Active' },
                                    { value: 'inactive', label: 'Inactive' },
                                    { value: 'pending', label: 'Pending' },
                                    { value: 'blocked', label: 'Blocked' },
                                ]}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Cell No." className="text-sm">
                            <Input
                                name="cellNo"
                                value={form.cellNo}
                                onChange={e => {
                                    let val = e.target.value.replace(/[^0-9]/g, '');
                                    if (val.length > 11) val = val.slice(0, 11);
                                    handleChange({ target: { name: 'cellNo', value: val } });
                                }}
                                placeholder="Enter mobile number (11 digits)"
                                className="text-sm py-2"
                                maxLength={11}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Father Name" className="text-sm">
                            <Input name="fatherName" value={form.fatherName} onChange={handleChange} placeholder="Enter father name" className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="Date of Birth" className="text-sm">
                            <DateInput name="dob" value={form.dob} onChange={handleChange} placeholder="Select date of birth" className="text-sm py-2" />
                        </FieldWrapper>

                        <FieldWrapper label="Phone Office" className="text-sm">
                            <Input
                                name="phoneOffice"
                                value={form.phoneOffice}
                                onChange={e => {
                                    let val = e.target.value.replace(/[^0-9]/g, '');
                                    if (val.length > 11) val = val.slice(0, 11);
                                    handleChange({ target: { name: 'phoneOffice', value: val } });
                                }}
                                placeholder="Enter office phone (11 digits)"
                                className="text-sm py-2"
                                maxLength={11}
                            />
                        </FieldWrapper>

                        <FieldWrapper label="Company/ Department" className="text-sm">
                            <Input name="company" value={form.company} onChange={handleChange} placeholder="Enter company or department" className="text-sm py-2" />
                        </FieldWrapper>
                        
                        <FieldWrapper label="Address Line 2" className="text-sm">
                            <Input name="address2" value={form.address2} onChange={handleChange} placeholder="Enter address line 2" className="text-sm py-2" />
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
                                <Select
                                    name="product"
                                    value={form.product}
                                    onChange={handleChange}
                                    placeholder={loadingProducts ? "Loading products..." : "Choose product"}
                                    className="text-sm py-2"
                                    options={
                                        products?.map(prod => ({
                                            value: prod.id || prod._id || prod.value || prod.productName,
                                            label: prod.productName || prod.label || prod.name
                                        })) || []
                                    }
                                    disabled={loadingProducts}
                                />
                            </FieldWrapper>
                            
                            <FieldWrapper label="Sale Amount" required className="text-sm">
                                <Input
                                    name="saleAmount"
                                    value={form.saleAmount}
                                    onChange={e => {
                                        // Only allow numbers
                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                        handleChange({ target: { name: 'saleAmount', value: val } });
                                    }}
                                    placeholder="Enter sale amount (numbers only)"
                                    className="text-sm py-2"
                                />
                            </FieldWrapper>

                            <FieldWrapper label="Sale Type" required className="text-sm">
                                <Select
                                    name="saleType"
                                    value={form.saleType}
                                    onChange={handleChange}
                                    placeholder="Choose sale type"
                                    className="text-sm py-2"
                                    options={[
                                        { value: 'credit', label: 'Credit' },
                                        { value: 'cash', label: 'Cash' },
                                        { value: 'cheque', label: 'Cheque' },
                                        { value: 'transfer', label: 'Transfer' },
                                    ]}
                                />
                            </FieldWrapper>
                        </div>

                        {/* Column 2 */}
                        <div className="flex flex-col gap-3 md:gap-3">
                            <FieldWrapper label="Select Package Type" required className="text-sm">
                                <Select
                                    name="packageType"
                                    value={form.packageType}
                                    onChange={handleChange}
                                    placeholder={loadingPackages ? "Loading packages..." : "Choose package type"}
                                    className="text-sm py-2"
                                    options={
                                        packages?.map(pkg => ({
                                            value: pkg.id || pkg._id || pkg.value || pkg.packageName,
                                            label: pkg.packageName || pkg.label || pkg.name
                                        })) || []
                                    }
                                    disabled={loadingPackages}
                                />
                            </FieldWrapper>

                            <FieldWrapper label="Renewal Charges" required className="text-sm">
                                <Input
                                    name="renewalCharges"
                                    value={form.renewalCharges}
                                    onChange={e => {
                                        // Only allow numbers
                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                        handleChange({ target: { name: 'renewalCharges', value: val } });
                                    }}
                                    placeholder="Enter renewal charges (numbers only)"
                                    className="text-sm py-2"
                                />
                            </FieldWrapper>

                            <FieldWrapper label="Sales Remarks" className="text-sm">
                                <Textarea 
                                    name="salesRemarks"
                                    value={form.salesRemarks}
                                    onChange={handleChange}
                                    placeholder="Enter any sales remarks (optional)" 
                                    className="min-h-[60px] md:min-h-[80px] text-sm"
                                />
                            </FieldWrapper>
                        </div>
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="flex flex-col md:flex-row justify-between gap-3 mt-6 md:mt-8">
                    {/* Credit Check Button */}
                    <button
                        className="
                            w-full md:w-auto
                            border border-customBlue
                            text-customBlue
                            px-4 py-2
                            rounded-lg
                            cursor-pointer
                            text-sm font-medium
                            transition
                            hover:bg-customBlue/10
                        "
                    >
                        Credit Check
                    </button>
                    
                    {/* Cancel & Save Buttons */}
                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                        <button
                            className="
                                w-full md:w-32
                                border border-customBlue
                                text-customBlue
                                px-4 py-2
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
                            type="submit"
                            className="
                                w-full md:w-32
                                bg-customBlue
                                text-gray-100
                                px-4 py-2
                                rounded-lg
                                cursor-pointer
                                text-sm font-medium
                                transition
                                hover:bg-customBlue/90
                                disabled:opacity-60
                            "
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : 'Save & Submit'}
                        </button>
                    </div>
                </div>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
            {data && <div className="text-green-600 mt-2">Sale stage updated successfully!</div>}
        </form>
    )
}

export default AddNewSaleForm