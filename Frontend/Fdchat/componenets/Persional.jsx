import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/persional.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Persional() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        profile: null,
        bio: ""
    });

    const persionalsumbit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('bio', user.bio);
            formData.append('file', user.profile);
            formData.append('upload_preset', 'profile');
            formData.append('cloud_name', 'dmqe0e8k0'); // Ensure 'file' is the key for Cloudinary

            const response = await fetch('https://api.cloudinary.com/v1_1/dmqe0e8k0/upload', {
                method: "POST",
                body: formData
            });

            const resData = await response.json();
            console.log(resData);

            const imageData = new FormData();
            imageData.append('bio', user.bio);
            imageData.append('profile', resData.secure_url);
            imageData.append('userid', localStorage.getItem('userid'));  // Ensure userid is included

            const response2 = await fetch('http://localhost:5000/more-info', {
                method: "POST",
                body: imageData
            });

            const resData2 = await response2.json();
            console.log(resData2);

            if (response2.ok) {
                setUser({
                    bio: "",
                    profile: null
                });
                navigate('/verifyemail');
            } else {
                toast.error(resData2.msg || "Failed to upload post");
            }

        } catch (error) {
            console.log(error);
            toast.error("An error occurred");
        }
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setUser({
            ...user,
            [name]: files ? files[0] : value
        });
    };

    return (
        <>
            <ToastContainer />
            <div className="pcontainer">
                <div className="persional-form">
                    <h1>Set Up Your Profile</h1>
                    <form onSubmit={persionalsumbit}>
                        <div className="form-group">
                            <label htmlFor="bio">Your Bio:</label>
                            <input
                                id="bio"
                                type="text"
                                name="bio"
                                placeholder="Write something about yourself..."
                                value={user.bio}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profile">Profile Picture:</label>
                            <input
                                id="profile"
                                type="file"
                                name="profile"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-btn">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
}
