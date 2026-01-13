import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Package, Clock, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';

const CustomerOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('ongoing'); 

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await api.get('/orders/my-orders');
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const ongoingOrders = orders.filter(order =>
        ['Pending', 'Accepted', 'Preparing', 'Ready'].includes(order.status)
    );

    const completedOrders = orders.filter(order =>
        ['Delivered', 'Cancelled', 'Rejected'].includes(order.status)
    );

    const displayOrders = activeTab === 'ongoing' ? ongoingOrders : completedOrders;

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Accepted': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Preparing': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Ready': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'Delivered': return 'bg-teal-100 text-teal-800 border-teal-200'; // Using Teal for success
            case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
            case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    if (loading) {
        return (
            <div className="page-container" style={{ backgroundColor: 'var(--bg-dark)' }}>
                <Navbar />
                <div className="container" style={{ paddingTop: '100px', display: 'flex', justifyContent: 'center' }}>
                    <p>Loading your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="page-container" style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh', paddingBottom: '4rem' }}>
            <Navbar />

            <div className="container" style={{ paddingTop: '40px', maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: '#1F2937', fontWeight: '800', letterSpacing: '-0.025em' }}>My Orders</h1>
                    <p style={{ color: '#6B7280', fontSize: '1.1rem' }}>Track and manage your recent purchases</p>
                </div>

                
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '3rem'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '0.5rem',
                        borderRadius: '99px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                        display: 'flex',
                        gap: '0.5rem'
                    }}>
                        <button
                            onClick={() => setActiveTab('ongoing')}
                            style={{
                                padding: '0.75rem 2rem',
                                borderRadius: '99px',
                                background: activeTab === 'ongoing' ? 'var(--primary)' : 'transparent',
                                border: 'none',
                                color: activeTab === 'ongoing' ? 'white' : '#6B7280',
                                fontWeight: '600',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s ease',
                                boxShadow: activeTab === 'ongoing' ? '0 4px 12px rgba(15, 118, 110, 0.3)' : 'none'
                            }}
                        >
                            <Clock size={18} /> Ongoing <span style={{ opacity: 0.8, fontSize: '0.9em', marginLeft: '4px' }}>{ongoingOrders.length}</span>
                        </button>
                        <button
                            onClick={() => setActiveTab('completed')}
                            style={{
                                padding: '0.75rem 2rem',
                                borderRadius: '99px',
                                background: activeTab === 'completed' ? 'var(--primary)' : 'transparent',
                                border: 'none',
                                color: activeTab === 'completed' ? 'white' : '#6B7280',
                                fontWeight: '600',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                transition: 'all 0.3s ease',
                                boxShadow: activeTab === 'completed' ? '0 4px 12px rgba(15, 118, 110, 0.3)' : 'none'
                            }}
                        >
                            <CheckCircle size={18} /> Completed <span style={{ opacity: 0.8, fontSize: '0.9em', marginLeft: '4px' }}>{completedOrders.length}</span>
                        </button>
                    </div>
                </div>

               
                {displayOrders.length === 0 ? (
                    <div className="animate-fade-in" style={{
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        padding: '5rem 2rem',
                        textAlign: 'center',
                        width: '100%',
                        maxWidth: '600px',
                        margin: '0 auto',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)'
                    }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: 'var(--secondary)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 2rem auto'
                        }}>
                            <ShoppingBag size={48} style={{ color: 'var(--primary)' }} strokeWidth={1.5} />
                        </div>
                        <h3 style={{ color: '#1F2937', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                            No {activeTab.toLowerCase()} orders
                        </h3>
                        <p style={{ color: '#6B7280', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                            Looks like you haven't placed any orders yet. Start shopping to fill your basket!
                        </p>
                        <Link to="/shops" style={{
                            display: 'inline-block',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            padding: '1rem 2.5rem',
                            borderRadius: '99px',
                            fontWeight: '600',
                            fontSize: '1.1rem',
                            boxShadow: '0 10px 15px -3px rgba(15, 118, 110, 0.3)',
                            transition: 'transform 0.2s',
                            textDecoration: 'none'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '2rem', width: '100%' }}>
                        {displayOrders.map(order => (
                            <div key={order._id} className="card animate-fade-in" style={{
                                backgroundColor: 'white',
                                padding: '2rem',
                                border: 'none',
                                borderRadius: '20px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '1.5rem',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                                transition: 'transform 0.2s, box-shadow 0.2s'
                            }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)';
                                }}
                            >
                                <div style={{ flex: '1 1 300px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                                        <h3 style={{ margin: 0, color: '#1F2937', fontSize: '1.4rem', fontWeight: '700' }}>
                                            {order.shop?.name || 'Unknown Shop'}
                                        </h3>
                                        <span style={{
                                            padding: '6px 16px',
                                            borderRadius: '99px',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            letterSpacing: '0.025em',
                                            backgroundColor: order.status === 'Delivered' ? 'var(--secondary)' :
                                                order.status === 'Cancelled' ? '#FEF2F2' : '#FFFBEB',
                                            color: order.status === 'Delivered' ? 'var(--primary)' :
                                                order.status === 'Cancelled' ? '#EF4444' : '#D97706',
                                            border: `1px solid ${order.status === 'Delivered' ? 'var(--accent)' :
                                                order.status === 'Cancelled' ? '#FECACA' : '#FDE68A'
                                                }`
                                        }}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <p style={{ color: '#6B7280', fontSize: '0.95rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Clock size={16} />
                                        {new Date(order.createdAt).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        <span>•</span>
                                        {new Date(order.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                        {order.items.map((item, idx) => (
                                            <span key={idx} style={{
                                                fontSize: '0.95rem',
                                                color: '#374151',
                                                backgroundColor: '#F3F4F6',
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                fontWeight: '500'
                                            }}>
                                                <span style={{ fontWeight: '700', color: 'var(--primary)' }}>{item.quantity}x</span> {item.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ textAlign: 'right', minWidth: '140px', borderLeft: '1px solid #F3F4F6', paddingLeft: '1.5rem' }}>
                                    <p style={{ fontSize: '0.95rem', color: '#6B7280', marginBottom: '0.5rem', fontWeight: '500' }}>Total Amount</p>
                                    <p style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--primary)', margin: 0, letterSpacing: '-0.025em' }}>
                                        ₹{order.totalAmount}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerOrders;
