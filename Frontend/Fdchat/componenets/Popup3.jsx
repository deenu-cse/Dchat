import React, { useState } from 'react';
import '../Styles/Popup3.css';
import story from '../Dimages/status.png';

export default function Popup3({ isOpen, onClose }) {
    const [user, setuser] = useState({
        video: null
    });

    if (!isOpen) return null;

    const handleFileChange = (e) => {
        setuser({
            ...user,
            [e.target.name]: e.target.files[0]
        });
    };

    const userid = localStorage.getItem('userid')

    const upload = async (e) => {
        e.preventDefault();
        try {
            const uploadResponse = await uploadFile(user.video, 'video');
            const videoUrl = uploadResponse.secure_url;
            console.log(`Video uploaded successfully: ${videoUrl}`);

            const response = await fetch('http://localhost:5000/status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoUrl, userid, status: true })
            });

            const resData = await response.json();
            if (response.ok) {
                console.log(resData.msg);
            } else {
                console.error(resData.msg);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const uploadFile = async (file, type) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Deendayal');
        formData.append('userid', userid)
        formData.append('isstatus', true)

        const uploadURL = type === 'video' ?
            'https://api.cloudinary.com/v1_1/dmqe0e8k0/video/upload' :
            '';

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
        <div className="popup3-overlayx" onClick={onClose}>
            <div className="popup3-contentx" onClick={e => e.stopPropagation()}>
                <span className="popup3-closex" onClick={onClose}>⨯</span>
                <div className="sflex">
                    <img src={story} />
                    <form onSubmit={upload}>
                        <input
                            type="file"
                            name="video"
                            accept="video/*"
                            onChange={handleFileChange}
                        />
                        <button type="submit">Upload Video</button>
                    </form>
                </div>
            </div>
        </div>
    );
}