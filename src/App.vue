<template>
  <div class="w-full">
    <main class="flex">
    <!-- <sidebarMenu v-if="showSidebarMenu" :userdata="user.data"/> -->
    <span @click="mainMenu" class="opener-main-menu bg-white fixed top-4 left-4 h-7 w-7 rounded-lg flex items-center justify-center hover:bg-gray-200">
      <svg :class="{hidden: !isOpen}" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"></path>
      </svg>
      <svg :class="{hidden: isOpen}" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"></path>
      </svg>
    </span>
    <div :class="{open: isOpen}" class="bg-gray-50 w-60 px-4 flex flex-col gap-1 main-menu shrink-0 shadow-lg">
      <div class="main-menu-links flex flex-col gap-2">
        <SideMenuLink Name="Usuarios" iconName="users" active="active"/>
        <SideMenuLink Name="Alimentos" iconName="food"/>
        <SideMenuLink Name="Recetas" iconName="recipes"/>
      </div>
      <div class="rounded-lg flex items-center h-12 gap-2 px-4 hover:bg-gray-200 bg-white cursor-pointer mt-auto shrink-0">
        <div class="bg-gray-300 h-8 w-8 rounded-full"></div>
        <div class="flex flex-col">
          <span class="text-sm font-bold leading-none">Álvaro</span>
          <span class="text-sm leading-none">33 años</span>
        </div>
        <span class="bg-gray-50 h-7 w-7 rounded-full flex items-center justify-center ml-auto">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
          </svg>
        </span>
      </div>
    </div>
    <router-view />
    </main>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import { mapState } from 'vuex'
import SideMenuLink from '@/components/SideMenuLink.vue'

// import sidebarMenu from '@/components/SideBarMenu.vue'

export default {
  components: {
    SideMenuLink
    // sidebarMenu,
  },
  data () {
    return {
      showSidebarMenu: ref(false),
      isOpen: false
    }
  },
  watch: {
    // Observar cambios en la ruta activa
    $route (to, from) {
      // Verificar si la ruta activa tiene el meta "showSidebarMenu"
      if (to.meta.showSidebarMenu !== undefined) {
        // Actualizar el valor de showSidebarMenu según el valor del meta "showSidebarMenu"
        this.showSidebarMenu = to.meta.showSidebarMenu
      } else {
        // Si la ruta activa no tiene el meta "showSidebarMenu", mostrar SidebarMenu
        this.showSidebarMenu = true
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  setup () {
    onMounted(() => {
      initFlowbite()
    })
  },
  methods: {
    mainMenu: function () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style lang="scss">
.main-menu {
  margin-left: -240px;
  transition: all .3s ease-in-out;
  transition-delay: 0.1s;
  @apply mt-12 pt-4 absolute rounded-r-lg pb-4;
  .main-menu-links {
    transition: all .3s ease-in-out;
  }
}
.opener-main-menu:hover {
  + .main-menu {
    margin-left: 0px;
  }
}
.main-menu:hover {
  margin-left: 0px;
}
.open {
  margin-left: 0px;
  @apply pt-12 mt-0 static rounded-none h-screen;
}
</style>
