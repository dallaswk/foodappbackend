import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashBoardView from '../views/DashboardView.vue'
import DashboardUsers from '../views/dashboard/DashboardUsers'
import RegistrationView from '../views/RegistrationView.vue'
import SignInView from '../views/SignInView.vue'
import { getAuth, onAuthStateChanged } from '@firebase/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      showSidebarMenu: false
    }
  },
  {
    path: '/dashboard',
    name: 'DashBoard',
    component: DashBoardView,
    meta: {
      requiresAuth: true,
      showSidebarMenu: true
    }
  },
  {
    path: '/dashboard/users',
    name: 'DashBoard Users',
    component: DashboardUsers,
    meta: {
      requiresAuth: true,
      showSidebarMenu: true
    }
  },
  {
    path: '/register',
    name: 'Registro',
    component: RegistrationView,
    meta: {
      showSidebarMenu: false
    }
  },
  {
    path: '/sign-in',
    name: 'Login',
    component: SignInView,
    meta: {
      showSidebarMenu: false
    }
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
