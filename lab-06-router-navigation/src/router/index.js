import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
  { path: '/catalog', name: 'Catalog', component: () => import('../views/CatalogView.vue') },
  { path: '/catalog/:id', name: 'ProductDetails', component: () => import('../views/ProductDetailsView.vue') },
  {
    path: '/profile',
    component: () => import('../views/ProfileView.vue'),
    children: [
      { path: 'info', component: () => import('../views/ProfileInfo.vue') },
      { path: 'settings', component: () => import('../views/ProfileSettings.vue') }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router