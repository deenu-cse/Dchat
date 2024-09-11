import React, { useState } from 'react';
import log from '../Dimages/log.png';
import '../Styles/Log.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const doLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/Login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });

      const resData = await response.json();
      console.log(resData)
      if (response.ok) {
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userid', resData.userid)
        setUser({
          email: "",
          password: ""
        })
        toast.success(resData.msg);
        navigate('/Home');
      } else {
        toast.error(resData.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error(resData.msg);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="lcontainer">
        <div className="lbox">
          <h2>Welcome to Dchat</h2>
          <div className="inputs">
            <form onSubmit={doLogin}>
              <input
                placeholder='Email...'
                name='email'
                value={user.email}
                type='email'
                onChange={handleInput}
              />
              <input
                placeholder='Password...'
                name='password'
                value={user.password}
                type='password'
                onChange={handleInput}
              />
              <button type='submit'>Log In</button>
            </form>
          </div>
          <p>Don't have an account? <NavLink to={'/SignIn'}><strong>Register</strong></NavLink></p>
          <br />
          {/* <p>Forgot password? <span onClick={resetPass}><strong>Email me</strong></span></p> */}
        </div>
        <div className="limg">
          <img src={log} alt="Login" />
        </div>
      </div>
    </div>
  );
}
