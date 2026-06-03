export const store = {
  name: "Alltrek Indonesia",
  address:
    "Jl. Mandala Raya No.8, Tomang, Kec. Grogol petamburan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11440",
  phone: "0813-1220-2716",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281312202716",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Alltrek%20Indonesia%20Jl.%20Mandala%20Raya%20No.8%20Tomang%20Jakarta%20Barat",
  hours: [
    { dayId: "Senin-Sabtu", dayEn: "Monday-Saturday", time: "09.00-20.00" },
    { dayId: "Minggu", dayEn: "Sunday", time: "10.00-20.00" },
  ],
  tokopediaUrl: process.env.NEXT_PUBLIC_TOKOPEDIA_URL ?? "https://www.tokopedia.com/alltrek",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  socialLinks: [
    { label: "Instagram", href: "https://www.instagram.com/alltrekindonesia" },
    { label: "TikTok", href: "https://www.tiktok.com/@alltrekindonesia" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/alltrek-indonesia" },
    { label: "YouTube", href: "https://www.youtube.com/@alltrekoutdoor" },
  ],
  youtube: {
    channel: "Alltrek Outdoor",
    handle: "@alltrekoutdoor",
    description: "HIGH QUALITY CAMPING LIFESTYLE",
    recentVideos: [
      "Tutorial Set Up Tenda Glamping STRIN Piramida ALLTREK",
      "A Complete Guide to Shopping on the Alltrek Indonesia Website",
      "RAPTOR TENT #alltrek #camping #outdoors #gear #camp #outdoorgearreview #bigtent",
      "SoloCamp dengan Russel Lamp #alltrek #camping #outdoorgearreview #outdoors #camp #gear #outdoor",
    ],
  },
};

export function getWhatsAppUrl(message: string) {
  return `https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
