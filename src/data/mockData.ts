import { Counselor, Resource } from '../types';

export const MOCK_COUNSELORS: Counselor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    expertise: ['Trauma', 'Anxiety', 'Depression'],
    languages: ['English', 'Mandarin'],
    specialties: ['EMDR', 'CBT', 'Mindfulness'],
    availability: 'Mon-Fri, 9am-5pm',
    sessionTypes: ['chat', 'call', 'home'],
    bio: 'Compassionate care with a focus on trauma recovery and cultural sensitivity.',
    accessibilityOptions: ['Sign Language Support', 'Wheelchair Accessible Home Visits'],
    costRange: 'low',
    isSubsidized: true,
    imageUrl: 'https://picsum.photos/seed/sarah/200/200'
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    expertise: ['Disability Support', 'Life Transitions', 'Depression'],
    languages: ['English'],
    specialties: ['Person-Centered Therapy', 'Motivational Interviewing'],
    availability: 'Tue-Sat, 10am-7pm',
    sessionTypes: ['chat', 'call'],
    bio: 'Specializing in supporting individuals with physical disabilities and navigating life changes.',
    accessibilityOptions: ['Screen Reader Friendly Chat', 'Voice-to-Text Support'],
    costRange: 'medium',
    isSubsidized: false,
    imageUrl: 'https://picsum.photos/seed/marcus/200/200'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    expertise: ['Family Trauma', 'Grief', 'Low Income Support'],
    languages: ['English', 'Spanish'],
    specialties: ['Family Systems', 'Grief Counseling'],
    availability: 'Evenings and Weekends',
    sessionTypes: ['chat', 'call', 'home'],
    bio: 'Dedicated to providing affordable mental health care to underserved communities.',
    accessibilityOptions: ['Bilingual Support', 'Sliding Scale Fees'],
    costRange: 'low',
    isSubsidized: true,
    imageUrl: 'https://picsum.photos/seed/elena/200/200'
  }
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: 'Understanding Trauma',
    category: 'Education',
    content: 'Trauma is a response to a deeply distressing or disturbing event that overwhelms an individual\'s ability to cope...',
    readTime: '5 min'
  },
  {
    id: 'r2',
    title: 'Coping with Depression',
    category: 'Self-Care',
    content: 'Depression can feel like a heavy cloud, but there are small steps you can take every day to find light...',
    readTime: '4 min'
  },
  {
    id: 'r3',
    title: 'Stress Management Basics',
    category: 'Techniques',
    content: 'Learning to manage stress is vital for long-term mental health. Try these grounding exercises...',
    readTime: '3 min'
  }
];

export const WELLNESS_TIPS = [
  "Take a deep breath. You are doing your best, and that is enough.",
  "Remember to hydrate today. Your physical health supports your mental well-being.",
  "It's okay to not be okay. Reach out if you need someone to listen.",
  "Small steps lead to big changes. Celebrate your tiny victories today.",
  "You are worthy of care, compassion, and a peaceful mind."
];
