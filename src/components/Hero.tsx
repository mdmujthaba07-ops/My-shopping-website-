import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Zap, Star, X, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../data/products';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-neon-green/20 mb-8"
          >
            <Zap className="w-4 h-4 text-neon-green fill-neon-green" />
            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-neon-green">New Season Drop</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.8] mb-8"
          >
            STREET <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-white to-neon-blue">CULTURE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light tracking-wide"
          >
            Elevate your urban aesthetic with our latest collection of premium technical streetwear. Designed for the bold, built for the city.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button className="group relative px-10 py-5 bg-neon-green text-black font-black uppercase tracking-widest rounded-xl overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(57,255,20,0.5)] active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Shop Collection <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-10 py-5 glass text-white font-black uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all active:scale-95">
              View Lookbook
            </button>
          </motion.div>
        </div>
      </div>

      {/* Hero 3D Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            y: [0, -20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-64 h-64 border border-neon-green/20 rounded-3xl blur-sm opacity-20"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            y: [0, 20, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 border border-neon-blue/20 rounded-full blur-sm opacity-20"
        />
      </div>
    </section>
  );
};

interface QuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export const QuickView: React.FC<QuickViewProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = React.useState('');
  const [selectedColor, setSelectedColor] = React.useState('');

  React.useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12"
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl glass-dark rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_100px_rgba(0,0,0,0.5)]"
        >
          <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 glass rounded-full hover:rotate-90 transition-transform">
            <X className="w-6 h-6" />
          </button>

          {/* Image Gallery */}
          <div className="w-full md:w-1/2 h-[400px] md:h-auto bg-zinc-900">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
            <div className="mb-6">
              <p className="text-xs text-neon-green uppercase font-bold tracking-[0.3em] mb-2">{product.category}</p>
              <h2 className="font-display text-3xl md:text-4xl font-black mb-4">{product.name}</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-neon-green stroke-neon-green' : 'stroke-zinc-700'}`} />
                  ))}
                  <span className="text-sm font-bold ml-2">{product.rating}</span>
                </div>
                <span className="text-zinc-500 text-sm">| 120+ Reviews</span>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-4xl font-black text-white">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-zinc-500 line-through">${product.originalPrice}</span>
                )}
              </div>
              <p className="text-zinc-400 leading-relaxed font-light">{product.description}</p>
            </div>

            <div className="space-y-6 mb-10">
              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs uppercase font-bold tracking-widest text-zinc-500">Select Size</span>
                  <button className="text-[10px] uppercase font-bold text-neon-green underline underline-offset-4">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[50px] h-12 rounded-lg border transition-all font-bold text-sm ${selectedSize === size ? 'bg-white text-black border-white' : 'border-white/10 hover:border-white/40'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div>
                <span className="block text-xs uppercase font-bold tracking-widest text-zinc-500 mb-3">Select Color</span>
                <div className="flex gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all p-1 ${selectedColor === color ? 'border-neon-green' : 'border-transparent'}`}
                    >
                      <div 
                        className="w-full h-full rounded-full" 
                        style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                        title={color}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto flex gap-4">
              <button 
                onClick={() => onAddToCart(product, selectedSize, selectedColor)}
                className="flex-1 py-5 bg-neon-green text-black font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(57,255,20,0.4)] transition-all active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Bag
              </button>
              <button className="p-5 glass rounded-xl hover:bg-white/10 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
