<script setup lang="ts">
import type { Project } from '@/contents'

defineProps<{
  project: Project
}>()
</script>

<template>
  <RouterLink class="hm-card hm-card--link project" :to="`/projects/${project.slug}`">
    <div class="project__head">
      <span class="hm-tag hm-tag--accent">{{ project.category }}</span>
      <span v-if="project.period" class="project__period">{{ project.period }}</span>
    </div>

    <h3 class="project__name">{{ project.name }}</h3>
    <p class="project__summary">{{ project.summary }}</p>

    <div class="hm-tag-list project__tech">
      <span v-for="tech in project.tech" :key="tech" class="hm-tag">{{ tech }}</span>
    </div>
  </RouterLink>
</template>

<style scoped lang="scss">
.project {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: var(--hm-color-text);

  &:hover {
    color: var(--hm-color-text);
  }
}

.project__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.project__period {
  font-family: var(--hm-font-mono);
  font-size: 12px;
  color: var(--hm-color-text-tertiary);
}

.project__name {
  margin-top: 14px;
  font-size: 17px;
}

.project__summary {
  margin-top: 10px;
  font-size: 14px;
  color: var(--hm-color-text-secondary);
}

.project__tech {
  margin-top: auto;
  padding-top: 20px;
}
</style>
