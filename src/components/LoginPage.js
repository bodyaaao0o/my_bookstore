import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: email, password })
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("token", data.token); // Зберігаємо токен
                navigate('/home'); // Перенаправлення після логіну
            } else {
                alert(data.message || "Invalid credentials!");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="log-container">
            <h1>Login</h1>
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
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
