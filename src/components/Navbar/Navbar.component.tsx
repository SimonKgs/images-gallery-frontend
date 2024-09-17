import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/react.svg';
import hambuguerMenu from '../../assets/menu-svgrepo.svg';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {

    const { isAuthenticated, logout } = useAuth();

    // State to track if mobile menu is open
    const [menuOpen, setMenuOpen] = useState(false);

    // Function to toggle the menu
    const handleToggle = () => {
        setMenuOpen(prev => !prev);
    };

    // Function to close menu when a link is clicked
    const handleCloseMenu = () => {
        setMenuOpen(false);
    };

    const hanleLogout = () => {
        setMenuOpen(false);
        logout()
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <img src={logo} alt="react logo" />
                <div className="hamburger-menu" onClick={handleToggle}>
                    <img src={ hambuguerMenu } alt="" />
                </div>
                <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <li>
                        <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-active' : ''} onClick={handleCloseMenu}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-active' : ''} onClick={handleCloseMenu}>
                            About
                        </NavLink>
                    </li>
                    {isAuthenticated ? (
                        <>
                            <li>
                                <NavLink to="/user" className={({ isActive }) => isActive ? 'nav-active' : ''} onClick={handleCloseMenu}>
                                    User
                                </NavLink>
                            </li>
                            <button className="logout-button" onClick={ hanleLogout } >
                                Logout
                            </button>
                        </>
                    ) : (
                        <li>
                            <NavLink to="/auth" className={({ isActive }) => isActive ? 'nav-active' : ''} onClick={handleCloseMenu}>
                                Login
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
};
