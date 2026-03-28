import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: () => import('../views/AboutView.vue') },
  { path: '/catalog', name: 'Catalog', component: () => import('../views/CatalogView.vue') },
  { path: '/catalog/:id', name: 'ProductDetails', component: () => import('../views/ProductDetailsView.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router