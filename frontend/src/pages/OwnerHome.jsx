import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const OwnerHome = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
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
                        <h1 className="title-gradient">LocalBuzz Business</h1>
                        <button onClick={handleLogout} className="btn" style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                            Logout
                        </button>
                    </div>

                    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome Shop Owner!</h2>
                        {userEmail && <p style={{ fontSize: '1.2rem', color: 'var(--text-gray)' }}>Logged in as: <span style={{ color: 'var(--primary)' }}>{userEmail}</span></p>}

                        <div style={{ marginTop: '2rem' }}>
                            <span className="role-badge owner">Owner Account</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerHome;
