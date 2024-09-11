const express = require("express");
const { reg, login, upload_post, getpost, verify, persional, getpersional, getuser, likePost, comment, getcomment, Dcomment, Dostatus, getstatus, followUser, getfollower } = require("../controllers/allcontrollers");
const validate = require("../middleware/validate");
const validator = require("../validator/validator")
const router = express.Router();
const upload = require('../middleware/multer')


router.post('/Register', validate(validator), reg);
router.post('/Login', login)

//Verify email

router.get('/verified', (req, res) => {
  const { status, message } = req.query;
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Verification</title>
      <style>
      body {
  font-family: Arial, sans-serif;
  background-color: #fff;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 300px;
  margin: 40px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 10px;
  color: #333;
}

p {
  font-size: 16px;
  margin-bottom: 20px;
  color: #666;
}

.btn {
  width: 100%;
  height: 40px;
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #1dd05e;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #17c654;
}

.btn:active {
  background-color: #14a851;
}

.btn a {
  text-decoration: none;
  color: #fff;
}
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Email Verification</h1>
        <p>${message}</p>
        <p>You can now log in to your account.</p>
        <button class="btn"><a href="http://localhost:5173/Thanks">Click here</a></button>
      </div>
    </body>
    </html>
  `);
});


router.get('/verify/:userid/:username', verify);

// posts

router.post('/upload', upload.single('file'), upload_post);

router.post('/more-info', upload.single('file'), persional);

//get persional

router.get('/getpersional', getpersional)
router.get('/user', getuser)

//get post

router.get('/getpost', getpost)

//Like post

router.post('/likePost', likePost)

//comment

router.post('/comment', comment)

//get comment

router.get('/getcomment', getcomment)

//delete comment

router.delete('/deletecomment', Dcomment)

//status

router.post('/status', Dostatus)

//Get status

router.get('/getstatus/:userid?', getstatus);

// Follow/Unfollow User

router.post('/followUser', followUser);

//getFollowers

router.get('/follower/:userid', getfollower)

module.exports = router;
