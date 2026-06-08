export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  category: "single" | "box";
  badge?: string;
  flavorNotes?: string[];
  ingredients?: string[];
  tag?: string;
}

export const products: Product[] = [
  {
    id: "rose-flavoured",
    name: "Rose Flavoured Cookie",
    subtitle: "Single Cookie",
    description: "A delicate shortbread infused with real rose extract and decorated with hand-pressed rose sugar, dusted with rose petal flakes.",
    price: 2,
    image: "/images/cookie-rose.png",
    category: "single",
    badge: "Bestseller",
    flavorNotes: ["Floral", "Sweet", "Delicate"],
    ingredients: ["Rose Extract", "Premium Butter", "Fine Sugar", "Vanilla"],
    tag: "rose",
  },
  {
    id: "rose-vanilla",
    name: "Rose Vanilla Cookie",
    subtitle: "Single Cookie",
    description: "Buttery vanilla shortbread crowned with a blooming rose rosette, light pink icing, and a touch of Madagascan vanilla.",
    price: 2,
    image: "/images/cookie-vanilla.png",
    category: "single",
    badge: "Fan Favourite",
    flavorNotes: ["Creamy", "Smooth", "Rich"],
    ingredients: ["Madagascar Vanilla", "Rose Water", "Cultured Butter", "Almond Flour"],
    tag: "vanilla",
  },
  {
    id: "rose-chocolate",
    name: "Rose Chocolate Cookie",
    subtitle: "Single Cookie",
    description: "Dark Belgian chocolate cookie adorned with a burgundy rose frosting rosette, edible gold leaf, and dried rose petals.",
    price: 2,
    image: "/images/cookie-chocolate.png",
    category: "single",
    badge: "Indulgent",
    flavorNotes: ["Deep Cocoa", "Premium Chocolate", "Luxurious Finish"],
    ingredients: ["Belgian Dark Chocolate", "Rose Essence", "Cocoa Powder", "Gold Leaf"],
    tag: "chocolate",
  },
  {
    id: "rose-gift-box",
    name: "Rose Cookies Gift Box",
    subtitle: "Gift Box • 6 Cookies",
    description: "An elegantly curated gift box of 6 artisanal rose cookies, presented in our signature black and rose gold box with satin ribbon.",
    price: 5,
    image: "/images/gift-box.png",
    category: "box",
    badge: "Perfect Gift",
    flavorNotes: ["Assorted", "Curated", "Luxurious"],
    ingredients: ["Assorted Premium Ingredients", "Edible Gold", "Rose Petals"],
    tag: "gift",
  },
  {
    id: "assorted-premium-box",
    name: "Assorted Premium Rose Box",
    subtitle: "Premium Box • 12 Cookies",
    description: "The ultimate luxury collection — 12 handcrafted rose cookies in every variety, nestled in a velvet-lined box with personalised ribbon.",
    price: 8,
    image: "/images/assorted-box.png",
    category: "box",
    badge: "Luxury",
    flavorNotes: ["Rose", "Vanilla", "Chocolate", "Gold"],
    ingredients: ["All Premium Varieties", "Personalisable Ribbon", "Gift Card Included"],
    tag: "premium",
  },
];

export const giftBoxes = [
  {
    id: "wedding",
    title: "Wedding Gifts",
    description: "Enchant your guests with personalised rose cookies, elegantly boxed in our bridal collection.",
    icon: "💍",
    image: "/images/wedding-box.png",
    gradient: "from-rose-pink/20 to-transparent",
  },
  {
    id: "birthday",
    title: "Birthday Gifts",
    description: "Celebrate with a bespoke cookie box, customised with names, messages, and special designs.",
    icon: "🎂",
    image: "/images/gift-box.png",
    gradient: "from-rose-gold/20 to-transparent",
  },
  {
    id: "anniversary",
    title: "Anniversary Gifts",
    description: "Mark a milestone with a luxurious rose cookie collection, symbolising timeless love.",
    icon: "🌹",
    image: "/images/assorted-box.png",
    gradient: "from-rose-dark/20 to-transparent",
  },
  {
    id: "corporate",
    title: "Corporate Gifts",
    description: "Impress clients and teams with branded premium boxes, tailored to your corporate identity.",
    icon: "🏢",
    image: "/images/corporate.png",
    gradient: "from-gold/20 to-transparent",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Isabella M.",
    role: "Bride",
    rating: 5,
    text: "The most elegant cookies I've ever tasted. My wedding guests were absolutely mesmerised — both by the packaging and the incredible flavour. Rossy Cookies made our special day even more magical.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Sophia R.",
    role: "Corporate Events Manager",
    rating: 5,
    text: "Perfect for gifting and special occasions. We ordered 200 branded boxes for our annual gala and received nothing but compliments. The quality is truly unmatched.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 3,
    name: "Charlotte L.",
    role: "Food Enthusiast",
    rating: 5,
    text: "Beautiful packaging and incredible flavour. The rose vanilla cookie is an absolute dream — it melts in your mouth. I've already ordered three times this month!",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    id: 4,
    name: "Amelia P.",
    role: "Birthday Gift Buyer",
    rating: 5,
    text: "I sent the assorted premium box to my mother for her birthday and she cried happy tears. The attention to detail in the packaging alone is worth every penny.",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    id: 5,
    name: "Grace T.",
    role: "Luxury Gift Curator",
    rating: 5,
    text: "As someone who curates luxury gifts professionally, Rossy Cookies is genuinely one of the finest products I've come across. Exceptional in every way.",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
  },
];

export const faqs = [
  {
    q: "What ingredients do you use?",
    a: "We use only the finest premium ingredients — real rose extract, Madagascan vanilla, Belgian dark chocolate, cultured butter, and edible gold leaf. All our cookies are handcrafted in small batches with no artificial preservatives.",
  },
  {
    q: "Do you offer nationwide delivery?",
    a: "Yes! We deliver across the UK with next-day tracked delivery available. International shipping is also available to select countries. All orders are carefully packaged to ensure your cookies arrive in perfect condition.",
  },
  {
    q: "Can I customise gift boxes?",
    a: "Absolutely. We offer full personalisation including custom ribbons, message cards, branded packaging for corporate orders, and bespoke cookie designs. Contact us with your requirements and we'll create something truly special.",
  },
  {
    q: "How long do cookies stay fresh?",
    a: "Our cookies stay fresh for up to 14 days when stored in an airtight container at room temperature. They can also be refrigerated for up to 3 weeks. We recommend consuming within 7 days for the best flavour experience.",
  },
  {
    q: "Do you provide corporate orders?",
    a: "Yes — corporate gifting is one of our specialities. We handle orders from 50 to 5,000+ units, with full custom branding, personalised packaging, and dedicated account management. Request a quote through our corporate form.",
  },
  {
    q: "Are your cookies suitable for dietary requirements?",
    a: "We have options for gluten-free and vegan diets available on request. Please note our kitchen handles nuts, dairy, and gluten. Always contact us before ordering if you have severe allergies.",
  },
];
