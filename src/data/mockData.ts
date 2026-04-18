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
    imageUrl: 'https://picsum.photos/seed/sarah/200/200',
    phoneNumber: '+2348000000001'
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
    imageUrl: 'https://picsum.photos/seed/marcus/200/200',
    phoneNumber: '+2348000000002'
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
    imageUrl: 'https://picsum.photos/seed/elena/200/200',
    phoneNumber: '+2348000000003'
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
    imageUrl: 'https://picsum.photos/seed/chinedu/200/200',
    phoneNumber: '+2348000000004'
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
    imageUrl: 'https://picsum.photos/seed/amina/200/200',
    phoneNumber: '+2348000000005'
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
    imageUrl: 'https://picsum.photos/seed/olumide/200/200',
    phoneNumber: '+2348000000006'
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
    imageUrl: 'https://picsum.photos/seed/zainab/200/200',
    phoneNumber: '+2348000000007'
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
    imageUrl: 'https://picsum.photos/seed/tunde/200/200',
    phoneNumber: '+2348000000008'
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
    imageUrl: 'https://picsum.photos/seed/ifeoma/200/200',
    phoneNumber: '+2348000000009'
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
    imageUrl: 'https://picsum.photos/seed/tariye/200/200',
    phoneNumber: '+2348000000010'
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
    imageUrl: 'https://picsum.photos/seed/yakubu/200/200',
    phoneNumber: '+2348000000011'
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
    imageUrl: 'https://picsum.photos/seed/funke/200/200',
    phoneNumber: '+2348000000012'
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
    imageUrl: 'https://picsum.photos/seed/emeka/200/200',
    phoneNumber: '+2348000000013'
  },
  {
    id: '14',
    name: 'Dr. Temitope Balogun',
    expertise: ['Digital Wellness', 'Burnout', 'Work-Life Harmony'],
    languages: ['English', 'Yoruba'],
    specialties: ['CBT', 'Mindfulness', 'Career Coaching'],
    availability: 'Mon-Fri, 5pm-10pm',
    sessionTypes: ['chat', 'call'],
    bio: 'Helping tech professionals in Nigeria manage the unique pressures of the digital economy and remote work burnout.',
    accessibilityOptions: ['Low-Data Chat Interface', 'Late Night Sessions'],
    costRange: 'high',
    isSubsidized: false,
    imageUrl: 'https://picsum.photos/seed/temi/200/200',
    phoneNumber: '+2348000000014'
  },
  {
    id: '15',
    name: 'Sade Adesanya',
    expertise: ['Elderly Care', 'Caregiver Support', 'Grief'],
    languages: ['English', 'Yoruba', 'Pidgin'],
    specialties: ['Grief Counseling', 'Person-Centered Therapy'],
    availability: 'Tue-Sat, 9am-4pm',
    sessionTypes: ['chat', 'call', 'home'],
    bio: 'Specializing in support for the elderly and their caregivers, focusing on aging with dignity and managing caregiver fatigue.',
    accessibilityOptions: ['Large Text Home Materials', 'Home Visits for Senior Citizens'],
    costRange: 'low',
    isSubsidized: true,
    imageUrl: 'https://picsum.photos/seed/sade/200/200',
    phoneNumber: '+2348000000015'
  },
  {
    id: '16',
    name: 'Ibrahim Musa',
    expertise: ['Religious Trauma', 'Identity', 'Family Conflict'],
    languages: ['English', 'Hausa', 'Arabic'],
    specialties: ['Family Systems', 'Spiritual Care (Secular)'],
    availability: 'Sat-Sun, 2pm-8pm',
    sessionTypes: ['chat', 'call'],
    bio: 'Navigating the intersection of faith, tradition, and mental health in Northern Nigeria with sensitivity and empathy.',
    accessibilityOptions: ['Hausa/Arabic Support', 'Safe Space for Identity Exploration'],
    costRange: 'medium',
    isSubsidized: true,
    imageUrl: 'https://picsum.photos/seed/ibrahim/200/200',
    phoneNumber: '+2348000000016'
  },
  {
    id: '17',
    name: 'Nneka Eze',
    expertise: ['Disability Advocacy', 'Self-Esteem', 'Chronic Pain'],
    languages: ['English', 'Igbo', 'Pidgin'],
    specialties: ['Motivational Interviewing', 'CBT'],
    availability: 'Mon-Thu, 8am-2pm',
    sessionTypes: ['chat', 'call', 'home'],
    bio: 'A passionate advocate for individuals living with disabilities, focusing on self-worth and navigating societal barriers.',
    accessibilityOptions: ['ASL (Basic)', 'Accessible Transport Coordination for Visits'],
    costRange: 'low',
    isSubsidized: true,
    imageUrl: 'https://picsum.photos/seed/nneka/200/200',
    phoneNumber: '+2348000000017'
  },
  {
    id: '18',
    name: 'Tunde Bakare',
    expertise: ['Entrepreneurial Stress', 'Financial Anxiety', 'Peak Performance'],
    languages: ['English', 'Yoruba'],
    specialties: ['CBT', 'Executive Coaching'],
    availability: 'Mon-Fri, 7am-9am',
    sessionTypes: ['chat', 'call'],
    bio: 'Helping the next generation of Nigerian entrepreneurs manage the psychological toll of high-stakes business environments.',
    accessibilityOptions: ['Strict Privacy Protocols', 'Concise Result-Oriented Sessions'],
    costRange: 'high',
    isSubsidized: false,
    imageUrl: 'https://picsum.photos/seed/bakare/200/200',
    phoneNumber: '+2348000000018'
  }
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: 'Understanding Trauma: The Path to Recovery',
    category: 'Education',
    content: `Trauma is far more than a simple memory of a bad event; it is a profound physiological and psychological response to experiences that overwhelm our capacity to cope. It can stem from single incidents like accidents or violence, or from prolonged exposure to stressful environments, conflict, or systemic oppression. When trauma occurs, the brain's "alarm system"—the amygdala—becomes hyper-reactive, while the parts responsible for logic and calm—the prefrontal cortex—struggle to take back control.

The impact of trauma can manifest in numerous ways:
1. **Hyperarousal:** Feeling constantly "on edge," easily startled, or having difficulty sleeping. This is your body staying in a permanent state of "fight or flight."
2. **Intrusive Memories:** Flashbacks or nightmares that make you feel like you are re-living the trauma.
3. **Avoidance:** Steering clear of people, places, or thoughts that remind you of the event, which can lead to social isolation.
4. **Dissociation:** Feeling "numb" or disconnected from your body and your surroundings.

Healing from trauma is not about "getting over it" but about integration. This involves:
- **Establishing Safety:** Creating a predictable, secure environment is the first and most crucial step.
- **Grounding Techniques:** Learning to stay in the present moment through breathing and sensory exercises.
- **Professional Support:** Therapies like CBT (Cognitive Behavioral Therapy) help reframe traumatic thoughts, while EMDR (Eye Movement Desensitization and Reprocessing) can help the recursive loop of traumatic memories find a place of peace.
- **Community Connection:** Sharing experiences in safe spaces can reduce the shame and isolation so often associated with traumatic events. 

Remember, your trauma does not define your future. With patience, self-compassion, and the right support, the brain and body can unlearn the survival responses that are no longer serving you.`,
    readTime: '8 min'
  },
  {
    id: 'r2',
    title: 'Navigating Depression: From Darkness to Light',
    category: 'Self-Care',
    content: `Depression is often described as a dark cloud, but for many, it feels more like a heavy, invisible weight that makes even the simplest tasks—like getting out of bed or answering a text—feel monumental. It is a clinical condition that affects approximately 5% of adults globally, yet it is still deeply misunderstood.

The symptoms of depression go beyond persistent sadness and can include:
- **Anhedonia:** The loss of interest or pleasure in activities you once loved.
- **Physical Fatigue:** A constant sense of exhaustion that sleep doesn't seem to fix.
- **Cognitive Fog:** Difficulty concentrating, making decisions, or remembering details.
- **Changes in Appetite:** Either overeating or a significant loss of appetite.
- **Feelings of Worthlessness:** A loud "inner critic" that focuses on perceived failures or hopelessness.

Overcoming depression is a journey of small, consistent steps. Here are some evidence-based strategies:
- **Behavioral Activation:** This involves doing things even when you don't feel like it. Start tiny—maybe just standing outside for five minutes.
- **Routine Building:** Depression thrives on chaos and isolation. A stable routine provides a "scaffold" for your day.
- **Physical Activity:** Exercise releases endorphins and can be as effective as some medications for mild to moderate depression.
- **Mindfulness and Compassion:** Learning to observe your thoughts without believing every "dark" thing your mind says.
- **Medication and Therapy:** For many, a combination of psychotherapy and medication provides the necessary chemical and emotional balance to start moving forward again.

If you are currently in the midst of a depressive episode, know this: your brain is currently telling you that things will never get better. That is a symptom of the condition, not a fact of your life. Reach out—even if it's just to say "I'm struggling." You don't have to carry the weight alone.`,
    readTime: '7 min'
  },
  {
    id: 'r3',
    title: 'Advanced Stress Management for Modern Life',
    category: 'Techniques',
    content: `Stress is a natural biological response designed to keep us alive. In the face of danger, our bodies flood with cortisol and adrenaline, preparing us to fight or run. However, in our modern world, we are rarely running from predators; instead, we are "running" from overflowing inboxes, financial pressures, and social expectations. This "chronic stress" can eventually lead to burnout, cardiovascular issues, and weakened immune systems.

Managing stress effectively requires a two-pronged approach: immediate physiological intervention and long-term lifestyle adjustment.

**Immediate Physiological "Rewiring":**
1. **The 4-7-8 Breathing Technique:** Inhale for 4 seconds, hold for 7, and exhale slowly for 8. This directly stimulates the vagus nerve and triggers the parasympathetic nervous system (the "rest and digest" mode).
2. **Progressive Muscle Relaxation:** Tense and then release each muscle group in your body, from your toes to your face. This helps the brain recognize and release physical tension.
3. **The 5-4-3-2-1 Grounding Method:** Identify 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. This pulls you out of a stressful "thought loop" and back into reality.

**Long-Term Lifestyle Integration:**
- **Boundary Setting:** Learning to say "no" is one of the most powerful stress management tools. Protect your time and energy as if they were your most valuable currency.
- **Digital Detox:** Constant notifications keep us in a state of hyper-vigilance. Set specific times to be "offline."
- **Restorative Sleep:** Sleep is when our brains process the emotional load of the day. Prioritizing 7-9 hours of sleep is non-negotiable for stress resilience.
- **Nutrition and Hydration:** What we eat directly impacts our hormone levels and our ability to handle pressure.

By developing a personalized "stress toolkit," you can move from reactive survival to proactive resilience. Stress is an inevitable part of life, but it doesn't have to be the defining force in yours.`,
    readTime: '6 min'
  }
];

export const WELLNESS_TIPS = [
  "Take a deep breath. You are doing your best, and that is enough.",
  "Remember to hydrate today. Your physical health supports your mental well-being.",
  "It's okay to not be okay. Reach out if you need someone to listen.",
  "Small steps lead to big changes. Celebrate your tiny victories today.",
  "You are worthy of care, compassion, and a peaceful mind."
];
