<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'
import { navItems } from '@/router/modules'
import { siteConfig } from '@/app.config'

const route = useRoute()
const menuOpen = ref(false)

/** 不依赖 vue-router 的 active class：'/' 作为前缀会命中所有路由，这里显式判断 */
function isActive(to: string): boolean {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

const currentPath = computed(() => route.fullPath)

watch(currentPath, () => {
  menuOpen.value = false
})
</script>

<template>
  <header class="header">
    <div class="hm-container header__inner">
      <RouterLink to="/" class="brand" :aria-label="`返回首页 · ${siteConfig.author}`">
        <img class="brand__mark" src="/favicon.svg" alt="" width="28" height="28" />
        <span class="brand__text">{{ siteConfig.siteName }}</span>
      </RouterLink>

      <nav class="nav" aria-label="主导航">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav__link"
          :class="{ 'nav__link--active': isActive(item.to) }"
          :aria-current="isActive(item.to) ? 'page' : undefined"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="header__actions">
        <ThemeToggle />
        <button
          class="menu-button"
          type="button"
          :aria-expanded="menuOpen"
          aria-controls="mobile-nav"
          :aria-label="menuOpen ? '收起导航菜单' : '展开导航菜单'"
          @click="menuOpen = !menuOpen"
        >
          <span class="menu-button__bar" :class="{ 'menu-button__bar--open': menuOpen }" />
          <span class="menu-button__bar" :class="{ 'menu-button__bar--open': menuOpen }" />
        </button>
      </div>
    </div>

    <nav v-show="menuOpen" id="mobile-nav" class="mobile-nav" aria-label="移动端导航">
      <div class="hm-container mobile-nav__inner">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="mobile-nav__link"
          :class="{ 'mobile-nav__link--active': isActive(item.to) }"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: color-mix(in srgb, var(--hm-color-bg) 88%, transparent);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--hm-color-border);
}

.header__inner {
  display: flex;
  align-items: center;
  gap: 16px;
  height: var(--hm-header-height);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--hm-color-text);
  font-weight: 600;
  letter-spacing: 0.01em;

  &:hover {
    color: var(--hm-color-text);
  }
}

.brand__mark {
  border-radius: 7px;
}

.brand__text {
  font-size: 15px;
}

.nav {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.nav__link {
  padding: 7px 12px;
  border-radius: var(--hm-radius-sm);
  color: var(--hm-color-text-secondary);
  font-size: 14px;
  transition:
    color var(--hm-transition),
    background-color var(--hm-transition);

  &:hover {
    color: var(--hm-color-text);
    background-color: var(--hm-color-bg-subtle);
  }
}

.nav__link--active {
  color: var(--hm-color-primary);
  background-color: var(--hm-color-primary-soft);
}

.header__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 4px;
}

.menu-button {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid var(--hm-color-border);
  border-radius: var(--hm-radius-pill);
  background-color: transparent;
  cursor: pointer;
}

.menu-button__bar {
  width: 15px;
  height: 1.5px;
  border-radius: 2px;
  background-color: var(--hm-color-text-secondary);
  transition: transform var(--hm-transition);
}

.menu-button__bar--open:first-child {
  transform: translateY(3.25px) rotate(45deg);
}

.menu-button__bar--open:last-child {
  transform: translateY(-3.25px) rotate(-45deg);
}

.mobile-nav {
  border-top: 1px solid var(--hm-color-border);
  background-color: var(--hm-color-bg);
}

.mobile-nav__inner {
  display: flex;
  flex-direction: column;
  padding-block: 8px;
}

.mobile-nav__link {
  padding: 11px 12px;
  border-radius: var(--hm-radius-sm);
  color: var(--hm-color-text-secondary);
  font-size: 15px;

  &:hover {
    background-color: var(--hm-color-bg-subtle);
    color: var(--hm-color-text);
  }
}

.mobile-nav__link--active {
  color: var(--hm-color-primary);
  background-color: var(--hm-color-primary-soft);
}

@media (max-width: 720px) {
  .nav {
    display: none;
  }

  .menu-button {
    display: inline-flex;
  }

  .header__actions {
    margin-left: auto;
  }
}
</style>
