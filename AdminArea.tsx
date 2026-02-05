
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Image as ImageIcon, FileText, 
  QrCode, Settings, LogOut, ChevronRight, 
  Plus, Trash2, Globe, Save, Upload, ExternalLink
} from 'lucide-react';

interface AdminProps {
  onLogout: () => void;
}

export const AdminArea: React.FC<AdminProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dash' | 'content' | 'media' | 'qr' | 'dns'>('dash');
  const [qrValue, setQrValue] = useState('https://laraluizamakeup.com.br');

  const menuItems = [
    { id: 'dash', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'content', label: 'Conteúdo', icon: FileText },
    { id: 'media', label: 'Galeria/Fotos', icon: ImageIcon },
    { id: 'qr', label: 'QR Codes', icon: QrCode },
    { id: 'dns', label: 'Domínio/DNS', icon: Globe },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-brand-dark text-white font-sans">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-brand-charcoal border-r border-white/5 p-6 flex flex-col">
        <div className="mb-10 px-4">
          <span className="font-serif text-xl tracking-widest text-brand-gold font-bold uppercase block">Lara Luíza</span>
          <span className="text-[8px] tracking-[0.4em] text-brand-rose uppercase">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-brand-gold text-brand-dark font-bold' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout}
          className="mt-10 flex items-center gap-4 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span className="text-sm uppercase tracking-widest">Sair</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto max-h-screen custom-scrollbar">
        <header className="mb-12 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-serif text-brand-gold italic">
              {menuItems.find(i => i.id === activeTab)?.label}
            </h1>
            <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">Gerencie sua presença digital</p>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold">Lara Luíza</p>
              <p className="text-[10px] text-brand-rose uppercase tracking-widest">Administradora</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold flex items-center justify-center">
              <span className="font-serif italic text-brand-gold">L</span>
            </div>
          </div>
        </header>

        {activeTab === 'dash' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total de Noivas" value="128" color="brand-gold" />
            <StatCard title="Fotos na Galeria" value="45" color="brand-rose" />
            <StatCard title="Turmas de Curso" value="12" color="white" />
            
            <div className="md:col-span-3 bg-brand-charcoal rounded-3xl p-8 border border-white/5">
              <h3 className="font-serif text-xl mb-6">Atividades Recentes</h3>
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-brand-gold/20 flex items-center justify-center text-brand-gold">
                        <Save size={14} />
                      </div>
                      <span className="text-sm text-white/70">Texto da seção "Sobre" atualizado</span>
                    </div>
                    <span className="text-[10px] text-white/30 uppercase">Hoje, 14:20</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-8 max-w-4xl">
            <ContentSection title="Hero (Início)" fields={[
              { label: 'Título Principal', value: 'Beleza Natural' },
              { label: 'Subtítulo', value: 'Realçando belezas através da maquiagem' }
            ]} />
            <ContentSection title="Seção Sobre" fields={[
              { label: 'Bio Resumida', value: 'Sou Lara Luíza Castro, maquiadora profissional há mais de 8 anos...', type: 'textarea' }
            ]} />
          </div>
        )}

        {activeTab === 'media' && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="font-serif text-xl">Organização de Portfólio</h3>
              <button className="flex items-center gap-2 px-6 py-3 bg-brand-gold text-brand-dark font-bold rounded-xl text-xs uppercase tracking-widest">
                <Upload size={16} /> Subir Foto
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="group relative aspect-square rounded-2xl overflow-hidden border border-white/5">
                  <img src={`https://picsum.photos/400/400?random=${i}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button className="p-2 bg-white text-brand-dark rounded-full"><ImageIcon size={14} /></button>
                    <button className="p-2 bg-red-500 text-white rounded-full"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'qr' && (
          <div className="max-w-2xl bg-brand-charcoal p-8 rounded-3xl border border-brand-gold/10">
            <h3 className="font-serif text-2xl mb-8">Gerador de QR Code</h3>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">URL do Link</label>
                <input 
                  type="text" 
                  value={qrValue} 
                  onChange={(e) => setQrValue(e.target.value)}
                  className="w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-sm transition-all" 
                />
              </div>
              <div className="flex flex-col md:flex-row gap-8 items-center pt-6">
                <div className="p-6 bg-white rounded-3xl shadow-2xl">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}&color=121212`} 
                    alt="QR Code" 
                    className="w-48 h-48"
                  />
                </div>
                <div className="space-y-4 text-center md:text-left">
                  <p className="text-sm text-white/60">
                    O QR Code acima direciona para o link informado. Use em seus cartões de visita ou no balcão do estúdio.
                  </p>
                  <button className="px-8 py-4 bg-brand-gold text-brand-dark font-bold rounded-xl text-xs uppercase tracking-widest w-full md:w-auto">
                    Baixar QR Code (PNG)
                  </button>
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
                  Para configurar um novo domínio, acesse o painel da Vercel, vá em Settings > Domains e adicione seu novo endereço. Os registros acima devem ser atualizados no seu provedor de DNS (ex: Registro.br).
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ title, value, color }: { title: string; value: string; color: string }) => (
  <div className="bg-brand-charcoal p-8 rounded-3xl border border-white/5">
    <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold mb-2">{title}</p>
    <p className={`text-4xl font-serif font-bold italic text-${color}`}>{value}</p>
  </div>
);

const ContentSection = ({ title, fields }: { title: string; fields: any[] }) => (
  <div className="bg-brand-charcoal p-8 rounded-3xl border border-white/5">
    <h3 className="font-serif text-xl mb-8 flex items-center justify-between">
      {title}
      <button className="text-[10px] text-brand-gold uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity">
        Salvar Alterações <Save size={12} />
      </button>
    </h3>
    <div className="space-y-6">
      {fields.map((f, idx) => (
        <div key={idx}>
          <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block font-bold">{f.label}</label>
          {f.type === 'textarea' ? (
            <textarea 
              defaultValue={f.value}
              className="w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-sm transition-all h-32"
            />
          ) : (
            <input 
              type="text" 
              defaultValue={f.value}
              className="w-full bg-brand-dark border border-white/10 p-4 rounded-xl focus:border-brand-gold outline-none text-sm transition-all" 
            />
          )}
        </div>
      ))}
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
    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] uppercase tracking-widest font-bold rounded-full">
      {status}
    </span>
  </div>
);
