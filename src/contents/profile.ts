import type { Profile } from './types.ts'

export const profile: Profile = {
  name: '何苗',
  latinName: 'He Miao',
  title: 'AI 应用软件工程师 · 高级后端 / 全栈开发工程师',
  tagline: '16 年软件开发，横跨 Java 与 .NET 两栈，把大模型能力做成能上线的业务。',
  yearsOfExperience: 16,
  startYear: 2011,
  location: '上海',

  highlights: [
    { label: '从业年限', value: '16 年', note: '2011 至今' },
    { label: '累计访客', value: '15 万+', note: 'NewsBang / Zetik' },
    { label: '注册用户', value: '3 万+', note: '高峰期日活 1000+' },
    { label: '峰值日推送', value: '25 万+', note: '送达率 65%+' },
  ],

  summary: [
    '深耕 AI 应用方向，具备从大模型接入到 RAG / Agent 落地的实践能力，有 AI 智能新闻与智能助手类产品的真实 C 端落地经验。',
    '16 年软件开发经验，同时掌握 Java（Spring 全家桶）与 .NET（ASP.NET Core / ABP 框架）两大技术栈，并有在真实项目中横跨两栈的落地经历，能按业务需求灵活选型。',
    '具备前后端全栈开发能力（熟练 Vue 2 / Vue 3 及周边生态），主导过新项目架构搭建与审批流等核心组件开发。',
    '长期负责用户体系、付费订阅、通知推送等核心业务与运营平台建设，具备完整的业务闭环与工程化落地能力。',
    '注重代码质量与工程规范，学习能力强，能在高强度环境下保持稳定产出。',
  ],

  education: {
    school: '上海交通大学',
    schoolUrl: 'https://www.sjtu.edu.cn',
    major: '计算机科学与技术',
    degree: '本科',
    courses: ['数据结构与算法', '操作系统', '计算机网络', '数据库系统', '软件工程', '编译原理'],
  },

  // 隐私：简历中的手机号不进公网站点，只保留邮箱与 GitHub
  contacts: [
    { type: 'email', label: '邮箱', value: 'm@ng-h.com', href: 'mailto:m@ng-h.com' },
    { type: 'github', label: 'GitHub', value: 'github.com/hemiaoio', href: 'https://github.com/hemiaoio' },
  ],
}
