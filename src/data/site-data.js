import avatarImage from '@/assets/pig.jpg'
import gmailIcon from '@/assets/Gmail.png'
import githubIconWhite from '@/assets/GitHub_Invertocat_White.svg'

export const profile = {
  title: 'starfield',
  subtitle: 'Harry Zhu',
  bios: [
    'Nobody. Interest in games && systems && soc hardwares.',
  ],
}

export const skills = [
  { name: 'C/C++' },
  { name: 'Python' },
  { name: 'Java' },
  { name: 'Swift/SwiftUI' },
  { name: 'HTML/CSS/JS' },
  { name: 'Vue3' },
  { name: 'STM HAL lib' },
]

export const skillCategories = [
  {
    name: 'Languages',
    skills: [
      { name: 'C/C++', icon: '⚙' },
      { name: 'Python', icon: '🐍' },
      { name: 'Java', icon: '☕' },
      { name: 'Swift/SwiftUI', icon: '🦅' },
    ],
  },
  {
    name: 'Web & Frameworks',
    skills: [
      { name: 'HTML/CSS/JS', icon: '🌐' },
      { name: 'Vue 3', icon: '💚' },
    ],
  },
  {
    name: 'Hardware & Systems',
    skills: [
      { name: 'STM32 HAL', icon: '🔧' },
    ],
  },
]

export const projects = [
  {
    name: 'Self Intro Web',
    intro: 'As what you see now — built with Vue 3, Vite, and CSS-only starfield.',
    url: 'https://github.com/StarsHarryZhu/StarsHarryZhu.github.io',
    tags: ['Vue 3', 'Vite', 'CSS'],
  },
  {
    name: 'VEX Control Libs',
    intro: 'VEX robotics control libraries. No repository records yet.',
    url: 'https://github.com/StarsHarryZhu',
    tags: ['C++', 'Robotics'],
  },
  {
    name: 'Digit OCR',
    intro: 'Handwritten digit recognition using MLP and CNN models.',
    url: 'https://github.com/StarsHarryZhu/Digit_OCR',
    tags: ['C++', 'CMake', 'CNN', 'MLP'],
  },
]

export const contacts = [
  {
    type: 'copy',
    name: 'Email',
    icon: gmailIcon,
    copyValue: 'starfield.zhu@gmail.com',
    copySuccessText: 'Email address copied.',
  },
  {
    type: 'link',
    name: 'LinkedIn',
    icon: 'https://static.licdn.com/aero-v1/sc/h/akt4ae504epesldzj74dzred8',
    url: 'https://www.linkedin.com/in/huanyi-zhu-518703385/',
  },
  {
    type: 'link',
    name: 'GitHub',
    icon: githubIconWhite,
    url: 'https://github.com/StarsHarryZhu',
  },
]

export const timeline = [
  {
    year: 'Present',
    title: 'University Student',
    subtitle: 'Computer Science & Electronic Engineering',
    description: 'Focusing on software and game design, also learning some Ml, hardware and systems knowledge.',
    tags: ['C', 'Python', 'STM32'],
  },
]

export const blogPosts = [
  {
    title: 'Building a Portfolio with Vue 3 & Vite',
    date: '2026',
    excerpt: 'How this site was built — from CSS starfield generation to glassmorphism card design and Vue Router integration.',
    url: '#',
    tags: ['Vue', 'CSS', 'Design'],
  },
  {
    title: 'Digit OCR with C++ & CMake',
    date: '2026',
    excerpt: 'Handwritten digit recognition implemented in C++ with CMake build system, using MLP and CNN models.',
    url: 'https://github.com/StarsHarryZhu/Digit_OCR',
    tags: ['C++', 'CMake', 'CNN', 'MLP'],
  },
]

export const footerItems = [
  'starfield',
  '共和国最锋利的剑',
]

export { avatarImage }
