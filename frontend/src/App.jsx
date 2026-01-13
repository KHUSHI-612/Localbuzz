import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CustomerHome from './pages/CustomerHome';
import Shops from './pages/Shops';
import CreateShop from './pages/CreateShop';
import OwnerShopView from './pages/OwnerShopView';
import OwnerOrders from './pages/OwnerOrders';
import OwnerHome from './pages/OwnerHome';
import PrivateRoute from './components/PrivateRoute';

import CustomerShopView from './pages/CustomerShopView';
import CustomerOrders from './pages/CustomerOrders';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />


        <Route element={<PrivateRoute allowedRoles={['customer']} />}>
          <Route path="/customer-home" element={<CustomerHome />} />
          <Route path="/shops" element={<Shops />} />
          <Route path="/shop/:id" element={<CustomerShopView />} />
          <Route path="/customer-orders" element={<CustomerOrders />} />
        </Route>

        <Route element={<PrivateRoute allowedRoles={['owner']} />}>
          <Route path="/owner-home" element={<OwnerHome />} />
          <Route path="/create-shop" element={<CreateShop />} />
          <Route path="/my-shop" element={<OwnerShopView />} />
          <Route path="/owner-orders" element={<OwnerOrders />} />
        </Route>

      
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
