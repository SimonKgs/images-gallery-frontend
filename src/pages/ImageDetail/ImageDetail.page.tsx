import { useState, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { deleteImage, editImage } from '../../services/image.service';

import styles from './ImageDetail.module.css'

export const ImageDetail = () => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const { image } = location.state;
    const [title, setTitle] = useState('');

    if (!image) {
        return <Navigate to='/user' />;
    }

    useEffect(() => {
        if (image) {
            setTitle(image.title);
        }
    }, []);

    // Handle title change
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // Handle save action (e.g., sending updated title to the server)
    const handleSave = async() => {
        try {
            await editImage(image._id, title);
            navigate('/user');
        } catch (err) {
            console.error('Error editing image:', err);
        }
    };

    const handleDelete = async() => {
        try {
            await deleteImage(image._id);
            navigate('/user');
        } catch (err) {
            console.error('Error deleting image:', err);
        }
    }

    return (
        <div className={styles["edit-image-page-container"]}>
            <h1>Edit Image</h1>
            <h2>{ title }</h2>
            <div className={styles["edit-image-controls-container"]}>
                <label htmlFor="edit-field">Image Title:</label>
                <input
                    id='edit-field'
                    type="text" 
                    value={title} 
                    onChange={handleTitleChange} 
                />
                <button className={styles["edit-image-button"]} onClick={handleSave}>Change title</button>
                <button className={styles["delete-image-button"]} onClick={handleDelete}>Delete Image</button>
            </div>
            <img src={image.image} alt={image.title} />
            <Link className={styles["edit-image-link"]} to={"/user"}>Come back to user page</Link>
        </div>
    );
};
