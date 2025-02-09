import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../style2.css";

export default function Header() {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('userEmail'); // Очищення LocalStorage
        navigate('/login'); // Перенаправлення на сторінку логіну
    };

    return (
        <div className="header">
            <img className='logo' src='/images/logo.png' alt="Logo" />
            <div className='nav-header'>
                <nav>
                    <ul>
                        <li>
                            <Link to='/home'>Home</Link>
                        </li>
                        <li>
                            <Link to='/catalog'>Catalog</Link>
                        </li>
                        <li>
                            <Link to='/cart'>Cart</Link>
                        </li>
                        <li>
                            <button className='sign-out-button' onClick={handleSignOut}>
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
