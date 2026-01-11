import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import authIllustration from '../assets/auth_illustration.png';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', formData);
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
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-page-bg">
            <div className="split-card animate-fade-in">
                <div className="split-card-left">
                    <h1 className="brand-title">Localy</h1>
                    <p className="form-subtitle">welcome back</p>

                    {error && <div className="error-message" style={{ textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}

                    <form onSubmit={onSubmit}>
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

                        <div style={{ marginBottom: '1.5rem' }}>
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

                        <button type="submit" className="btn-clean">
                            login
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-gray)', fontSize: '0.9rem' }}>
                        Don't have an account? <Link to="/signup" style={{ color: '#1a4d4d', fontWeight: '600' }}>Sign Up</Link>
                    </p>
                </div>
                <div className="split-card-right">
                    <img src={authIllustration} alt="Login Illustration" className="login-illustration" />
                </div>
            </div>
        </div>
    );
};

export default Login;
