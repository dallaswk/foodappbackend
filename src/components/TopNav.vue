<script setup>
import { onMounted, ref } from 'vue'
import { auth, onAuthStateChanged } from '../firebaseDb'
import { initFlowbite } from 'flowbite'

const isLoggedIn = ref(false)

onMounted(() => {
  initFlowbite()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

</script>
<template>
<nav class="bg-white border-gray-200 dark:bg-gray-900 w-full">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <router-link class="flex items-center" to="/">
      <img src="../assets/img/brocolli.png" class="h-8 mr-3" alt="FoodApp Logo" />
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FoodApp</span>
  </router-link>

  <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu-2">
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <router-link to="/" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Inicio</router-link>
      </li>
      <li>
        <router-link to="/dashboard" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Dashboard</router-link>
      </li>
      <li v-if="!isLoggedIn">
        <router-link to="/register" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Registrate</router-link>
      </li>
      <li v-if="!isLoggedIn">
        <router-link to="/sign-in" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</router-link>
      </li>
    </ul>
  </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'TopNavComponent',
  props: {
  }
}
</script>
