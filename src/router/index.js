import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashBoardView from '../views/DashboardView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import SignInView from '../views/SignInView.vue'
import { getAuth, onAuthStateChanged } from '@firebase/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoardView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'Registro',
    component: RegistrationView
  },
  {
    path: '/sign-in',
    name: 'Login',
    component: SignInView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener()
        resolve(user)
      },
      reject
    )
  })
}
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      alert('No dispones de acceso')
      next('/')
    }
  } else {
    next()
  }
})

export default router
