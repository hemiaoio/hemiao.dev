<script setup lang="ts">
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import { ContrastOutline, MoonOutline, SunnyOutline } from '@vicons/ionicons5'
import { useTheme } from '@/theme'

const { mode, isDark, cycleMode } = useTheme()

const icon = computed(() => {
  if (mode.value === 'auto') return ContrastOutline
  return isDark.value ? MoonOutline : SunnyOutline
})

const label = computed(() => {
  if (mode.value === 'auto') return '跟随系统'
  return isDark.value ? '暗色' : '亮色'
})
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    :title="`主题：${label}（点击切换）`"
    :aria-label="`当前主题：${label}，点击切换`"
    @click="cycleMode()"
  >
    <NIcon :component="icon" size="18" />
  </button>
</template>

<style scoped lang="scss">
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid var(--hm-color-border);
  border-radius: var(--hm-radius-pill);
  background-color: transparent;
  color: var(--hm-color-text-secondary);
  cursor: pointer;
  transition:
    color var(--hm-transition),
    border-color var(--hm-transition),
    background-color var(--hm-transition);

  &:hover {
    color: var(--hm-color-primary);
    border-color: var(--hm-color-primary-border);
    background-color: var(--hm-color-primary-soft);
  }
}
</style>
