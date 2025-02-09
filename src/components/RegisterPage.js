import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token); 
                navigate('/home'); 
            } else {
                alert(data.message || "Registration failed!");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="log-container">
            <h1>Register</h1>
            <input
                type="username"
                placeholder="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>SIGN ME UP</button>
            <div className="nav-text">
                Already a member? <a href="/login">Sign in</a>
            </div>
        </div>
    );
};

export default RegisterPage;
