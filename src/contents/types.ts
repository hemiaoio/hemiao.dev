/**
 * 内容层类型定义。
 *
 * 本目录（src/contents）是**无头纯 TS**：不得 import vue / naive-ui / 任何 UI 库，
 * 这样内容既能在浏览器端被视图消费，也能在构建期被 vite.config.ts 直接读取
 * （例如展开 /projects/:slug 的预渲染路由）。对齐 miaoapp 种子的 logic/ 约定。
 */

/** 熟练度：直接映射简历原文用词（精通 / 熟练使用 / 熟悉），不发明百分比或星级 */
export type Proficiency = 'expert' | 'proficient' | 'familiar'

export const PROFICIENCY_LABEL: Record<Proficiency, string> = {
  expert: '精通',
  proficient: '熟练',
  familiar: '熟悉',
}

/** 由强到弱的排序，用于可视化时的分级 */
export const PROFICIENCY_ORDER: Proficiency[] = ['expert', 'proficient', 'familiar']

export interface Contact {
  type: 'email' | 'github'
  label: string
  /** 展示文本；为 undefined 时直接展示 label 对应的值 */
  value: string
  href: string
}

export interface Education {
  school: string
  schoolUrl: string
  major: string
  degree: string
  courses: string[]
}

/** 单个量化成果 / 关键数字 */
export interface Metric {
  label: string
  value: string
  note?: string
}

export interface Profile {
  name: string
  latinName: string
  title: string
  tagline: string
  yearsOfExperience: number
  startYear: number
  location: string
  /** 首页与「关于我」共用的关键数字 */
  highlights: Metric[]
  /** 自我评价要点 */
  summary: string[]
  education: Education
  contacts: Contact[]
}

export interface SkillItem {
  name: string
  proficiency: Proficiency
  /** 是否标为该领域的主打能力 */
  highlight?: boolean
  note?: string
}

export interface SkillDomain {
  key: string
  name: string
  summary: string
  items: SkillItem[]
}

export interface Experience {
  company: string
  role: string
  /** '2019.06' */
  start: string
  /** '2026.08' 或 '至今' */
  end: string
  companyIntro?: string
  duties: string[]
  metrics?: Metric[]
  tech: string[]
}

export type ProjectCategory = 'AI 应用' | '.NET 微服务' | 'Spring 后台' | '运营平台' | '企业系统'

export interface Project {
  slug: string
  name: string
  /** 简历中未标注起止时间的项目留空，不做臆测 */
  period?: string
  category: ProjectCategory
  summary: string
  tech: string[]
  highlights: string[]
  /** 是否在首页「精选项目」中展示 */
  featured: boolean
}
