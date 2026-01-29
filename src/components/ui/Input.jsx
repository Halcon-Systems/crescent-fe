const Input = ({ placeholder, type = "text" }) => (
    <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent outline-none text-sm text-gray-900 placeholder-gray-400"
    />
);

export default Input;