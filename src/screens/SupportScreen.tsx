import React, { useState } from 'react';
import { Card, Button, Badge, Modal } from '../components/UI';
import { 
  HeartPulse, Home, AlertCircle, 
  BookOpen, ChevronRight, Phone, 
  MapPin, Calendar, Clock, Accessibility,
  CheckCircle2, Share2, MessageCircle
} from 'lucide-react';
import { MOCK_RESOURCES } from '../data/mockData';
import { motion, AnimatePresence } from 'motion/react';
import { useAppState } from '../contexts/AppStateContext';
import { cn } from '../lib/utils';
import { Resource } from '../types';

const SupportScreen = () => {
  const [activeTab, setActiveTab] = useState<'resources' | 'emergency' | 'home-visit'>('resources');
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Resource | null>(null);
  const { profile } = useAppState();

  const handleHomeVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleShare = async () => {
    if (!selectedArticle) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: selectedArticle.title,
          text: `Check out this article on Kare Konnect: ${selectedArticle.title}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing', error);
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      alert(`Link copied to clipboard: ${window.location.href}`);
    }
  };

  return (
    <div className="pt-6 px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900">Support Hub</h1>
        <p className="text-gray-500 text-sm">Access resources, emergency help, or request home-based care.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex p-1 bg-sage-100 rounded-2xl">
        {(['resources', 'emergency', 'home-visit'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 py-2.5 text-xs font-bold rounded-xl transition-all capitalize",
              activeTab === tab ? "bg-white text-sage-600 shadow-sm" : "text-gray-500"
            )}
          >
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'resources' && (
          <motion.div
            key="resources"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {MOCK_RESOURCES.map((resource) => (
              <Card key={resource.id} className="space-y-3">
                <div className="flex justify-between items-start">
                  <Badge className="bg-lavender-50 text-lavender-500">{resource.category}</Badge>
                  <span className="text-[10px] text-gray-400 font-medium">{resource.readTime} read</span>
                </div>
                <h3 className="font-bold text-gray-900">{resource.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{resource.content}</p>
                <Button variant="ghost" size="sm" className="w-full justify-between p-0 h-auto" onClick={() => setSelectedArticle(resource)}>
                  Read Article <ChevronRight size={16} />
                </Button>
              </Card>
            ))}
          </motion.div>
        )}

        {activeTab === 'emergency' && (
          <motion.div
            key="emergency"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <Card className="bg-red-50 border-red-100 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center">
                  <AlertCircle size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-red-900">Immediate Danger?</h3>
                  <p className="text-xs text-red-700">If you are in immediate danger, call emergency services.</p>
                </div>
              </div>
              <a href="tel:911" className="block">
                <Button variant="danger" className="w-full py-4 text-lg">
                  <Phone size={20} /> Call 911 / Emergency
                </Button>
              </a>
            </Card>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Crisis Hotlines</h4>
              <Card className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sage-50 text-sage-500 rounded-xl flex items-center justify-center">
                    <HeartPulse size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Crisis Text Line</p>
                    <p className="text-xs text-gray-500">Text HOME to 741741</p>
                  </div>
                </div>
                <a href="sms:741741?body=HOME">
                  <Button variant="outline" size="sm">Text</Button>
                </a>
              </Card>
              <Card className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sage-50 text-sage-500 rounded-xl flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Suicide Prevention</p>
                    <p className="text-xs text-gray-500">Call 988</p>
                  </div>
                </div>
                <a href="tel:988">
                  <Button variant="outline" size="sm">Call</Button>
                </a>
              </Card>
            </div>

            {profile?.trustedContact && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Trusted Contact</h4>
                <Card className="bg-sage-50 border-sage-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white text-sage-500 rounded-xl flex items-center justify-center">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{profile.trustedContact}</p>
                      <p className="text-xs text-gray-500">Your designated emergency contact</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a href={`sms:${profile.trustedContact}`}>
                      <Button variant="outline" size="icon" className="h-8 w-8"><MessageCircle size={14} /></Button>
                    </a>
                    <a href={`tel:${profile.trustedContact}`}>
                      <Button variant="primary" size="sm">Call</Button>
                    </a>
                  </div>
                </Card>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'home-visit' && (
          <motion.div
            key="home-visit"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <Card className="bg-sage-500 text-white border-none">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                  <Home size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold">Home-Based Care</h3>
                  <p className="text-xs opacity-90 leading-relaxed">
                    We provide counseling at home for those with mobility challenges or severe anxiety.
                  </p>
                </div>
              </div>
            </Card>

            <form onSubmit={handleHomeVisitSubmit} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Location Details</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="Your full address"
                      className="w-full p-3 pl-10 rounded-xl border border-sage-100 bg-white focus:ring-2 focus:ring-sage-500 outline-none text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input 
                        required
                        type="date" 
                        className="w-full p-3 pl-10 rounded-xl border border-sage-100 bg-white focus:ring-2 focus:ring-sage-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Preferred Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 text-gray-400" size={18} />
                      <input 
                        required
                        type="time" 
                        className="w-full p-3 pl-10 rounded-xl border border-sage-100 bg-white focus:ring-2 focus:ring-sage-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Mobility Needs</label>
                  <div className="relative">
                    <Accessibility className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="e.g., wheelchair access, quiet space"
                      className="w-full p-3 pl-10 rounded-xl border border-sage-100 bg-white focus:ring-2 focus:ring-sage-500 outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
              <Button type="submit" className="w-full py-4">Request Home Visit</Button>
            </form>

            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="fixed inset-0 z-[70] flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm"
                >
                  <Card className="w-full max-w-xs text-center space-y-4 py-8">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 size={32} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">Request Sent!</h3>
                      <p className="text-sm text-gray-500">A coordinator will contact you within 24 hours to confirm.</p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => setShowSuccess(false)}>Close</Button>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Reader Modal */}
      <Modal
        isOpen={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        className="w-full h-full max-h-[100vh] rounded-none p-0 flex flex-col"
      >
        {selectedArticle && (
          <div className="flex flex-col h-full bg-white">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 p-4 border-b border-gray-100 flex justify-between items-center">
              <Badge className="bg-lavender-50 text-lavender-500">{selectedArticle.category}</Badge>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={handleShare}>
                  <Share2 size={18} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setSelectedArticle(null)}>
                  <ChevronRight size={20} className="rotate-180" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">{selectedArticle.title}</h1>
                <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><Clock size={14} /> {selectedArticle.readTime} read</span>
                  <span className="flex items-center gap-1"><BookOpen size={14} /> Kare Konnect Editorial</span>
                </div>
              </div>
              
              <div className="w-full h-48 bg-sage-100 rounded-2xl flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${selectedArticle.id}/800/400?blur=2`} 
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="prose prose-sage max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed font-medium">
                  {selectedArticle.content}
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Understanding your mental health is a journey. It's important to recognize the signs and take proactive steps towards well-being. This article explores key concepts and provides actionable advice for managing daily challenges.
                </p>
                <h3 className="text-xl font-bold text-gray-900 mt-8 mb-4">Key Takeaways</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Acknowledge your feelings without judgment.</li>
                  <li>Establish a consistent daily routine.</li>
                  <li>Reach out to support networks when needed.</li>
                  <li>Practice self-compassion regularly.</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Remember, seeking help is a sign of strength, not weakness. If you find yourself struggling, consider reaching out to one of our qualified counselors or using the emergency resources available in the app.
                </p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <Button className="w-full" onClick={() => setSelectedArticle(null)}>
                Finished Reading
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SupportScreen;
