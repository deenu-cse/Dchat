import React, { useState } from 'react';
import '../Styles/Popup3.css';
// import story from '../Dimages/status.png';
// import img1 from '../Dimages/img1.jpg';
// import img2 from '../Dimages/img2.jpg';
// import img3 from '../Dimages/img3.jpg';



export default function Popup4({ isOpen, onClose }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [status, setstatus] = useState([])

    const handleNextClick = () => {
        setCurrentIndex((currentIndex + 1) % status.length);
    };

    const handlePrevClick = () => {
        setCurrentIndex((currentIndex - 1 + status.length) % status.length);
    };



    return (
        <div className="popup4-overlayx" onClick={onClose}>
            <div className="popup4-contentx" onClick={e => e.stopPropagation()}>
                <span className="popup4-closex" onClick={onClose}>⨯</span>
                <div className="showflex">
                    <img src={status[currentIndex]} alt="slider image" />
                    <button onClick={handlePrevClick}>Prev</button>
                    <button onClick={handleNextClick}>Next</button>
                </div>
            </div>
        </div>
    );
}