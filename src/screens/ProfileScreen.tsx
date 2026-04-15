import React, { useState, useEffect } from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { useAccessibility } from '../contexts/AccessibilityContext';
import { Card, Button, Badge, Modal } from '../components/UI';
import { 
  User, Settings, Bell, Shield, 
  Accessibility, LogOut, ChevronRight,
  Moon, Sun, Type, Eye, Volume2,
  TrendingUp, Award, Calendar, Download, Database, Trash2, AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

import { AnimatePresence, motion } from 'motion/react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const ProfileScreen = () => {
  const { profile, moods, sessions } = useAppState();
  const { settings, updateSettings } = useAccessibility();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  
  // Modals state
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showData, setShowData] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock settings state
  const [notifSettings, setNotifSettings] = useState({ reminders: true, counselor: true, wellness: false });
  const [privacySettings, setPrivacySettings] = useState({ visibility: 'private', contact: 'counselors_only', appLock: false });

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

  const confirmSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Sign out error:', error);
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
          <Card className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50" onClick={() => setShowNotifications(true)}>
            <div className="flex items-center gap-3">
              <Bell size={18} className="text-gray-400" />
              <span className="text-sm font-medium">Notifications</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </Card>
          <Card className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50" onClick={() => setShowPrivacy(true)}>
            <div className="flex items-center gap-3">
              <Shield size={18} className="text-gray-400" />
              <span className="text-sm font-medium">Privacy Settings</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </Card>
          <Card className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50" onClick={() => setShowData(true)}>
            <div className="flex items-center gap-3">
              <Database size={18} className="text-gray-400" />
              <span className="text-sm font-medium">Data Management</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </Card>
        </div>
      </section>

      <Button variant="ghost" className="w-full text-red-500 hover:bg-red-50" onClick={() => setShowSignOutConfirm(true)}>
        <LogOut size={18} /> Sign Out
      </Button>

      <p className="text-center text-[10px] text-gray-400 font-medium pb-4">
        Kare Konnect v1.0.0 • Designed with dignity
      </p>

      {/* Sign Out Confirmation Modal */}
      <AnimatePresence>
        {showSignOutConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
              onClick={() => setShowSignOutConfirm(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-xs bg-white rounded-3xl p-6 z-[70] shadow-2xl"
            >
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto">
                  <LogOut size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900">Sign Out?</h3>
                  <p className="text-sm text-gray-500">Are you sure you want to sign out of Kare Konnect?</p>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <Button variant="primary" className="bg-red-500 hover:bg-red-600 border-red-500" onClick={confirmSignOut}>
                    Yes, Sign Out
                  </Button>
                  <Button variant="ghost" onClick={() => setShowSignOutConfirm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notifications Modal */}
      <Modal isOpen={showNotifications} onClose={() => setShowNotifications(false)} title="Notifications">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">Manage how Kare Konnect communicates with you.</p>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Daily Reminders</p>
                <p className="text-xs text-gray-500">Mood check-ins and tips</p>
              </div>
              <button 
                onClick={() => setNotifSettings(s => ({ ...s, reminders: !s.reminders }))}
                className={cn("w-12 h-6 rounded-full transition-colors relative", notifSettings.reminders ? "bg-sage-500" : "bg-gray-200")}
              >
                <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-transform", notifSettings.reminders ? "left-7" : "left-1")} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Counselor Messages</p>
                <p className="text-xs text-gray-500">Updates from your counselor</p>
              </div>
              <button 
                onClick={() => setNotifSettings(s => ({ ...s, counselor: !s.counselor }))}
                className={cn("w-12 h-6 rounded-full transition-colors relative", notifSettings.counselor ? "bg-sage-500" : "bg-gray-200")}
              >
                <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-transform", notifSettings.counselor ? "left-7" : "left-1")} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Wellness Check-ins</p>
                <p className="text-xs text-gray-500">Occasional check-ins from the app</p>
              </div>
              <button 
                onClick={() => setNotifSettings(s => ({ ...s, wellness: !s.wellness }))}
                className={cn("w-12 h-6 rounded-full transition-colors relative", notifSettings.wellness ? "bg-sage-500" : "bg-gray-200")}
              >
                <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-transform", notifSettings.wellness ? "left-7" : "left-1")} />
              </button>
            </div>
          </div>
          <Button className="w-full mt-4" onClick={() => setShowNotifications(false)}>Save Preferences</Button>
        </div>
      </Modal>

      {/* Privacy Modal */}
      <Modal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} title="Privacy Settings">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">Control your data visibility and app security.</p>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Data Visibility</label>
              <select 
                className="w-full p-3 rounded-xl border border-sage-100 bg-white focus:ring-2 focus:ring-sage-500 outline-none text-sm"
                value={privacySettings.visibility}
                onChange={(e) => setPrivacySettings(s => ({ ...s, visibility: e.target.value }))}
              >
                <option value="private">Private (Only me)</option>
                <option value="counselor">Shared with my counselor</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Who can contact me</label>
              <select 
                className="w-full p-3 rounded-xl border border-sage-100 bg-white focus:ring-2 focus:ring-sage-500 outline-none text-sm"
                value={privacySettings.contact}
                onChange={(e) => setPrivacySettings(s => ({ ...s, contact: e.target.value }))}
              >
                <option value="counselors_only">My Counselors Only</option>
                <option value="anyone">Any Verified Counselor</option>
                <option value="none">Do Not Contact</option>
              </select>
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-sm font-medium">App Lock</p>
                <p className="text-xs text-gray-500">Require biometrics to open</p>
              </div>
              <button 
                onClick={() => setPrivacySettings(s => ({ ...s, appLock: !s.appLock }))}
                className={cn("w-12 h-6 rounded-full transition-colors relative", privacySettings.appLock ? "bg-sage-500" : "bg-gray-200")}
              >
                <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-transform", privacySettings.appLock ? "left-7" : "left-1")} />
              </button>
            </div>
          </div>
          <Button className="w-full mt-4" onClick={() => setShowPrivacy(false)}>Save Settings</Button>
        </div>
      </Modal>

      {/* Data Management Modal */}
      <Modal isOpen={showData} onClose={() => setShowData(false)} title="Data Management">
        <div className="space-y-4">
          <p className="text-sm text-gray-500 mb-4">Manage your personal data stored in Kare Konnect.</p>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-between" onClick={() => alert('Exporting data...')}>
              Export My Data <Download size={16} />
            </Button>
            <Button variant="outline" className="w-full justify-between" onClick={() => setShowDeleteConfirm(true)}>
              Clear Mood History <Trash2 size={16} />
            </Button>
            <Button variant="danger" className="w-full justify-between mt-4" onClick={() => setShowDeleteConfirm(true)}>
              Delete Account <AlertCircle size={16} />
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)} title="Are you sure?">
        <div className="space-y-4">
          <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm">
            This action is permanent and cannot be undone. All your data will be permanently removed from our servers.
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
            <Button variant="danger" className="flex-1" onClick={() => {
              setShowDeleteConfirm(false);
              setShowData(false);
              // Mock delete action
              alert('Data deleted successfully.');
            }}>Confirm Delete</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileScreen;
