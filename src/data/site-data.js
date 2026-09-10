import avatarImage from '@/assets/pig.webp'
import avatarImage2x from '@/assets/pig@2x.webp'
import avatarImageFallback from '@/assets/pig-fallback.jpg'
import gmailIcon from '@/assets/Gmail.png'
import githubIconWhite from '@/assets/GitHub_Invertocat_White.svg'
import linkedinIcon from '@/assets/LinkedIn.svg'

/**
 * Profile, contacts and education (bilingual).
 *
 * Prose fields are `{ en, zh }` objects; organization names and handles
 * stay language-neutral. Projects / experience / skills live in their own
 * modules: projects.js, experience.js, skills.js.
 */

export const profile = {
  title: 'Starfield',
  name: 'Harry Zhu',
  subtitle: {
    en: 'Computer Vision · Robotics · Agent Tooling',
    zh: '计算机视觉 · 机器人 · Agent 工具链',
  },
  meta: {
    en: 'CS @ Stony Brook University',
    zh: '计算机科学 @ Stony Brook University',
  },
  bios: [
    {
      en: 'Computer Science student at Stony Brook University, building practical computer-vision and robotics systems.',
      zh: 'Stony Brook University 计算机科学在读，专注可落地的计算机视觉与机器人系统。',
    },
    {
      en: 'Recently deployed a vision-guided robotic-grasping pipeline with YOLO, TensorRT and Intel RealSense.',
      zh: '近期完成视觉引导机器人抓取链路：YOLO 检测、TensorRT 加速与 Intel RealSense 深度感知。',
    },
    {
      en: 'Now building DeepSeek Harness plugins — agent browser automation and a composer stats dock.',
      zh: '目前在开发 DeepSeek Harness 插件：agent 浏览器自动化与输入框统计坞。',
    },
  ],
  focus: [
    { en: 'Computer Vision', zh: '计算机视觉' },
    { en: 'Robotics & Control', zh: '机器人与控制' },
    { en: 'Agent Tooling', zh: 'Agent 工具链' },
  ],
  note: {
    en: 'Currently shipping DeepSeek Harness plugins and vision-guided robotic systems — from YOLO detection to TensorRT-accelerated control loops.',
    zh: '当前在做 DeepSeek Harness 插件与视觉引导机器人系统 —— 从 YOLO 检测到 TensorRT 加速的实时控制回路。',
  },
}

export const contacts = [
  {
    key: 'email',
    type: 'copy',
    name: { en: 'Email', zh: '邮箱' },
    icon: gmailIcon,
    copyValue: 'starfield.zhu@gmail.com',
  },
  {
    key: 'linkedin',
    type: 'link',
    name: { en: 'LinkedIn', zh: 'LinkedIn' },
    icon: linkedinIcon,
    url: 'https://www.linkedin.com/in/huanyi-zhu-518703385/',
  },
  {
    key: 'github',
    type: 'link',
    name: { en: 'GitHub', zh: 'GitHub' },
    icon: githubIconWhite,
    url: 'https://github.com/StarsHarryZhu',
  },
]

export const education = [
  {
    institution: 'Stony Brook University',
    degree: {
      en: 'B.S. in Computer Science · Minor in Mathematics',
      zh: '计算机科学学士 · 数学辅修',
    },
    period: { en: 'Aug 2025 — May 2029', zh: '2025.08 — 2029.05' },
    location: { en: 'Stony Brook, New York', zh: '纽约州石溪' },
  },
]

export const avatarImageSet = {
  webp: avatarImage,
  webp2x: avatarImage2x,
  fallback: avatarImageFallback,
}
