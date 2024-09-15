import React from 'react'
import { NavLink } from 'react-router-dom'

import logo from '../assets/react.svg'
import { useAuth } from '../hooks/useAuth';


export const Navbar: React.FC = () => {

    const { isAuthenticated, loading } = useAuth();


    if (loading) {
      return <div>Loading...</div>;
    }


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
                    {
                        (isAuthenticated) ?
                            (<li>
                                <NavLink to="/user" className={ ({ isActive}) => isActive ? 'nav-active' : ''}>User</NavLink>
                            </li>)
                            :
                            (<li>
                                <NavLink to="/auth" className={ ({ isActive}) => isActive ? 'nav-active' : ''}>Login</NavLink>
                            </li>)
                    }
                </ul>
            </div>
        </nav>
    )
}
