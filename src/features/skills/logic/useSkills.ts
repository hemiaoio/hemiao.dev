import { computed } from 'vue'
import {
  PROFICIENCY_LABEL,
  PROFICIENCY_ORDER,
  skillDomains,
  type Proficiency,
  type SkillItem,
} from '@/contents'

export interface SkillGroup {
  proficiency: Proficiency
  label: string
  items: SkillItem[]
}

/**
 * 纯函数：按熟练度分组。放在 logic/ 里，未来移动端 UI 可直接复用同一份逻辑。
 * 熟练度取值即简历原文用词（精通 / 熟练 / 熟悉），不做百分比换算。
 */
export function groupByProficiency(items: SkillItem[]): SkillGroup[] {
  return PROFICIENCY_ORDER.map((proficiency) => ({
    proficiency,
    label: PROFICIENCY_LABEL[proficiency],
    items: items.filter((item) => item.proficiency === proficiency),
  })).filter((group) => group.items.length > 0)
}

export function useSkills() {
  const domains = computed(() => skillDomains)

  const totalSkills = computed(() =>
    skillDomains.reduce((sum, domain) => sum + domain.items.length, 0)
  )

  const legend = computed(() =>
    PROFICIENCY_ORDER.map((proficiency) => ({
      proficiency,
      label: PROFICIENCY_LABEL[proficiency],
      count: skillDomains.reduce(
        (sum, domain) => sum + domain.items.filter((item) => item.proficiency === proficiency).length,
        0
      ),
    }))
  )

  return { domains, totalSkills, legend }
}
