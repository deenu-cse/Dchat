const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Usermodel");
const Post = require("../models/Postmodel");
const Verification = require("../models/Verifymdel");
const sendverificationemail = require("./sendemail");
const Persional = require("../models/Persional");
const mongoose = require('mongoose');
const Comment = require("../models/Commentmodel");
const Status = require("../models/Statusmodel");


const reg = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        const userexist = await User.findOne({ email });
        if (userexist) {
            return res.status(400).json({ msg: "Email already exists" });
        }

        const haspassword = await bcrypt.hash(password, 10);

        const usercreated = await User.create({ username, email, phone, password: haspassword });
        const token = await usercreated.generatetoken();

        res.status(201).json({
            msg: "User created successfully",
            token,
            userid: usercreated._id.toString()
        });
        sendverificationemail(usercreated, res)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};


//Login

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const checkemail = await User.findOne({ email });
        if (!checkemail) {
            return res.status(400).json({ msg: "Invalid email" });
        }

        const checkpass = await bcrypt.compare(password, checkemail.password);
        if (checkpass) {
            const token = await checkemail.generatetoken();
            return res.status(201).json({ msg: "Login successful", token });
        } else {
            return res.status(400).json({ msg: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
};


//upload post


const upload_post = async (req, res) => {
    try {
        const { description, image, video, userid } = req.body;

        if (!mongoose.isValidObjectId(userid)) {
            return res.status(400).json({ msg: "Invalid User ID format" });
        }

        if (!userid) {
            return res.status(400).json({ msg: "User ID is required" });
        }

        const user = await User.findById(userid);
        const userprofile = await Persional.findOne({ userid });
        if (!user) {
            return res.status(400).json({ msg: "User not found" });
        }
        if (!userprofile) {
            return res.status(400).json({ msg: "User profile not found" });
        }
        const { username } = user;
        const { profile } = userprofile;

        console.log(profile)

        const post = new Post({
            userid,
            description,
            image,
            video,
            profile,
            username
        });

        await post.save();
        return res.status(200).json({ msg: "Post uploaded successfully", post });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
};


//persional info

const persional = async (req, res) => {
    try {
        const { profile, bio, userid } = req.body;
        console.log(req.body);
        if (!profile) {
            return res.status(400).json({ msg: "Profile picture is required" });
        }
        // Ensure userid is an ObjectId
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({ msg: "Invalid user ID" });
        }
        const info = await Persional.create({ profile, bio, userid });
        res.status(201).json({ msg: "Enjoy Dchat", info });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Server error" });
    }
};

// get post

const getpost = async (req, res) => {
    try {
        const response = await Post.find().sort({ createdAt: -1 })
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

//get persional

const getpersional = async (req, res) => {
    try {
        const response = await Persional.find()
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

const getuser = async (req, res) => {
    try {
        const response = await User.find()
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

//verify email



const verify = async (req, res) => {
    try {
        const { userid } = req.params
        const user = await Verification.findOne({ userid })
        if (user) {
            const { expire_at } = user

            if (expire_at < Date.now()) {
                Verification.findOneAndDelete({ userid })
                    .then(() => {
                        User.findOneAndDelete({ _id: userid })
                            .then(() => {
                                const message = "Verification token has expired"
                                res.redirect(
                                    `verified?status=error&message=${message}`
                                )
                            }).catch((err) => {
                                res.redirect(
                                    `/verified?status=error&message=`
                                )
                            })
                    }).catch((err) => {
                        console.log(err)
                        res.redirect(
                            `/verified?status=error&message=`
                        )
                    })
            } else {
                User.findByIdAndUpdate({ _id: userid }, { verified: true })
                    .then(() => {
                        const message = "Email verified successfully"
                        res.redirect(
                            `/verified?status=success&message=${message}`
                        )
                    }).catch((err) => {
                        console.log(err)
                        const message = "Verification failed or invailed link"
                        res.redirect(
                            `/verified?status=success&message=${message}`
                        )
                    })
            }
        }

    } catch (error) {
        console.log(error)
        res.redirect(
            `/verified?status=error&message=`
        )
    }
}

// like post

const likePost = async (req, res) => {
    const { postId, userId } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({ msg: 'Post not found' });

        if (post.likes.includes(userId)) {
            // Unlike the post
            post.likes = post.likes.filter(id => id.toString() !== userId);
        } else {
            // Like the post
            post.likes.push(userId);
        }

        await post.save();
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
}

//comment 

const comment = async (req, res) => {
    try {
        const { comment, userid, postid, from, created_at } = req.body;
        const persionaluser = await Persional.findOne({ userid })
        const { profile } = persionaluser;
        if (!profile) {
            return res.status(400).json({ msg: "Profile not found" })
        }
        if (!comment || !from || !userid || !postid) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const commented = await Comment.create({ comment, userid, postid, from, profile })
        res.status(201).json({ msg: "Commented succesfully", commented })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Commented failled' });
    }
}

//getcomment

const getcomment = async (req, res) => {
    try {
        const response = await Comment.find().sort({ createdAt: -1 })
        res.status(200).json(response)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'error in get comments' });
    }
}

const Dcomment = async (req, res) => {
    const { commentid } = req.body;
    if (!commentid) {
        res.status(400).json({ msg: "postid nhi mili" })
    }
    try {
        const result = await Comment.findByIdAndDelete(commentid);
        if (result) {
            res.status(200).json({ msg: "Comment deleted successfully" });
        } else {
            res.status(404).json({ msg: "Comment not found" });
        }
    } catch (error) {
        console.error('Error in delete comment:', error);
        res.status(500).json({ msg: 'Error in deleting comment' });
    }
}

//Status

const Dostatus = async (req, res) => {
    const { videoUrl, userid, status } = req.body;
    try {
        const persionaluser = await Persional.findOne({ userid })
        const { profile } = persionaluser;
        if (!userid) {
            res.status(400).json({ msg: "Statusid is required" });
        }

        const mystatus = await Status.create({
            video: videoUrl,
            userid,
            status,
            profile
        });

        res.status(200).json({ msg: "Story uploaded succesfully", mystatus });
    } catch (error) {
        console.error('Error in making status', error);
        res.status(500).json({ msg: 'Error in making status' });
    }
};

//getstatus

const getstatus = async (req, res) => {
    const { userid } = req.params;
    try {
        const query = userid ? { userid } : {};
        const response = await Status.find(query).sort({ createdAt: -1 });
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
}

// Follow/Unfollow User

const followUser = async (req, res) => {
    try {
        const { userId, targetUserId } = req.body;

        if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(targetUserId)) {
            return res.status(400).json({ msg: "Invalid user ID" });
        }
        const user = await User.findById(userId);
        const targetUser = await User.findById(targetUserId);

        if (!user || !targetUser) {
            return res.status(404).json({ msg: "User not found" });
        }
        const alreadyFollowing = user.following.includes(targetUserId);
        const alreadyFollowedByTarget = targetUser.followers.includes(userId);

        if (alreadyFollowing) {
            user.following = user.following.filter(id => id.toString() !== targetUserId.toString());
            targetUser.followers = targetUser.followers.filter(id => id.toString() !== userId.toString());
        } else {
            user.following.push(targetUserId);
            targetUser.followers.push(userId);
        }

        await user.save();
        await targetUser.save();

        res.status(200).json({
            msg: alreadyFollowing ? "Unfollowed successfully" : "Followed successfully",
            user,
            targetUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

//getfollower

const getfollower = async (req, res) => {
    const userid = req.params.userid;
    try {
        const user = await User.findById(userid).populate('following')
        const persional = await Persional.findOne({ userid: userid });
        const followingUsers = await User.find({ _id: { $in: user.following } });
        const { profile } = persional;
        res.json({ followingUsers, profile });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { reg, login, upload_post, getpost, verify, persional, getpersional, getuser, likePost, comment, getcomment, Dcomment, Dostatus, getstatus, followUser, getfollower }
