import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';

const OwnerHome = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email) setUserEmail(email);

        const checkShop = async () => {
            try {
                const { data } = await api.get('/shops/my-shop');
                if (data) {
                    navigate('/my-shop');
                }
            } catch (error) {
                
                console.log("No existing shop found or verification failed:", error.message);
            }
        };

        checkShop();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#FAFAF9' }}>
            <div className="card animate-fade-in" style={{ maxWidth: '600px', width: '100%', textAlign: 'center', padding: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0F766E', marginBottom: '1rem' }}>Welcome to LocalBuzz!</h1>
                <p style={{ fontSize: '1.2rem', color: '#4B5563', marginBottom: '2.5rem' }}>
                    You're just one step away from taking your business online. Create your shop profile to start selling to customers nearby.
                </p>

                <div style={{ padding: '2rem', backgroundColor: '#F0FDFA', borderRadius: '16px', border: '1px dashed #0F766E', marginBottom: '2.5rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1F2937', marginBottom: '0.5rem' }}>Ready to launch?</h3>
                    <button
                        className="btn btn-primary"
                        style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', borderRadius: '50px', marginTop: '1rem' }}
                        onClick={() => navigate('/create-shop')}
                    >
                        Create Your Shop
                    </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
                    <button onClick={handleLogout} className="btn" style={{ background: 'transparent', color: '#6B7280', border: '1px solid #E5E7EB' }}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OwnerHome;
