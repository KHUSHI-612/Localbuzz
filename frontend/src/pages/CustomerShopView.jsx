import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { MapPin, Star, ShoppingBag, Plus, Minus, CheckCircle } from 'lucide-react';
import categoryVegetables from '../assets/category_vegetables.png';

import api from '../api/axios';

const CustomerShopView = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [shop, setShop] = useState(null);
    const [items, setItems] = useState([]);
    const [cart, setCart] = useState({});
    const [orderPlaced, setOrderPlaced] = useState(false);

    useEffect(() => {
        const fetchShopDetails = async () => {
       
            const isDbId = id.length > 10;

            if (isDbId) {
                try {
                    const { data: shopData } = await api.get(`/shops/${id}`);
                    setShop(shopData);

                    const { data: productsData } = await api.get(`/products/${id}`);
                 
                    const mappedProducts = productsData.map(p => ({
                        ...p,
                        id: p._id 
                    }));
                    setItems(mappedProducts);

                } catch (error) {
                    console.error("Error loading shop details", error);
                }
            } else {
                
                const storedShop = localStorage.getItem('shopDetails');
                const storedItems = localStorage.getItem('shopItems');
                if (storedShop) setShop(JSON.parse(storedShop));
                if (storedItems) setItems(JSON.parse(storedItems));
            }
        };

        fetchShopDetails();
    }, [id]);

    const handleAddToCart = (item) => {
        setCart(prev => ({
            ...prev,
            [item.id]: (prev[item.id] || 0) + 1
        }));
    };

    const handleRemoveFromCart = (item) => {
        setCart(prev => {
            const newCount = (prev[item.id] || 0) - 1;
            if (newCount <= 0) {
                const newCart = { ...prev };
                delete newCart[item.id];
                return newCart;
            }
            return { ...prev, [item.id]: newCount };
        });
    };

    const getTotalAmount = () => {
        return items.reduce((total, item) => {
            return total + (item.price * (cart[item.id] || 0));
        }, 0);
    };

    const handlePlaceOrder = async () => {
        const orderItems = Object.keys(cart).map(itemId => {
            const item = items.find(i => i.id === itemId || i.id === parseInt(itemId));
            return {
                name: item.name,
                quantity: cart[itemId],
                price: item.price,
                unit: item.unit
            };
        });

        const payload = {
            shopId: id,
            items: orderItems,
            totalAmount: getTotalAmount()
        };

        try {
            await api.post('/orders', payload);
            setOrderPlaced(true);
            setTimeout(() => {
                navigate('/customer-home');
            }, 3000);
        } catch (error) {
            console.error("Error placing order", error);
            alert("Failed to place order. Please try again.");
        }
    };

    if (!shop) return <div className="page-container" style={{ paddingTop: '100px', textAlign: 'center' }}>Loading Shop...</div>;

    if (orderPlaced) {
        return (
            <div className="page-container" style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F0FDFA' }}>
                <CheckCircle size={80} color="#059669" style={{ marginBottom: '1.5rem' }} />
                <h2 style={{ color: '#047857', fontSize: '2rem', marginBottom: '1rem' }}>Order Placed Successfully!</h2>
                <p style={{ color: '#065F46', fontSize: '1.2rem' }}>Redirecting to home...</p>
            </div>
        );
    }

    return (
        <div className="page-container" style={{ backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
            <Navbar />

            <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '100px', paddingBottom: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>

             
                <div className="card animate-fade-in" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <h1 style={{ fontSize: '2.5rem', color: '#111827', fontWeight: '800', marginBottom: '0.5rem' }}>{shop.name}</h1>
                    <div style={{ display: 'flex', gap: '1.5rem', color: '#4B5563', fontSize: '1.1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <MapPin size={20} color="#0F766E" />
                            <span>{shop.location} - {shop.pincode}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Star size={20} color="#F59E0B" fill="#F59E0B" />
                            <span>{shop.rating} Rating</span>
                        </div>
                        <span className="role-badge" style={{ backgroundColor: shop.status === 'Open' ? '#DEF7EC' : '#FDE8E8', color: shop.status === 'Open' ? '#03543F' : '#9B1C1C' }}>
                            {shop.status || 'Open'}
                        </span>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap-reverse' }}>
                
                    <div style={{ flex: '2', minWidth: '300px' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1F2937', marginBottom: '1.5rem' }}>Shop Items</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                            {items.map(item => (
                                <div key={item.id} className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #E5E7EB', borderRadius: '16px' }}>
                                    <div style={{ height: '160px', backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={item.image || categoryVegetables} alt={item.name} style={{ width: '100px', objectFit: 'contain' }} />
                                    </div>
                                    <div style={{ padding: '1.2rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>{item.name}</h3>
                                        <p style={{ color: '#0F766E', fontWeight: '700', marginBottom: '1rem' }}>₹{item.price} / {item.unit}</p>

                                        {shop.status === 'Closed' ? (
                                            <button disabled className="btn" style={{ width: '100%', backgroundColor: '#E5E7EB', color: '#9CA3AF', cursor: 'not-allowed' }}>Shop Closed</button>
                                        ) : (
                                            cart[item.id] ? (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F0FDFA', borderRadius: '8px', padding: '0.5rem' }}>
                                                    <button onClick={() => handleRemoveFromCart(item)} style={{ background: 'white', border: '1px solid #CCFBF1', borderRadius: '4px', padding: '4px', cursor: 'pointer' }}><Minus size={16} color="#0F766E" /></button>
                                                    <span style={{ fontWeight: '700', color: '#0F766E' }}>{cart[item.id]}</span>
                                                    <button onClick={() => handleAddToCart(item)} style={{ background: '#0F766E', border: 'none', borderRadius: '4px', padding: '4px', cursor: 'pointer' }}><Plus size={16} color="white" /></button>
                                                </div>
                                            ) : (
                                                <button onClick={() => handleAddToCart(item)} className="btn btn-primary" style={{ width: '100%', padding: '0.6rem' }}>Add to Cart</button>
                                            )
                                        )}
                                    </div>
                                </div>
                            ))}
                            {items.length === 0 && <p style={{ gridColumn: '1/-1', color: '#6B7280' }}>No items available in this shop yet.</p>}
                        </div>
                    </div>

               
                    <div style={{ flex: '1', minWidth: '300px' }}>
                        <div className="card" style={{ position: 'sticky', top: '120px', borderRadius: '16px', padding: '1.5rem', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #F3F4F6', paddingBottom: '1rem' }}>
                                <ShoppingBag size={24} color="#0F766E" />
                                <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Your Basket</h3>
                            </div>

                            {Object.keys(cart).length === 0 ? (
                                <p style={{ color: '#9CA3AF', textAlign: 'center', padding: '2rem 0' }}>Your basket is empty</p>
                            ) : (
                                <div>
                                    <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '1.5rem' }}>
                                        {Object.keys(cart).map(itemId => {
                                            const item = items.find(i => i.id === parseInt(itemId));
                                            if (!item) return null;
                                            return (
                                                <div key={itemId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.95rem' }}>
                                                    <span>{cart[itemId]}x {item.name}</span>
                                                    <span style={{ fontWeight: '600' }}>₹{item.price * cart[itemId]}</span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div style={{ borderTop: '2px dashed #E5E7EB', paddingTop: '1rem', marginTop: 'auto' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.2rem', fontWeight: '800' }}>
                                            <span>Total</span>
                                            <span style={{ color: '#0F766E' }}>₹{getTotalAmount()}</span>
                                        </div>
                                        <button onClick={handlePlaceOrder} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
                                            Place Order
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerShopView;
