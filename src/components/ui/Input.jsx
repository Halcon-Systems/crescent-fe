
const Input = ({ placeholder, type = "text" }) => (
    <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm md:text-base text-gray-900 placeholder-gray-400 w-full"
    />
);

export default Input;