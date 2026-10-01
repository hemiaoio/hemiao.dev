# hemiao.dev

何苗的个人网站 —— **静态站点 + 构建期预渲染（SSG）**。

首版聚焦「个人技能展示」：技能矩阵、工作经历时间线、项目案例、关于我与联系方式。
内容取自 `cv/个人简历.md`，站点是简历里那个「个人主页」空缺项的落地。

线上地址：<https://hemiao.dev>

---

## 技术栈

| 层 | 选型 | 说明 |
|---|---|---|
| 框架 | Vue 3 + TypeScript | 与上游种子项目 `miaoapp` 的 `clients/web` 一致 |
| 构建 | Vite | —— |
| 预渲染 | `vite-ssg` | 构建期把每个路由渲染成静态 HTML |
| 路由 | `vue-router` | 多页模式，`vite-ssg` 依赖它 |
| UI | Naive UI | 只按需用 `NTimeline` / `NTag` / `NIcon` 等 |
| Head 管理 | `@unhead/vue` | 逐页 title / description / OG |
| 样式 | Sass | —— |

**为什么是 SSG 而不是 SPA 或全栈**：这个站点要挂在简历上被 HR 与同行打开，第一诉求是秒开、
能被搜索引擎收录、不用管服务器。技能展示是纯内容展示，不需要数据库与认证；为它背上
PostgreSQL + Redis + .NET 的运维成本不划算。完整论证见
[docs/2026-10-01-personal-site-design.md](docs/2026-10-01-personal-site-design.md)。

### 两处刻意锁定的版本

`package.json` 中有两个依赖**不是**最新版，都是有具体原因的：

| 依赖 | 锁定版本 | 原因 |
|---|---|---|
| `@unhead/vue` | `^2.1.17` | `vite-ssg` 28.x 内部依赖 `@unhead/vue ^2.1.2`。装 3.x 会产生两份 unhead 实例，`useHead` 写入的实例与 `vite-ssg` 读取的不是同一个，预渲染的 head 会失效 |
| `typescript` | `~6.0.3` | `typescript-eslint` 最新版（8.71.0）的 peer 范围是 `>=4.8.4 <6.1.0`，**不支持 TS 7**。`~6.0.3` 是落在该窗口内的最高版本 |

---

## 常用命令

```bash
pnpm install

pnpm dev          # 开发服务器（默认 5173）
pnpm build        # 类型检查 + vite-ssg 构建 + 预渲染
pnpm preview      # 本地预览构建产物
pnpm type-check   # vue-tsc 类型检查
pnpm lint         # ESLint（自动修复）
pnpm format       # Prettier
```

> 提交前请至少跑一次 `pnpm build`。预渲染的问题只在构建期暴露，`pnpm dev` 看不出来。

---

## 目录结构

```
hemiao.dev/
├── docs/                       # 设计与方案文档
├── public/                     # 静态资源（favicon、robots.txt、og-image）
├── src/
│   ├── main.ts                 # ViteSSG 入口：export const createApp
│   ├── App.vue                 # NConfigProvider（主题）+ RouterView
│   ├── app.config.ts           # 站点元信息（SEO / 页脚共用）
│   ├── theme/
│   │   ├── tokens.ts           # ★ 全站配色的唯一来源
│   │   └── index.ts            # 亮暗主题状态 + Naive UI themeOverrides
│   ├── contents/               # ★ 内容层：无头纯 TS，站点唯一数据源
│   ├── features/               # ★ 站点区块，一区块一目录、自包含
│   │   └── <name>/
│   │       ├── index.ts        # 导出 AppModule 描述符（路由 + 导航）
│   │       ├── logic/          # 无头逻辑（纯 TS，禁 import UI 库）
│   │       ├── components/     # 仅本区块使用的组件
│   │       └── views/          # 仅 UI（.vue）
│   ├── components/             # 跨区块共享组件
│   ├── composables/            # useSeo 等
│   ├── layouts/DefaultLayout.vue
│   ├── router/
│   │   ├── index.ts            # 只保留壳级路由（布局 + 根路径）
│   │   └── modules.ts          # import.meta.glob 自动发现
│   └── styles/
└── vite.config.ts
```

---

## 约定

本站对齐上游种子项目 `miaoapp` 的前端约定
（见 [giveback-module-conventions.md](../miaoapp/docs/architecture/giveback-module-conventions.md)），
但**有意省略了部分**，理由如下。

### 沿用的约定

- **一特性一目录、自包含**：`features/<name>/` 内含自己的路由、视图、组件、逻辑；
  改一个区块只动一个文件夹。
- **约定优于注册**：新增区块 = 新增一个文件夹，`router/modules.ts` 用 `import.meta.glob`
  自动收录，**不需要改任何中心路由表或导航配置**。
- **`logic/` 与 `views/` 分离**：`logic/` 是纯 TS，只依赖 `@/contents` 与 `vue` 的响应式 API，
  **禁止 import `naive-ui` / `.vue`**；`.vue` 只负责渲染与编排。ESLint 里有对应规则强制这一点。
- **命名空间前缀**（见下）。
- **代码风格**：Prettier —— 无分号、单引号、2 空格、100 列宽、`trailingComma: es5`。

### 有意省略的约定

| 种子约定 | 本站做法 | 原因 |
|---|---|---|
| `features/` + `app-features/` 双层分区 | 只用 `features/` | 双层是为「下游专属特性 vs 可反哺种子」而设；本站无上游种子，该语义不存在 |
| `AppModule` 完整契约（routes / menus / permissions / setup） | 只保留 `routes` + `nav` | 个人站没有菜单权限体系，全量契约是无谓的复杂度 |
| i18n 后端主导 | 前端本地（首版仅中文） | 无后端 |
| 生成物只读（`packages/api`） | 无 | 不调后端 API |

> 若日后决定整仓接入 `miaoapp` 种子走全栈：把个人专属内容从 `features/` 移到 `app-features/`，
> 并把 `contents/` 的读取换成 `@abp-native/api` 的调用即可，视图层不用动。

---

## 命名前缀

项目统一使用 **`hm`**（He Miao 的首字母，与域名 `hemiao.dev` 同源）。

**原则：只在真正全局的东西上加前缀。** 特性内部的样式走 SFC scoped，Vue 会用 `data-v-*`
隔离，再加前缀只是噪音。

| 作用域 | 前缀 | 示例 |
|---|---|---|
| CSS 自定义属性 | `--hm-` | `--hm-color-primary` |
| 全局工具类（`styles/main.scss`） | `hm-` | `.hm-btn`、`.hm-card`、`.hm-grid` |
| localStorage 键 | `hm:` | `hm:theme` |
| npm 作用域（若将来拆包） | `@hemiao/` | `@hemiao/shared` |
| 特性内 scoped 样式 | **不加** | `.hero__name` |

---

## 常见任务

### 换主题色

改 **`src/theme/tokens.ts`** 一个文件即可。它会被同时用于两处，不会各写一份：

1. `vite.config.ts` 把它渲染成 `:root` / `html.dark` 的 CSS 变量，注入每张 HTML 的 `<head>`
   （所以预渲染页面在没有 JS 时也是正确颜色）；
2. `src/theme/index.ts` 把它转成 Naive UI 的 `themeOverrides`。

文件顶部注释里备了青、靛紫、中性三套备选值。

### 新增一个页面区块

1. 新建 `src/features/<name>/index.ts`，默认导出一个 `AppModule`：

   ```ts
   import type { AppModule } from '@/router/types'

   const module: AppModule = {
     name: 'talks',
     order: 60,
     nav: { label: '分享', to: '/talks' },
     routes: [
       {
         path: 'talks',
         name: 'talks',
         component: () => import('./views/TalksView.vue'),
         meta: { title: '分享' },
       },
     ],
   }

   export default module
   ```

2. 补 `logic/` 与 `views/`。

**完成。** 路由与顶部导航都会自动出现，不需要改 `router/index.ts`、不需要改导航配置。

> 注意 `order` 决定导航顺序，`not-found` 用的是 999 以保证通配路由最后注册。

### 更新内容

内容全部集中在 `src/contents/`，是**无头纯 TS**，与 UI 完全解耦：

| 文件 | 对应简历章节 |
|---|---|
| `profile.ts` | 职业定位、基本信息、教育背景、自我评价 |
| `skills.ts` | 专业技能（5 个领域） |
| `experiences.ts` | 工作经历 |
| `projects.ts` | 项目经验 |

改数据即可，视图不用动。`projects.ts` 新增项目后，`/projects/:slug` 会自动被预渲染
（`vite.config.ts` 的 `includedRoutes` 直接从该文件派生），无需手工登记路由。

### 隐私红线

简历中的**手机号不上站**，`profile.contacts` 只保留邮箱与 GitHub。
若要提供简历 PDF 下载，请先脱敏。

---

## SEO

- 逐页 `title` / `description` / `canonical` / OG，由 `useSeo` 设置，预渲染时写进每张 HTML。
- 首页注入 JSON-LD `Person` 结构化数据，由 `vite.config.ts` 在构建期从 `contents/` 生成。
- `robots.txt` 与 sitemap。

## 部署

构建产物 `dist/` 是纯静态文件，可直接托管到 Cloudflare Pages / Vercel / Netlify：

- Build command: `pnpm build`
- Output directory: `dist`
- Node 版本：`>= 20`

绑定的域名用 **apex（`hemiao.dev`）**，`www` 做 301 跳转，避免重复内容。

> `.dev` 顶级域在浏览器 HSTS preload 列表中，**强制 HTTPS**。上述平台都会自动签发证书；
> 但如果在自有服务器上跑 HTTP 裸站会直接无法访问。
