import { useState, useEffect } from 'react';
import ShopkeeperNavbar from '../components/ShopkeeperNavbar';
import { Package, Clock, CheckCircle } from 'lucide-react';
import api from '../api/axios';

const OwnerOrders = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders/shop');
                
                const mappedOrders = data.map(order => ({
                    id: order._id,
                    customer: order.customer?.name || order.customer?.email || 'Customer',
                    items: order.items.map(i => `${i.quantity}x ${i.name}`).join(', '),
                    total: `₹${order.totalAmount}`,
                    status: order.status,
                    time: new Date(order.createdAt).toLocaleDateString() + ' ' + new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }));
                setOrders(mappedOrders);
            } catch (error) {
                console.error("Error fetching orders", error);
            }
        };
        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status: newStatus });
            setOrders(prev => prev.map(order =>
                order.id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (error) {
            console.error("Error updating status", error);
            alert("Failed to update status");
        }
    };

    return (
        <div className="page-container" style={{ backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
            <ShopkeeperNavbar />

            <div className="container" style={{ paddingTop: '100px', paddingBottom: '4rem' }}>
                <h1 style={{ fontSize: '2rem', color: '#1F2937', fontWeight: '800', marginBottom: '2rem' }}>Incoming Orders</h1>

                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {orders.map(order => (
                        <div key={order.id} className="card animate-fade-in" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '12px', border: 'none', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#111827' }}>{order.id}</h3>
                                    <span style={{
                                        backgroundColor: order.status === 'Pending' ? '#FEF3C7' : (order.status === 'Completed' ? '#DEF7EC' : '#E0F2FE'),
                                        color: order.status === 'Pending' ? '#D97706' : (order.status === 'Completed' ? '#03543F' : '#0369A1'),
                                        padding: '0.2rem 0.8rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '600'
                                    }}>
                                        {order.status}
                                    </span>
                                </div>
                                <p style={{ color: '#6B7280', marginBottom: '0.2rem' }}><strong>Customer:</strong> {order.customer}</p>
                                <p style={{ color: '#4B5563' }}>{order.items}</p>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '1.2rem', fontWeight: '700', color: '#0F766E', marginBottom: '0.5rem' }}>{order.total}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#9CA3AF', fontSize: '0.9rem' }}>
                                    <Clock size={14} />
                                    <span>{order.time}</span>
                                </div>

                                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                    {order.status === 'Pending' && (
                                        <>
                                            <button
                                                onClick={() => updateOrderStatus(order.id, 'In Progress')}
                                                className="btn"
                                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', backgroundColor: '#0F766E', color: 'white' }}
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => updateOrderStatus(order.id, 'Declined')}
                                                className="btn"
                                                style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', backgroundColor: '#F3F4F6', color: '#4B5563', border: 'none' }}
                                            >
                                                Decline
                                            </button>
                                        </>
                                    )}
                                    {order.status === 'In Progress' && (
                                        <button
                                            onClick={() => updateOrderStatus(order.id, 'Completed')}
                                            className="btn"
                                            style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', backgroundColor: '#059669', color: 'white' }}
                                        >
                                            <CheckCircle size={16} style={{ marginRight: '4px' }} /> Complete Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {orders.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '4rem', color: '#9CA3AF' }}>
                            <Package size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>No new orders yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OwnerOrders;
