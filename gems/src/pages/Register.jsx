import React, { useState } from 'react';
import './register.css';

const baseUrl = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async () => {
        if (!formData.name || !formData.email || !formData.password) {
            alert("Please fill in all fields.");
            setLoading(false);
            return;
        }
        setLoading(true);
        if (formData.password.length < 6) {
            alert("Password must be at least 6 characters long.");
            setLoading(false);
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            alert("Please enter a valid email address.");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch(`${baseUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Registration successful!');
                window.location.href = '/login';
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            alert('Server error');
        }
    };

    return (
        <div className="register-container">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleRegister();
                }}
            >
                <div className="register-card">
                    <h2>Register</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="register-input"
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="register-input"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="register-input"
                        onChange={handleChange}
                    />
                    <button className="register-button" type='submit'>{loading? "Signing Up...":"Sign Up"}</button>
                    <p className="register-login-link">
                        Already have an account? <a href="/login" className="text-white-50 fw-bold">Login</a>
                    </p>

                </div>
            </form>
        </div>
    );
}

export default Register;