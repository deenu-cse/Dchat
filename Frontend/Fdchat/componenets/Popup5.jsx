import React, { useEffect, useState } from 'react';
import '../Styles/Popup5.css';

export default function Popup5({ isOpen, onClose, userid }) {
    const [statuses, setStatuses] = useState([]);

    useEffect(() => {
        if (isOpen && userid) {
            const getUserStatus = async () => {
                try {
                    const response = await fetch(`http://localhost:5000/getstatus/${userid}`, {
                        method: "GET",
                    });
                    if (response.ok) {
                        const userStatuses = await response.json();
                        setStatuses(userStatuses);
                    } else {
                        console.error('Error fetching statuses:', response.status);
                    }
                } catch (error) {
                    console.error('Error fetching statuses:', error);
                }
            };
            getUserStatus();
        }
    }, [isOpen, userid]);

    if (!isOpen) return null;

    return (
        <div className="popup5-overlayx" onClick={onClose}>
            <div className="popup5-contentx" onClick={e => e.stopPropagation()}>
                <span className="popup5-closex" onClick={onClose}>⨯</span>
                <div className="video">
                    {Array.isArray(statuses) && statuses.map((v, i) => (
                        <video key={i} className="custom-video" src={v.video} autoPlay controls />
                    ))}
                </div>
            </div>
        </div>
    );
}
