import React from 'react'

import styles from "./About.module.css"

export const About: React.FC = () => {
  return (
    <div className={styles["about-container"]}>
        <h1>About This Page</h1>
            <div className={styles["about-content"]}>
                <p>Welcome to the <strong>Image Gallery App</strong>, a simple and efficient way to manage your personal images online.</p>
                
                <p>This app was designed to provide users with a dedicated space to <strong>store, organize, and manage their images</strong> securely. Whether you're looking to upload personal photos, update details, or simply browse through your gallery, this platform offers an easy and user-friendly experience.</p>
                
                <h2>Key Features</h2>
                <ul>
                    <li><strong>Upload & Store Images:</strong> Save your images securely in your personal gallery.</li>
                    <li><strong>Edit Image Details:</strong> Easily update the names or details of images after uploading them.</li>
                    <li><strong>Delete Images:</strong> Remove images from your gallery when they are no longer needed.</li>
                    <li><strong>Personalized Experience:</strong> Each user has their own gallery where images are stored and managed privately.</li>
                    <li><strong>Free to Use:</strong> This application is completely free to access and use.</li>
                </ul>

                <p>The <strong>Image Gallery App</strong> focuses on simplicity, making it intuitive for users to navigate through their personal gallery, modify their images, and manage them effortlessly. With a clean design and responsive interface, you can use the app on both mobile and desktop devices.</p>
                
                <p>Ready to start? If you haven't already, simply create an account, upload your favorite images, and enjoy a streamlined image management experience!</p>
            
            </div>
        </div>
  )
}
