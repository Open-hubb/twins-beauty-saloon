export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "wig-001",
    name: "Brazilian Body Wave Wig",
    price: 850000,
    image: "https://placehold.co/400x500/1a1c1e/c8a97e?text=Body+Wave",
    category: "Wigs",
    description: "Premium 100% human hair body wave lace front wig, 22 inches",
    badge: "Best Seller",
  },
  {
    id: "wig-002",
    name: "Kinky Curly HD Lace Wig",
    price: 920000,
    image: "https://placehold.co/400x500/1a1c1e/c8a97e?text=Kinky+Curly",
    category: "Wigs",
    description: "HD lace frontal wig, natural kinky curly texture, 20 inches",
  },
  {
    id: "wig-003",
    name: "Straight Silk Top Wig",
    price: 780000,
    image: "https://placehold.co/400x500/1a1c1e/c8a97e?text=Straight+Silk",
    category: "Wigs",
    description: "Silky straight closure wig with silk top base, 18 inches",
  },
  {
    id: "ext-001",
    name: "Peruvian Bundle Deal (3pcs)",
    price: 650000,
    image: "https://placehold.co/400x500/1a1c1e/c8a97e?text=Bundles",
    category: "Extensions",
    description: "Grade 10A Peruvian straight bundles, 16/18/20 inches",
    badge: "Popular",
  },
  {
    id: "ext-002",
    name: "Deep Wave Bundles with Closure",
    price: 750000,
    image: "https://placehold.co/400x500/1a1c1e/c8a97e?text=Deep+Wave",
    category: "Extensions",
    description: "3 bundles + 4x4 closure, deep wave, 14-20 inches",
  },
  {
    id: "care-001",
    name: "Argan Oil Hair Serum",
    price: 120000,
    image: "https://placehold.co/400x500/1a1c1e/c8a97e?text=Argan+Oil",
    category: "Hair Care",
    description: "Lightweight argan oil serum for shine and frizz control, 100ml",
  },
  {
    id: "care-002",
    name: "Edge Control Gel",
    price: 45000,
    image: "https://placehold.co/400x500/1a1c1e/c8a97e?text=Edge+Gel",
    category: "Hair Care",
    description: "Maximum hold edge control with no flaking, 200g",
  },
  {
    id: "care-003",
    name: "Deep Conditioning Mask",
    price: 85000,
    image: "https://placehold.co/400x500/1a1c1e/c8a97e?text=Hair+Mask",
    category: "Hair Care",
    description: "Intensive repair mask with keratin and shea butter, 250ml",
    badge: "New",
  },
  {
    id: "nail-001",
    name: "Gel Polish Set (12 Colors)",
    price: 180000,
    image: "https://placehold.co/400x500/1a1c1e/c8a97e?text=Gel+Set",
    category: "Nail Products",
    description: "Professional UV gel polish set with top & base coat",
  },
  {
    id: "nail-002",
    name: "Press-On Nails — Glam Edition",
    price: 75000,
    image: "https://placehold.co/400x500/1a1c1e/c8a97e?text=Press+On",
    category: "Nail Products",
    description: "Reusable press-on nails in 24 pieces, assorted sizes",
    badge: "Trending",
  },
  {
    id: "cos-001",
    name: "Matte Lip Kit Duo",
    price: 95000,
    image: "https://placehold.co/400x500/1a1c1e/c8a97e?text=Lip+Kit",
    category: "Cosmetics",
    description: "Long-lasting matte lipstick with matching liner",
  },
  {
    id: "cos-002",
    name: "Setting Spray — All Day Hold",
    price: 65000,
    image: "https://placehold.co/400x500/1a1c1e/c8a97e?text=Setting+Spray",
    category: "Cosmetics",
    description: "Oil-free setting spray for up to 16 hours of wear, 120ml",
  },
];

export const categories = [
  "All",
  "Wigs",
  "Extensions",
  "Hair Care",
  "Nail Products",
  "Cosmetics",
];
