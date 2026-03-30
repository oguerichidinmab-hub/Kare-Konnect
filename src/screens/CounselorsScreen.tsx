import React, { useState } from 'react';
import { MOCK_COUNSELORS } from '../data/mockData';
import { Card, Button, Badge } from '../components/UI';
import { Search, Filter, MessageCircle, Phone, Home, ChevronRight, X } from 'lucide-react';
import { Counselor } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { useAppState } from '../contexts/AppStateContext';
import { useNavigate } from 'react-router-dom';

const CounselorsScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(null);
  const { addSession } = useAppState();
  const navigate = useNavigate();

  const filteredCounselors = MOCK_COUNSELORS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.expertise.some(e => e.toLowerCase().includes(search.toLowerCase()))
  );

  const handleBook = (type: 'chat' | 'call' | 'home') => {
    if (!selectedCounselor) return;
    
    addSession({
      counselorId: selectedCounselor.id,
      counselorName: selectedCounselor.name,
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
      time: '10:00 AM',
      type,
      status: 'upcoming'
    });
    
    setSelectedCounselor(null);
    navigate('/sessions');
  };

  return (
    <div className="pb-24 pt-6 px-4 space-y-6 max-w-md mx-auto">
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
            placeholder="Search expertise, name..."
            className="w-full p-3 pl-10 rounded-xl border border-sage-100 bg-white focus:ring-2 focus:ring-sage-500 outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon" className="h-11 w-11">
          <Filter size={20} />
        </Button>
      </div>

      {/* Counselor List */}
      <div className="space-y-4">
        {filteredCounselors.map((counselor) => (
          <Card 
            key={counselor.id} 
            className="flex gap-4 items-center"
            onClick={() => setSelectedCounselor(counselor)}
          >
            <img 
              src={counselor.imageUrl} 
              alt={counselor.name} 
              className="w-16 h-16 rounded-xl object-cover border border-sage-50"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-gray-900 truncate">{counselor.name}</h3>
                {counselor.isSubsidized && (
                  <Badge className="bg-green-100 text-green-700">Subsidized</Badge>
                )}
              </div>
              <p className="text-xs text-gray-500 truncate mb-2">{counselor.expertise.join(' • ')}</p>
              <div className="flex gap-2">
                {counselor.sessionTypes.includes('chat') && <MessageCircle size={14} className="text-sage-400" />}
                {counselor.sessionTypes.includes('call') && <Phone size={14} className="text-sage-400" />}
                {counselor.sessionTypes.includes('home') && <Home size={14} className="text-sage-400" />}
              </div>
            </div>
            <ChevronRight className="text-gray-300" size={20} />
          </Card>
        ))}
      </div>

      {/* Counselor Detail Modal */}
      <AnimatePresence>
        {selectedCounselor && (
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
                <h4 className="text-sm font-bold text-center text-gray-900">Request a Session</h4>
                <div className="grid grid-cols-3 gap-3">
                  {selectedCounselor.sessionTypes.includes('chat') && (
                    <Button variant="outline" className="flex-col py-4 h-auto" onClick={() => handleBook('chat')}>
                      <MessageCircle size={20} />
                      <span className="text-[10px] mt-1">Chat</span>
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
                      <span className="text-[10px] mt-1">Home</span>
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CounselorsScreen;
