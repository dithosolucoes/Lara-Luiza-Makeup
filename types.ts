
export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'social' | 'bridal' | 'artistic' | 'education';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface GalleryImage {
  url: string;
  title: string;
  desc: string;
  category: string;
}

// Full Site Content Structure
export interface ContentState {
  global: {
    primaryColor: string;
    secondaryColor: string;
  };
  navbar: {
    brandName: string;
    brandSubtitle: string;
    ctaText: string;
    ctaLink: string;
    items: NavItem[];
  };
  hero: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    bgImage: string;
    button1Text: string;
    button1Link: string;
    button2Text: string;
    button2Link: string;
    scrollText: string;
  };
  concept: {
    image: string;
    yearsNumber: string;
    yearsText: string;
    title: string;
    subtitle: string;
    description: string;
    diff1Title: string;
    diff1Desc: string;
    diff2Title: string;
    diff2Desc: string;
  };
  shield: {
    title: string;
    subtitle: string;
    quote: string;
    cards: { title: string; desc: string }[];
  };
  services: {
    title: string;
    subtitle: string;
    items: Service[];
  };
  artLab: {
    title: string;
    description: string;
    buttonText: string;
    bgImage: string;
    overlayTitle: string;
    overlaySubtitle: string;
    overlayDesc: string;
    galleryImages: GalleryImage[];
  };
  education: {
    title: string;
    subtitle: string;
    description: string;
    list: string[]; // Array of strings for the bullet points
    buttonText: string;
    badgeText: string;
    image: string;
    waitlistPopup: {
      title: string;
      subtitle: string;
      text: string;
      buttonText: string;
    }
  };
  about: {
    title: string;
    subtitle: string;
    image: string;
    paragraphs: string[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Testimonial[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  location: {
    title: string;
    subtitle: string;
    address: string;
    whatsappDisplay: string;
    instagramDisplay: string;
    mapUrl: string;
    ctaTitle: string;
    ctaText: string;
    ctaButton: string;
  };
  footer: {
    bio: string;
    instagramMain: string;
    instagramArt: string;
    floatingCtaText: string;
  };
}
