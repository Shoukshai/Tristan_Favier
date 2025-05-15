import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import ContactPage from './pages/ContactPage.vue'
import CVPage from './pages/CVPage.vue'

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
  { path: '/cv', name: 'CV', component: CVPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router