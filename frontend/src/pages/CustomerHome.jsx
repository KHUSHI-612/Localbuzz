import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CustomerHome = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // In a real app, you might fetch user details from an endpoint using the token
        // For now, we can't easily get the email unless we stored it or decoded the token on FE
        // But specific requirement said: "Display 'Welcome Customer!' and user email."
        // Let's decode token or just mock it if not stored? 
        // Wait, the login response returned email but we only stored token/role.
        // I should probably decode the token or fetch /me. 
        // Or updated Login/Signup to store email in localStorage for display simplicity? 
        // Let's assume standard behavior: fetch from API or decode. 
        // But since I didn't make a /me endpoint, I'll rely on the token payload if it has email?
        // My generateToken only has { id, role }. 
        // I should probably store email or update backend to include it in token.
        // For simplicity now, let's update Login/Signup to store name/email in localStorage for display.
        // I'll update this component to read from localStorage.
        const email = localStorage.getItem('userEmail');
        if (email) setUserEmail(email);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <div className="page-container" style={{ display: 'block', paddingTop: '80px' }}>
            <div className="container">
                <div className="card animate-fade-in">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h1 className="title-gradient">LocalBuzz</h1>
                        <button onClick={handleLogout} className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                            Logout
                        </button>
                    </div>

                    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome Customer!</h2>
                        {userEmail && <p style={{ fontSize: '1.2rem', color: 'var(--text-gray)' }}>Logged in as: <span style={{ color: 'var(--primary)' }}>{userEmail}</span></p>}

                        <div style={{ marginTop: '2rem' }}>
                            <span className="role-badge customer">Customer Account</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerHome;
