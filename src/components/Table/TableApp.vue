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

export default {
  name: 'TableApp',

  components: {UserList, AddUserModal},

  data () {
    return {
      isModalOpen: false,
      toggleSort: true,
      users: [
        {id: 1, name: 'ke', phone: '+791'},
        {
          id: 2,
          name: 'be',
          phone: '+791',
          usersList: [
            {
              id: 4, name: 'ze', phone: '+791'
            },
            {
              id: 5,
              name: 'de',
              phone: '+791',
              usersList: [
                {id: 6, name: 'ze', phone: '+791'},
                {id: 7, name: 'me', phone: '+791'}]
            }
          ]
        },
        {id: 3, name: 're', phone: '+791'}
      ]
    }
  },

  created () {
    this.getUsers()
  },

  watch: {
    toggleSort () {
      if (this.toggleSort) {
        this.sortByAsc(this.users)
      } else if (!this.toggleSort) {
        this.sortByDesc(this.users)
      }
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
      // if (value.selectedOption.length !== 0) {
      //   const chief = this.users.filter(user => user.id === value.selectedOption)
      //   const subordinateName = value.user.name
      //   chief[0][subordinateName] = value.user
      //   this.users.push(chief)
      // } else {
      // }
      this.users.push(value.user)
      LOCALSTORAGE.setItem('users', this.users)
    },

    getUsers () {
      // const users = LOCALSTORAGE.getItem('users')
      // this.users = users
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
