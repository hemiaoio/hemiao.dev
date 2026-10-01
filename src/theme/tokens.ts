/**
 * 主题令牌 —— 全站配色的唯一来源（single source of truth）。
 *
 * 想换整站色调，只改这一个文件即可：
 *   1. vite.config.ts 会把它渲染成 :root / html.dark 上的 CSS 变量注入 HTML
 *   2. src/theme/index.ts 会把它转成 Naive UI 的 themeOverrides
 * 因此 CSS 与组件库两侧永远一致，不会各写一份。
 */

export interface ThemePalette {
  /** 主色，全站唯一品牌色 */
  primary: string
  /** 悬停态（比主色略亮） */
  primaryHover: string
  /** 按下态（比主色略暗） */
  primaryPressed: string
  /** 极浅底色，用于标签、图标底衬 */
  primarySoft: string
  /** 主色的浅描边 */
  primaryBorder: string
  /** 主色上的文字色 */
  onPrimary: string
}

export interface ThemeTokens {
  light: ThemePalette
  dark: ThemePalette
}

/**
 * 冷色系（蓝）—— 贴合「AI 应用工程师」的技术感。
 * 备选方案（改这里即可切换）：
 *   青   primary: #0F766E / hover: #14B8A6 / pressed: #115E59 / soft: #ECFDF5 / border: #A7F3D0
 *   靛紫 primary: #4F46E5 / hover: #6366F1 / pressed: #4338CA / soft: #EEF2FF / border: #C7D2FE
 *   中性 primary: #334155 / hover: #475569 / pressed: #1E293B / soft: #F1F5F9 / border: #CBD5E1
 */
export const themeTokens: ThemeTokens = {
  light: {
    primary: '#2563EB',
    primaryHover: '#3B82F6',
    primaryPressed: '#1D4ED8',
    primarySoft: '#EFF4FF',
    primaryBorder: '#BFD3FA',
    onPrimary: '#FFFFFF',
  },
  dark: {
    primary: '#60A5FA',
    primaryHover: '#93C5FD',
    primaryPressed: '#3B82F6',
    primarySoft: '#16233A',
    primaryBorder: '#2B4470',
    onPrimary: '#06101F',
  },
}

/** 渲染成可注入 HTML 的 CSS 变量块（浅色 + 暗色两套） */
export function themeTokensToCssVars(tokens: ThemeTokens): string {
  const toVars = (p: ThemePalette): string =>
    [
      `--hm-color-primary:${p.primary};`,
      `--hm-color-primary-hover:${p.primaryHover};`,
      `--hm-color-primary-pressed:${p.primaryPressed};`,
      `--hm-color-primary-soft:${p.primarySoft};`,
      `--hm-color-primary-border:${p.primaryBorder};`,
      `--hm-color-on-primary:${p.onPrimary};`,
    ].join('')

  return `:root{${toVars(tokens.light)}}html.dark{${toVars(tokens.dark)}}`
}
