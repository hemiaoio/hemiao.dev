import type { AppModule } from '@/router/types'

const projectsModule: AppModule = {
  name: 'projects',
  order: 40,
  nav: { label: '项目', to: '/projects' },
  routes: [
    {
      path: 'projects',
      name: 'projects',
      component: () => import('./views/ProjectsView.vue'),
      meta: { title: '项目案例' },
    },
    {
      path: 'projects/:slug',
      name: 'project-detail',
      component: () => import('./views/ProjectDetailView.vue'),
      meta: { title: '项目详情' },
    },
  ],
}

export default projectsModule
