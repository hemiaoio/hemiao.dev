<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { NIcon } from 'naive-ui'
import { ArrowBackOutline } from '@vicons/ionicons5'
import ProjectCard from '../components/ProjectCard.vue'
import { useSeo } from '@/composables/useSeo'
import { useProjectDetail } from '../logic/useProjects'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const { current, more } = useProjectDetail(slug)

// 用 getter 传入：slug 变化时组件实例复用、setup 不重跑，静态值会导致标题不更新
useSeo({
  title: () => current.value?.name ?? '项目详情',
  description: () => current.value?.summary,
  path: () => `/projects/${slug.value}`,
  type: 'article',
})
</script>

<template>
  <div>
    <template v-if="current">
      <section class="detail-hero">
        <div class="hm-container">
          <RouterLink class="back" to="/projects">
            <NIcon :component="ArrowBackOutline" size="15" />
            全部项目
          </RouterLink>

          <div class="detail-hero__meta">
            <span class="hm-tag hm-tag--accent">{{ current.category }}</span>
            <span v-if="current.period" class="detail-hero__period">{{ current.period }}</span>
          </div>

          <h1 class="detail-hero__title">{{ current.name }}</h1>
          <p class="detail-hero__summary">{{ current.summary }}</p>
        </div>
      </section>

      <section class="hm-section">
        <div class="hm-container detail">
          <div class="detail__main">
            <h2 class="detail__heading">我负责的部分</h2>
            <ul class="points">
              <li v-for="item in current.highlights" :key="item" class="points__item">
                {{ item }}
              </li>
            </ul>
          </div>

          <aside class="detail__side">
            <div class="side-block">
              <h2 class="side-block__title">技术栈</h2>
              <div class="hm-tag-list">
                <span v-for="tech in current.tech" :key="tech" class="hm-tag">{{ tech }}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section v-if="more.length" class="hm-section hm-section--subtle">
        <div class="hm-container">
          <h2 class="more__title">其他项目</h2>
          <ul class="hm-grid hm-grid--3">
            <li v-for="project in more" :key="project.slug">
              <ProjectCard :project="project" />
            </li>
          </ul>
        </div>
      </section>
    </template>

    <section v-else class="hm-section">
      <div class="hm-container missing">
        <h1 class="missing__title">没有找到这个项目</h1>
        <p class="missing__text">它可能已经被重命名或移除。</p>
        <RouterLink class="hm-btn hm-btn--primary" to="/projects">返回项目列表</RouterLink>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.detail-hero {
  padding-block: 40px 44px;
  border-bottom: 1px solid var(--hm-color-border);
  background-color: var(--hm-color-bg-subtle);
}

.back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.detail-hero__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
}

.detail-hero__period {
  font-family: var(--hm-font-mono);
  font-size: 13px;
  color: var(--hm-color-text-tertiary);
}

.detail-hero__title {
  margin-top: 16px;
  font-size: 32px;
  letter-spacing: -0.01em;
}

.detail-hero__summary {
  margin-top: 16px;
  max-width: 760px;
  font-size: 16px;
  color: var(--hm-color-text-secondary);
}

.detail {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 40px;
  align-items: start;
}

.detail__heading {
  font-size: 19px;
  margin-bottom: 18px;
}

.points {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.points__item {
  position: relative;
  padding-left: 20px;
  font-size: 15px;
  color: var(--hm-color-text-secondary);
  line-height: 1.75;
}

.points__item::before {
  content: '';
  position: absolute;
  top: 11px;
  left: 0;
  width: 7px;
  height: 7px;
  border-radius: 2px;
  background-color: var(--hm-color-primary);
}

.side-block {
  padding: 22px;
  border: 1px solid var(--hm-color-border);
  border-radius: var(--hm-radius-lg);
  background-color: var(--hm-color-bg-elevated);
}

.side-block__title {
  margin-bottom: 14px;
  font-size: 15px;
}

.more__title {
  margin-bottom: 24px;
  font-size: 22px;
}

.missing {
  padding-block: 64px;
  text-align: center;
}

.missing__title {
  font-size: 24px;
}

.missing__text {
  margin: 12px 0 26px;
  color: var(--hm-color-text-secondary);
}

@media (max-width: 860px) {
  .detail {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
  }

  .detail-hero__title {
    font-size: 24px;
  }
}
</style>
