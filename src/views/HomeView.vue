<template>
  <div>
      <top-nav-component/>
  <div class="home flex flex-col justify-center items-center">
    <img alt="Foodapp logo" src="../assets/img/brocolli.png">
    <h1 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">FoodAPP</h1>
  </div>
</div>
</template>

<script>
// @ is an alias to /src
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { db } from '@/firebaseDb'
import TopNavComponent from '@/components/TopNav.vue'

export default {
  components: { TopNavComponent },
  name: 'HomeView',
  methods: {
    async signInWithGoogle () {
      try {
        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await firebase.auth().signInWithPopup(provider)
        const user = result.user
        const userData = {
          uid: user.uid,
          nombre: '',
          apellidos: '',
          fechaNacimiento: '',
          email: user.email,
          avatar: user.photoURL
        }
        await this.createUserIfNotExists(userData)
      } catch (error) {
        console.log(error)
      }
    },
    async userCanCreate (email) {
      const usuariosLicencias = await db.collection('Usuarios_licencias').get()
      return usuariosLicencias.docs.find(doc => doc.data().email === email)
    },
    async createUserIfNotExists (userData) {
      const canCreate = await this.userCanCreate(userData.email)
      if (canCreate) {
        try {
          const userRef = await db.collection('Usuarios').doc(userData.uid).get()
          if (!userRef.exists) {
            await db.collection('Usuarios').doc(userData.uid).set(userData)
            console.log('Usuario creado')
            this.$store.dispatch('actualizarUid', userData.uid)
            this.$router.push({ name: 'ProfileForm' })
          } else {
            console.log('Usuario ya existe')
            this.$store.dispatch('actualizarUid', userData.uid)
            this.$router.push({ name: 'DashBoard' })
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log('No dispones de licencia')
      }
    }
  }
}
</script>
