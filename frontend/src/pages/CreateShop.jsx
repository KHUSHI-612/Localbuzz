import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, MapPin, Hash, Check, ArrowRight } from 'lucide-react';

const categories = [
    'Fresh & Daily Essentials',
    'Packaged Food & Snacks',
    'Personal & Baby Care',
    'Home & Cleaning',
    'Kitchen & Dining',
    'Fashion & Lifestyle'
];

import api from '../api/axios';

const CreateShop = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        shopName: '',
        location: '',
        pincode: '',
        category: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (!email) {
            navigate('/login');
            return;
        }
        setUserEmail(email);

        const fetchShop = async () => {
            try {
                const { data } = await api.get('/shops/my-shop');
                if (data) {
                    setFormData({
                        shopName: data.name || '',
                        location: data.location || '',
                        pincode: data.pincode || '',
                        category: data.category || ''
                    });
                    setIsEditing(true);
                }
            } catch (error) {
              
                console.log("No existing shop to edit.");
            }
        };
        fetchShop();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.shopName,
            location: formData.location,
            pincode: formData.pincode,
            category: formData.category,
            imageCategory: formData.category
        };

        try {
            if (isEditing) {
                await api.put('/shops', payload);
            } else {
                await api.post('/shops', payload);
            }
            navigate('/my-shop');
        } catch (error) {
            console.error("Error saving shop:", error.response?.data?.message || error.message);
            alert("Failed to save shop. Please try again.");
        }
    };

    return (
        <div className="page-container" style={{ backgroundColor: '#F0F9FF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          
            <nav style={{ padding: '1.5rem 2rem', backgroundColor: 'transparent' }}>
                <div className="container">
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0F766E', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        LocalBuzz <span style={{ color: '#F59E0B' }}>Partner</span>
                    </h1>
                </div>
            </nav>

            <div className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                <div className="card animate-fade-in" style={{ maxWidth: '800px', width: '100%', padding: '3rem', borderRadius: '24px', backgroundColor: 'white', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>

                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#111827', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-0.025em' }}>
                            {isEditing ? 'Update Your ' : 'Launch Your '}<span className="title-gradient">Digital Store</span>
                        </h2>
                        <p style={{ color: '#6B7280', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
                            {isEditing ? 'Make changes to your shop details below.' : 'Join thousands of local businesses growing with LocalBuzz. Set up your shop in minutes.'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div style={{ display: 'grid', gap: '2rem' }}>
                     
                            <div className="input-group" style={{ marginBottom: 0 }}>
                                <label style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Shop Name</label>
                                <div style={{ position: 'relative' }}>
                                    <Store size={22} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                    <input
                                        type="text"
                                        placeholder="e.g. Sharma General Store"
                                        style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                                        required
                                        value={formData.shopName}
                                        onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                                        onFocus={(e) => e.target.style.borderColor = '#0F766E'}
                                        onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Location</label>
                                    <div style={{ position: 'relative' }}>
                                        <MapPin size={22} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input
                                            type="text"
                                            placeholder="e.g. Connaught Place"
                                            style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                                            required
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            onFocus={(e) => e.target.style.borderColor = '#0F766E'}
                                            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                                        />
                                    </div>
                                </div>

                          
                                <div className="input-group" style={{ marginBottom: 0 }}>
                                    <label style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Pincode</label>
                                    <div style={{ position: 'relative' }}>
                                        <Hash size={22} color="#9CA3AF" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
                                        <input
                                            type="text"
                                            placeholder="e.g. 110001"
                                            style={{ width: '100%', padding: '1rem 1rem 1rem 3.5rem', borderRadius: '12px', border: '1px solid #D1D5DB', fontSize: '1rem', outline: 'none', transition: 'border-color 0.2s' }}
                                            required
                                            value={formData.pincode}
                                            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                                            onFocus={(e) => e.target.style.borderColor = '#0F766E'}
                                            onBlur={(e) => e.target.style.borderColor = '#D1D5DB'}
                                        />
                                    </div>
                                </div>
                            </div>

               
                            <div className="input-group" style={{ marginBottom: 0 }}>
                                <label style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '1rem', display: 'block' }}>Select Shop Category</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                                    {categories.map(cat => (
                                        <div
                                            key={cat}
                                            onClick={() => setFormData({ ...formData, category: cat })}
                                            style={{
                                                border: formData.category === cat ? '2px solid #0F766E' : '1px solid #E5E7EB',
                                                borderRadius: '12px',
                                                padding: '1rem',
                                                cursor: 'pointer',
                                                backgroundColor: formData.category === cat ? '#F0FDFA' : 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                transition: 'all 0.2s',
                                                boxShadow: formData.category === cat ? '0 4px 6px -1px rgba(15, 118, 110, 0.1)' : 'none'
                                            }}
                                        >
                                            <span style={{ fontSize: '0.95rem', fontWeight: '600', color: formData.category === cat ? '#0F766E' : '#4B5563' }}>{cat}</span>
                                            {formData.category === cat && (
                                                <div style={{ backgroundColor: '#0F766E', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                                                    <Check size={12} color="white" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                marginTop: '3rem',
                                padding: '1.2rem',
                                fontSize: '1.2rem',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                backgroundColor: formData.category ? '#0F766E' : '#9CA3AF',
                                cursor: formData.category ? 'pointer' : 'not-allowed'
                            }}
                            disabled={!formData.category}
                        >
                            Launch My Shop <ArrowRight size={20} />
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateShop;
