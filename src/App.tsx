import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ThreeBackground } from './components/ThreeBackground';
import { Navbar, CartDrawer } from './components/Navbar';
import { Hero, QuickView } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { products, Product } from './data/products';
import { useCart } from './hooks/useCart';
import { ChevronUp, Instagram, Twitter, Facebook, Youtube, Timer, Filter } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { cart, wishlist, addToCart, removeFromCart, updateQuantity, toggleWishlist, cartTotal, cartCount } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const categories = ['All', 'Men', 'Women', 'Streetwear', 'Accessories'];

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[200] bg-zinc-950 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-24 h-24 border-4 border-white/5 rounded-full" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-24 h-24 border-4 border-t-neon-green border-r-transparent border-b-transparent border-l-transparent rounded-full"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <h2 className="font-display text-2xl font-black tracking-tighter">URBAN<span className="text-neon-green">VIBE</span></h2>
          <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mt-1">Initializing Style...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen selection:bg-neon-green selection:text-black ${isDarkMode ? 'dark' : ''}`}>
      <ThreeBackground />
      
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onSearch={setSearchQuery}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <main>
        <Hero />

        {/* Flash Sale Banner */}
        <div className="bg-neon-green py-3 overflow-hidden whitespace-nowrap relative z-10">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 items-center"
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 text-black font-black uppercase tracking-widest text-sm italic">
                <Timer className="w-5 h-5" /> FLASH SALE ENDING SOON — 40% OFF SELECT ITEMS — USE CODE: URBAN40
              </div>
            ))}
          </motion.div>
        </div>

        {/* Product Section */}
        <section className="py-24 container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-display text-5xl font-black tracking-tighter mb-4">LATEST <span className="text-neon-green">DROPS</span></h2>
                <p className="text-zinc-500 max-w-md">Our newest arrivals, curated for the modern streetwear enthusiast. Limited quantities available.</p>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all border ${activeCategory === cat ? 'bg-white text-black border-white' : 'glass border-white/10 hover:border-white/40'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard 
                    product={product} 
                    onQuickView={setSelectedProduct}
                    onAddToCart={(p, s, c) => {
                      addToCart(p, s, c);
                      setIsCartOpen(true);
                    }}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={toggleWishlist}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-zinc-500 uppercase tracking-widest">No products found matching your search.</p>
            </div>
          )}
        </section>

        {/* Review Slider Placeholder */}
        <section className="py-24 bg-zinc-900/30 border-y border-white/5 relative z-10">
          <div className="container mx-auto px-6">
            <h3 className="font-display text-center text-3xl font-black tracking-tighter mb-16">WHAT THE <span className="text-neon-green">COMMUNITY</span> SAYS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Alex R.", text: "The quality of the Cyberpunk Hoodie is insane. Best streetwear purchase this year.", rating: 5 },
                { name: "Sarah K.", text: "Fast shipping and the fit is perfect. The tech cargo pants are my new daily drivers.", rating: 5 },
                { name: "Marcus T.", text: "UrbanVibe is the only brand doing it right. Premium materials and sick designs.", rating: 4 }
              ].map((review, i) => (
                <div key={i} className="glass p-8 rounded-2xl">
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, j) => <div key={j} className="w-3 h-3 bg-neon-green rounded-full" />)}
                  </div>
                  <p className="text-zinc-400 italic mb-6">"{review.text}"</p>
                  <p className="font-bold uppercase tracking-widest text-xs">— {review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="pt-24 pb-12 bg-black border-t border-white/5 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <a href="/" className="font-display text-3xl font-black tracking-tighter text-white mb-6 block">URBAN<span className="text-neon-green">VIBE</span></a>
              <p className="text-zinc-500 max-w-sm mb-8 leading-relaxed">
                We are more than a brand. We are a movement. UrbanVibe Fashion brings you the best in technical streetwear and urban aesthetics.
              </p>
              <div className="flex gap-4">
                {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="p-3 glass rounded-xl hover:text-neon-green transition-colors">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Shop</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sale Items</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Collections</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs mb-8">Support</h4>
              <ul className="space-y-4 text-sm text-zinc-500">
                <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-600">
            <p>© 2026 URBANVIBE FASHION HOUSE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Overlays */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onUpdateQty={updateQuantity}
        onRemove={removeFromCart}
        total={cartTotal}
      />

      <QuickView 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={(p, s, c) => {
          addToCart(p, s, c);
          setSelectedProduct(null);
          setIsCartOpen(true);
        }}
      />

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 p-4 bg-neon-green text-black rounded-xl shadow-2xl hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cursor Glow */}
      <div className="fixed inset-0 pointer-events-none z-[300] hidden lg:block">
        <div 
          className="absolute w-[400px] h-[400px] bg-neon-green/5 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ 
            left: 'var(--mouse-x, 0)', 
            top: 'var(--mouse-y, 0)' 
          }}
        />
      </div>
    </div>
  );
}
