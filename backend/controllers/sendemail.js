require("dotenv").config()
const express = require("express")
const nodemailer = require("nodemailer");
const Verification = require("../models/Verifymdel");

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD
    }
})

const sendverificationemail = async (usercreated, res) => {
    const { _id, email, username } = usercreated
    const URL = `${APP_URL}/verify/${_id}/${username}`;

    const mailsoption = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Email verification",
        html: `
          <div style="max-width: 600px; margin: 40px auto; padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 10px;">
            <h2 style="color: #333; margin-top: 0;">Verify Your Email Address</h2>
            <p style="color: #666;">Hello ${username},</p>
            <p style="color: #666;">Please click the link below to verify your email address:</p>
            <a href="${URL}" style="background-color: #4CAF50; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; text-decoration: none;">Verify Email</a>
            <p style="color: #666;">If you did not request this email, please ignore it.</p>
            <p style="color: #666;">Best regards,</p>
            <p style="color: #666;">Your Business Team</p>
          </div>
        `,
    }

    try {
        await Verification.create({
            userid: _id,
            createdAt: Date.now(),
            expireAt: Date.now() + 3600000
        })
        transporter.sendMail(mailsoption, (err, info) => {
            if (err) {
                console.log(err);
                if (!res.headersSent) {  // Check if headers have already been sent
                    res.status(400).json({ msg: "Something went wrong" });
                }
            } else {
                if (!res.headersSent) {
                    res.status(201).send({
                        success: "pending",
                        message: "Verification email has been sent to your account. Check your email for verification."
                    });
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({ msg: "Something went wrong" });
    }
}

module.exports = sendverificationemail