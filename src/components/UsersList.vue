<template>
  <div :class="$style.container">
    <div :class="$style.buttons">
      <button-base type="button" @click="openModal" :class="$style.button">Добавить</button-base>
    </div>
    <table-app @sort-list="sortUsers" :users="users"/>
    <adding-user-modal :users-storage="users" @users="addUser" @closeModal="closeModal" :isModalOpen="isModalOpen"/>
  </div>
</template>

<script lang="js">
import TableApp from '../components/Table/TableApp'
import AddingUserModal from '../components/modals/AddUserModal'
import {LOCALSTORAGE} from '../helpers/localStorage'

export default {
  name: 'UsersList',

  components: {TableApp, AddingUserModal},

  data () {
    return {
      isModalOpen: false,
      users: []
    }
  },

  created () {
    this.getUsers()
  },

  methods: {
    openModal () {
      this.isModalOpen = true
    },

    closeModal () {
      this.isModalOpen = false
    },

    addUser (value) {
      if (value.selectedOption.length !== 0) {
        const chief = this.users.filter(user => user.id === value.selectedOption)
        const subordinateName = value.user.name
        chief[0][subordinateName] = value.user
        this.users.push(chief)
      } else {
        this.users.push(value.user)
      }
      LOCALSTORAGE.setItem('users', this.users)
    },

    getUsers () {
      const users = LOCALSTORAGE.getItem('users')
      this.users = users
    },

    sortUsers () {

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
