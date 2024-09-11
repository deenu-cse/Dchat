import React, { useState } from 'react';
import '../Styles/Sign.css';
import sign from '../Dimages/sign.png';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';


export default function Sign() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const dosignin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/Register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            });

            const resdata = await response.json();
            console.log(resdata)
            if (response.ok) {
                localStorage.setItem('token', resdata.token);
                localStorage.setItem('userid', resdata.userid)
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: ""
                });
                toast.success(resdata.msg);
                navigate('/more-info')
            } else {
                toast.error(resdata.msg);
            }
        } catch (error) {
            toast.error("Error during registration:");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="scontainer">
                <div className="sbox">
                    <h2>Welcome in Dchat</h2>
                    <div className="inputs">
                        <form onSubmit={dosignin}>
                            <input placeholder='username' name='username' onChange={handleInput} value={user.username} type='text' />
                            <input placeholder='email..' name='email' onChange={handleInput} value={user.email} type='email' />
                            <input placeholder='phone..' name='phone' onChange={handleInput} value={user.phone} type='text' />
                            <input placeholder='password..' name='password' onChange={handleInput} value={user.password} type='password' />
                            <button type='submit'>Sign In</button>
                        </form>
                    </div>
                    <p>Already have an account ? <NavLink to={'/LogIn'}><span><strong>Login</strong></span></NavLink></p>
                </div>
                <div className="simg">
                    <img src={sign} alt="Sign" />
                </div>
            </div>
        </>
    );
}
