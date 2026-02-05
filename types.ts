
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
