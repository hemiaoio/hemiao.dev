<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { ArrowForwardOutline, MailOutline } from '@vicons/ionicons5'
import { useSeo } from '@/composables/useSeo'
import { useHome } from '../logic/useHome'

useSeo({ path: '/' })

const { profile, highlights, skillOverview, featured } = useHome()

const email = profile.contacts.find((contact) => contact.type === 'email')
</script>

<template>
  <div class="home">
    <section class="hero">
      <div class="hm-container">
        <p class="hero__eyebrow">
          {{ profile.location }} · {{ profile.yearsOfExperience }} 年软件开发经验
        </p>
        <h1 class="hero__name">
          {{ profile.name }}
          <span class="hero__latin">{{ profile.latinName }}</span>
        </h1>
        <p class="hero__title">{{ profile.title }}</p>
        <p class="hero__tagline">{{ profile.tagline }}</p>

        <div class="hero__actions">
          <RouterLink class="hm-btn hm-btn--primary" to="/skills">
            查看技能矩阵
            <NIcon :component="ArrowForwardOutline" size="16" />
          </RouterLink>
          <RouterLink class="hm-btn" to="/projects">浏览项目案例</RouterLink>
        </div>
      </div>
    </section>

    <section class="hm-section">
      <div class="hm-container">
        <ul class="hm-grid hm-grid--4 metrics">
          <li v-for="item in highlights" :key="item.label" class="metric">
            <p class="metric__label">{{ item.label }}</p>
            <p class="metric__value">{{ item.value }}</p>
            <p v-if="item.note" class="metric__note">{{ item.note }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="hm-section hm-section--subtle">
      <div class="hm-container">
        <div class="section-head">
          <div>
            <h2 class="section-head__title">能力概览</h2>
            <p class="section-head__subtitle">
              五条主线的能力分布，完整清单与熟练度分级见技能矩阵。
            </p>
          </div>
          <RouterLink class="section-head__more" to="/skills">
            全部技能
            <NIcon :component="ArrowForwardOutline" size="14" />
          </RouterLink>
        </div>

        <ul class="hm-grid hm-grid--3">
          <li v-for="domain in skillOverview" :key="domain.key">
            <RouterLink class="hm-card hm-card--link domain" :to="`/skills#${domain.key}`">
              <h3 class="domain__name">{{ domain.name }}</h3>
              <p class="domain__summary">{{ domain.summary }}</p>
              <ul class="domain__list">
                <li v-for="name in domain.highlights" :key="name" class="domain__item">{{ name }}</li>
              </ul>
              <p class="domain__count">共 {{ domain.total }} 项</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="hm-section">
      <div class="hm-container">
        <div class="section-head">
          <div>
            <h2 class="section-head__title">精选项目</h2>
            <p class="section-head__subtitle">AI 应用、.NET 微服务与 Spring 后台方向的代表案例。</p>
          </div>
          <RouterLink class="section-head__more" to="/projects">
            全部项目
            <NIcon :component="ArrowForwardOutline" size="14" />
          </RouterLink>
        </div>

        <ul class="hm-grid hm-grid--3">
          <li v-for="project in featured" :key="project.slug">
            <RouterLink class="hm-card hm-card--link project" :to="`/projects/${project.slug}`">
              <span class="hm-tag hm-tag--accent">{{ project.category }}</span>
              <h3 class="project__name">{{ project.name }}</h3>
              <p class="project__summary">{{ project.summary }}</p>
              <div class="hm-tag-list project__tech">
                <span v-for="tech in project.tech.slice(0, 3)" :key="tech" class="hm-tag">
                  {{ tech }}
                </span>
              </div>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <section class="hm-section hm-section--subtle">
      <div class="hm-container contact">
        <h2 class="contact__title">聊一聊 AI 应用落地，或看看能不能一起做事</h2>
        <p class="contact__text">
          目前关注 AI 应用方向的机会，也乐意交流大模型接入、RAG / Agent 与后端架构相关的话题。
        </p>
        <div class="contact__actions">
          <a v-if="email" class="hm-btn hm-btn--primary" :href="email.href">
            <NIcon :component="MailOutline" size="16" />
            {{ email.value }}
          </a>
          <RouterLink class="hm-btn" to="/about">关于我</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.hero {
  padding-block: 84px 64px;
  border-bottom: 1px solid var(--hm-color-border);
  background:
    radial-gradient(
      90% 120% at 85% 0%,
      color-mix(in srgb, var(--hm-color-primary) 10%, transparent) 0%,
      transparent 60%
    ),
    var(--hm-color-bg);
}

.hero__eyebrow {
  font-size: 14px;
  color: var(--hm-color-text-tertiary);
}

.hero__name {
  margin-top: 14px;
  font-size: 46px;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.hero__latin {
  margin-left: 10px;
  font-size: 20px;
  font-weight: 500;
  color: var(--hm-color-text-tertiary);
  letter-spacing: 0.02em;
}

.hero__title {
  margin-top: 12px;
  font-size: 18px;
  font-weight: 500;
  color: var(--hm-color-primary);
}

.hero__tagline {
  margin-top: 18px;
  max-width: 640px;
  font-size: 17px;
  color: var(--hm-color-text-secondary);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.section-head {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
}

.section-head__title {
  font-size: 24px;
}

.section-head__subtitle {
  margin-top: 8px;
  max-width: 560px;
  font-size: 15px;
  color: var(--hm-color-text-secondary);
}

.section-head__more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
}

.metrics {
  padding: 0;
}

.metric {
  padding: 20px 22px;
  border: 1px solid var(--hm-color-border);
  border-radius: var(--hm-radius-lg);
  background-color: var(--hm-color-bg-elevated);
}

.metric__label {
  font-size: 13px;
  color: var(--hm-color-text-tertiary);
}

.metric__value {
  margin-top: 6px;
  font-size: 28px;
  font-weight: 700;
  color: var(--hm-color-primary);
  line-height: 1.2;
}

.metric__note {
  margin-top: 4px;
  font-size: 12.5px;
  color: var(--hm-color-text-tertiary);
}

.domain {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--hm-color-text);

  &:hover {
    color: var(--hm-color-text);
  }
}

.domain__name {
  font-size: 17px;
}

.domain__summary {
  margin-top: 10px;
  font-size: 14px;
  color: var(--hm-color-text-secondary);
}

.domain__list {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.domain__item {
  position: relative;
  padding-left: 14px;
  font-size: 13.5px;
  color: var(--hm-color-text-secondary);

  &::before {
    content: '';
    position: absolute;
    top: 9px;
    left: 0;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: var(--hm-color-primary);
  }
}

.domain__count {
  margin-top: auto;
  padding-top: 16px;
  font-size: 12.5px;
  color: var(--hm-color-text-tertiary);
}

.project {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--hm-color-text);

  &:hover {
    color: var(--hm-color-text);
  }
}

.project__name {
  margin-top: 12px;
  font-size: 17px;
}

.project__summary {
  margin-top: 10px;
  font-size: 14px;
  color: var(--hm-color-text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project__tech {
  margin-top: auto;
  padding-top: 18px;
}

.contact {
  text-align: center;
}

.contact__title {
  font-size: 26px;
}

.contact__text {
  margin-top: 12px;
  color: var(--hm-color-text-secondary);
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 28px;
}

@media (max-width: 640px) {
  .hero {
    padding-block: 56px 44px;
  }

  .hero__name {
    font-size: 32px;
  }

  .hero__latin {
    display: block;
    margin: 6px 0 0;
    font-size: 16px;
  }

  .hero__tagline {
    font-size: 15.5px;
  }

  .contact__title {
    font-size: 21px;
  }
}
</style>
