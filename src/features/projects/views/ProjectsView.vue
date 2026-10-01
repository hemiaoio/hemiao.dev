<script setup lang="ts">
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import ProjectCard from '../components/ProjectCard.vue'
import { useProjects } from '../logic/useProjects'

useSeo({
  title: '项目案例',
  description:
    '何苗参与的项目案例：AI 试穿换脸电商平台、Solab.ai AI 问答应用、NewsBang（Zetik）应用后台与运营平台、进销存系统、地产 ERP，涵盖 AI 应用、.NET 微服务、Spring 后台与企业系统。',
  path: '/projects',
})

const { categories, activeCategory, list, setCategory, total } = useProjects()
</script>

<template>
  <div>
    <PageHero
      eyebrow="Projects"
      title="项目案例"
      description="按方向整理的代表项目，每个项目都标注了技术栈与个人负责的具体部分。"
    >
      <p class="count">共 {{ total }} 个项目</p>
    </PageHero>

    <section class="hm-section">
      <div class="hm-container">
        <div class="filters" role="tablist" aria-label="按方向筛选项目">
          <button
            v-for="category in categories"
            :key="category"
            class="filter"
            :class="{ 'filter--active': activeCategory === category }"
            type="button"
            role="tab"
            :aria-selected="activeCategory === category"
            @click="setCategory(category)"
          >
            {{ category }}
          </button>
        </div>

        <ul class="hm-grid hm-grid--2 list">
          <li v-for="project in list" :key="project.slug">
            <ProjectCard :project="project" />
          </li>
        </ul>

        <p v-if="!list.length" class="empty">该方向下暂无项目。</p>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.count {
  font-family: var(--hm-font-mono);
  font-size: 13.5px;
  color: var(--hm-color-text-tertiary);
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 28px;
}

.filter {
  padding: 7px 16px;
  border: 1px solid var(--hm-color-border);
  border-radius: var(--hm-radius-pill);
  background-color: transparent;
  color: var(--hm-color-text-secondary);
  font-size: 14px;
  cursor: pointer;
  transition:
    color var(--hm-transition),
    border-color var(--hm-transition),
    background-color var(--hm-transition);
}

.filter:hover {
  color: var(--hm-color-text);
  border-color: var(--hm-color-border-strong);
}

.filter--active {
  border-color: transparent;
  background-color: var(--hm-color-primary);
  color: var(--hm-color-on-primary);
}

.filter--active:hover {
  color: var(--hm-color-on-primary);
  border-color: transparent;
}

.list > li {
  display: flex;
}

.empty {
  padding: 40px 0;
  text-align: center;
  color: var(--hm-color-text-tertiary);
}
</style>
