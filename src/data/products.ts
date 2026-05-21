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
  // — Nail Services —
  {
    id: "nail-001",
    name: "3D Chrome Nails",
    price: 1200,
    image: "/3d-chrome-nails-gold.jpeg",
    category: "Nail Services",
    description: "Stunning gold stiletto 3D chrome finish nails",
    badge: "Premium",
  },
  {
    id: "nail-002",
    name: "3D Embellished Nails",
    price: 1000,
    image: "/4.jpeg",
    category: "Nail Services",
    description: "Red and pink 3D embellished nails with gems and crystals",
  },
  {
    id: "nail-003",
    name: "3D Gold Zebra Nails",
    price: 900,
    image: "/3d-nails-gold-zebra.jpeg",
    category: "Nail Services",
    description: "Bold gold and zebra print 3D nail art design",
    badge: "Popular",
  },
  {
    id: "nail-004",
    name: "Pink Barbie Art Nails",
    price: 900,
    image: "/11.jpeg",
    category: "Nail Services",
    description: "Vibrant pink Barbie-inspired nail art with detailed designs",
  },
  {
    id: "nail-005",
    name: "French Cat Eye",
    price: 750,
    image: "/1.jpeg",
    category: "Nail Services",
    description: "Elegant French cat eye finish with a magnetic shimmer effect",
    badge: "Best Seller",
  },
  {
    id: "nail-006",
    name: "Marble Design Nails",
    price: 700,
    image: "/2.jpeg",
    category: "Nail Services",
    description: "Luxurious marble-effect nail design with swirl patterns",
  },
  {
    id: "nail-007",
    name: "Cat Eye Nails",
    price: 650,
    image: "/3.jpeg",
    category: "Nail Services",
    description: "Red cat eye nails with a deep magnetic shimmer finish",
  },
  {
    id: "nail-008",
    name: "Acrylic & Gel Polish",
    price: 400,
    image: "/acrylic-gel-polish-navy.jpeg",
    category: "Nail Services",
    description: "Professional acrylic with gel polish overlay in navy blue",
  },
  {
    id: "nail-009",
    name: "Acrylic French Tip",
    price: 400,
    image: "/acrylic-french-tip.jpeg",
    category: "Nail Services",
    description: "Classic acrylic French tip manicure with a clean finish",
  },
  // — Toes —
  {
    id: "toe-001",
    name: "French Tip Toes",
    price: 250,
    image: "/french-tip-toes.jpeg",
    category: "Toes",
    description: "Elegant French tip pedicure for a polished look",
  },
  {
    id: "toe-002",
    name: "Acrylic & Gel Toes",
    price: 200,
    image: "/22233.jpeg",
    category: "Toes",
    description: "Acrylic and gel polish pedicure in bold blue",
  },
  // — Hair Services —
  {
    id: "hair-001",
    name: "Hair Straightening",
    price: 150,
    image: "/hair-straightening-real.jpeg",
    category: "Hair Services",
    description: "Professional hair straightening treatment for smooth, sleek results",
  },
  {
    id: "hair-002",
    name: "Hair Curl",
    price: 150,
    image: "/hair-curl-real.jpeg",
    category: "Hair Services",
    description: "Bouncy curls and waves styled to perfection",
  },
  {
    id: "hair-003",
    name: "Natural Hair Braids",
    price: 80,
    image: "/hair-braids-real.jpeg",
    category: "Hair Services",
    description: "Beautiful natural hair braiding styles",
  },
  {
    id: "hair-004",
    name: "Hair Wash (without cream)",
    price: 100,
    image: "/hair-wash.jpg",
    category: "Hair Services",
    description: "Thorough hair wash treatment without cream",
  },
  // — Mani & Pedi —
  {
    id: "mani-001",
    name: "Manicure (Ladies)",
    price: 60,
    image: "/manicure-ladies.jpg",
    category: "Mani & Pedi",
    description: "Classic manicure with nail shaping, cuticle care, and polish",
  },
  {
    id: "mani-002",
    name: "Manicure (Gents)",
    price: 80,
    image: "/manicure-gents-real.jpeg",
    category: "Mani & Pedi",
    description: "Men's manicure with nail grooming and hand care",
  },
  {
    id: "pedi-001",
    name: "Pedicure (Ladies)",
    price: 100,
    image: "/pedicure-ladies.jpg",
    category: "Mani & Pedi",
    description: "Relaxing pedicure with foot soak, scrub, and polish",
  },
  {
    id: "pedi-002",
    name: "Pedicure (Gents)",
    price: 120,
    image: "/pedicure-gents-real.jpeg",
    category: "Mani & Pedi",
    description: "Men's pedicure with foot care and grooming",
  },
];

export const categories = [
  "All",
  "Nail Services",
  "Toes",
  "Hair Services",
  "Mani & Pedi",
];
