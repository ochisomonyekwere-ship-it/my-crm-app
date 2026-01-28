import React, { useState, useEffect, useRef } from 'react';
import { 
  Sun, Search, Settings, LayoutDashboard, Users, Briefcase, 
  CheckSquare, FileText, Workflow, Inbox, HelpCircle, 
  ChevronRight, Wand2, ArrowRight, ExternalLink, Mail, 
  Trash2, ChevronUp, ChevronDown, X, Send, ArrowLeft,
  CircleCheck, AlertCircle, Bookmark, Star, Command, Check, 
  Coffee, Edit3, Sparkles, Pencil
} from 'lucide-react';

import { AppStep, Notification } from './types';

// Initialize the Gemini AI client using the mandatory environment variable


// --- Decorative Components ---

/**
 * Custom Slack Logo Illustration (SVG)
 * Full-color version matching the standard Slack branding as seen in the original designs.
 */
const SlackLogo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg 
    viewBox="0 0 54 54" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <g fill="none" fillRule="evenodd">
      <path d="M19.712.033a5.446 5.446 0 0 1 5.442 5.442v5.442h-5.442a5.446 5.446 0 0 1-5.442-5.442 5.446 5.446 0 0 1 5.442-5.442M19.712 16.359h10.884v27.21a5.446 5.446 0 0 1-5.442 5.442 5.446 5.446 0 0 1-5.442-5.442V16.359z" fill="#36C5F0"/>
      <path d="M53.967 19.712a5.446 5.446 0 0 1-5.442 5.442h-5.442v-5.442a5.446 5.446 0 0 1 5.442-5.442 5.446 5.446 0 0 1 5.442 5.442M37.641 19.712v10.884H10.431a5.446 5.446 0 0 1-5.442-5.442 5.446 5.446 0 0 1 5.442-5.442h27.21z" fill="#2EB67D"/>
      <path d="M34.288 53.967a5.446 5.446 0 0 1-5.442-5.442v-5.442h5.442a5.446 5.446 0 0 1 5.442 5.442 5.446 5.446 0 0 1-5.442 5.442M34.288 37.641H23.404V10.431a5.446 5.446 0 0 1 5.442-5.442 5.446 5.446 0 0 1 5.442 5.442v27.21z" fill="#ECB22E"/>
      <path d="M.033 34.288a5.446 5.446 0 0 1 5.442-5.442h5.442v5.442a5.446 5.446 0 0 1-5.442 5.442 5.446 5.446 0 0 1-5.442-5.442M16.359 34.288V23.404h27.21a5.446 5.446 0 0 1 5.442 5.442 5.446 5.446 0 0 1-5.442 5.442H16.359z" fill="#E01E5A"/>
    </g>
  </svg>
);

const SephoraFlame: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => (
  <svg 
    viewBox="0 0 40 128" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <path 
      d="M32 0C27 10 24 18 24 28C24 46 40 58 40 76C40 94 30 110 0 128C15 115 20 105 20 95C20 78 0 66 0 48C0 34 10 18 32 0Z" 
      fill="currentColor" 
    />
  </svg>
);

const ActivityMonitorIcon: React.FC<{ className?: string; iconSize?: string; sparkleSize?: string }> = ({ 
  className = "w-14 h-14 bg-slate-900 rounded-2xl", 
  iconSize = "w-7 h-7",
  sparkleSize = "w-3.5 h-3.5"
}) => (
  <div className={`${className} flex items-center justify-center relative shadow-lg transform -rotate-3`}>
    <SephoraFlame className={`${iconSize} text-white`} />
    <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-1 border-2 border-slate-900">
      <Wand2 className={`${sparkleSize} text-slate-900`} />
    </div>
  </div>
);

const LVMHLogo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <rect width="100" height="100" rx="12" fill="#0A0B14" />
    <g fill="white">
      <path d="M15 35H21V60H34V65H15V35Z" />
      <path d="M38 35H44L48 58L52 35H58L50 65H46L38 35Z" />
      <path d="M60 35H67L72 55L77 35H84V65H79V42L73 65H71L65 42V65H60V35Z" />
      <path d="M88 35H93V48H100V35H105V65H100V53H93V65H88V35Z" />
    </g>
  </svg>
);

// --- Empty State Component ---
const EmptyInboxState: React.FC<{ filter: string }> = ({ filter }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-slate-50 rounded-full scale-[2.5] opacity-20 blur-2xl"></div>
      <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative">
        <circle cx="80" cy="80" r="70" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="8 8" />
        <path d="M50 112C50 112 55 120 80 120C105 120 110 112 110 112" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <path d="M55 75C55 75 55 105 80 105C105 105 105 75 105 75H55Z" fill="white" stroke="#94A3B8" strokeWidth="3" strokeLinejoin="round" />
        <path d="M105 82C112 82 118 85 118 90C118 95 112 98 105 98" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <path d="M72 60C72 60 74 55 72 50" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <path d="M80 65C80 65 82 58 80 52" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
        <path d="M88 60C88 60 90 55 88 50" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-2">You're all caught up</h3>
    <p className="text-sm text-slate-500 max-w-[240px] leading-relaxed">
      {filter === 'Urgent' 
        ? "No urgent tasks are calling for your attention right now. Take a deep breath — you've got this handled." 
        : `Your ${filter.toLowerCase()} inbox is peacefully clear. Enjoy the quiet moment.`}
    </p>
  </div>
);

// --- Confetti Component ---
const Confetti: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const colors = ['#0f172a', '#3b82f6', '#f59e0b', '#ef4444', '#10b981'];

    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 2 + 1,
        angle: Math.random() * 6.28,
        spin: Math.random() * 0.2 - 0.1
      });
    }

    let animationFrame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.speed;
        p.angle += p.spin;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      animationFrame = requestAnimationFrame(render);
    };

    render();
    const timeout = setTimeout(() => cancelAnimationFrame(animationFrame), 4000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timeout);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[60]" />;
};

// --- Toast Component ---
const Toast: React.FC<{ message: string; show: boolean; onClose: () => void }> = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className={`fixed top-8 right-8 z-[100] transition-all duration-500 transform ${show ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0 pointer-events-none'}`}>
      <div className="bg-slate-900 text-white px-8 py-5 rounded-xl shadow-2xl flex items-center gap-5 border border-slate-800">
        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
          <Check className="w-6 h-6 text-white" />
        </div>
        <div className="pr-4">
          <p className="font-bold text-sm text-white">Action Complete</p>
          <p className="text-slate-400 text-xs mt-0.5">{message}</p>
        </div>
        <button onClick={onClose} className="hover:bg-white/10 p-1.5 rounded-lg transition-colors">
          <X className="w-4 h-4 text-slate-500" />
        </button>
      </div>
    </div>
  );
};

// --- Sidebar Component ---
const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-slate-50 border-r border-slate-200 h-screen flex flex-col fixed left-0 top-0 z-10">
      <div className="p-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5 font-bold text-slate-900 tracking-tight">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <Sun className="w-5 h-5 text-amber-400" fill="currentColor" />
          </div>
          <span className="text-base">SkinTint</span>
        </div>
        <div className="text-slate-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search workspace" 
            className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/5 transition-all"
          />
        </div>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <div className="pb-2 px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Navigation</div>
        <SidebarItem icon={<LayoutDashboard className="w-4 h-4" />} label="Dashboards" />
        <SidebarItem icon={<Users className="w-4 h-4" />} label="People" />
        <SidebarItem icon={<Briefcase className="w-4 h-4" />} label="Opportunities" />
        <SidebarItem icon={<CheckSquare className="w-4 h-4" />} label="Tasks" />
        
        <div className="pt-6 pb-2 px-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Communication</div>
        <SidebarItem icon={<Inbox className="w-4 h-4" />} label="Inbox" active />
        <div className="ml-7 space-y-1 mt-1 border-l border-slate-200 pl-2">
          <SidebarSubItem icon={<div className="w-1.5 h-1.5 rounded-full bg-rose-500" />} label="Urgent" />
          <SidebarSubItem icon={<div className="w-1.5 h-1.5 rounded-full bg-amber-400" />} label="Important" />
          <SidebarSubItem icon={<div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />} label="Updates" />
        </div>
      </nav>

      <div className="p-4 mt-auto border-t border-slate-200 flex items-center gap-3">
        <img 
          src="https://picsum.photos/seed/owner/40/40" 
          className="w-8 h-8 rounded-full border border-slate-200 object-cover" 
          alt="Samantha AE Profile"
        />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-slate-900 truncate">Samantha AE</p>
          <p className="text-[10px] text-slate-500 truncate">Pro Account</p>
        </div>
        <Settings className="w-4 h-4 text-slate-400" />
      </div>
    </div>
  );
};

const SidebarItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${active ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-sm'}`}>
    <span className={active ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}>{icon}</span>
    <span>{label}</span>
  </button>
);

const SidebarSubItem: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <button className="w-full flex items-center gap-3 px-3 py-1.5 rounded-md text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
    {icon}
    <span>{label}</span>
  </button>
);

// --- Inbox Components ---
const NotificationItem: React.FC<{ notification: Notification; active?: boolean; onClick?: () => void }> = ({ notification, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`p-5 border-b border-slate-100 cursor-pointer transition-all relative ${active ? 'bg-slate-50' : 'bg-white hover:bg-slate-50/50'}`}
  >
    {active && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-900" />}
    <div className="flex gap-4">
      <div className={`shrink-0 w-11 h-11 flex items-center justify-center`}>
        {notification.id === 'special' ? (
          <ActivityMonitorIcon 
            className="w-11 h-11 bg-slate-900 rounded-xl" 
            iconSize="w-5 h-5" 
            sparkleSize="w-2.5 h-2.5"
          />
        ) : (
          <img src={notification.avatar} className="w-11 h-11 rounded-xl object-cover" alt={notification.sender} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-0.5">
          <span className="text-[13px] font-bold text-slate-900 truncate">{notification.sender}</span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider shrink-0">{notification.time}</span>
        </div>
        <h4 className={`text-[13px] font-bold leading-snug mb-1 truncate ${active ? 'text-slate-900' : 'text-slate-700'}`}>
          {notification.title}
        </h4>
        <p className="text-[12px] text-slate-500 line-clamp-2 leading-relaxed font-medium">
          {notification.snippet}
        </p>
      </div>
    </div>
  </div>
);

// --- Main App Logic ---
export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.STEP_1);
  const [showToast, setShowToast] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Urgent' | 'Important' | 'Updates'>('All');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'special',
      sender: 'Activity Monitor',
      avatar: '',
      channel: 'System',
      title: 'Changes made to Sephora deal',
      snippet: "There have been changes to the Sephora Contract Document. I've drafted a response to Sephora's team based on the updates...",
      time: '2m ago',
      type: 'urgent' 
    },
    {
      id: '2',
      sender: 'Marcus Chen',
      avatar: 'https://picsum.photos/seed/marcus/80/80',
      channel: 'Slack',
      title: 'Updated pricing terms in section 4.2',
      snippet: 'The revised pricing structure looks good but we should clarify the volume discount tiers...',
      time: '3h ago',
      tag: 'sephora-deal',
      type: 'default'
    },
    {
      id: '3',
      sender: 'Lisa Rodriguez',
      avatar: 'https://picsum.photos/seed/lisa/80/80',
      channel: 'Gmail',
      title: 'Re: Changes to Delivery',
      snippet: 'A good balance re: delivery would be 45 days for initial orders, and...',
      time: '4h ago',
      tag: 'Revisions to Contract with Sephora',
      type: 'default'
    }
  ]);

  const handleExpandProfile = () => setStep(AppStep.STEP_2);
  const handleApproveAndSend = () => setStep(AppStep.STEP_3);
  
  const handleSendEmail = () => {
    setStep(AppStep.STEP_4);
    setShowToast(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const handleBackToInbox = () => {
    setNotifications(prev => prev.filter(n => n.id !== 'special'));
    setStep(AppStep.STEP_5);
    setActiveFilter('Urgent');
    setShowToast(false);
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'All') return true;
    return n.type === activeFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <Sidebar />
      
      <Toast 
        show={showToast} 
        message="Sephora's revised contract has been sent successfully via Email." 
        onClose={() => setShowToast(false)} 
      />
      {showConfetti && <Confetti />}

      <main className="pl-64 flex h-screen overflow-hidden">
        {/* Inbox List Area */}
        <div className="w-[380px] border-r border-slate-200 flex flex-col bg-white">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <Inbox className="w-5 h-5 text-slate-900" />
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Inbox</h2>
              </div>
              <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center">
                 <Command className="w-3 h-3 text-slate-400" />
              </div>
            </div>
            
            <div className="relative mb-6">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Find a notification"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-10 pr-3 text-sm focus:bg-white focus:border-slate-200 focus:outline-none transition-all"
              />
            </div>

            <div className="flex gap-1.5">
              {(['All', 'Urgent', 'Important', 'Updates'] as const).map((f) => (
                <button 
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 text-[11px] font-black uppercase tracking-wider rounded-lg border transition-all ${
                    activeFilter === f 
                    ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:text-slate-900'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((n) => (
                <NotificationItem 
                  key={n.id} 
                  notification={n} 
                  active={step < 5 && n.id === 'special'} 
                  onClick={() => n.id === 'special' && setStep(AppStep.STEP_1)}
                />
              ))
            ) : (
              <EmptyInboxState filter={activeFilter} />
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-slate-50/30 overflow-hidden relative">
          {/* Header */}
          <header className="h-16 border-b border-slate-200 flex items-center justify-between px-8 bg-white shrink-0 z-20">
             <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
               <span className="flex items-center gap-2 text-slate-500"><Inbox className="w-3.5 h-3.5" /> Workspace</span>
               {step >= 2 && step < 5 && (
                 <>
                   <span className="text-slate-200">/</span>
                   <span className="text-slate-900">Sephora Global</span>
                 </>
               )}
             </div>
             <div className="flex items-center gap-4">
               <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md">
                 <Sun className="w-3.5 h-3.5" /> New Record
               </button>
               <div className="h-6 w-px bg-slate-200"></div>
               <div className="flex items-center gap-2">
                 <div className="p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition-colors">
                    <Settings className="w-4 h-4 text-slate-500" />
                 </div>
               </div>
             </div>
          </header>

          <div className="flex-1 flex overflow-hidden">
            {/* Main Detail View */}
            <div className={`flex-1 overflow-y-auto p-12 relative ${step === AppStep.STEP_5 ? 'flex items-center justify-center' : ''}`}>
              {step === AppStep.STEP_5 ? (
                <div className="text-center space-y-6 max-w-sm animate-in fade-in zoom-in duration-1000">
                  <div className="w-24 h-24 rounded-[2rem] bg-white shadow-2xl flex items-center justify-center mx-auto mb-8 border border-slate-100">
                    <Coffee className="w-10 h-10 text-slate-900" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">All Tasks Completed</h2>
                    <p className="text-slate-500 text-sm mt-2 leading-relaxed font-medium">Switch filters or browse workspace records to continue.</p>
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* Floating Content Card */}
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Workspace Panel Header */}
                    <div className="p-8 border-b border-slate-100 bg-slate-50/40">
                      <div className="flex items-start justify-between">
                        <div className="flex gap-5">
                          <ActivityMonitorIcon />
                          <div>
                            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Activity Monitor</h1>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-0.5">AUTOMATED INTELLIGENCE DRAFT</p>
                          </div>
                        </div>
                        {step === 1 ? (
                          <button 
                            onClick={handleExpandProfile}
                            className="flex items-center gap-4 group bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-slate-900 transition-all"
                          >
                            <div className="text-right">
                              <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Context</p>
                              <p className="text-[13px] font-bold text-slate-900">Sephora's Profile</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          </button>
                        ) : (
                          <button 
                            onClick={() => setStep(AppStep.STEP_1)}
                            className="flex items-center gap-3 text-slate-900 font-black text-[11px] uppercase tracking-widest hover:text-slate-600 transition-all"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Hide Sephora's profile</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Main Content Body */}
                    <div className="p-8 space-y-10">
                      <div className="space-y-4">
                        <h2 className="text-3xl font-black text-slate-900 leading-[1.1] tracking-tight">Contract changes ready for review</h2>
                        <div className="space-y-6 text-[17px] text-slate-600 leading-relaxed font-medium">
                          <p>Hi there, Samantha! There's been changes to the latest Contract Agreement with <span className="text-slate-900 font-bold underline decoration-slate-200 underline-offset-4">Sephora</span>.</p>
                          <p>I've drafted a new contract highlighting the changes from Slack conversations, Email threads and Google Drive comments. Below is a side-by-side view of the revised document.</p>
                        </div>
                      </div>

                      {step === 1 && (
                        <div className="flex flex-col items-center py-2 animate-bounce text-slate-300">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-2">Compare Documents</span>
                          <ChevronDown className="w-6 h-6" />
                        </div>
                      )}

                      {/* Side-by-Side Comparison */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Document Comparison</h3>
                          <span className="text-[11px] font-bold text-slate-400">v2 vs v3 (Latest)</span>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          {/* Previous Version */}
                          <div className="border border-slate-200 rounded-2xl bg-slate-50/50 p-6 space-y-6">
                            <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                              <FileText className="w-4 h-4 text-rose-500" />
                              <span className="text-[12px] font-black text-slate-900 uppercase">Previous Contract Document</span>
                            </div>
                            <div className="space-y-8">
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Section 4.2: Pricing</p>
                                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-900 font-bold text-sm leading-relaxed">
                                  Volume discounts: 3% for orders over $500K
                                </div>
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Section 9.3: Logistics</p>
                                <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-900 font-bold text-sm leading-relaxed">
                                  Standard delivery: 30 days flat
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Revised Version */}
                          <div className="border border-slate-900 rounded-2xl bg-white p-6 space-y-6 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-3">
                               <span className="bg-emerald-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">New Draft</span>
                            </div>
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                              <FileText className="w-4 h-4 text-emerald-500" />
                              <span className="text-[12px] font-black text-slate-900 uppercase">Revised Draft</span>
                            </div>
                            <div className="space-y-8">
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Section 4.2: Pricing</p>
                                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-900 font-bold text-sm leading-relaxed">
                                  Volume discounts: 5% for orders over $500K, 8% for $1M+
                                </div>
                                <button className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-900 bg-slate-50 w-fit px-2 py-1 rounded hover:bg-slate-100 transition-colors group/source">
                                  <SlackLogo className="w-3.5 h-3.5" /> 
                                  <span>Source: Marcus Chen (Legal) in #sephora-deal conversation</span>
                                  <ExternalLink className="w-2.5 h-2.5 text-slate-400 group-hover/source:text-slate-900 transition-colors" />
                                </button>
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Section 9.3: Logistics</p>
                                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-900 font-bold text-sm leading-relaxed">
                                  Delivery: 45 days initial, 30 days recurring
                                </div>
                                <button className="mt-3 flex items-center gap-2 text-[10px] font-bold text-slate-900 bg-slate-50 w-fit px-2 py-1 rounded hover:bg-slate-100 transition-colors group/source">
                                  <Mail className="w-3 h-3" /> 
                                  <span>Source: Email thread with Lisa Rodriguez (Operations)</span>
                                  <ExternalLink className="w-2.5 h-2.5 text-slate-400 group-hover/source:text-slate-900 transition-colors" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Source Materials */}
                      <div className="space-y-5">
                        <div className="flex items-center justify-between">
                          <h3 className="text-[12px] font-black text-slate-900 uppercase tracking-widest">Source Materials</h3>
                          <button className="text-[10px] font-black text-slate-400 uppercase hover:text-slate-900 transition-colors">View all (14)</button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:border-slate-900 transition-all cursor-pointer group">
                             <div className="flex items-center gap-4">
                               <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-slate-100 transition-all text-slate-900">
                                 <SlackLogo className="w-6 h-6" />
                               </div>
                               <div>
                                 <p className="text-[13px] font-bold text-slate-900">#sephora-deal channel</p>
                                 <p className="text-[11px] font-medium text-slate-500">12 messages</p>
                               </div>
                             </div>
                             <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-900" />
                          </div>
                          <div className="p-5 bg-white border border-slate-200 rounded-xl flex items-center justify-between hover:border-slate-900 transition-all cursor-pointer group">
                             <div className="flex items-center gap-4">
                               <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all">
                                 <Mail className="w-5 h-5" />
                               </div>
                               <div>
                                 <p className="text-[13px] font-bold text-slate-900">Revisions to Agreement with Sephora</p>
                                 <p className="text-[11px] font-medium text-slate-500">Operations Thread</p>
                               </div>
                             </div>
                             <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-slate-900" />
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-6 space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <button 
                            onClick={handleApproveAndSend}
                            className="w-full bg-slate-900 text-white font-black text-[13px] uppercase tracking-[0.1em] py-5 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl"
                          >
                            {step === AppStep.STEP_3 ? 'Confirm and Send Email' : 'Approve and Send Revised Document'}
                            <ArrowRight className="w-4 h-4" />
                          </button>
                          <button className="w-full bg-white border-2 border-slate-900 text-slate-900 font-black text-[13px] uppercase tracking-[0.1em] py-5 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                            <Edit3 className="w-4 h-4" />
                            Revise Contract Manually
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Sidebar (Context Panel) */}
            {step >= 2 && step <= 4 && (
              <div className="w-[360px] border-l border-slate-200 bg-white overflow-y-auto shrink-0 flex flex-col relative z-20 animate-in slide-in-from-right duration-500 shadow-2xl">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10">
                   <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Context Panel</h3>
                   <div className="flex gap-2">
                     <button className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-900 transition-colors" onClick={() => setStep(AppStep.STEP_1)}><X className="w-4 h-4" /></button>
                   </div>
                </div>

                <div className="p-8 text-center border-b border-slate-100">
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-slate-100 p-4 transition-transform hover:scale-105">
                    <SephoraFlame className="w-14 h-14 text-slate-900" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Sephora Global</h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Created 4h ago</span>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  <div className="space-y-6">
                    <ProfileField icon={<ExternalLink className="w-4 h-4" />} label="Website" value="sephora.com" />
                    <ProfileField icon={<Users className="w-4 h-4" />} label="Account Owner" value={<div className="flex items-center gap-2"><img src="https://picsum.photos/seed/owner/40/40" className="w-6 h-6 rounded-full border border-slate-200" /> Samantha</div>} />
                    <ProfileField icon={<Briefcase className="w-4 h-4" />} label="Revenue" value="$10.0B Annual" />
                    <ProfileField icon={<CircleCheck className="w-4 h-4 text-blue-500" />} label="Compliance (ICP)" value="Verified Status" />
                  </div>

                  <div className="pt-8 border-t border-slate-100 space-y-6">
                    <div>
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Strategic Holdings</h4>
                      <div className="flex items-center gap-3 text-sm font-bold text-slate-900 bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <LVMHLogo className="w-10 h-10 shrink-0" />
                        LVMH Moët Hennessy
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">People</h4>
                      <div className="flex flex-wrap gap-2">
                        <div className="px-3 py-2 rounded-xl border-2 border-slate-900 text-[12px] font-bold text-slate-900 flex items-center gap-2 transition-colors hover:bg-slate-900 hover:text-white group">
                          <Users className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" /> Matthew Raye
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Email Modal Overlay */}
          {step === AppStep.STEP_3 && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6">
              <div className="bg-white rounded-[2rem] w-full max-w-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Draft Response</h3>
                  <button onClick={() => setStep(AppStep.STEP_2)} className="w-10 h-10 rounded-xl hover:bg-slate-200 flex items-center justify-center transition-colors">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
                <div className="p-8 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-3">
                      <span className="text-[11px] font-black text-slate-400 uppercase w-12 tracking-widest">To</span>
                      <div className="bg-slate-900 text-white px-3 py-1 rounded-lg text-xs font-bold">matthew.raye@sephora.com</div>
                    </div>
                    <div className="flex items-center gap-4 border-b border-slate-100 pb-3">
                      <span className="text-[11px] font-black text-slate-400 uppercase w-12 tracking-widest">Subj</span>
                      <div className="text-slate-900 text-sm font-bold">Revised Contract Agreement from SkinTint</div>
                    </div>
                  </div>
                  
                  <div className="space-y-6 text-slate-700 text-base leading-relaxed h-[240px] overflow-y-auto pr-4 font-medium">
                    <p>Dear Matthew,</p>
                    <p>Thank you for sending over Sephora's propositions. We've reviewed the proposals and adapted the terms to better align with our volume projections.</p>
                    <p>I attached the revised document (v3) reflecting these points. Please let us know if this aligns with your expectations so we can proceed.</p>
                    <p>Best regards,<br /><span className="text-slate-900 font-black">Samantha</span></p>
                    
                    <div className="p-5 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 flex items-center gap-5 hover:border-slate-400 transition-all cursor-pointer">
                      <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center shrink-0">
                        <FileText className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900">Revised Contract Agreement.pdf</p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase mt-0.5">2.4 MB • Generated by AI Monitor</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-8 border-t border-slate-100 flex gap-4 bg-slate-50/50">
                  <button 
                    onClick={handleSendEmail}
                    className="flex-1 bg-slate-900 text-white font-black text-[13px] uppercase tracking-widest py-5 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl"
                  >
                    Send to Sephora <Send className="w-4 h-4" />
                  </button>
                  <button className="px-10 py-5 border-2 border-slate-900 rounded-xl font-black text-[13px] uppercase tracking-widest text-slate-900 hover:bg-white transition-all flex items-center justify-center gap-2">
                    <Pencil className="w-4 h-4" />
                    Edit Email
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Overlay */}
          {step === AppStep.STEP_4 && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-6">
              <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] p-12 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-28 h-28 bg-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl transform rotate-12">
                   <Send className="w-12 h-12 text-emerald-400" />
                </div>
                <h2 className="text-4xl font-black mb-4 text-slate-900 tracking-tight">Draft Sent</h2>
                <p className="text-slate-500 mb-12 text-lg font-medium leading-relaxed">The revised document has been successfully delivered to Matthew at Sephora Global.</p>
                
                <div className="border border-slate-100 rounded-2xl overflow-hidden mb-12 text-left bg-slate-50">
                  <div className="p-5 border-b border-slate-200 flex items-center gap-4">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-[13px] font-black text-slate-900 uppercase">Destination</p>
                      <p className="text-sm font-medium text-slate-500">matthew.raye@sephora.com</p>
                    </div>
                  </div>
                  <div className="p-5 flex items-center gap-4">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-[13px] font-black text-slate-900 uppercase">Attachment</p>
                      <p className="text-sm font-medium text-slate-500">Revised Contract Agreement.pdf</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleBackToInbox}
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-[15px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl"
                >
                  Return to Inbox
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// --- Helper Components ---
const ProfileField: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-5 group">
    <div className="w-10 h-10 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-slate-900 group-hover:bg-white border border-transparent group-hover:border-slate-200 transition-all">
      {icon}
    </div>
    <div className="flex-1 min-w-0 pt-0.5">
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{label}</p>
      <div className="text-[14px] text-slate-900 font-bold leading-none">
        {value}
      </div>
    </div>
  </div>
);
