import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';


const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'customer',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { name, email, password, role } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/signup', formData);
            const { token, role } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('userEmail', response.data.email);

            if (role === 'customer') {
                navigate('/customer-home');
            } else {
                navigate('/owner-home');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="auth-page-bg">
            <div className="split-card animate-fade-in">
                <div className="split-card-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <Link to="/login">
                        <button className="btn-outline">Sign In</button>
                    </Link>
                </div>
                <div className="split-card-right">
                    <h2>Create Account</h2>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={onSubmit} className="auth-form">
                        <div className="input-group">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Full Name"
                                value={name}
                                onChange={onChange}
                                className="input-clean"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={email}
                                onChange={onChange}
                                className="input-clean"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={onChange}
                                className="input-clean"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <select
                                id="role"
                                name="role"
                                value={role}
                                onChange={onChange}
                                className="input-clean"
                                style={{ backgroundColor: 'white' }}
                            >
                                <option value="customer">Customer</option>
                                <option value="owner">Shop Owner</option>
                            </select>
                        </div>

                        <button type="submit" className="btn-clean">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
