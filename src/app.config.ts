/**
 * 站点元信息 —— SEO、页脚、导航等处共用的常量。
 * 品牌色不在这里，见 src/theme/tokens.ts。
 */

export interface NavItem {
  label: string
  to: string
}

export interface SiteConfig {
  url: string
  siteName: string
  author: string
  title: string
  description: string
  keywords: string[]
  locale: string
  ogImage: string
  /** 页脚备案 / 版权起始年 */
  since: number
}

export const siteConfig: SiteConfig = {
  url: 'https://hemiao.dev',
  siteName: 'hemiao.dev',
  author: '何苗',
  title: '何苗 · AI 应用软件工程师',
  description:
    '何苗（He Miao）的个人网站：16 年软件开发经验，深耕 AI 应用方向，具备大模型接入、RAG / Prompt / Agent 到业务融合与工程化上线的完整实践；同时掌握 Java（Spring 全家桶）与 .NET（ASP.NET Core / ABP）两大技术栈。',
  keywords: [
    '何苗',
    'He Miao',
    'AI 应用工程师',
    '大模型应用',
    'LLM',
    'RAG',
    'Agent',
    'Spring Boot',
    'Spring Authorization Server',
    'ABP Framework',
    'ASP.NET Core',
    'Vue 3',
    '全栈开发',
  ],
  locale: 'zh-CN',
  ogImage: '/og-image.png',
  since: 2026,
}
