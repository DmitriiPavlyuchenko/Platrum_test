<template>
  <div :class="$style.container">
    <div :class="$style.buttons">
      <button type="button" @click="openModal" :class="$style.button">Добавить</button>
    </div>
    <user-list @sort="changeSort" :users="users"/>
    <add-user-modal :users-storage="users" @users="addUser" @closeModal="closeModal" :isModalOpen="isModalOpen"/>
  </div>
</template>

<script lang="js">
import AddUserModal from '../modals/AddUserModal'
import {LOCALSTORAGE} from '../../helpers/localStorage'
import UserList from './UserList'

export default {
  name: 'TableApp',

  components: {UserList, AddUserModal},

  data () {
    return {
      isModalOpen: false,
      toggleSort: false,
      users: [],
      selectedOption: ''
    }
  },

  created () {
    this.getUsers()
  },

  watch: {
    toggleSort () {
      if (this.toggleSort) {
        this.sortByAsc(this.users)
      } else {
        this.sortByDesc(this.users)
      }
    },

    users () {
      LOCALSTORAGE.setItem('users', this.users)
    }
  },

  methods: {
    openModal () {
      this.isModalOpen = true
    },

    closeModal () {
      this.isModalOpen = false
    },

    addUser (value) {
      this.selectedOption = value.selectedOption
      const hasSelectedOption = value.selectedOption.length !== 0

      if (hasSelectedOption) {
        this.addSubordinate(value)
      } else {
        this.users.push(value.user)
      }
    },

    addSubordinate (value) {
      const chief = this.users.reduce(this.findById, null)

      if (!chief['usersList']) {
        this.$set(chief, 'usersList', [])
      }

      chief['usersList'].push(value.user)
      LOCALSTORAGE.setItem('users', this.users)
    },

    findById (acc, el) {
      if (el.id === this.selectedOption) return el
      if (el['usersList']) return el['usersList'].reduce(this.findById, acc)
      return acc
    },

    getUsers () {
      const users = LOCALSTORAGE.getItem('users')
      this.users = users
    },

    changeSort () {
      this.toggleSort = !this.toggleSort
    },

    sortByAsc (arr) {
      arr.sort(this.compareName('name'))
      this.sortSubordinates(arr, 'asc')
    },

    sortByDesc (arr) {
      arr.sort(this.compareName('name')).reverse()
      this.sortSubordinates(arr, 'desc')
    },

    sortSubordinates (arr, sort) {
      arr.forEach((user) => {
        if (user.hasOwnProperty('usersList')) {
          const {usersList} = user
          sort === 'desc' ? this.sortByDesc(usersList) : this.sortByAsc(usersList)
        }
      })
    },

    compareName (field) {
      return (a, b) => a[field] > b[field] ? 1 : -1
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

.button {
  font-size: 0.9rem;
  color: var(--black);
  border-radius: 0.8rem;
  padding: 0.4rem 0.8rem;
  background-color: var(--grey);
  cursor: pointer;
}

.button:hover {
  background-color: var(--lightgrey);
  box-shadow: 0 0 0.5rem var(--lightgrey);
}

@media (max-width: 800px) {
  .container {
    width: 90%;
  }
}
</style>
