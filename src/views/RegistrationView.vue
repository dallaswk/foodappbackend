<template>
<div>
  <h1>Crear nueva cuenta</h1>
  <input type="text" placeholder="Email" v-model="email" />
  <input type="password" placeholder="Password" v-model="password" />
  <button @click="register">Registrarse</button>
  <button @click="signInWithGoogle">Sign In With Google</button>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { createUserWithEmailAndPassword, auth, db } from '../firebaseDb'
import { useRouter } from 'vue-router'
</script>
<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('Registro OK')
      console.log(auth.currentUser)
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error.code)
      alert(error.message)
    })
}

export default {
  name: 'RegistrationView',
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
            this.$router.push({ name: 'DashBoard' })
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
