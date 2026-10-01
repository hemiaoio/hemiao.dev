import { computed } from 'vue'
import { experiences, profile } from '@/contents'

export function useExperience() {
  const items = computed(() => experiences)

  const careerSpan = computed(() => `${profile.yearsOfExperience} 年 · ${profile.startYear} 至今`)

  const companyCount = computed(() => experiences.length)

  return { items, careerSpan, companyCount }
}
