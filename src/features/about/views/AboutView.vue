<script setup lang="ts">
import { NIcon } from 'naive-ui'
import { MailOutline, LogoGithub, SchoolOutline, StarOutline } from '@vicons/ionicons5'
import PageHero from '@/components/PageHero.vue'
import { useSeo } from '@/composables/useSeo'
import { useAbout } from '../logic/useAbout'

useSeo({
  title: '关于我',
  description:
    '何苗，AI 应用软件工程师 / 高级后端与全栈开发工程师，上海交通大学计算机科学与技术本科，16 年软件开发经验，横跨 Java 与 .NET 两大技术栈。',
  path: '/about',
})

const { profile, contacts, highlights, summary, education, latestRole, domainCount } = useAbout()

function contactIcon(type: string) {
  return type === 'email' ? MailOutline : LogoGithub
}
</script>

<template>
  <div>
    <PageHero eyebrow="About" :title="profile.name" :description="profile.tagline">
      <div class="hm-tag-list">
        <span class="hm-tag hm-tag--accent">{{ profile.title }}</span>
        <span class="hm-tag">{{ profile.location }}</span>
        <span class="hm-tag">{{ profile.yearsOfExperience }} 年经验</span>
      </div>
    </PageHero>

    <section class="hm-section">
      <div class="hm-container">
        <ul class="hm-grid hm-grid--4">
          <li v-for="item in highlights" :key="item.label" class="stat">
            <p class="stat__label">{{ item.label }}</p>
            <p class="stat__value">{{ item.value }}</p>
            <p v-if="item.note" class="stat__note">{{ item.note }}</p>
          </li>
        </ul>
      </div>
    </section>

    <section class="hm-section hm-section--subtle">
      <div class="hm-container about-grid">
        <div class="block">
          <h2 class="block__title">
            <NIcon :component="StarOutline" size="18" />
            职业定位
          </h2>
          <ul class="points">
            <li v-for="line in summary" :key="line" class="points__item">{{ line }}</li>
          </ul>
        </div>

        <div class="side">
          <div class="block">
            <h2 class="block__title">
              <NIcon :component="SchoolOutline" size="18" />
              教育背景
            </h2>
            <p class="edu__school">
              <a :href="education.schoolUrl" target="_blank" rel="noopener noreferrer">
                {{ education.school }}
              </a>
            </p>
            <p class="edu__meta">{{ education.major }} · {{ education.degree }}</p>
            <div class="hm-tag-list edu__courses">
              <span v-for="course in education.courses" :key="course" class="hm-tag">{{ course }}</span>
            </div>
          </div>

          <div class="block">
            <h2 class="block__title">联系方式</h2>
            <ul class="contacts">
              <li v-for="contact in contacts" :key="contact.type" class="contact">
                <a class="contact__link" :href="contact.href" target="_blank" rel="noopener noreferrer">
                  <NIcon :component="contactIcon(contact.type)" size="17" />
                  <span>
                    <span class="contact__label">{{ contact.label }}</span>
                    <span class="contact__value">{{ contact.value }}</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="hm-section">
      <div class="hm-container">
        <div class="cta">
          <div>
            <h2 class="cta__title">想聊聊 AI 应用落地？</h2>
            <p class="cta__text">
              目前关注 AI 应用方向的机会。{{ latestRole }} 是我最近一段经历，技能投入分布在
              {{ domainCount }} 个方向，欢迎交流。
            </p>
          </div>
          <div class="cta__actions">
            <RouterLink class="hm-btn hm-btn--primary" to="/skills">看技能矩阵</RouterLink>
            <RouterLink class="hm-btn" to="/projects">看项目案例</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.stat {
  padding: 20px 22px;
  border: 1px solid var(--hm-color-border);
  border-radius: var(--hm-radius-lg);
  background-color: var(--hm-color-bg-elevated);
}

.stat__label {
  font-size: 13px;
  color: var(--hm-color-text-tertiary);
}

.stat__value {
  margin-top: 6px;
  font-size: 26px;
  font-weight: 700;
  line-height: 1.2;
  color: var(--hm-color-primary);
}

.stat__note {
  margin-top: 4px;
  font-size: 12.5px;
  color: var(--hm-color-text-tertiary);
}

.about-grid {
  display: grid;
  grid-template-columns: 1.35fr 1fr;
  gap: 32px;
  align-items: start;
}

.side {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.block {
  padding: 24px;
  border: 1px solid var(--hm-color-border);
  border-radius: var(--hm-radius-lg);
  background-color: var(--hm-color-bg-elevated);
}

.block__title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  font-size: 16px;
  color: var(--hm-color-text);
}

.points {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.points__item {
  position: relative;
  padding-left: 18px;
  font-size: 14.5px;
  color: var(--hm-color-text-secondary);
}

.points__item::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 2px;
  background-color: var(--hm-color-primary);
}

.edu__school {
  font-size: 15px;
  font-weight: 500;
}

.edu__meta {
  margin-top: 6px;
  font-size: 13.5px;
  color: var(--hm-color-text-secondary);
}

.edu__courses {
  margin-top: 14px;
}

.contacts {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact__link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border: 1px solid var(--hm-color-border);
  border-radius: var(--hm-radius-md);
  background-color: var(--hm-color-bg-subtle);
  color: var(--hm-color-text);

  &:hover {
    border-color: var(--hm-color-primary-border);
    background-color: var(--hm-color-primary-soft);
    color: var(--hm-color-text);
  }
}

.contact__label {
  display: block;
  font-size: 12px;
  color: var(--hm-color-text-tertiary);
}

.contact__value {
  display: block;
  font-size: 14px;
  font-family: var(--hm-font-mono);
}

.cta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 32px;
  border: 1px solid var(--hm-color-primary-border);
  border-radius: var(--hm-radius-lg);
  background-color: var(--hm-color-primary-soft);
}

.cta__title {
  font-size: 20px;
}

.cta__text {
  margin-top: 10px;
  max-width: 560px;
  font-size: 14.5px;
  color: var(--hm-color-text-secondary);
}

.cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 860px) {
  .about-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
