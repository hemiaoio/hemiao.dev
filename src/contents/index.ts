/**
 * 内容层的统一出口。视图只从这里取数据，不直接 import 具体数据文件 ——
 * 将来若把数据源换成后端 API，只需改这一层。
 */

export * from './types.ts'
export { profile } from './profile.ts'
export { skillDomains, getSkillDomain } from './skills.ts'
export { experiences } from './experiences.ts'
export {
  projects,
  projectSlugs,
  featuredProjects,
  projectCategories,
  getProjectBySlug,
} from './projects.ts'
