import React, { useState } from 'react';
import '../Styles/Popup.css';
import post from '../Dimages/post.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Popup = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    const [user, setUser] = useState({
        description: "",
        image: null,
        video: null
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.files[0]
        });
    };

    const upload = async (e) => {
        e.preventDefault();
        try {
            const userid = localStorage.getItem('userid');
            if (!userid) {
                throw new Error("User ID is not available");
            }

            const uploadResponses = await Promise.all([
                user.image ? uploadFile(user.image, 'image') : Promise.resolve({ secure_url: '' }),
                user.video ? uploadFile(user.video, 'video') : Promise.resolve({ secure_url: '' })
            ]);

            const [imageResData, videoResData] = uploadResponses;

            const postData = new FormData();
            postData.append('description', user.description);
            postData.append('image', imageResData.secure_url || '');
            postData.append('video', videoResData.secure_url || '');
            postData.append('userid', userid);

            const response2 = await fetch('http://localhost:5000/upload', {
                method: "POST",
                body: postData
            });

            const resData2 = await response2.json();
            if (response2.ok) {
                setUser({
                    description: "",
                    image: null,
                    video: null
                });
                toast.success(resData2.msg);
            } else {
                toast.error(resData2.msg || "Failed to upload post");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Error during uploading post");
        }
    };


    const uploadFile = async (file, type) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Deendayal');

        const uploadURL = type === 'image' ?
            'https://api.cloudinary.com/v1_1/dmqe0e8k0/image/upload' :
            'https://api.cloudinary.com/v1_1/dmqe0e8k0/video/upload';

        try {
            const response = await fetch(uploadURL, {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to upload ${type}: ${errorText}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error uploading ${type}:`, error);
            throw error;
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="popup-overlay">
                <div className="popup-content">
                    <span className="popup-close" onClick={onClose}><strong>⨯</strong></span>
                    <div className="pimg">
                        <img src={post} alt="Post" />
                    </div>
                    <h2>Upload Post</h2>
                    <div className="content">
                        <form onSubmit={upload}>
                            <label>Description:</label>
                            <textarea
                                name='description'
                                value={user.description}
                                onChange={handleChange}
                            ></textarea>
                            <label>Image:</label>
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <label>Video:</label>
                            <input
                                type="file"
                                name="video"
                                accept="video/*"
                                onChange={handleFileChange}
                            />
                            <button type="submit">Upload</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Popup;
