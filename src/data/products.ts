export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Men' | 'Women' | 'Streetwear' | 'Accessories';
  image: string;
  rating: number;
  sizes: string[];
  colors: string[];
  description: string;
  isNew?: boolean;
  isSale?: boolean;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Cyberpunk Oversized Hoodie',
    price: 89.99,
    originalPrice: 120.00,
    category: 'Streetwear',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Neon Green', 'Slate'],
    description: 'Premium heavyweight cotton hoodie with reflective cyberpunk graphics. Designed for the urban explorer.',
    isSale: true
  },
  {
    id: '2',
    name: 'Urban Tech Cargo Pants',
    price: 110.00,
    category: 'Streetwear',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
    rating: 4.5,
    sizes: ['30', '32', '34', '36'],
    colors: ['Olive', 'Black'],
    description: 'Water-resistant technical cargo pants with 8 functional pockets and adjustable ankle straps.',
    isNew: true
  },
  {
    id: '3',
    name: 'Neon Pulse Sneakers',
    price: 159.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
    rating: 4.9,
    sizes: ['8', '9', '10', '11', '12'],
    colors: ['Red/Black', 'White/Blue'],
    description: 'High-performance sneakers with reactive cushioning and glow-in-the-dark accents.',
    isNew: true
  },
  {
    id: '4',
    name: 'Vantage Bomber Jacket',
    price: 145.00,
    originalPrice: 180.00,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop',
    rating: 4.7,
    sizes: ['M', 'L', 'XL'],
    colors: ['Navy', 'Black', 'Burgundy'],
    description: 'Classic bomber silhouette with modern technical fabrics and quilted lining.',
    isSale: true
  },
  {
    id: '5',
    name: 'Ethereal Silk Blouse',
    price: 75.00,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop',
    rating: 4.6,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Cream', 'Soft Pink', 'Black'],
    description: 'Elegant silk blouse with a modern oversized fit and subtle sheen.'
  },
  {
    id: '6',
    name: 'Matrix Reflective Vest',
    price: 95.00,
    category: 'Streetwear',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
    rating: 4.4,
    sizes: ['S', 'M', 'L'],
    colors: ['Silver', 'Black'],
    description: 'Fully reflective utility vest for high visibility and maximum style points.'
  },
  {
    id: '7',
    name: 'Chrome Chain Necklace',
    price: 45.00,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
    rating: 4.8,
    sizes: ['One Size'],
    colors: ['Silver', 'Gunmetal'],
    description: 'Industrial-grade stainless steel chain with a custom UrbanVibe clasp.'
  },
  {
    id: '8',
    name: 'Zenith Pleated Skirt',
    price: 65.00,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1000&auto=format&fit=crop',
    rating: 4.5,
    sizes: ['S', 'M', 'L'],
    colors: ['Black', 'Grey'],
    description: 'High-waisted pleated skirt with a technical edge and hidden zip pockets.'
  }
];
