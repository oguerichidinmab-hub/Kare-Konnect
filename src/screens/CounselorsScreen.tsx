import React, { useState } from 'react';
import { MOCK_COUNSELORS } from '../data/mockData';
import { Card, Button, Badge, Modal } from '../components/UI';
import { Search, Filter, MessageCircle, Phone, Home, ChevronRight, X, Send } from 'lucide-react';
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
  const [messageSent, setMessageSent] = useState(false);
  
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
    setContactModal({ type, counselor: selectedCounselor });
    setMessage(`Hi ${selectedCounselor.name}, I would like to request a ${type} session.`);
    setMessageSent(false);
  };

  const confirmBooking = () => {
    if (!contactModal) return;
    
    addSession({
      counselorId: contactModal.counselor.id,
      counselorName: contactModal.counselor.name,
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      time: '10:00 AM',
      type: contactModal.type,
      status: 'upcoming'
    });
    
    setMessageSent(true);
    setTimeout(() => {
      setContactModal(null);
      setSelectedCounselor(null);
      navigate('/sessions');
    }, 1500);
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
        title={`Contact ${contactModal?.counselor.name}`}
      >
        {contactModal && (
          <div className="space-y-4">
            {messageSent ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
                  <Send size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Request Sent!</h3>
                <p className="text-gray-500 text-sm">
                  {contactModal.counselor.name} will review your request and get back to you shortly.
                </p>
              </div>
            ) : (
              <>
                <div className="flex gap-3 items-center p-3 bg-sage-50 rounded-xl">
                  <div className="w-10 h-10 bg-sage-200 rounded-full flex items-center justify-center text-sage-700">
                    {contactModal.type === 'call' ? <Phone size={20} /> : contactModal.type === 'chat' ? <MessageCircle size={20} /> : <Home size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {contactModal.type === 'call' ? 'Phone Call' : contactModal.type === 'chat' ? 'Text Message' : 'Home Visit Request'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {contactModal.type === 'call' ? (
                        <a href="tel:+1234567890" className="text-sage-600 hover:underline">+1 (555) 123-4567</a>
                      ) : contactModal.type === 'chat' ? (
                        <a href="sms:+1234567890" className="text-sage-600 hover:underline">+1 (555) 123-4567</a>
                      ) : (
                        'Schedule a visit'
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Message</label>
                  <textarea 
                    className="w-full p-3 rounded-xl border border-sage-100 focus:ring-2 focus:ring-sage-500 outline-none min-h-[100px] text-sm"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <Button className="w-full" onClick={confirmBooking}>
                  Send Request
                </Button>
              </>
            )}
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
              {['All', 'Anxiety', 'Depression', 'Trauma', 'Grief', 'Disability Support', 'Maternal Mental Health', 'Neurodiversity', 'Addiction'].map(exp => (
                <FilterBadge key={exp} active={filterExpertise === exp} label={exp} onClick={() => setFilterExpertise(exp)} />
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-gray-900">Specialties</h4>
            <div className="flex flex-wrap gap-2">
              {['All', 'EMDR', 'CBT', 'Mindfulness', 'Person-Centered Therapy', 'Family Systems', 'Motivational Interviewing', 'Grief Counseling', 'Trauma-Informed Care', 'Social Skills Coaching'].map(spec => (
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
