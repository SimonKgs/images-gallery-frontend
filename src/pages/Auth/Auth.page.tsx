import React, { useState } from 'react'

import styles from './Auth.module.css'
import logo from '../../assets/react.svg'
import { LoginForm } from './forms/LoginForm.component'
import { RegisterForm } from './forms/RegisterForm.component';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const Auth: React.FC = () => {

    const { isAuthenticated, loading } = useAuth();
    const [isRegistering, setIsRegistering] = useState(false);


    const toggleForm = () => {
      setIsRegistering(prev => !prev);
    };

    if (loading) {
      return <div>Loading...</div>;
    }

    if (isAuthenticated ) {
      return <Navigate to="/home" />
    } 

    return (
      <div className={styles['auth-main-container']}>
        <div className={styles.auth}>
          <div className={styles["auth-header"]}>
            <img src={logo} alt='react logo' />
            <span>{isRegistering ? 'Register' : 'Login'}</span>
            <button onClick={toggleForm}>
              {isRegistering ? 'Login' : 'Register'}
            </button>
          </div>
          {isRegistering ? <RegisterForm /> : <LoginForm />}
          
        </div>
      </div>
    );
};