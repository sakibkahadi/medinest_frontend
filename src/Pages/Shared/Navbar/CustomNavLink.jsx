import { NavLink, useLocation } from "react-router-dom";

const CustomNavLink = ({to, children}) => {
    const location = useLocation()
    const isActive = location.pathname === to
    const activeStyles = {
        backgroundColor :'blue',
        color:'white'
        
    }
    return (
        <NavLink to={to} 
        style={isActive?activeStyles: {}}
        className={
            `px-3 py-2  rounded-md text-sm text-white font-bold transition duration-200 ${isActive? ' text-white': 'text-white hover:bg-yellow-300 hover:text-red-400'}`
        }>
           {children} 
        </NavLink>
    );
};

export default CustomNavLink;