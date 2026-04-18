export type Mood = 'great' | 'good' | 'okay' | 'low' | 'struggling';

export interface UserProfile {
  name: string;
  ageRange: string;
  gender: string;
  language: string;
  disabilityNeeds: string;
  location: string;
  mainSupportNeed: string;
  preferredFormat: 'chat' | 'call' | 'home';
  availability: string;
  trustedContact: string;
  onboarded: boolean;
}

export interface Counselor {
  id: string;
  name: string;
  expertise: string[];
  languages: string[];
  specialties: string[];
  availability: string;
  sessionTypes: ('chat' | 'call' | 'home')[];
  bio: string;
  accessibilityOptions: string[];
  costRange: 'low' | 'medium' | 'high';
  isSubsidized: boolean;
  imageUrl: string;
  phoneNumber: string;
}

export interface Session {
  id: string;
  counselorId: string;
  counselorName: string;
  date: string;
  time: string;
  type: 'chat' | 'call' | 'home';
  status: 'upcoming' | 'completed' | 'cancelled';
  location?: string;
}

export interface MoodEntry {
  id: string;
  date: string;
  mood: Mood;
  note: string;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  content: string;
  readTime: string;
}

export interface AccessibilitySettings {
  largeText: boolean;
  highContrast: boolean;
  simpleView: boolean;
  textToSpeech: boolean;
}
