<template>
    <div class="bg-gray-50 w-full h-screen">
      <div class="p-4 sm:ml-64">
        <div class="p-4">
          <h1 class="font-bold text-4xl">Usuarios</h1>
        </div>
        <div class="p-4 w-auto flex">
          <!-- Breadcrumb -->
          <nav
            class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700"
            aria-label="Breadcrumb"
          >
            <ol class="inline-flex items-center space-x-1 md:space-x-3">
              <li class="inline-flex items-center">
                <rotute-link
                  to="/dashboard"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    aria-hidden="true"
                    class="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
                    ></path>
                  </svg>
                  Dashboard
                </rotute-link>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span
                    class="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400"
                    >Usuarios</span
                  >
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div class="p-4 m-4 bg-white">
          <UserTable :users="usuarios" @selection-changed="handleSelectionChanged" />
        </div>
        <selected-user-actions :selected-users="selectedUsers" :delete-selected-users="deleteSelectedUsers" />
      </div>
    </div>
  </template>

<script>
import { db } from '@/firebaseDb'
import UserTable from '@/components/UserTable.vue'
import SelectedUserActions from '@/components/SelectedUserActions.vue'

export default {
  name: 'DashboardUsers',
  components: {
    UserTable,
    SelectedUserActions
  },
  props: {},
  data () {
    return {
      usuarios: [],
      users: [
        {
          id: 1,
          name: 'Juan Pérez',
          email: 'juan@example.com',
          avatar: 'https://i.blogs.es/61bf87/l-intro-1658431618/1366_2000.jpeg',
          birthdate: '1990-01-01',
          weight: 70,
          height: 175,
          role: 'Admin'
        },
        {
          id: 2,
          name: 'Juan Gutierrez',
          email: 'juang@example.com',
          avatar: 'https://depor.com/resizer/K1c690-lZg41M2-rQzvOVc_tp0k=/580x330/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/IJFZ5ZGT2NAJJOWIRBXBUZRSCI.jpg',
          birthdate: '1990-01-01',
          weight: 70,
          height: 175,
          role: 'Free'
        },
        {
          id: 3,
          name: 'Pepe Gutierrez',
          email: 'pepe@example.com',
          birthdate: '1990-01-01',
          weight: 70,
          height: 175,
          role: 'Free'
        },
        {
          id: 4,
          name: 'María García',
          email: 'maria@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
          birthdate: '1995-05-12',
          weight: 60,
          height: 165,
          role: 'Free'
        },
        {
          id: 5,
          name: 'Pedro Rodríguez',
          email: 'pedro@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
          birthdate: '1988-09-23',
          weight: 80,
          height: 180,
          role: 'Free'
        },
        {
          id: 6,
          name: 'Ana Martínez',
          email: 'ana@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
          birthdate: '1992-03-08',
          weight: 55,
          height: 160,
          role: 'Free'
        },
        {
          id: 7,
          name: 'Jorge Hernández',
          email: 'jorge@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
          birthdate: '1991-11-15',
          weight: 75,
          height: 175,
          role: 'Free'
        },
        {
          id: 8,
          name: 'Sofía López',
          email: 'sofia@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
          birthdate: '1993-07-20',
          weight: 62,
          height: 168,
          role: 'Free'
        },
        {
          id: 9,
          name: 'Carlos Sánchez',
          email: 'carlos@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
          birthdate: '1985-12-30',
          weight: 85,
          height: 185,
          role: 'Free'
        },
        {
          id: 10,
          name: 'Laura Torres',
          email: 'laura@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
          birthdate: '1994-02-18',
          weight: 58,
          height: 163,
          role: 'Free'
        },
        {
          id: 11,
          name: 'Miguel Álvarez',
          email: 'miguel@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
          birthdate: '1990-06-05',
          weight: 78,
          height: 180,
          role: 'Free'
        },
        {
          id: 12,
          name: 'Lucía Gómez',
          email: 'lucia@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
          birthdate: '1996-09-12',
          weight: 57,
          height: 162,
          role: 'Free'
        },
        {
          id: 13,
          name: 'David Pérez',
          email: 'david@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
          birthdate: '1987-04-25',
          weight: 82,
          height: 185,
          role: 'Free'
        },
        {
          id: 14,
          name: 'Marina García',
          email: 'marina@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
          birthdate: '1991-08-03',
          weight: 63,
          height: 170,
          role: 'Free'
        },
        {
          id: 15,
          name: 'Javier Rodríguez',
          email: 'javier@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
          birthdate: '1989-01-10',
          weight: 79,
          height: 180,
          role: 'Free'
        },
        {
          id: 16,
          name: 'Cristina Martínez',
          email: 'cristina@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
          birthdate: '1993-11-28',
          weight: 56,
          height: 165,
          role: 'Free'
        },
        {
          id: 17,
          name: 'Pablo Hernández',
          email: 'pablo@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
          birthdate: '1992-02-14',
          weight: 77,
          height: 182,
          role: 'Free'
        },
        {
          id: 18,
          name: 'Elena Sánchez',
          email: 'elena@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
          birthdate: '1995-06-20',
          weight: 60,
          height: 170,
          role: 'Free'
        },
        {
          id: 19,
          name: 'Jesús Torres',
          email: 'jesus@example.com',
          avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
          birthdate: '1988-09-08',
          weight: 83,
          height: 185,
          role: 'Free'
        },
        {
          id: 20,
          name: 'Isabel Álvarez',
          email: 'isabel@example.com',
          avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
          birthdate: '1990-12-17',
          weight: 55,
          height: 160,
          role: 'Free'
        }
      ],
      selectedUsers: []
    }
  },
  async mounted () {
    const usuariosCollection = await db.collection('Usuarios').get()
    this.usuarios = usuariosCollection.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
  },
  methods: {
    handleSelectionChanged (selectedUsers) {
      this.selectedUsers = selectedUsers
    },
    deleteSelectedUsers () {
      // Implementa la lógica de eliminación aquí
    }
  }
}
</script>
