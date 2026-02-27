import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Product } from '../data/products';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onQuickView, 
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className="relative group h-[450px] w-full rounded-2xl glass-dark overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(57,255,20,0.15)]"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {product.isNew && (
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-neon-green text-black rounded-full">New</span>
        )}
        {product.isSale && (
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-neon-pink text-white rounded-full">Sale</span>
        )}
      </div>

      {/* Wishlist Button */}
      <button 
        onClick={() => onToggleWishlist(product.id)}
        className="absolute top-4 right-4 z-20 p-2 rounded-full glass hover:bg-white/10 transition-colors"
      >
        <Heart className={`w-5 h-5 transition-colors ${isWishlisted ? 'fill-neon-pink stroke-neon-pink' : 'stroke-white'}`} />
      </button>

      {/* Image Container */}
      <div className="relative h-2/3 overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          style={{ transformStyle: "preserve-3d", translateZ: "20px" }}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onQuickView(product)}
            className="p-3 rounded-full bg-white text-black hover:bg-neon-green transition-colors"
          >
            <Eye className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onAddToCart(product, product.sizes[0], product.colors[0])}
            className="p-3 rounded-full bg-neon-green text-black hover:shadow-[0_0_15px_rgba(57,255,20,0.5)] transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between h-1/3" style={{ transformStyle: "preserve-3d", translateZ: "40px" }}>
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">{product.category}</p>
          <h3 className="font-display text-lg font-bold leading-tight group-hover:text-neon-green transition-colors">{product.name}</h3>
          <div className="flex items-center gap-1 mt-2">
            <Star className="w-3 h-3 fill-neon-green stroke-neon-green" />
            <span className="text-xs font-medium">{product.rating}</span>
          </div>
        </div>
        
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-zinc-500 line-through">${product.originalPrice}</span>
            )}
            <span className="text-xl font-bold text-white">${product.price}</span>
          </div>
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map(color => (
              <div 
                key={color} 
                className="w-3 h-3 rounded-full border border-white/20"
                style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
