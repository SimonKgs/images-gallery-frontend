import React from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../assets/react.svg'


export const Navbar: React.FC = () => {

    

    return (
        <nav>
            <div className="navbar-container">
                <img src={logo} alt='react logo' />
                <ul>
                    <li>
                        <NavLink to="/home" className={ ({ isActive}) => isActive ? 'nav-active' : ''}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={ ({ isActive}) => isActive ? 'nav-active' : ''}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/user" className={ ({ isActive}) => isActive ? 'nav-active' : ''}>User</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login" className={ ({ isActive}) => isActive ? 'nav-active' : ''}>Login</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
