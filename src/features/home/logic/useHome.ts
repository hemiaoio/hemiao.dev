import { computed } from 'vue'
import { featuredProjects, profile, skillDomains } from '@/contents'

/** 无头逻辑：只负责从内容层取数与派生，不碰任何 UI */
export function useHome() {
  const highlights = computed(() => profile.highlights)

  /** 每个技能域挑出主打能力，首页只做概览，完整内容在 /skills */
  const skillOverview = computed(() =>
    skillDomains.map((domain) => ({
      key: domain.key,
      name: domain.name,
      summary: domain.summary,
      highlights: domain.items.filter((item) => item.highlight).map((item) => item.name),
      total: domain.items.length,
    }))
  )

  const featured = computed(() => featuredProjects)

  return {
    profile,
    highlights,
    skillOverview,
    featured,
  }
}
