import { NavLink } from "react-router-dom";

const CustomNavLink = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md  border-b text-sm font-bold transition duration-200 ${
          isActive
            ? "bg-blue-500 text-white" // Active state styles
            : "text-gray-100 hover:bg-cyan-600 hover:text-red-800" // Default styles
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
