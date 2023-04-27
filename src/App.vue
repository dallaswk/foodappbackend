<template>
  <div class="w-full">
    <main>
    <sidebarMenu v-if="showSidebarMenu" :userdata="user.data"/>
    <router-view />
    <BaseButton></BaseButton>
    </main>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { initFlowbite } from 'flowbite'
import { mapState } from 'vuex'
import BaseButton from '@/components/BaseButton.vue'
import sidebarMenu from '@/components/SideBarMenu.vue'

export default {
  components: {
    sidebarMenu,
    BaseButton
  },
  data () {
    return {
      showSidebarMenu: ref(false)
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
  }
}
</script>
