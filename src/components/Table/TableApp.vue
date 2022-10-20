<template>
  <div :class="$style.container">
    <div :class="$style.buttons">
      <button-base type="button" @click="openModal" :class="$style.button">Добавить</button-base>
    </div>
    <user-list @sort="changeSort" :users="users"/>
    <add-user-modal :users-storage="users" @users="addUser" @closeModal="closeModal" :isModalOpen="isModalOpen"/>
  </div>
</template>

<script lang="js">
import AddUserModal from '../modals/AddUserModal'
import {LOCALSTORAGE} from '../../helpers/localStorage'
import UserList from './UserList'
import Vue from 'vue'

export default {
  name: 'TableApp',

  components: {UserList, AddUserModal},

  data () {
    return {
      isModalOpen: false,
      toggleSort: true,
      users: []
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
      const isUserChief = this.addSubordinate(value)

      if (isUserChief) {
        this.users = this.users.map(user => {
          if (user.id === isUserChief[0].id) {
            return isUserChief[0]
          }
          return user
        })
      } else {
        this.users.push(value.user)
      }
    },

    addSubordinate (value) {
      const hasSelectedOption = value.selectedOption.length !== 0
      if (hasSelectedOption) {
        const chief = this.users.filter(user => user.id === value.selectedOption)

        if (!chief[0]['usersList']) {
          this.$set(chief[0], 'usersList', [])
        }

        chief[0]['usersList'].push(value.user)
        return chief
      } else {
        return undefined
      }
    },

    getUsers () {
      const users = LOCALSTORAGE.getItem('users')
      this.users = users
    },

    changeSort () {
      this.toggleSort = !this.toggleSort
    },

    sortByAsc (arr) {
      arr.sort(this.byField('name'))
      this.childrenSort(arr, 'asc')
    },

    sortByDesc (arr) {
      arr.sort(this.byField('name')).reverse()
      this.childrenSort(arr, 'desc')
    },

    childrenSort (arr, sort) {
      arr.forEach((user) => {
        if (user.hasOwnProperty('usersList')) {
          const {usersList} = user
          sort === 'desc' ? this.sortByDesc(usersList) : this.sortByAsc(usersList)
        }
      })
    },

    byField (field) {
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

@media (max-width: 800px) {
  .container {
    width: 90%;
  }
}
</style>
