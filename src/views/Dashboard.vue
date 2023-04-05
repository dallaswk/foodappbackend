<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-end px-4">
        <AvatarComponent :avatar="avatar" :nombre="nombre" :apellidos="apellidos" :fechaNacimiento="fechaNacimiento" :email="email"/>
    </div>
    <h1>Dashboard</h1>
  </div>
</template>

<script>
import { db } from '../firebaseDb'
import { mapState } from 'vuex'
import AvatarComponent from '../components/Avatar.vue'

export default {
  name: 'DashBoard',
  components: {
    AvatarComponent
  },
  data () {
    return {
      nombre: '',
      apellidos: '',
      fechaNacimiento: '',
      avatar: '',
      email: ''
    }
  },
  created () {
    this.loadUserData()
  },
  computed: {
    ...mapState(['uid'])
  },
  methods: {
    async loadUserData () {
      const doc = await db.collection('Usuarios').doc(this.uid).get()
      if (doc.exists) {
        const userData = doc.data()
        this.nombre = userData.nombre
        this.apellidos = userData.apellidos
        this.fechaNacimiento = userData.fechaNacimiento
        this.avatar = userData.avatar
        this.email = userData.email
      }
    }
  }
}
</script>
