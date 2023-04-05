<script setup>
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})
</script>
<template>
<div>
<img id="avatarButton" type="button" data-dropdown-toggle="userDropdown" data-dropdown-placement="bottom-start" class="w-10 h-10 rounded-full cursor-pointer"  :src="avatar" alt="User dropdown">

<!-- Dropdown menu -->
<div id="userDropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
    <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
        <div>{{nombre}} {{apellidos}}</div>
      <div class="font-medium truncate">{{email}}</div>
    </div>
    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="avatarButton">
      <li>
        <router-link to="/dashboard" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</router-link>
      </li>
      <li>
        <router-link to="/profile-form" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Perfil</router-link>
      </li>
    </ul>
    <div class="py-1">
      <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Cerrar sesión</a>
    </div>
</div>
</div>
</template>

<script>
export default {
  name: 'AvatarComponent',
  props: {
    avatar: String,
    nombre: String,
    apellidos: String,
    fechaNacimiento: String,
    email: String
  }
}
</script>
