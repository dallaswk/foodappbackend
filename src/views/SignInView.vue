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
import { signInWithEmailAndPassword, auth, GoogleAuthProvider, signInWithPopup } from '../firebaseDb'
import { useRouter } from 'vue-router'
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
</script>
