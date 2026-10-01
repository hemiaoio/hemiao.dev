import type { AppModule } from '@/router/types'

const skillsModule: AppModule = {
  name: 'skills',
  order: 20,
  nav: { label: '技能', to: '/skills' },
  routes: [
    {
      path: 'skills',
      name: 'skills',
      component: () => import('./views/SkillsView.vue'),
      meta: { title: '技能矩阵' },
    },
  ],
}

export default skillsModule
