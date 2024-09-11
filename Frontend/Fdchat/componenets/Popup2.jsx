import React, { useEffect, useState } from 'react';
import '../Styles/Popup2.css';
import trash from '../Dimages/trash.png'

const Popup2 = ({ isOpen, onClose, postid }) => {
    const [getcomment, setgetcomment] = useState([]);
    const [posts, setPosts] = useState([]);
    const [Comment, setComment] = useState('');

    useEffect(() => {
        const getPosts = async () => {
            const response = await fetch('http://localhost:5000/getpost', {
                method: "GET"
            });
            if (response.ok) {
                const posts = await response.json();
                setPosts(posts);
            }
        };
        getPosts();
    }, []);

    useEffect(() => {
        const getComments = async () => {
            const response = await fetch('http://localhost:5000/getcomment', {
                method: "GET"
            });
            if (response.ok) {
                const comments = await response.json();
                setgetcomment(comments);
            }
        };
        getComments();
    }, []);

    if (!isOpen) return null;

    const docomment = async (e, postid, username) => {
        e.preventDefault();
        const userid = localStorage.getItem('userid');
        try {
            const response = await fetch('http://localhost:5000/comment', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    comment: Comment,
                    userid,
                    postid,
                    from: username,
                    created_at: new Date(),
                })
            });
            const resdata = await response.json();
            if (response.ok) {
                setComment("");
                setgetcomment([...getcomment, resdata]);
            }
        } catch (error) {
            console.log('comment error', error);
        }
    };

    const filteredPosts = posts.find(post => post._id === postid);

    return (
        <div className="popup-overlayx" onClick={onClose}>
            <div className="popup-contentx" onClick={e => e.stopPropagation()}>
                <span className="popup-closex" onClick={onClose}>⨯</span>
                {filteredPosts && (
                    <div className="pmainflex">
                        <div className="pmainpost">
                            {filteredPosts.image && <img src={filteredPosts.image} alt="Post Image" />}
                            {filteredPosts.video && !filteredPosts.image && <video className="custom-video" src={filteredPosts.video} autoPlay controls />}
                        </div>
                        <div className="allcomment">
                            <div className="popflex">
                                {getcomment.filter(comment => comment.postid === postid).map(comment => (
                                    <div className='oneflex' key={comment._id}>
                                        <img src={comment.profile} alt={`${comment.from}'s profile`} />
                                        <p><strong>{comment.from}:</strong> {comment.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="poptext">
                            {filteredPosts && (
                                <form onSubmit={(e) => docomment(e, postid, filteredPosts.username)}>
                                    <textarea
                                        value={Comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder='Add a comment...'
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault();
                                                docomment(e, postid, filteredPosts.username);
                                            }
                                        }}
                                    ></textarea>
                                </form>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Popup2;
