/// <reference types="vite-ssg" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { themeTokens, themeTokensToCssVars } from './src/theme/tokens.ts'
import { siteConfig } from './src/app.config.ts'
import { profile } from './src/contents/profile.ts'
import { skillDomains } from './src/contents/skills.ts'
import { projects } from './src/contents/projects.ts'

/** 构建期生成 Person 结构化数据，让搜索引擎能识别出这是一个人物实体 */
function buildPersonJsonLd(): string {
  const contact = (type: string) => profile.contacts.find((item) => item.type === type)
  const email = contact('email')
  const github = contact('github')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.latinName,
    jobTitle: profile.title,
    description: siteConfig.description,
    url: siteConfig.url,
    ...(email ? { email: `mailto:${email.value}` } : {}),
    ...(github ? { sameAs: [github.href] } : {}),
    address: {
      '@type': 'PostalAddress',
      addressLocality: profile.location,
      addressCountry: 'CN',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: profile.education.school,
      url: profile.education.schoolUrl,
    },
    // 只取各领域的主打能力，避免把整份清单塞进去
    knowsAbout: skillDomains.flatMap((domain) =>
      domain.items.filter((item) => item.highlight).map((item) => item.name)
    ),
    hasPart: projects.slice(0, 6).map((project) => ({
      '@type': 'CreativeWork',
      name: project.name,
      description: project.summary,
      ...(project.period ? { temporalCoverage: project.period } : {}),
    })),
  }

  return JSON.stringify(jsonLd)
}

export default defineConfig({
  plugins: [
    vue(),
    {
      // 把主题令牌渲染成 <style> 注入 HTML <head>。
      // 预渲染出的静态页在没有任何 JS 时也带正确品牌色，避免首屏掉色。
      name: 'hemiao:theme-tokens',
      transformIndexHtml() {
        return [
          {
            tag: 'style',
            injectTo: 'head-prepend',
            children: themeTokensToCssVars(themeTokens),
          },
        ]
      },
    },
    {
      name: 'hemiao:json-ld',
      transformIndexHtml() {
        return [
          {
            tag: 'script',
            attrs: { type: 'application/ld+json' },
            children: buildPersonJsonLd(),
            injectTo: 'head',
          },
        ]
      },
    },
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    dedupe: ['vue', 'naive-ui', '@unhead/vue'],
  },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('naive-ui')) return 'naive-ui'
          if (id.includes('@vicons')) return 'icons'
          if (id.includes('vue-router') || id.includes('/vue/') || id.includes('@vue/')) {
            return 'vue-vendor'
          }
        },
      },
    },
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    beastiesOptions: { preload: 'swap' },
    /**
     * 需要预渲染的路由清单。
     *
     * vite-ssg 的 routesToPaths 会把子路由的原始 path 直接收进集合，因此这里会同时收到
     * 根路径 '/'、首页子路由的空字符串 ''、无前导斜杠的 'skills'，以及带参数的
     * 'projects/:slug' 与通配 ':pathMatch(.*)*'。空字符串会被写成一个多余的 dist/.html，
     * 必须显式剔除。
     */
    includedRoutes(paths) {
      const staticPaths = paths.filter((p) => p && !p.includes(':') && !p.includes('*'))
      const projectPaths = projects.map((p) => `/projects/${p.slug}`)
      return [...new Set([...staticPaths, ...projectPaths])]
    },
  },
})
