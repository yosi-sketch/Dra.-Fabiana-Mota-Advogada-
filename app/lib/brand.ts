// Dados públicos fornecidos pelo cliente em 19/10/2026.
export const brand = {
  name: "Dra. Fabiana Mota",
  businessName: "Dra. Fabiana Mota — Advogada Previdenciária",
  phone: "(34) 99150-2835",
  phoneDigits: "5534991502835",
  whatsappDigits: "5534991502835",
  address: "Av. Antônio Carlos, 265 — Sala 3 — Centro, Araxá — MG, 38183-083",
  location: "Araxá · MG",
  logo: "/fabiana-mota-logo.png",
  portrait: "/fabiana-mota-retrato.jpg",
  institutionalPhoto: "/fabiana-mota-institucional.png",
  googleReviewCount: 33,
  googleRating: 5,
  googleReviewsProvidedOn: "19/10/2026",
  instagram: "https://www.instagram.com/fabianamotaadvogada/",
  instagramHandle: "@fabianamotaadvogada",
};

export function whatsappFor(subject?: string) {
  const message = subject
    ? `Olá, Dra. Fabiana! Gostaria de informações sobre ${subject}.`
    : "Olá, Dra. Fabiana! Gostaria de informações para agendar um atendimento previdenciário.";
  return `https://wa.me/${brand.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export const whatsapp = whatsappFor();
export const contact = whatsapp;
export const telephone = `tel:+${brand.phoneDigits}`;
export const maps = "https://www.google.com/maps?cid=7239841301722783520";
export const reviews = maps;
