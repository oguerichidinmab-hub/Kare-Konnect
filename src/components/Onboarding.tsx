import React, { useState } from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { UserProfile } from '../types';
import { Button, Card } from './UI';
import { motion, AnimatePresence } from 'motion/react';
import { Accessibility, MapPin, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import Logo from './Logo';

const Onboarding = () => {
  const { setProfile } = useAppState();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    ageRange: '',
    gender: '',
    language: 'English',
    disabilityNeeds: '',
    location: '',
    mainSupportNeed: '',
    preferredFormat: 'chat',
    availability: '',
    trustedContact: '',
    onboarded: true
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = () => {
    setProfile(formData as UserProfile);
  };

  const updateField = (field: keyof UserProfile, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-md bg-sage-50 min-h-screen p-6 flex flex-col justify-center shadow-2xl md:shadow-sage-200/50">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <Logo size={32} className="justify-center mb-4" />
              <h1 className="text-3xl font-bold text-gray-900">Welcome to Kare Konnect</h1>
              <p className="text-gray-500">Let's get to know you so we can provide the best support.</p>
            </div>
            
            <Card className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">What's your name?</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-xl border border-sage-100 focus:ring-2 focus:ring-sage-500 outline-none"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Age Range</label>
                <select 
                  className="w-full p-3 rounded-xl border border-sage-100 focus:ring-2 focus:ring-sage-500 outline-none bg-white"
                  value={formData.ageRange}
                  onChange={(e) => updateField('ageRange', e.target.value)}
                >
                  <option value="">Select range</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-54">45-54</option>
                  <option value="55+">55+</option>
                </select>
              </div>
            </Card>
            
            <Button className="w-full" onClick={nextStep} disabled={!formData.name || !formData.ageRange}>
              Continue
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <Accessibility className="text-sage-500 mx-auto" size={48} />
              <h2 className="text-2xl font-bold">Support Needs</h2>
              <p className="text-gray-500">Help us understand your accessibility requirements.</p>
            </div>

            <Card className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Disability Support Needs</label>
                <textarea 
                  className="w-full p-3 rounded-xl border border-sage-100 focus:ring-2 focus:ring-sage-500 outline-none min-h-[100px]"
                  placeholder="e.g., Screen reader support, sign language, mobility assistance..."
                  value={formData.disabilityNeeds}
                  onChange={(e) => updateField('disabilityNeeds', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    className="w-full p-3 pl-10 rounded-xl border border-sage-100 focus:ring-2 focus:ring-sage-500 outline-none"
                    placeholder="City, Neighborhood"
                    value={formData.location}
                    onChange={(e) => updateField('location', e.target.value)}
                  />
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={prevStep}>Back</Button>
              <Button className="flex-1" onClick={nextStep}>Continue</Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <MessageCircle className="text-sage-500 mx-auto" size={48} />
              <h2 className="text-2xl font-bold">Preferences</h2>
              <p className="text-gray-500">How would you like to receive care?</p>
            </div>

            <Card className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Preferred Counseling Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['chat', 'call', 'home'] as const).map((format) => (
                    <button
                      key={format}
                      onClick={() => updateField('preferredFormat', format)}
                      className={cn(
                        "p-3 rounded-xl border text-sm font-medium capitalize transition-all",
                        formData.preferredFormat === format 
                          ? "bg-sage-500 text-white border-sage-500" 
                          : "bg-white text-gray-600 border-sage-100"
                      )}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-1">Trusted Contact (Optional)</label>
                <input 
                  type="text" 
                  className="w-full p-3 rounded-xl border border-sage-100 focus:ring-2 focus:ring-sage-500 outline-none"
                  placeholder="Name and Phone Number"
                  value={formData.trustedContact}
                  onChange={(e) => updateField('trustedContact', e.target.value)}
                />
              </div>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={prevStep}>Back</Button>
              <Button className="flex-1" onClick={handleSubmit}>Complete Setup</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
