<template>
  <modal-base :isModalOpen="isModalOpen" @closeModal="close">
    <template #header>
      <span :class="$style.title">Добавление пользователя</span>
    </template>
    <template #body>
      <div :class="$style.form">
        <label for="name" :class="$style.label">
          Имя
          <input-base
            autofocus
            v-model="user.name"
            type="text"
            id="name"
            :class="[[$style.input], { [$style.valid]: isFormValid.name }]"
          />
        </label>
        <label for="phone" :class="$style.label">
          Телефон
          <input-base
            v-model="user.phone"
            @input="isPhoneValid"
            type="text"
            id="phone"
            placeholder="+7 911 111 1111"
            maxlength="12"
            minlength="12"
            pattern="[0-9]+"
            :class="[[$style.input], { [$style.valid]: isFormValid.phone }]"
          />
        </label>
        <div :class="$style['select-wrapper']" v-if="isUsersStorageEmpty">
          <span>
            Начальник
          </span>
          <select-base
            v-model="selectedOption"
            :default-value="'Выберите начальника'"
            :class="$style.select"
            id="chief"
            :options="users"
          />
        </div>
      </div>
    </template>
    <template #footer>
      <div :class="$style.buttons">
        <button
          :disabled="isFormValidate"
          :class="{[$style.button]: !isFormValidate}"
          @click="addUser"
          type="button"
        >
          Сохранить
        </button>
      </div>
    </template>
  </modal-base>
</template>

<script lang="js">
import ModalBase from '../ui/ModalBase'
import InputBase from '../ui/InputBase'
import SelectBase from '../ui/SelectBase'
import {generateRandomId} from '../../helpers/generateRandom'

export default {
  name: 'AddUserModal',

  data () {
    return {
      isFormValid: {
        phone: false,
        name: false
      },

      user: {
        name: '',
        phone: ''
      },

      selectedOption: '',
      users: []
    }
  },

  components: {
    SelectBase,
    ModalBase,
    InputBase
  },

  props: {
    isModalOpen: {
      type: Boolean,
      required: true
    },

    usersStorage: {
      required: false,
      type: Array
    }
  },

  emits: ['closeModal', 'users'],

  computed: {
    isFormValidate () {
      return !this.isFormValid.name || !this.isFormValid.phone
    },

    isUsersStorageEmpty () {
      return this.usersStorage.length > 0
    }
  },

  watch: {
    'user.name': function () {
      let userName = this.user.name
      const isUserNameNotEmpty = userName.length > 0
      this.isFormValid.name = isUserNameNotEmpty

      const firstLetterToUppercase = userName.slice(0, 1).toUpperCase() + userName.slice(1)
      this.user.name = firstLetterToUppercase
    },

    usersStorage: {
      handler () {
        const users = JSON.parse(JSON.stringify(this.usersStorage))
        let tmpUsers = []
        this.flatUsers(users, tmpUsers)
        this.users = tmpUsers
      },
      immediate: true
    }
  },

  methods: {
    close () {
      this.$emit('closeModal')
    },

    flatUsers (users, tmpUsers) {
      users.forEach((user) => {
        if (user.hasOwnProperty('usersList')) {
          this.flatUsers(user['usersList'], tmpUsers)
          tmpUsers.push(user)
        } else {
          tmpUsers.push(user)
        }
      })
    },

    addUser () {
      this.user.id = generateRandomId()
      this.user.phone = this.splitPhone(this.user.phone)

      this.$emit('users', {user: this.user, selectedOption: this.selectedOption})

      this.clearForm()
      this.close()
    },

    splitPhone (phone) {
      return [
        phone.slice(0, 2), ' ',
        phone.slice(2, 5), ' ',
        phone.slice(5, 8), ' ',
        phone.slice(8, 10), ' ',
        phone.slice(10, 12)].join('')
    },

    clearForm () {
      this.user = {
        name: '',
        phone: ''
      }
      this.isFormValid = {
        name: false,
        phone: false
      }
      this.selectedOption = ''
    },

    isPhoneValid () {
      const correctPhone = /^((\+7)+([0-9]){10})$/
      this.isFormValid.phone = correctPhone.test(this.user.phone)
    }
  }
}
</script>

<style module lang="css">
.title {
  font-size: 0.9rem;
  display: flex;
  justify-content: flex-start;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 0.85rem;
}

.label {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
}

.buttons {
  display: flex;
}

button {
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
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

.button:active {
  border: 0.05rem solid var(--grey);
}

input,
select {
  width: 60%;
  padding: 0.8rem;
  max-height: 2rem;
  border: 0.1rem solid var(--grey);
  background-color: white;
  color: black;
  font-size: 0.75rem;
}

.select {
  padding: 0.4rem 0.8rem;
}

.select-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.valid {
  border-color: green;
}
</style>
