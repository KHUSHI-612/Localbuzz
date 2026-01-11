import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      
        return userRole === 'customer' ? <Navigate to="/customer-home" replace /> : <Navigate to="/owner-home" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
