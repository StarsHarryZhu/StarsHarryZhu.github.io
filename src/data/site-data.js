import avatarImage from '@/assets/pig.webp'
import avatarImage2x from '@/assets/pig@2x.webp'
import avatarImageFallback from '@/assets/pig-fallback.jpg'

/**
 * Profile, contacts and education (bilingual).
 *
 * Prose fields are `{ en, zh }` objects; organization names and handles
 * stay language-neutral. A contact's `key` picks its icon in
 * components/ui/ContactIcon.vue; `handle` is the visible address.
 * Projects / experience / skills live in their own modules: projects.js,
 * experience.js, skills.js.
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
      en: 'An interesting person',
      zh: '一个有趣的人',
    },
  ],
  focus: [
    { en: 'Computer Vision', zh: '计算机视觉' },
    { en: 'Robotics & Control', zh: '机器人与控制' },
    { en: 'Agent Tooling', zh: 'Agent 工具链' },
  ],
}

export const contacts = [
  {
    key: 'email',
    external: false,
    name: { en: 'Email', zh: '邮箱' },
    handle: 'starfield.zhu@gmail.com',
    url: 'mailto:starfield.zhu@gmail.com',
  },
  {
    key: 'linkedin',
    external: true,
    name: { en: 'LinkedIn', zh: 'LinkedIn' },
    handle: 'in/huanyi-zhu-518703385',
    url: 'https://www.linkedin.com/in/huanyi-zhu-518703385/',
  },
  {
    key: 'github',
    external: true,
    name: { en: 'GitHub', zh: 'GitHub' },
    handle: 'github.com/StarsHarryZhu',
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
