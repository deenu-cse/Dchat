import React from 'react'
import '../Styles/Verify.css'
import email from '../Dimages/email.png'

export default function Verifyyour() {
    return (
        <>
            <div className="vcontainer">
                <div className="vbox">
                    <div className="vimg">
                        <img src={email} />
                    </div>
                    <div className="text">
                        <h2>Email Sent Successfully</h2>
                        <p>Thank you for registering with us! We’ve sent a confirmation email to the address you provided.</p>
                        <p>Please check your inbox (and spam folder) for an email with further instructions. If you do not see it shortly, make sure to verify the email address you entered or <a href="vdeendayal866@example.com">contact our support team</a> for assistance.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
