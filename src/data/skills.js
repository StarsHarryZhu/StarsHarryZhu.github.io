/**
 * Capability groups (bilingual group names; skill names stay neutral).
 * Grouping reflects the three strands of work on the site:
 * vision/robotics, systems & harness tooling, and web/mobile.
 */

export const skillGroups = [
  {
    id: 'languages',
    name: { en: 'Languages', zh: '编程语言' },
    skills: ['C/C++', 'Python', 'Java', 'Swift'],
  },
  {
    id: 'vision-robotics',
    name: { en: 'Computer Vision & Robotics', zh: '计算机视觉与机器人' },
    skills: ['YOLO', 'ONNX', 'TensorRT', 'Intel RealSense', 'Kalman Filtering'],
  },
  {
    id: 'systems-tooling',
    name: { en: 'Systems & Tooling', zh: '系统与工具链' },
    skills: ['Git', 'CMake', 'Node.js / ESM', 'WebSocket', 'Chrome DevTools Protocol'],
  },
  {
    id: 'web-mobile',
    name: { en: 'Web & Mobile', zh: 'Web 与移动端' },
    skills: ['Vue 3', 'Vite', 'HTML/CSS/JS', 'React', 'SwiftUI'],
  },
]
