
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Image as ImageIcon, FileText, 
  QrCode, Settings, LogOut, ChevronRight, 
  Plus, Trash2, Globe, Save, Upload, ExternalLink,
  Palette, Type, Layout, Smartphone, Monitor, Eye,
  CheckCircle2, X
} from 'lucide-react';

interface AdminProps {
  onLogout: () => void;
}

export const AdminArea: React.FC<AdminProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dash' | 'editor' | 'media' | 'qr' | 'dns'>('dash');
  const [editorSection, setEditorSection] = useState<'global' | 'hero' | 'about' | 'services' | 'footer'>('global');
  const [qrValue, setQrValue] = useState('https://laraluizamakeup.com.br');
  const [showSaveToast, setShowSaveToast] = useState(false);

  const menuItems = [
    { id: 'dash', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'editor', label: 'Editor Visual', icon: Palette },
    { id: 'media', label: 'Galeria/Fotos', icon: ImageIcon },
    { id: 'qr', label: 'QR Codes', icon: QrCode },
    { id: 'dns', label: 'Domínio/DNS', icon: Globe },
  ];

  const handleSave = () => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const renderEditor = () => (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-200px)]">
      {/* Sub-sidebar do Editor */}
      <div className="w-full lg:w-64 flex flex-col gap-2">
        <h4 className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-2 px-2">Seções do Site</h4>
        {[
          { id: 'global', label: 'Identidade Visual', icon: Palette },
          { id: 'hero', label: 'Capa (Hero)', icon: Layout },
          { id: 'about', label: 'Sobre & Conceito', icon: FileText },
          { id: 'services', label: 'Serviços', icon: check => <div className="w-4 h-4 border border-current rounded-sm" /> },
          { id: 'footer', label: 'Rodapé & Contato', icon: Type },
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setEditorSection(section.id as any)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-xs uppercase tracking-widest font-bold ${
              editorSection === section.id 
                ? 'bg-white/10 text-brand-gold border border-brand-gold/20' 
                : 'text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            {/* @ts-ignore */}
            {typeof section.icon === 'function' ? section.icon(true) : <section.icon size={16} />}
            {section.label}
          </button>
        ))}
      </div>

      {/* Área de Edição */}
      <div className="flex-1 bg-brand-charcoal border border-white/5 rounded-3xl p-8 overflow-y-auto custom-scrollbar relative">
        <div className="flex justify-between items-start mb-8">
            <div>
                <h3 className="font-serif text-2xl text-white">
                    {editorSection === 'global' && 'Identidade Visual'}
                    {editorSection === 'hero' && 'Seção Principal (Capa)'}
                    {editorSection === 'about' && 'Sobre & Conceito'}
                    {editorSection === 'services' && 'Gerenciar Serviços'}
                    {editorSection === 'footer' && 'Rodapé & Contatos'}
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

        <div className="space-y-8">
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

            {editorSection === 'hero' && (
                <>
                    <ImageUpload label="Imagem de Fundo" preview="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2087&auto=format&fit=crop" />
                    <InputGroup label="Título Principal" value="Beleza Natural" />
                    <InputGroup label="Subtítulo" value="Realçando belezas através da maquiagem" />
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="Texto Botão 1" value="Ver Portfólio" />
                        <InputGroup label="Texto Botão 2" value="Agendar Data" />
                    </div>
                </>
            )}

            {editorSection === 'about' && (
                 <>
                    <ImageUpload label="Foto de Perfil" preview="https://images.unsplash.com/photo-1594744803329-a584af1cae24?q=80&w=1887&auto=format&fit=crop" />
                    <InputGroup label="Título da Seção" value="Atrás dos Pincéis" />
                    <TextAreaGroup label="Bio Completa" value="Sou Lara Luíza Castro, maquiadora profissional há mais de 8 anos..." height="h-40" />
                    <div className="grid grid-cols-3 gap-4">
                        <InputGroup label="Anos de Exp." value="8" />
                        <InputGroup label="Clientes" value="+2k" />
                        <InputGroup label="Cursos" value="12" />
                    </div>
                 </>
            )}

            {editorSection === 'services' && (
                <div className="space-y-4">
                    <div className="p-4 bg-brand-dark rounded-xl border border-brand-gold/20 flex justify-between items-center group cursor-pointer hover:bg-brand-gold/5 transition-colors">
                        <div className="flex items-center gap-4">
                            <img src="https://images.unsplash.com/photo-1594465911080-dd02fc11999a?q=80&w=1964&auto=format&fit=crop" className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                                <h4 className="font-serif text-white">Noivas Premium</h4>
                                <p className="text-[10px] text-white/40 uppercase">Categoria: Bridal</p>
                            </div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 p-2 text-brand-gold hover:bg-brand-gold hover:text-brand-dark rounded-full transition-all">
                            <Settings size={16} />
                        </button>
                    </div>
                    {/* Mock items */}
                    <div className="p-4 bg-brand-dark rounded-xl border border-white/5 flex justify-between items-center opacity-50">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center"><ImageIcon size={16} /></div>
                            <div>
                                <h4 className="font-serif text-white">Produção Social</h4>
                            </div>
                        </div>
                    </div>
                    
                    <button className="w-full py-4 border border-dashed border-white/20 rounded-xl text-white/40 hover:text-brand-gold hover:border-brand-gold hover:bg-brand-gold/5 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-bold mt-4">
                        <Plus size={16} /> Adicionar Novo Serviço
                    </button>
                </div>
            )}

            {editorSection === 'footer' && (
                <>
                    <InputGroup label="Endereço Completo" value="Rua Alvarenga Peixoto, 575 - Lourdes" />
                    <div className="grid grid-cols-2 gap-4">
                        <InputGroup label="WhatsApp" value="(38) 99221-0136" />
                        <InputGroup label="Email Contato" value="contato@laraluiza.com" />
                    </div>
                    <InputGroup label="Link Instagram Principal" value="@laraluizamakeup_" />
                    <InputGroup label="Link Instagram Artístico" value="@laraluizaart" />
                </>
            )}
        </div>

        {/* Floating Action Bar */}
        <div className="sticky bottom-0 left-0 right-0 pt-8 mt-8 border-t border-white/5 bg-brand-charcoal z-10 flex justify-end gap-4">
            <button className="px-6 py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 text-xs uppercase tracking-widest font-bold transition-all">
                Cancelar
            </button>
            <button 
                onClick={handleSave}
                className="px-8 py-3 bg-brand-gold text-brand-dark rounded-xl text-xs uppercase tracking-widest font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
                <Save size={16} /> Salvar Alterações
            </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-gold selection:text-brand-dark">
      {/* Sidebar Principal */}
      <aside className="w-full lg:w-72 bg-brand-charcoal border-r border-white/5 p-6 flex flex-col z-20">
        <div className="mb-10 px-4">
          <span className="font-serif text-xl tracking-widest text-brand-gold font-bold uppercase block">Lara Luíza</span>
          <span className="text-[8px] tracking-[0.4em] text-brand-rose uppercase">Admin Panel</span>
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
                    <StatCard title="Total de Noivas" value="128" color="brand-gold" />
                    <StatCard title="Fotos na Galeria" value="45" color="brand-rose" />
                    <StatCard title="Turmas de Curso" value="12" color="white" />
                    
                    <div className="md:col-span-3 bg-brand-charcoal rounded-3xl p-8 border border-white/5">
                    <h3 className="font-serif text-xl mb-6 text-brand-gold">Atividades Recentes</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-4 rounded-xl transition-colors">
                            <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-lg bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20">
                                <Save size={14} />
                            </div>
                            <span className="text-sm text-white/70">Texto da seção "Sobre" atualizado</span>
                            </div>
                            <span className="text-[10px] text-white/30 uppercase font-bold">Hoje, 14:20</span>
                        </div>
                        ))}
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

const InputGroup = ({ label, value }: { label: string; value: string }) => (
    <div>
        <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">{label}</label>
        <input 
            type="text" 
            defaultValue={value}
            className="w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-sm transition-all text-white/80 focus:bg-white/5" 
        />
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
