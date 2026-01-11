import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, Star, Clock, MapPin, Filter, Store } from 'lucide-react';

import categoryVegetables from '../assets/category_vegetables.png';
import categoryFruits from '../assets/category_fruits.png';
import categorySnacks from '../assets/category_snacks.png';

const shopsData = [
    { id: 1, name: 'Green Valley Organics', rating: 4.8, time: '15-20 min', distance: '1.2 km', location: 'Connaught Place', pincode: '110001', image: categoryVegetables, tags: ['Fresh & Daily Essentials', 'Organic'] },
    { id: 2, name: 'Daily Fresh Mart', rating: 4.5, time: '20-30 min', distance: '2.5 km', location: 'Lajpat Nagar', pincode: '110024', image: categoryFruits, tags: ['Fresh & Daily Essentials', 'Packaged Food & Snacks'] },
    { id: 3, name: 'City Supermarket', rating: 4.3, time: '30-45 min', distance: '3.8 km', location: 'Saket', pincode: '110017', image: categorySnacks, tags: ['Packaged Food & Snacks', 'Home & Cleaning'] },
    { id: 4, name: 'Spices & More', rating: 4.9, time: '10-15 min', distance: '0.8 km', location: 'Karol Bagh', pincode: '110005', image: categoryVegetables, tags: ['Kitchen & Dining', 'Fresh & Daily Essentials'] },
    { id: 5, name: 'Mom\'s Bakery', rating: 4.7, time: '25-30 min', distance: '2.0 km', location: 'Hauz Khas', pincode: '110016', image: categorySnacks, tags: ['Packaged Food & Snacks'] },
    { id: 6, name: 'Healthy Choice', rating: 4.6, time: '15-25 min', distance: '1.5 km', location: 'Vasant Vihar', pincode: '110057', image: categoryFruits, tags: ['Fresh & Daily Essentials', 'Personal & Baby Care'] },
    { id: 7, name: 'Fashion Hub', rating: 4.4, time: '30-40 min', distance: '4.2 km', location: 'Rajouri Garden', pincode: '110027', image: categorySnacks, tags: ['Fashion & Lifestyle'] },
    { id: 8, name: 'Clean Home Depot', rating: 4.5, time: '20-25 min', distance: '2.1 km', location: 'Dwarka', pincode: '110075', image: categoryVegetables, tags: ['Home & Cleaning'] },
];

const categories = [
    'All',
    'Fresh & Daily Essentials',
    'Packaged Food & Snacks',
    'Personal & Baby Care',
    'Home & Cleaning',
    'Kitchen & Dining',
    'Fashion & Lifestyle'
];

import api from '../api/axios';

const Shops = () => {
    const navigate = useNavigate();
    const [shops, setShops] = useState(shopsData); 
    const [searchName, setSearchName] = useState('');
    const [searchLocation, setSearchLocation] = useState('');
    const [searchPincode, setSearchPincode] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const { data: apiShops } = await api.get('/shops');

                const processedApiShops = apiShops.map(shop => {
                    let shopImage = categoryVegetables;
                    if (shop.imageCategory === 'Fresh & Daily Essentials') shopImage = categoryVegetables;
                    else if (shop.imageCategory === 'Packaged Food & Snacks') shopImage = categorySnacks;
                    else if (shop.imageCategory === 'Personal & Baby Care' || shop.category === 'Personal & Baby Care') shopImage = categoryFruits;
                    else if (shop.imageCategory === 'Fashion & Lifestyle') shopImage = categorySnacks; 

                    return {
                        ...shop,
                        id: shop._id,
                        image: shopImage,
                        tags: shop.tags && shop.tags.length > 0 ? shop.tags : [shop.category]
                    };
                });

                setShops([...shopsData, ...processedApiShops]);
            } catch (error) {
                console.error("Error fetching shops", error);
            }
        };

        fetchShops();
    }, []);

    const filteredShops = shops.filter(shop => {
        const matchesName = shop.name.toLowerCase().includes(searchName.toLowerCase());
        const matchesLocation = shop.location.toLowerCase().includes(searchLocation.toLowerCase());
        const matchesPincode = shop.pincode.toLowerCase().includes(searchPincode.toLowerCase()); // Safe lower case
        const matchesCategory = selectedCategory === 'All' || (shop.tags && shop.tags.includes(selectedCategory));

        return matchesName && matchesLocation && matchesPincode && matchesCategory;
    });

    return (
        <div className="page-container" style={{ backgroundColor: '#FAFAF9' }}>
            <Navbar />

          
            <section style={{ paddingTop: '100px', paddingBottom: '2rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
                <div className="container" style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#1F2937', marginBottom: '1.5rem', textAlign: 'center' }}>Explore Local Shops</h1>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    
                            <div style={{ position: 'relative', flex: 1, minWidth: '100%' }}>
                                <MapPin size={20} color="#6B7280" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text"
                                    placeholder="Location (e.g. Connaught Place)"
                                    value={searchLocation}
                                    onChange={(e) => setSearchLocation(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1rem 1rem 3rem',
                                        borderRadius: '12px',
                                        border: '1px solid #E5E7EB',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                                    }}
                                />
                            </div>

                            
                            <div style={{ position: 'relative', flex: 1, minWidth: '140px' }}>
                                <MapPin size={20} color="#6B7280" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text"
                                    placeholder="Pincode"
                                    value={searchPincode}
                                    onChange={(e) => setSearchPincode(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1rem 1rem 3rem',
                                        borderRadius: '12px',
                                        border: '1px solid #E5E7EB',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                                    }}
                                />
                            </div>

                           
                            <div style={{ position: 'relative', flex: 1.5, minWidth: '160px' }}>
                                <Search size={20} color="#6B7280" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                                <input
                                    type="text"
                                    placeholder="Shop Name"
                                    value={searchName}
                                    onChange={(e) => setSearchName(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1rem 1rem 3rem',
                                        borderRadius: '12px',
                                        border: '1px solid #E5E7EB',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                                    }}
                                />
                            </div>
                        </div>

                        
                        <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    style={{
                                        padding: '0.5rem 1.2rem',
                                        borderRadius: '50px',
                                        border: selectedCategory === cat ? 'none' : '1px solid #E5E7EB',
                                        backgroundColor: selectedCategory === cat ? '#0F766E' : 'white',
                                        color: selectedCategory === cat ? 'white' : '#4B5563',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s',
                                        whiteSpace: 'nowrap'
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

           
            <section style={{ padding: '0 1rem 4rem 1rem', minHeight: '50vh' }}>
                <div className="container" style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>

                    {(!searchLocation && !searchPincode && !searchName) ? (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', color: '#6B7280' }}>
                            <MapPin size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#374151', marginBottom: '0.5rem' }}>Find Shops Near You</h2>
                            <p>Enter your location or pincode to see shops nearby.</p>
                        </div>
                    ) : (
                        filteredShops.length === 0 ? (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 1rem', color: '#6B7280' }}>
                                <p>No shops found matching your search.</p>
                            </div>
                        ) : (
                            filteredShops.map(shop => (
                                <div key={shop.id} style={{ backgroundColor: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #F3F4F6', transition: 'transform 0.2s', cursor: 'pointer' }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                                >
                                    <div style={{ height: '180px', backgroundColor: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                                        <div style={{ backgroundColor: 'white', borderRadius: '50%', padding: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                                            <Store size={48} color="#0F766E" strokeWidth={1.5} />
                                        </div>
                                    </div>

                                    <div style={{ padding: '1.5rem' }}>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1F2937', marginBottom: '0.5rem' }}>{shop.name}</h3>

                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem', color: '#6B7280', fontSize: '0.9rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <Clock size={16} />
                                                <span>{shop.time}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                                <MapPin size={16} />
                                                <span>{shop.distance}</span>
                                            </div>
                                        </div>

                                        <button
                                            className="btn"
                                            style={{ width: '100%', backgroundColor: '#0F766E', color: 'white', borderRadius: '12px', padding: '0.8rem' }}
                                            onClick={() => navigate(`/shop/${shop.id}`)}
                                        >
                                            Visit Shop
                                        </button>
                                    </div>
                                </div>
                            ))
                        )
                    )}

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Shops;
