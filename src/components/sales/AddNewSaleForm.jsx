import React from 'react'
import { FiChevronDown, FiCalendar } from "react-icons/fi";
import FieldWrapper from '../ui/FieldWrapper';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/TextArea';
import DateInput from '../ui/DateInput';

const AddNewSaleForm = () => {
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
                    Add New Sale
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

                        <FieldWrapper label="CNIC No.">
                            <Input placeholder="Type here" />
                        </FieldWrapper>
                        <FieldWrapper label="Phone Home">
                            <Input placeholder="Type here" />
                        </FieldWrapper>

                        <FieldWrapper label="Email ID">
                            <Input placeholder="Type here" />
                        </FieldWrapper>

                        <FieldWrapper label="Address">
                            <Input placeholder="Type here" />
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

                        <FieldWrapper label="Date of Birth">
                            <DateInput placeholder="Type here" />
                        </FieldWrapper>

                        <FieldWrapper label="Phone Office">
                            <Input placeholder="Type here" />
                        </FieldWrapper>

                        <FieldWrapper label="Company/ Department">
                            <Input placeholder="Type here" />
                        </FieldWrapper>
                        <FieldWrapper label="Address Line 2">
                            <Input placeholder="Type here" />
                        </FieldWrapper>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-xl font-semibold text-gray-800">
                    Select Product & Package
                </h2>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* col 1 */}
                    <div className="flex flex-col gap-4">
                        <FieldWrapper label="Select Product" required>
                            <Select placeholder="Select" />
                        </FieldWrapper>
                        <FieldWrapper label="Sale Amount" required>
                            <Input placeholder="Type (10000) numeric only" />
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

                        <FieldWrapper label="Renewal Charges" required>
                            <Input placeholder="Type (8000) numeric only" />
                        </FieldWrapper>

                        <FieldWrapper label="Sales Remarks">
                            <Textarea placeholder="Type here" />
                        </FieldWrapper>
                    </div>
                </div>

                <div className="flex justify-between gap-3">
                    <button
                        className="
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
                        Credit Check
                    </button>
                    <div className="flex flex-col gap-3 w-full max-w-md">

                        {/* Bottom buttons */}
                        <div className="flex gap-3 w-full">
                            <button
                                // onClick={closeAddClientForm}
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
                                Save & Submit
                            </button>
                        </div>
                    </div>



                </div>
            </div>
            {/* </div> */}
        </>
    )
}

export default AddNewSaleForm