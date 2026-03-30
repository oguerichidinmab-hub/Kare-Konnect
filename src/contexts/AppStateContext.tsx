import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, MoodEntry, Session } from '../types';

interface AppStateContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  moods: MoodEntry[];
  addMood: (mood: Omit<MoodEntry, 'id'>) => void;
  sessions: Session[];
  addSession: (session: Omit<Session, 'id'>) => void;
  cancelSession: (id: string) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('kare_konnect_profile');
    return saved ? JSON.parse(saved) : null;
  });

  const [moods, setMoods] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('kare_konnect_moods');
    return saved ? JSON.parse(saved) : [];
  });

  const [sessions, setSessions] = useState<Session[]>(() => {
    const saved = localStorage.getItem('kare_konnect_sessions');
    return saved ? JSON.parse(saved) : [];
  });

  const setProfile = (newProfile: UserProfile) => {
    setProfileState(newProfile);
    localStorage.setItem('kare_konnect_profile', JSON.stringify(newProfile));
  };

  const addMood = (mood: Omit<MoodEntry, 'id'>) => {
    const newMood = { ...mood, id: Date.now().toString() };
    const updated = [newMood, ...moods];
    setMoods(updated);
    localStorage.setItem('kare_konnect_moods', JSON.stringify(updated));
  };

  const addSession = (session: Omit<Session, 'id'>) => {
    const newSession = { ...session, id: Date.now().toString() };
    const updated = [newSession, ...sessions];
    setSessions(updated);
    localStorage.setItem('kare_konnect_sessions', JSON.stringify(updated));
  };

  const cancelSession = (id: string) => {
    const updated = sessions.map(s => s.id === id ? { ...s, status: 'cancelled' as const } : s);
    setSessions(updated);
    localStorage.setItem('kare_konnect_sessions', JSON.stringify(updated));
  };

  return (
    <AppStateContext.Provider value={{ profile, setProfile, moods, addMood, sessions, addSession, cancelSession }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be used within AppStateProvider');
  return context;
};
