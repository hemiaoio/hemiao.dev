import type { Project } from './types.ts'

export const projects: Project[] = [
  {
    slug: 'ai-fashion-ecommerce',
    name: '某国外客户自营产品电商平台（AI 试穿换脸）',
    period: '2026.07 – 2026.09',
    category: 'AI 应用',
    summary:
      '面向国外客户的自营产品电商平台，提供展品展示、AI 试穿换脸、在线销售等功能；配套管理平台负责网站内容、展品展示、订单管理、试穿任务、预置提示词维护等运营工作，并为全站提供多语言服务。',
    tech: [
      'ASP.NET Core',
      'EF Core',
      'Vue 3',
      'Tailwind CSS',
      'AI 试穿换脸（图像生成 / 提示词工程）',
    ],
    highlights: [
      '基于 ASP.NET Core + EF Core 构建业务 API 与数据访问层，支撑展品、订单、试穿任务等核心模块。',
      '基于 Vue 3 + Tailwind CSS 实现前台展示与在线销售链路，保障多语言场景下的展示效果。',
      '开发管理平台（Vue 3）：覆盖网站内容维护、展品展示配置、订单管理、试穿任务管理、预置提示词维护。',
      '落地 AI 试穿 / 换脸能力：以预置提示词驱动图像生成，打通试穿任务的提交、执行与结果回传链路。',
      '提供全站多语言服务：统一多语言资源维护与语言切换机制，支撑面向海外用户的展示与销售场景。',
    ],
    featured: true,
  },
  {
    slug: 'solab-ai',
    name: 'Solab.ai —— AI 问答应用',
    category: '.NET 微服务',
    summary:
      '面向用户的 AI 问答应用，提供与主流在线网页版一致的对话式 AI 问答能力，支持多模型切换。',
    tech: [
      'ABP Framework',
      'ASP.NET Core',
      'EF Core',
      'Ocelot',
      'Consul',
      'ChatGPT / Gemini / DeepSeek 多模型',
    ],
    highlights: [
      '基于 ABP 框架构建 .NET 微服务应用，使用 EF Core 完成数据访问与持久化。',
      '采用 Ocelot 实现统一 API 网关、Consul 实现服务注册与发现，保障服务可扩展性与高可用。',
      '实现 ChatGPT、Gemini、DeepSeek 等多模型接入与统一调用，支持模型切换与降级。',
      '负责问答核心服务的开发与线上部署，保障服务稳定性与可扩展性。',
    ],
    featured: true,
  },
  {
    slug: 'newsbang-backend',
    name: 'NewsBang（Zetik）应用后台',
    category: 'Spring 后台',
    summary:
      '面向海外市场的 AI 智能新闻与洞察应用，聚合全网资讯，提供深度解读、AI 摘要、AI 播客与智能问答等能力，并结合自研大模型（Homer、watt-tool）实现个性化推荐与洞察。',
    tech: [
      'Spring Boot',
      'Spring Security',
      'Spring Authorization Server',
      'MyBatis-Plus',
      'Redis',
      'RabbitMQ',
      'MySQL',
      'Docker',
    ],
    highlights: [
      '参与 AI 能力（大模型、RAG、Agent）与业务系统的集成落地，推动 AI 摘要、智能问答等能力在用户侧稳定上线。',
      '负责用户体系的设计与开发，基于 Spring Security + Spring Authorization Server 实现认证授权、令牌管理与单点登录。',
      '负责通知推送、邮件、付费订阅、活动等用户相关模块，打通与支付、内容服务的上下游链路。',
      '结合消息队列与缓存实现异步化与削峰填谷，保障用户侧接口在高并发下的稳定性。',
      '覆盖访客 15 万+、注册用户 3 万+；通知推送高峰期日推送 25 万+，送达率 65%+；付费订阅高峰期转化率 1.5%。',
    ],
    featured: true,
  },
  {
    slug: 'newsbang-ops-platform',
    name: 'NewsBang（Zetik）运营平台',
    category: '运营平台',
    summary:
      '面向运营与内容团队的内部管理平台，覆盖内容管理、数据看板、任务调度与业务配置等功能，提升团队运营效率。',
    tech: ['Vue', 'Spring Boot', 'MyBatis-Plus', 'Redis', '定时任务'],
    highlights: [
      '负责运营平台的架构设计与搭建部署，建立内容审核、发布与上下线全流程。',
      '基于 Vue 开发运营后台前端，后端复用应用后台服务，实现内容管理、数据看板与任务调度等能力。',
      '搭建数据看板与报表体系，将关键业务指标（内容量、阅读量、转化率等）可视化，辅助运营决策。',
      '通过后台作业与消息队列实现定时任务与批量处理，降低人工操作成本。',
    ],
    featured: false,
  },
  {
    slug: 'packaging-erp',
    name: '某包装公司进销存系统',
    period: '2019 – 2024',
    category: '企业系统',
    summary:
      '面向某包装公司的进销存管理系统，覆盖供应商、客户、采购、销售、库存、提佣、报表等业务模块，支撑公司进销存业务的全流程管理。',
    tech: ['ASP.NET Core', 'EF Core', 'Vue 2', 'iView 4'],
    highlights: [
      '基于 ASP.NET Core + EF Core 构建后端服务与数据访问层，完成供应商、客户、采购、销售、库存等模块的业务逻辑与接口开发。',
      '基于 Vue 2 + iView 4 开发前端管理界面，覆盖基础资料维护、业务单据录入与查询等场景。',
      '实现提佣相关功能，支撑销售提成的核算与发放。',
      '开发报表模块，输出进销存流水、库存与采购 / 销售统计数据，辅助经营决策。',
    ],
    featured: false,
  },
  {
    slug: 'realestate-erp',
    name: '地产 ERP 系统',
    category: '企业系统',
    summary:
      '面向地产项目的 ERP 系统，覆盖成本、工程、营销、财务等业务模块，支撑地产项目的全流程管理。',
    tech: ['ASP.NET WebForms', 'Vue', 'ABP Framework'],
    highlights: [
      '前期负责具体业务功能的实现，完成各业务模块的开发与交付。',
      '后期主导新项目架构搭建，负责核心组件开发，沉淀通用审批流（工作流）引擎，支撑多个地产项目的流程化审批场景。',
    ],
    featured: false,
  },
]

export const projectSlugs: string[] = projects.map((project) => project.slug)

export const featuredProjects: Project[] = projects.filter((project) => project.featured)

export const projectCategories: string[] = [...new Set(projects.map((project) => project.category))]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
