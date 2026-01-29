import React from 'react'
import { FiChevronDown, FiCalendar } from "react-icons/fi";
import FieldWrapper from '../ui/FieldWrapper';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/TextArea';
import DateInput from '../ui/DateInput';

const OperationProcessForm = () => {
    return (
        <>
            {/* <div className="bg-white rounded-xl shadow p-6 flex gap-6"> */}
            {/* Left Tag */}
            {/* <div className="w-48 h-25 text-xl text-gray-100 bg-customGreen rounded-xl flex items-center justify-center">
                Add New Sale
            </div> */}

            {/* Right Form */}
            <div className="flex-1 flex flex-col gap-6">
                {/* Heading */}
                <h2 className="text-xl font-semibold text-gray-800">
                    Client Details
                </h2>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* col 1 */}
                    <div className="flex flex-col gap-4">
                        <FieldWrapper label="Select Client Category" required>
                            <Select placeholder="Select" />
                        </FieldWrapper>

                        <FieldWrapper label="Select IR No.">
                            <Select placeholder="Select" />
                        </FieldWrapper>

                        <FieldWrapper label="Full Name">
                            <Input placeholder="12345-1234567-1" />
                        </FieldWrapper>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col gap-4">
                        <FieldWrapper label="Select Client Status" required>
                            <Select placeholder="Select" />
                        </FieldWrapper>

                        <FieldWrapper label="Cell No.">
                            <Input placeholder="Type here" />
                        </FieldWrapper>

                        <FieldWrapper label="Father Name">
                            <Input placeholder="Type here" />
                        </FieldWrapper>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-xl font-semibold text-gray-800">
                    Product & Package Details
                </h2>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* col 1 */}
                    <div className="flex flex-col gap-4">
                        <FieldWrapper label="Select Product" required>
                            <Select placeholder="Select" />
                        </FieldWrapper>
                        
                        <FieldWrapper label="Sale Type" required>
                            <Input placeholder="Type here (credit/ Cash/ Cheque/ Transfer)" />
                        </FieldWrapper>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col gap-4">
                        <FieldWrapper label="Select Package Type" required>
                            <Select placeholder="Select" />
                        </FieldWrapper>

                        <FieldWrapper label="Sales Remarks">
                            <Textarea placeholder="Type here" />
                        </FieldWrapper>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-xl font-semibold text-gray-800">
                    Add Device & Accessories
                </h2>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* col 1 */}
                    <div className="flex flex-col gap-4">
                        <FieldWrapper label="Select Product" required>
                            <Select placeholder="Select" />
                        </FieldWrapper>
                        
                        <FieldWrapper label="Select Zone" required>
                            <Input placeholder="Type here (credit/ Cash/ Cheque/ Transfer)" />
                        </FieldWrapper>
                        
                        <FieldWrapper label="Select Device Combo" required>
                            <Input placeholder="Type here (credit/ Cash/ Cheque/ Transfer)" />
                        </FieldWrapper>
                        
                        <FieldWrapper label="Select SIM" required>
                            <Input placeholder="Type here (credit/ Cash/ Cheque/ Transfer)" />
                        </FieldWrapper>
                        
                        <FieldWrapper label="Select Accessorues 2" required>
                            <Input placeholder="Type here (credit/ Cash/ Cheque/ Transfer)" />
                        </FieldWrapper>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col gap-4">
                        <FieldWrapper label="Select Package Type" required>
                            <Select placeholder="Select" />
                        </FieldWrapper>
                        
                        <FieldWrapper label="Assign Technician">
                            <Textarea placeholder="Type here" />
                        </FieldWrapper>
                    </div>
                </div>



                <div className="flex flex-col">

                    {/* Bottom buttons */}
                    <div className="flex gap-3 w-full justify-end">
                        <button
                            // onClick={closeAddClientForm}
                            className="
        
        bg-red-600
        text-gray-100
        px-4 py-2.5
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
                            Save & Submit
                        </button>
                    </div>



                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default OperationProcessForm;