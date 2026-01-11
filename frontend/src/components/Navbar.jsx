import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userEmail');
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <Link to="/customer-home" className="navbar-logo">
                    LocalBuzz
                </Link>
                <div className="navbar-links">
                    <Link to="/customer-home" className="nav-link">Home</Link>
                    <Link to="/shops" className="nav-link">Shops</Link>
                    <a href="#" className="nav-link">Orders</a>
                    <button onClick={handleLogout} className="btn-logout">
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
