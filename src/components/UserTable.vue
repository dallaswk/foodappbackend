<template>
    <div>
      <div class="flex justify-between mb-4">
        <div class="flex justify-start mb-4">
          <input type="text" class="rounded border-gray-300 border p-2" placeholder="Buscar usuarios..." />
        </div>
        <div class="flex justify-end">
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" @click="$emit('filter')">Filtrar</button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="$emit('add-user')">Agregar usuario</button>
        </div>
      </div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <input
                type="checkbox"
                class="rounded"
                @change="toggleAll"
                :checked="allSelected"
              />
            </th>
            <!-- Agrega las otras columnas aquí -->
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Avatar
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nombre
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Fecha de nacimiento
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Peso
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Altura
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Rol
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(user, index) in users.slice(offset, offset + perPage)" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                type="checkbox"
                class="rounded"
                v-model="selectedUsers[index]"
                @change="updateSelection"
              />
            </td>
            <!-- Agrega la celda de Avatar aquí -->
            <td class="px-6 py-4 whitespace-nowrap">
                <img
                :src="user.avatar"
                alt="Avatar"
                class="w-10 h-10 rounded-full"
                v-if="user.avatar"
                />
                <img
                src="@/assets/img/brocolli.png"
                alt="Avatar"
                class="w-10 h-10 rounded-full"
                v-else
                />
            </td>
            <!-- Agrega las otras celdas aquí -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm font-medium text-gray-900">{{ user.apellidos }} <strong>{{ user.nombre }}</strong></div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ user.fechaNacimiento }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ user.weight }} kg</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-500">{{ user.height }} cm</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                  user.role === 'Admin'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-800 text-white',
                ]"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" @click="$emit('delete-user', user.id)"><svg class="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg></button>
            </td>
          </tr>
        </tbody>
      </table>
      <nav class="flex items-center justify-between pt-4" aria-label="Table navigation">
        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Mostrando <span class="font-semibold text-gray-900 dark:text-white">{{offset + 1}}-{{offset + perPage}}</span> de <span class="font-semibold text-gray-900 dark:text-white">{{users.length}}</span></span>
        <ul class="inline-flex items-center -space-x-px">
            <li>
                <span @click="setPage(currentPageIndex-1)" class="block cursor-pointer px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Previous</span>
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                </span>
            </li>
            <li v-for="i in pages" @click="setPage(i-1)"  v-bind:key="i">
                <span :class="{'px-3 py-2 cursor-pointer text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': currentPageIndex === i-1, 'px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer': currentPageIndex !== i-1}">{{i}}</span>
            </li>
            <li>
                <span @click="setPage(currentPageIndex+1)" class="block cursor-pointer px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    <span class="sr-only">Next</span>
                    <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                </span>
            </li>
        </ul>
    </nav>
    </div>
  </template>

<script>

export default {
  name: 'UserTable',
  components: {
  },
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selectedUsers: [],
      allSelected: false,
      perPage: 10,
      currentPageIndex: 0

    }
  },
  methods: {
    updateSelection () {
      this.$emit(
        'selection-changed',
        this.selectedUsers
          .map((selected, index) => (selected ? this.users[index] : null))
          .filter((user) => user !== null)
      )
    },
    toggleAll () {
      this.allSelected = !this.allSelected
      this.selectedUsers = this.users.map(() => this.allSelected)
      this.updateSelection()
    },
    setPage (index) {
      if (index >= 0 && index < this.pages) {
        this.currentPageIndex = index
      }
    }
  },
  computed: {
    pages: function () {
      const totalusers = this.users
      return Math.ceil(totalusers.length / this.perPage)
    },
    offset: function () {
      console.log(this.currentPageIndex * this.perPage)
      return this.currentPageIndex * this.perPage
    }
  },
  watch: {
  }
}
</script>
