import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import authIllustration from '../assets/auth_illustration.png';

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
                    <h1 className="brand-title">Localy</h1>
                    <p className="form-subtitle">create account</p>

                    {error && <div className="error-message" style={{ textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

                    <form onSubmit={onSubmit}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="name" style={{ display: 'block', color: '#555', marginBottom: '0.5rem', fontSize: '0.9rem' }}>full name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={onChange}
                                className="input-clean"
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="email" style={{ display: 'block', color: '#555', marginBottom: '0.5rem', fontSize: '0.9rem' }}>email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                className="input-clean"
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label htmlFor="password" style={{ display: 'block', color: '#555', marginBottom: '0.5rem', fontSize: '0.9rem' }}>password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                className="input-clean"
                                required
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label htmlFor="role" style={{ display: 'block', color: '#555', marginBottom: '0.5rem', fontSize: '0.9rem' }}>i am a...</label>
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
                            sign up
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                        Already have an account? <Link to="/login" style={{ color: '#1a4d4d', fontWeight: '600' }}>Login</Link>
                    </p>
                </div>
                <div className="split-card-right">
                    <img src={authIllustration} alt="Signup Illustration" className="login-illustration" />
                </div>
            </div>
        </div>
    );
};

export default Signup;
