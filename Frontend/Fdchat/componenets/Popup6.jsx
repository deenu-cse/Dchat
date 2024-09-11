import React, { useEffect, useState } from 'react';
import '../Styles/Popup6.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Popup6({ isOpen, onClose }) {
    const [Userinfo, setUserinfo] = useState([]);
    const [Persional, setPersional] = useState([]);
    const [followedUsers, setFollowedUsers] = useState({});


    useEffect(() => {
        if (isOpen) {
            const getUser = async () => {
                try {
                    const response = await fetch('http://localhost:5000/user', {
                        method: 'GET',
                    });
                    if (response.ok) {
                        const users = await response.json();
                        setUserinfo(users);
                        const initialFollowState = users.reduce((acc, user) => {
                            acc[user._id] = user.followers.includes(localStorage.getItem('userid'));
                            return acc;
                        }, {});
                        setFollowedUsers(initialFollowState);
                    }
                } catch (error) {
                    console.error('Failed to fetch users:', error);
                }
            };

            const getPersional = async () => {
                const response = await fetch('http://localhost:5000/getpersional', {
                    method: 'GET',
                });
                if (response.ok) {
                    const pers = await response.json();
                    setPersional(pers);
                }
            };

            getPersional();
            getUser();
        }
    }, [isOpen]);

    const handleFollowToggle = async (userId) => {
        const currentUserId = localStorage.getItem('userid');
        try {
            const response = await fetch('http://localhost:5000/followUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: currentUserId,
                    targetUserId: userId
                })
            });

            if (response.ok) {
                const { user, targetUser } = await response.json();
                setFollowedUsers((prevState) => ({
                    ...prevState,
                    [userId]: !prevState[userId]
                }));
                toast.success(user.following.includes(userId) ? 'Followed successfully!' : 'Unfollowed successfully!');
            } else {
                toast.error('Failed to follow/unfollow user');
            }
        } catch (error) {
            console.error('Error while following/unfollowing user:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <ToastContainer />
            <div className="popup6-overlayx" onClick={onClose}>
                <div className="popup6-contentx" onClick={e => e.stopPropagation()}>
                    <span className="popup6-closex" onClick={onClose}>⨯</span>
                    <div className="info">
                        <input className="search-input" placeholder='Search your friends...' />
                        {Userinfo.length > 0 && (
                            <ul>
                                {Userinfo.map(user => (
                                    Persional.filter(p => p.userid === user._id).map((personal, index) => (
                                        localStorage.getItem('userid') !== personal.userid ? (
                                            <li key={index}>
                                                <img src={personal.profile} alt={`${user.username}'s profile`} />
                                                <span>{user.username}</span>
                                                <button
                                                    className={`follow-button ${followedUsers[user._id] ? 'following' : 'follow'}`}
                                                    onClick={() => handleFollowToggle(user._id)}
                                                >
                                                    {followedUsers[user._id] ? 'Following' : 'Follow'}
                                                </button>
                                            </li>
                                        ) : null
                                    ))
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
