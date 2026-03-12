
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ContentState } from './types';
import { SERVICES, TESTIMONIALS, FAQ, NAVIGATION, ART_GALLERY_IMAGES } from './constants';
import { supabase } from './App';

const defaultContent: ContentState = {
  global: {
    primaryColor: '#D4AF37',
    secondaryColor: '#E5BDBB'
  },
  navbar: {
    brandName: 'Lara Luíza',
    brandSubtitle: 'Makeup Artist & Educator',
    ctaText: 'Agendar Agora',
    ctaLink: 'https://wa.me/5538992210136',
    items: NAVIGATION
  },
  hero: {
    title: 'Beleza',
    titleHighlight: 'Natural',
    subtitle: 'Realçando belezas através da maquiagem',
    bgImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop',
    bgImageMobile: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1080&auto=format&fit=crop',
    button1Text: 'Ver Portfólio',
    button1Link: '#portfolio', 
    button2Text: 'Agendar Data',
    button2Link: 'https://wa.me/5538992210136',
    scrollText: 'Scroll to Discover'
  },
  concept: {
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop',
    imageMobile: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1080&auto=format&fit=crop',
    yearsNumber: '+8',
    yearsText: 'Anos de Experiência',
    subtitle: 'O Conceito',
    title: 'A BELEZA DE SER VOCÊ.',
    description: 'Referência em Belo Horizonte, Lara Luiza Castro construiu sua trajetória combinando técnica apurada e olhar artístico. Seu trabalho é marcado por maquiagens de acabamento natural, elegantes e de longa duração.',
    diff1Title: 'Efeito Glow',
    diff1Desc: 'Luminosidade estratégica para fotos e vídeos.',
    diff2Title: 'Durabilidade',
    diff2Desc: 'Produtos de excelência para um resultado impecável.'
  },
  shield: {
    subtitle: 'Exclusividade Técnica',
    title: 'A Lendária Pele Blindada',
    quote: '"Chore, dance, abrace. Sua beleza permanecerá intacta até o último minuto."',
    cards: [
      { title: 'À prova de lágrimas', desc: 'Sua emoção não marca seu rosto.' },
      { title: 'Suor & Calor', desc: 'Impecável mesmo no auge da pista.' },
      { title: 'Atrito zero', desc: 'Livre para abraçar quem você ama.' }
    ]
  },
  services: {
    subtitle: 'Serviços',
    title: 'Experiências de Transformação',
    items: SERVICES
  },
  artLab: {
    title: 'The Art Lab',
    description: 'Onde o clássico encontra o surreal. Produções artísticas, conceituais e temáticas que transcendem o convencional.',
    buttonText: 'Explorar Portfólio Completo',
    bgImage: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1935&auto=format&fit=crop',
    overlayTitle: 'Sua visão, seu estilo.',
    overlaySubtitle: 'The Art Lab Portfolio',
    overlayDesc: '"Cada categoria reflete um compromisso único com a sua essência e o momento que você está vivendo."',
    galleryImages: ART_GALLERY_IMAGES
  },
  education: {
    subtitle: 'Educação',
    title: 'Domine sua própria beleza',
    description: 'Nossos cursos de automaquiagem são desenhados para a mulher moderna que deseja autonomia. Aprenda do básico ao avançado, com foco na técnica de Pele Blindada Profissional adaptada para o seu dia a dia.',
    list: [
      'Consultoria de Visagismo',
      'Técnicas de esfumado clássico',
      'Preparação de pele de alta durabilidade',
      'Curadoria de produtos essenciais',
      'Personal Shopper - Orientação individual.'
    ],
    buttonText: 'Entrar na Lista de Espera',
    badgeText: 'Cursos VIP',
    image: 'https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=2070&auto=format&fit=crop',
    waitlistPopup: {
      title: 'Sua vaga está quase lá.',
      subtitle: 'A beleza é o espelho da alma...',
      text: '"A beleza é o espelho da alma, e eu quero te ensinar a refleti-la com perfeição."\n\nNossos cursos VIP têm alta procura. Entre em contato para garantir sua prioridade na próxima turma.',
      buttonText: 'Falar com a Lara agora'
    }
  },
  about: {
    subtitle: 'Sobre',
    title: 'Atrás dos pincéis',
    image: 'https://images.unsplash.com/photo-1594744803329-a584af1cae24?q=80&w=1887&auto=format&fit=crop',
    imageMobile: 'https://images.unsplash.com/photo-1594744803329-a584af1cae24?q=80&w=1080&auto=format&fit=crop',
    paragraphs: [
      'Sou Lara Luíza Castro, maquiadora profissional há mais de 8 anos, movida pela paixão em realçar belezas e ajudar mulheres a realizarem seus sonhos.',
      'Acredito em uma beleza leve, confortável e duradoura. Meu maior orgulho é quando a cliente se olha no espelho e diz: “Sou eu, só que ainda mais linda.”',
      'Cada detalhe do meu trabalho é feito con carinho, técnica e sensibilidade. Mais do que maquiagem, entrego confiança e bem-estar.'
    ]
  },
  testimonials: {
    subtitle: 'Testemunhos',
    title: 'Relatos de Confiança',
    items: TESTIMONIALS
  },
  faq: {
    subtitle: 'Suporte',
    title: 'Dúvidas Frequentes',
    items: FAQ
  },
  location: {
    subtitle: 'Localização',
    title: 'Visite-nos no Lourdes',
    address: 'Rua Alvarenga Peixoto, 575 - Lourdes',
    whatsappDisplay: '(38) 992210136',
    instagramDisplay: '@laraluizamakeup_',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3750.840733036667!2d-43.9452296!3d-19.9304907!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999086968037%3A0x6a0537f5979f4d7b!2sR.%20Alvarenga%20Peixoto%2C%20575%20-%20Lourdes%2C%20Belo%20Horizonte%20-%20MG%2C%2030180-120!5e0!3m2!1spt-BR!2sbr!4v1714850000000!5m2!1spt-BR!2sbr',
    ctaTitle: 'Pronta para brilhar?',
    ctaText: 'Seja para seu casamento, formatura ou apenas para aprender a se maquiar, estou aqui para te ouvir.',
    ctaButton: 'Falar com Lara agora'
  },
  footer: {
    bio: 'Maquiadora há 8 anos em Belo Horizonte. Especialista em Noivas, Pele Blindada e Maquiagem Artística.',
    instagramMain: 'https://instagram.com/laraluizamakeup_',
    instagramArt: 'https://instagram.com/laraluizaart',
    floatingCtaText: 'Online'
  }
};

interface ContentContextType {
  content: ContentState;
  loading: boolean;
  updateContent: (section: keyof ContentState, data: any) => void;
  updateNestedContent: (path: string[], value: any) => void;
  saveToSupabase: () => Promise<boolean>;
  resetContent: () => void;
  reloadFromSupabase: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<ContentState>(defaultContent);
  const [loading, setLoading] = useState(true);

  const fetchContent = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .order('id', { ascending: false })
        .limit(1)
        .single();

      if (data && data.content) {
        setContent((prev) => ({ ...prev, ...data.content }));
      }
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch content from Supabase on mount
  useEffect(() => {
    fetchContent();
  }, []);

  const updateContent = (section: keyof ContentState, data: any) => {
    setContent(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const updateNestedContent = (path: string[], value: any) => {
    setContent(prev => {
      const newContent = { ...prev };
      let current: any = newContent;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newContent;
    });
  };

  const saveToSupabase = async () => {
    try {
        // We use upsert to always keep one main record or create a new version row
        const { error } = await supabase
            .from('site_content')
            .insert([{ content: content }]); // Insert new row for history (optional) or use upsert for single row
        
        if (error) throw error;
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
  };

  const resetContent = () => {
    setContent(defaultContent);
  };

  const reloadFromSupabase = async () => {
    await fetchContent();
  };

  return (
    <ContentContext.Provider value={{ content, loading, updateContent, updateNestedContent, saveToSupabase, resetContent, reloadFromSupabase }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
