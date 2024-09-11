import React from 'react'
import "../Styles/Welcome.css"
import girl from '../Dimages/girl.png'
import e1 from '../Dimages/e1.png'
import e2 from '../Dimages/e2.png'
import e3 from '../Dimages/e3.png'
import u1 from '../Dimages/user-1.png'
import u2 from '../Dimages/user-2.png'
import u3 from '../Dimages/user-3.png'
import u4 from '../Dimages/user-4.jpg'
import u5 from '../Dimages/user-5.jpg'
import wel from '../Dimages/wel.png'
import { NavLink } from 'react-router-dom'

export default function Welcome() {
    return (
        <>
            <div className="container">
                <div className="con2">
                    <div className="start">
                        <h2>Start Sharing and Connecting with Your World on <br /> Dchat!</h2>
                        <p>1200+ Users</p>
                    </div>
                    <div className="img">
                        <img className='girl' src={girl} />
                        <img className='wel' src={wel}/>
                        <img className='e1' src={e1} />
                        <img className='e2' src={e2} />
                        <img className='e3' src={e3} />
                    </div>
                    <div className="last">
                        <div className="happy">
                            <div className="people">
                                <img src={u1} />
                                <img src={u2} />
                                <img src={u3} />
                                <img src={u4} />
                            </div>
                            <div className="star">
                                <img src='https://img.icons8.com/?size=100&id=19417&format=png&color=000000' />
                                <img src='https://img.icons8.com/?size=100&id=19417&format=png&color=000000' />
                                <img src='https://img.icons8.com/?size=100&id=19417&format=png&color=000000' />
                                <img src='https://img.icons8.com/?size=100&id=19417&format=png&color=000000' />
                                <img src='https://img.icons8.com/?size=100&id=19417&format=png&color=000000' />
                            </div>
                        </div>
                        <p>1214+... Happy users</p>
                        <div className="btn">
                            <NavLink to={'/SignIn'}>
                            <button>Sign IN</button>
                            </NavLink>
                            <NavLink to={'/LogIn'}>
                            <button>Log IN</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
