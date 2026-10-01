import type { Experience } from './types.ts'

/** 按时间倒序（最近的在最前） */
export const experiences: Experience[] = [
  {
    company: '上海盛大网络科技有限公司',
    role: '高级后端开发工程师',
    start: '2019.06',
    end: '2026.08',
    companyIntro:
      '盛大网络旗下拥有 AI 智能新闻与洞察产品 NewsBang（Zetik），并自研大模型（Homer、watt-tool 等），是 AI 应用方向的技术驱动型团队。',
    duties: [
      '参与 AI 能力（自研大模型、RAG、Agent）与业务系统的融合落地，负责 AI 应用在用户侧服务的集成、联调与稳定运行。',
      '负责与用户相关的所有后端模块：用户体系、通知推送、邮件、付费订阅、活动等核心业务。',
      '负责搭建和部署运营平台，涵盖内容管理、数据看板、任务调度等功能。',
      '入职初期负责基于 ASP.NET Core + ABP 框架的业务系统（如 Solab.ai 微服务应用），后转入基于 Spring 技术栈的 NewsBang（Zetik）应用后台，横跨两大技术栈。',
      '与约 20 人团队协作（划分为 AI、后端、前端、测试、产品、运营等），推动跨团队需求落地。',
    ],
    metrics: [
      { label: '访客', value: '15 万+' },
      { label: '注册用户', value: '3 万+' },
      { label: '高峰日活', value: '1000+' },
      { label: '单日推送峰值', value: '25 万+' },
      { label: '推送送达率', value: '65%+' },
      { label: '付费订阅转化率', value: '1.5%' },
    ],
    tech: [
      'Spring Boot',
      'Spring Security',
      'Spring Authorization Server',
      'MyBatis-Plus',
      'Redis',
      'RabbitMQ',
      'MySQL',
      'Docker',
      'ASP.NET Core',
      'ABP Framework',
    ],
  },
  {
    company: '上海有求网络科技有限公司',
    role: '全栈开发工程师',
    start: '2013.04',
    end: '2018.11',
    duties: [
      '负责地产项目 ERP 系统的前后端全栈开发。',
      '技术演进：前期 ASP.NET WebForms，后期 Vue + ABP 框架（基于 ASP.NET MVC / ASP.NET Core）。',
      '前期负责具体业务功能的实现；后期负责新项目架构搭建与核心组件开发，如审批流（工作流）引擎等，沉淀可复用的通用技术组件。',
    ],
    tech: ['ASP.NET WebForms', 'ASP.NET MVC', 'ASP.NET Core', 'ABP Framework', 'Vue'],
  },
  {
    company: '上海道齐医药科技有限公司',
    role: '开发工程师',
    start: '2011.05',
    end: '2013.04',
    duties: ['负责地产外包 ERP 项目开发，技术栈为 ASP.NET WebForms。'],
    tech: ['ASP.NET WebForms'],
  },
]
