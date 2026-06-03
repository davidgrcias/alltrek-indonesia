import type { Availability, Product, ProductCategory } from "./types";

export const categoryOrder: ProductCategory[] = [
  "best-sellers",
  "tents",
  "glamping",
  "flysheet-canopy",
  "mattresses",
  "sleeping-system",
  "cooking",
  "lighting",
  "furniture",
  "utility",
];

export const categoryLabels: Record<ProductCategory, { id: string; en: string }> = {
  "best-sellers": { id: "Produk terlaris", en: "Best sellers" },
  tents: { id: "Tenda", en: "Tents" },
  glamping: { id: "Glamping", en: "Glamping" },
  "flysheet-canopy": { id: "Flysheet & canopy", en: "Flysheet & canopy" },
  mattresses: { id: "Matras", en: "Mattresses" },
  "sleeping-system": { id: "Sleeping system", en: "Sleeping system" },
  cooking: { id: "Cooking set", en: "Cooking set" },
  lighting: { id: "Lighting", en: "Lighting" },
  furniture: { id: "Furniture", en: "Furniture" },
  utility: { id: "Perlengkapan", en: "Utility" },
};

export const availabilityLabels: Record<Availability, { id: string; en: string }> = {
  available: { id: "Tersedia", en: "Available" },
  preorder: { id: "Preorder", en: "Preorder" },
  "sold-out": { id: "Habis", en: "Sold out" },
  contact: { id: "Hubungi toko", en: "Contact store" },
};

export const products: Product[] = [
  {
    id: "tentastic",
    slug: "alltrek-tenda-camping-tentastic-outdoor-1-bedroom-1-guest-room",
    name: "ALLTREK Tenda Camping Tentastic Outdoor 1 Bedroom + 1 Guest Room",
    category: "tents",
    price: 3450000,
    availability: "available",
    variants: [
      { id: "standard", name: "Standard", price: 3450000 },
      { id: "bundle", name: "With extra footprint", price: 3999000 },
    ],
    features: [
      "1 bedroom plus 1 guest room layout for a more comfortable family camp.",
      "Oxford waterproof PU 4500MM outer material.",
      "Oxford 150D seam sealed flooring.",
      "Wide tunnel-style space for gear and sleeping zones.",
      "Best for weekend family camping and car camping.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/TES_COVER_BARU_tentastic1.jpg?v=1760948980",
      "https://www.alltrekoutdoor.com/cdn/shop/files/tentasticnew1.jpg?v=1760948980",
    ],
    rating: 4.8,
    badges: ["Best seller", "Family"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-tenda-camping-tentastic-outdoor-1-bedroom-1-guest-room",
    capacity: "4-6 people",
    weather: "Waterproof PU 4500MM",
    useCases: ["family", "camping", "rain"],
    bestSeller: true,
  },
  {
    id: "eclipta",
    slug: "alltrek-tenda-camping-eclipta-tunnel-4p-double-layer-waterproof-tent",
    name: "ALLTREK Tenda Camping ECLIPTA Tunnel 4P Double Layer Waterproof Tent",
    category: "tents",
    price: 3050000,
    compareAtPrice: 4500000,
    discountLabel: "Diskon 33%",
    availability: "available",
    variants: [{ id: "ivory-pro", name: "Ivory White PRO", price: 3050000 }],
    features: [
      "Oxford 150D material with PU 3000MM waterproof rating.",
      "Tunnel layout with 1 bedroom and 1 guest room.",
      "Size: 480 x 260 x 200 cm.",
      "Weight: 14.5 kg.",
      "Large 4-8 person capacity for family or group camping.",
      "Double layer design for weather protection.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/Eclipta_Ivorry_ab6209ca-67dc-43ea-9aa7-afee8abae92e.png?v=1777350402",
      "https://www.alltrekoutdoor.com/cdn/shop/files/a9363fb9-bd64-4401-9089-ddcebb6efeac.jpg?v=1776073695",
      "https://www.alltrekoutdoor.com/cdn/shop/files/9eb83604-f9b5-4995-a4bb-faf6793aad6d.jpg?v=1776073695",
    ],
    rating: 4.9,
    badges: ["Best seller", "Waterproof"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-tenda-camping-eclipta-tunnel-4p-double-layer-waterproof-tent",
    capacity: "4-8 people",
    weather: "Waterproof PU 3000MM",
    useCases: ["family", "rain", "group"],
    bestSeller: true,
  },
  {
    id: "eclipta-black",
    slug: "alltrek-tenda-camping-eclipta-black-4p-double-layer-waterproof-tent-black",
    name: "PREEORDER 40-60 HARI -ALLTREK Tenda Camping ECLIPTA BLACK 4P Double Layer Waterproof Tent",
    category: "tents",
    price: 3450000,
    compareAtPrice: 4965000,
    discountLabel: "Diskon 31%",
    availability: "preorder",
    variants: [{ id: "black-pro", name: "Black PRO", price: 3450000 }],
    features: [
      "Black edition of the Eclipta 4P tunnel tent.",
      "Double layer waterproof construction.",
      "Preorder item with an estimated 40-60 day lead time.",
      "Built for 4 person camping with extra lounge space.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/Eclipta_Black_05576381-9f18-4272-9310-df7538e967fc.png?v=1777350401",
    ],
    rating: 4.7,
    badges: ["Preorder", "Black Series"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-tenda-camping-eclipta-black-4p-double-layer-waterproof-tent-black",
    capacity: "4 people",
    weather: "Waterproof",
    useCases: ["family", "black-series", "rain"],
    bestSeller: true,
  },
  {
    id: "peak-villa",
    slug: "alltrek-tenda-otomatis-peak-villa-camping-glamping-luxury-double-layer",
    name: "ALLTREK Tenda Otomatis PEAK VILLA Camping Glamping Luxury Double Layer",
    category: "glamping",
    price: 5850000,
    compareAtPrice: 7200000,
    discountLabel: "Diskon 19%",
    availability: "contact",
    variants: [
      { id: "ivory-footprint", name: "Ivory White + Footprint", price: 5850000 },
      { id: "black-footprint", name: "Black + Footprint", price: 5850000 },
    ],
    features: [
      "Automatic double layer glamping tent.",
      "Size: 5 x 2.8 x 1.9 m.",
      "150D silver-coated Oxford outer with PU 2000-3000MM.",
      "190T polyester inner with high density mesh.",
      "150D Oxford flooring with PU 2000-3000MM.",
      "5-8 person capacity with 4 doors and wide windows.",
      "Weight: 17 kg.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/TES_COVER_BARU_peak_villa.jpg?v=1763718088",
      "https://www.alltrekoutdoor.com/cdn/shop/files/peakvilla5.jpg?v=1763718088",
      "https://www.alltrekoutdoor.com/cdn/shop/files/peakvilla1.jpg?v=1763718088",
    ],
    rating: 4.8,
    badges: ["Glamping", "Automatic"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-tenda-otomatis-peak-villa-camping-glamping-luxury-double-layer",
    capacity: "5-8 people",
    weather: "Waterproof PU 2000-3000MM",
    useCases: ["glamping", "family", "large-group"],
    bestSeller: true,
  },
  {
    id: "skylark",
    slug: "alltrek-tenda-camping-luxury-skylark-double-layer-2-rooms-1-hall",
    name: "ALLTREK Tenda Camping Luxury SKYLARK Double Layer 2 Rooms 1 Hall",
    category: "glamping",
    price: 5550000,
    compareAtPrice: 8000000,
    discountLabel: "Diskon 31%",
    availability: "available",
    variants: [{ id: "large", name: "Large", price: 5550000 }],
    features: [
      "2 rooms plus 1 hall family layout.",
      "Capacity: 6-8 people.",
      "210D polyester Oxford ripstop outer with silver-coated PU2000MM.",
      "190T 68D polyester inner with PU600MM.",
      "Automatic iron steel frame.",
      "Size: 400 x 280 x 190 cm.",
      "Weight: 18 kg.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/cv_18cabc67-135c-4330-88b9-654a8650e4e7.jpg?v=1709800415",
      "https://www.alltrekoutdoor.com/cdn/shop/files/1_25f1cbdd-fdc4-4f60-b28b-584ebaf55526.jpg?v=1709800414",
    ],
    rating: 4.7,
    badges: ["Luxury", "Family"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-tenda-camping-luxury-skylark-double-layer-2-rooms-1-hall",
    capacity: "6-8 people",
    weather: "Waterproof PU2000MM",
    useCases: ["glamping", "family", "large-group"],
  },
  {
    id: "azteca",
    slug: "alltrek-tenda-camping-azteca-tunnel-5p-triple-layer-waterproof-tent",
    name: "ALLTREK Tenda Camping AZTECA Tunnel 5P Triple Layer Waterproof Tent",
    category: "tents",
    price: 5800000,
    availability: "available",
    variants: [
      { id: "base", name: "Base", price: 5800000 },
      { id: "package", name: "Package", price: 6300000 },
    ],
    features: [
      "Tunnel 5P camping tent.",
      "Triple layer waterproof tent construction.",
      "Built for family trips with extended weather coverage.",
      "Recommended when the group wants more protection than a lightweight hiking tent.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/523f4125-2b5d-4e3f-b507-f4da4ca7a149.jpg?v=1727772155",
      "https://www.alltrekoutdoor.com/cdn/shop/files/azteca.jpg?v=1713761147",
    ],
    rating: 4.6,
    badges: ["Triple layer", "5P"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-tenda-camping-azteca-tunnel-5p-triple-layer-waterproof-tent",
    capacity: "5 people",
    weather: "Waterproof",
    useCases: ["rain", "family", "group"],
  },
  {
    id: "evoria",
    slug: "alltrek-tenda-camping-evoria-automatic-tent-double-layer-3-4-person",
    name: "ALLTREK Tenda Camping EVORIA Automatic Tent Double Layer 3-4 Person",
    category: "tents",
    price: 2385000,
    compareAtPrice: 3500000,
    discountLabel: "Diskon 32%",
    availability: "available",
    variants: [{ id: "standard", name: "Standard", price: 2385000 }],
    features: [
      "Automatic 3-4 person tent.",
      "Double layer construction.",
      "Good middle option for couples, small families, or quick weekend trips.",
      "Available in the tent collection.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/COVER_ae5c6538-0c60-4ffa-9200-56c6376dc747.jpg?v=1759976566",
      "https://www.alltrekoutdoor.com/cdn/shop/files/S1_f28ff1c4-0616-421d-881f-5db9de54a773.jpg?v=1759976566",
    ],
    rating: 4.6,
    badges: ["Automatic", "3-4P"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-tenda-camping-evoria-automatic-tent-double-layer-3-4-person",
    capacity: "3-4 people",
    weather: "Double layer",
    useCases: ["small-family", "quick-setup", "camping"],
  },
  {
    id: "starion",
    slug: "alltrek-canopy-flysheet-camping-starion-flysheet-anti-uv-outdoor",
    name: "ALLTREK Canopy Flysheet Camping STARION Flysheet Anti UV Outdoor",
    category: "flysheet-canopy",
    price: 1400000,
    compareAtPrice: 2800000,
    discountLabel: "Diskon 50%",
    availability: "contact",
    variants: [{ id: "standard", name: "Standard", price: 1400000 }],
    features: [
      "210D Oxford material.",
      "Waterproof PU 3000MM.",
      "Anti UV UPF 50+ protection.",
      "Capacity: 6-8 people.",
      "Reflective windrope included.",
      "Works as a shade and rain extension for tent setups.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/6701a748-dec8-437b-8a97-52be0bc5a646.jpg?v=1727174348",
      "https://www.alltrekoutdoor.com/cdn/shop/files/538d6b02-282f-4dea-a4c1-7808f846110d.jpg?v=1727174351",
    ],
    rating: 4.8,
    badges: ["Anti UV", "Waterproof"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-canopy-flysheet-camping-starion-flysheet-anti-uv-outdoor",
    capacity: "6-8 people",
    weather: "UPF 50+ and PU 3000MM",
    useCases: ["shade", "rain", "group"],
    bestSeller: true,
  },
  {
    id: "bigscreen",
    slug: "alltrek-flysheet-bigscreen-camping-besar-6-6meter-anti-uv-multifungsi",
    name: "ALLTREK Flysheet Bigscreen Camping Besar 6*6meter Anti UV Multifungsi",
    category: "flysheet-canopy",
    price: 1475000,
    compareAtPrice: 1967750,
    discountLabel: "Diskon 26%",
    availability: "available",
    variants: [{ id: "6x6", name: "6 x 6 meter", price: 1475000 }],
    features: [
      "Large 6 x 6 meter flysheet.",
      "Anti UV multifunction camping shade.",
      "Best for family camps, basecamp kitchens, and group dining zones.",
      "A reliable option for family camps, basecamp kitchens, and group dining zones.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/Cover_35ba2911-7acb-4ef2-95ee-9a0c669c2341.jpg?v=1737529025",
    ],
    rating: 4.7,
    badges: ["Large shade", "Best seller"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-flysheet-bigscreen-camping-besar-6-6meter-anti-uv-multifungsi",
    capacity: "Group",
    weather: "Anti UV",
    useCases: ["shade", "family", "group"],
    bestSeller: true,
  },
  {
    id: "volark",
    slug: "alltrek-flysheet-canopy-volark-multi-person-anti-uv-portable-camping",
    name: "ALLTREK Flysheet Canopy VOLARK Multi-person Anti UV Portable Camping",
    category: "flysheet-canopy",
    price: 765000,
    compareAtPrice: 1356100,
    discountLabel: "Diskon 44%",
    availability: "available",
    variants: [{ id: "standard", name: "Standard", price: 765000 }],
    features: [
      "Portable multi-person flysheet canopy.",
      "Anti UV camping shade.",
      "Lower price option for adding shade beside a tent.",
      "Recommended for starter bundles.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/a10dba90-3a35-4a24-9672-2c588a1d2c54.jpg?v=1709799831",
      "https://www.alltrekoutdoor.com/cdn/shop/files/e4a11dc2-177a-4fe3-a38b-be96a94e5ac3.jpg?v=1709799830",
    ],
    rating: 4.5,
    badges: ["Portable", "Anti UV"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-flysheet-canopy-volark-multi-person-anti-uv-portable-camping",
    capacity: "Multi-person",
    weather: "Anti UV",
    useCases: ["shade", "starter", "budget"],
  },
  {
    id: "stovy",
    slug: "alltrek-matras-kasur-angin-stovy-automatic-inflation-outdoor-portable",
    name: "ALLTREK Matras Kasur Angin STOVY Automatic Inflation Outdoor Portable",
    category: "mattresses",
    price: 950000,
    compareAtPrice: 1550000,
    discountLabel: "Diskon 39%",
    availability: "available",
    variants: [
      { id: "single", name: "Single", price: 850000 },
      { id: "double", name: "Double", price: 950000 },
    ],
    features: [
      "Automatic inflation with 4000 mAh electric pump.",
      "PVC premium sleeping surface.",
      "Height: 40 cm.",
      "Single size: 190 x 100 x 40 cm for 1 person.",
      "Double size: 200 x 150 x 40 cm for 2 people.",
      "Includes air mattress, pillow, electric pump, patch, nozzle, charging cable, and storage bag.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/2f16d2e8-74fd-4cec-882f-0948e517abc6.jpg?v=1718866226",
      "https://www.alltrekoutdoor.com/cdn/shop/files/3d4dde55-6839-4b6a-bb3a-7e468cc41f53.jpg?v=1718866228",
    ],
    rating: 4.8,
    badges: ["Automatic", "Comfort"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-matras-kasur-angin-stovy-automatic-inflation-outdoor-portable",
    capacity: "1-2 people",
    useCases: ["sleep", "comfort", "family"],
    bestSeller: true,
  },
  {
    id: "grande",
    slug: "alltrek-kasur-angin-expandable-grande-3in1-air-mattress-connectable-camping-outdoor-portable",
    name: "ALLTREK Kasur Angin Expandable GRANDE 3in1 Air Mattress Connectable Camping Outdoor Portable",
    category: "mattresses",
    price: 500000,
    compareAtPrice: 1250000,
    discountLabel: "Diskon 60%",
    availability: "available",
    variants: [{ id: "standard", name: "Standard", price: 500000 }],
    features: [
      "Expandable 3 in 1 air mattress.",
      "Connectable design for flexible sleeping layouts.",
      "Good budget comfort upgrade for family tents.",
      "Flexible option for family tent comfort upgrades.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/COVER_05bff8df-f176-47bb-b315-652c71b21908.jpg?v=1778472993",
    ],
    rating: 4.5,
    badges: ["Expandable", "Value"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-kasur-angin-expandable-grande-3in1-air-mattress-connectable-camping-outdoor-portable",
    useCases: ["sleep", "budget", "family"],
  },
  {
    id: "rumi",
    slug: "alltrek-sleeping-bag-rumi-selimut-tidur-outdoor-portable-camping",
    name: "ALLTREK Sleeping Bag RUMI Selimut Tidur Outdoor Portable Camping",
    category: "sleeping-system",
    price: 375000,
    compareAtPrice: 775000,
    availability: "sold-out",
    variants: [{ id: "standard", name: "Standard", price: 375000 }],
    features: [
      "Portable outdoor sleeping bag.",
      "Envelope-style sleep system for camping.",
      "Works as a warm layer inside tents or under flysheet shelters.",
      "Popular sleeping system option with limited availability.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/ef077fad-2bcd-414e-917f-2833bf592dbf.jpg_tplv-aphluv4xwc-resize-webp_800_800.webp?v=1759292714",
    ],
    rating: 4.4,
    badges: ["Sleeping bag", "Sold out"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-sleeping-bag-rumi-selimut-tidur-outdoor-portable-camping",
    useCases: ["sleep", "solo"],
  },
  {
    id: "comfy",
    slug: "alltrek-bantal-lipat-camping-comfy-air-pillow-portable",
    name: "ALLTREK Bantal Lipat Camping COMFY Air Pillow Portable",
    category: "sleeping-system",
    price: 35000,
    compareAtPrice: 250000,
    discountLabel: "Diskon 86%",
    availability: "available",
    variants: [{ id: "standard", name: "Standard", price: 35000 }],
    features: [
      "Portable folding air pillow.",
      "Small add-on for compact sleeping kits.",
      "Useful for hiking, car camping, and emergency rest kits.",
      "Available in sleeping system and outdoor equipment setups.",
    ],
    images: ["https://www.alltrekoutdoor.com/cdn/shop/files/comfy.jpg?v=1713955327"],
    rating: 4.5,
    badges: ["Budget", "Compact"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-bantal-lipat-camping-comfy-air-pillow-portable",
    useCases: ["sleep", "budget", "solo"],
  },
  {
    id: "ethnic-blanket",
    slug: "alltrek-selimut-tidur-ethnic-camping-blanket-red",
    name: "ALLTREK Selimut Tidur ETHNIC Camping Blanket",
    category: "sleeping-system",
    price: 212000,
    compareAtPrice: 264538,
    discountLabel: "Diskon 20%",
    availability: "available",
    variants: [{ id: "red", name: "Red", price: 212000 }],
    features: [
      "Camping blanket for extra warmth.",
      "Good companion for air mattress setups.",
      "Can be used for picnic, camp chair comfort, or sleeping layer.",
      "Compact comfort layer for sleeping system setups.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/f8298724-2e4f-4a2f-a1be-d6b5e8209f5b.jpg?v=1726826286",
    ],
    rating: 4.5,
    badges: ["Blanket", "Comfort"],
    sourceUrl: "https://www.alltrekoutdoor.com/products/alltrek-selimut-tidur-ethnic-camping-blanket-red",
    useCases: ["sleep", "family", "picnic"],
  },
  {
    id: "feasty",
    slug: "alltrek-cooking-set-camping-9in1-feasty-alat-masak-outdoor-hiking",
    name: "ALLTREK Cooking Set Camping 9in1 FEASTY Alat Masak Outdoor Hiking",
    category: "cooking",
    price: 245000,
    compareAtPrice: 365000,
    availability: "sold-out",
    variants: [{ id: "9in1", name: "9 in 1", price: 245000 }],
    features: [
      "9 in 1 outdoor cooking set.",
      "Compact cooking option for hiking and camping.",
      "Popular cooking kit with limited availability.",
      "Good reference for future restock bundles.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/a8cddaa1-9421-4de8-b4ba-4390a9daf4aa.jpg?v=1709801799",
    ],
    rating: 4.6,
    badges: ["Best seller", "Sold out"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-cooking-set-camping-9in1-feasty-alat-masak-outdoor-hiking",
    useCases: ["cooking", "hiking", "starter"],
    bestSeller: true,
  },
  {
    id: "castry",
    slug: "alltrek-cooking-set-castry-4in1-alat-masak-camping-portable",
    name: "ALLTREK Cooking Set CASTRY 4in1 Alat Masak Camping Portable",
    category: "cooking",
    price: 445000,
    compareAtPrice: 651038,
    discountLabel: "Diskon 32%",
    availability: "contact",
    variants: [{ id: "4-cooking-set-2-tools", name: "4 Cooking Set + 2 Tools", price: 445000 }],
    features: [
      "Aluminium alloy material.",
      "Weight: 1 kg.",
      "Includes 1.6 L pot, 1.5 L pot, frying pan, and kettle.",
      "Suitable for boiling, frying, sauteing, and hot drinks.",
      "Portable cooking kit for 2 portion meals.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/57ec1a62-9b38-4626-8183-1275dec91564.jpg?v=1709801669",
      "https://www.alltrekoutdoor.com/cdn/shop/files/55191eb1-8686-44d4-9ed4-a1f177c5f131.jpg?v=1709801670",
    ],
    rating: 4.7,
    badges: ["Portable", "Cooking set"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-cooking-set-castry-4in1-alat-masak-camping-portable",
    useCases: ["cooking", "family", "starter"],
    bestSeller: true,
  },
  {
    id: "silicone-11in1",
    slug: "alltrek-cooking-set-silicone-outdoor-11-in-1-set-alat-masak-silikon",
    name: "ALLTREK Cooking Set Silicone Outdoor 11 in 1 Set Alat Masak Silikon",
    category: "cooking",
    price: 285000,
    compareAtPrice: 495000,
    discountLabel: "Diskon 43%",
    availability: "available",
    variants: [{ id: "11in1", name: "11 in 1", price: 285000 }],
    features: [
      "11 in 1 silicone outdoor cooking set.",
      "Compact set for camp kitchen organization.",
      "Best for families who want more prep pieces in one kit.",
      "Practical add-on for camp kitchen setups.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/9662c68b-af50-4c0f-9f36-f2af55f923ab.jpg?v=1709801357",
    ],
    rating: 4.5,
    badges: ["11 in 1", "Kitchen"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-cooking-set-silicone-outdoor-11-in-1-set-alat-masak-silikon",
    useCases: ["cooking", "family"],
  },
  {
    id: "pyro-stove",
    slug: "alltrek-kompor-camping-lipat-pyro-outdoor-split-small-gas-stove-camping-portable-1",
    name: "ALLTREK Kompor Camping Lipat PYRO Outdoor Split Small Gas Stove Camping Portable",
    category: "cooking",
    price: 299900,
    compareAtPrice: 595000,
    discountLabel: "Diskon 50%",
    availability: "available",
    variants: [{ id: "standard", name: "Standard", price: 299900 }],
    features: [
      "Portable folding gas stove.",
      "Split small stove design for outdoor cooking.",
      "Pairs with Castry or Feasty cooking sets.",
      "Available for compact outdoor cooking setups.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/0140d5e6-8319-4d1c-81c2-3916d3f42276_a1f49a28-a0ff-446b-8e5e-c876f831f014.jpg?v=1724130262",
    ],
    rating: 4.5,
    badges: ["Stove", "Portable"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-kompor-camping-lipat-pyro-outdoor-split-small-gas-stove-camping-portable-1",
    useCases: ["cooking", "starter", "solo"],
  },
  {
    id: "watera-black",
    slug: "alltrek-galon-air-12l-watera-black-large-capacity-water-tank-upgrade",
    name: "ALLTREK Galon Air 12L WATERA BLACK Large Capacity Water Tank Upgrade",
    category: "cooking",
    price: 350000,
    compareAtPrice: 500000,
    discountLabel: "Diskon 30%",
    availability: "available",
    variants: [{ id: "12l", name: "12 L", price: 350000 }],
    features: [
      "12 L large capacity water tank.",
      "Black upgrade edition.",
      "Useful for family camp kitchens and washing stations.",
      "Reliable water storage pick for family camp kitchens.",
    ],
    images: ["https://www.alltrekoutdoor.com/cdn/shop/files/waterablack.jpg?v=1714376229"],
    rating: 4.6,
    badges: ["12 L", "Best seller"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-galon-air-12l-watera-black-large-capacity-water-tank-upgrade",
    useCases: ["cooking", "water", "family"],
    bestSeller: true,
  },
  {
    id: "tableware-family",
    slug: "alltrek-tableware-family-pack-22-pcs-set-outdoor-camping-portable",
    name: "ALLTREK Tableware Family Pack 22 Pcs Set Outdoor Camping Portable",
    category: "cooking",
    price: 275000,
    compareAtPrice: 415855,
    discountLabel: "Diskon 34%",
    availability: "available",
    variants: [{ id: "22pcs", name: "22 pcs", price: 275000 }],
    features: [
      "22 piece portable family tableware pack.",
      "Good add-on for group meals.",
      "Keeps camp kitchen packing simple.",
      "Helps keep plates, bowls, and cutlery organized in one pack.",
    ],
    images: ["https://www.alltrekoutdoor.com/cdn/shop/files/tableware.jpg?v=1713956514"],
    rating: 4.5,
    badges: ["22 pcs", "Family"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-tableware-family-pack-22-pcs-set-outdoor-camping-portable",
    useCases: ["cooking", "family", "starter"],
  },
  {
    id: "rygen",
    slug: "alltrek-hanging-lamp-vintage-rygen-lampu-gantung-led-rechargeable",
    name: "ALLTREK Hanging Lamp Vintage RYGEN Lampu Gantung LED Rechargeable",
    category: "lighting",
    price: 140000,
    compareAtPrice: 250000,
    discountLabel: "Diskon 44%",
    availability: "available",
    variants: [
      { id: "black", name: "Black", price: 140000 },
      { id: "khaki", name: "Khaki", price: 140000 },
    ],
    features: [
      "Iron steel plus ABS body.",
      "IPX4 waterproof rating.",
      "1200 mAh battery.",
      "Type-C rechargeable.",
      "Light duration: 6-12 hours.",
      "4 adjustable light modes.",
      "Size: 10.4 x 10.4 x 9.3 cm; weight: 154 g.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/e9eaf889-57d6-4284-9aa2-8cb9de1583a0.jpg?v=1729137005",
      "https://www.alltrekoutdoor.com/cdn/shop/files/5bab4502-05fe-4737-a80d-338a466c0a02.jpg?v=1729137008",
    ],
    rating: 4.8,
    badges: ["Rechargeable", "Best seller"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-hanging-lamp-vintage-rygen-lampu-gantung-led-rechargeable",
    weather: "IPX4",
    useCases: ["lighting", "starter", "glamping"],
    bestSeller: true,
  },
  {
    id: "vintage-usb-light",
    slug: "alltrek-lampu-outdoor-vintage-style-camping-usb-light-2-mode",
    name: "ALLTREK Lampu Outdoor Vintage Style Camping USB Light 2 Mode",
    category: "lighting",
    price: 195000,
    compareAtPrice: 363938,
    discountLabel: "Diskon 47%",
    availability: "available",
    variants: [{ id: "standard", name: "Standard", price: 195000 }],
    features: [
      "Vintage style camping USB light.",
      "2 lighting modes.",
      "Compact lamp for table, tent, or glamping ambiance.",
      "Useful as a warm accent light for relaxed campsite evenings.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/70fecf33-271a-4b6c-8dc4-2eb9de24488a.jpg?v=1709809243",
    ],
    rating: 4.6,
    badges: ["2 mode", "Vintage"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-lampu-outdoor-vintage-style-camping-usb-light-2-mode",
    useCases: ["lighting", "glamping", "starter"],
    bestSeller: true,
  },
  {
    id: "ecto",
    slug: "alltrek-lampu-camping-ecto-rechargeable-outdoor-luxury-lamp",
    name: "ALLTREK Lampu Camping ECTO Rechargeable Outdoor Luxury Lamp",
    category: "lighting",
    price: 356000,
    availability: "available",
    variants: [
      { id: "basic", name: "Basic", price: 356000 },
      { id: "premium", name: "Premium", price: 495000 },
    ],
    features: [
      "Rechargeable outdoor luxury lamp.",
      "Good for glamping tables and tent interiors.",
      "Available in basic and premium lighting options.",
      "Recommended for ambiance-focused setups.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/3b070b8e-6077-484e-8fe5-93c99f388031_bac99aa5-7c4b-40d9-a194-51605b669e9b.jpg?v=1725865620",
    ],
    rating: 4.7,
    badges: ["Luxury", "Rechargeable"],
    sourceUrl: "https://www.alltrekoutdoor.com/products/alltrek-lampu-camping-ecto-rechargeable-outdoor-luxury-lamp",
    useCases: ["lighting", "glamping"],
    bestSeller: true,
  },
  {
    id: "rustic-lantern",
    slug: "alltrek-lampu-tenda-camping-rustic-lentera-outdoor-vintage-style",
    name: "ALLTREK Lampu Tenda Camping RUSTIC Lentera Outdoor Vintage Style",
    category: "lighting",
    price: 85000,
    compareAtPrice: 225000,
    discountLabel: "Diskon 63%",
    availability: "available",
    variants: [{ id: "standard", name: "Standard", price: 85000 }],
    features: [
      "Vintage style outdoor lantern.",
      "Budget-friendly tent light.",
      "Good for starter kits and spare campsite lighting.",
      "Reliable spare light for starter kits and nighttime camp use.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/af335e12b5fa4357b9e7a31b7c6b93b6.jpg?v=1751635104",
    ],
    rating: 4.4,
    badges: ["Lantern", "Budget"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-lampu-tenda-camping-rustic-lentera-outdoor-vintage-style",
    useCases: ["lighting", "budget", "starter"],
  },
  {
    id: "g500",
    slug: "alltrek-lampu-outdoor-g500-emergency-lamp-multifunction",
    name: "ALLTREK Lampu Outdoor G500 Emergency Lamp Multifunction",
    category: "lighting",
    price: 265000,
    compareAtPrice: 450000,
    discountLabel: "Diskon 42%",
    availability: "available",
    variants: [{ id: "standard", name: "Standard", price: 265000 }],
    features: [
      "Multifunction emergency lamp.",
      "Useful backup for rain, power bank stations, and night cooking.",
      "Recommended for safety-focused lighting bundles.",
      "Works well as a backup light for family or group setups.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/b5059ec3-47ff-429e-9468-6327c040ac3e.jpg?v=1709808972",
    ],
    rating: 4.6,
    badges: ["Emergency", "Multifunction"],
    sourceUrl: "https://www.alltrekoutdoor.com/products/alltrek-lampu-outdoor-g500-emergency-lamp-multifunction",
    useCases: ["lighting", "safety", "family"],
  },
  {
    id: "aquafold",
    slug: "alltrek-ember-lipat-aquafold-folding-bucket-wadah-air-multifungsi",
    name: "ALLTREK Ember Lipat AQUAFOLD Folding Bucket Wadah Air Multifungsi",
    category: "utility",
    price: 95000,
    compareAtPrice: 99000,
    availability: "available",
    variants: [
      { id: "small", name: "Small", price: 95000 },
      { id: "large", name: "Large", price: 99000 },
    ],
    features: [
      "Foldable multifunction water bucket.",
      "Useful for washing, carrying water, and campsite cleanup.",
      "Compact storage for car camping kits.",
      "Compact storage for car camping kits and cleanup stations.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/d2c7ef13-0bd2-48dc-970a-0a895acbceac_95a6df77-92ef-409b-8fc5-32a2c59636a0.jpg?v=1724315310",
    ],
    rating: 4.6,
    badges: ["Foldable", "Best seller"],
    sourceUrl:
      "https://www.alltrekoutdoor.com/products/alltrek-ember-lipat-aquafold-folding-bucket-wadah-air-multifungsi",
    useCases: ["water", "utility", "starter"],
    bestSeller: true,
  },
  {
    id: "folding-box",
    slug: "alltrek-folding-storage-box-50l-outdoor-camping",
    name: "ALLTREK Folding Storage Box 50L Outdoor Camping",
    category: "furniture",
    price: 500000,
    compareAtPrice: 685665,
    discountLabel: "Diskon 28%",
    availability: "available",
    variants: [{ id: "50l", name: "50 L", price: 500000 }],
    features: [
      "50 L folding storage box.",
      "Keeps cooking kits, lighting, and tent accessories organized.",
      "Useful add-on for car camping and glamping packing.",
      "Folds down for easier storage between trips.",
    ],
    images: ["https://www.alltrekoutdoor.com/cdn/shop/files/foldingbox.jpg?v=1714373248"],
    rating: 4.6,
    badges: ["50 L", "Storage"],
    sourceUrl: "https://www.alltrekoutdoor.com/products/alltrek-folding-storage-box-50l-outdoor-camping",
    useCases: ["storage", "family", "glamping"],
    bestSeller: true,
  },
  {
    id: "guitor-chair",
    slug: "alltrek-kursi-lipat-guitor-folding-chair-kermit-detachable",
    name: "ALLTREK Kursi Lipat GUITOR Folding Chair Kermit Detachable",
    category: "furniture",
    price: 550000,
    compareAtPrice: 1350000,
    discountLabel: "Diskon 60%",
    availability: "available",
    variants: [{ id: "standard", name: "Standard", price: 550000 }],
    features: [
      "Kermit-style detachable folding chair.",
      "Comfort upgrade for campsite dining or tent vestibules.",
      "Best paired with a folding table and lighting.",
      "Detachable build helps simplify packing after camp.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/1ea641ba-87a9-4e0e-847d-4a913aabb557.jpg?v=1736149700",
    ],
    rating: 4.5,
    badges: ["Chair", "Detachable"],
    sourceUrl: "https://www.alltrekoutdoor.com/products/alltrek-kursi-lipat-guitor-folding-chair-kermit-detachable",
    useCases: ["furniture", "glamping", "family"],
  },
  {
    id: "tenka-table",
    slug: "alltrek-meja-camping-igt-tenka-folding-table-aluminum-alloy-2",
    name: "ALLTREK Meja Camping IGT TENKA Folding Table Aluminum Alloy",
    category: "furniture",
    price: 299000,
    availability: "available",
    variants: [
      { id: "mini", name: "Mini", price: 299000 },
      { id: "large", name: "Large", price: 899000 },
    ],
    features: [
      "Aluminum alloy folding camping table.",
      "IGT-style setup for cooking and dining organization.",
      "Available in compact and larger table options.",
      "Recommended for kitchen-focused bundles.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/sg-11134201-7rdxw-m0vif93a6arm02.jpg?v=1760503745",
    ],
    rating: 4.5,
    badges: ["Table", "Aluminum"],
    sourceUrl: "https://www.alltrekoutdoor.com/products/alltrek-meja-camping-igt-tenka-folding-table-aluminum-alloy-2",
    useCases: ["furniture", "cooking", "glamping"],
  },
  {
    id: "nomad-chair",
    slug: "alltrek-kursi-camping-lipat-nomad-outdoor-folding-moon-chair",
    name: "ALLTREK Kursi Camping Lipat NOMAD Outdoor Folding Moon Chair",
    category: "furniture",
    price: 385000,
    availability: "available",
    variants: [
      { id: "standard", name: "Standard", price: 385000 },
      { id: "premium", name: "Premium", price: 495000 },
    ],
    features: [
      "Outdoor folding moon chair.",
      "Comfortable camp lounge seating.",
      "Available in standard and premium seating options.",
      "Good for family and glamping setups.",
    ],
    images: ["https://www.alltrekoutdoor.com/cdn/shop/files/Nomad.jpg?v=1714368426"],
    rating: 4.5,
    badges: ["Moon chair", "Portable"],
    sourceUrl: "https://www.alltrekoutdoor.com/products/alltrek-kursi-camping-lipat-nomad-outdoor-folding-moon-chair",
    useCases: ["furniture", "family", "glamping"],
  },
  {
    id: "hammock-hm201",
    slug: "alltrek-hammock-ultralight-hm201-single-double-super-light",
    name: "ALLTREK Hammock Ultralight HM201 Single Double Super Light",
    category: "furniture",
    price: 195000,
    compareAtPrice: 350000,
    availability: "sold-out",
    variants: [{ id: "standard", name: "Standard", price: 195000 }],
    features: [
      "Ultralight single/double hammock.",
      "Super light hangout option for camp rest.",
      "Limited-availability rest option for solo campers.",
      "Useful as a future restock suggestion for solo campers.",
    ],
    images: [
      "https://www.alltrekoutdoor.com/cdn/shop/files/743a4198-084a-4e5a-9dd7-9f283333089f.jpg?v=1724663440",
    ],
    rating: 4.4,
    badges: ["Hammock", "Sold out"],
    sourceUrl: "https://www.alltrekoutdoor.com/products/alltrek-hammock-ultralight-hm201-single-double-super-light",
    useCases: ["solo", "relax", "furniture"],
  },
];

export function formatPrice(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export type ProductFilter = {
  query?: string;
  category?: ProductCategory | "all";
  availability?: Availability | "all";
  sort?: "featured" | "price-asc" | "price-desc" | "rating";
};

export function filterProducts(items: Product[], filter: ProductFilter = {}) {
  const query = filter.query?.trim().toLowerCase();

  const filtered = items.filter((product) => {
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.features.some((feature) => feature.toLowerCase().includes(query)) ||
      product.useCases.some((useCase) => useCase.toLowerCase().includes(query));
    const matchesCategory =
      !filter.category || filter.category === "all" || product.category === filter.category;
    const matchesAvailability =
      !filter.availability ||
      filter.availability === "all" ||
      product.availability === filter.availability;

    return matchesQuery && matchesCategory && matchesAvailability;
  });

  return filtered.toSorted((a, b) => {
    switch (filter.sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return Number(Boolean(b.bestSeller)) - Number(Boolean(a.bestSeller)) || b.rating - a.rating;
    }
  });
}

export function getFeaturedProducts(limit = 8) {
  return products
    .filter((product) => product.bestSeller || product.badges.includes("Glamping"))
    .toSorted((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((candidate) => candidate.id !== product.id)
    .map((candidate) => {
      const categoryScore = candidate.category === product.category ? 4 : 0;
      const useCaseScore = candidate.useCases.filter((useCase) =>
        product.useCases.includes(useCase),
      ).length;
      return { candidate, score: categoryScore + useCaseScore + candidate.rating / 10 };
    })
    .toSorted((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}

export function getAgentCatalogContext(locale: "id" | "en" = "en") {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    category: product.category,
    categoryLabel: categoryLabels[product.category][locale],
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    discountLabel: product.discountLabel,
    availability: product.availability,
    availabilityLabel: availabilityLabels[product.availability][locale],
    rating: product.rating,
    badges: product.badges,
    variants: product.variants.map((variant) => ({
      id: variant.id,
      name: variant.name,
      price: variant.price ?? product.price,
    })),
    capacity: product.capacity,
    weather: product.weather,
    useCases: product.useCases,
    bestSeller: Boolean(product.bestSeller),
    productPath: `/products/${product.slug}`,
    features: product.features.slice(0, 4),
  }));
}
