import React from 'react'
import '../Styles/Thanks.css'
import thanks from '../Dimages/thanks.png'
import { NavLink } from 'react-router-dom'

export default function Thanks() {
  return (
    <>
      <div className="tcontainer">
        <div className="tbox">
          <div className="timg">
            <img src={thanks} />
          </div>
          <div className="text">
            <h2>Your Account is Now Verified!</h2>
            <p>Congratulations! Your email address has been successfully verified. You can now access all features of your account and enjoy our services. If you have any questions or need further assistance, feel free to contact our support team. Welcome aboard!</p>
            <div className="tbtn">
              <button><NavLink to={'/LogIn'}><span><strong>Login</strong></span></NavLink></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
