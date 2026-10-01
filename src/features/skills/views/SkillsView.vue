<script setup lang="ts">
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import SkillDomainCard from '../components/SkillDomainCard.vue'
import { useSkills } from '../logic/useSkills'

useSeo({
  title: '技能矩阵',
  description:
    '何苗的技能矩阵：AI 应用开发、Java 技术栈、.NET 技术栈、前端全栈（Vue）与工程化运维五大方向，按精通 / 熟练 / 熟悉三级呈现。',
  path: '/skills',
})

const { domains, totalSkills, legend } = useSkills()
</script>

<template>
  <div>
    <PageHero
      eyebrow="Skill Matrix"
      title="技能矩阵"
      description="覆盖 AI 应用、Java、.NET、前端全栈与工程化运维五个方向。熟练度沿用简历原文用词，不做主观百分比换算。"
    >
      <ul class="legend">
        <li v-for="item in legend" :key="item.proficiency" class="legend__item">
          <span class="legend__dot" :data-level="item.proficiency" aria-hidden="true" />
          <span class="legend__label">{{ item.label }}</span>
          <span class="legend__count">{{ item.count }} 项</span>
        </li>
        <li class="legend__item legend__item--total">共 {{ totalSkills }} 项</li>
      </ul>
    </PageHero>

    <section class="hm-section">
      <div class="hm-container">
        <div class="domains">
          <SkillDomainCard
            v-for="(domain, i) in domains"
            :key="domain.key"
            :domain="domain"
            :index="i + 1"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 22px;
}

.legend__item {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 13.5px;
  color: var(--hm-color-text-secondary);
}

.legend__item--total {
  padding-left: 22px;
  border-left: 1px solid var(--hm-color-border);
  color: var(--hm-color-text-tertiary);
}

.legend__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--hm-color-primary);
}

.legend__dot[data-level='proficient'] {
  background-color: color-mix(in srgb, var(--hm-color-primary) 55%, transparent);
}

.legend__dot[data-level='familiar'] {
  background-color: var(--hm-color-border-strong);
}

.legend__count {
  font-family: var(--hm-font-mono);
  font-size: 12px;
  color: var(--hm-color-text-tertiary);
}

.domains {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 640px) {
  .legend__item--total {
    padding-left: 0;
    border-left: none;
  }
}
</style>
