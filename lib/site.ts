export const siteConfig = {
  name: "LS Solutions",
  // Digits only, in international format, for wa.me links
  whatsappNumber: "573019649834",
  whatsappDisplay: "+57 301 9649834",
  instagram: "https://instagram.com/ls__solutions",
  instagramHandle: "@ls__solutions",
  facebook: "https://facebook.com/profile.php?id=61565210589149",
  facebookHandle: "LS Solutions",
}

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
