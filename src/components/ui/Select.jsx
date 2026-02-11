import { FiChevronDown } from "react-icons/fi";

const Select = ({ placeholder }) => (
    <div className="flex items-center justify-between cursor-pointer">
        <span className="text-sm md:text-base text-gray-400">{placeholder}</span>
        <FiChevronDown className="text-gray-400" />
    </div>
);

export default Select;