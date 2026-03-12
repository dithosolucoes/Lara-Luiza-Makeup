
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Image as ImageIcon, FileText, 
  QrCode, Settings, LogOut, ChevronRight, 
  Plus, Trash2, Globe, Save, Upload, ExternalLink,
  Palette, Type, Layout, Smartphone, Monitor, Eye,
  CheckCircle2, X, Shield, Sparkles, GraduationCap,
  MapPin, MessageCircle, Link as LinkIcon, List,
  Menu, PenTool, Edit, ArrowUp, ArrowDown, Loader2
} from 'lucide-react';
import { useContent } from './ContentContext';
import { Service, Testimonial, FaqItem, NavItem, GalleryImage } from './types';
import { supabase } from './App';

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

const GalleryManager = ({ content, updateContent }: { content: any, updateContent: any }) => {
    const [filter, setFilter] = useState('all');
    const [isDragging, setIsDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const replaceFileInputRef = useRef<HTMLInputElement>(null);
    const [replacingIndex, setReplacingIndex] = useState<number | null>(null);

    const filteredImages = filter === 'all' 
        ? content.artLab.galleryImages 
        : content.artLab.galleryImages.filter((img: any) => img.category === filter);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setUploading(true);
        const newImages = [];

        for (const file of files) {
            if (!file.type.startsWith('image/')) continue;

            try {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('portfolio-images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('portfolio-images')
                    .getPublicUrl(filePath);

                newImages.push({
                    url: data.publicUrl,
                    title: 'Nova Foto',
                    desc: '',
                    category: filter === 'all' ? 'artisticas' : filter
                });
            } catch (error) {
                console.error('Upload error:', error);
            }
        }

        if (newImages.length > 0) {
            updateContent('artLab', { galleryImages: [...newImages, ...content.artLab.galleryImages] });
        }
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        
        const files = Array.from(e.dataTransfer.files);
        if (files.length === 0) return;

        setUploading(true);
        const newImages = [];

        for (const file of files) {
            if (!file.type.startsWith('image/')) continue;

            try {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('portfolio-images')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('portfolio-images')
                    .getPublicUrl(filePath);

                newImages.push({
                    url: data.publicUrl,
                    title: 'Nova Foto',
                    desc: '',
                    category: filter === 'all' ? 'artisticas' : filter // Auto-assign current filter category
                });
            } catch (error) {
                console.error('Upload error:', error);
            }
        }

        if (newImages.length > 0) {
            updateContent('artLab', { galleryImages: [...newImages, ...content.artLab.galleryImages] });
        }
        setUploading(false);
    };

    const handleReplaceClick = (indexToReplace: number) => {
        const imageToReplace = filteredImages[indexToReplace];
        const realIndex = content.artLab.galleryImages.findIndex((img: any) => img.url === imageToReplace.url);
        if (realIndex === -1) return;
        
        setReplacingIndex(realIndex);
        replaceFileInputRef.current?.click();
    };

    const handleReplaceFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || replacingIndex === null) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage
                .from('portfolio-images')
                .getPublicUrl(filePath);

            const newImages = [...content.artLab.galleryImages];
            newImages[replacingIndex] = {
                ...newImages[replacingIndex],
                url: data.publicUrl
            };

            updateContent('artLab', { galleryImages: newImages });
        } catch (error) {
            console.error('Upload error:', error);
        } finally {
            setUploading(false);
            setReplacingIndex(null);
            if (replaceFileInputRef.current) replaceFileInputRef.current.value = '';
        }
    };

    const handleDelete = (indexToDelete: number) => {
        // Find the actual index in the main array, not the filtered one
        const imageToDelete = filteredImages[indexToDelete];
        const realIndex = content.artLab.galleryImages.findIndex((img: any) => img.url === imageToDelete.url);
        
        if (realIndex === -1) return;

        const newImages = content.artLab.galleryImages.filter((_: any, i: number) => i !== realIndex);
        updateContent('artLab', { galleryImages: newImages });
    };

    const handleCategoryChange = (indexToEdit: number, newCategory: string) => {
        const imageToEdit = filteredImages[indexToEdit];
        const realIndex = content.artLab.galleryImages.findIndex((img: any) => img.url === imageToEdit.url);
        
        if (realIndex === -1) return;

        const newImages = [...content.artLab.galleryImages];
        newImages[realIndex] = { ...newImages[realIndex], category: newCategory };
        updateContent('artLab', { galleryImages: newImages });
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-serif text-white italic mb-2">Galeria de Fotos</h2>
                    <p className="text-white/40 text-xs uppercase tracking-widest">Gerencie seu portfólio visual</p>
                </div>
                
                <div className="flex bg-brand-charcoal p-1 rounded-xl border border-white/5 overflow-x-auto hide-scrollbar w-full md:w-auto">
                    {['all', 'noivas', 'formandas', 'sociais', 'artisticas'].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-widest font-bold transition-all whitespace-nowrap shrink-0 ${
                                filter === cat 
                                ? 'bg-brand-gold text-brand-dark' 
                                : 'text-white/40 hover:text-white'
                            }`}
                        >
                            {cat === 'all' ? 'Todas' : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Drag & Drop Zone */}
            <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`mb-8 border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isDragging 
                    ? 'border-brand-gold bg-brand-gold/10 scale-[1.02]' 
                    : 'border-white/10 bg-brand-dark hover:border-white/20'
                }`}
            >
                <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileSelect} 
                />
                {uploading ? (
                    <div className="flex flex-col items-center animate-pulse">
                        <Loader2 className="animate-spin text-brand-gold mb-2" size={32} />
                        <span className="text-xs uppercase tracking-widest text-brand-gold">Enviando fotos...</span>
                    </div>
                ) : (
                    <>
                        <Upload className={`mb-4 ${isDragging ? 'text-brand-gold' : 'text-white/20'}`} size={32} />
                        <h4 className="text-white font-serif text-lg mb-1">Arraste fotos para cá</h4>
                        <p className="text-white/40 text-xs">Ou clique para selecionar</p>
                    </>
                )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-20">
                <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={replaceFileInputRef} 
                    onChange={handleReplaceFile} 
                />
                {filteredImages.map((img: any, idx: number) => (
                    <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden bg-brand-dark border border-white/5">
                        <img 
                            src={img.url} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer" 
                            onClick={() => handleReplaceClick(idx)}
                            title="Clique para substituir"
                        />
                        
                        {/* Overlay Actions */}
                        <div className="absolute inset-0 bg-black/60 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 pointer-events-none">
                            <div className="flex justify-between items-start pointer-events-auto">
                                <button 
                                    onClick={() => handleReplaceClick(idx)}
                                    className="p-3 lg:p-2 bg-brand-gold/20 text-brand-gold rounded-lg hover:bg-brand-gold hover:text-brand-dark transition-colors shadow-lg"
                                    title="Substituir Foto"
                                >
                                    <Upload size={16} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(idx)}
                                    className="p-3 lg:p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors shadow-lg"
                                    title="Excluir"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            
                            <div className="pointer-events-auto">
                                <select 
                                    value={img.category}
                                    onChange={(e) => handleCategoryChange(idx, e.target.value)}
                                    className="w-full bg-black/80 lg:bg-black/50 text-white text-[10px] uppercase font-bold border border-white/20 rounded px-2 py-2 lg:py-1 outline-none focus:border-brand-gold"
                                >
                                    <option value="noivas">Noivas</option>
                                    <option value="formandas">Formandas</option>
                                    <option value="sociais">Sociais</option>
                                    <option value="artisticas">Artísticas</option>
                                </select>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const AdminArea: React.FC<AdminProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dash' | 'editor' | 'media' | 'qr' | 'dns'>(() => {
    const savedTab = localStorage.getItem('admin_active_tab');
    return (savedTab as 'dash' | 'editor' | 'media' | 'qr' | 'dns') || 'dash';
  });

  useEffect(() => {
    localStorage.setItem('admin_active_tab', activeTab);
  }, [activeTab]);

  const [editorSection, setEditorSection] = useState<EditorSection>(() => {
    const savedSection = localStorage.getItem('admin_editor_section');
    return (savedSection as EditorSection) || 'global';
  });

  useEffect(() => {
    localStorage.setItem('admin_editor_section', editorSection);
  }, [editorSection]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [qrValue, setQrValue] = useState('https://laraluizamakeup.com.br');
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isReverting, setIsReverting] = useState(false);
  
  // States for complex list editing
  const [editingServiceIndex, setEditingServiceIndex] = useState<number | null>(null);
  const [editingGalleryIndex, setEditingGalleryIndex] = useState<number | null>(null);
  const [waitlistCount, setWaitlistCount] = useState<number | string>('...');
  const [visitsCount, setVisitsCount] = useState<number | string>('...');
  const [whatsappClicksCount, setWhatsappClicksCount] = useState<number | string>('...');
  const [leads, setLeads] = useState<any[]>([]);

  const { content, updateContent, updateNestedContent, saveToSupabase, reloadFromSupabase } = useContent();

  useEffect(() => {
    const fetchStats = async () => {
        try {
            const { count: wCount, error: wError } = await supabase
                .from('waitlist')
                .select('*', { count: 'exact', head: true });
            
            if (!wError && wCount !== null) {
                setWaitlistCount(wCount);
            } else {
                setWaitlistCount(0);
            }

            const { data: leadsData, error: leadsError } = await supabase
                .from('waitlist')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (!leadsError && leadsData) {
                setLeads(leadsData);
            }

            const { count: vCount, error: vError } = await supabase
                .from('analytics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'visit');
            
            if (!vError && vCount !== null) {
                setVisitsCount(vCount);
            } else {
                setVisitsCount(0);
            }

            const { count: cCount, error: cError } = await supabase
                .from('analytics')
                .select('*', { count: 'exact', head: true })
                .eq('event_type', 'whatsapp_click');
            
            if (!cError && cCount !== null) {
                setWhatsappClicksCount(cCount);
            } else {
                setWhatsappClicksCount(0);
            }
        } catch (e) {
            setWaitlistCount(0);
            setVisitsCount(0);
            setWhatsappClicksCount(0);
        }
    };
    fetchStats();
  }, []);

  const menuItems = [
    { id: 'dash', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'editor', label: 'Editor Full Site', icon: PenTool },
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
    { id: 'services', label: 'Serviços (Lista)', icon: List },
    { id: 'artlab', label: 'Art Lab & Galeria', icon: Palette },
    { id: 'education', label: 'Cursos & Popups', icon: GraduationCap },
    { id: 'about', label: 'Sobre a Lara', icon: FileText },
    { id: 'testimonials', label: 'Depoimentos', icon: MessageCircle },
    { id: 'faq', label: 'Perguntas (FAQ)', icon: CheckCircle2 },
    { id: 'location', label: 'Localização & Contato', icon: MapPin },
    { id: 'footer', label: 'Rodapé', icon: Type },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    const success = await saveToSupabase();
    setIsSaving(false);
    
    if (success) {
        setShowSaveToast(true);
        setTimeout(() => setShowSaveToast(false), 3000);
    } else {
        alert("Erro ao salvar. Verifique se você está logado.");
    }
  };

  const handleRevert = async () => {
    if (confirm('Tem certeza que deseja descartar todas as alterações não salvas?')) {
        setIsReverting(true);
        await reloadFromSupabase();
        setIsReverting(false);
    }
  };

  const renderEditor = () => (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-200px)]">
      {/* Sub-sidebar do Editor */}
      <div className="w-full lg:w-72 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto custom-scrollbar pb-4 lg:pb-0 lg:pr-2 hide-scrollbar">
        <h4 className="hidden lg:block text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2 px-2 sticky top-0 bg-brand-charcoal z-10 py-2">Seções do Site</h4>
        {editorSectionsList.map((section) => (
          <button
            key={section.id}
            onClick={() => {
                setEditorSection(section.id as EditorSection);
                setEditingServiceIndex(null);
                setEditingGalleryIndex(null);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs uppercase tracking-widest font-bold text-left shrink-0 ${
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
                        <ColorPicker label="Cor Primária (Gold)" value={content.global.primaryColor} onChange={(v) => updateNestedContent(['global', 'primaryColor'], v)} />
                        <ColorPicker label="Cor Secundária (Rose)" value={content.global.secondaryColor} onChange={(v) => updateNestedContent(['global', 'secondaryColor'], v)} />
                    </div>
                </>
            )}

            {/* 2. NAVBAR */}
            {editorSection === 'navbar' && (
                <>
                    <InputGroup label="Nome da Marca (Logo Texto)" value={content.navbar.brandName} onChange={(v) => updateNestedContent(['navbar', 'brandName'], v)} />
                    <InputGroup label="Subtítulo da Marca" value={content.navbar.brandSubtitle} onChange={(v) => updateNestedContent(['navbar', 'brandSubtitle'], v)} />
                    
                    <div className="mt-8 pt-6 border-t border-white/5">
                        <h4 className="text-brand-gold text-xs uppercase font-bold mb-4">Links do Menu</h4>
                        <div className="space-y-3">
                            {content.navbar.items.map((item, idx) => (
                                <div key={idx} className="flex gap-3 items-center bg-brand-dark p-3 rounded-xl border border-white/5">
                                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">{idx + 1}</div>
                                    <div className="flex-1 grid grid-cols-2 gap-3">
                                        <input 
                                            type="text" 
                                            value={item.label}
                                            onChange={(e) => {
                                                const newItems = [...content.navbar.items];
                                                newItems[idx].label = e.target.value;
                                                updateNestedContent(['navbar', 'items'], newItems);
                                            }}
                                            placeholder="Nome"
                                            className="bg-transparent border-b border-white/10 text-xs p-1 focus:border-brand-gold outline-none"
                                        />
                                        <input 
                                            type="text" 
                                            value={item.href}
                                            onChange={(e) => {
                                                const newItems = [...content.navbar.items];
                                                newItems[idx].href = e.target.value;
                                                updateNestedContent(['navbar', 'items'], newItems);
                                            }}
                                            placeholder="Link (#secao)"
                                            className="bg-transparent border-b border-white/10 text-xs p-1 focus:border-brand-gold outline-none text-white/50 font-mono"
                                        />
                                    </div>
                                    <button 
                                        onClick={() => {
                                            const newItems = content.navbar.items.filter((_, i) => i !== idx);
                                            updateNestedContent(['navbar', 'items'], newItems);
                                        }}
                                        className="p-2 text-white/20 hover:text-red-500 hover:bg-white/5 rounded-lg"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                            <button 
                                onClick={() => {
                                    const newItems = [...content.navbar.items, { label: 'Novo Link', href: '#' }];
                                    updateNestedContent(['navbar', 'items'], newItems);
                                }}
                                className="w-full py-3 border border-dashed border-white/20 rounded-xl text-white/40 hover:text-brand-gold hover:border-brand-gold hover:bg-brand-gold/5 text-xs uppercase font-bold flex items-center justify-center gap-2"
                            >
                                <Plus size={14} /> Adicionar Link
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/5">
                        <InputGroup label="Texto Botão CTA" value={content.navbar.ctaText} onChange={(v) => updateNestedContent(['navbar', 'ctaText'], v)} />
                        <InputGroup label="Link Botão CTA" value={content.navbar.ctaLink} onChange={(v) => updateNestedContent(['navbar', 'ctaLink'], v)} icon={<LinkIcon size={14}/>} />
                    </div>
                </>
            )}

            {/* 3. HERO */}
            {editorSection === 'hero' && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageUpload label="Imagem de Fundo (Desktop)" preview={content.hero.bgImage} onChange={(v) => updateNestedContent(['hero', 'bgImage'], v)} />
                        <ImageUpload label="Imagem de Fundo (Mobile)" preview={content.hero.bgImageMobile || content.hero.bgImage} onChange={(v) => updateNestedContent(['hero', 'bgImageMobile'], v)} />
                    </div>
                    <InputGroup label="Título Principal" value={content.hero.title} onChange={(v) => updateNestedContent(['hero', 'title'], v)} />
                    <InputGroup label="Destaque do Título (Rose)" value={content.hero.titleHighlight} onChange={(v) => updateNestedContent(['hero', 'titleHighlight'], v)} />
                    <InputGroup label="Subtítulo" value={content.hero.subtitle} onChange={(v) => updateNestedContent(['hero', 'subtitle'], v)} />
                    
                    <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                        <h5 className="text-brand-gold text-xs uppercase font-bold mb-4">Botões de Ação</h5>
                        <div className="grid grid-cols-2 gap-4">
                            <InputGroup label="Texto Botão 1" value={content.hero.button1Text} onChange={(v) => updateNestedContent(['hero', 'button1Text'], v)} />
                            <InputGroup label="Link Botão 1" value={content.hero.button1Link} onChange={(v) => updateNestedContent(['hero', 'button1Link'], v)} />
                            <InputGroup label="Texto Botão 2" value={content.hero.button2Text} onChange={(v) => updateNestedContent(['hero', 'button2Text'], v)} />
                            <InputGroup label="Link Botão 2" value={content.hero.button2Link} onChange={(v) => updateNestedContent(['hero', 'button2Link'], v)} />
                        </div>
                    </div>
                </>
            )}

            {/* 4. CONCEPT */}
            {editorSection === 'concept' && (
                <>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-1/3 space-y-4">
                            <ImageUpload label="Imagem Lateral (Desktop)" preview={content.concept.image} onChange={(v) => updateNestedContent(['concept', 'image'], v)} />
                            <ImageUpload label="Imagem Lateral (Mobile)" preview={content.concept.imageMobile || content.concept.image} onChange={(v) => updateNestedContent(['concept', 'imageMobile'], v)} />
                        </div>
                        <div className="w-full md:w-2/3 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup label="Número Destaque" value={content.concept.yearsNumber} onChange={(v) => updateNestedContent(['concept', 'yearsNumber'], v)} />
                                <InputGroup label="Texto Destaque" value={content.concept.yearsText} onChange={(v) => updateNestedContent(['concept', 'yearsText'], v)} />
                            </div>
                            <InputGroup label="Título da Seção" value={content.concept.title} onChange={(v) => updateNestedContent(['concept', 'title'], v)} />
                            <TextAreaGroup label="Texto do Conceito" value={content.concept.description} onChange={(v) => updateNestedContent(['concept', 'description'], v)} height="h-32" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                         <div>
                            <InputGroup label="Diferencial 1 - Título" value={content.concept.diff1Title} onChange={(v) => updateNestedContent(['concept', 'diff1Title'], v)} />
                            <TextAreaGroup label="Diferencial 1 - Desc" value={content.concept.diff1Desc} onChange={(v) => updateNestedContent(['concept', 'diff1Desc'], v)} height="h-20" />
                         </div>
                         <div>
                            <InputGroup label="Diferencial 2 - Título" value={content.concept.diff2Title} onChange={(v) => updateNestedContent(['concept', 'diff2Title'], v)} />
                            <TextAreaGroup label="Diferencial 2 - Desc" value={content.concept.diff2Desc} onChange={(v) => updateNestedContent(['concept', 'diff2Desc'], v)} height="h-20" />
                         </div>
                    </div>
                </>
            )}

            {/* 5. SHIELD (PELE BLINDADA) */}
            {editorSection === 'shield' && (
                <>
                    <InputGroup label="Título da Seção" value={content.shield.title} onChange={(v) => updateNestedContent(['shield', 'title'], v)} />
                    <InputGroup label="Subtítulo" value={content.shield.subtitle} onChange={(v) => updateNestedContent(['shield', 'subtitle'], v)} />
                    <InputGroup label="Frase de Impacto (Quote)" value={content.shield.quote} onChange={(v) => updateNestedContent(['shield', 'quote'], v)} />
                    
                    <h5 className="text-brand-gold text-xs uppercase font-bold mt-6 mb-2">Cards de Resistência</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {content.shield.cards.map((card, idx) => (
                           <div key={idx} className="p-4 bg-brand-dark rounded-xl border border-white/5">
                                <InputGroup 
                                    label={`Card ${idx+1} - Título`} 
                                    value={card.title} 
                                    onChange={(v) => {
                                        const newCards = [...content.shield.cards];
                                        newCards[idx].title = v;
                                        updateNestedContent(['shield', 'cards'], newCards);
                                    }} 
                                />
                                <TextAreaGroup 
                                    label={`Card ${idx+1} - Desc`} 
                                    value={card.desc} 
                                    onChange={(v) => {
                                        const newCards = [...content.shield.cards];
                                        newCards[idx].desc = v;
                                        updateNestedContent(['shield', 'cards'], newCards);
                                    }} 
                                    height="h-20" 
                                />
                            </div> 
                        ))}
                    </div>
                </>
            )}

            {/* 6. SERVICES (LIST) */}
            {editorSection === 'services' && (
                <div className="space-y-4">
                    <InputGroup label="Título da Seção" value={content.services.title} onChange={(v) => updateNestedContent(['services', 'title'], v)} />
                    
                    {editingServiceIndex === null ? (
                        <div className="mt-8">
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Lista de Serviços</label>
                            </div>
                            <div className="space-y-3">
                                {content.services.items.map((service, idx) => (
                                    <div key={idx} className="p-4 bg-brand-dark rounded-xl border border-white/5 flex gap-4 items-center group hover:border-brand-gold/30 transition-colors">
                                        <div className="w-16 h-16 bg-white/5 rounded-lg overflow-hidden shrink-0">
                                            <img src={service.image} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-serif text-white">{service.title}</h4>
                                            <p className="text-[10px] text-white/40 uppercase mt-1 line-clamp-1">{service.description}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => setEditingServiceIndex(idx)}
                                                className="p-2 text-white/40 hover:text-brand-gold"
                                            >
                                                <Edit size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-brand-dark p-6 rounded-2xl border border-white/10 mt-6 relative animate-in fade-in slide-in-from-bottom-4">
                            <button 
                                onClick={() => setEditingServiceIndex(null)}
                                className="absolute top-4 right-4 text-xs uppercase font-bold text-white/40 hover:text-white"
                            >
                                Cancelar
                            </button>
                            <h4 className="font-serif text-xl mb-6 text-brand-gold">Editando Serviço</h4>
                            
                            <ImageUpload label="Imagem do Card" preview={content.services.items[editingServiceIndex].image} onChange={(v) => {
                                const newItems = [...content.services.items];
                                newItems[editingServiceIndex].image = v;
                                updateNestedContent(['services', 'items'], newItems);
                            }} />
                            
                            <InputGroup 
                                label="Título do Serviço" 
                                value={content.services.items[editingServiceIndex].title} 
                                onChange={(v) => {
                                    const newItems = [...content.services.items];
                                    newItems[editingServiceIndex].title = v;
                                    updateNestedContent(['services', 'items'], newItems);
                                }} 
                            />
                            <TextAreaGroup 
                                label="Descrição Curta" 
                                value={content.services.items[editingServiceIndex].description} 
                                onChange={(v) => {
                                    const newItems = [...content.services.items];
                                    newItems[editingServiceIndex].description = v;
                                    updateNestedContent(['services', 'items'], newItems);
                                }} 
                            />
                        </div>
                    )}
                </div>
            )}

            {/* 7. ART LAB & GALLERY */}
            {editorSection === 'artlab' && (
                <>
                    <ImageUpload label="Imagem de Fundo (Seção)" preview={content.artLab.bgImage} onChange={(v) => updateNestedContent(['artLab', 'bgImage'], v)} />
                    <InputGroup label="Título" value={content.artLab.title} onChange={(v) => updateNestedContent(['artLab', 'title'], v)} />
                    <TextAreaGroup label="Texto Descritivo" value={content.artLab.description} onChange={(v) => updateNestedContent(['artLab', 'description'], v)} />
                    <InputGroup label="Texto Botão" value={content.artLab.buttonText} onChange={(v) => updateNestedContent(['artLab', 'buttonText'], v)} />
                    
                    <div className="mt-8 pt-8 border-t border-white/5">
                        <h4 className="font-serif text-xl text-brand-gold mb-4">Overlay da Galeria</h4>
                        <InputGroup label="Título do Overlay" value={content.artLab.overlayTitle} onChange={(v) => updateNestedContent(['artLab', 'overlayTitle'], v)} />
                        <InputGroup label="Subtítulo" value={content.artLab.overlaySubtitle} onChange={(v) => updateNestedContent(['artLab', 'overlaySubtitle'], v)} />
                        <TextAreaGroup label="Frase Final" value={content.artLab.overlayDesc} onChange={(v) => updateNestedContent(['artLab', 'overlayDesc'], v)} />

                        {/* GALLERY MANAGER */}
                        {editingGalleryIndex === null ? (
                            <div className="mt-8">
                                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-4 block font-bold">Imagens da Galeria ({content.artLab.galleryImages.length})</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {content.artLab.galleryImages.map((img, idx) => (
                                        <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-brand-dark">
                                            <img src={img.url} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                                <p className="text-[10px] text-white text-center line-clamp-1">{img.title}</p>
                                                <div className="flex gap-2">
                                                    <button 
                                                        onClick={() => setEditingGalleryIndex(idx)}
                                                        className="p-3 bg-brand-gold text-brand-dark rounded-full hover:scale-110"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            const newImages = content.artLab.galleryImages.filter((_, i) => i !== idx);
                                                            updateNestedContent(['artLab', 'galleryImages'], newImages);
                                                        }}
                                                        className="p-3 bg-red-500 text-white rounded-full hover:scale-110"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/50 text-[8px] text-white uppercase rounded-md backdrop-blur-sm">
                                                {img.category}
                                            </span>
                                        </div>
                                    ))}
                                    <button 
                                        onClick={() => {
                                            const newImage: GalleryImage = {
                                                url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=1935',
                                                title: 'Nova Imagem',
                                                desc: 'Descrição da imagem',
                                                category: 'artisticas'
                                            };
                                            updateNestedContent(['artLab', 'galleryImages'], [...content.artLab.galleryImages, newImage]);
                                            setEditingGalleryIndex(content.artLab.galleryImages.length);
                                        }}
                                        className="aspect-square rounded-xl border border-dashed border-white/20 flex flex-col items-center justify-center gap-2 text-white/40 hover:text-brand-gold hover:border-brand-gold hover:bg-brand-gold/5 transition-all"
                                    >
                                        <Plus size={24} />
                                        <span className="text-[10px] uppercase font-bold">Add Foto</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-brand-dark p-6 rounded-2xl border border-white/10 mt-6 relative animate-in fade-in slide-in-from-bottom-4">
                                <button 
                                    onClick={() => setEditingGalleryIndex(null)}
                                    className="absolute top-4 right-4 text-xs uppercase font-bold text-white/40 hover:text-white"
                                >
                                    Voltar
                                </button>
                                <h4 className="font-serif text-xl mb-6 text-brand-gold">Editando Imagem da Galeria</h4>
                                
                                <ImageUpload label="Foto" preview={content.artLab.galleryImages[editingGalleryIndex].url} onChange={(v) => {
                                    const newImages = [...content.artLab.galleryImages];
                                    newImages[editingGalleryIndex].url = v;
                                    updateNestedContent(['artLab', 'galleryImages'], newImages);
                                }} />

                                <div className="grid grid-cols-2 gap-4">
                                    <InputGroup 
                                        label="Título" 
                                        value={content.artLab.galleryImages[editingGalleryIndex].title} 
                                        onChange={(v) => {
                                            const newImages = [...content.artLab.galleryImages];
                                            newImages[editingGalleryIndex].title = v;
                                            updateNestedContent(['artLab', 'galleryImages'], newImages);
                                        }} 
                                    />
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">Categoria</label>
                                        <select 
                                            value={content.artLab.galleryImages[editingGalleryIndex].category}
                                            onChange={(e) => {
                                                const newImages = [...content.artLab.galleryImages];
                                                newImages[editingGalleryIndex].category = e.target.value;
                                                updateNestedContent(['artLab', 'galleryImages'], newImages);
                                            }}
                                            className="w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-sm transition-all text-white/80 h-[54px]"
                                        >
                                            <option value="noivas">Noivas</option>
                                            <option value="formandas">Formandas</option>
                                            <option value="sociais">Sociais</option>
                                            <option value="artisticas">Artísticas</option>
                                        </select>
                                    </div>
                                </div>
                                <TextAreaGroup 
                                    label="Descrição (Hover)" 
                                    value={content.artLab.galleryImages[editingGalleryIndex].desc} 
                                    height="h-24"
                                    onChange={(v) => {
                                        const newImages = [...content.artLab.galleryImages];
                                        newImages[editingGalleryIndex].desc = v;
                                        updateNestedContent(['artLab', 'galleryImages'], newImages);
                                    }} 
                                />
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* 8. EDUCATION & POPUP */}
            {editorSection === 'education' && (
                <>
                    <div className="flex gap-6">
                        <div className="flex-1 space-y-4">
                            <InputGroup label="Título" value={content.education.title} onChange={(v) => updateNestedContent(['education', 'title'], v)} />
                            <TextAreaGroup label="Texto Principal" value={content.education.description} onChange={(v) => updateNestedContent(['education', 'description'], v)} />
                            
                            <div className="bg-brand-dark p-4 rounded-xl border border-white/5">
                                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-4 block font-bold">Lista: O que você vai aprender</label>
                                <div className="space-y-2">
                                    {content.education.list.map((item, i) => (
                                        <div key={i} className="flex gap-2 items-center">
                                            <div className="w-2 h-2 rounded-full bg-brand-gold shrink-0" />
                                            <input 
                                                type="text" 
                                                value={item}
                                                onChange={(e) => {
                                                    const newList = [...content.education.list];
                                                    newList[i] = e.target.value;
                                                    updateNestedContent(['education', 'list'], newList);
                                                }}
                                                className="flex-1 bg-white/5 border border-white/5 rounded-lg px-3 py-2 text-sm text-white/80 focus:border-brand-gold outline-none"
                                            />
                                            <button 
                                                onClick={() => {
                                                    const newList = content.education.list.filter((_, idx) => idx !== i);
                                                    updateNestedContent(['education', 'list'], newList);
                                                }}
                                                className="text-white/20 hover:text-red-500"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    <button 
                                        onClick={() => updateNestedContent(['education', 'list'], [...content.education.list, 'Novo tópico de aprendizado'])}
                                        className="text-xs text-brand-gold font-bold uppercase tracking-widest mt-2 hover:underline"
                                    >
                                        + Adicionar Item
                                    </button>
                                </div>
                            </div>

                            <InputGroup label="Texto Botão CTA" value={content.education.buttonText} onChange={(v) => updateNestedContent(['education', 'buttonText'], v)} />
                        </div>
                        <div className="w-1/3">
                            <ImageUpload label="Imagem Circular" preview={content.education.image} onChange={(v) => updateNestedContent(['education', 'image'], v)} />
                            <InputGroup label="Texto do Badge" value={content.education.badgeText} onChange={(v) => updateNestedContent(['education', 'badgeText'], v)} />
                        </div>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-white/5 bg-brand-rose/5 p-6 rounded-2xl">
                         <h4 className="font-serif text-xl text-brand-rose mb-4 flex items-center gap-2"><Sparkles size={18}/> Popup Lista de Espera</h4>
                         <InputGroup label="Título do Popup" value={content.education.waitlistPopup.title} onChange={(v) => updateNestedContent(['education', 'waitlistPopup', 'title'], v)} />
                         <InputGroup label="Texto Botão" value={content.education.waitlistPopup.buttonText} onChange={(v) => updateNestedContent(['education', 'waitlistPopup', 'buttonText'], v)} />
                         <TextAreaGroup label="Mensagem Principal" value={content.education.waitlistPopup.text} onChange={(v) => updateNestedContent(['education', 'waitlistPopup', 'text'], v)} />
                    </div>
                </>
            )}

            {/* 9. ABOUT */}
            {editorSection === 'about' && (
                 <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ImageUpload label="Foto de Perfil (Desktop)" preview={content.about.image} onChange={(v) => updateNestedContent(['about', 'image'], v)} />
                        <ImageUpload label="Foto de Perfil (Mobile)" preview={content.about.imageMobile || content.about.image} onChange={(v) => updateNestedContent(['about', 'imageMobile'], v)} />
                    </div>
                    <InputGroup label="Título da Seção" value={content.about.title} onChange={(v) => updateNestedContent(['about', 'title'], v)} />
                    <div className="space-y-2">
                        {content.about.paragraphs.map((p, i) => (
                             <TextAreaGroup 
                                key={i}
                                label={`Parágrafo ${i+1}`} 
                                value={p} 
                                onChange={(v) => {
                                    const newP = [...content.about.paragraphs];
                                    newP[i] = v;
                                    updateNestedContent(['about', 'paragraphs'], newP);
                                }} 
                                height="h-24" 
                            />
                        ))}
                    </div>
                 </>
            )}

            {/* 10. TESTIMONIALS */}
            {editorSection === 'testimonials' && (
                <div>
                     <InputGroup label="Título da Seção" value={content.testimonials.title} onChange={(v) => updateNestedContent(['testimonials', 'title'], v)} />
                     <div className="mt-6 space-y-4">
                        {content.testimonials.items.map((item, i) => (
                             <div key={i} className="p-4 bg-brand-dark rounded-xl border border-white/5 relative group">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 overflow-hidden"><img src={item.image} className="w-full h-full object-cover" /></div>
                                    <div className="flex-1">
                                        <input 
                                            type="text" 
                                            value={item.name} 
                                            onChange={(e) => {
                                                 const newItems = [...content.testimonials.items];
                                                 newItems[i].name = e.target.value;
                                                 updateNestedContent(['testimonials', 'items'], newItems);
                                            }}
                                            className="bg-transparent border-none text-brand-gold font-serif w-full mb-1" 
                                        />
                                        <textarea 
                                            className="w-full bg-transparent text-xs text-white/60 resize-none h-12 outline-none border-none" 
                                            value={item.content} 
                                            onChange={(e) => {
                                                 const newItems = [...content.testimonials.items];
                                                 newItems[i].content = e.target.value;
                                                 updateNestedContent(['testimonials', 'items'], newItems);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                         {/* Simple Image Edit for Testimonial - Now Using Upload */}
                                         <div className="p-1 bg-white/10 rounded hover:bg-white/20">
                                            <ImageUpload label="" preview={item.image} onChange={(url) => {
                                                const newItems = [...content.testimonials.items];
                                                newItems[i].image = url;
                                                updateNestedContent(['testimonials', 'items'], newItems);
                                            }} />
                                         </div>
                                         <button className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500 hover:text-white" onClick={() => {
                                             const newItems = content.testimonials.items.filter((_, idx) => idx !== i);
                                             updateNestedContent(['testimonials', 'items'], newItems);
                                         }}>
                                             <Trash2 size={16} />
                                         </button>
                                    </div>
                                </div>
                             </div>
                        ))}
                         <button 
                            onClick={() => {
                                const newItem: Testimonial = {
                                    id: Date.now().toString(),
                                    name: 'Novo Depoimento',
                                    role: 'Cliente',
                                    content: 'Escreva o depoimento aqui...',
                                    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964'
                                };
                                updateNestedContent(['testimonials', 'items'], [...content.testimonials.items, newItem]);
                            }}
                            className="w-full py-3 border border-dashed border-white/20 rounded-xl text-white/40 hover:text-brand-gold hover:border-brand-gold hover:bg-brand-gold/5 text-xs uppercase font-bold"
                        >
                            + Adicionar Depoimento
                        </button>
                     </div>
                </div>
            )}

            {/* 11. FAQ */}
            {editorSection === 'faq' && (
                <div>
                    <InputGroup label="Título da Seção" value={content.faq.title} onChange={(v) => updateNestedContent(['faq', 'title'], v)} />
                    <div className="mt-6 space-y-4">
                        {content.faq.items.map((item, i) => (
                            <div key={i} className="p-4 bg-brand-dark rounded-xl border border-white/5 group">
                                <div className="flex justify-between mb-2">
                                    <label className="text-[8px] uppercase text-brand-gold font-bold">Pergunta</label>
                                    <button 
                                        onClick={() => {
                                            const newItems = content.faq.items.filter((_, idx) => idx !== i);
                                            updateNestedContent(['faq', 'items'], newItems);
                                        }}
                                        className="text-white/20 hover:text-red-500 p-2 -m-2"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <input 
                                    type="text" 
                                    value={item.question}
                                    onChange={(e) => {
                                        const newItems = [...content.faq.items];
                                        newItems[i].question = e.target.value;
                                        updateNestedContent(['faq', 'items'], newItems);
                                    }} 
                                    className="w-full bg-transparent border-b border-white/10 pb-2 mb-3 text-sm font-serif outline-none focus:border-brand-gold" 
                                />
                                
                                <label className="text-[8px] uppercase text-white/30 font-bold mb-1 block">Resposta</label>
                                <textarea 
                                    value={item.answer} 
                                    onChange={(e) => {
                                        const newItems = [...content.faq.items];
                                        newItems[i].answer = e.target.value;
                                        updateNestedContent(['faq', 'items'], newItems);
                                    }}
                                    className="w-full bg-transparent text-xs text-white/60 resize-none h-16 outline-none" 
                                />
                            </div>
                        ))}
                        <button 
                            onClick={() => {
                                const newItems = [...content.faq.items, { question: "Nova Pergunta", answer: "Nova Resposta" }];
                                updateNestedContent(['faq', 'items'], newItems);
                            }}
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
                    <InputGroup label="Título" value={content.location.title} onChange={(v) => updateNestedContent(['location', 'title'], v)} />
                    <InputGroup label="Endereço Principal" value={content.location.address} onChange={(v) => updateNestedContent(['location', 'address'], v)} />
                    <InputGroup label="WhatsApp Exibição" value={content.location.whatsappDisplay} onChange={(v) => updateNestedContent(['location', 'whatsappDisplay'], v)} />
                    <InputGroup label="Instagram Social" value={content.location.instagramDisplay} onChange={(v) => updateNestedContent(['location', 'instagramDisplay'], v)} />
                    <div className="mt-4">
                        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">Google Maps Embed URL (Iframe src)</label>
                        <input 
                            type="text" 
                            value={content.location.mapUrl}
                            onChange={(e) => updateNestedContent(['location', 'mapUrl'], e.target.value)}
                            className="w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-xs text-white/50 font-mono truncate" 
                        />
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/5">
                        <InputGroup label="Box CTA - Título" value={content.location.ctaTitle} onChange={(v) => updateNestedContent(['location', 'ctaTitle'], v)} />
                        <InputGroup label="Box CTA - Texto" value={content.location.ctaText} onChange={(v) => updateNestedContent(['location', 'ctaText'], v)} />
                        <InputGroup label="Box CTA - Botão" value={content.location.ctaButton} onChange={(v) => updateNestedContent(['location', 'ctaButton'], v)} />
                    </div>
                </>
            )}

            {editorSection === 'footer' && (
                <>
                    <TextAreaGroup label="Texto Bio Rodapé" value={content.footer.bio} onChange={(v) => updateNestedContent(['footer', 'bio'], v)} />
                    <InputGroup label="Link Instagram Principal" value={content.footer.instagramMain} onChange={(v) => updateNestedContent(['footer', 'instagramMain'], v)} />
                    <InputGroup label="Link Instagram Artístico" value={content.footer.instagramArt} onChange={(v) => updateNestedContent(['footer', 'instagramArt'], v)} />
                    <InputGroup label="Texto Botão Flutuante" value={content.footer.floatingCtaText} onChange={(v) => updateNestedContent(['footer', 'floatingCtaText'], v)} />
                </>
            )}

        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-gold selection:text-brand-dark">
      {/* Sidebar Principal */}
      <aside className="hidden lg:flex w-72 bg-brand-charcoal border-r border-white/5 p-6 flex-col z-40 h-screen sticky top-0">
        <div className="mb-10 px-4">
          <span className="font-serif text-xl tracking-widest text-brand-gold font-bold uppercase block">{content.navbar.brandName}</span>
          <span className="text-[8px] tracking-[0.4em] text-brand-rose uppercase">CMS Admin v3.0</span>
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
      <main className="flex-1 p-6 md:p-8 lg:p-12 pb-24 lg:pb-12 overflow-y-auto max-h-screen custom-scrollbar relative">
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
                    <StatCard title="Visitas Hoje" value={visitsCount.toString()} color="brand-gold" />
                    <StatCard title="Cliques no WhatsApp" value={whatsappClicksCount.toString()} color="brand-rose" />
                    <StatCard title="Leads Cursos" value={waitlistCount.toString()} color="white" />
                    
                    <div className="md:col-span-3 bg-brand-charcoal rounded-3xl p-8 border border-white/5">
                        <h3 className="font-serif text-xl mb-6 text-brand-gold">Leads da Lista de Espera</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-white/70">
                                <thead className="text-xs uppercase bg-brand-dark/50 text-white/40">
                                    <tr>
                                        <th className="px-6 py-3 rounded-tl-xl">Nome</th>
                                        <th className="px-6 py-3">E-mail</th>
                                        <th className="px-6 py-3">WhatsApp</th>
                                        <th className="px-6 py-3 rounded-tr-xl">Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.length > 0 ? leads.map((lead, idx) => (
                                        <tr key={lead.id || idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-medium text-white">{lead.name}</td>
                                            <td className="px-6 py-4">{lead.email}</td>
                                            <td className="px-6 py-4">
                                                <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">
                                                    {lead.phone}
                                                </a>
                                            </td>
                                            <td className="px-6 py-4">{new Date(lead.created_at).toLocaleDateString('pt-BR')}</td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-8 text-center text-white/30 italic">Nenhum lead cadastrado ainda.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="md:col-span-3 bg-brand-charcoal rounded-3xl p-8 border border-white/5">
                    <h3 className="font-serif text-xl mb-6 text-brand-gold">Visão Geral do Conteúdo</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                         <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                             <span className="text-[10px] uppercase text-white/40 block">Versão do Site</span>
                             <span className="text-lg font-bold text-white">v3.0 (Connected)</span>
                         </div>
                         <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                             <span className="text-[10px] uppercase text-white/40 block">Último Backup</span>
                             <span className="text-lg font-bold text-white">Automático</span>
                         </div>
                         <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                             <span className="text-[10px] uppercase text-white/40 block">Status Sistema</span>
                             <span className="text-lg font-bold text-green-500">Online</span>
                         </div>
                         <div className="p-4 bg-brand-dark rounded-xl border border-white/5">
                             <span className="text-[10px] uppercase text-white/40 block">Banco de Dados</span>
                             <span className="text-lg font-bold text-white">Supabase</span>
                         </div>
                    </div>
                    </div>
                </div>
                )}

                {activeTab === 'editor' && renderEditor()}

                {/* GALERIA / FOTOS MANAGER */}
                {activeTab === 'media' && (
                    <GalleryManager content={content} updateContent={updateContent} />
                )}

                {activeTab === 'qr' && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <h2 className="text-3xl font-serif text-white italic mb-2">QR Code</h2>
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-12">Compartilhe seu site facilmente</p>
                        
                        <div className="bg-white p-8 rounded-3xl shadow-2xl mb-8">
                            <img 
                                src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.origin)}`} 
                                alt="QR Code do Site" 
                                className="w-64 h-64"
                            />
                        </div>
                        
                        <a 
                            href={`https://api.qrserver.com/v1/create-qr-code/?size=1000x1000&data=${encodeURIComponent(window.location.origin)}`}
                            download="qrcode-laraluiza.png"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-brand-gold text-brand-dark rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform flex items-center gap-2"
                        >
                            <Upload size={16} className="rotate-180" /> Baixar QR Code em Alta Qualidade
                        </a>
                    </div>
                )}
                {activeTab === 'dns' && (
                    <div className="max-w-3xl mx-auto py-10">
                        <h2 className="text-3xl font-serif text-white italic mb-2">Domínio & DNS</h2>
                        <p className="text-white/40 text-xs uppercase tracking-widest mb-12">Configurações para colocar seu site no ar</p>
                        
                        <div className="bg-brand-charcoal rounded-3xl p-8 border border-white/5 space-y-6">
                            <h3 className="text-xl font-serif text-brand-gold">Apontamento de Domínio</h3>
                            <p className="text-sm text-white/70 leading-relaxed">
                                Para que o seu site seja acessado através de <strong>www.laraluizamakeup.com.br</strong>, você precisa configurar os apontamentos DNS onde o seu domínio foi registrado (ex: Registro.br, Hostinger, GoDaddy).
                            </p>
                            
                            <div className="bg-brand-dark p-6 rounded-xl border border-white/10">
                                <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-bold">Entrada A (Principal)</h4>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div><span className="text-white/40 block text-xs">Tipo</span><span className="text-white font-mono">A</span></div>
                                    <div><span className="text-white/40 block text-xs">Nome / Host</span><span className="text-white font-mono">@ (ou vazio)</span></div>
                                    <div><span className="text-white/40 block text-xs">Valor / IP</span><span className="text-brand-gold font-mono">76.76.21.21</span></div>
                                </div>
                            </div>

                            <div className="bg-brand-dark p-6 rounded-xl border border-white/10">
                                <h4 className="text-xs uppercase tracking-widest text-white/40 mb-4 font-bold">Entrada CNAME (Subdomínio WWW)</h4>
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                    <div><span className="text-white/40 block text-xs">Tipo</span><span className="text-white font-mono">CNAME</span></div>
                                    <div><span className="text-white/40 block text-xs">Nome / Host</span><span className="text-white font-mono">www</span></div>
                                    <div><span className="text-white/40 block text-xs">Valor / Destino</span><span className="text-brand-gold font-mono">cname.vercel-dns.com</span></div>
                                </div>
                            </div>

                            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                                <p className="text-xs text-blue-200 leading-relaxed">
                                    <strong>Nota:</strong> Os valores de IP e CNAME acima são exemplos para hospedagem na Vercel. Se você hospedar em outra plataforma (como Netlify ou Hostinger), os valores serão diferentes. A propagação do DNS pode levar até 24 horas.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                
            </motion.div>
        </AnimatePresence>

        {/* Floating Action Bar */}
        {(activeTab === 'editor' || activeTab === 'media') && (
            <div className="fixed bottom-16 lg:bottom-0 left-0 lg:left-72 right-0 p-4 lg:p-6 border-t border-white/5 bg-brand-charcoal/95 backdrop-blur-md z-50 flex justify-end gap-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                <button 
                    onClick={handleRevert}
                    disabled={isReverting}
                    className="px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-xs uppercase tracking-widest font-bold transition-all disabled:opacity-50 flex items-center gap-2"
                >
                    {isReverting ? <Loader2 size={14} className="animate-spin" /> : null}
                    Reverter
                </button>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-8 py-3 bg-brand-gold text-brand-dark rounded-xl text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)] disabled:opacity-50"
                >
                    {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
                    {isSaving ? 'Salvando...' : 'Salvar Tudo'}
                </button>
            </div>
        )}

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

      {/* Mobile Bottom Nav */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-brand-charcoal/90 backdrop-blur-xl border-t border-white/10 z-50 px-6 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] flex justify-between items-center">
        {menuItems.slice(0, 4).map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === item.id ? 'text-brand-gold' : 'text-white/40'
            }`}
          >
            <item.icon size={20} />
            <span className="text-[8px] uppercase tracking-widest font-bold">{item.label.split(' ')[0]}</span>
          </button>
        ))}
        
        <div className="relative">
            <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`flex flex-col items-center gap-1 transition-colors ${
                isMobileMenuOpen ? 'text-brand-gold' : 'text-white/40'
                }`}
            >
                <Menu size={20} />
                <span className="text-[8px] uppercase tracking-widest font-bold">Mais</span>
            </button>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="absolute bottom-full right-0 mb-4 w-48 bg-brand-charcoal border border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2"
                    >
                        {menuItems.slice(4).map((item) => (
                             <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id as any);
                                    setIsMobileMenuOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                                    activeTab === item.id ? 'bg-brand-gold text-brand-dark font-bold' : 'text-white/60 hover:bg-white/5'
                                }`}
                            >
                                <item.icon size={16} />
                                <span className="text-xs uppercase tracking-widest">{item.label}</span>
                            </button>
                        ))}
                        <div className="h-[1px] bg-white/5 my-2" />
                        <button 
                            onClick={onLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all text-left"
                        >
                            <LogOut size={16} />
                            <span className="text-xs uppercase tracking-widest">Sair</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// Components Auxiliares

interface StatCardProps {
  title: string;
  value: string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color }) => (
  <div className="bg-brand-charcoal p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-white/10 transition-colors">
    <div className={`absolute top-0 right-0 w-20 h-20 bg-${color}/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`} />
    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-2 relative z-10">{title}</p>
    <p className={`text-4xl font-serif font-bold italic text-${color} relative z-10 group-hover:scale-105 transition-transform`}>{value}</p>
  </div>
);

interface InputGroupProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  onChange?: (v: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, value, icon, onChange }) => (
    <div>
        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">{label}</label>
        <div className="relative">
            {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">{icon}</div>}
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className={`w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-sm transition-all text-white/80 focus:bg-white/5 ${icon ? 'pl-11' : ''}`} 
            />
        </div>
    </div>
);

interface TextAreaGroupProps {
  label: string;
  value: string;
  height?: string;
  onChange?: (v: string) => void;
}

const TextAreaGroup: React.FC<TextAreaGroupProps> = ({ label, value, height = 'h-32', onChange }) => (
    <div>
        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">{label}</label>
        <textarea 
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={`w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-sm transition-all text-white/80 focus:bg-white/5 resize-none ${height}`} 
        />
    </div>
);

interface ColorPickerProps {
  label: string;
  value: string;
  onChange?: (v: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => (
    <div>
        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">{label}</label>
        <div className="flex items-center gap-3 bg-brand-dark border border-white/10 p-2 rounded-xl">
            <input 
                type="color" 
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-10 h-10 rounded-lg bg-transparent border-none cursor-pointer" 
            />
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-white/70 font-mono w-full uppercase"
            />
        </div>
    </div>
);

interface ImageUploadProps {
  label: string;
  preview: string;
  onChange?: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, preview, onChange }) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('portfolio-images')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage
                .from('portfolio-images')
                .getPublicUrl(filePath);

            onChange?.(data.publicUrl);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Erro ao fazer upload da imagem.');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="mb-6">
            <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">{label}</label>
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group bg-brand-dark">
                {isUploading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-brand-charcoal z-20">
                        <Loader2 className="animate-spin text-brand-gold mb-2" />
                        <span className="text-xs text-white/50">Enviando...</span>
                    </div>
                ) : (
                    <img src={preview} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                )}
                
                <div className="absolute inset-0 flex items-center justify-center">
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="px-6 py-3 bg-brand-charcoal/80 backdrop-blur-md border border-white/20 text-white rounded-lg text-xs uppercase tracking-widest font-bold hover:bg-brand-gold hover:text-brand-dark hover:border-brand-gold transition-all flex items-center gap-2"
                    >
                        <Upload size={14} /> Trocar Imagem
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
            </div>
            {/* Opção de URL direta caso falhe o upload */}
            <details className="mt-2 text-[10px] text-white/30 cursor-pointer">
                <summary>Usar URL externa (avançado)</summary>
                <input 
                    type="text" 
                    value={preview}
                    onChange={(e) => onChange?.(e.target.value)}
                    className="w-full mt-2 bg-transparent border border-white/10 rounded p-2 text-white/80"
                    placeholder="https://..."
                />
            </details>
        </div>
    );
};

interface DnsRecordProps {
  label: string;
  value: string;
  status: string;
}

const DnsRecord: React.FC<DnsRecordProps> = ({ label, value, status }) => (
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
