export const brand = {
  name: "WebRiseHub",
  tagline: "Websites that turn visitors into leads.",
  subtagline:
    "Premium design, clean messaging, and fast performance—built for service businesses in India and the US."
};

// Replace these with your real links later (or set env vars in .env.local)
export const links = {
  bookCall:
    process.env.NEXT_PUBLIC_BOOK_CALL_URL ??
    "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1sXQu80QBDUEoX3otyJ9hgnvcFaZ8K_D3VzKSDIgDTqyatmBAkpmXHoVg7U4WT7sDKZLqdRsg0?gv=true",
  whatsapp:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ??
    "https://wa.me/91XXXXXXXXXX", // placeholder
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "donbosco.menezes@webrisehub.com"
};

export const socialProof = {
  regionLine: "Web design + marketing for 🇮🇳 India & 🇺🇸 US businesses",
};

export const services = [
  {
    title: "Web Development",
    desc: "High-performance websites and landing pages with clear messaging, strong CTAs, and mobile-first layouts."
  },
  {
    title: "Performance Marketing",
    desc: "Google & Meta ad funnels, landing page alignment, and tracking setup so you know what’s working."
  },
  {
    title: "SEO & Growth Systems",
    desc: "Technical SEO, local SEO foundations, and content structure that helps you rank and convert over time."
  }
];

export const portfolioItems = [
  {
    title: "Service Business Website",
    desc: "Hero message, trust sections, and booking CTA—structured for leads, not just aesthetics.",
    tag: "Website"
  },
  {
    title: "Lead-Gen Landing Page",
    desc: "Ad-ready page with one goal: capture inquiries. Clear offer, proof, and frictionless form flow.",
    tag: "Landing"
  },
  {
    title: "Local SEO Starter Setup",
    desc: "On-page SEO basics, location intent pages, and technical cleanup to build a strong ranking foundation.",
    tag: "SEO"
  }
];

export const pricing = [
  {
    name: "Starter",
    price: "Custom quote",
    points: [
      "1–3 page website",
      "Mobile-first layout",
      "Fast load + basics of SEO",
      "Contact/WhatsApp CTA",
      "Launch checklist"
    ]
  },
  {
    name: "Growth",
    price: "Custom quote",
    points: [
      "Multi-page website",
      "Lead capture (forms + thank-you page)",
      "Analytics + conversion tracking",
      "Speed optimization",
      "Copy structure + section improvements"
    ]
  },
  {
    name: "Scale",
    price: "Custom quote",
    points: [
      "Full website + landing pages",
      "Funnels for ads traffic",
      "SEO structure + content plan",
      "Monthly iteration (design + conversion)",
      "Priority support"
    ]
  }
];