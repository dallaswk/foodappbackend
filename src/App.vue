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
      <div class="main-menu-links">
        <div class="bg-white rounded-lg flex items-center h-12 gap-2 px-4 shadow-lg">
          <span class="bg-gray-50 h-7 w-7 rounded-lg flex items-center justify-center">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
            </svg>
          </span>
          <span>Usuarios</span>
        </div>
        <IconBase iconName="rayo"></IconBase>
        <div class="rounded-lg flex items-center h-12 gap-2 px-4 hover:bg-gray-200 cursor-pointer">
          <span class="bg-gray-50 h-7 w-7 rounded-lg flex items-center justify-center">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"></path>
            </svg>
          </span>
          <span>Alimentos</span>
        </div>
        <div class="rounded-lg flex items-center h-12 gap-2 px-4 hover:bg-gray-200 cursor-pointer">
          <span class="bg-gray-50 h-7 w-7 rounded-lg flex items-center justify-center">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"></path>
            </svg>
          </span>
          <span>Recetas</span>
        </div>
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
import { initDropdowns } from 'flowbite'
import { mapState } from 'vuex'
import { IconBase } from '@/components/icons/IconBase.vue'

// import sidebarMenu from '@/components/SideBarMenu.vue'

export default {
  components: {
    IconBase
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
      initDropdowns()
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
