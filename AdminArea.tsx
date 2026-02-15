
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Image as ImageIcon, FileText, 
  QrCode, Settings, LogOut, ChevronRight, 
  Plus, Trash2, Globe, Save, Upload, ExternalLink,
  Palette, Type, Layout, Smartphone, Monitor, Eye,
  CheckCircle2, X, Shield, Sparkles, GraduationCap,
  MapPin, MessageCircle, Link as LinkIcon, List,
  Menu, PenTool
} from 'lucide-react';

interface AdminProps {
  onLogout: () => void;
}

type EditorSection = 
  | 'global' 
  | 'navbar'
  | 'hero' 
  | 'concept' 
  | 'shield' 
  | 'services' 
  | 'artlab'
  | 'education'
  | 'about' 
  | 'testimonials'
  | 'faq'
  | 'location'
  | 'footer';

export const AdminArea: React.FC<AdminProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dash' | 'editor' | 'media' | 'qr' | 'dns'>('dash');
  const [editorSection, setEditorSection] = useState<EditorSection>('global');
  const [qrValue, setQrValue] = useState('https://laraluizamakeup.com.br');
  const [showSaveToast, setShowSaveToast] = useState(false);

  // Mock data for lists simulation
  const [faqItems, setFaqItems] = useState([
    { q: "Quanto tempo dura a técnica?", a: "Até 16 horas..." },
    { q: "Atende a domicílio?", a: "Sim, para noivas..." }
  ]);

  const menuItems = [
    { id: 'dash', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'editor', label: 'Editor Full Site', icon: PenTool }, // Changed icon and label
    { id: 'media', label: 'Galeria/Fotos', icon: ImageIcon },
    { id: 'qr', label: 'QR Codes', icon: QrCode },
    { id: 'dns', label: 'Domínio/DNS', icon: Globe },
  ];

  const editorSectionsList = [
    { id: 'global', label: 'Identidade & Cores', icon: Palette },
    { id: 'navbar', label: 'Menu & Navegação', icon: Menu },
    { id: 'hero', label: 'Capa (Hero)', icon: Layout },
    { id: 'concept', label: 'O Conceito', icon: Sparkles },
    { id: 'shield', label: 'Pele Blindada', icon: Shield },
    { id: 'services', label: 'Serviços', icon: List },
    { id: 'artlab', label: 'Art Lab', icon: Palette },
    { id: 'education', label: 'Cursos & Educação', icon: GraduationCap },
    { id: 'about', label: 'Sobre a Lara', icon: FileText },
    { id: 'testimonials', label: 'Depoimentos', icon: MessageCircle },
    { id: 'faq', label: 'Perguntas (FAQ)', icon: CheckCircle2 },
    { id: 'location', label: 'Localização & Contato', icon: MapPin },
    { id: 'footer', label: 'Rodapé', icon: Type },
  ];

  const handleSave = () => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const renderEditor = () => (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-200px)]">
      {/* Sub-sidebar do Editor */}
      <div className="w-full lg:w-72 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-2">
        <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2 px-2 sticky top-0 bg-brand-charcoal z-10 py-2">Seções do Site</h4>
        {editorSectionsList.map((section) => (
          <button
            key={section.id}
            onClick={() => setEditorSection(section.id as EditorSection)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs uppercase tracking-widest font-bold text-left ${
              editorSection === section.id 
                ? 'bg-white/10 text-brand-gold border border-brand-gold/20' 
                : 'text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            <section.icon size={16} className="shrink-0" />
            {section.label}
          </button>
        ))}
      </div>

      {/* Área de Edição */}
      <div className="flex-1 bg-brand-charcoal border border-white/5 rounded-3xl p-8 overflow-y-auto custom-scrollbar relative">
        <div className="flex justify-between items-start mb-8 sticky top-0 bg-brand-charcoal z-20 pb-4 border-b border-white/5">
            <div>
                <h3 className="font-serif text-2xl text-white">
                    {editorSectionsList.find(s => s.id === editorSection)?.label}
                </h3>
                <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">Edite os elementos em tempo real</p>
            </div>
            <div className="flex gap-2">
                <button className="p-2 bg-brand-dark rounded-lg text-white/50 hover:text-white" title="Visualização Mobile">
                    <Smartphone size={18} />
                </button>
                <button className="p-2 bg-brand-dark rounded-lg text-brand-gold" title="Visualização Desktop">
                    <Monitor size={18} />
                </button>
            </div>
        </div>

        <div className="space-y-8 pb-20">
            {/* 1. GLOBAL */}
            {editorSection === 'global' && (
                <>
                    <div className="grid grid-cols-2 gap-6">
                        <ColorPicker label="Cor Primária (Gold)" value="#D4AF37" />
                        <ColorPicker label="Cor Secundária (Rose)" value="#E5BDBB" />
                        <ColorPicker label="Fundo (Dark)" value="#121212" />
                        <ColorPicker label="Fundo (Charcoal)" value="#1E1E1E" />
                    </div>
                    <div className="border-t border-white/5 pt-6">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">Fonte de Títulos</label>
                        <select className="w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-sm text-white/80">
                            <option>Playfair Display (Atual)</option>
                            <option>Cinzel</option>
                            <option>Bodoni Moda</option>
                            <option>Montserrat</option>
                        </select>
                    </div>
                </>
            )}

            {/* 2. NAVBAR */}
            {editorSection === 'navbar' && (
                <>
                    <InputGroup label="Nome da Marca (Logo Texto)" value="Lara Luíza" />
                    <InputGroup label="Subtítulo da Marca" value="Makeup Artist & Educator" />
                    <InputGroup label="Texto Botão CTA" value="Agendar Agora" />
                    <InputGroup label="Link Botão CTA" value="https://wa.me/5538992210136" icon={<LinkIcon size={14}/>} />
                </>
            )}

            {/* 3. HERO */}
            {editorSection === 'hero' && (
                <>
                    <ImageUpload label="Imagem de Fundo (Desktop)" preview="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop" />
                    <ImageUpload label="Imagem de Fundo (Mobile)" preview="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop" />
                    <InputGroup label="Título Principal" value="Beleza Natural" />
                    <InputGroup label="Subtítulo" value="Realçando belezas através da maquiagem" />
                    
                    <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                        <h5 className="text-brand-gold text-xs uppercase font-bold mb-4">Botões de Ação</h5>
                        <div className="grid grid-cols-2 gap-4">
                            <InputGroup label="Texto Botão 1" value="Ver Portfólio" />
                            <InputGroup label="Link Botão 1" value="#portfolio" icon={<LinkIcon size={14}/>} />
                            <InputGroup label="Texto Botão 2" value="Agendar Data" />
                            <InputGroup label="Link Botão 2" value="https://wa.me/..." icon={<LinkIcon size={14}/>} />
                        </div>
                    </div>
                </>
            )}

            {/* 4. CONCEPT */}
            {editorSection === 'concept' && (
                <>
                    <div className="flex gap-4">
                        <div className="w-1/3">
                            <ImageUpload label="Imagem Lateral" preview="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop" />
                        </div>
                        <div className="w-2/3 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup label="Número Destaque" value="+8" />
                                <InputGroup label="Texto Destaque" value="Anos de Experiência" />
                            </div>
                            <InputGroup label="Título da Seção" value="A BELEZA DE SER VOCÊ." />
                            <TextAreaGroup label="Texto do Conceito" value="Referência em Belo Horizonte, Lara Luiza Castro construiu sua trajetória combinando técnica apurada..." height="h-32" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                         <div>
                            <InputGroup label="Diferencial 1 - Título" value="Efeito Glow" />
                            <TextAreaGroup label="Diferencial 1 - Desc" value="Luminosidade estratégica para fotos e vídeos." height="h-20" />
                         </div>
                         <div>
                            <InputGroup label="Diferencial 2 - Título" value="Durabilidade" />
                            <TextAreaGroup label="Diferencial 2 - Desc" value="Produtos de excelência para um resultado impecável." height="h-20" />
                         </div>
                    </div>
                </>
            )}

            {/* 5. SHIELD (PELE BLINDADA) */}
            {editorSection === 'shield' && (
                <>
                    <InputGroup label="Título da Seção" value="A Lendária Pele Blindada" />
                    <InputGroup label="Subtítulo" value="Exclusividade Técnica" />
                    <InputGroup label="Frase de Impacto (Quote)" value="Chore, dance, abrace. Sua beleza permanecerá intacta até o último minuto." />
                    
                    <h5 className="text-brand-gold text-xs uppercase font-bold mt-6 mb-2">Cards de Resistência</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                            <InputGroup label="Card 1 - Título" value="À prova de lágrimas" />
                            <TextAreaGroup label="Card 1 - Desc" value="Sua emoção não marca seu rosto." height="h-20" />
                        </div>
                        <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                            <InputGroup label="Card 2 - Título" value="Suor & Calor" />
                            <TextAreaGroup label="Card 2 - Desc" value="Impecável mesmo no auge da pista." height="h-20" />
                        </div>
                        <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                            <InputGroup label="Card 3 - Título" value="Atrito zero" />
                            <TextAreaGroup label="Card 3 - Desc" value="Livre para abraçar quem você ama." height="h-20" />
                        </div>
                    </div>
                </>
            )}

            {/* 6. SERVICES (LIST) */}
            {editorSection === 'services' && (
                <div className="space-y-4">
                    <InputGroup label="Título da Seção" value="Experiências de Transformação" />
                    
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-4">
                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Lista de Serviços</label>
                            <button className="text-xs text-brand-gold uppercase font-bold flex items-center gap-1 hover:text-white transition-colors">
                                <Plus size={14} /> Adicionar Serviço
                            </button>
                        </div>

                        <div className="space-y-3">
                            {['Noivas Premium', 'Produção Social', 'Art Lab', 'Workshops & Cursos'].map((service, idx) => (
                                <div key={idx} className="p-4 bg-brand-dark rounded-xl border border-white/5 flex gap-4 items-center group hover:border-brand-gold/30 transition-colors">
                                    <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden shrink-0">
                                        <img src={`https://picsum.photos/200/200?random=${idx}`} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-serif text-white">{service}</h4>
                                        <p className="text-[10px] text-white/40 uppercase mt-1">Clique para editar detalhes</p>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:text-brand-gold"><Settings size={16} /></button>
                                        <button className="p-2 hover:text-red-500"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* 7. ART LAB */}
            {editorSection === 'artlab' && (
                <>
                    <ImageUpload label="Imagem de Fundo (Overlay)" preview="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1935&auto=format&fit=crop" />
                    <InputGroup label="Título" value="The Art Lab" />
                    <TextAreaGroup label="Texto Descritivo" value="Onde o clássico encontra o surreal. Produções artísticas, conceituais e temáticas que transcendem o convencional." />
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Texto Botão" value="Explorar Portfólio" />
                        <InputGroup label="Ação do Botão" value="openGallery()" icon={<Settings size={14}/>} />
                    </div>
                </>
            )}

            {/* 8. EDUCATION */}
            {editorSection === 'education' && (
                <>
                    <div className="flex gap-6">
                        <div className="flex-1 space-y-4">
                            <InputGroup label="Título" value="Domine sua própria beleza" />
                            <TextAreaGroup label="Texto Principal" value="Nossos cursos de automaquiagem são desenhados para a mulher moderna..." />
                            
                            <div className="bg-brand-dark p-4 rounded-xl border border-white/5">
                                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">O que você vai aprender (Um por linha)</label>
                                <textarea 
                                    defaultValue={"Consultoria de Visagismo\nTécnicas de esfumado clássico\nPreparação de pele de alta durabilidade\nCuradoria de produtos essenciais"}
                                    className="w-full bg-brand-charcoal border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-sm transition-all text-white/80 h-40 font-mono leading-relaxed" 
                                />
                            </div>

                            <InputGroup label="Texto Botão CTA" value="Entrar na Lista de Espera" />
                        </div>
                        <div className="w-1/3">
                            <ImageUpload label="Imagem Circular (Giratória)" preview="https://images.unsplash.com/photo-1526045478516-99145907023c?q=80&w=2070&auto=format&fit=crop" />
                            <InputGroup label="Texto do Badge" value="Cursos VIP" />
                        </div>
                    </div>
                </>
            )}

            {/* 9. ABOUT */}
            {editorSection === 'about' && (
                 <>
                    <ImageUpload label="Foto de Perfil Principal" preview="https://images.unsplash.com/photo-1594744803329-a584af1cae24?q=80&w=1887&auto=format&fit=crop" />
                    <InputGroup label="Título da Seção" value="Atrás dos Pincéis" />
                    <div className="space-y-2">
                        <TextAreaGroup label="Parágrafo 1" value="Sou Lara Luíza Castro, maquiadora profissional há mais de 8 anos..." height="h-24" />
                        <TextAreaGroup label="Parágrafo 2" value="Acredito em uma beleza leve, confortável e duradoura..." height="h-24" />
                        <TextAreaGroup label="Parágrafo 3" value="Cada detalhe do meu trabalho é feito com carinho..." height="h-24" />
                    </div>
                 </>
            )}

            {/* 10. TESTIMONIALS */}
            {editorSection === 'testimonials' && (
                <div>
                     <InputGroup label="Título da Seção" value="Relatos de Confiança" />
                     <div className="mt-6 space-y-4">
                        {['Carolina Mendes', 'Beatriz Soares', 'Isadora Quintão'].map((name, i) => (
                             <div key={i} className="p-4 bg-brand-dark rounded-xl border border-white/5 relative group">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden"><img src={`https://picsum.photos/100/100?random=${i+10}`} className="w-full h-full" /></div>
                                    <div className="flex-1">
                                        <input type="text" defaultValue={name} className="bg-transparent border-none text-brand-gold font-serif w-full mb-1" />
                                        <textarea className="w-full bg-transparent text-xs text-white/60 resize-none h-12 outline-none border-none" defaultValue="Depoimento simulado aqui..." />
                                    </div>
                                </div>
                                <button className="absolute top-2 right-2 p-2 text-white/20 hover:text-red-500"><Trash2 size={14} /></button>
                             </div>
                        ))}
                        <button className="w-full py-3 border border-dashed border-white/20 rounded-xl text-white/40 hover:text-brand-gold hover:border-brand-gold hover:bg-brand-gold/5 text-xs uppercase font-bold">
                            + Adicionar Depoimento
                        </button>
                     </div>
                </div>
            )}

            {/* 11. FAQ */}
            {editorSection === 'faq' && (
                <div>
                    <InputGroup label="Título da Seção" value="Dúvidas Frequentes" />
                    <div className="mt-6 space-y-4">
                        {faqItems.map((item, i) => (
                            <div key={i} className="p-4 bg-brand-dark rounded-xl border border-white/5 group">
                                <div className="flex justify-between mb-2">
                                    <label className="text-[8px] uppercase text-brand-gold font-bold">Pergunta</label>
                                    <button className="text-white/20 hover:text-red-500"><Trash2 size={12} /></button>
                                </div>
                                <input type="text" defaultValue={item.q} className="w-full bg-transparent border-b border-white/10 pb-2 mb-3 text-sm font-serif outline-none focus:border-brand-gold" />
                                
                                <label className="text-[8px] uppercase text-white/30 font-bold mb-1 block">Resposta</label>
                                <textarea defaultValue={item.a} className="w-full bg-transparent text-xs text-white/60 resize-none h-16 outline-none" />
                            </div>
                        ))}
                        <button 
                            onClick={() => setFaqItems([...faqItems, { q: "Nova Pergunta", a: "Nova Resposta" }])}
                            className="w-full py-3 border border-dashed border-white/20 rounded-xl text-white/40 hover:text-brand-gold hover:border-brand-gold hover:bg-brand-gold/5 text-xs uppercase font-bold"
                        >
                            + Adicionar Pergunta
                        </button>
                    </div>
                </div>
            )}

            {/* 12. LOCATION & FOOTER */}
            {editorSection === 'location' && (
                <>
                    <InputGroup label="Título" value="Visite-nos no Lourdes" />
                    <InputGroup label="Endereço Principal" value="Rua Alvarenga Peixoto, 575 - Lourdes" />
                    <InputGroup label="WhatsApp Exibição" value="(38) 99221-0136" />
                    <InputGroup label="Instagram Social" value="@laraluizamakeup_" />
                    <div className="mt-4">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">Google Maps Embed URL (Iframe src)</label>
                        <input 
                            type="text" 
                            defaultValue="https://www.google.com/maps/embed?pb=!1m18!1m12!..."
                            className="w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-xs text-white/50 font-mono truncate" 
                        />
                    </div>
                </>
            )}

            {editorSection === 'footer' && (
                <>
                    <TextAreaGroup label="Texto Bio Rodapé" value="Maquiadora há 8 anos em Belo Horizonte. Especialista em Noivas, Pele Blindada e Maquiagem Artística." />
                    <InputGroup label="Link Instagram Principal" value="https://instagram.com/laraluizamakeup_" />
                    <InputGroup label="Link Instagram Artístico" value="https://instagram.com/laraluizaart" />
                    <div className="mt-4 p-4 bg-brand-dark rounded-xl border border-white/5">
                        <span className="text-[10px] uppercase text-white/40 block mb-2">Copyright Text</span>
                        <p className="text-white/20 text-xs">Editável automaticamente com o ano atual</p>
                    </div>
                </>
            )}

        </div>

        {/* Floating Action Bar */}
        <div className="sticky bottom-0 left-0 right-0 pt-8 mt-8 border-t border-white/5 bg-brand-charcoal z-30 flex justify-end gap-4">
            <button className="px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-xs uppercase tracking-widest font-bold transition-all">
                Reverter
            </button>
            <button 
                onClick={handleSave}
                className="px-8 py-3 bg-brand-gold text-brand-dark rounded-xl text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
                <Save size={16} /> Salvar Tudo
            </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-gold selection:text-brand-dark">
      {/* Sidebar Principal */}
      <aside className="w-full lg:w-72 bg-brand-charcoal border-r border-white/5 p-6 flex flex-col z-40">
        <div className="mb-10 px-4">
          <span className="font-serif text-xl tracking-widest text-brand-gold font-bold uppercase block">Lara Luíza</span>
          <span className="text-[8px] tracking-[0.4em] text-brand-rose uppercase">CMS Admin v2.0</span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group ${
                activeTab === item.id 
                  ? 'bg-brand-gold text-brand-dark font-bold shadow-lg shadow-brand-gold/20' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-brand-dark' : 'group-hover:text-brand-gold transition-colors'} />
              <span className="text-sm uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout}
          className="mt-10 flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all opacity-60 hover:opacity-100"
        >
          <LogOut size={20} />
          <span className="text-sm uppercase tracking-widest">Sair</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto max-h-screen custom-scrollbar relative">
        <header className="mb-8 md:mb-12 flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2 text-white/30 text-[10px] uppercase tracking-widest mb-2 font-bold">
               <span>Admin</span> <ChevronRight size={10} /> <span className="text-brand-gold">{menuItems.find(i => i.id === activeTab)?.label}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-white italic">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all border border-white/5 hover:border-white/20">
                <ExternalLink size={12} /> Ver Site Online
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-gold to-brand-rose p-[1px]">
               <div className="w-full h-full rounded-full bg-brand-charcoal flex items-center justify-center">
                  <span className="font-serif italic text-brand-gold">L</span>
               </div>
            </div>
          </div>
        </header>

        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
                {activeTab === 'dash' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard title="Visitas Hoje" value="1,204" color="brand-gold" />
                    <StatCard title="Cliques no WhatsApp" value="86" color="brand-rose" />
                    <StatCard title="Leads Cursos" value="12" color="white" />
                    
                    <div className="md:col-span-3 bg-brand-charcoal rounded-3xl p-8 border border-white/5">
                    <h3 className="font-serif text-xl mb-6 text-brand-gold">Visão Geral do Conteúdo</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                             <span className="text-[10px] uppercase text-white/40 block">Versão do Site</span>
                             <span className="text-lg font-bold text-white">v2.4 (Live)</span>
                         </div>
                         <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                             <span className="text-[10px] uppercase text-white/40 block">Último Backup</span>
                             <span className="text-lg font-bold text-white">Há 2 horas</span>
                         </div>
                         <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                             <span className="text-[10px] uppercase text-white/40 block">Status Sistema</span>
                             <span className="text-lg font-bold text-green-500">Operacional</span>
                         </div>
                         <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                             <span className="text-[10px] uppercase text-white/40 block">Fotos Hospedadas</span>
                             <span className="text-lg font-bold text-white">45/100</span>
                         </div>
                    </div>
                    </div>
                </div>
                )}

                {activeTab === 'editor' && renderEditor()}

                {activeTab === 'media' && (
                <div className="space-y-8">
                    <div className="flex justify-between items-center bg-brand-charcoal p-6 rounded-2xl border border-white/5">
                    <div>
                        <h3 className="font-serif text-xl mb-1">Biblioteca de Mídia</h3>
                        <p className="text-xs text-white/40 uppercase tracking-widest">Gerencie todas as imagens do site</p>
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-dark font-bold rounded-xl text-xs uppercase tracking-widest hover:brightness-110 transition-all">
                        <Upload size={16} /> Subir Foto
                    </button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
                        <div key={i} className="group relative aspect-square rounded-xl overflow-hidden border border-white/5 bg-brand-charcoal">
                        <img src={`https://picsum.photos/400/400?random=${i}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                            <span className="text-[10px] text-white/50 uppercase tracking-widest">Ver. 0{i}</span>
                            <div className="flex gap-2">
                                <button className="p-2 bg-white text-brand-dark rounded-full hover:scale-110 transition-transform"><Eye size={14} /></button>
                                <button className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"><Trash2 size={14} /></button>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}

                {activeTab === 'qr' && (
                <div className="max-w-4xl mx-auto">
                    <div className="bg-brand-charcoal p-8 md:p-12 rounded-3xl border border-brand-gold/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <h3 className="font-serif text-3xl mb-2 italic">QR Code Studio</h3>
                        <p className="text-white/50 text-sm mb-8 max-w-lg">Gere códigos elegantes para seus cartões de visita, balcão ou materiais promocionais.</p>
                        
                        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                            <div className="space-y-6">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">URL de Destino</label>
                                    <div className="relative">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                                        <input 
                                        type="text" 
                                        value={qrValue} 
                                        onChange={(e) => setQrValue(e.target.value)}
                                        className="w-full bg-brand-dark border border-white/10 pl-12 p-4 rounded-xl focus:border-brand-gold outline-none text-sm transition-all" 
                                        />
                                    </div>
                                </div>
                                <button className="w-full py-4 bg-brand-gold text-brand-dark font-bold rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-brand-gold/10 hover:shadow-brand-gold/20 transition-all">
                                    Baixar PNG (Alta Resolução)
                                </button>
                            </div>

                            <div className="flex justify-center">
                                <div className="p-4 bg-white rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                    <img 
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}&color=121212`} 
                                        alt="QR Code" 
                                        className="w-48 h-48 mix-blend-multiply"
                                    />
                                    <div className="mt-4 text-center">
                                        <p className="text-brand-dark font-serif font-bold text-lg">Lara Luíza</p>
                                        <p className="text-[10px] uppercase tracking-widest text-brand-dark/50">Scan me</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}

                {activeTab === 'dns' && (
                <div className="max-w-4xl space-y-8">
                    <div className="bg-brand-charcoal p-8 rounded-3xl border border-white/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                        <h3 className="font-serif text-xl">Status do Domínio</h3>
                    </div>
                    <p className="text-sm text-white/60 mb-8">
                        Seu site está corretamente apontado para os servidores da Vercel.
                    </p>
                    
                    <div className="space-y-4">
                        <DnsRecord label="A Record" value="76.76.21.21" status="Ativo" />
                        <DnsRecord label="CNAME" value="cname.vercel-dns.com" status="Ativo" />
                    </div>

                    <div className="mt-12 p-6 bg-brand-gold/5 rounded-2xl border border-brand-gold/20">
                        <h4 className="text-brand-gold text-xs uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                        <Settings size={14} /> Instruções Vercel
                        </h4>
                        <p className="text-xs text-white/50 leading-relaxed">
                        Para configurar um novo domínio, acesse o painel da Vercel, vá em Settings &gt; Domains e adicione seu novo endereço. Os registros acima devem ser atualizados no seu provedor de DNS (ex: Registro.br).
                        </p>
                    </div>
                    </div>
                </div>
                )}
            </motion.div>
        </AnimatePresence>

        {/* Toast de Salvo */}
        <AnimatePresence>
            {showSaveToast && (
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-8 right-8 bg-green-500 text-brand-dark px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50 font-bold"
                >
                    <CheckCircle2 size={20} />
                    Alterações salvas com sucesso!
                </motion.div>
            )}
        </AnimatePresence>
      </main>
    </div>
  );
};

// Components Auxiliares

const StatCard = ({ title, value, color }: { title: string; value: string; color: string }) => (
  <div className="bg-brand-charcoal p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
    <div className={`absolute top-0 right-0 w-20 h-20 bg-${color}/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`} />
    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-2 relative z-10">{title}</p>
    <p className={`text-4xl font-serif font-bold italic text-${color} relative z-10 group-hover:scale-105 transition-transform`}>{value}</p>
  </div>
);

const InputGroup = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
    <div>
        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">{icon}</div>}
            <input 
                type="text" 
                defaultValue={value}
                className={`w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-sm transition-all text-white/80 focus:bg-white/5 ${icon ? 'pl-11' : ''}`} 
            />
        </div>
    </div>
);

const TextAreaGroup = ({ label, value, height = 'h-32' }: { label: string; value: string; height?: string }) => (
    <div>
        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">{label}</label>
        <textarea 
            defaultValue={value}
            className={`w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-sm transition-all text-white/80 focus:bg-white/5 resize-none ${height}`} 
        />
    </div>
);

const ColorPicker = ({ label, value }: { label: string; value: string }) => (
    <div>
        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">{label}</label>
        <div className="flex items-center gap-3 bg-brand-dark border border-white/10 p-2 rounded-xl">
            <input 
                type="color" 
                defaultValue={value}
                className="w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer" 
            />
            <input 
                type="text" 
                defaultValue={value}
                className="bg-transparent border-none outline-none text-sm text-white/70 font-mono w-full uppercase"
            />
        </div>
    </div>
);

const ImageUpload = ({ label, preview }: { label: string; preview: string }) => (
    <div className="mb-6">
        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">{label}</label>
        <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group bg-brand-dark">
            <img src={preview} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 flex items-center justify-center">
                <button className="px-6 py-3 bg-brand-charcoal/80 backdrop-blur-md border border-white/20 text-white rounded-lg text-xs uppercase tracking-widest font-bold hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all flex items-center gap-2">
                    <Upload size={14} /> Trocar Imagem
                </button>
            </div>
        </div>
    </div>
);

const DnsRecord = ({ label, value, status }: { label: string; value: string; status: string }) => (
  <div className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-brand-dark rounded-xl border border-white/5 gap-4">
    <div className="flex gap-12">
      <div className="min-w-[100px]">
        <span className="text-[10px] text-white/30 uppercase block font-bold mb-1">Tipo</span>
        <span className="text-sm font-bold text-brand-gold">{label}</span>
      </div>
      <div>
        <span className="text-[10px] text-white/30 uppercase block font-bold mb-1">Valor</span>
        <span className="text-sm font-mono text-white/70">{value}</span>
      </div>
    </div>
    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] uppercase tracking-widest font-bold rounded-full border border-green-500/20">
      {status}
    </span>
  </div>
);
