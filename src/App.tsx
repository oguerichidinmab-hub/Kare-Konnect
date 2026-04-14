import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppStateProvider, useAppState } from './contexts/AppStateContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import BottomNav from './components/BottomNav';
import Onboarding from './components/Onboarding';
import SplashScreen from './components/SplashScreen';
import Auth from './components/Auth';
import HomeScreen from './screens/HomeScreen';
import CounselorsScreen from './screens/CounselorsScreen';
import SupportScreen from './screens/SupportScreen';
import SessionsScreen from './screens/SessionsScreen';
import AssistantScreen from './screens/AssistantScreen';
import ProfileScreen from './screens/ProfileScreen';
import { AnimatePresence, motion } from 'motion/react';

const AppContent = () => {
  const { profile } = useAppState();
  const { user, loading: authLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {showSplash || authLoading ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SplashScreen />
        </motion.div>
      ) : !user ? (
        <motion.div
          key="auth"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-sage-50 flex justify-center items-center"
        >
          <Auth />
        </motion.div>
      ) : !profile || !profile.onboarded ? (
        <motion.div
          key="onboarding"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-sage-50 flex justify-center items-center"
        >
          <Onboarding />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-sage-50 flex justify-center"
        >
          <div className="w-full max-w-md bg-sage-50 h-screen relative shadow-2xl md:shadow-sage-200/50 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto pb-24">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/counselors" element={<CounselorsScreen />} />
                <Route path="/support" element={<SupportScreen />} />
                <Route path="/sessions" element={<SessionsScreen />} />
                <Route path="/assistant" element={<AssistantScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            <BottomNav />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppStateProvider>
        <AccessibilityProvider>
          <Router>
            <AppContent />
          </Router>
        </AccessibilityProvider>
      </AppStateProvider>
    </AuthProvider>
  );
}
