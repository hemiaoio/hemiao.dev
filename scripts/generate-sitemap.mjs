/**
 * 构建后生成 sitemap.xml。
 *
 * 刻意不使用 import 内容层的数据来拼 URL —— 而是直接扫描 dist 里实际产出的 HTML。
 * 这样有一个重要性质：**sitemap 永远不可能与实际产出的页面脱节**。
 * 新增一个 feature 或一个项目，sitemap 自动包含，不需要同步维护第二份路由清单。
 */
import { readdirSync, statSync, writeFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const SITE_URL = 'https://hemiao.dev'
const DIST = 'dist'

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry)
    return statSync(full).isDirectory() ? walk(full) : [full]
  })
}

const pages = walk(DIST)
  .filter((file) => file.endsWith('.html'))
  .map((file) => relative(DIST, file).split(sep).join('/'))
  // 排除隐藏文件等意外产物（如曾经出现过的 dist/.html）
  .filter((file) => !file.startsWith('.'))
  // 排除 404 页：它只供托管平台兜底，不是一个可被检索的独立页面，
  // 收录进 sitemap 会让搜索引擎拿到一个 404 状态的 URL。
  .filter((file) => file !== '404.html')
  .map((file) => (file === 'index.html' ? '/' : `/${file.replace(/\.html$/, '')}`))
  .sort()

if (!pages.length) {
  console.error('[sitemap] dist 下没有找到任何 HTML，构建可能失败了，跳过生成')
  process.exit(1)
}

const lastmod = new Date().toISOString().slice(0, 10)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((path) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>
`

writeFileSync(join(DIST, 'sitemap.xml'), xml, 'utf8')
console.log(`[sitemap] 已写入 ${DIST}/sitemap.xml，共 ${pages.length} 条 URL`)
for (const page of pages) console.log(`  ${SITE_URL}${page}`)
