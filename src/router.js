import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import ContactPage from './pages/ContactPage.vue'
import PassionPage from './pages/PassionPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  {
      path: '/contact',
      name: 'Contact',
      component: ContactPage,
      beforeEnter: (to, from, next) => {
        const isQuizCompleted = localStorage.getItem('quizCompleted') === 'true';
        if (isQuizCompleted) {
          next();
        } else {
          next({ path: '/', query: { quizRequired: 'true' } });
        }
      },
  },
  { path: '/passion', name: 'Passion', component: PassionPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router