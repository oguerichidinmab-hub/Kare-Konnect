import React, { useState } from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { Card, Button, Badge } from '../components/UI';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Smile, Meh, Frown, AlertCircle, 
  Calendar, MessageSquare, Sparkles, 
  Settings, Home as HomeIcon, ChevronRight
} from 'lucide-react';
import { WELLNESS_TIPS } from '../data/mockData';
import { Mood } from '../types';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const HomeScreen = () => {
  const { profile, addMood, moods } = useAppState();
  
  const today = new Date().toISOString().split('T')[0];
  const todaysMood = moods.find(m => m.date.startsWith(today));

  const [isUpdating, setIsUpdating] = useState(false);
  const [tip] = useState(() => WELLNESS_TIPS[Math.floor(Math.random() * WELLNESS_TIPS.length)]);

  const showMoodCheck = !todaysMood || isUpdating;
  const selectedMood = todaysMood ? todaysMood.mood : null;

  const handleMoodSelect = (mood: Mood) => {
    addMood({
      date: new Date().toISOString(),
      mood,
      note: ''
    });
    setIsUpdating(false);
  };

  const moodIcons = {
    great: { icon: Smile, color: 'text-green-500', bg: 'bg-green-50' },
    good: { icon: Smile, color: 'text-sage-500', bg: 'bg-sage-50' },
    okay: { icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    low: { icon: Frown, color: 'text-orange-500', bg: 'bg-orange-50' },
    struggling: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  };

  const moodResponses: Record<Mood, { title: string, message: string, action: string, link: string }> = {
    great: { title: "That's wonderful!", message: "Keep up the positive energy. Maybe share it with someone today.", action: "Write a note", link: "/assistant" },
    good: { title: "Glad to hear it.", message: "A good day is a great foundation. What's working well for you?", action: "Track it", link: "/assistant" },
    okay: { title: "Okay is okay.", message: "Some days are just steady. Remember to take breaks.", action: "Read a tip", link: "/support" },
    low: { title: "Take it easy today.", message: "It's normal to have low days. Be gentle with yourself.", action: "Try a breathing exercise", link: "/assistant" },
    struggling: { title: "We're here for you.", message: "You don't have to go through this alone. Consider reaching out.", action: "Find a counselor", link: "/counselors" },
  };

  return (
    <div className="pt-6 px-4 space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <Logo showText size={24} />
        <Link to="/profile">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center card-shadow">
            <Settings size={20} className="text-gray-400" />
          </div>
        </Link>
      </div>

      {/* Mood Check-in */}
      <AnimatePresence mode="wait">
        {showMoodCheck ? (
          <motion.div
            key="mood-check"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="bg-gradient-to-br from-sage-500 to-sage-600 text-white border-none">
              <h3 className="font-bold mb-4">Daily Mood Check-in</h3>
              <div className="flex justify-between">
                {(Object.keys(moodIcons) as Mood[]).map((mood) => {
                  const { icon: Icon } = moodIcons[mood];
                  return (
                    <button
                      key={mood}
                      onClick={() => handleMoodSelect(mood)}
                      className="flex flex-col items-center gap-2 group"
                    >
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-active:scale-90 transition-transform">
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] font-medium capitalize opacity-80">{mood}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            key="mood-response"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Card className="bg-sage-50 border border-sage-100 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    {selectedMood && React.createElement(moodIcons[selectedMood].icon, { className: moodIcons[selectedMood].color, size: 20 })}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{selectedMood ? moodResponses[selectedMood].title : 'Mood logged!'}</p>
                    <p className="text-xs text-gray-500">Mood saved successfully.</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsUpdating(true)}>
                  Update
                </Button>
              </div>
              {selectedMood && (
                <div className="pt-2 border-t border-sage-100/50">
                  <p className="text-sm text-gray-600 mb-3">{moodResponses[selectedMood].message}</p>
                  <Link to={moodResponses[selectedMood].link}>
                    <Button variant="outline" size="sm" className="w-full text-xs py-2">
                      {moodResponses[selectedMood].action}
                    </Button>
                  </Link>
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Link to="/counselors">
          <Card className="h-full flex flex-col items-center text-center gap-3 py-6">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
              <MessageSquare size={24} />
            </div>
            <span className="text-sm font-bold">Find a Counselor</span>
          </Card>
        </Link>
        <Link to="/sessions">
          <Card className="h-full flex flex-col items-center text-center gap-3 py-6">
            <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center">
              <Calendar size={24} />
            </div>
            <span className="text-sm font-bold">Book Session</span>
          </Card>
        </Link>
        <Link to="/assistant">
          <Card className="h-full flex flex-col items-center text-center gap-3 py-6">
            <div className="w-12 h-12 bg-lavender-50 text-lavender-500 rounded-2xl flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <span className="text-sm font-bold">AI Assistant</span>
          </Card>
        </Link>
        <Link to="/support">
          <Card className="h-full flex flex-col items-center text-center gap-3 py-6">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center">
              <HomeIcon size={24} />
            </div>
            <span className="text-sm font-bold">Home Visit</span>
          </Card>
        </Link>
      </div>

      {/* Daily Tip */}
      <Card className="border-l-4 border-l-lavender-500">
        <div className="flex gap-3">
          <div className="text-lavender-500 mt-1">
            <Sparkles size={20} />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-lavender-500 uppercase tracking-wider">Wellness Tip</h4>
            <p className="text-sm text-gray-700 leading-relaxed italic">"{tip}"</p>
          </div>
        </div>
      </Card>

      {/* Emergency Help Shortcut */}
      <Card className="bg-red-50 border-red-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 text-red-600 rounded-xl flex items-center justify-center">
              <AlertCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-red-900">Need Urgent Help?</p>
              <p className="text-xs text-red-700">Crisis support is available 24/7.</p>
            </div>
          </div>
          <Link to="/support">
            <ChevronRight className="text-red-400" />
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default HomeScreen;
