import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppStateProvider, useAppState } from './contexts/AppStateContext';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import BottomNav from './components/BottomNav';
import Onboarding from './components/Onboarding';
import HomeScreen from './screens/HomeScreen';
import CounselorsScreen from './screens/CounselorsScreen';
import SupportScreen from './screens/SupportScreen';
import SessionsScreen from './screens/SessionsScreen';
import AssistantScreen from './screens/AssistantScreen';
import ProfileScreen from './screens/ProfileScreen';

const AppContent = () => {
  const { profile } = useAppState();

  if (!profile || !profile.onboarded) {
    return <Onboarding />;
  }

  return (
    <div className="min-h-screen bg-sage-50">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/counselors" element={<CounselorsScreen />} />
        <Route path="/support" element={<SupportScreen />} />
        <Route path="/sessions" element={<SessionsScreen />} />
        <Route path="/assistant" element={<AssistantScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppStateProvider>
      <AccessibilityProvider>
        <Router>
          <AppContent />
        </Router>
      </AccessibilityProvider>
    </AppStateProvider>
  );
}
