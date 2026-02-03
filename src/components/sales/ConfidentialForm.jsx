import React from 'react'
import FieldWrapper from '../ui/FieldWrapper'
import Select from '../ui/Select'
import Input from '../ui/Input'
import DateInput from '../ui/DateInput'
import Textarea from '../ui/TextArea'

const ConfidentialForm = () => {
    return (
        <div className="flex-1 flex flex-col gap-6">
            {/* Heading */}
            <h2 className="text-center text-gray-100 bg-customGreen rounded-lg p-2">
                Briefing - Private & Confidential Information
            </h2>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* col 1 */}
                <div className="flex flex-col gap-4">
                    <FieldWrapper label="Normal Code" required>
                        <Input placeholder="Type (1234)" />
                    </FieldWrapper>

                    <FieldWrapper label="Mother Name">
                        <Input placeholder="Type here" />
                    </FieldWrapper>

                    <FieldWrapper label="1st Section User">
                        <Input placeholder="Type here" />
                    </FieldWrapper>

                    <FieldWrapper label="Contact No. 1">
                        <Input placeholder="Type here" />
                    </FieldWrapper>
                    <FieldWrapper label="Emergency Contact Person">
                        <Input placeholder="Type here" />
                    </FieldWrapper>

                    <FieldWrapper label="Driver Name">
                        <Input placeholder="Type here" />
                    </FieldWrapper>

                    <FieldWrapper label="SMS Alert">
                        <Input placeholder="Type here" />
                    </FieldWrapper>
                    <FieldWrapper label="SMSGeo Fence City">
                        <Input placeholder="Type here" />
                    </FieldWrapper>
                    <FieldWrapper label="Sales Person">
                        <Input placeholder="Type here" />
                    </FieldWrapper>
                </div>

                {/* Row 2 */}
                <div className="flex flex-col gap-4">

                    <FieldWrapper label="Emergency Code">
                        <Input placeholder="Type (1234)" />
                    </FieldWrapper>
                    <FieldWrapper label="Blood Group">
                        <Select placeholder="Select" />
                    </FieldWrapper>

                    <FieldWrapper label="Relation">
                        <Input placeholder="Type here" />
                    </FieldWrapper>
                    <FieldWrapper label="Contact no. 2">
                        <Input placeholder="Type here" />
                    </FieldWrapper>
                    <FieldWrapper label="Mobile App">
                        <Input placeholder="Type here" />
                    </FieldWrapper>

                    <FieldWrapper label="Remarks">
                        <Textarea placeholder="Type here" />
                    </FieldWrapper>

                    <FieldWrapper label="Technician">
                        <Input placeholder="Type here" />
                    </FieldWrapper>
                </div>
            </div>

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
                    className="
        px-5 py-2.5 rounded-lg text-sm font-medium transition
                             bg-customBlue text-gray-100 hover:bg-customBlue/90 cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default ConfidentialForm