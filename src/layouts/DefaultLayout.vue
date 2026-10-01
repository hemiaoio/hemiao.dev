<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
</script>

<template>
  <div class="layout">
    <a class="skip-link" href="#main">跳到主要内容</a>
    <SiteHeader />
    <main id="main" class="layout__main" tabindex="-1">
      <RouterView />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout__main {
  flex: 1;
}

.skip-link {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 100;
  padding: 8px 14px;
  border-radius: var(--hm-radius-sm);
  background-color: var(--hm-color-primary);
  color: var(--hm-color-on-primary);
  transform: translateY(-200%);

  &:focus-visible {
    transform: translateY(0);
  }
}
</style>
