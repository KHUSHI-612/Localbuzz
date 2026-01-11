import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShopkeeperNavbar from '../components/ShopkeeperNavbar';
import { Plus, Package, Edit, Trash, MapPin, Star } from 'lucide-react';
import api from '../api/axios';

import categoryVegetables from '../assets/category_vegetables.png';

const OwnerShopView = () => {
    const navigate = useNavigate();
    const [shopDetails, setShopDetails] = useState(null);
    const [items, setItems] = useState([]);

    const [newItem, setNewItem] = useState({ name: '', price: '', unit: 'kg' });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const fetchShopAndProducts = async () => {
            try {
             
                const { data: shop } = await api.get('/shops/my-shop');
                setShopDetails(shop);

           
                if (shop && shop._id) {
                    const { data: products } = await api.get(`/products/${shop._id}`);
                    setItems(products);
                }
            } catch (error) {
                console.error("Error loading shop/products", error);
                if (error.response?.status === 404) {
                    navigate('/create-shop');
                }
            }
        };

        fetchShopAndProducts();
    }, [navigate]);

    if (!shopDetails) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <p>Loading Shop Details...</p>
            </div>
        );
    }

    const toggleStatus = async () => {
        try {
            const newStatus = shopDetails.status === 'Open' ? 'Closed' : 'Open';
            const { data } = await api.put('/shops', { status: newStatus });
            setShopDetails(prev => ({ ...prev, status: data.status }));
        } catch (error) {
            console.error("Error updating status", error);
            alert("Failed to update status");
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: newItem.name,
                price: parseFloat(newItem.price),
                unit: newItem.unit,
                image: categoryVegetables 
            };

            const { data: product } = await api.post('/products', payload);
            setItems([...items, product]);
            setNewItem({ name: '', price: '', unit: 'kg' });
            setIsAdding(false);
        } catch (error) {
            console.error("Error adding item", error);
            alert("Failed to add item");
        }
    };

    return (
        <div className="page-container" style={{ backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
            <ShopkeeperNavbar />

            <div style={{ maxWidth: '1400px', margin: '0 auto', paddingTop: '100px', paddingBottom: '4rem', paddingLeft: '2rem', paddingRight: '2rem' }}>

                {/* Shop Header - Full Width Style */}
                <div className="card animate-fade-in" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '2.5rem', marginBottom: '2rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                                <h1 style={{ fontSize: '2.5rem', color: '#111827', fontWeight: '800', margin: 0, letterSpacing: '-0.025em' }}>
                                    {shopDetails.name}
                                </h1>
                                <span className="role-badge" style={{ backgroundColor: '#DEF7EC', color: '#03543F', fontSize: '0.9rem' }}>{shopDetails.status}</span>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', color: '#4B5563', fontSize: '1.1rem', marginTop: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <MapPin size={20} color="#0F766E" />
                                    <span>{shopDetails.location}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ backgroundColor: '#E5E7EB', padding: '0 8px', borderRadius: '4px', fontSize: '0.9rem', fontWeight: '600' }}>PIN</div>
                                    <span>{shopDetails.pincode}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Package size={20} color="#0F766E" />
                                    <span>{shopDetails.category || (shopDetails.tags && shopDetails.tags[0]) || 'General Store'}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            className="btn"
                            style={{ border: '1px solid #D1D5DB', color: '#374151', backgroundColor: 'white', fontWeight: '600' }}
                            onClick={() => navigate('/create-shop')}
                        >
                            <Edit size={16} style={{ marginRight: '8px' }} /> Edit Details
                        </button>
                    </div>

                    {/* Toggle Open/Close */}
                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid #F3F4F6', paddingTop: '1.5rem' }}>
                        <span style={{ fontSize: '0.95rem', color: '#4B5563', fontWeight: '600' }}>Shop Status:</span>
                        <div
                            onClick={toggleStatus}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                cursor: 'pointer',
                                padding: '0.5rem 1rem',
                                borderRadius: '50px',
                                backgroundColor: shopDetails.status === 'Open' ? '#DEF7EC' : '#FDE8E8',
                                border: shopDetails.status === 'Open' ? '1px solid #31C48D' : '1px solid #F98080',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <div style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: shopDetails.status === 'Open' ? '#0E9F6E' : '#E02424'
                            }}></div>
                            <span style={{
                                color: shopDetails.status === 'Open' ? '#03543F' : '#9B1C1C',
                                fontWeight: '700',
                                textTransform: 'uppercase',
                                fontSize: '0.9rem'
                            }}>
                                {shopDetails.status}
                            </span>
                            <span style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 'normal' }}>(Click to change)</span>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

                    {/* Items Section - Takes 70% width on large screens */}
                    <div style={{ flex: '2', minWidth: '300px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'bottom', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#1F2937', margin: 0 }}>Inventory</h2>
                            {!isAdding && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setIsAdding(true)}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', borderRadius: '50px' }}
                                >
                                    <Plus size={20} /> Add Item
                                </button>
                            )}
                        </div>

                        {/* Add Item Form - Inline */}
                        {isAdding && (
                            <div className="card animate-fade-in" style={{ marginBottom: '2rem', border: '2px solid #0F766E', backgroundColor: '#F0FDFA', padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <h3 style={{ margin: 0, color: '#0F766E', fontSize: '1.4rem' }}>New Product Entry</h3>
                                    <button onClick={() => setIsAdding(false)} style={{ background: 'transparent', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '1.5rem' }}>&times;</button>
                                </div>

                                <form onSubmit={handleAddItem} style={{ display: 'grid', gap: '1.5rem' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1.5rem' }}>
                                        <div className="input-group" style={{ marginBottom: 0 }}>
                                            <label style={{ color: '#374151', fontSize: '0.9rem' }}>Item Name</label>
                                            <input
                                                type="text"
                                                className="input-control"
                                                styles={{ backgroundColor: 'white' }}
                                                placeholder="e.g. Fresh Tomatoes"
                                                value={newItem.name}
                                                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="input-group" style={{ marginBottom: 0 }}>
                                            <label style={{ color: '#374151', fontSize: '0.9rem' }}>Price (₹)</label>
                                            <input
                                                type="number"
                                                className="input-control"
                                                styles={{ backgroundColor: 'white' }}
                                                placeholder="0.00"
                                                value={newItem.price}
                                                onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="input-group" style={{ marginBottom: 0 }}>
                                            <label style={{ color: '#374151', fontSize: '0.9rem' }}>Unit</label>
                                            <select
                                                className="input-control"
                                                styles={{ backgroundColor: 'white' }}
                                                value={newItem.unit}
                                                onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                                            >
                                                <option value="kg">Per kg</option>
                                                <option value="pc">Per piece</option>
                                                <option value="packet">Per pkt</option>
                                                <option value="dozen">Per doz</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 2rem' }}>Add to Inventory</button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {items.length === 0 && !isAdding ? (
                            <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'white', borderRadius: '16px', border: '2px dashed #E5E7EB' }}>
                                <Package size={48} color="#D1D5DB" style={{ marginBottom: '1rem' }} />
                                <h3 style={{ color: '#9CA3AF', fontWeight: '500' }}>Your inventory is empty</h3>
                                <p style={{ color: '#D1D5DB' }}>Start adding items to sell</p>
                                <button onClick={() => setIsAdding(true)} style={{ marginTop: '1rem', color: '#0F766E', background: 'transparent', border: 'none', fontWeight: '600', cursor: 'pointer' }}>+ Add First Item</button>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                {items.map(item => (
                                    <div key={item.id} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #F3F4F6', transition: 'transform 0.2s', cursor: 'pointer' }}
                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        <div style={{ height: '180px', backgroundColor: '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '100px', objectFit: 'contain' }} />
                                            <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                                                <span style={{ backgroundColor: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', color: '#1F2937', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                                    {item.unit}
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{ padding: '1.2rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                                <h4 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#1F2937', margin: 0, maxWidth: '70%' }}>{item.name}</h4>
                                                <p style={{ color: '#0F766E', fontWeight: '700', fontSize: '1.1rem', margin: 0 }}>₹{item.price}</p>
                                            </div>

                                            <div style={{ borderTop: '1px solid #F3F4F6', marginTop: '1rem', paddingTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                                                <button className="btn" style={{ flex: 1, padding: '0.5rem', fontSize: '0.9rem', backgroundColor: '#F3F4F6', color: '#4B5563', border: 'none' }}>
                                                    Edit
                                                </button>
                                                <button className="btn" style={{ flex: 1, padding: '0.5rem', fontSize: '0.9rem', backgroundColor: '#FEF2F2', color: '#EF4444', border: 'none' }}>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Insights Sidebar (Future Proofing) - Hidden on small screens if needed, or simple stats */}
                    <div style={{ flex: '1', minWidth: '280px' }}>
                        <div className="card" style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', position: 'sticky', top: '120px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: '#111827' }}>Quick Actions</h3>
                            <button className="btn" style={{ width: '100%', marginBottom: '1rem', justifyContent: 'flex-start', backgroundColor: '#F0FDFA', color: '#0F766E', border: '1px solid #CCFBF1' }}>
                                Promote Shop
                            </button>
                            <button className="btn" style={{ width: '100%', marginBottom: '1rem', justifyContent: 'flex-start', backgroundColor: '#FFF7ED', color: '#C2410C', border: '1px solid #FFEDD5' }}>
                                Close Shop Temporarily
                            </button>

                            <div style={{ marginTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#111827' }}>Shop Stats</h3>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: '#6B7280' }}>
                                    <span>Total Items</span>
                                    <span style={{ fontWeight: '700', color: '#111827' }}>{items.length}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', color: '#6B7280' }}>
                                    <span>Views today</span>
                                    <span style={{ fontWeight: '700', color: '#111827' }}>24</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default OwnerShopView;
