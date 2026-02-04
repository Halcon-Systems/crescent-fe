import React from "react";

const HeaderButton = ({ title, icon, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-sm 
        transition-all duration-200 ease-in-out
        flex-shrink-0 
        ${active 
          ? "bg-customGreen text-white shadow-sm" 
          : "bg-white text-customGreen hover:bg-gray-50 border border-gray-200 cursor-pointer"
        }
        hover:shadow-md
      `}
    >
      {icon && <span className="w-5 h-5 flex items-center justify-center">{icon}</span>}
      <span className="truncate">{title}</span>
    </button>
  );
};

export default HeaderButton;