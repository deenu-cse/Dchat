import React, { useEffect, useState } from 'react';
import '../Styles/Account.css';

export default function Account() {
    const [getpost, setgetpost] = useState([]);
    const [userinfo, setuserinfo] = useState([]);
    const [persional, setpersional] = useState([]);
    const [viewMode, setViewMode] = useState('all');

    useEffect(() => {
        if (userinfo.length > 0) {
            const getmypost = async () => {
                try {
                    const response = await fetch('http://localhost:5000/getpost', { method: 'GET' });
                    if (response.ok) {
                        const posts = await response.json();
                        setgetpost(posts);
                    }
                } catch (error) {
                    console.error('Error fetching posts:', error);
                }
            };
            getmypost();
        }
    }, [userinfo]);

    useEffect(() => {
        const getuser = async () => {
            try {
                const response = await fetch('http://localhost:5000/user', { method: 'GET' });
                if (response.ok) {
                    const users = await response.json();
                    setuserinfo(users);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };
        getuser();
    }, []);

    useEffect(() => {
        const getpersional = async () => {
            try {
                const response = await fetch('http://localhost:5000/getpersional', { method: 'GET' });
                if (response.ok) {
                    const personalData = await response.json();
                    setpersional(personalData);
                }
            } catch (error) {
                console.error('Error fetching personal data:', error);
            }
        };
        getpersional();
    }, []);

    const handleViewMode = (mode) => {
        setViewMode(mode);
    };

    const filteredPosts = getpost.filter(post => {
        if (viewMode === 'all') return true;
        return viewMode === 'posts' ? post.image : post.video;
    });

    const userId = localStorage.getItem('userid');

    const userPosts = getpost.filter(post => post.userid === userId);
    const postCount = userPosts.length === 1 ? `${userPosts.length} post` : `${userPosts.length} posts`;

    const currentUser = userinfo.find(user => user._id === userId);
    const personalData = persional.find(data => data.userid === userId);



    return (
        <div className="full">
            <div className="acontainer">
                <div className="afirst">
                    <h1>𝕯𝖈𝖍𝖆𝖙</h1>
                </div>
                <div className="second">
                    {personalData && (
                        <div className="yimg">
                            <img src={personalData.profile} alt="Profile" />
                        </div>
                    )}
                    <div className="ydetail">
                        {currentUser && (
                            <div className="yflex">
                                <h2>{currentUser.username}</h2>
                                <button>Edit profile</button>
                            </div>
                        )}
                        {personalData && currentUser && (
                            <>
                                <div className="fllow">
                                    <div className="follow2">
                                        <h4>{postCount}</h4>
                                        <h4>{currentUser?.followers?.length} {currentUser?.followers?.length === 1 ? 'Follower' : 'Followers'}</h4>
                                        <h4>{currentUser?.following?.length} {currentUser?.followers?.length === 1 ? 'Following' : 'Followings'}</h4>
                                    </div>

                                </div>
                                <div className="bio">
                                    <p>{personalData.bio}</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <hr />
            <div className="three">
                <div className="fullflex">
                    <div className="tflex">
                        <p
                            className={viewMode === 'posts' ? 'active' : ''}
                            onClick={() => handleViewMode('posts')}
                        >
                            Post
                        </p>
                        <p
                            className={viewMode === 'videos' ? 'active' : ''}
                            onClick={() => handleViewMode('videos')}
                        >
                            Video
                        </p>
                    </div>
                    <div className="mypost">
                        {userPosts.length === 0 ? (
                            <p>No posts available.</p>
                        ) : (
                            userPosts.map((post, index) => (
                                <div key={index} className="post-item">
                                    {post.image && <img src={post.image} alt={`Post ${index}`} />}
                                    {post.video && <video className="custom-video" src={post.video} controls />}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
