import { Link, useNavigate } from 'react-router-dom';
import { Store, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const ShopkeeperNavbar = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/owner-home" className="navbar-logo" onClick={closeMenu}>
                    <Store /> LocalBuzz <span className="role-badge" style={{ backgroundColor: 'rgba(255,255,255,0.2)', marginLeft: '8px' }}>Business</span>
                </Link>

                <div className="mobile-menu-btn" onClick={toggleMenu}>
                    {isMenuOpen ? <X color="white" /> : <Menu color="white" />}
                </div>

                <div className={`navbar-links ${isMenuOpen ? 'mobile-open' : ''}`}>
                    <Link to="/owner-home" className="nav-link" onClick={closeMenu}>Home</Link>
                    <Link to="/owner-orders" className="nav-link" onClick={closeMenu}>Orders</Link>
                    <button onClick={() => { handleLogout(); closeMenu(); }} className="btn-logout" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default ShopkeeperNavbar;
