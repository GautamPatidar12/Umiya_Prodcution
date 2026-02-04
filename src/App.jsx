import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Filter, Search, Phone, Instagram, ChevronRight, X, Heart, Tag } from 'lucide-react';

// Categories for filtering
const CATEGORIES = ["All", "Murti", "Clothes", "Chowki (Sagwan and Babool)", "Rath", "Jwellery", "Other"];

// Product data with originalPrice for the "cut-price" effect
const INITIAL_PRODUCTS = [
  { id: 1, name: "Blue-White", price: 7000, originalPrice: 7500, category: "Rath", image: "Blue-White.jpg", description: "Hand-carved wooden murtis with intricate gold work." },
  { id: 2, name: "Red-Green", price: 7500, originalPrice: 8000, category: "Rath", image: "Red-Green.jpg", description: "Traditional Rajasthani silk attire with gotta patti." },
  { id: 3, name: "Pure Blue", price: 13999, originalPrice: 15000, category: "Rath", image: "Pure-Blue.jpg", description: "Sturdy wooden bajot with traditional floral motifs." },
  { id: 4, name: "Red-Yellow", price: 12999, originalPrice: 14000, category: "Rath", image: "Red-Yellow.jpg", description: "Miniature royal carriage for the Gangaur procession." },
  { id: 5, name: "Dark-Red", price: 12999, originalPrice: 14000, category: "Rath", image: "Dark-Red.png", description: "Elegant ornaments including Nath and Bindi." },
  { id: 6, name: "Orange-Set", price: 13999, originalPrice: 15000, category: "Rath", image: "Orange-Set.png", description: "Lightweight clay murtis for easy handling during festivals." },
  { id: 7, name: "North-East", price: 14999, originalPrice: 17000, category: "Rath", image: "North-East.png", description: "Exquisite carved bajot for major rituals." },
  { id: 8, name: "Adivasi", price: 12999, originalPrice: 14000, category: "Rath", image: "Adivasi.png", description: "Bright colored bandhani dupattas for Gangaur." },
  { id: 9, name: "Green-Red", price: 7500, originalPrice: 8000, category: "Rath", image: "Green-Red.png", description: "Bright colored bandhani dupattas for Gangaur." },
  { id: 10, name: "Green-Yellow", price: 7500, originalPrice: 8000, category: "Rath", image: "Green-Yellow.png", description: "Bright colored bandhani dupattas for Gangaur." },
  { id: 11, name: "Purple-White", price: 7000, originalPrice: 7500, category: "Rath", image: "Purple-White.png", description: "Bright colored bandhani dupattas for Gangaur." },
  { id: 12, name: "RedWhite", price: 7500, originalPrice: 8000, category: "Rath", image: "RedWhite.png", description: "Bright colored bandhani dupattas for Gangaur." },
  { id: 13, name: "Pink-Yellow", price: 7000, originalPrice: 7500, category: "Rath", image: "Pink-Yellow.png", description: "Bright colored bandhani dupattas for Gangaur." },
];

export default function App() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Shuffle logic on mount to randomize positions
  useEffect(() => {
    const shuffleArray = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };
    setProducts(shuffleArray(INITIAL_PRODUCTS));
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, products]);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const handleWhatsAppOrder = (product) => {
    const discount = (product.originalPrice || product.price) - product.price;
    const message = `Hello, I'm interested in: ${product.name}, ProductID=${product.id}. I saw the discounted price of ₹${product.price} (Saved ₹${discount}). Is it available?`;
    window.open(`https://wa.me/916263466588?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getDiscountPercent = (current, original) => {
    if (!original) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  return (
    // 'w-full' and 'text-left' ensure Vite/App.css defaults don't break the layout
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 text-left">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 shrink-0">
            {/*<div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">U</div>*/}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src="Profile.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-orange-600 hidden sm:block">UMIYA PRODUCTION</h1>
          </div>

          <div className="flex-1 max-w-md mx-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search items..."
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <div className="relative cursor-pointer hover:scale-105 transition-transform">
              <Heart className={`w-6 h-6 ${favorites.length > 0 ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </div>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors flex items-center gap-2 shadow-sm">
              <Phone className="w-4 h-4" /> <span className="hidden sm:inline">Contact</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full py-16 px-4 text-center bg-white overflow-hidden">
        {/* Banner Grid Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none select-none">
          <div className="grid grid-cols-6 gap-4 rotate-12 -translate-y-20">
            {[...INITIAL_PRODUCTS, ...INITIAL_PRODUCTS].map((p, i) => (
              <img key={i} src={p.image} className="w-full aspect-square object-cover rounded-xl" alt="" />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-700 rounded-full text-xs font-bold mb-6 border border-orange-100 shadow-sm">
            <Tag className="w-3.5 h-3.5" /> Special Festival Discounts Live!
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Divine Gangaur <span className="text-orange-600">Murtis</span> & Accessories
          </h2>
          <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
            Experience the heritage of Rajasthan with our hand-crafted Isar-Gangaur collection. Fine details, authentic designs, and timeless quality from the heart of Jaipur.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${selectedCategory === cat
                  ? "bg-orange-600 text-white shadow-orange-200"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-10">
          <h3 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
            <Filter className="w-5 h-5 text-orange-600" />
            {selectedCategory} Collection
            <span className="text-sm font-normal text-slate-400 ml-2">({filteredProducts.length} items)</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                />
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-orange-600 shadow-sm border border-orange-50">
                    {product.category}
                  </div>
                  {product.originalPrice && (
                    <div className="bg-red-600 text-white px-2 py-1 rounded-md text-[10px] font-bold shadow-sm">
                      {getDiscountPercent(product.price, product.originalPrice)}% OFF
                    </div>
                  )}
                </div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full shadow-md hover:scale-110 transition-transform z-10"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
                </button>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h4 className="font-bold text-lg mb-1 truncate group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h4>
                <p className="text-slate-500 text-xs mb-4 line-clamp-1">{product.description}</p>
                <div className="flex items-end justify-between mt-auto">
                  <div className="flex flex-col">
                    {product.originalPrice && (
                      <span className="text-xs text-slate-400 line-through decoration-red-400/50">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-xl font-black text-slate-900">₹{product.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => handleWhatsAppOrder(product)}
                    className="bg-slate-900 text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-orange-600 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="w-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400">No products found in this category.</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-slate-900 text-white py-16 px-4 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6 text-left">
              <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="Profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h5 className="text-2xl font-bold tracking-tight">UMIYA PRODUCTION</h5>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-md text-left">
              Dedicated to preserving the beauty and spiritual essence of Rajasthani culture through authentic handcrafted Isar-Gangaur Murtis and ritual accessories. Handcrafted in Jaipur, delivered to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2.5 bg-slate-800 rounded-xl hover:bg-orange-600 transition-all hover:-translate-y-1 shadow-lg shadow-black/20"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2.5 bg-slate-800 rounded-xl hover:bg-orange-600 transition-all hover:-translate-y-1 shadow-lg shadow-black/20"><Phone className="w-5 h-5" /></a>
            </div>
          </div>
          <div className="text-left">
            <h5 className="text-lg font-bold mb-6 text-orange-500">Quick Links</h5>
            <ul className="space-y-4 text-slate-400">
              {CATEGORIES.slice(1, 6).map(c => (
                <li key={c} className="hover:text-white cursor-pointer flex items-center gap-2 group transition-colors">
                  <ChevronRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" /> {c} Collection
                </li>
              ))}
            </ul>
          </div>
          <div className="text-left">
            <h5 className="text-lg font-bold mb-6 text-orange-500">Contact Details</h5>
            <p className="text-slate-400 mb-6">For bulk orders, customization, or visiting our workshop:</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-600 mt-1" />
                <div>
                  <span className="font-bold text-white block">+91 6263466588,+91 6266757803</span>
                  <span className="text-xs text-slate-500">Available 9 AM - 8 PM</span>
                </div>
              </div>
              <p className="text-sm text-slate-400 border-l-2 border-orange-600 pl-4">
                Dahiwar (in front of sai mandir),<br /> Dhamnod 454552, Dhar(MP)
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm gap-4">
          <p>&copy; {new Date().getFullYear()} Gangaur Murti Business. All Rights Reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Shipping Info</span>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full z-10 text-slate-900 shadow-md transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
              <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto text-left">
                <span className="text-orange-600 text-xs font-black uppercase tracking-widest mb-2 block">{selectedProduct.category}</span>
                <h2 className="text-3xl font-black text-slate-900 mb-4">{selectedProduct.name}</h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  {selectedProduct.description} This exquisite piece is handcrafted by our master artisans, ensuring that every detail reflects the traditional aesthetic of Gangaur ritual.
                </p>

                <div className="bg-slate-50 p-6 rounded-2xl mb-8 flex items-center justify-between">
                  <div>
                    <span className="text-slate-400 text-sm block mb-1 font-medium">Special Exhibition Price</span>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-black text-slate-900">₹{selectedProduct.price.toLocaleString()}</span>
                      {selectedProduct.originalPrice && (
                        <span className="text-xl text-slate-400 line-through">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  {selectedProduct.originalPrice && (
                    <div className="bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full text-xs font-black shadow-sm">
                      SAVE {getDiscountPercent(selectedProduct.price, selectedProduct.originalPrice)}%
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleWhatsAppOrder(selectedProduct)}
                    className="col-span-2 bg-orange-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-orange-700 transition-all shadow-lg shadow-orange-100"
                  >
                    <Phone className="w-5 h-5" /> Buy on WhatsApp
                  </button>
                  <button
                    onClick={() => toggleFavorite(selectedProduct.id)}
                    className={`py-4 rounded-xl font-bold border transition-all ${favorites.includes(selectedProduct.id)
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                  >
                    {favorites.includes(selectedProduct.id) ? "Saved to Wishlist" : "Save for later"}
                  </button>
                  <button className="py-4 rounded-xl font-bold border border-slate-200 text-slate-600 hover:bg-slate-50">
                    Share Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}