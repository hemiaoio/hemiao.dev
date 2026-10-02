/**
 * 构建后清理：移除 Vite 的 SSR 构建缓存目录 `dist/.vite`。
 *
 * 它是 vite-ssg 预渲染阶段用于生成 modulepreload 的中间产物，
 * 产出的 HTML / JS 里没有任何地方引用它（已实测 grep 结果为 0）。
 * 线上留着只会白占体积，并把源码模块路径暴露出去。
 *
 * 之所以放在构建链末尾而不是 CI 里，是为了让**本地 dist 与线上 artifact 完全一致**，
 * 避免出现「本地预览正常、线上多一层没人知道的目录」这种情况。
 *
 * 注意：只删 `dist/.vite`，绝不能碰 `dist/.nojekyll`
 * —— 后者是 GitHub Pages 用来关闭 Jekyll 预处理的标记，删了会退回 Jekyll 处理。
 */
import { rmSync } from 'node:fs'
import { resolve } from 'node:path'

const target = resolve('dist/.vite')

rmSync(target, { recursive: true, force: true })

console.log('[clean-dist] 已移除 dist/.vite（SSR 构建中间产物，产物中无引用）')
