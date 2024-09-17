import React, { useState } from 'react';
import { uploadImageService } from '../services/image.service';

import styles from '../pages/User/User.module.css'


interface UploadImageProps {
    onImageUploadSuccess: () => void;
}

export const UploadImage: React.FC<UploadImageProps> = ({ onImageUploadSuccess }) => {
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);

    // Handle changes in the title input
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    // Handle changes in the file input
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
        setFile(selectedFile);
        }
    };

    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file) {
            alert('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', file);

        try {
            const response = await uploadImageService(formData);
            console.log('Image uploaded:', response);
            setTitle('');
            setFile(null);
            onImageUploadSuccess();
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className={styles['uploads-container']}>
            <h2>Upload new image</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className={styles['uploads-form']}>
                <div className={styles['uploads-field']}>
                    <label htmlFor="title">Image Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>

                <div className={styles['uploads-field']}>
                    <label htmlFor="image">Upload Image</label>
                    {/* Custom button styled to replace the input file's default appearance */}
                    <label htmlFor="image" className={styles["custom-file-upload"]}>
                        Select File
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};
