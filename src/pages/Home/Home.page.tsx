import React from 'react'

import styles from './Home.module.css'
import logo from '../../assets/icon.svg';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


export const Home: React.FC = () => {

  const { isAuthenticated } = useAuth();
  

  return (
    <div className={styles["home-container"]}>
        <img src={ logo } alt="Page Logo" />
        <h1>Image Gallery</h1>

        <div className={styles["home-info-container"]}>
          <h2>What is this Application?</h2>
          <p>This application provides a space where you can see and manage all your images.</p>
          <p>If you log in, you'll have <span>your own gallery</span> to store images. You can upload new images with a name, modify their names, or delete the images if you no longer want them stored here.</p>
        </div>
        <h3>Let's start!</h3>
        {
          (isAuthenticated) ?
            <Link className={styles["access-link"]} to={"/user"}>Go to your gallery</Link>
          :
            <Link className={styles["access-link"]} to={"/auth"}>Access to the App now! It's free!</Link>
        }
    </div>
  )
}
