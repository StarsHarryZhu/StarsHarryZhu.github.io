/**
 * Experience timeline (bilingual).
 * Organization names stay in their original form; role, location and
 * highlights are translated.
 */

export const timeline = [
  {
    id: 'cv-intern',
    period: { en: 'May 2026 — Jul 2026', zh: '2026.05 — 2026.07' },
    title: { en: 'Computer Vision Intern', zh: '计算机视觉实习生' },
    subtitle: { en: 'Ningbo University · Computer Vision Team', zh: '宁波大学 · 计算机视觉团队' },
    location: { en: 'Ningbo, Zhejiang', zh: '浙江宁波' },
    highlights: [
      {
        en: 'Trained YOLO26l and YOLOv8n object-detection models for bird nests, bird-repellent devices and beakers.',
        zh: '训练 YOLO26l 与 YOLOv8n 目标检测模型，覆盖鸟巢、驱鸟装置与烧杯。',
      },
      {
        en: 'Optimized inference on an NVIDIA RTX 2080 Ti through a .pt → .onnx → TensorRT deployment pipeline.',
        zh: '在 NVIDIA RTX 2080 Ti 上通过 .pt → .onnx → TensorRT 部署链路优化推理。',
      },
      {
        en: 'Integrated an Intel RealSense D435i, Kalman-filtered target tracking, a Reaman robotic arm and custom control algorithms to demonstrate vision-guided grasping.',
        zh: '集成 Intel RealSense D435i、卡尔曼滤波目标跟踪、Reaman 机械臂与自研控制算法，完成视觉引导抓取演示。',
      },
    ],
    tags: ['YOLO26l', 'YOLOv8n', 'TensorRT', 'RealSense D435i', 'Kalman Filter', 'Robotics'],
  },

  {
    id: 'cpp-instructor',
    period: { en: 'Dec 2025 — Jan 2026', zh: '2025.12 — 2026.01' },
    title: { en: 'C++ Instructor & VEX IQ Coach', zh: 'C++ 讲师 & VEX IQ 教练' },
    subtitle: { en: 'Ningbo HZ Club', zh: '宁波 HZ 俱乐部' },
    location: { en: 'Ningbo, Zhejiang', zh: '浙江宁波' },
    highlights: [
      {
        en: 'Taught C++ fundamentals and introductory programming through hands-on lessons.',
        zh: '通过动手课程教授 C++ 基础与编程入门。',
      },
      {
        en: 'Coached students on VEX IQ robot operation and competition preparation.',
        zh: '指导学生操作 VEX IQ 机器人并备战竞赛。',
      },
    ],
    tags: ['C++', 'VEX IQ', 'Teaching'],
  },

  {
    id: 'robotics-founder',
    period: { en: 'Jun 2023 — Apr 2025', zh: '2023.06 — 2025.04' },
    title: { en: 'Founder & Leader, School Robotics Team', zh: '校机器人队创始人 & 队长' },
    subtitle: { en: 'Ningbo Xiaoshi High School', zh: 'Ningbo Xiaoshi High School' },
    location: { en: 'Ningbo, Zhejiang', zh: '浙江宁波' },
    highlights: [
      {
        en: 'Founded and led a VEX robotics competition team that placed first nationally in China.',
        zh: '创立并带领 VEX 机器人竞赛队，取得全国第一。',
      },
      {
        en: 'Developed reusable C++ chassis-control code supporting multiple robot configurations.',
        zh: '开发可复用的 C++ 底盘控制代码，支持多种机器人配置。',
      },
    ],
    tags: ['C++', 'VEX Robotics', 'Leadership'],
  },
]
