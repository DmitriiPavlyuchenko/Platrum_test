<template>
  <div :class="$style.container">
    <div :class="$style.buttons">
      <button-base type="button" @click="openModal" :class="$style.button">Добавить</button-base>
    </div>
    <table-app :users="users"/>
    <adding-user-modal :users-storage="users" @users="addUser" @closeModal="close" :isModalOpen="toggleModal"/>
  </div>
</template>

<script lang="js">
import TableApp from '../components/Table/TableApp'
import AddingUserModal from '../components/modals/AddingUserModal'
import {getItem, setItem} from '../helpers/local-storage'

export default {
  name: 'HomeView',

  components: {TableApp, AddingUserModal},

  data () {
    return {
      toggleModal: false,
      users: null
    }
  },

  created () {
    this.getUsers()
  },

  methods: {
    openModal () {
      this.toggleModal = true
    },

    close () {
      this.toggleModal = false
    },

    addUser (value) {
      this.users.push(value)
      setItem('users', this.users)
    },

    getUsers () {
      const users = getItem('users')
      if (users) {
        this.users = users
      }
    }
  }
}
</script>

<style module lang="css">
.container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 45%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

.buttons {
  align-self: flex-end;
}

@media (max-width: 800px) {
  .container {
    width: 90%;
  }
}
</style>
