<template>
    <div v-if="selectedUsers.length > 0" class="fixed bottom-4 right-4 bg-white p-4 rounded shadow">
      <div class="mb-2">
        Usuario seleccionado: {{ selectedUsers[0].apellidos }}, <strong>{{ selectedUsers[0].nombre }}</strong>
      </div>
      <button class="btn btn-warning btn-sm mr-2" :disabled="selectedUsers.length !== 1">
        Editar
      </button>
      <button class="btn btn-danger btn-sm" @click="deleteSelectedUsers">
        Eliminar
      </button>
    </div>
  </template>

<script>
export default {
  name: 'SelectedUserActions',
  props: {
    selectedUsers: {
      type: Array,
      required: true
    },
    deleteSelectedUsers: {
      type: Function,
      required: true
    }
  }
}
</script>

  <style>
  /* Agrega cualquier estilo adicional aquí */
  </style>
