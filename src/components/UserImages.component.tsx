import React, { useEffect, useState } from 'react'
import { Image } from '../interfaces/image.interface';
import styles from '../pages/User/User.module.css'
import { getUserImages } from '../services/image.service';
import { useNavigate } from 'react-router-dom';

interface UserImagesProps {
  refreshImages: boolean;
}

export const UserImages: React.FC<UserImagesProps> = ({ refreshImages }) => {

    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // I will need to take the user to another page to edit the image
    // and also need to pass the selected image
    const navigate = useNavigate();
    const handleImageClick = (image: Image) => {
      navigate(`/user/imageDetail`, { state: { image } });
    };

    useEffect(() => {
        const fetchImages = async () => {
        try {
            const fetchedImages = await getUserImages();
            setImages(fetchedImages);
        } catch (err) {
            setError('Failed to load images.');
            console.error('Error fetching images:', err);
        } finally {
            setLoading(false);
        }
        };

        fetchImages();
    }, [refreshImages]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

  return (
    <div className={styles["user-images-container"]}>
        {images.length > 0 ? (
            images.map((image: Image) => (
              <div key={image._id} className={styles["image-card"]} onClick={() => handleImageClick(image)}>
                <div className={styles["image-container"]}>
                  <img src={image.image} alt={ image.title } />
                </div>
                <div className={styles["image-p-container"]}>
                  <p>{ image.title }</p>
                </div>
            </div>
            ))
        ) : (
            <div>No images found.</div>
        )}
    </div>
  )
}
