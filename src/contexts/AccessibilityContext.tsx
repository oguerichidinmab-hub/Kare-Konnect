import React, { createContext, useContext, useState, useEffect } from 'react';
import { AccessibilitySettings } from '../types';

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('kare_konnect_accessibility');
    return saved ? JSON.parse(saved) : {
      largeText: false,
      highContrast: false,
      simpleView: false,
      textToSpeech: false,
    };
  });

  useEffect(() => {
    localStorage.setItem('kare_konnect_accessibility', JSON.stringify(settings));
    
    // Apply classes to document body for global styling
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
    document.documentElement.classList.toggle('large-text', settings.largeText);
    document.documentElement.classList.toggle('simple-view', settings.simpleView);
  }, [settings]);

  const updateSettings = (newSettings: Partial<AccessibilitySettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};
