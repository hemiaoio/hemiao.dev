<script setup lang="ts">
import { siteConfig } from '@/app.config'
import { profile } from '@/contents'

const year = new Date().getFullYear()
const email = profile.contacts.find((contact) => contact.type === 'email')
const github = profile.contacts.find((contact) => contact.type === 'github')
</script>

<template>
  <footer class="footer">
    <div class="hm-container footer__inner">
      <div class="footer__left">
        <p class="footer__name">{{ profile.name }} · {{ profile.title }}</p>
        <p class="footer__meta">
          © {{ siteConfig.since }}–{{ year }} {{ siteConfig.siteName }} · Built with Vue 3 + Vite SSG
        </p>
      </div>

      <ul class="footer__links">
        <li v-if="email">
          <a :href="email.href">{{ email.value }}</a>
        </li>
        <li v-if="github">
          <a :href="github.href" target="_blank" rel="noopener noreferrer">{{ github.value }}</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  border-top: 1px solid var(--hm-color-border);
  background-color: var(--hm-color-bg-subtle);
}

.footer__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-block: 32px;
}

.footer__name {
  font-size: 14px;
  color: var(--hm-color-text-secondary);
}

.footer__meta {
  margin-top: 4px;
  font-size: 13px;
  color: var(--hm-color-text-tertiary);
}

.footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 14px;
}

@media (max-width: 640px) {
  .footer__inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
