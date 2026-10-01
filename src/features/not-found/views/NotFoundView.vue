<script setup lang="ts">
import { useSeo } from '@/composables/useSeo'

useSeo({ title: '页面不存在', description: '没有找到这个页面。' })
</script>

<template>
  <section class="not-found">
    <div class="hm-container not-found__inner">
      <p class="not-found__code">404</p>
      <h1 class="not-found__title">这个页面不存在</h1>
      <p class="not-found__text">链接可能已经失效，或者地址输错了。</p>
      <div class="not-found__actions">
        <RouterLink class="hm-btn hm-btn--primary" to="/">回到首页</RouterLink>
        <RouterLink class="hm-btn" to="/projects">看看项目</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.not-found {
  display: flex;
  align-items: center;
  min-height: 60vh;
  padding-block: 72px;
}

.not-found__inner {
  text-align: center;
}

.not-found__code {
  font-family: var(--hm-font-mono);
  font-size: 64px;
  font-weight: 700;
  line-height: 1;
  color: var(--hm-color-primary);
  opacity: 0.25;
}

.not-found__title {
  margin-top: 20px;
  font-size: 26px;
}

.not-found__text {
  margin-top: 12px;
  color: var(--hm-color-text-secondary);
}

.not-found__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}
</style>
