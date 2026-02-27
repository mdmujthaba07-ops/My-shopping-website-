import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Heart, Search, Menu, X, Trash2, Plus, Minus, Moon, Sun } from 'lucide-react';
import { CartItem } from '../hooks/useCart';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSearch: (term: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onSearch, isDarkMode, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3 glass-dark' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left: Menu & Search */}
        <div className="flex items-center gap-6">
          <button className="p-2 hover:text-neon-green transition-colors lg:hidden">
            <Menu className="w-6 h-6" />
          </button>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            <a href="#" className="hover:text-neon-green transition-colors">Men</a>
            <a href="#" className="hover:text-neon-green transition-colors">Women</a>
            <a href="#" className="hover:text-neon-green transition-colors">Streetwear</a>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <a href="/" className="flex flex-col items-center">
            <span className="font-display text-2xl font-black tracking-tighter text-white">URBAN<span className="text-neon-green">VIBE</span></span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-zinc-500 font-bold -mt-1">Fashion House</span>
          </a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  type="text"
                  placeholder="Search gear..."
                  onChange={(e) => onSearch(e.target.value)}
                  className="bg-zinc-900/50 border border-white/10 rounded-full px-4 py-1.5 text-sm focus:outline-none focus:border-neon-green mr-2"
                />
              )}
            </AnimatePresence>
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:text-neon-green transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
          
          <button onClick={onToggleTheme} className="p-2 hover:text-neon-green transition-colors">
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <button className="p-2 hover:text-neon-green transition-colors hidden sm:block">
            <Heart className="w-5 h-5" />
          </button>

          <button 
            onClick={onOpenCart}
            className="relative p-2 hover:text-neon-green transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-neon-green text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (id: string, size: string, color: string, delta: number) => void;
  onRemove: (id: string, size: string, color: string) => void;
  total: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onUpdateQty, onRemove, total }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-zinc-950 border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            <div className="p-6 border-bottom border-white/10 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold uppercase tracking-widest">Your Bag ({cart.length})</h2>
              <button onClick={onClose} className="p-2 hover:rotate-90 transition-transform">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 gap-4">
                  <ShoppingBag className="w-16 h-16 opacity-20" />
                  <p className="text-sm uppercase tracking-widest">Your bag is empty</p>
                  <button onClick={onClose} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-neon-green transition-colors">Start Shopping</button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 group">
                    <div className="w-24 h-32 rounded-xl overflow-hidden bg-zinc-900 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-sm leading-tight group-hover:text-neon-green transition-colors">{item.name}</h3>
                          <button onClick={() => onRemove(item.id, item.selectedSize, item.selectedColor)} className="text-zinc-500 hover:text-neon-pink transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-zinc-500 mt-1 uppercase tracking-tighter">Size: {item.selectedSize} | Color: {item.selectedColor}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-zinc-900 rounded-full px-3 py-1">
                          <button onClick={() => onUpdateQty(item.id, item.selectedSize, item.selectedColor, -1)} className="hover:text-neon-green"><Minus className="w-3 h-3" /></button>
                          <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button onClick={() => onUpdateQty(item.id, item.selectedSize, item.selectedColor, 1)} className="hover:text-neon-green"><Plus className="w-3 h-3" /></button>
                        </div>
                        <span className="font-bold text-neon-green">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-zinc-900/50 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Subtotal</span>
                  <span className="font-bold">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Shipping</span>
                  <span className="text-neon-green font-bold uppercase tracking-widest text-[10px]">Free</span>
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <span className="font-display text-lg font-bold">Total</span>
                  <span className="font-display text-2xl font-black text-neon-green">${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-neon-green text-black font-black uppercase tracking-[0.2em] rounded-xl hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all active:scale-95">
                  Checkout Now
                </button>
                <div className="flex items-center gap-2 bg-black/40 rounded-lg p-3 border border-white/5">
                   <input type="text" placeholder="Coupon Code" className="bg-transparent text-xs flex-1 outline-none" />
                   <button className="text-xs font-bold text-neon-green">Apply</button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
