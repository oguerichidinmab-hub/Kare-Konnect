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
  },
  {
    id: '4',
    name: 'Dr. Chinedu Okoro',
    expertise: ['PTSD', 'Family Therapy', 'Community Resilience'],
    languages: ['English', 'Igbo'],
    specialties: ['CBT', 'Family Systems'],
    availability: 'Mon-Thu, 10am-4pm',
    sessionTypes: ['chat', 'call', 'home'],
    bio: 'Focused on community-based healing and navigating transgenerational trauma in the Nigerian context.',
    accessibilityOptions: ['Igbo Language Support', 'Mobile Clinic Visits'],
    costRange: 'low',
    isSubsidized: true,
    imageUrl: 'https://picsum.photos/seed/chinedu/200/200'
  },
  {
    id: '5',
    name: 'Amina Yusuf',
    expertise: ['Youth Counseling', 'Anxiety', 'Educational Support'],
    languages: ['English', 'Hausa'],
    specialties: ['Motivational Interviewing', 'Mindfulness'],
    availability: 'Sat-Sun, 9am-2pm',
    sessionTypes: ['chat', 'call'],
    bio: 'Dedicated to supporting young adults in Northern Nigeria with academic and emotional challenges.',
    accessibilityOptions: ['Hausa Language Support', 'Low-Data Video Option'],
    costRange: 'medium',
    isSubsidized: false,
    imageUrl: 'https://picsum.photos/seed/amina/200/200'
  },
  {
    id: '6',
    name: 'Olumide Adebayo',
    expertise: ['Depression', 'Grief', 'Workplace Wellness'],
    languages: ['English', 'Yoruba'],
    specialties: ['CBT', 'Grief Counseling'],
    availability: 'Mon-Fri, 4pm-8pm',
    sessionTypes: ['chat', 'call', 'home'],
    bio: 'Helping individuals manage stress and depression within high-pressure urban environments like Lagos and Ibadan.',
    accessibilityOptions: ['Yoruba Language Support', 'Home Visits in Lagos/Ibadan'],
    costRange: 'medium',
    isSubsidized: true,
    imageUrl: 'https://picsum.photos/seed/olumide/200/200'
  },
  {
    id: '7',
    name: 'Zainab Bello',
    expertise: ['Trauma', 'Victim Support', 'Crisis Intervention'],
    languages: ['English', 'Hausa', 'Fulfulde'],
    specialties: ['CBT', 'Trauma-Informed Care'],
    availability: 'On-call for emergencies',
    sessionTypes: ['chat', 'call'],
    bio: 'Specializing in trauma-informed care for survivors of conflict and displacement in North-Eastern Nigeria.',
    accessibilityOptions: ['Multi-lingual Support', 'Offline Session Recording'],
    costRange: 'low',
    isSubsidized: true,
    imageUrl: 'https://picsum.photos/seed/zainab/200/200'
  },
  {
    id: '8',
    name: 'Babatunde Lawal',
    expertise: ['Addiction', 'Community Outreach', 'Rehabilitation'],
    languages: ['English', 'Yoruba', 'Pidgin'],
    specialties: ['Motivational Interviewing', 'Person-Centered Therapy'],
    availability: 'Tue-Fri, 8am-6pm',
    sessionTypes: ['chat', 'call', 'home'],
    bio: 'Empowering individuals to overcome substance abuse through culturally grounded rehabilitation strategies.',
    accessibilityOptions: ['Pidgin Language Support', 'Accessible Community Center Visits'],
    costRange: 'low',
    isSubsidized: true,
    imageUrl: 'https://picsum.photos/seed/tunde/200/200'
  },
  {
    id: '9',
    name: 'Dr. Ifeoma Nwachukwu',
    expertise: ['Maternal Mental Health', 'Anxiety', 'Depression'],
    languages: ['English', 'Igbo'],
    specialties: ['CBT', 'Mindfulness', 'Person-Centered Therapy'],
    availability: 'Mon-Wed, 9am-3pm',
    sessionTypes: ['chat', 'call', 'home'],
    bio: 'Specialist in maternal well-being, helping mothers navigate postpartum depression and the anxieties of parenthood.',
    accessibilityOptions: ['Braille Support (Printed)', 'Home Visits for Late-Term Mothers'],
    costRange: 'medium',
    isSubsidized: true,
    imageUrl: 'https://picsum.photos/seed/ifeoma/200/200'
  },
  {
    id: '10',
    name: 'Tariye Pere-Owei',
    expertise: ['Environmental Stress', 'Trauma', 'Livelihood Loss'],
    languages: ['English', 'Ijaw', 'Pidgin'],
    specialties: ['CBT', 'Family Systems'],
    availability: 'Tue-Fri, 10am-5pm',
    sessionTypes: ['chat', 'call', 'home'],
    bio: 'Supporting communities in the Niger Delta dealing with the psychological impact of environmental changes and displacement.',
    accessibilityOptions: ['Remote Area Connectivity Support', 'Mobile Clinic Access'],
    costRange: 'low',
    isSubsidized: true,
    imageUrl: 'https://picsum.photos/seed/tariye/200/200'
  },
  {
    id: '11',
    name: 'Yakubu Danjuma',
    expertise: ['Post-Conflict Trauma', 'Grief', 'Community Resilience'],
    languages: ['English', 'Tiv', 'Hausa'],
    specialties: ['Trauma-Informed Care', 'Motivational Interviewing'],
    availability: 'Mon-Fri, 9am-4pm',
    sessionTypes: ['chat', 'call'],
    bio: 'Dedicated to peace-building psychology and supporting survivors of communal conflict in the Middle Belt.',
    accessibilityOptions: ['Multi-lingual Support', 'Crisis Hotline Access'],
    costRange: 'low',
    isSubsidized: true,
    imageUrl: 'https://picsum.photos/seed/yakubu/200/200'
  },
  {
    id: '12',
    name: 'Funke Williams',
    expertise: ['Neurodiversity', 'Adult ADHD', 'Autism Support'],
    languages: ['English', 'Yoruba'],
    specialties: ['CBT', 'Mindfulness', 'Social Skills Coaching'],
    availability: 'Evenings, 6pm-9pm',
    sessionTypes: ['chat', 'call'],
    bio: 'A specialist in neurodiversity, helping adults navigate a world not built for their minds, focusing on ADHD and Autism.',
    accessibilityOptions: ['Sensory-Friendly Communication', 'Visual Calendars & Aids'],
    costRange: 'medium',
    isSubsidized: false,
    imageUrl: 'https://picsum.photos/seed/funke/200/200'
  },
  {
    id: '13',
    name: 'Emeka Okafor',
    expertise: ["Men's Mental Health", 'Addiction', 'Life Coaching'],
    languages: ['English', 'Igbo', 'Pidgin'],
    specialties: ['Motivational Interviewing', 'CBT'],
    availability: 'Weekends, 10am-6pm',
    sessionTypes: ['chat', 'call', 'home'],
    bio: 'Creating safe spaces for men to discuss vulnerability, mental health, and the challenges of traditional masculinity.',
    accessibilityOptions: ['Confidentiality Focused', 'Home Visits in South-East'],
    costRange: 'medium',
    isSubsidized: true,
    imageUrl: 'https://picsum.photos/seed/emeka/200/200'
  }
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: 'Understanding Trauma',
    category: 'Education',
    content: `Trauma is a response to a deeply distressing or disturbing event that overwhelms an individual's ability to cope, causes feelings of helplessness, diminishes their sense of self and their ability to feel the full range of emotions and experiences. 

While many people experience trauma, its effects can vary significantly depending on the individual, the nature of the event, and the support systems available. Common symptoms include intrusive memories or flashbacks, avoidance behaviors, negative shifts in thinking and mood, and heightened arousal or reactivity (hypervigilance).

It's important to understand that recovery from trauma is a process, not an event. It often involves creating a sense of safety, developing coping strategies for managing symptoms, and eventually processing the traumatic experience in a supportive environment. Techniques like Cognitive Behavioral Therapy (CBT), Eye Movement Desensitization and Reprocessing (EMDR), and mindfulness-based practices have shown great efficacy in helping individuals regain control over their lives and build resilience.`,
    readTime: '5 min'
  },
  {
    id: 'r2',
    title: 'Coping with Depression',
    category: 'Self-Care',
    content: `Depression can feel like a heavy cloud that persists for weeks or months, affecting your thoughts, feelings, and daily activities. It is more than just feeling "blue" or having a bad day; it is a clinical condition that requires understanding and, often, professional support.

Living with depression often involves dealing with persistent sadness, a lack of interest in previously enjoyed activities, changes in appetite or sleep patterns, and feelings of worthlessness. However, depression is also highly treatable. 

Self-care strategies play a crucial role in management. This includes establishing a consistent daily routine, engaging in light physical activity, maintaining social connections (even when it feels difficult), and practicing self-compassion. Breaking large tasks into smaller, manageable steps can help reduce feelings of being overwhelmed. Remember, you don't have to carry this burden alone. Small, consistent actions can lead to significant improvements over time, and reaching out for help is a sign of strength and self-awareness.`,
    readTime: '4 min'
  },
  {
    id: 'r3',
    title: 'Stress Management Basics',
    category: 'Techniques',
    content: `In today's fast-paced world, learning to manage stress is vital for long-term mental and physical health. Stress is the body's natural response to perceived threats, but chronic stress can lead to burnout, anxiety, and various health issues.

Effective stress management involves both immediate grounding techniques and long-term lifestyle changes. Immediate techniques include deep breathing exercises (such as box breathing or the 4-7-8 technique), progressive muscle relaxation, and sensory grounding (focusing on what you can see, hear, and feel in the present moment).

Long-term management focuses on identifying and mitigating stressors where possible, setting healthy boundaries, and prioritizing restorative activities like adequate sleep and hobbies. Mindfulness and meditation are powerful tools for training the brain to respond to stress more calmly. By developing a "stress toolkit," you can learn to navigate life's challenges with greater ease and maintain your emotional balance even during difficult times.`,
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
