<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { useTheme } from '@/theme'

const { naiveTheme, naiveThemeOverrides } = useTheme()
</script>

<template>
  <NConfigProvider :theme="naiveTheme" :theme-overrides="naiveThemeOverrides">
    <RouterView />
  </NConfigProvider>
</template>
