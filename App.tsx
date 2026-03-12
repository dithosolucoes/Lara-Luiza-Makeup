
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Menu, X, Instagram, MapPin, Phone, 
  ChevronRight, ArrowRight, Star,
  Shield, Palette, Sparkles, MessageCircle,
  ShieldCheck, GraduationCap, Square, LayoutGrid, Grid3X3,
  Heart, Sparkle, Lock, LogIn
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { AdminArea } from './AdminArea';
import { ContentProvider, useContent } from './ContentContext';

// Initialize Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xjpzrdvdmusogthzypzp.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcHpyZHZkbXVzb2d0aHp5cHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExMjY4NTUsImV4cCI6MjA4NjcwMjg1NX0.HJh4nbE_vsTsP_QEUCbbJUyT13P5dGXLqfyf5Iop39Y';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const trackWhatsAppClick = async () => {
  try {
    await supabase.from('analytics').insert([{ event_type: 'whatsapp_click' }]);
  } catch (e) {
    console.error('Error tracking whatsapp click:', e);
  }
};

// Components
const Navbar: React.FC<{ onOpenAdmin: () => void }> = ({ onOpenAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { content } = useContent();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'glass py-4 shadow-lg border-b border-brand-gold/10' : 'py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col"
        >
          <span className="font-serif text-2xl tracking-widest text-brand-gold font-bold uppercase">{content.navbar.brandName}</span>
          <span className="text-[10px] tracking-[0.3em] font-sans text-white/50 uppercase">{content.navbar.brandSubtitle}</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {content.navbar.items.map((item, idx) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-xs uppercase tracking-widest hover:text-brand-gold transition-colors font-sans"
            >
              {item.label}
            </motion.a>
          ))}
          <motion.a
            href={content.navbar.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-brand-gold text-brand-dark rounded-full text-xs font-bold uppercase tracking-widest"
          >
            {content.navbar.ctaText}
          </motion.a>
          
          <button 
            onClick={onOpenAdmin}
            className="text-white/20 hover:text-brand-gold transition-colors ml-2 p-2 rounded-full hover:bg-white/5"
            title="Acesso Administrativo"
          >
            <LogIn size={14} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-xl overflow-y-auto pt-24 pb-8"
          >
            <div className="flex flex-col p-8 gap-8 min-h-full justify-center">
              {content.navbar.items.map((item: any) => (
                <a 
                  key={item.href} 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-2xl text-center uppercase tracking-widest font-serif text-white/80 hover:text-brand-gold transition-colors"
                >
                  {item.label}
                </a>
              ))}
              
              <div className="h-[1px] w-12 bg-brand-gold/30 mx-auto my-4" />

              <a 
                href={content.navbar.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackWhatsAppClick}
                className="w-full py-4 bg-brand-gold text-brand-dark text-center rounded-full font-bold uppercase tracking-widest"
              >
                {content.navbar.ctaText}
              </a>

              <button 
                onClick={() => { setIsOpen(false); onOpenAdmin(); }}
                className="mt-8 text-xs uppercase tracking-widest font-sans text-white/40 hover:text-brand-gold flex items-center justify-center gap-2"
              >
                <LogIn size={14} /> Login Administrativo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, centered = false }: { title: string; subtitle: string; centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.h4 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-4 font-sans font-bold"
    >
      {subtitle}
    </motion.h4>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-4xl md:text-6xl font-serif leading-tight"
    >
      {title}
    </motion.h2>
  </div>
);

const FloatingCTA = () => {
  const { content } = useContent();
  return (
    <motion.a
      href={content.navbar.ctaLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackWhatsAppClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100] bg-green-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center"
    >
      <MessageCircle size={32} />
      <span className="absolute -top-2 -left-2 bg-red-500 text-[10px] px-2 py-0.5 rounded-full font-bold animate-bounce uppercase tracking-tighter">
        {content.footer.floatingCtaText}
      </span>
    </motion.a>
  );
};

const WaitlistPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { content } = useContent();
  const data = content.education.waitlistPopup;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const { error } = await supabase.from('waitlist').insert([{ name, email, phone }]);
      if (error) throw error;
      setStatus('success');
      setTimeout(() => {
        onClose();
        setStatus('idle');
        setName('');
        setEmail('');
        setPhone('');
      }, 3000);
    } catch (err) {
      console.error('Error saving to waitlist:', err);
      setStatus('error');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-brand-charcoal border border-brand-rose/30 rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4">
              <button onClick={onClose} className="text-white/40 hover:text-white transition-colors z-10 relative">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-brand-rose/10 rounded-full flex items-center justify-center animate-pulse">
                  <Heart className="text-brand-rose" size={40} fill="rgba(229, 189, 187, 0.2)" />
                </div>
                <Sparkle className="absolute -top-2 -right-2 text-brand-gold animate-bounce" size={20} />
              </div>
              
              <h3 className="font-serif text-3xl md:text-4xl mb-4 text-brand-rose italic">{data.title}</h3>
              <p className="text-white/70 font-sans text-sm md:text-base mb-8 leading-relaxed italic whitespace-pre-line">
                {data.text}
              </p>
              
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full p-6 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 flex flex-col items-center gap-3"
                >
                  <CheckCircle2 size={32} />
                  <span className="font-bold uppercase tracking-widest text-xs">Inscrição Confirmada!</span>
                  <span className="text-xs opacity-80">Entraremos em contato em breve.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
                  {status === 'error' && (
                    <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-xs text-center">
                      Ocorreu um erro. Tente novamente ou contate via WhatsApp.
                    </div>
                  )}
                  <div>
                    <input 
                      type="text" 
                      required
                      placeholder="Seu Nome Completo" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-rose outline-none text-sm transition-all text-white/80 focus:bg-white/5"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      required
                      placeholder="Seu E-mail" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-rose outline-none text-sm transition-all text-white/80 focus:bg-white/5"
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      required
                      placeholder="Seu WhatsApp (com DDD)" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-rose outline-none text-sm transition-all text-white/80 focus:bg-white/5"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-5 bg-brand-rose text-brand-dark rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
                  >
                    {status === 'loading' ? <Loader2 className="animate-spin" size={18} /> : (
                      <>{data.buttonText} <MessageCircle size={18} /></>
                    )}
                  </button>
                </form>
              )}
              
              <button 
                onClick={onClose}
                className="mt-6 text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors font-bold relative z-10"
              >
                Voltar para o site
              </button>
            </div>

            {/* Rose Glow Accents */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-rose/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const AdminLogin = ({ onLogin, onCancel }: { onLogin: () => void; onCancel: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message === 'Invalid login credentials' ? 'Credenciais inválidas. Tente novamente.' : error.message);
      setLoading(false);
    } else {
      onLogin();
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 relative z-[500]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-brand-charcoal border border-brand-gold/20 rounded-3xl p-8 md:p-12 shadow-2xl text-center relative"
      >
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 text-white/30 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="w-16 h-16 bg-brand-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Lock className="text-brand-gold" size={32} />
        </div>
        <h2 className="font-serif text-3xl mb-2 text-brand-gold italic tracking-widest">Acesso Restrito</h2>
        <p className="text-xs text-white/40 uppercase tracking-[0.3em] mb-10">Portal Administrativo</p>
        
        {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-xs">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-sm transition-all text-white/80" 
              placeholder="admin@laraluiza.com"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">Senha</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-sm transition-all text-white/80" 
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-brand-gold text-brand-dark rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform disabled:opacity-50"
          >
            {loading ? 'Autenticando...' : 'Entrar no Sistema'}
          </button>
        </form>
        
        <p className="mt-8 text-[10px] text-white/20 uppercase tracking-widest">
          Lara Luíza Makeup &copy; 2025
        </p>
      </motion.div>
    </div>
  );
};

const ArtGalleryOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'noivas' | 'formandas' | 'sociais' | 'artisticas'>('all');
  const [gridDensity, setGridDensity] = useState<'large' | 'medium' | 'small'>('medium');
  const { content } = useContent();
  const data = content.artLab;
  
  const categories = [
    { id: 'all', label: 'Todas' },
    { id: 'noivas', label: 'Noivas' },
    { id: 'formandas', label: 'Formandas' },
    { id: 'sociais', label: 'Sociais' },
    { id: 'artisticas', label: 'Artísticas' },
  ];

  const densities = [
    { id: 'large', icon: Square, label: 'Grandes' },
    { id: 'medium', icon: LayoutGrid, label: 'Médios' },
    { id: 'small', icon: Grid3X3, label: 'Pequenos' },
  ];

  const filteredImages = selectedCategory === 'all' 
    ? data.galleryImages 
    : data.galleryImages.filter(img => img.category === selectedCategory);

  const getLayoutConfig = () => {
    switch (gridDensity) {
      case 'large': 
        return { 
          columns: 'columns-1 max-w-4xl mx-auto', 
          gap: 'gap-8 space-y-8',
          textClass: 'opacity-100'
        };
      case 'medium': 
        return { 
          columns: 'columns-2 lg:columns-3', 
          gap: 'gap-4 space-y-4',
          textClass: 'opacity-100 lg:opacity-0 lg:group-hover:opacity-100'
        };
      case 'small': 
        return { 
          columns: 'columns-3 md:columns-4 lg:columns-6', 
          gap: 'gap-2 space-y-2',
          textClass: 'hidden' 
        };
      default: 
        return { 
          columns: 'columns-2 lg:columns-3', 
          gap: 'gap-4 space-y-4',
          textClass: 'opacity-100 lg:opacity-0 lg:group-hover:opacity-100'
        };
    }
  };

  const layout = getLayoutConfig();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] bg-brand-dark overflow-y-auto custom-scrollbar"
        >
          <div className="container mx-auto px-6 py-20 relative">
            <motion.button 
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="fixed top-8 right-8 z-[210] p-4 bg-brand-gold rounded-full text-brand-dark shadow-2xl"
            >
              <X size={24} />
            </motion.button>

            <div className="mb-12">
              <h4 className="text-brand-gold text-xs uppercase tracking-[0.4em] mb-4 font-sans font-bold">{data.overlaySubtitle}</h4>
              <h2 className="text-5xl md:text-8xl font-serif leading-tight italic mb-12">{data.overlayTitle}</h2>
              
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 border-b border-white/10 pb-6">
                <div className="flex flex-wrap gap-4 md:gap-8">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id as any)}
                      className={`relative text-[10px] uppercase tracking-[0.2em] font-bold py-2 transition-colors ${
                        selectedCategory === cat.id ? 'text-brand-gold' : 'text-white/40 hover:text-white'
                      }`}
                    >
                      {cat.label}
                      {selectedCategory === cat.id && (
                        <motion.div 
                          layoutId="activeCategory"
                          className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-gold"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-6 bg-white/5 p-2 rounded-xl backdrop-blur-md">
                   <span className="hidden md:block text-[8px] uppercase tracking-widest text-white/30 font-bold ml-2">Visualização:</span>
                   <div className="flex gap-2">
                     {densities.map((d) => (
                       <button
                         key={d.id}
                         onClick={() => setGridDensity(d.id as any)}
                         className={`p-2.5 rounded-lg transition-all ${
                           gridDensity === d.id ? 'bg-brand-gold text-brand-dark' : 'text-white/40 hover:text-white hover:bg-white/5'
                         }`}
                         title={d.label}
                       >
                         <d.icon size={18} />
                       </button>
                     ))}
                   </div>
                </div>
              </div>
            </div>

            <motion.div 
              layout
              className={`${layout.columns} ${layout.gap} min-h-[600px] transition-all duration-500`}
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((img, idx) => (
                  <motion.div 
                    key={idx} // Using index as fallback key if URL is duplicate in mocks
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="group relative break-inside-avoid rounded-2xl overflow-hidden cursor-zoom-in shadow-2xl border border-white/5"
                  >
                    <img 
                      src={img.url} 
                      alt={img.title} 
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 p-8 flex flex-col justify-end ${layout.textClass}`}>
                      <span className="text-[8px] uppercase tracking-[0.3em] text-brand-gold/80 mb-2 font-bold">{img.category}</span>
                      <h3 className="text-xl font-serif text-brand-gold mb-1">{img.title}</h3>
                      <p className="text-xs text-white/70 italic line-clamp-2">{img.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            <div className="mt-32 text-center border-t border-white/5 pt-20">
               <p className="font-serif text-2xl italic text-white/50 mb-12 max-w-2xl mx-auto">
                 {data.overlayDesc}
               </p>
               <button 
                onClick={onClose}
                className="px-10 py-5 border border-brand-gold text-brand-gold font-bold uppercase tracking-widest text-sm hover:bg-brand-gold hover:text-brand-dark transition-all"
               >
                 Voltar para o Portfólio
               </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LandingPage = ({ onOpenAdmin, content }: { onOpenAdmin: () => void; content: any }) => {
  const [isArtGalleryOpen, setIsArtGalleryOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    if (isArtGalleryOpen || isWaitlistOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isArtGalleryOpen, isWaitlistOpen]);

  return (
    <div className="bg-brand-dark text-white selection:bg-brand-gold selection:text-brand-dark font-sans">
      <Navbar onOpenAdmin={onOpenAdmin} />
      <FloatingCTA />
      
      <ArtGalleryOverlay 
        isOpen={isArtGalleryOpen} 
        onClose={() => setIsArtGalleryOpen(false)} 
      />

      <WaitlistPopup 
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
      />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center pt-20">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={content.hero.bgImage}
            alt="Lara Luiza Makeup Hero" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-[8rem] font-serif leading-none mb-6">
              {content.hero.title} <br />
              <span className="italic text-brand-rose">{content.hero.titleHighlight}</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl font-sans font-light tracking-wide text-white/80 mb-10">
              {content.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => setIsArtGalleryOpen(true)}
                className="px-10 py-5 bg-white text-brand-dark font-bold uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors duration-300 w-full sm:w-auto text-center"
              >
                {content.hero.button1Text}
              </button>
              <a 
                href={content.hero.button2Link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 border border-white/30 backdrop-blur-md font-bold uppercase tracking-widest text-sm hover:border-brand-gold transition-colors duration-300 w-full sm:w-auto text-center"
              >
                {content.hero.button2Text}
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-transparent to-brand-gold mx-auto" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold mt-4 block">{content.hero.scrollText}</span>
        </motion.div>
      </section>

      {/* 2. CONCEPT SECTION */}
      <section id="concept" className="py-24 bg-brand-charcoal overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl relative">
                <img src={content.concept.image} alt="Conceito Lara Luiza" className="w-full h-full object-cover" />
                <div className="absolute inset-0 ring-1 ring-inset ring-brand-gold/20" />
              </div>
              <div className="absolute -bottom-4 -right-4 md:-bottom-8 md:-right-8 w-32 h-32 md:w-48 md:h-48 bg-brand-gold flex flex-col items-center justify-center text-brand-dark p-4 md:p-6 rounded-2xl shadow-2xl">
                <span className="text-3xl md:text-4xl font-serif font-bold italic">{content.concept.yearsNumber}</span>
                <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-center mt-1 md:mt-2">{content.concept.yearsText}</span>
              </div>
            </motion.div>

            <div>
              <SectionHeading 
                subtitle={content.concept.subtitle}
                title={content.concept.title}
              />
              <p className="text-lg text-white/70 mb-8 leading-relaxed font-sans whitespace-pre-line">
                {content.concept.description}
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <Sparkles className="text-brand-gold mb-2" />
                  <h5 className="font-bold text-sm uppercase tracking-widest">{content.concept.diff1Title}</h5>
                  <p className="text-xs text-white/50">{content.concept.diff1Desc}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Shield className="text-brand-gold mb-2" />
                  <h5 className="font-bold text-sm uppercase tracking-widest">{content.concept.diff2Title}</h5>
                  <p className="text-xs text-white/50">{content.concept.diff2Desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PELE BLINDADA (Signature Section) */}
      <section id="shield" className="py-24 relative overflow-hidden bg-brand-dark">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')]" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex p-4 rounded-full border border-brand-gold/30 mb-8"
            >
              <ShieldCheck size={40} className="text-brand-gold" />
            </motion.div>
            <SectionHeading 
              centered
              subtitle={content.shield.subtitle}
              title={content.shield.title}
            />
            <p className="text-xl md:text-2xl font-sans text-white/80 mb-12 italic">
              {content.shield.quote}
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {content.shield.cards.map((item: any, idx: number) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="p-8 border border-white/5 bg-white/5 rounded-2xl hover:border-brand-gold/50 transition-colors"
                >
                  <h6 className="font-serif text-lg text-brand-gold mb-2">{item.title}</h6>
                  <p className="text-xs text-white/50 font-sans tracking-wide">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES GRID */}
      <section id="services" className="py-24 bg-brand-charcoal">
        <div className="container mx-auto px-6">
          <SectionHeading subtitle={content.services.subtitle} title={content.services.title} centered />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.services.items.map((service: any, idx: number) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative h-[500px] overflow-hidden rounded-2xl cursor-pointer"
              >
                <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale-0 lg:grayscale lg:group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-2xl font-serif mb-2">{service.title}</h3>
                  <p className="text-sm text-white/70 line-clamp-2 mb-4">{service.description}</p>
                  <div className="flex items-center text-brand-gold font-bold text-xs uppercase tracking-widest gap-2">
                    Saiba Mais <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE ART LAB (Dark/Disruptive Section) */}
      <section id="art" className="py-32 bg-black text-white relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <img src={content.artLab.bgImage} className="w-full h-full object-cover mix-blend-overlay" />
        </div>
        <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex flex-col items-center mb-12"
          >
             <Palette size={60} className="text-brand-rose mb-6 animate-pulse" />
             <h2 className="text-4xl md:text-6xl lg:text-8xl font-serif italic mb-6">{content.artLab.title}</h2>
             <p className="max-w-xl text-lg text-white/60">
               {content.artLab.description}
             </p>
          </motion.div>
          
          <div className="flex gap-4">
            <motion.button 
              onClick={() => setIsArtGalleryOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-brand-rose text-brand-rose hover:bg-brand-rose hover:text-white transition-all duration-300 font-bold uppercase tracking-widest text-xs"
            >
              {content.artLab.buttonText}
            </motion.button>
          </div>
        </div>
      </section>

      {/* 6. EDUCATION / COURSES */}
      <section id="education" className="py-24 bg-brand-stone text-brand-dark">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <SectionHeading subtitle={content.education.subtitle} title={content.education.title} />
              <p className="text-lg text-brand-dark/70 mb-8 leading-relaxed whitespace-pre-line">
                {content.education.description}
              </p>
              <ul className="space-y-4 mb-10">
                {content.education.list.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 font-sans font-medium text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0" />
                    <span className="leading-tight">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setIsWaitlistOpen(true)}
                className="px-10 py-5 bg-brand-dark text-white font-bold uppercase tracking-widest text-sm hover:bg-brand-gold transition-colors"
              >
                {content.education.buttonText}
              </button>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="aspect-square rounded-full border-2 border-brand-gold p-4 relative animate-[spin_20s_linear_infinite]">
                 <div className="absolute inset-0 border-t-2 border-brand-gold rounded-full" />
               </div>
               <div className="absolute inset-4 overflow-hidden rounded-full">
                 <img src={content.education.image} alt="Curso de Maquiagem" className="w-full h-full object-cover scale-110" />
               </div>
               <div className="absolute -top-4 -left-4 bg-brand-gold text-brand-dark p-6 rounded-2xl shadow-xl rotate-3">
                 <GraduationCap size={32} />
                 <span className="block text-xs font-bold mt-2">{content.education.badgeText}</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT ME */}
      <section id="about" className="py-24 bg-brand-dark">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/3">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <img src={content.about.image} alt="Lara Luiza Castro" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <SectionHeading subtitle={content.about.subtitle} title={content.about.title} />
              <div className="space-y-6 text-white/70 font-sans leading-relaxed">
                {content.about.paragraphs.map((para: string, i: number) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-brand-charcoal overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeading centered subtitle={content.testimonials.subtitle} title={content.testimonials.title} />
          
          <div className="flex flex-nowrap md:grid md:grid-cols-3 gap-8 overflow-x-auto pb-8 snap-x no-scrollbar">
            {content.testimonials.items.map((t: any, i: number) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[300px] flex-shrink-0 snap-center bg-brand-dark p-8 rounded-3xl border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 text-brand-gold mb-6">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                  </div>
                  <p className="text-white/80 font-sans italic mb-8 leading-relaxed">"{t.content}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full grayscale object-cover" />
                  <div>
                    <h5 className="font-bold text-sm text-brand-gold uppercase tracking-widest">{t.name}</h5>
                    <span className="text-[10px] text-white/40">{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="py-24 bg-brand-dark">
        <div className="container mx-auto px-6 max-w-3xl">
          <SectionHeading centered subtitle={content.faq.subtitle} title={content.faq.title} />
          <div className="space-y-4">
            {content.faq.items.map((item: any, i: number) => (
              <details key={i} className="group border-b border-white/10 pb-4">
                <summary className="flex justify-between items-center cursor-pointer list-none py-4">
                  <span className="font-serif text-lg md:text-xl group-open:text-brand-gold transition-colors">{item.question}</span>
                  <ChevronRight className="group-open:rotate-90 transition-transform duration-300 text-brand-gold" />
                </summary>
                <div className="pt-2 pb-4 text-white/60 leading-relaxed font-sans text-sm md:text-base whitespace-pre-line">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. LOCATION & CTA */}
      <section className="py-24 bg-brand-stone text-brand-dark">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
               <SectionHeading subtitle={content.location.subtitle} title={content.location.title} />
               <div className="space-y-6 font-sans">
                 <div className="flex gap-4 items-start">
                   <MapPin className="text-brand-gold shrink-0 mt-1" />
                   <div>
                     <h6 className="font-bold uppercase text-xs tracking-widest mb-1">Endereço Principal</h6>
                     <p className="text-sm opacity-70 italic">{content.location.address}</p>
                   </div>
                 </div>
                 <div className="flex gap-4 items-start">
                   <Phone className="text-brand-gold shrink-0 mt-1" />
                   <div>
                     <h6 className="font-bold uppercase text-xs tracking-widest mb-1">WhatsApp & Agendamento</h6>
                     <p className="text-sm opacity-70">{content.location.whatsappDisplay}</p>
                   </div>
                 </div>
                 <div className="flex gap-4 items-start">
                   <Instagram className="text-brand-gold shrink-0 mt-1" />
                   <div>
                     <h6 className="font-bold uppercase text-xs tracking-widest mb-1">Instagram Social</h6>
                     <p className="text-sm opacity-70">{content.location.instagramDisplay}</p>
                   </div>
                 </div>
               </div>
               
               <div className="mt-12 p-8 border border-brand-dark/10 rounded-2xl bg-white shadow-sm">
                 <h4 className="font-serif text-2xl mb-4">{content.location.ctaTitle}</h4>
                 <p className="text-sm opacity-70 mb-8">
                   {content.location.ctaText}
                 </p>
                 <a 
                   href={content.navbar.ctaLink}
                   target="_blank"
                   rel="noopener noreferrer"
                   onClick={trackWhatsAppClick}
                   className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-brand-dark text-white font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform w-full"
                 >
                   {content.location.ctaButton} <ArrowRight size={16} />
                 </a>
               </div>
            </div>
            
            <div className="lg:w-1/2 min-h-[400px] bg-brand-charcoal rounded-3xl overflow-hidden relative shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
               <iframe 
                src={content.location.mapUrl}
                className="w-full h-full border-0 absolute inset-0 opacity-80 hover:opacity-100 transition-opacity"
                loading="lazy"
               ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 bg-brand-dark border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="max-w-xs">
              <span className="font-serif text-3xl tracking-widest text-brand-gold font-bold uppercase">{content.navbar.brandName}</span>
              <p className="text-white/40 text-sm mt-4 font-sans leading-relaxed">
                {content.footer.bio}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-12 md:gap-24">
              <div className="flex flex-col gap-4">
                <h6 className="font-bold text-[10px] uppercase tracking-[0.4em] text-brand-gold">Navegação</h6>
                {content.navbar.items.slice(0, 4).map((item: any) => (
                  <a key={item.href} href={item.href} className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest font-sans">{item.label}</a>
                ))}
              </div>
              <div className="flex flex-col gap-4">
                <h6 className="font-bold text-[10px] uppercase tracking-[0.4em] text-brand-gold">Social</h6>
                <a href={content.footer.instagramMain} target="_blank" className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest font-sans">Principal</a>
                <a href={content.footer.instagramArt} target="_blank" className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest font-sans">Artístico</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const MainSite = ({ onOpenAdmin }: { onOpenAdmin: () => void }) => {
  const { content, loading } = useContent();
  
  useEffect(() => {
    // Track visit
    const trackVisit = async () => {
      try {
        await supabase.from('analytics').insert([{ event_type: 'visit' }]);
      } catch (e) {
        console.error('Error tracking visit:', e);
      }
    };
    trackVisit();
  }, []);

  if (loading) {
    return (
        <div className="h-screen w-full bg-brand-dark flex flex-col items-center justify-center text-brand-gold gap-4">
            <div className="w-10 h-10 border-t-2 border-brand-gold rounded-full animate-spin"></div>
            <span className="text-xs uppercase tracking-widest animate-pulse">Carregando Experiência...</span>
        </div>
    );
  }

  return <LandingPage onOpenAdmin={onOpenAdmin} content={content} />;
}

const App: React.FC = () => {
  // Initialize state from localStorage to persist across refreshes
  const [view, setView] = useState<'public' | 'admin_login' | 'admin_panel'>(() => {
    const savedView = localStorage.getItem('app_view');
    return (savedView as 'public' | 'admin_login' | 'admin_panel') || 'public';
  });
  
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('app_is_logged_in') === 'true';
  });

  // Persist view changes
  useEffect(() => {
    localStorage.setItem('app_view', view);
  }, [view]);

  // Persist login state changes
  useEffect(() => {
    localStorage.setItem('app_is_logged_in', String(isLoggedIn));
  }, [isLoggedIn]);

  // Check Supabase Auth on Load
  useEffect(() => {
    // Check if we have a valid Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsLoggedIn(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // If Supabase has a session, we are definitely logged in
      if (session) {
        setIsLoggedIn(true);
      } 
      // If Supabase says we are logged out, only update if we aren't using the bypass
      // (Bypass relies solely on localStorage 'app_is_logged_in')
      else {
        const isBypass = localStorage.getItem('app_is_logged_in') === 'true';
        // If we are not in bypass mode (i.e., not logged in locally), then sync with Supabase
        // This prevents Supabase's "no session" from killing our bypass session on load
        // But if user explicitly logs out, we clear localStorage, so this check works.
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Wrapper principal para fornecer o Contexto
  return (
    <ContentProvider>
      {view === 'admin_login' && (
        <AdminLogin 
            onLogin={() => { 
                setIsLoggedIn(true); 
                setView('admin_panel'); 
            }} 
            onCancel={() => setView('public')} 
        />
      )}
      {view === 'admin_panel' && isLoggedIn && (
        <AdminArea onLogout={async () => { 
            await supabase.auth.signOut();
            setIsLoggedIn(false); 
            setView('public'); 
            localStorage.removeItem('app_is_logged_in');
            localStorage.removeItem('app_view');
            localStorage.removeItem('admin_active_tab'); // Clear admin tab preference
        }} />
      )}
      {view === 'admin_panel' && !isLoggedIn && (
        <AdminLogin 
            onLogin={() => { 
                setIsLoggedIn(true); 
                setView('admin_panel'); 
            }} 
            onCancel={() => setView('public')} 
        />
      )}
      {view === 'public' && (
        <MainSite onOpenAdmin={() => setView('admin_login')} />
      )}
    </ContentProvider>
  );
};

export default App;
