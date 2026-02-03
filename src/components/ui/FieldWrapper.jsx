const FieldWrapper = ({ label, required, children }) => (
    <div className="bg-gray-100 rounded-lg p-3 md:p-4 flex flex-col gap-1 md:gap-2">
        <label className="text-xs md:text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
    </div>
);

export default FieldWrapper;