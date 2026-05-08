import avatarImage from '@/assets/pig.jpg'
import gmailIcon from '@/assets/Gmail.png'
import githubIconWhite from '@/assets/GitHub_Invertocat_White.svg'

export const profile = {
  title: 'starfield',
  subtitle: 'Harry Zhu',
  bios: ['Nobody. Interest in games && systems && soc hardwares.'],
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

export const projects = [
  {
    name: 'Self Intro Web',
    intro: 'As what you see now',
    url: 'https://github.com/StarsHarryZhu/StarsHarryZhu.github.io',
  },
  {
    name: 'VEX Control Libs',
    intro: 'no respotory records yet',
    url: 'https://github.com/StarsHarryZhu',
  },
  {
    name: 'Digit OCR',
    intro: 'A Digit OCR by using MLP model and CNN model(not implemented yet).',
    url: 'https://github.com/StarsHarryZhu/Digit_OCR',
  },
]

export const contacts = [
  {
    type: 'copy',
    name: 'Email',
    icon: gmailIcon,
    copyValue: 'starfield.zhu@gmail.com',
    copySuccessText: 'Email copied successfully.',
  },
  {
    type: 'link',
    name: 'Linkedin',
    icon: 'https://static.licdn.com/aero-v1/sc/h/akt4ae504epesldzj74dzred8',
    url: 'https://www.linkedin.com/in/huanyi-zhu-518703385/',
  },
  {
    type: 'link',
    name: 'Github',
    icon: githubIconWhite,
    url: 'https://github.com/StarsHarryZhu',
  },
]

export const footerItems = [
  'starfield',
  '共和国最锋利的剑',
]

export { avatarImage }
