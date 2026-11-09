/**
 * UI chrome strings (zh/en).
 * Content prose lives in src/data/* with per-field { en, zh } objects —
 * this table is only for interface labels, buttons and status words.
 *
 * 规则：不留未使用的键（改完文案跑一次死键审计）。
 */

export const messages = {
  en: {
    'meta.title': 'starfield — Harry Zhu',

    // Section titles (also the sidebar nav)
    'section.about': 'About',
    'section.experience': 'Experience',
    'section.projects': 'Projects',
    'section.toolkit': 'Toolkit',
    'section.education': 'Education',
    'section.contact': 'Contact',

    // Sidebar
    'profile.status': 'Open to internships',
    'nav.label': 'On this page',
    'nav.skip': 'Skip to content',

    // About
    'about.focus': 'Focus',

    // Projects
    'projects.featured': 'Selected',
    'projects.more': 'More',
    'projects.highlights': 'Highlights',
    'projects.note': 'Note',
    'projects.install': 'Install',
    'projects.links': 'Links',

    // Status
    'status.published': 'Published',
    'status.in-progress': 'In progress',
    'status.paused': 'Paused',
    'status.deprecated': 'Deprecated',

    // Contact
    'contact.title': 'Get in touch',
    'contact.subtitle': 'Open to internships & collaborations',

    // Language toggle
    'lang.label': 'Language',
  },

  zh: {
    'meta.title': 'starfield — Harry Zhu',

    // Section titles (also the sidebar nav)
    'section.about': '关于',
    'section.experience': '经历',
    'section.projects': '项目',
    'section.toolkit': '技能',
    'section.education': '教育',
    'section.contact': '联系',

    // Sidebar
    'profile.status': '开放实习机会',
    'nav.label': '页面导航',
    'nav.skip': '跳到正文',

    // About
    'about.focus': '关注方向',

    // Projects
    'projects.featured': '精选',
    'projects.more': '更多',
    'projects.highlights': '亮点',
    'projects.note': '说明',
    'projects.install': '安装',
    'projects.links': '链接',

    // Status
    'status.published': '已发布',
    'status.in-progress': '进行中',
    'status.paused': '已暂停',
    'status.deprecated': '已弃用',

    // Contact
    'contact.title': '联系我',
    'contact.subtitle': '欢迎实习与合作机会',

    // Language toggle
    'lang.label': '语言',
  },
}
