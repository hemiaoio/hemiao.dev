import type { AppModule } from '@/router/types'

const experienceModule: AppModule = {
  name: 'experience',
  order: 30,
  nav: { label: '经历', to: '/experience' },
  routes: [
    {
      path: 'experience',
      name: 'experience',
      component: () => import('./views/ExperienceView.vue'),
      meta: { title: '工作经历' },
    },
  ],
}

export default experienceModule
