import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer style={{ backgroundColor: '#0F766E', color: 'white', paddingTop: '4rem', paddingBottom: '2rem', marginTop: '4rem' }}>
            <div className="container" style={{ marginLeft: 'auto', marginRight: 'auto', padding: '0 2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>

                   
                    <div>
                        <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem' }}>Localy</h3>
                        <p style={{ color: '#CCFBF1', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                            Your one-stop destination for all local needs. Connecting you with the best neighborhood shops for fresh produce and daily essentials.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Facebook size={20} color="#CCFBF1" style={{ cursor: 'pointer' }} />
                            <Twitter size={20} color="#CCFBF1" style={{ cursor: 'pointer' }} />
                            <Instagram size={20} color="#CCFBF1" style={{ cursor: 'pointer' }} />
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#CCFBF1' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '0.8rem' }}>
                                <span onClick={() => navigate('/customer-home')} style={{ cursor: 'pointer', color: 'white', opacity: 0.9, transition: 'opacity 0.2s' }}>Home</span>
                            </li>
                            <li style={{ marginBottom: '0.8rem' }}>
                                <span onClick={() => navigate('/shops')} style={{ cursor: 'pointer', color: 'white', opacity: 0.9, transition: 'opacity 0.2s' }}>Shop</span>
                            </li>
                            <li style={{ marginBottom: '0.8rem' }}>
                                <span onClick={() => navigate('/orders')} style={{ cursor: 'pointer', color: 'white', opacity: 0.9, transition: 'opacity 0.2s' }}>Orders</span>
                            </li>
                            <li style={{ marginBottom: '0.8rem' }}>
                                <span onClick={() => navigate('/about')} style={{ cursor: 'pointer', color: 'white', opacity: 0.9, transition: 'opacity 0.2s' }}>About Us</span>
                            </li>
                        </ul>
                    </div>

               
                    <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '1.5rem', color: '#CCFBF1' }}>Contact Us</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Phone size={18} color="#CCFBF1" />
                                <span style={{ color: 'white', opacity: 0.9 }}>+91 98765 4321</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <Mail size={18} color="#CCFBF1" />
                                <span style={{ color: 'white', opacity: 0.9 }}>support@localy.com</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                                <MapPin size={18} color="#CCFBF1" style={{ marginTop: '0.2rem' }} />
                                <span style={{ color: 'white', opacity: 0.9 }}>Block A, Connaught Place, <br /> New Delhi, 110001</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', marginTop: '3rem', paddingTop: '2rem', textAlign: 'center' }}>
                    <p style={{ color: '#CCFBF1', fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} Localy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
