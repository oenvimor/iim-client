export default {
  path: '/settings',
  name: 'settings',
  redirect: '/settings/detail',
  component: () => import('@/views/setting/layout.vue'),
  children: [
    {
      path: '/settings/detail',
      meta: { requiresAuth: true },
      component: () => import('@/views/setting/detail.vue'),
    },
    {
      path: '/settings/security',
      meta: { requiresAuth: true },
      component: () => import('@/views/setting/security.vue'),
    },
    {
      path: '/settings/personalize',
      meta: { requiresAuth: true },
      component: () => import('@/views/setting/personalize.vue'),
    },
    {
      path: '/settings/notification',
      meta: { requiresAuth: true },
      component: () => import('@/views/setting/notification.vue'),
    },
  ],
}
