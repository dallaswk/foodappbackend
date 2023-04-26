<template>
<div>
  <h1>Login</h1>
  <input type="text" placeholder="Email" v-model="email" />
  <input type="password" placeholder="Password" v-model="password" />
  <p v-if="errMsg">{{ errMsg }}</p>
  <button @click="register">Login</button>
  <button @click="signInWithGoogle">Login With Google</button>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { signInWithEmailAndPassword, auth, GoogleAuthProvider, signInWithPopup, db } from '../firebaseDb'
import { useRouter } from 'vue-router'
</script>
<script>
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const email = ref('')
const password = ref('')
const errMsg = ref()
const router = useRouter()
const register = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log('Logueado')
      console.log(auth.currentUser)
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error.code)
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Email no válido'
          break
        case 'auth/user-not-found':
          errMsg.value = 'No se ha encontrado una cuenta con este email'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Contraseña incorrecta'
          break
        default:
          errMsg.value = 'Email o contraseña incorrecta'
          break
      }
    })
}
const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user)
      router.push('/dashboard')
    })
    .catch((error) => {
      console.log(error)
    })
}

export default {
  name: 'SigninView',
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
