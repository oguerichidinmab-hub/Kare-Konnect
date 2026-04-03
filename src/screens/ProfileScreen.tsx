import React, { useState, useEffect } from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { Card, Button, Badge } from '../components/UI';
import { 
  User, Settings, Bell, Shield, 
  Accessibility, LogOut, ChevronRight,
  Moon, Sun, Type, Eye, Volume2,
  TrendingUp, Award, Calendar, Download
} from 'lucide-react';
import { cn } from '../lib/utils';

const ProfileScreen = () => {
  const { profile, moods, sessions } = useAppState();
  const { settings, updateSettings } = useAccessibility();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const moodCount = moods.length;
  const sessionCount = sessions.filter(s => s.status === 'completed').length;

  return (
    <div className="pt-6 px-4 space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="w-24 h-24 bg-white rounded-[2.5rem] card-shadow flex items-center justify-center relative">
          <User size={48} className="text-sage-500" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-sage-500 rounded-xl border-4 border-sage-50 flex items-center justify-center text-white">
            <Award size={16} />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{profile?.name}</h1>
          <p className="text-sm text-gray-500">{profile?.location || 'Location not set'}</p>
        </div>
      </div>

      {/* Install App Button */}
      {deferredPrompt && (
        <Card className="bg-sage-600 text-white border-none flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Download size={20} />
            </div>
            <div>
              <p className="text-sm font-bold">Install Kare Konnect</p>
              <p className="text-[10px] opacity-80">Add to your home screen for quick access.</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={handleInstall}>
            Install
          </Button>
        </Card>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="flex flex-col items-center text-center gap-1 py-4">
          <span className="text-2xl font-bold text-sage-600">{moodCount}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Mood Checks</span>
        </Card>
        <Card className="flex flex-col items-center text-center gap-1 py-4">
          <span className="text-2xl font-bold text-lavender-500">{sessionCount}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Sessions</span>
        </Card>
      </div>

      {/* Recovery Progress Preview */}
      <Card className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <TrendingUp size={18} className="text-sage-500" />
            Your Progress
          </h3>
          <Badge className="bg-sage-50 text-sage-600">Level 2</Badge>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
            <span>Wellness Streak</span>
            <span>4 Days</span>
          </div>
          <div className="h-2 bg-sage-50 rounded-full overflow-hidden">
            <div className="h-full bg-sage-500 w-[40%] rounded-full" />
          </div>
          <p className="text-[10px] text-gray-500 italic">"Keep going, {profile?.name}! You're making great progress."</p>
        </div>
      </Card>

      {/* Accessibility Settings */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
          <Accessibility size={14} />
          Accessibility
        </h2>
        <Card className="divide-y divide-sage-50 p-0 overflow-hidden">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sage-50 text-sage-500 rounded-lg flex items-center justify-center">
                <Type size={18} />
              </div>
              <span className="text-sm font-medium">Large Text</span>
            </div>
            <button 
              onClick={() => updateSettings({ largeText: !settings.largeText })}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                settings.largeText ? "bg-sage-500" : "bg-gray-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                settings.largeText ? "left-7" : "left-1"
              )} />
            </button>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sage-50 text-sage-500 rounded-lg flex items-center justify-center">
                <Eye size={18} />
              </div>
              <span className="text-sm font-medium">High Contrast</span>
            </div>
            <button 
              onClick={() => updateSettings({ highContrast: !settings.highContrast })}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                settings.highContrast ? "bg-sage-500" : "bg-gray-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                settings.highContrast ? "left-7" : "left-1"
              )} />
            </button>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-sage-50 text-sage-500 rounded-lg flex items-center justify-center">
                <Volume2 size={18} />
              </div>
              <span className="text-sm font-medium">Text to Speech</span>
            </div>
            <button 
              onClick={() => updateSettings({ textToSpeech: !settings.textToSpeech })}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                settings.textToSpeech ? "bg-sage-500" : "bg-gray-200"
              )}
            >
              <div className={cn(
                "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform",
                settings.textToSpeech ? "left-7" : "left-1"
              )} />
            </button>
          </div>
        </Card>
      </section>

      {/* Other Settings */}
      <section className="space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
          <Settings size={14} />
          Preferences
        </h2>
        <div className="space-y-2">
          <Card className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-gray-400" />
              <span className="text-sm font-medium">Notifications</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </Card>
          <Card className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-gray-400" />
              <span className="text-sm font-medium">Privacy & Data</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </Card>
        </div>
      </section>

      <Button variant="ghost" className="w-full text-red-500 hover:bg-red-50">
        <LogOut size={18} /> Sign Out
      </Button>

      <p className="text-center text-[10px] text-gray-400 font-medium pb-4">
        Kare Konnect v1.0.0 • Designed with dignity
      </p>
    </div>
  );
};

export default ProfileScreen;
