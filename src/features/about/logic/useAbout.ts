import { computed } from 'vue'
import { experiences, profile, skillDomains } from '@/contents'

export function useAbout() {
  const contacts = computed(() => profile.contacts)
  const highlights = computed(() => profile.highlights)
  const summary = computed(() => profile.summary)
  const education = computed(() => profile.education)

  const latestRole = computed(() => {
    const latest = experiences[0]
    return latest ? `${latest.company} · ${latest.role}` : ''
  })

  const domainCount = computed(() => skillDomains.length)

  return { profile, contacts, highlights, summary, education, latestRole, domainCount }
}
