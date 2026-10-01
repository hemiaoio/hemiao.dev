<script setup lang="ts">
import { NTimeline, NTimelineItem } from 'naive-ui'
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { useExperience } from '../logic/useExperience'

useSeo({
  title: '工作经历',
  description:
    '何苗的工作经历：上海盛大网络（2019–2026，AI 智能新闻产品 NewsBang / Zetik）、上海有求网络（2013–2018，地产 ERP 全栈）、上海道齐医药（2011–2013）。',
  path: '/experience',
})

const { items, careerSpan, companyCount } = useExperience()
</script>

<template>
  <div>
    <PageHero
      eyebrow="Experience"
      title="工作经历"
      description="从传统 Web 到现代企业级架构，再到 AI 应用落地。下面是完整的时间线，量化成果均来自实际业务数据。"
    >
      <p class="stat">{{ companyCount }} 家公司 · {{ careerSpan }}</p>
    </PageHero>

    <section class="hm-section">
      <div class="hm-container">
        <NTimeline :icon-size="13">
          <NTimelineItem
            v-for="(exp, i) in items"
            :key="exp.company"
            :type="i === 0 ? 'success' : 'default'"
            line-type="dashed"
            :time="`${exp.start} – ${exp.end}`"
            :title="exp.company"
          >
            <article class="exp">
              <p class="exp__role">{{ exp.role }}</p>
              <p v-if="exp.companyIntro" class="exp__intro">{{ exp.companyIntro }}</p>

              <ul class="exp__duties">
                <li v-for="duty in exp.duties" :key="duty" class="exp__duty">{{ duty }}</li>
              </ul>

              <ul v-if="exp.metrics?.length" class="exp__metrics">
                <li v-for="metric in exp.metrics" :key="metric.label" class="metric">
                  <span class="metric__value">{{ metric.value }}</span>
                  <span class="metric__label">{{ metric.label }}</span>
                </li>
              </ul>

              <div class="hm-tag-list exp__tech">
                <span v-for="tech in exp.tech" :key="tech" class="hm-tag">{{ tech }}</span>
              </div>
            </article>
          </NTimelineItem>
        </NTimeline>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.stat {
  font-family: var(--hm-font-mono);
  font-size: 13.5px;
  color: var(--hm-color-text-tertiary);
}

.exp {
  padding: 4px 0 20px;
}

.exp__role {
  font-size: 15px;
  font-weight: 500;
  color: var(--hm-color-primary);
}

.exp__intro {
  margin-top: 10px;
  padding: 12px 14px;
  border-left: 2px solid var(--hm-color-primary-border);
  background-color: var(--hm-color-bg-subtle);
  border-radius: 0 var(--hm-radius-sm) var(--hm-radius-sm) 0;
  font-size: 13.5px;
  color: var(--hm-color-text-secondary);
}

.exp__duties {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-top: 16px;
}

.exp__duty {
  position: relative;
  padding-left: 16px;
  font-size: 14.5px;
  color: var(--hm-color-text-secondary);
}

.exp__duty::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 0;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--hm-color-border-strong);
}

.exp__metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 10px 14px;
  border: 1px solid var(--hm-color-border);
  border-radius: var(--hm-radius-md);
  background-color: var(--hm-color-bg-elevated);
}

.metric__value {
  font-size: 18px;
  font-weight: 600;
  color: var(--hm-color-primary);
  line-height: 1.2;
}

.metric__label {
  font-size: 12px;
  color: var(--hm-color-text-tertiary);
}

.exp__tech {
  margin-top: 18px;
}

@media (max-width: 640px) {
  .metric {
    flex: 1 1 calc(50% - 5px);
  }
}
</style>
