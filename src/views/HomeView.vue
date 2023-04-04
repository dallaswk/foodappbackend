<template>
  <div class="home">
    <button @click="signInWithGoogle">Iniciar sesión con Google</button>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { db } from '../firebaseDb'

export default {
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
            this.$router.push({ name: 'ProfileForm', params: { uid: userData.uid } })
          } else {
            console.log('Usuario ya existe')
            this.$router.push({ name: 'ProfileForm', params: { uid: userData.uid } })
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
