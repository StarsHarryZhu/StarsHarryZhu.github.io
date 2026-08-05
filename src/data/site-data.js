import avatarImage from '@/assets/pig.webp'
import avatarImage2x from '@/assets/pig@2x.webp'
import avatarImageFallback from '@/assets/pig-fallback.jpg'
import gmailIcon from '@/assets/Gmail.png'
import githubIconWhite from '@/assets/GitHub_Invertocat_White.svg'
import linkedinIcon from '@/assets/LinkedIn.svg'

export const profile = {
  title: 'Starfield',
  subtitle: 'Computer Vision · Robotics · Systems',
  bios: [
    'Computer Science student at Stony Brook University, building practical computer-vision and robotics systems.',
    'Recently deployed a vision-guided robotic-grasping pipeline with YOLO, TensorRT, and Intel RealSense.',
  ],
}

export const skillCategories = [
  {
    name: 'Core Languages',
    skills: [
      { name: 'C/C++' },
      { name: 'Python' },
      { name: 'Java' },
      { name: 'Swift/SwiftUI' },
    ],
  },
  {
    name: 'Computer Vision & Robotics',
    skills: [
      { name: 'YOLO' },
      { name: 'TensorRT' },
      { name: 'Intel RealSense' },
      { name: 'Kalman Filtering' },
    ],
  },
  {
    name: 'Web & Tooling',
    skills: [
      { name: 'HTML/CSS/JS' },
      { name: 'Vue 3' },
      { name: 'Git' },
      { name: 'CMake' },
    ],
  },
]

export const projects = [
  {
    name: 'Echoes',
    intro: 'An iOS emotion-journaling app that captures front-camera photos and records inferred emotions with a fine-tuned MobileNetV2 model.',
    tags: ['Swift', 'SwiftUI', 'MobileNetV2'],
  },
  {
    name: 'Personal Website',
    intro: 'This personal portfolio, built with Vue 3, Vite, and a CSS-only starfield interface.',
    url: 'https://github.com/StarsHarryZhu/StarsHarryZhu.github.io',
    tags: ['Vue 3', 'Vite', 'CSS'],
  },
  {
    name: 'VEX Control Libs',
    intro: 'Reusable C++11 control libraries for VEX robots, including PID control, button debouncing, and distance calculation.',
    tags: ['C++11', 'STL', 'Robotics'],
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
    icon: linkedinIcon,
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
    period: 'May 2026 — Jul 2026',
    title: 'Computer Vision Intern',
    subtitle: 'Ningbo University · Computer Vision Team',
    location: 'Ningbo, Zhejiang',
    highlights: [
      'Trained YOLO26l and YOLOv8n object-detection models for bird nests, bird-repellent devices, and beakers.',
      'Optimized inference on an NVIDIA RTX 2080 Ti through a .pt → .onnx → TensorRT deployment pipeline.',
      'Integrated an Intel RealSense D435i, Kalman-filtered target tracking, a Reaman robotic arm, and custom control algorithms to demonstrate vision-guided grasping.',
    ],
    tags: ['YOLO26l', 'YOLOv8n', 'TensorRT', 'RealSense D435i', 'Kalman Filter', 'Robotics'],
  },
  {
    period: 'Dec 2025 — Jan 2026',
    title: 'C++ Instructor & VEX IQ Coach',
    subtitle: 'Ningbo HZ Club',
    location: 'Ningbo, Zhejiang',
    highlights: [
      'Taught C++ fundamentals and introductory programming concepts.',
      'Coached students on VEX IQ robot operation and competition preparation.',
    ],
    tags: ['C++', 'VEX IQ', 'Teaching'],
  },
  {
    period: 'Jun 2023 — Apr 2025',
    title: 'Founder & Leader, School Robotics Team',
    subtitle: 'Ningbo Xiaoshi High School',
    location: 'Ningbo, Zhejiang',
    highlights: [
      'Founded a school VEX robotics competition team and led its members to a first-place national ranking in China.',
      'Developed reusable C++ chassis-control code supporting multiple robot configurations.',
    ],
    tags: ['C++', 'VEX Robotics', 'Leadership'],
  },
]

export const education = [
  {
    institution: 'Stony Brook University',
    degree: 'B.S. in Computer Science · Minor in Mathematics',
    period: 'Aug 2025 — May 2029',
    location: 'Stony Brook, New York',
  },
]

export const footerItems = [
  'starfield',
]

export const avatarImageSet = {
  webp: avatarImage,
  webp2x: avatarImage2x,
  fallback: avatarImageFallback,
}
