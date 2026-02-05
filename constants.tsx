
import React from 'react';
import { Service, Testimonial, FaqItem } from './types';

export const SERVICES: Service[] = [
  {
    id: 'bridal',
    title: 'Noivas Premium',
    category: 'bridal',
    description: 'O "Dia do Sim" merece a perfeição. Maquiagem personalizada focada em durabilidade emocional e técnica.',
    image: 'https://images.unsplash.com/photo-1594465911080-dd02fc11999a?q=80&w=1964&auto=format&fit=crop'
  },
  {
    id: 'social',
    title: 'Produção Social',
    category: 'social',
    description: 'Formaturas e eventos de luxo. A elegância que realça sua beleza natural para brilhar na festa inteira.',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: 'artistic',
    title: 'Art Lab',
    category: 'artistic',
    description: 'Transformações disruptivas para editoriais, Halloween e projetos criativos exclusivos.',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1935&auto=format&fit=crop'
  },
  {
    id: 'education',
    title: 'Workshops & Cursos',
    category: 'education',
    description: 'Aprenda os segredos da Pele Blindada e técnicas profissionais em cursos VIP de automaquiagem.',
    image: 'https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=2070&auto=format&fit=crop'
  }
];

export const ART_GALLERY_IMAGES = [
  // NOIVAS
  {
    url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1887&auto=format&fit=crop',
    title: 'Noiva Minimalista',
    desc: 'Foco na luminosidade natural e sofisticação.',
    category: 'noivas'
  },
  {
    url: 'https://images.unsplash.com/photo-1594465911080-dd02fc11999a?q=80&w=1964&auto=format&fit=crop',
    title: 'Bridal Glow',
    desc: 'Preparação de pele com técnica blindada.',
    category: 'noivas'
  },
  // FORMANDAS
  {
    url: 'https://images.unsplash.com/photo-1523264629844-40dd6bf17c2b?q=80&w=1887&auto=format&fit=crop',
    title: 'Destaque Festivo',
    desc: 'Olhar marcante para registros inesquecíveis.',
    category: 'formandas'
  },
  {
    url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop',
    title: 'Elegância Formanda',
    desc: 'Cores vibrantes e acabamento impecável.',
    category: 'formandas'
  },
  // SOCIAIS
  {
    url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop',
    title: 'Evento de Gala',
    desc: 'Equilíbrio perfeito entre clássico e moderno.',
    category: 'sociais'
  },
  {
    url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop',
    title: 'Social Chic',
    desc: 'Beleza atemporal para convidadas especiais.',
    category: 'sociais'
  },
  // ARTÍSTICAS
  {
    url: 'https://images.unsplash.com/photo-1525286335722-c30c6b5df541?q=80&w=1887&auto=format&fit=crop',
    title: 'Neon Renaissance',
    desc: 'Fusão de técnicas clássicas com iluminação ultravioleta.',
    category: 'artisticas'
  },
  {
    url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1935&auto=format&fit=crop',
    title: 'Surrealist Concept',
    desc: 'Exploração de formas e desconstrução da simetria.',
    category: 'artisticas'
  },
  {
    url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop',
    title: 'Editorial High Fashion',
    desc: 'Passarela e texturas experimentais.',
    category: 'artisticas'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Carolina Mendes',
    role: 'Noiva 2024',
    content: 'A maquiagem da Lara não é só estética, é confiança. Chorei horrores no meu casamento e a pele continuou impecável até o final da festa. Realmente blindada!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Beatriz Soares',
    role: 'Formanda Medicina',
    content: 'Sou apaixonada pelo acabamento glow que ela faz. Não fica pesado, mas cobre tudo. Me senti a versão mais linda de mim mesma.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Isadora Quintão',
    role: 'Influenciadora',
    content: 'Trabalho com imagem e a Lara é minha escolha número 1 em BH. Sensibilidade artística e técnica de alto nível.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop'
  }
];

export const FAQ: FaqItem[] = [
  {
    question: "Quanto tempo dura a técnica de Pele Blindada?",
    answer: "A técnica é projetada para resistir a atrito, suor, lágrimas e abraços por até 16 horas, mantendo o acabamento original."
  },
  {
    question: "Você atende em domicílio ou no estúdio?",
    answer: "Atendo em um salão na região do Lourdes, em BH, mas também realizo atendimentos externos para noivas em hotéis ou casamentos fora da cidade."
  },
  {
    question: "Quais marcas de produtos você utiliza?",
    answer: "Utilizo curadoria de marcas premium internacionais (MAC, Dior, Nars, Too Faced, Chanel, Kryolan) e o melhor da tecnologia nacional para garantir durabilidade."
  },
  {
    question: "Como funciona o teste de noiva?",
    answer: "O teste é uma etapa fundamental onde construímos o visual dos seus sonhos com calma, testando luzes e produtos meses antes do grande dia."
  }
];

export const NAVIGATION = [
  { label: 'O Conceito', href: '#concept' },
  { label: 'Pele Blindada', href: '#shield' },
  { label: 'Serviços', href: '#services' },
  { label: 'Art Lab', href: '#art' },
  { label: 'Cursos', href: '#education' },
  { label: 'Sobre', href: '#about' },
  { label: 'Depoimentos', href: '#testimonials' },
];
