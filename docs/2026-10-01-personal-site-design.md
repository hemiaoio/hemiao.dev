# hemiao.dev 个人网站 · 方案设计

> 状态：设计草案 · 2026-10-01
> 定位：个人主页（首版聚焦「个人技能展示」）
> 上游参考：`../miaoapp`（ABP + Vue 种子项目，仅借鉴技术栈与目录约定，不引入其代码）

---

## 1. 背景与目标

`cv/个人简历.md` 文末标注「仅剩『个人主页』为可选项」——本项目的直接目标就是补上这一项。

| 项 | 内容 |
|---|---|
| 首版目标 | 可挂到简历 / 名片上的个人技能展示页，内容取自 `cv/个人简历.md` |
| 首版范围 | 技能矩阵、工作经历时间线、项目案例、关于我与联系方式 |
| 明确非目标 | 不做登录注册、不做多租户、不做内容管理后台、不做服务端渲染（SSR） |
| 成功标准 | 秒开、被搜索引擎收录、手机端可用、`git push` 即上线、零服务器运维 |

---

## 2. 技术选型

### 2.1 结论

**静态站点 + 构建期预渲染（SSG）**，技术栈与 `miaoapp` 的 `clients/web` 保持一致。

| 层 | 选型 | 说明 |
|---|---|---|
| 框架 | Vue 3 + TypeScript | 与种子一致 |
| 构建 | Vite | 与种子一致 |
| 预渲染 | `vite-ssg` | 构建期把每个路由渲染成静态 HTML |
| 路由 | `vue-router` 4 | `vite-ssg` 的多页模式依赖它 |
| UI 基础 | Naive UI | 用其 `NTimeline`（时间线）、`NTag`、`NCard`、`NGrid`、`NConfigProvider`（主题） |
| 图标 | `@vicons/ionicons5` | 与种子一致 |
| 样式 | Sass | 与种子一致 |
| Head 管理 | `@unhead/vue` | `vite-ssg` 内置集成，用于 title / description / OG |
| 规范 | ESLint + Prettier | 沿用种子风格：无分号、单引号、2 空格缩进、100 列宽 |

### 2.2 版本核对（已在本机验证）

| 项 | 结果 |
|---|---|
| Node | 本机 **v22.22.2** — `vite-ssg` v28 要求 ≥ 20，满足 |
| pnpm | 本机 **10.6.3** |
| git | 本机 **2.55.0** |
| `vite-ssg` | 当前 **v28.x**；自 v27 起 **ESM-only**（不再支持 `require`），必须用 `import { ViteSSG } from 'vite-ssg'` |
| `vite-ssg` 入口 | 多页必须从 `vite-ssg` 导入；仅单页（无路由）才用 `vite-ssg/single-page` |
| Vue / Vite / Naive UI 具体版本 | 脚手架时锁定最新稳定版并写入 `package.json`，不做浮动 |

> 注：`vite-ssg` 自 v28 起要求 Node ≥ 20，本机已满足，无需额外降级。

### 2.3 为什么不做纯 SPA，也不做全栈

- **纯 SPA（原种子 website 形态）**：首屏白屏、爬虫收录弱。个人主页是要挂在简历上被 HR / 同行打开的第一入口，这条路体验最差。
- **全栈（引入 ABP 后端）**：技能展示是纯内容展示，不需要数据库、认证、后台。为它背上 PostgreSQL + Redis + .NET 运行时的运维成本不划算。
- **SSG**：构建期渲染成静态 HTML，既有 SPA 的开发体验，又有静态站的加载速度与 SEO，且部署只需一个对象存储 / 静态托管。

---

## 3. 仓库形态

**独立新建、对齐 `miaoapp` 的目录约定**，不引入种子代码。

### 3.1 目录结构

```
hemiao.dev/
├── docs/
│   └── 2026-10-01-personal-site-design.md      # 本文档
├── public/
│   ├── favicon.svg
│   ├── og-image.png                            # 社交分享缩略图
│   ├── robots.txt
│   └── resume/                                 # 简历 PDF（后续扩展）
├── src/
│   ├── main.ts                                 # ViteSSG 入口：export const createApp
│   ├── App.vue
│   ├── app.config.ts                           # 站点级配置：站点名/作者/社交链接/主色
│   ├── contents/                               # ★ 内容层：无头纯 TS，站点唯一数据源
│   │   ├── types.ts                            # Skill / Experience / Project / Profile 类型
│   │   ├── profile.ts                          # 职业定位、教育、联系方式
│   │   ├── skills.ts                           # 五大技能域
│   │   ├── experiences.ts                      # 三段工作经历
│   │   ├── projects.ts                         # 六个项目
│   │   └── index.ts                            # 统一出口（未来可替换为 API provider）
│   ├── features/                               # 站点区块，一区块一目录、自包含
│   │   ├── home/
│   │   ├── skills/
│   │   ├── experience/
│   │   ├── projects/
│   │   └── about/
│   │       ├── index.ts                        # 导出路由定义（供自动发现）
│   │       ├── logic/                          # 无头业务逻辑（纯 TS，禁 import UI 库）
│   │       ├── components/                     # 仅本区块使用的组件
│   │       └── views/                          # 仅 UI（.vue）
│   ├── components/                             # 跨区块共享的展示型组件
│   ├── composables/                            # 主题切换、SEO head 等
│   ├── layouts/
│   │   └── DefaultLayout.vue                   # 顶栏 + 内容 + 页脚
│   ├── router/
│   │   ├── index.ts                            # 仅壳级路由：layout / 404 / 重定向
│   │   └── modules.ts                          # import.meta.glob 自动发现 features/*/index.ts
│   ├── styles/
│   │   ├── variables.scss
│   │   └── main.scss
│   └── types/
├── index.html
├── vite.config.ts
├── tsconfig.json / tsconfig.node.json
├── eslint.config.js
├── .prettierrc
├── .env / .env.production
├── package.json
└── README.md
```

### 3.2 沿用的种子约定

| 约定 | 落地方式 |
|---|---|
| **一特性一目录、自包含** | `features/<name>/` 内含自己的路由、视图、组件、逻辑；改一个区块只动一个文件夹 |
| **约定优于注册** | 新增区块 = 新增 `features/<name>/` 文件夹；`router/modules.ts` 用 `import.meta.glob` 自动收录，**不改任何中心文件** |
| **`logic/` 与 `views/` 分离** | `logic/` 为纯 TS（只依赖 `contents/` 与类型），禁 import `naive-ui` / `.vue`；`.vue` 只做渲染与编排 |
| **命名空间前缀** | 路由 `name` 一律带区块前缀（`skills.index`、`projects.detail`） |
| **代码风格** | Prettier：无分号、单引号、2 空格、trailing comma (es5)、100 列宽 |
| **文档命名** | 设计类 `docs/{YYYY-MM-DD}-{topic}-design.md` |

### 3.3 与种子约定的**有意差异**

| 项 | 种子约定 | 本站做法 | 原因 |
|---|---|---|---|
| `features/` + `app-features/` 双层 | 双层物理分区 | **仅用 `features/`** | 双层是为「下游专属特性 vs 可反哺种子」而设；本站无上游种子，该语义不存在 |
| `AppModule` 运行时契约 | 含 routes / menus / permissions / setup | **仅保留 routes 自动发现** | 个人站无菜单与权限体系，全量契约是无谓的复杂度 |
| i18n 后端主导 | 文案来自 ABP 后端 | 前端本地（首版仅中文） | 无后端 |
| 生成物只读 | `packages/api` 由 OpenAPI 生成 | 无（不调后端 API） | 无后端 |

> 若日后决定整仓接入 `miaoapp` 种子，迁移路径是清晰的：把个人专属内容从 `features/` 移到 `app-features/`，并把 `contents/` 的读取换成 `@abp-native/api` 的调用。

---

## 4. 内容模型

内容层是**无头纯 TS**，与 UI 完全解耦——这样后续无论是换 UI、加多语言，还是把数据源换成后端 API，都不用动视图。

基于 `cv/个人简历.md` 提取四类实体：

```ts
// src/contents/types.ts（节选）

export interface Profile {
  name: string
  title: string          // AI 应用软件工程师 · 高级后端 / 全栈开发工程师
  tagline: string        // 一句话定位
  yearsOfExperience: number
  location: string
  summary: string[]      // 自我评价要点
  education: Education
  contacts: Contact[]
}

export interface Contact {
  type: 'email' | 'github' | 'blog'
  label: string
  href: string
}

// 熟练度用三级语义，不引入主观百分比
export type Proficiency = 'expert' | 'proficient' | 'familiar'
// expert = 精通 / proficient = 熟练使用 / familiar = 熟悉

export interface SkillDomain {
  key: string            // ai | java | dotnet | frontend | devops
  name: string
  summary: string
  icon: string
  domains: SkillItem[]
}

export interface SkillItem {
  name: string
  proficiency: Proficiency
  highlight?: boolean    // 是否标为主打能力
}

export interface Experience {
  company: string
  role: string
  start: string          // '2019.06'
  end: string            // '2026.08' | '至今'
  companyIntro?: string
  duties: string[]
  metrics?: Metric[]     // 量化成果
  tech: string[]
}

export interface Metric {
  label: string          // 注册用户
  value: string          // 3 万+
}

export interface Project {
  slug: string           // 用于 /projects/:slug
  name: string
  period: string
  category: string       // AI 应用 / .NET 微服务 / Spring 后台 / 运营平台 / 企业系统
  summary: string
  tech: string[]
  highlights: string[]
  featured?: boolean     // 是否在首页展示
}
```

**熟练度取值直接映射简历原文用词**（精通 / 熟练使用 / 熟悉），不发明百分比或星级——避免自评虚高，也便于日后核对。

首版内容映射一览：

| 内容源（简历章节） | 落地实体 | 展示位置 |
|---|---|---|
| 一、职业定位 + 二、基本信息 | `profile` | 首页 Hero、关于我 |
| 三、教育背景 | `profile.education` | 关于我 |
| 四、专业技能（5 节） | `skills` → 5 个 `SkillDomain` | 技能矩阵 |
| 五、工作经历（3 段） | `experiences` | 经历时间线 |
| 六、项目经验（6 个） | `projects` | 项目列表 + 详情 |
| 七、自我评价 | `profile.summary` | 关于我 |

---

## 5. 信息架构与页面

采用**多页**而非单页 one-pager：每个区块独立 URL 才能被搜索引擎分别收录、也便于单独分享某段经历或某个项目。

| 路由 | 页面 | 内容 |
|---|---|---|
| `/` | 首页 | Hero（姓名 / 定位 / 一句话）+ 关键数字 + 五大技能域概览 + 精选项目 + 联系入口 |
| `/skills` | 技能矩阵 | 五大技能域横向对比，域内条目按熟练度分级呈现 |
| `/experience` | 工作经历 | 三段经历的纵向时间线，含量化成果与技能标签 |
| `/projects` | 项目列表 | 六个项目卡片，按类别筛选 |
| `/projects/:slug` | 项目详情 | 预渲染的独立页面，含技术栈、职责与亮点 |
| `/about` | 关于我 | 职业定位、教育背景、自我评价、联系方式 |
| `/:pathMatch(.*)*` | 404 | 兜底 |

**首页与子页的关系**：首页是「名片式浓缩版」，只呈现每个区块的摘要并提供入口，完整内容在子页——避免同一份内容重复渲染两遍。

---

## 6. 预渲染与 SEO

### 6.1 vite-ssg 接入要点

```ts
// src/main.ts
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { routes } from './router'

export const createApp = ViteSSG(App, { routes }, ({ app, router, isClient }) => {
  // 注册 Naive UI、全局样式等
})
```

- `package.json` 的构建脚本改为 `"build": "vite-ssg build"`。
- `includedRoutes` 需**显式枚举**所有路由，包括每个项目的详情页——从 `contents/projects.ts` 派生，避免手写遗漏。
- 客户端专属代码用 `import.meta.env.SSR` 包裹，便于 Rollup 在构建时裁掉（如主题切换读 `localStorage`）。

### 6.2 SEO 清单

| 项 | 做法 |
|---|---|
| 逐页 title / description | 每页用 `@unhead/vue` 的 `useHead` 设置，项目详情页的文案由数据生成 |
| Open Graph / Twitter Card | 同上，图片首版用静态 `public/og-image.png` |
| 结构化数据 | 首页注入 JSON-LD `Person` schema（姓名、职位、技能、社交链接） |
| `robots.txt` | 放行全站，指向 sitemap |
| `sitemap.xml` | 构建后由脚本从路由表生成，写入 `dist/` |
| 语义化标签 | `main` / `section` / `h1` 唯一性 / 图片 `alt` |
| 无障碍 | 顶栏可键盘导航、对比度达标、`prefers-reduced-motion` 下关闭动效 |

### 6.3 深浅色主题与闪烁（FOUC）

- 默认跟随系统 `prefers-color-scheme`，允许手动切换并持久化到 `localStorage`。
- **关键点**：预渲染出的 HTML 是构建期状态，若等 hydration 后才读 `localStorage` 应用暗色，会看到明显闪白。解法是在 `index.html` 的 `<head>` 内联一段极小的同步脚本，在 CSS 之前给 `<html>` 打上主题 class。
- 该内联脚本必须用 `import.meta.env.SSR` 之外的方式处理（它属于 HTML 模板，不参与打包）。

### 6.4 `.dev` 域名的硬约束

`hemiao.dev` 属于 `.dev` 顶级域，该 TLD 已被列入浏览器 **HSTS preload 列表**，**强制 HTTPS**：

- 部署平台必须提供有效证书（Cloudflare Pages / Vercel / Netlify 均自动签发，无需额外操作）。
- 本地开发访问 `http://localhost:5173` 不受影响。
- 若打算在自有服务器上跑 HTTP 裸站，会直接无法访问——这也是推荐托管平台的原因之一。

---

## 7. 视觉与品牌

- **主色**：克制的单色主色 + 中性灰阶。定位是「AI 应用工程师」，建议冷色系（蓝 / 青）表达技术感，全局只用一个主色，深浅两级。
- **字体**：系统字体栈优先（中文用系统默认黑体），保证首屏无字体加载阻塞。
- **明暗双主题**：设计 token 用 CSS 变量承载（`--color-bg` / `--color-text` / `--color-primary`），Naive UI 通过 `NConfigProvider` 的 `theme` 与 `themeOverrides` 对齐同一套 token。
- **动效**：只做入场淡入与悬停微交互，并遵守 `prefers-reduced-motion`。不做视差、不做滚动劫持。

---

## 8. 构建与部署

| 项 | 做法 |
|---|---|
| 构建产物 | `dist/` 纯静态（HTML + JS + CSS + 图片），无运行时依赖 |
| 托管 | Cloudflare Pages / Vercel / Netlify（推 Git 即部署，免运维） |
| 域名 | `hemiao.dev` 绑定 + 自动 HTTPS |
| 缓存 | `assets/*`（文件名带 hash）设长缓存；`index.html` 与 sitemap 设短缓存 |
| CI | GitHub Actions：`lint` → `type-check` → `build` → 部署（可选，平台自带构建时亦可省） |
| 预览 | 平台 PR 预览环境，改动可先看效果再合并 |

本地脚本：

```bash
pnpm dev          # 开发服务器
pnpm build        # vite-ssg 构建 + 预渲染 + sitemap
pnpm preview      # 本地预览构建产物
pnpm lint         # ESLint
pnpm type-check   # vue-tsc
```

---

## 9. 分阶段实施计划

| 里程碑 | 内容 | 验收标准 |
|---|---|---|
| **M0** 工程基建 | 脚手架、依赖锁版本、ESLint/Prettier、Vite 与 vite-ssg 配置、主题 token | `pnpm dev` 起得来，`pnpm build` 能产出 `dist/index.html` |
| **M1** 内容层 | `contents/types.ts` + 四类数据文件，内容从简历完整搬入 | 数据能被 TS 类型校验通过；无 UI 依赖 |
| **M2** 骨架 | `DefaultLayout`（顶栏/页脚/主题切换）、壳级路由、404、响应式断点 | 桌面与手机端布局都正常，主题切换无闪烁 |
| **M3** 首页 | Hero + 关键数字 + 技能域概览 + 精选项目 + 联系入口 | 首屏加载快、文案无错漏 |
| **M4** 技能矩阵 | 五大技能域可视化 | 明暗主题下都可读；移动端不溢出 |
| **M5** 工作经历 | 时间线（`NTimeline`）+ 量化成果 | 三段经历完整，量化数据与简历一致 |
| **M6** 项目案例 | 列表（可筛选）+ 详情页 | 六个项目全部可访问，详情页路由可预渲染 |
| **M7** 关于我 | 职业定位、教育、自评、联系方式 | 邮箱等联系方式可点击 |
| **M8** SEO 与预渲染 | `useHead` 逐页配置、JSON-LD、robots、sitemap、OG 图 | 构建产物里每个路由都有独立 HTML 与 title |
| **M9** 上线 | 部署平台接入、域名绑定、HTTPS、缓存策略 | `https://hemiao.dev` 可访问，移动端体验正常 |

**质量闸门**：每个里程碑结束都要跑一次 `pnpm build` 并 `pnpm preview` 冒烟验证，不接受"代码写完但没构建过"的状态。

---

## 10. 后续扩展预留（非首版）

| 扩展 | 前置条件 | 说明 |
|---|---|---|
| 简历 PDF 下载 | 无 | 放 `public/resume/`，注意脱敏（去掉手机号） |
| 博客 / 技术文章 | 无 | Markdown 文件 → 构建期转静态页，复用现有预渲染管线 |
| 多语言（中/英） | 无 | 内容层已与 UI 解耦，加一层 locale 维度即可 |
| 访问统计 | 无 | 选隐私友好方案（如 Cloudflare Web Analytics），不引入重型埋点 |
| AI 助手（"问我简历"） | **需后端** | 首版无后端不满足；届时需引入服务端，或直接接入 `miaoapp` 种子走全栈路线 |

---

## 11. 风险与注意事项

| 风险 | 影响 | 应对 |
|---|---|---|
| **隐私** | 简历含手机号，公网展示会被爬取 | **站点只放邮箱与 GitHub，手机号不上站**；简历 PDF 若上传需先脱敏 |
| 预渲染路由遗漏 | 项目详情页没被渲染成 HTML，SEO 失效 | `includedRoutes` 从 `contents/projects.ts` 派生，不手写 |
| 主题闪烁 | 暗色用户首屏闪白，观感差 | `index.html` 内联同步脚本（见 6.3） |
| `vite-ssg` 版本漂移 | ESM-only、Node 版本要求 | 已在 2.2 核对；锁版本，升级前先跑构建冒烟 |
| 内容与简历脱节 | 简历更新后站点还是旧内容 | `contents/` 是唯一数据源且结构对应简历章节，更新时按章节对照 |
| Naive UI 全量引入 | 包体积偏大，拖慢首屏 | 按需引入组件（用到的只有 Timeline / Tag / Card / Grid / ConfigProvider 等） |

---

## 12. 待确认事项

1. **信息架构**：确认采用「多页 + 首页浓缩版」（本文推荐），还是更想要单页 one-pager 滚动式？
2. **隐私红线**：确认站点只展示邮箱 + GitHub，不展示手机号？
3. **主色倾向**：冷色（蓝 / 青，技术感）还是中性深灰（克制）？
4. **是否立即开工**：确认后即可进入 M0 脚手架。
