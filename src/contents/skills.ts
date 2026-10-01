import type { SkillDomain } from './types.ts'

export const skillDomains: SkillDomain[] = [
  {
    key: 'ai',
    name: 'AI 应用开发',
    summary: '从大模型接入到 RAG / Prompt / Agent，再到业务融合与工程化上线，有完整实践闭环。',
    items: [
      {
        name: '大模型（LLM）应用开发',
        proficiency: 'proficient',
        highlight: true,
        note: 'OpenAI / DeepSeek / 通义千问等主流 API 接入',
      },
      { name: 'RAG（检索增强生成）', proficiency: 'proficient', highlight: true },
      { name: 'Prompt 工程', proficiency: 'proficient' },
      { name: 'Agent / 工具调用（Function Calling）', proficiency: 'proficient' },
      { name: '向量数据库检索', proficiency: 'proficient' },
      { name: 'AI 与业务系统融合', proficiency: 'proficient', note: '用户、推送、订阅等模块集成' },
      { name: '模型微调与评测', proficiency: 'familiar', note: '了解基本流程' },
    ],
  },
  {
    key: 'java',
    name: 'Java 技术栈',
    summary: '熟练 Spring 全家桶，具备 OAuth 2.0 / OIDC 认证授权与单点登录的设计落地经验。',
    items: [
      { name: 'Spring Boot / Spring MVC', proficiency: 'proficient', highlight: true },
      { name: 'Spring Data JPA', proficiency: 'proficient' },
      { name: 'IoC / AOP 与自动装配机制', proficiency: 'proficient' },
      { name: 'Spring Security', proficiency: 'proficient', highlight: true },
      {
        name: 'Spring Authorization Server',
        proficiency: 'proficient',
        note: 'OAuth 2.0 / OIDC、令牌管理与单点登录',
      },
      {
        name: 'Spring Cloud',
        proficiency: 'familiar',
        note: 'Nacos / Gateway / OpenFeign / Sentinel / Seata',
      },
      { name: 'MyBatis / MyBatis-Plus', proficiency: 'proficient' },
      { name: 'Redis', proficiency: 'proficient' },
      { name: 'RabbitMQ / RocketMQ', proficiency: 'proficient' },
      { name: 'Elasticsearch', proficiency: 'proficient' },
    ],
  },
  {
    key: 'dotnet',
    name: '.NET 技术栈',
    summary: '精通 ABP 框架，熟悉 ASP.NET Core 核心机制，具备从传统 Web 到现代 Web 的演进经验。',
    items: [
      {
        name: 'ABP Framework',
        proficiency: 'expert',
        highlight: true,
        note: '模块化 / DDD 分层 / 仓储 / 工作单元 / 审计 / 权限与多租户 / 事件总线 / 后台作业',
      },
      {
        name: 'ASP.NET Core',
        proficiency: 'proficient',
        highlight: true,
        note: '请求管道、中间件、依赖注入、配置系统、日志与健康检查',
      },
      {
        name: 'Entity Framework Core / Dapper',
        proficiency: 'proficient',
        note: '数据库迁移、事务管理与查询优化',
      },
      { name: 'ASP.NET WebForms / MVC', proficiency: 'familiar' },
    ],
  },
  {
    key: 'frontend',
    name: '前端 / 全栈（Vue）',
    summary: '熟练 Vue 2 / Vue 3 及周边生态，具备中后台系统与 C 端展示站的全栈开发经验。',
    items: [
      {
        name: 'Vue 2 / Vue 3',
        proficiency: 'proficient',
        highlight: true,
        note: 'Options API 与 Composition API',
      },
      { name: 'Vue Router', proficiency: 'proficient' },
      { name: 'Pinia / Vuex', proficiency: 'proficient' },
      { name: 'Element Plus / Ant Design Vue', proficiency: 'proficient' },
      { name: 'Vite / TypeScript', proficiency: 'familiar' },
      { name: 'Axios 封装与前后端联调', proficiency: 'proficient' },
      {
        name: '架构设计与核心组件',
        proficiency: 'proficient',
        note: '主导新项目架构搭建、审批流（工作流）引擎',
      },
    ],
  },
  {
    key: 'devops',
    name: '工程化与运维',
    summary: '熟悉容器化、CI/CD 与高并发架构设计，掌握主流关系型数据库。',
    items: [
      { name: 'Docker', proficiency: 'proficient' },
      { name: 'Kubernetes', proficiency: 'familiar' },
      { name: 'CI/CD', proficiency: 'familiar', note: 'GitLab CI / GitHub Actions / Azure DevOps' },
      { name: '微服务架构', proficiency: 'proficient' },
      { name: '消息队列 / 缓存 / 高并发设计', proficiency: 'proficient' },
      { name: 'MySQL / PostgreSQL / SQL Server', proficiency: 'proficient' },
      { name: 'Git 协作与单元测试', proficiency: 'proficient', note: 'JUnit / xUnit' },
    ],
  },
]

export function getSkillDomain(key: string): SkillDomain | undefined {
  return skillDomains.find((domain) => domain.key === key)
}
