export const SHOP = {
  name: 'Maison Éclair',
  tagline: 'Pâtisserie & Cake Atelier',
  phone: '15551234567', // WhatsApp number (international format, no +)
  displayPhone: '+1 (555) 123-4567',
  address: '128 Rosewater Lane, Old Town District',
  hours: [
    { days: 'Tue – Fri', time: '9:00 – 19:00' },
    { days: 'Sat – Sun', time: '8:00 – 20:00' },
    { days: 'Monday', time: 'Closed — we rest the ovens' },
  ],
};

export const waLink = (message: string) =>
  `https://wa.me/${SHOP.phone}?text=${encodeURIComponent(message)}`;

export interface Cake3D {
  id: string;
  model: string;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  serves: string;
  tags: string[];
  height: number;
}

export const SIGNATURE_CAKES: Cake3D[] = [
  {
    id: 'birthday',
    model: '/models/birthday-cake.glb',
    name: 'The Celebration',
    subtitle: 'Signature Birthday Cake',
    description:
      'Vanilla chiffon layered with mascarpone cream and seasonal berries, crowned with hand-piped buttercream and a whisper of gold leaf. Our most-ordered cake, for the days that matter most.',
    price: 'from $68',
    serves: 'Serves 10–14',
    tags: ['Vanilla Chiffon', 'Mascarpone', 'Eggless option'],
    height: 2.4,
  },
  {
    id: 'chocolate',
    model: '/models/chocolate-cake.glb',
    name: 'Noir Intense',
    subtitle: '72% Dark Chocolate Gateau',
    description:
      'Five layers of single-origin 72% dark chocolate sponge, silky ganache and a salted-caramel heart. Deep, grown-up, unforgettable — the cake people write to us about.',
    price: 'from $74',
    serves: 'Serves 12–16',
    tags: ['72% Dark Chocolate', 'Salted Caramel', 'Best seller'],
    height: 2.4,
  },
  {
    id: 'cupcake',
    model: '/models/chocolate-cupcake.glb',
    name: 'Petit Noir',
    subtitle: 'Chocolate Cupcake, Box of 6',
    description:
      'Our Noir Intense, reimagined as an individual indulgence. Molten-centered chocolate cupcake with whipped ganache frosting — perfect for gifting, or for not sharing at all.',
    price: '$24 / box of 6',
    serves: 'Serves 6 (or 1)',
    tags: ['Molten Center', 'Gift-ready', 'Same-day pickup'],
    height: 2.0,
  },
];

export interface MenuItem {
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
}

export const MENU: MenuItem[] = [
  {
    name: 'Midnight Truffle Slice',
    description: 'Dark chocolate gateau, salted caramel core, cocoa soil',
    price: '$9',
    image: '/images/img1.jpg',
    tag: 'Best Seller',
  },
  {
    name: 'Ivory Celebration Cake',
    description: 'Vanilla chiffon, mascarpone, fresh berries, gold leaf',
    price: 'from $68',
    image: '/images/img2.jpg',
  },
  {
    name: 'Pistachio Rose Entremet',
    description: 'Pistachio mousseline, rose water, raspberry insert',
    price: '$11',
    image: '/images/img3.jpg',
    tag: 'New',
  },
  {
    name: 'Atelier Cupcake Box',
    description: 'Six assorted cupcakes of the day, hand-finished',
    price: '$24',
    image: '/images/img6.jpg',
  },
  {
    name: 'Wedding Commission',
    description: 'Tiered bespoke designs, tasting session included',
    price: 'from $380',
    image: '/images/img4.jpg',
    tag: 'Bespoke',
  },
  {
    name: 'Candlelit Birthday Classic',
    description: 'The cake from your childhood, perfected',
    price: 'from $58',
    image: '/images/img9.jpg',
  },
];

export const GALLERY: { image: string; caption: string }[] = [
  { image: '/images/img5.jpg', caption: 'Hand-piped, every single morning' },
  { image: '/images/img7.jpg', caption: 'The atelier at work' },
  { image: '/images/img8.jpg', caption: 'Petit fours, finished to order' },
  { image: '/images/img10.jpg', caption: 'Fresh from the marble counter' },
];
