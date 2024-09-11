import React, { useEffect, useState } from 'react';
import { Await, Link, useNavigate } from 'react-router-dom';
import Popup from './Popup';
import Popup2 from './Popup2';
import '../Styles/Home.css';
import like from '../Dimages/like.png';
import liked from '../Dimages/liked.png';
import trash from '../Dimages/trash.png';
import plus from '../Dimages/plus.png'
import Popup3 from './Popup3';
import Popup4 from './Popup4';
import Popup5 from './Popup5';
import people from '../Dimages/people.png'
import Popup6 from './Popup6';


export default function Homepage() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [persional, setPersional] = useState([]);
    const [userinfo, setUserinfo] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popup2open, setPopup2Open] = useState(false);
    const [popup3open, setPopup3Open] = useState(false);
    const [popup5open, setPopup5Open] = useState(false);
    const [popup6open, setPopup6Open] = useState(false);
    const [Comment, setComment] = useState('');
    const [getcomment, setGetcomment] = useState([]);
    const [postid, setPostid] = useState();
    const [statusid, setstatustid] = useState();
    const [statuses, setstatuses] = useState([])
    const [follower, setfollower] = useState([])
    const [profile, setprofile] = useState([])


    const navigte = useNavigate()

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch('http://localhost:5000/getpost', {
                method: 'GET',
            });
            if (response.ok) {
                const posts = await response.json();
                setPosts(posts);
            }
        };
        getPosts();
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/LogIn');
        }
    }, [navigate]);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch('http://localhost:5000/user', {
                method: 'GET',
            });
            if (response.ok) {
                const users = await response.json();
                setUserinfo(users);
            }
        };
        getUser();
    }, []);

    useEffect(() => {
        const getComments = async () => {
            const response = await fetch('http://localhost:5000/getcomment', {
                method: 'GET',
            });
            const comments = await response.json();
            if (response.ok) {
                setGetcomment(comments);
            }
        };
        getComments();
    }, []);

    useEffect(() => {
        const followers = async () => {
            const userid = localStorage.getItem('userid')
            const response = await fetch(`http://localhost:5000/follower/${userid}`, {
                method: "GET"
            })
            if (response.ok) {
                const data = await response.json();
                const { followingUsers, profile } = data;
                setfollower(followingUsers)
                setprofile(profile)
            }
        }
        followers()
    }, [])
    console.log(follower)

    const handleCreateClick = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const handleLike = async (postId) => {
        const userId = localStorage.getItem('userid');
        const response = await fetch('http://localhost:5000/likePost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId, userId }),
        });

        if (response.ok) {
            const updatedPost = await response.json();
            setPosts(posts.map(post => post._id === updatedPost._id ? updatedPost : post));
        }
    };

    const docomment = async (e, postid, username) => {
        e.preventDefault();
        const userid = localStorage.getItem('userid');
        try {
            const response = await fetch('http://localhost:5000/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comment: Comment,
                    userid,
                    postid,
                    from: username,
                    created_at: new Date(),
                }),
            });
            const resdata = await response.json();
            if (response.ok) {
                setComment('');
                setGetcomment([...getcomment, resdata]);
            }
        } catch (error) {
            console.log('comment error', error);
        }
    };

    const deleteComment = async (commentid) => {
        const response = await fetch('http://localhost:5000/deletecomment', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ commentid }),
        });
        if (response.ok) {
            setGetcomment(getcomment.filter(comment => comment._id !== commentid));
        }
    };

    useEffect(() => {
        const getallstatus = async () => {
            const response = await fetch('http://localhost:5000/getstatus', {
                method: "GET",
            })
            if (response.ok) {
                const allstatus = await response.json()
                setstatuses(allstatus)
            } else {
                console.error('Error fetching statuses:', response.status)
            }
        }
        getallstatus()
    }, [])

    const handlePopup2 = (postid) => {
        setPostid(postid);
        setPopup2Open(true);
    };

    const handleClosePopup2 = () => {
        setPopup2Open(false);
    };
    const handlePopup3 = (postid) => {
        setstatustid(statusid);
        setPopup3Open(true);
    };

    const handleClosePopup3 = () => {
        setPopup3Open(false);
    };
    const handlePopup5 = (userid) => {
        setPostid(userid);
        setPopup5Open(true);
    };
    const handlePopup6 = () => {
        setPopup6Open(true);
    };

    const handleClosePopup6 = () => {
        setPopup6Open(false);
    };
    const handleClosePopup5 = () => {
        setPopup5Open(false);
    };

    const handlehome = () => {
        navigate('/Home')
    }

    const handleReel = () => {
        posts.image = null
    }


    return (
        <>
            <div className="Hcontainer">
                <div className="first">
                    <h1>𝕯𝖈𝖍𝖆𝖙</h1>
                    <div className="features">
                        <ul>
                            <li onClick={handlehome}><img src='https://img.icons8.com/?size=100&id=i6fZC6wuprSu&format=png&color=000000' alt="Home" />Home</li>
                            <li onClick={handlePopup6}><img src='https://img.icons8.com/?size=100&id=132&format=png&color=000000' alt="Search" />Search</li>
                            <li onClick={handleReel}><img src='https://img.icons8.com/?size=100&id=PxI9IPCyBAOD&format=png&color=000000' alt="Reels" />Reels</li>
                            <li onClick={handleCreateClick}><img src='https://img.icons8.com/?size=100&id=GlTdJzFYfVzw&format=png&color=000000' alt="Create" />Create</li>
                            <li onClick={handlePopup6}><img src={people} />People</li>
                            <li ><img src='https://img.icons8.com/?size=100&id=myPLJvyrnck4&format=png&color=000000' alt="More" />More</li>
                        </ul>
                    </div>
                </div>
                <div className="hmiddle">
                    <div className="story">
                        {persional.map((v, i) => (
                            localStorage.getItem('userid') === v.userid ? (
                                <div className="himg" key={i}>
                                    <img className='mystatus' onClick={() => handlePopup5(v.userid)} src={v.profile} alt={`Profile ${i}`} />
                                    <img className='plus' onClick={() => handlePopup3(v.userid)} src={plus} />
                                </div>
                            ) : null
                        ))}
                        <div className="clickstatus">
                            {Array.isArray(statuses) && statuses.map((v, i) => (
                                localStorage.getItem('userid') !== v.userid ? (
                                    <div className='border-container' key={i}>
                                        <img onClick={() => handlePopup5(v.userid)} src={v.profile} alt={`Profile ${i}`} />
                                    </div>
                                ) : null
                            ))}
                        </div>

                    </div>
                    <div className="posts">
                        {posts.map((v, i) => (
                            <div key={i} className="postcard">
                                <hr />
                                <br />
                                <div className="pflex">
                                    <img className='pimg' src={v.profile} alt="Profile" />
                                    <h2>{v.username}</h2>
                                    <p>Posted on: {formatDate(v.createdAt)}</p>
                                </div>
                                {v.image && <img src={v.image} alt="Post Image" />}
                                {v.video && !v.image && <video className="custom-video" src={v.video} autoPlay controls />}
                                <div className="like">
                                    <img
                                        src={v.likes.includes(localStorage.getItem('userid')) ? liked : like}
                                        onClick={() => handleLike(v._id)}
                                        alt="Like"
                                    />
                                    <img
                                        className='commentx'
                                        onClick={() => handlePopup2(v._id)}
                                        src='https://img.icons8.com/?size=100&id=143&format=png&color=FFFFFF'
                                        alt="Comment"
                                    />
                                    <img src='https://img.icons8.com/?size=100&id=100038&format=png&color=FFFFFF' alt="Other" />
                                </div>
                                <p>{v.likes.length}</p>
                                <p>{v.description}</p>
                                <div className="mycomment">
                                    {getcomment.filter((comment) => comment.postid === v._id)
                                        .map((comment) => (
                                            localStorage.getItem('userid') === comment.userid ? (
                                                <div className='myflex' key={comment._id}>
                                                    <div className="another">
                                                        <img className='cprofile' src={comment.profile} alt="Comment Profile" />
                                                        <p><strong>{comment.from}:</strong> {comment.comment}</p>
                                                    </div>
                                                    <img onClick={() => deleteComment(comment._id)} src={trash} alt="Delete" />
                                                </div>
                                            ) : null
                                        ))}
                                </div>
                                <form onSubmit={(e) => docomment(e, v._id, v.username)}>
                                    <textarea
                                        value={Comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder='Add a comment...'
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                docomment(e, v._id, v.username);
                                            }
                                        }}
                                    ></textarea>
                                </form>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hlast">
                    <Link to={'/your_account'}>
                        <div className="hflex">
                            {persional.map((v, i) => (
                                localStorage.getItem('userid') === v.userid ? (
                                    <div className="himg" key={i}>
                                        <img src={v.profile} alt={`Profile ${i}`} />
                                    </div>
                                ) : null
                            ))}
                            {userinfo.map((v, i) => (
                                localStorage.getItem('userid') === v._id ? (
                                    <div className="hname" key={i}>
                                        <h2>{v.username}</h2>
                                    </div>
                                ) : null
                            ))}
                        </div>
                    </Link>
                    <div className="following-users">
                        <h2>Following</h2>
                        {follower.length > 0 ? (
                            follower.map((user) => (
                                <div className="following-user" key={user._id}>
                                    <p>{user.username}</p>
                                </div>
                            ))
                        ) : (
                            <p>You are not following anyone yet.</p>
                        )}
                    </div>

                </div>
            </div >
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup} />
            <Popup2 isOpen={popup2open} onClose={handleClosePopup2} postid={postid} />
            <Popup3 isOpen={popup3open} onClose={handleClosePopup3} />
            <Popup5 isOpen={popup5open} onClose={handleClosePopup5} userid={postid} />
            <Popup6 isOpen={popup6open} onClose={handleClosePopup6} />
        </>
    );
}
