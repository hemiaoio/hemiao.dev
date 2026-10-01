<script setup lang="ts">
import { computed } from 'vue'
import { NIcon } from 'naive-ui'
import { SparklesOutline } from '@vicons/ionicons5'
import type { SkillDomain } from '@/contents'
import { groupByProficiency } from '../logic/useSkills'

const props = defineProps<{
  domain: SkillDomain
  index: number
}>()

const groups = computed(() => groupByProficiency(props.domain.items))

const orderLabel = computed(() => String(props.index).padStart(2, '0'))
</script>

<template>
  <section :id="domain.key" class="domain">
    <header class="domain__head">
      <span class="domain__index" aria-hidden="true">{{ orderLabel }}</span>
      <div>
        <h2 class="domain__name">{{ domain.name }}</h2>
        <p class="domain__summary">{{ domain.summary }}</p>
      </div>
    </header>

    <div class="domain__groups">
      <div v-for="group in groups" :key="group.proficiency" class="group">
        <p class="group__label" :data-level="group.proficiency">
          {{ group.label }}
          <span class="group__count">{{ group.items.length }}</span>
        </p>
        <ul class="group__items">
          <li
            v-for="item in group.items"
            :key="item.name"
            class="skill"
            :class="{ 'skill--highlight': item.highlight }"
          >
            <span class="skill__name">
              <NIcon v-if="item.highlight" class="skill__star" :component="SparklesOutline" size="13" />
              {{ item.name }}
            </span>
            <span v-if="item.note" class="skill__note">{{ item.note }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.domain {
  scroll-margin-top: calc(var(--hm-header-height) + 16px);
  padding: 28px;
  border: 1px solid var(--hm-color-border);
  border-radius: var(--hm-radius-lg);
  background-color: var(--hm-color-bg-elevated);
}

.domain__head {
  display: flex;
  gap: 16px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--hm-color-border);
}

.domain__index {
  flex-shrink: 0;
  font-family: var(--hm-font-mono);
  font-size: 13px;
  color: var(--hm-color-primary);
  padding-top: 4px;
}

.domain__name {
  font-size: 19px;
}

.domain__summary {
  margin-top: 8px;
  font-size: 14px;
  color: var(--hm-color-text-secondary);
}

.domain__groups {
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding-top: 20px;
}

.group__label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--hm-color-text-tertiary);
}

.group__count {
  padding: 1px 6px;
  border-radius: var(--hm-radius-pill);
  background-color: var(--hm-color-bg-subtle);
  font-family: var(--hm-font-mono);
  font-size: 11.5px;
}

.group__items {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 20px;
}

.skill {
  padding: 10px 12px;
  border-radius: var(--hm-radius-md);
  background-color: var(--hm-color-bg-subtle);
}

.skill--highlight {
  background-color: var(--hm-color-primary-soft);
}

.skill__name {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 500;
  color: var(--hm-color-text);
}

.skill__star {
  flex-shrink: 0;
  color: var(--hm-color-primary);
}

.skill__note {
  display: block;
  margin-top: 4px;
  font-size: 12.5px;
  color: var(--hm-color-text-tertiary);
  line-height: 1.55;
}

@media (max-width: 720px) {
  .group__items {
    grid-template-columns: minmax(0, 1fr);
  }

  .domain {
    padding: 20px;
  }
}
</style>
