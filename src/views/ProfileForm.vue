<template>
  <div>
    <h1>Actualizar perfil de usuario</h1>
    <form @submit.prevent="updateProfile">
      <label>Nombre:</label>
      <input v-model="nombre" type="text">
      <label>Apellidos:</label>
      <input v-model="apellidos" type="text">
        <label>Fecha Nacimiento:</label>
      <input v-model="fechaNacimiento" type="date">
      <button type="submit">Actualizar</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { db } from '../firebaseDb'

export default {
  name: 'ProfileForm',
  data () {
    return {
      nombre: '',
      apellidos: '',
      fechaNacimiento: ''
    }
  },
  computed: {
    ...mapState(['uid'])
  },
  created () {
    this.loadUserData()
  },
  methods: {
    async loadUserData () {
      const doc = await db.collection('Usuarios').doc(this.uid).get()
      if (doc.exists) {
        const userData = doc.data()
        this.nombre = userData.nombre
        this.apellidos = userData.apellidos
        this.fechaNacimiento = userData.fechaNacimiento
      }
    },
    async updateProfile () {
      await db.collection('Usuarios').doc(this.uid).update({
        nombre: this.nombre,
        apellidos: this.apellidos,
        fechaNacimiento: this.fechaNacimiento

      })
      this.$router.push('/')
    }
  }
}
</script>
