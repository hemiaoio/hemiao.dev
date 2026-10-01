import { computed, readonly, ref } from 'vue'
import { darkTheme, type GlobalTheme, type GlobalThemeOverrides } from 'naive-ui'
import { themeTokens, type ThemePalette } from './tokens'

/** 与 index.html 内联防闪烁脚本中的键名必须保持一致 */
export const THEME_STORAGE_KEY = 'hm:theme'

export type ThemeMode = 'light' | 'dark' | 'auto'

const isBrowser = typeof window !== 'undefined'

const mode = ref<ThemeMode>('auto')
const prefersDark = ref(false)
const isDark = ref(false)

function resolveDark(): boolean {
  if (mode.value === 'dark') return true
  if (mode.value === 'light') return false
  return prefersDark.value
}

function apply(next: boolean): void {
  isDark.value = next
  if (!isBrowser) return
  const el = document.documentElement
  el.classList.toggle('dark', next)
  el.style.colorScheme = next ? 'dark' : 'light'
}

/**
 * 客户端在模块求值时（早于 app.mount）同步初始化。
 * 直接读取 DOM 上已由内联脚本打好的 class，而不是自己再算一遍 ——
 * 保证「首屏渲染」与「预渲染 HTML」用的是同一个主题，不会出现 hydration 后闪一下。
 */
if (isBrowser) {
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  prefersDark.value = mq.matches

  const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
  mode.value = saved === 'dark' || saved === 'light' ? saved : 'auto'

  isDark.value = document.documentElement.classList.contains('dark')

  mq.addEventListener('change', (event) => {
    prefersDark.value = event.matches
    if (mode.value === 'auto') apply(resolveDark())
  })
}

function setMode(next: ThemeMode): void {
  mode.value = next
  if (isBrowser) {
    if (next === 'auto') window.localStorage.removeItem(THEME_STORAGE_KEY)
    else window.localStorage.setItem(THEME_STORAGE_KEY, next)
  }
  apply(resolveDark())
}

/** 在 亮 / 暗 / 跟随系统 之间轮换 */
function cycleMode(): ThemeMode {
  const order: ThemeMode[] = ['auto', 'light', 'dark']
  const next = order[(order.indexOf(mode.value) + 1) % order.length]
  setMode(next)
  return next
}

function buildOverrides(palette: ThemePalette): GlobalThemeOverrides {
  return {
    common: {
      primaryColor: palette.primary,
      primaryColorHover: palette.primaryHover,
      primaryColorPressed: palette.primaryPressed,
      primaryColorSuppl: palette.primaryHover,
      borderRadius: '10px',
      borderRadiusSmall: '6px',
      fontFamily:
        "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    },
  }
}

const naiveTheme = computed<GlobalTheme | null>(() => (isDark.value ? darkTheme : null))
const naiveThemeOverrides = computed<GlobalThemeOverrides>(() =>
  buildOverrides(isDark.value ? themeTokens.dark : themeTokens.light)
)

export function useTheme() {
  return {
    mode: readonly(mode),
    isDark: readonly(isDark),
    naiveTheme,
    naiveThemeOverrides,
    setMode,
    cycleMode,
  }
}
