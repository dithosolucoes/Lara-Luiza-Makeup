import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useContent } from './ContentContext';

const glossData = {
  hibisco: {
    id: 'hibisco',
    name: 'Hibisco',
    color: '#D81B2A',
    bgColor: '#000000',
    textColor: '#ffffff',
    images: [
      'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=1780&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6ece?q=80&w=1974&auto=format&fit=crop'
    ],
    description: 'Realça a beleza dos lábios com um toque de cor suave e natural. Perfeito para o dia a dia, com um efeito saudável e radiante.',
  },
  peonia: {
    id: 'peonia',
    name: 'Peônia',
    color: '#E58EB0',
    bgColor: '#ffffff',
    textColor: '#ffffff',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1915&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=2024&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1953&auto=format&fit=crop'
    ],
    description: 'Um rosa mais frio e translúcido que ilumina com delicadeza e elegância.',
  }
};

const ImageCarousel = ({ images, activeColor }: { images: string[], activeColor: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-lg mx-auto h-[60vh] flex items-center justify-center overflow-hidden rounded-3xl group shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-4 p-3 text-white bg-black/40 hover:bg-black/80 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 p-3 text-white bg-black/40 hover:bg-black/80 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'scale-125 w-6' : 'bg-white/60 hover:bg-white'
            }`}
            style={{ backgroundColor: idx === currentIndex ? activeColor : 'rgba(255,255,255,0.6)' }}
          />
        ))}
      </div>
    </div>
  );
};

export const GlossStore = () => {
  const { content } = useContent();
  const [selected, setSelected] = useState<'hibisco' | 'peonia' | null>(null);
  const [{ split, animating }, setSplitState] = useState({ split: 50, animating: false });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearSelectionTimer = () => {
    if (dragTimerRef.current) {
      clearTimeout(dragTimerRef.current);
      dragTimerRef.current = null;
    }
  };

  const startSelectionTimer = (color: 'hibisco' | 'peonia') => {
    if (dragTimerRef.current) return;
    dragTimerRef.current = setTimeout(() => {
      setSelected(color);
      clearSelectionTimer();
    }, 400);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (selected || animating) return;
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const percentage = Math.max(0, Math.min((x / width) * 100, 100));
    setSplitState({ split: percentage, animating: false });

    if (percentage > 90) {
      startSelectionTimer('peonia');
    } else if (percentage < 10) {
      startSelectionTimer('hibisco');
    } else {
      clearSelectionTimer();
    }
  };

  const handlePointerLeave = () => {
    if (selected || animating) return;
    clearSelectionTimer();
    setSplitState({ split: 50, animating: true });
    setTimeout(() => setSplitState(s => ({ ...s, animating: false })), 500);
  };

  const handlePointerUp = () => {
    if (selected || animating) return;
    clearSelectionTimer();
    
    if (split > 85) {
      setSelected('peonia');
    } else if (split < 15) {
      setSelected('hibisco');
    } else {
      // On mobile touch end, spring back to 50
      setSplitState({ split: 50, animating: true });
      setTimeout(() => setSplitState(s => ({ ...s, animating: false })), 500);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (selected) return;
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const percentage = (x / width) * 100;
    
    // Explicit click on the halves
    if (percentage < 50) {
      setSelected('peonia');
    } else {
      setSelected('hibisco');
    }
  };

  useEffect(() => {
    if (selected === 'peonia') {
      setSplitState({ split: 100, animating: true }); // Peônia is top layer, fill it entirely
    } else if (selected === 'hibisco') {
      setSplitState({ split: 0, animating: true }); // Hibisco is base layer, hide top layer
    } else {
      setSplitState({ split: 50, animating: true });
      const timer = setTimeout(() => setSplitState(s => ({ ...s, animating: false })), 700);
      return () => {
        clearTimeout(timer);
        clearSelectionTimer();
      };
    }
  }, [selected]);

  const activeData = selected ? glossData[selected] : null;

  // Use images from context
  const getImages = (type: 'hibisco' | 'peonia') => {
    if (type === 'hibisco') {
        return content.glossStore?.hibiscoImages?.map((i: any) => i.url) || glossData.hibisco.images;
    }
    return content.glossStore?.peoniaImages?.map((i: any) => i.url) || glossData.peonia.images;
  };

  const getHomeBg = (type: 'hibisco' | 'peonia') => {
    if (type === 'hibisco') {
        return content.glossStore?.hibiscoHomeBg || getImages('hibisco')[0];
    }
    return content.glossStore?.peoniaHomeBg || getImages('peonia')[0];
  };

  return (
    <div 
      className="relative w-full h-[100dvh] overflow-hidden selection:bg-brand-gold selection:text-black font-sans bg-black"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      ref={containerRef}
      style={{ cursor: selected ? 'default' : 'ew-resize', touchAction: 'none' }}
    >
      {/* Instructional text (mix-blend so it adapts to both backgrounds) */}
      <div 
        className="absolute top-28 md:top-36 inset-x-0 z-30 pointer-events-none flex justify-center opacity-0 md:opacity-40 transition-opacity duration-1000 mix-blend-difference"
        style={{ opacity: selected ? 0 : 0.6 }}
      >
         <p className="font-serif italic text-sm md:text-base text-white text-center px-4 leading-relaxed">
           Arraste e segure nas laterais,<br className="md:hidden" /> ou clique para escolher a sua cor
         </p>
      </div>

      {/* Base Layer: Hibisco (Cover Image) */}
      <div className="absolute inset-0 w-full h-full text-white flex items-center pt-20">
         <div className="absolute inset-0 bg-black">
           <img src={getHomeBg('hibisco')} alt="Hibisco Fundo" className="w-full h-full object-contain opacity-80" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
         </div>
         <div 
           className="absolute right-0 w-[50vw] h-full flex flex-col justify-center items-center px-4 md:px-6 text-center z-10 transition-opacity duration-200"
           style={{ 
             opacity: selected ? 0 : Math.min(1, Math.max(0, 1 - (split - 50) / 15)), 
             pointerEvents: selected ? 'none' : 'auto' 
           }}
         >
             <span className="uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs text-white/70 font-bold mb-3 block">Experimente a intensidade</span>
             <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" style={{color: glossData.hibisco.color}}>HIBISCO</h2>
             <p className="text-white/80 max-w-[160px] sm:max-w-[220px] md:max-w-sm mx-auto text-xs sm:text-sm md:text-base leading-snug md:leading-relaxed drop-shadow-md">Realça a beleza dos lábios com um toque de cor suave e natural. Perfeito para o dia a dia, com um efeito saudável e radiante.</p>
         </div>
      </div>

      {/* Top Layer: Peônia (Cover Image) - Clipped */}
      <div 
        className={`absolute inset-0 w-full h-full text-white flex items-center pt-20 shadow-[5px_0_20px_rgba(0,0,0,0.5)] ${animating ? 'transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]' : ''}`}
        style={{ clipPath: `polygon(0 0, ${split}% 0, ${split}% 100%, 0 100%)` }}
      >
         <div className="absolute inset-0 bg-black">
           <img src={getHomeBg('peonia')} alt="Peônia Fundo" className="w-full h-full object-contain opacity-80" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60" />
         </div>
         <div 
           className="absolute left-0 w-[50vw] h-full flex flex-col justify-center items-center px-4 md:px-6 text-center z-10 transition-opacity duration-200"
           style={{ 
             opacity: selected ? 0 : Math.min(1, Math.max(0, 1 - (50 - split) / 15)), 
             pointerEvents: selected ? 'none' : 'auto' 
           }}
         >
            <span className="uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-xs text-white/70 font-bold mb-3 block">ROSA TRANSLÚCIDO E FRIO</span>
            <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic mb-4 drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" style={{color: glossData.peonia.color}}>PEÔNIA</h2>
            <p className="text-white/80 max-w-[160px] sm:max-w-[220px] md:max-w-sm mx-auto text-xs sm:text-sm md:text-base leading-snug md:leading-relaxed drop-shadow-md">Um rosa mais frio e translúcido que ilumina com delicadeza e elegância.</p>
         </div>
      </div>

      {/* Center Divider UI (Slider Handle) */}
      {!selected && (
        <div 
          className={`absolute inset-y-0 w-[1px] bg-white/20 pointer-events-none z-10 mix-blend-difference ${animating ? 'transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]' : ''}`}
          style={{ left: `${split}%`, transform: 'translateX(-50%)' }}
        >
          {/* Handle Widget */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center shadow-2xl mix-blend-normal">
            <div className="flex gap-0.5">
              <ChevronLeft size={12} className="text-white" />
              <ChevronRight size={12} className="text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Detail Overlay */}
      <AnimatePresence>
        {selected && activeData && (
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.95 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="absolute inset-0 z-20 flex flex-col items-center pt-28 px-6 overflow-y-auto pb-12 bg-black/60 backdrop-blur-[2px]"
             style={{ color: activeData.textColor }}
          >
             <button 
               onClick={(e) => { e.stopPropagation(); setSelected(null); window.scrollTo(0,0); }}
               className="fixed top-24 left-6 md:left-12 z-[100] flex items-center gap-2 font-bold uppercase tracking-widest text-xs hover:opacity-70 transition-opacity bg-black/10 backdrop-blur-md px-4 py-2 rounded-full"
               style={{ color: activeData.textColor }}
             >
                <ArrowLeft size={16} /> Voltar
             </button>

             <div className="container mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-12 md:mt-20">
                <div className="order-2 lg:order-1 flex flex-col items-start pt-8 lg:pt-0">
                   <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-50 mb-4 inline-block border px-3 py-1 rounded-full" style={{ borderColor: `${activeData.textColor}30` }}>
                     Coleção Exclusiva
                   </span>
                   <h2 
                     className="text-6xl md:text-8xl font-serif uppercase italic mb-6 leading-none"
                     style={{ color: activeData.color }}
                   >
                     {activeData.name}
                   </h2>
                   <p className="text-xl mb-12 font-light opacity-80 leading-relaxed max-w-lg">
                     {activeData.description}
                   </p>

                   <div className="space-y-6 w-full max-w-md">
                     <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: `${activeData.textColor}30` }}>
                       <span className="opacity-70 text-sm uppercase tracking-widest">Acabamento</span>
                       <span className="font-bold text-sm">Brilhante</span>
                     </div>
                     <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: `${activeData.textColor}30` }}>
                       <span className="opacity-70 text-sm uppercase tracking-widest">Textura</span>
                       <span className="font-bold text-sm">Leve</span>
                     </div>
                     <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: `${activeData.textColor}30` }}>
                       <span className="opacity-70 text-sm uppercase tracking-widest">Destaque</span>
                       <span className="font-bold text-sm">Ácido Hialurônico</span>
                     </div>
                   </div>

                   <motion.button 
                     onClick={() => window.open(content.navbar.ctaLink, '_blank')}
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     className="mt-12 px-10 py-5 font-bold uppercase tracking-widest text-sm transition-transform rounded-full flex items-center justify-center gap-3 w-full max-w-md shadow-2xl"
                     style={{ backgroundColor: activeData.color, color: '#ffffff' }}
                   >
                     PEÇA AGORA <ShoppingBag size={18} />
                   </motion.button>
                </div>

                <div className="order-1 lg:order-2 w-full mt-10 lg:mt-0">
                   <ImageCarousel images={getImages(selected)} activeColor={activeData.color} />
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

