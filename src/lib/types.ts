export type Locale = "id" | "en";

export type ProductCategory =
  | "best-sellers"
  | "tents"
  | "flysheet-canopy"
  | "mattresses"
  | "sleeping-system"
  | "cooking"
  | "lighting"
  | "furniture"
  | "utility"
  | "glamping";

export type Availability = "available" | "preorder" | "sold-out" | "contact";

export type ProductVariant = {
  id: string;
  name: string;
  price?: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  discountLabel?: string;
  availability: Availability;
  variants: ProductVariant[];
  features: string[];
  images: string[];
  rating: number;
  badges: string[];
  sourceUrl: string;
  capacity?: string;
  weather?: string;
  useCases: string[];
  bestSeller?: boolean;
};

export type CartItem = {
  productId: string;
  variantId?: string;
  quantity: number;
};

export type CartLine = CartItem & {
  product: Product;
  variant?: ProductVariant;
  unitPrice: number;
  lineTotal: number;
};

export type Customer = {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
};

export type Fulfillment = "delivery" | "pickup";

export type PaymentMethod = "bank-transfer" | "qris" | "cash-pickup";

export type Order = {
  id: string;
  customer: Customer;
  fulfillment: Fulfillment;
  paymentMethod: PaymentMethod;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: "confirmed";
  createdAt: string;
};

export type AgentMessage = {
  role: "user" | "assistant";
  content: string;
};

export type CartPatchItem = {
  productId: string;
  variantId?: string;
  quantity: number;
};

export type AgentResponse = {
  answer: string;
  recommendedProductIds: string[];
  bundle?: {
    title: string;
    productIds: string[];
    reason: string;
  };
  cartPatch?: {
    add?: CartPatchItem[];
    remove?: string[];
  };
  quickReplies: string[];
};
