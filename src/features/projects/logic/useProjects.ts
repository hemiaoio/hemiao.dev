import { computed, ref, toValue, type MaybeRefOrGetter } from 'vue'
import { getProjectBySlug, projectCategories, projects, type Project } from '@/contents'

const ALL_CATEGORY = '全部'

/** 项目列表：分类筛选（纯客户端，预渲染时输出全量，不影响 SEO） */
export function useProjects() {
  const activeCategory = ref<string>(ALL_CATEGORY)

  const categories = computed(() => [ALL_CATEGORY, ...projectCategories])

  const list = computed<Project[]>(() => {
    if (activeCategory.value === ALL_CATEGORY) return projects
    return projects.filter((project) => project.category === activeCategory.value)
  })

  function setCategory(category: string): void {
    activeCategory.value = category
  }

  return {
    categories,
    activeCategory,
    list,
    setCategory,
    total: projects.length,
  }
}

/** 项目详情：slug 来自路由参数，用 getter 保持响应式 */
export function useProjectDetail(slug: MaybeRefOrGetter<string>) {
  const current = computed(() => getProjectBySlug(toValue(slug)))

  const more = computed(() =>
    projects.filter((project) => project.slug !== toValue(slug)).slice(0, 3)
  )

  return { current, more }
}
