import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/user.service';
import { UserImages } from '../../components/UserImages.component';
import styles from './User.module.css'
import { useAuth } from '../../context/AuthContext';
import { ImageUpload } from '../../components/UploadImage.component';

export interface CurrentUser {
    name: string;
    email: string;
}

export const User: React.FC = () => {
    
    const [user, setUser] = useState<CurrentUser | null>(null);
    const { logout } = useAuth();

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error("Failed to get the user")
                logout()
            }
        }
        fetchUser()
    }, [])
    

    return (
        <div className={styles["user-page-container"]}>
            {
                user &&
                <h1>Welcome { user.name }</h1>
            }
            <ImageUpload />
            <UserImages />
            
        </div>
    );
};
