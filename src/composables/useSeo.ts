import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useHead } from '@unhead/vue'
import { siteConfig } from '@/app.config'

export interface SeoInput {
  /** 不含作者后缀的页面标题；支持 getter / ref，随路由参数变化自动更新 */
  title?: MaybeRefOrGetter<string | undefined>
  description?: MaybeRefOrGetter<string | undefined>
  /** 相对路径，如 '/skills'；用于 canonical 与 og:url */
  path?: MaybeRefOrGetter<string | undefined>
  type?: 'website' | 'article'
}

/**
 * 逐页 SEO。预渲染时 @unhead/vue 会把结果写进每张静态 HTML 的 <head>，
 * 因此每个路由都有独立 title / description / canonical，而不是共用一份。
 *
 * 之所以接收 getter 而不是纯字符串：项目详情页在 slug 变化时组件实例会被复用，
 * setup 不会重跑，静态标题会停留在上一个项目上。
 */
export function useSeo(input: SeoInput = {}): void {
  const fullTitle = computed(() => {
    const raw = toValue(input.title)
    return raw ? `${raw} · ${siteConfig.author}` : siteConfig.title
  })

  const description = computed(() => toValue(input.description) ?? siteConfig.description)

  const url = computed(() => {
    const path = toValue(input.path)
    return path ? `${siteConfig.url}${path}` : siteConfig.url
  })

  const image = computed(() => `${siteConfig.url}${siteConfig.ogImage}`)

  useHead({
    title: fullTitle,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: siteConfig.keywords.join(',') },
      { name: 'author', content: siteConfig.author },
      { property: 'og:type', content: input.type ?? 'website' },
      { property: 'og:site_name', content: siteConfig.siteName },
      { property: 'og:locale', content: 'zh_CN' },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    link: [{ rel: 'canonical', href: url }],
  })
}
