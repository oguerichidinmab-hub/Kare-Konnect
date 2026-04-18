import React, { useState } from 'react';
import { MOCK_COUNSELORS } from '../data/mockData';
import { Card, Button, Badge, Modal } from '../components/UI';
import { Search, Filter, MessageCircle, Phone, Home, ChevronRight, X, Send, MessageSquare } from 'lucide-react';
import { Counselor } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useAppState } from '../contexts/AppStateContext';
import { useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

const CounselorsScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const [contactModal, setContactModal] = useState<{ type: 'chat' | 'call' | 'home', counselor: Counselor } | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [message, setMessage] = useState('');
  
  // Filter states
  const [filterType, setFilterType] = useState<string>('All');
  const [filterExpertise, setFilterExpertise] = useState<string>('All');
  const [filterSpecialty, setFilterSpecialty] = useState<string>('All');
  const [filterCost, setFilterCost] = useState<string>('Any');

  const { addSession } = useAppState();
  const navigate = useNavigate();

  const filteredCounselors = MOCK_COUNSELORS.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.expertise.some(e => e.toLowerCase().includes(search.toLowerCase())) ||
      c.specialties.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      c.bio.toLowerCase().includes(search.toLowerCase());
      
    const matchesType = filterType === 'All' || c.sessionTypes.includes(filterType === 'Home Visit' ? 'home' : filterType.toLowerCase() as any);
    const matchesExpertise = filterExpertise === 'All' || c.expertise.includes(filterExpertise);
    const matchesSpecialty = filterSpecialty === 'All' || c.specialties.includes(filterSpecialty);
    const matchesCost = filterCost === 'Any' || 
      (filterCost === 'Subsidized' && c.isSubsidized) ||
      (filterCost === 'Low Cost' && c.costRange === 'low');

    return matchesSearch && matchesType && matchesExpertise && matchesSpecialty && matchesCost;
  });

  const handleBook = (type: 'chat' | 'call' | 'home') => {
    if (!selectedCounselor) return;
    if (type === 'call') {
      window.location.href = `tel:${selectedCounselor.phoneNumber}`;
      return;
    }
    setContactModal({ type, counselor: selectedCounselor });
    setMessage(
      type === 'chat' 
        ? `Hi ${selectedCounselor.name}, I would like to connect for support.` 
        : `Hi ${selectedCounselor.name}, I'm interested in arranging a home visit. Could we discuss availability?`
    );
  };

  const handleCommSelection = (method: 'sms' | 'whatsapp') => {
    if (!contactModal) return;
    const phone = contactModal.counselor.phoneNumber;
    const text = message;

    if (method === 'whatsapp') {
      const cleanPhone = phone.replace(/\D/g, '');
      const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    } else {
      const isIOS = navigator.userAgent.match(/iPhone|iPad|iPod/i);
      const url = `sms:${phone}${isIOS ? '&' : '?'}body=${encodeURIComponent(text)}`;
      window.location.href = url;
    }
    
    // Also log as a session in app state
    addSession({
      id: Math.random().toString(36).substr(2, 9),
      counselorId: contactModal.counselor.id,
      counselorName: contactModal.counselor.name,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: contactModal.type,
      status: 'upcoming'
    });

    setContactModal(null);
    setSelectedCounselor(null);
    navigate('/sessions');
  };

  const confirmBooking = () => {
    // This is now handled in handleCommSelection
  };

  const FilterBadge = ({ active, label, onClick }: { active: boolean, label: string, onClick: () => void, key?: string }) => (
    <Badge 
      className={cn(
        "px-3 py-1.5 cursor-pointer transition-colors",
        active ? "bg-sage-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      )}
      onClick={onClick}
    >
      {label}
    </Badge>
  );

  return (
    <div className="pt-6 px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Find Support</h1>
        <p className="text-gray-500 text-sm">Connect with trained professionals who understand your journey.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search expertise, name, bio..."
            className="w-full p-3 pl-10 rounded-xl border border-sage-100 bg-white focus:ring-2 focus:ring-sage-500 outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="h-11 w-11 shrink-0" onClick={() => setShowFilterModal(true)}>
          <Filter size={20} />
        </Button>
      </div>

      {/* Counselor List */}
      <div className="space-y-4">
        {filteredCounselors.length > 0 ? filteredCounselors.map((counselor) => (
          <Card 
            key={counselor.id} 
            className="flex gap-4 items-start"
            onClick={() => setSelectedCounselor(counselor)}
          >
            <img 
              src={counselor.imageUrl} 
              alt={counselor.name} 
              className="w-16 h-16 rounded-xl object-cover border border-sage-50 shrink-0"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 truncate">{counselor.name}</h3>
                {counselor.isSubsidized && (
                  <Badge className="bg-green-100 text-green-700 shrink-0">Subsidized</Badge>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate mb-1">{counselor.expertise.join(' • ')}</p>
              <p className="text-xs text-gray-400 truncate mb-1">{counselor.specialties.join(', ')}</p>
              <p className="text-xs text-gray-400 line-clamp-2 mb-2">{counselor.bio}</p>
              <div className="flex gap-2">
                {counselor.sessionTypes.includes('chat') && <MessageCircle size={14} className="text-sage-400" />}
                {counselor.sessionTypes.includes('call') && <Phone size={14} className="text-sage-400" />}
                {counselor.sessionTypes.includes('home') && <Home size={14} className="text-sage-400" />}
              </div>
            </div>
            <ChevronRight className="text-gray-300 shrink-0 mt-2" size={20} />
          </Card>
        )) : (
          <div className="text-center py-12 text-gray-500">
            <p>No counselors found matching your criteria.</p>
            <Button variant="ghost" className="mt-2" onClick={() => {
              setSearch('');
              setFilterType('All');
              setFilterExpertise('All');
              setFilterSpecialty('All');
              setFilterCost('Any');
            }}>Clear Filters</Button>
          </div>
        )}
      </div>

      {/* Counselor Detail Modal */}
      <AnimatePresence>
        {selectedCounselor && !contactModal && (
          <div className="fixed inset-0 z-[60] flex items-end justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white w-full max-w-md rounded-t-[2.5rem] p-6 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-4">
                  <img 
                    src={selectedCounselor.imageUrl} 
                    alt={selectedCounselor.name} 
                    className="w-20 h-20 rounded-2xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h2 className="text-xl font-bold">{selectedCounselor.name}</h2>
                    <p className="text-sm text-sage-600 font-medium">{selectedCounselor.expertise[0]}</p>
                    <div className="flex gap-1 mt-2">
                      <Badge className="bg-sage-50 text-sage-600">{selectedCounselor.costRange} cost</Badge>
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelectedCounselor(null)} className="p-2 bg-gray-50 rounded-full">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <section>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">About</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{selectedCounselor.bio}</p>
                </section>

                <section>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCounselor.specialties.map(s => (
                      <Badge key={s} className="bg-lavender-50 text-lavender-500 normal-case">{s}</Badge>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Accessibility</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedCounselor.accessibilityOptions.map(o => (
                      <li key={o} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-sage-500 rounded-full" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="space-y-3 pt-4">
                <h4 className="text-sm font-bold text-center text-gray-900">Contact & Request</h4>
                <div className="grid grid-cols-3 gap-3">
                  {selectedCounselor.sessionTypes.includes('chat') && (
                    <Button variant="outline" className="flex-col py-4 h-auto" onClick={() => handleBook('chat')}>
                      <MessageCircle size={20} />
                      <span className="text-[10px] mt-1">Text</span>
                    </Button>
                  )}
                  {selectedCounselor.sessionTypes.includes('call') && (
                    <Button variant="outline" className="flex-col py-4 h-auto" onClick={() => handleBook('call')}>
                      <Phone size={20} />
                      <span className="text-[10px] mt-1">Call</span>
                    </Button>
                  )}
                  {selectedCounselor.sessionTypes.includes('home') && (
                    <Button variant="secondary" className="flex-col py-4 h-auto" onClick={() => handleBook('home')}>
                      <Home size={20} />
                      <span className="text-[10px] mt-1">Home Visit</span>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Modal 
        isOpen={!!contactModal} 
        onClose={() => setContactModal(null)}
        title={contactModal?.type === 'home' ? 'Arrange Home Visit' : `Contact ${contactModal?.counselor.name}`}
      >
        {contactModal && (
          <div className="space-y-6">
            <div className="p-4 bg-sage-50 rounded-2xl space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-sage-600 shadow-sm">
                  {contactModal.type === 'chat' ? <MessageCircle size={20} /> : <Home size={20} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 capitalize">{contactModal.type === 'home' ? 'Home Visit' : 'Message'}</p>
                  <p className="text-xs text-gray-500">{contactModal.counselor.phoneNumber}</p>
                </div>
              </div>
              <textarea 
                className="w-full p-3 rounded-xl border border-white bg-white/50 focus:ring-2 focus:ring-sage-500 outline-none min-h-[100px] text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
              />
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-gray-400 uppercase text-center tracking-widest">Send via</p>
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => handleCommSelection('whatsapp')}
                  className="bg-[#25D366] hover:bg-[#128C7E] text-white border-none py-4"
                >
                  WhatsApp
                </Button>
                <Button 
                  onClick={() => handleCommSelection('sms')}
                  variant="outline"
                  className="py-4"
                >
                  SMS Message
                </Button>
              </div>
              <p className="text-[10px] text-gray-400 text-center">
                Messaging may incur standard carrier rates.
              </p>
            </div>
          </div>
        )}
      </Modal>

      {/* Filter Modal */}
      <Modal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} title="Filter Counselors">
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pb-4 pr-2">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900">Session Type</h4>
            <div className="flex flex-wrap gap-2">
              {['All', 'Chat', 'Call', 'Home Visit'].map(type => (
                <FilterBadge key={type} active={filterType === type} label={type} onClick={() => setFilterType(type)} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900">Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {['All', 'Anxiety', 'Depression', 'Trauma', 'Grief', 'Disability Support', 'Maternal Mental Health', 'Neurodiversity', 'Addiction', 'Burnout', 'Elderly Care', 'Entrepreneurial Stress'].map(exp => (
                <FilterBadge key={exp} active={filterExpertise === exp} label={exp} onClick={() => setFilterExpertise(exp)} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {['All', 'EMDR', 'CBT', 'Mindfulness', 'Person-Centered Therapy', 'Family Systems', 'Motivational Interviewing', 'Grief Counseling', 'Trauma-Informed Care', 'Social Skills Coaching', 'Career Coaching', 'Executive Coaching'].map(spec => (
                <FilterBadge key={spec} active={filterSpecialty === spec} label={spec} onClick={() => setFilterSpecialty(spec)} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900">Cost</h4>
            <div className="flex flex-wrap gap-2">
              {['Any', 'Subsidized', 'Low Cost'].map(cost => (
                <FilterBadge key={cost} active={filterCost === cost} label={cost} onClick={() => setFilterCost(cost)} />
              ))}
            </div>
          </div>
          <Button className="w-full" onClick={() => setShowFilterModal(false)}>Apply Filters</Button>
        </div>
      </Modal>
    </div>
  );
};

export default CounselorsScreen;
