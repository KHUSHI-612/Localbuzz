import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingBasket, Package, Baby, Sparkles, Utensils, Shirt } from 'lucide-react';

import homeIllustration from '../assets/home_illustration.png';
import categoryVegetables from '../assets/category_vegetables.png';
import categoryFruits from '../assets/category_fruits.png';
import categorySnacks from '../assets/category_snacks.png';

const CustomerHome = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email) setUserEmail(email);
    }, []);

    return (
        <div className="page-container">
            <Navbar />


            <section className="hero-section" style={{ margin: '20px 2rem 2rem 2rem', borderRadius: '30px', width: 'auto', padding: '0', backgroundColor: 'var(--primary)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
                <div className="container" style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4rem' }}>
                    <div style={{ flex: 1, textAlign: 'left', padding: '3rem 0' }}>
                        <h1 className="hero-tagline" style={{ color: 'white', fontSize: '3.5rem', lineHeight: '1.1', fontWeight: '700', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                            Your local market, <br />
                            online.
                        </h1>
                        <button
                            className="btn"
                            style={{
                                marginTop: '0.5rem',
                                fontSize: '1.1rem',
                                padding: '0.8rem 2rem',
                                backgroundColor: 'white',
                                color: 'var(--primary)',
                                fontWeight: '700',
                                borderRadius: '8px',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                            onClick={() => navigate('/shops')}
                        >
                            Start Shopping
                        </button>
                    </div>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
                        <img
                            src={homeIllustration}
                            alt="Groceries"
                            style={{ maxWidth: '100%', height: 'auto', maxHeight: '420px', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))', marginRight: '-20px' }}
                        />
                    </div>
                </div>
            </section>


            <section className="categories-section" style={{ padding: '0 2rem 4rem 2rem' }}>
                <div className="container category-grid" style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>

                    <div className="category-card" style={{ backgroundColor: '#F5E6CC', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: '220px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ flex: 1, zIndex: 1 }}>
                            <h3 style={{ fontSize: '1.8rem', color: '#1F2937', marginBottom: '1.5rem', fontWeight: '800', lineHeight: '1.2' }}>Fresh<br />Vegetables</h3>
                            <button className="btn" style={{ padding: '0.6rem 1.8rem', border: '1px solid #1F2937', background: 'transparent', borderRadius: '50px', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => navigate('/shops')}>Buy Now</button>
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '-10px', bottom: '-10px' }}>
                            <img src={categoryVegetables} alt="Fresh Vegetables" style={{ width: '180px', height: 'auto', objectFit: 'contain' }} />
                        </div>
                    </div>

                    <div className="category-card" style={{ backgroundColor: '#E8F5E9', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: '220px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ flex: 1, zIndex: 1 }}>
                            <h3 style={{ fontSize: '1.8rem', color: '#1F2937', marginBottom: '1.5rem', fontWeight: '800', lineHeight: '1.2' }}>Fresh<br />Fruits</h3>
                            <button className="btn" style={{ padding: '0.6rem 1.8rem', border: '1px solid #1F2937', background: 'transparent', borderRadius: '50px', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => navigate('/shops')}>Buy Now</button>
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0', bottom: '0' }}>
                            <img src={categoryFruits} alt="Fresh Fruits" style={{ width: '180px', height: 'auto', objectFit: 'contain' }} />
                        </div>
                    </div>

                    <div className="category-card" style={{ backgroundColor: '#E1F5FE', borderRadius: '24px', padding: '2rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: '220px', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ flex: 1, zIndex: 1 }}>
                            <h3 style={{ fontSize: '1.8rem', color: '#1F2937', marginBottom: '1.5rem', fontWeight: '800', lineHeight: '1.2' }}>Crunchy<br />Snacks</h3>
                            <button className="btn" style={{ padding: '0.6rem 1.8rem', border: '1px solid #1F2937', background: 'transparent', borderRadius: '50px', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' }} onClick={() => navigate('/shops')}>Buy Now</button>
                        </div>
                        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '10px', bottom: '10px' }}>
                            <img src={categorySnacks} alt="Crunchy Snacks" style={{ width: '160px', height: 'auto', objectFit: 'contain' }} />
                        </div>
                    </div>

                </div>
            </section>


            <section className="browse-category-section" style={{ padding: '0 2rem 4rem 2rem' }}>
                <div className="container" style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '2rem', color: '#1F2937', fontWeight: '700', margin: 0 }}>Browse by Category</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1.5rem', overflowX: 'auto' }}>
                        {[
                            { name: 'Fresh & Daily Essentials', icon: <ShoppingBasket size={32} strokeWidth={1.5} color="#10B981" /> },
                            { name: 'Packaged Food & Snacks', icon: <Package size={32} strokeWidth={1.5} color="#F59E0B" /> },
                            { name: 'Personal & Baby Care', icon: <Baby size={32} strokeWidth={1.5} color="#FB7185" /> },
                            { name: 'Home & Cleaning', icon: <Sparkles size={32} strokeWidth={1.5} color="#3B82F6" /> },
                            { name: 'Kitchen & Dining', icon: <Utensils size={32} strokeWidth={1.5} color="#8B5CF6" /> },
                            { name: 'Fashion & Lifestyle', icon: <Shirt size={32} strokeWidth={1.5} color="#EC4899" /> }
                        ].map((category, index) => (
                            <div
                                key={index}
                                onClick={() => navigate('/shops')}
                                className="category-item-card"
                                style={{
                                    backgroundColor: '#F9FAFB',
                                    borderRadius: '12px',
                                    padding: '1.5rem 0.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    border: '1px solid #E5E7EB',
                                    transition: 'all 0.3s ease',
                                    minWidth: '140px'
                                }}
                            >
                                <div style={{ marginBottom: '1rem', backgroundColor: '#E0F2F1', padding: '0.8rem', borderRadius: '50%' }}>
                                    {category.icon}
                                </div>
                                <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#374151', textAlign: 'center', margin: 0, lineHeight: '1.3' }}>{category.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CustomerHome;
