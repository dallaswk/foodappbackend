<template>
  <div class="bg-slate-400 w-full">
    <div class="flex flex-col justify-center items-center">
      <div class="col-md-8">

        <div class="card">
          <div v-if="user.loggedIn">

          <div class="card-header">Bienvenido, {{user.data.displayName}}</div>
          <div v-if="!uidExiste.value">
            <h2>Es necesario que realices la encuesta inicial.</h2>
          </div>
          </div>
            <div v-else class="alert alert-danger" role="alert">
              No estás loguado
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, onMounted, reactive } from 'vue'
import { auth, db } from '../firebaseDb'
import { initFlowbite } from 'flowbite'

const usuariosRef = db.collection('Usuarios')

export default {
  name: 'DashboardComponent',
  components: {},
  setup () {
    onMounted(() => {
      initFlowbite()
    })

    const store = useStore()
    const router = useRouter()

    auth.onAuthStateChanged(user => {
      store.dispatch('fetchUser', user)
    })

    const user = computed(() => {
      return store.getters.user
    })

    const uidExiste = reactive({
      value: null,
      loading: true
    })

    const existeUid = async () => {
      const uid = user.value.data.uid
      const docRef = usuariosRef.doc(uid)
      const docSnap = await docRef.get()
      return !!docSnap.exists
    }

    onMounted(async () => {
      uidExiste.value = await existeUid()
      uidExiste.loading = false

      if (uidExiste.value) {
        console.log(`El usuario con uid ${user.value.data.uid} existe en la colección "usuarios"`)
      } else {
        console.log(`El usuario con uid ${user.value.data.uid} no existe en la colección "usuarios"`)
      }
    })

    const signOut = async () => {
      await store.dispatch('logOut')
      router.push('/')
    }

    return { user, signOut, uidExiste }
  }

}
</script>
