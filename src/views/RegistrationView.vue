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
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, auth } from '../firebaseDb'
import { useRouter } from 'vue-router'
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
