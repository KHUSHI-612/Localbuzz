import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';


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
                    <h1>New Here?</h1>
                    <p>Sign up and discover a great amount of new opportunities!</p>
                    <Link to="/signup">
                        <button className="btn-outline">Sign Up</button>
                    </Link>
                </div>
                <div className="split-card-right">
                    <h2>Login to Your Account</h2>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={onSubmit} className="auth-form">
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

                        <button type="submit" className="btn-clean">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
