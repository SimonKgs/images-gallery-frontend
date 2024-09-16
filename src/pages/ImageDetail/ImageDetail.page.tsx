import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { deleteImage, editImage } from '../../services/image.service';

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
        <div>
            <h1>Edit Image</h1>
            <h2>{ title }</h2>
            <div>
                <input 
                    type="text" 
                    value={title} 
                    onChange={handleTitleChange} 
                />
                <button onClick={handleSave}>Change title</button>
                <button onClick={handleDelete}>Delete Image</button>
            </div>
            <img height={10} src={image.image} alt={image.title} />
        </div>
    );
};
