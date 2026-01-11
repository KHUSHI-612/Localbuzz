import { Link, useNavigate } from 'react-router-dom';

const ShopkeeperNavbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <nav className="navbar" style={{ backgroundColor: '#0F766E' }}>
            <div className="container navbar-container">
                <Link to="/owner-home" className="navbar-logo">
                    LocalBuzz <span style={{ fontSize: '0.8rem', opacity: 0.8, fontWeight: 'normal' }}>Business</span>
                </Link>
                <div className="navbar-links">
                    <Link to="/owner-home" className="nav-link">Home</Link>
                    <Link to="/my-shop" className="nav-link">Your Shop</Link>
                    <Link to="/owner-orders" className="nav-link">Orders</Link>
                    <button onClick={handleLogout} className="btn-logout">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default ShopkeeperNavbar;
