import React, { useState } from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { Card, Button, Badge } from '../components/UI';
import { motion } from 'motion/react';
import { 
  Smile, Meh, Frown, AlertCircle, 
  Calendar, MessageSquare, Sparkles, 
  Settings, Home as HomeIcon, ChevronRight
} from 'lucide-react';
import { WELLNESS_TIPS } from '../data/mockData';
import { Mood } from '../types';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const { profile, addMood, moods } = useAppState();
  const [showMoodCheck, setShowMoodCheck] = useState(true);
  const [tip] = useState(() => WELLNESS_TIPS[Math.floor(Math.random() * WELLNESS_TIPS.length)]);

  const handleMoodSelect = (mood: Mood) => {
    addMood({
      date: new Date().toISOString(),
      mood,
      note: ''
    });
    setShowMoodCheck(false);
  };

  const moodIcons = {
    great: { icon: Smile, color: 'text-green-500', bg: 'bg-green-50' },
    good: { icon: Smile, color: 'text-sage-500', bg: 'bg-sage-50' },
    okay: { icon: Meh, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    low: { icon: Frown, color: 'text-orange-500', bg: 'bg-orange-50' },
    struggling: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  };

  return (
    <div className="pt-6 px-4 space-y-6">
      {/* Welcome Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hello, {profile?.name}</h1>
          <p className="text-gray-500 text-sm">How are you feeling right now?</p>
        </div>
        <Link to="/profile">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center card-shadow">
            <Settings size={20} className="text-gray-400" />
          </div>
        </Link>
      </div>

      {/* Mood Check-in */}
      {showMoodCheck ? (
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
      ) : (
        <Card className="bg-sage-100 border-none flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <Sparkles className="text-sage-500" size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-sage-700">Mood logged!</p>
              <p className="text-[10px] text-sage-600">Keep tracking to see patterns.</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setShowMoodCheck(true)}>
            Update
          </Button>
        </Card>
      )}

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
