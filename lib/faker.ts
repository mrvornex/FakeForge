// lib/faker.ts
// ─── Lightweight deterministic fake data generator ───────────────────────────
// No external dependency needed for basic data — pure JS.
// For production, install: npm install @faker-js/faker
// Then replace these functions with: import { faker } from '@faker-js/faker'

// ─── Seeded random (deterministic by id) ─────────────────────────────────────
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return Math.abs(s) / 0x7fffffff;
  };
}

function pick<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)];
}

function range(min: number, max: number, rand: () => number): number {
  return Math.round(min + rand() * (max - min));
}

function price(min: number, max: number, rand: () => number): number {
  return Math.round((min + rand() * (max - min)) * 100) / 100;
}

// ─── Static pools ─────────────────────────────────────────────────────────────
const BRANDS    = ["Apple","Samsung","Sony","LG","Nike","Adidas","Canon","Dell","HP","Asus","Lenovo","Xiaomi","Huawei","OnePlus","Realme","Oppo","Vivo","Motorola","Nokia","Philips"];
const CATEGORIES= ["smartphones","laptops","tablets","mens-shirts","womens-dresses","womens-bags","mens-shoes","womens-shoes","sunglasses","furniture","home-decoration","fragrances","skincare","groceries","sports-accessories","automotive","motorcycle","lighting","tops","beauty"];
const ADJECTIVES= ["Elegant","Premium","Ultra","Pro","Smart","Classic","Essential","Advanced","Deluxe","Superior","Compact","Portable","Wireless","Lightweight","Durable","Stylish","Modern","Innovative","Sleek","Powerful"];
const NOUNS     = ["Watch","Phone","Laptop","Shirt","Dress","Bag","Shoes","Glasses","Sofa","Lamp","Perfume","Cream","Snack","Racket","Helmet","Bulb","Top","Chair","Tablet","Speaker"];
const COLORS    = ["Black","White","Red","Blue","Green","Silver","Gold","Rose Gold","Navy","Grey"];
const FIRSTNAMES= ["Emily","John","Michael","Sarah","David","Emma","James","Olivia","William","Ava","Liam","Sophia","Noah","Isabella","Mason","Mia","Logan","Charlotte","Ethan","Amelia"];
const LASTNAMES = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Wilson","Moore","Taylor","Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Young","Lewis"];
const DOMAINS   = ["gmail.com","yahoo.com","outlook.com","hotmail.com","proton.me","icloud.com"];
const CITIES    = ["New York","Los Angeles","Chicago","Houston","Phoenix","Philadelphia","San Antonio","San Diego","Dallas","San Jose","Austin","Jacksonville","Fort Worth","Columbus","Charlotte"];
const STATES    = ["NY","CA","IL","TX","AZ","PA","FL","OH","NC","WA","CO","GA","TN","VA","MA"];
const LOREM     = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris".split(" ");

function loremWords(n: number, rand: () => number): string {
  return Array.from({ length: n }, () => pick(LOREM, rand)).join(" ") + ".";
}

// ─── Product ──────────────────────────────────────────────────────────────────
export interface Product {
  id: number; title: string; description: string; category: string;
  price: number; discountPercentage: number; rating: number; stock: number;
  tags: string[]; brand: string; sku: string; weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string; shippingInformation: string;
  availabilityStatus: string; reviews: Review[]; returnPolicy: string;
  minimumOrderQuantity: number; thumbnail: string; images: string[];
}

interface Review {
  rating: number; comment: string; date: string;
  reviewerName: string; reviewerEmail: string;
}

export function generateProduct(id: number): Product {
  const r = seeded(id * 31);
  const brand = pick(BRANDS, r);
  const adj   = pick(ADJECTIVES, r);
  const noun  = pick(NOUNS, r);
  const cat   = pick(CATEGORIES, r);
  const color = pick(COLORS, r);
  const p     = price(9.99, 1999.99, r);
  const stock = range(0, 200, r);
  const fn    = pick(FIRSTNAMES, r);
  const ln    = pick(LASTNAMES, r);

  return {
    id,
    title: `${brand} ${adj} ${color} ${noun}`,
    description: loremWords(20, r),
    category: cat,
    price: p,
    discountPercentage: Math.round(r() * 30 * 100) / 100,
    rating: Math.round((3 + r() * 2) * 10) / 10,
    stock,
    tags: [cat, color.toLowerCase(), brand.toLowerCase()],
    brand,
    sku: `FF-${id.toString().padStart(5,"0")}`,
    weight: Math.round(r() * 10 * 10) / 10,
    dimensions: {
      width:  Math.round(r() * 50 * 10) / 10,
      height: Math.round(r() * 50 * 10) / 10,
      depth:  Math.round(r() * 20 * 10) / 10,
    },
    warrantyInformation: pick(["1 year","2 years","6 months","No warranty","Lifetime"], r),
    shippingInformation: pick(["Ships in 1-2 days","Ships overnight","Ships in 3-5 days","Free shipping"], r),
    availabilityStatus: stock > 0 ? "In Stock" : "Out of Stock",
    reviews: Array.from({ length: range(1, 4, r) }, (_, i) => {
      const rr = seeded(id * 97 + i);
      const rfn = pick(FIRSTNAMES, rr);
      const rln = pick(LASTNAMES, rr);
      return {
        rating: range(1, 5, rr),
        comment: loremWords(8, rr),
        date: new Date(Date.now() - range(1, 365, rr) * 86400000).toISOString(),
        reviewerName: `${rfn} ${rln}`,
        reviewerEmail: `${rfn.toLowerCase()}.${rln.toLowerCase()}@${pick(DOMAINS, rr)}`,
      };
    }),
    returnPolicy: pick(["30 days return policy","60 days return policy","No returns","7 days return policy"], r),
    minimumOrderQuantity: range(1, 10, r),
    thumbnail: `https://placehold.co/400x400/1a1a2e/f97316?text=${encodeURIComponent(noun)}`,
    images: Array.from({ length: 4 }, (_, i) =>
      `https://placehold.co/800x600/1a1a2e/f97316?text=${encodeURIComponent(`${noun}+${i+1}`)}`
    ),
  };
}

// ─── User ─────────────────────────────────────────────────────────────────────
export interface User {
  id: number; firstName: string; lastName: string; maidenName: string;
  age: number; gender: string; email: string; phone: string; username: string;
  password: string; birthDate: string; image: string; bloodGroup: string;
  height: number; weight: number; eyeColor: string; hair: { color: string; type: string };
  ip: string; address: Address; macAddress: string; university: string;
  bank: Bank; company: Company; ein: string; ssn: string; userAgent: string;
  role: string;
}
interface Address { address: string; city: string; state: string; stateCode: string; postalCode: string; country: string; coordinates: { lat: number; lng: number } }
interface Bank { cardExpire: string; cardNumber: string; cardType: string; currency: string; iban: string }
interface Company { department: string; name: string; title: string; address: Address }

export function generateUser(id: number): User {
  const r   = seeded(id * 53);
  const fn  = pick(FIRSTNAMES, r);
  const ln  = pick(LASTNAMES, r);
  const mn  = pick(LASTNAMES, r);
  const age = range(18, 65, r);
  const gender = r() > 0.5 ? "male" : "female";
  const city = pick(CITIES, r);
  const state = pick(STATES, r);
  const ip = `${range(1,255,r)}.${range(0,255,r)}.${range(0,255,r)}.${range(0,255,r)}`;

  const addr = (): Address => ({
    address: `${range(1,9999,r)} ${pick(["Main St","Oak Ave","Park Blvd","Elm St","Maple Dr"], r)}`,
    city, state, stateCode: state,
    postalCode: range(10000,99999,r).toString(),
    country: "United States",
    coordinates: { lat: Math.round((r()*180-90)*10000)/10000, lng: Math.round((r()*360-180)*10000)/10000 },
  });

  return {
    id, firstName: fn, lastName: ln, maidenName: mn, age, gender,
    email: `${fn.toLowerCase()}.${ln.toLowerCase()}${range(1,99,r)}@${pick(DOMAINS, r)}`,
    phone: `+1 (${range(200,999,r)}) ${range(100,999,r)}-${range(1000,9999,r)}`,
    username: `${fn.toLowerCase()}${range(10,999,r)}`,
    password: `${fn}${range(100,9999,r)}!`,
    birthDate: `${range(1960,2005,r)}-${String(range(1,12,r)).padStart(2,"0")}-${String(range(1,28,r)).padStart(2,"0")}`,
    image: `https://placehold.co/128x128/1a1a2e/f97316?text=${fn[0]}${ln[0]}`,
    bloodGroup: pick(["A+","A-","B+","B-","O+","O-","AB+","AB-"], r),
    height: range(155, 195, r),
    weight: range(50, 100, r),
    eyeColor: pick(["Brown","Blue","Green","Hazel","Grey"], r),
    hair: { color: pick(["Black","Brown","Blonde","Red","Grey"], r), type: pick(["Straight","Wavy","Curly"], r) },
    ip, address: addr(), macAddress: Array.from({length:6},()=>range(0,255,r).toString(16).padStart(2,"0")).join(":"),
    university: pick(["MIT","Harvard","Stanford","Yale","Columbia","Princeton","UCLA","NYU","Cornell","Duke"], r),
    bank: {
      cardExpire: `${String(range(1,12,r)).padStart(2,"0")}/${range(25,30,r)}`,
      cardNumber: Array.from({length:4},()=>range(1000,9999,r)).join(" "),
      cardType: pick(["Visa","Mastercard","Amex","Discover"], r),
      currency: "USD",
      iban: `US${range(10,99,r)}${Array.from({length:4},()=>range(1000,9999,r)).join("")}`,
    },
    company: {
      department: pick(["Engineering","Marketing","Sales","HR","Finance","Design","Product","Legal"], r),
      name: `${pick(ADJECTIVES, r)} ${pick(["Corp","Inc","LLC","Ltd","Technologies","Solutions","Group"], r)}`,
      title: pick(["Software Engineer","Manager","Director","Designer","Analyst","Developer","Consultant","Specialist"], r),
      address: addr(),
    },
    ein: `${range(10,99,r)}-${range(1000000,9999999,r)}`,
    ssn: `${range(100,999,r)}-${range(10,99,r)}-${range(1000,9999,r)}`,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    role: pick(["user","admin","moderator"], r),
  };
}

// ─── Post ─────────────────────────────────────────────────────────────────────
export interface Post {
  id: number; title: string; body: string; tags: string[];
  reactions: { likes: number; dislikes: number }; views: number; userId: number;
}

const POST_TAGS = ["history","american","crime","fiction","english","love","mystery","science","technology","sport","travel","food","nature","music","art","politics","health","comedy","romance","horror"];

export function generatePost(id: number): Post {
  const r = seeded(id * 17);
  return {
    id,
    title: `${pick(ADJECTIVES, r)} ${loremWords(4, r)}`.slice(0, 60),
    body: loremWords(40, r),
    tags: Array.from({length: range(2,4,r)}, () => pick(POST_TAGS, r)).filter((v,i,a)=>a.indexOf(v)===i),
    reactions: { likes: range(0, 1000, r), dislikes: range(0, 200, r) },
    views: range(10, 50000, r),
    userId: range(1, 208, r),
  };
}

// ─── Comment ──────────────────────────────────────────────────────────────────
export interface Comment {
  id: number; body: string; postId: number;
  likes: number; user: { id: number; username: string; fullName: string };
}

export function generateComment(id: number): Comment {
  const r  = seeded(id * 41);
  const fn = pick(FIRSTNAMES, r);
  const ln = pick(LASTNAMES, r);
  return {
    id,
    body: loremWords(15, r),
    postId: range(1, 251, r),
    likes: range(0, 100, r),
    user: { id: range(1, 208, r), username: `${fn.toLowerCase()}${range(10,99,r)}`, fullName: `${fn} ${ln}` },
  };
}

// ─── Todo ─────────────────────────────────────────────────────────────────────
export interface Todo {
  id: number; todo: string; completed: boolean; userId: number;
}

const TODO_VERBS = ["Buy","Fix","Call","Write","Read","Watch","Clean","Learn","Build","Update","Review","Schedule","Send","Check","Prepare"];
const TODO_NOUNS = ["groceries","report","doctor","email","book","movie","house","course","project","code","meeting","presentation","invoice","server","database"];

export function generateTodo(id: number): Todo {
  const r = seeded(id * 23);
  return {
    id,
    todo: `${pick(TODO_VERBS, r)} ${pick(TODO_NOUNS, r)}`,
    completed: r() > 0.5,
    userId: range(1, 208, r),
  };
}

// ─── Quote ────────────────────────────────────────────────────────────────────
export interface Quote {
  id: number; quote: string; author: string;
}

const QUOTES_POOL = [
  ["The only way to do great work is to love what you do.","Steve Jobs"],
  ["In the middle of every difficulty lies opportunity.","Albert Einstein"],
  ["It does not matter how slowly you go as long as you do not stop.","Confucius"],
  ["Life is what happens when you're busy making other plans.","John Lennon"],
  ["The future belongs to those who believe in the beauty of their dreams.","Eleanor Roosevelt"],
  ["Success is not final, failure is not fatal: it is the courage to continue that counts.","Winston Churchill"],
  ["It always seems impossible until it's done.","Nelson Mandela"],
  ["Do what you can, with what you have, where you are.","Theodore Roosevelt"],
  ["Believe you can and you're halfway there.","Theodore Roosevelt"],
  ["The best time to plant a tree was 20 years ago. The second best time is now.","Chinese Proverb"],
  ["An unexamined life is not worth living.","Socrates"],
  ["Spread love everywhere you go.","Mother Teresa"],
  ["When you reach the end of your rope, tie a knot in it and hang on.","Franklin D. Roosevelt"],
  ["Always remember that you are absolutely unique. Just like everyone else.","Margaret Mead"],
  ["Don't judge each day by the harvest you reap but by the seeds that you plant.","Robert Louis Stevenson"],
  ["The only impossible journey is the one you never begin.","Tony Robbins"],
  ["In this world nothing can be said to be certain, except death and taxes.","Benjamin Franklin"],
  ["It's not whether you get knocked down, it's whether you get up.","Vince Lombardi"],
  ["Life is short, and it's up to you to make it sweet.","Sarah Louise Delany"],
  ["We know what we are, but know not what we may be.","William Shakespeare"],
];

export function generateQuote(id: number): Quote {
  const r = seeded(id * 7);
  const idx = id % QUOTES_POOL.length;
  return { id, quote: QUOTES_POOL[idx][0], author: QUOTES_POOL[idx][1] };
}

// ─── Recipe ───────────────────────────────────────────────────────────────────
export interface Recipe {
  id: number; name: string; ingredients: string[]; instructions: string[];
  prepTimeMinutes: number; cookTimeMinutes: number; servings: number;
  difficulty: string; cuisine: string; caloriesPerServing: number;
  tags: string[]; userId: number; image: string; rating: number;
  reviewCount: number; mealType: string[];
}

const CUISINES   = ["Italian","Mexican","Asian","American","Mediterranean","Indian","French","Japanese","Thai","Greek"];
const MEAL_TYPES = ["Breakfast","Lunch","Dinner","Snack","Dessert"];
const INGR_POOL  = ["flour","sugar","eggs","butter","milk","salt","pepper","olive oil","garlic","onion","tomatoes","chicken","beef","pasta","rice","cheese","cream","lemon","herbs","spices"];
const DIFFICULTIES = ["Easy","Medium","Hard"];

export function generateRecipe(id: number): Recipe {
  const r    = seeded(id * 61);
  const adj  = pick(ADJECTIVES, r);
  const cui  = pick(CUISINES, r);
  const meal = pick(MEAL_TYPES, r);
  return {
    id,
    name: `${adj} ${cui} ${meal} Recipe`,
    ingredients: Array.from({length: range(4,10,r)}, () => `${range(1,4,r)} cup ${pick(INGR_POOL, r)}`),
    instructions: Array.from({length: range(3,6,r)}, (_, i) => `Step ${i+1}: ${loremWords(10, r)}`),
    prepTimeMinutes: range(5, 60, r),
    cookTimeMinutes: range(10, 120, r),
    servings: range(1, 8, r),
    difficulty: pick(DIFFICULTIES, r),
    cuisine: cui,
    caloriesPerServing: range(100, 900, r),
    tags: [meal.toLowerCase(), cui.toLowerCase(), pick(["quick","healthy","easy","vegetarian","spicy"], r)],
    userId: range(1, 208, r),
    image: `https://placehold.co/600x400/1a1a2e/f97316?text=${encodeURIComponent(meal)}`,
    rating: Math.round((3 + r() * 2) * 10) / 10,
    reviewCount: range(5, 500, r),
    mealType: [meal],
  };
}

// ─── Cart ─────────────────────────────────────────────────────────────────────
export interface Cart {
  id: number; products: CartProduct[]; total: number;
  discountedTotal: number; userId: number; totalProducts: number; totalQuantity: number;
}
interface CartProduct {
  id: number; title: string; price: number; quantity: number;
  total: number; discountPercentage: number; discountedTotal: number; thumbnail: string;
}

export function generateCart(id: number): Cart {
  const r = seeded(id * 89);
  const userId = range(1, 208, r);
  const items = range(1, 6, r);
  const products: CartProduct[] = Array.from({length: items}, (_, i) => {
    const rr = seeded(id * 89 + i);
    const pid = range(1, 194, rr);
    const p   = generateProduct(pid);
    const qty = range(1, 5, rr);
    const tot = Math.round(p.price * qty * 100) / 100;
    const disc = Math.round(tot * (1 - p.discountPercentage / 100) * 100) / 100;
    return {
      id: pid, title: p.title, price: p.price, quantity: qty,
      total: tot, discountPercentage: p.discountPercentage,
      discountedTotal: disc, thumbnail: p.thumbnail,
    };
  });
  const total = Math.round(products.reduce((a, b) => a + b.total, 0) * 100) / 100;
  const discountedTotal = Math.round(products.reduce((a, b) => a + b.discountedTotal, 0) * 100) / 100;
  return {
    id, products, total, discountedTotal, userId,
    totalProducts: products.length,
    totalQuantity: products.reduce((a, b) => a + b.quantity, 0),
  };
}

// ─── Totals ───────────────────────────────────────────────────────────────────
export const TOTALS = {
  products: 194, users: 208, posts: 251, comments: 340,
  todos: 254, quotes: 100, recipes: 50, carts: 20,
};