<template>
  <modal-base :isModalOpen="isModalOpen" @closeModal="close">
    <template #header>
      <span :class="$style.title">Добавление пользователя</span>
    </template>
    <template #body>
      <div :class="$style.form">
        <label for="name" :class="$style.label">
          Имя
          <input-base ref="focus" v-model="user.name" type="text" id="name"
                      :class="[[$style.input], {[$style.valid]: failedValidation.name}]"/>
        </label>
        <label for="phone" :class="$style.label">
          Телефон
          <input-base
            v-model="user.phone" @input="onlyNumbers" type="text" id="phone" maxlength=12 minlength=12 pattern="[0-9]+"
            :class="[[$style.input], {[$style.valid]: failedValidation.phone}]"/>
        </label>
        <label :class="$style.label" for="chief" v-if="usersStorage.length > 0">
          Начальник
          <select-base :default-value="'Выберите начальника'" :class="$style.select"
                       id="chief" :users="usersStorage"/>
        </label>
      </div>
    </template>
    <template #footer>
      <div :class="$style.buttons">
        <button :disabled="isFormValidate" :class="$style.button" @click="addUser" type="button">Сохранить</button>
      </div>
    </template>
  </modal-base>
</template>

<script lang="js">
import ModalBase from '../ui/ModalBase'
import InputBase from '../ui/InputBase'
import ButtonBase from '../ui/ButtonBase'
import SelectBase from '../ui/SelectBase'

export default {
  name: 'AddingUserModal',

  data () {
    return {
      failedValidation: {
        phone: false,
        name: false
      },
      user: {
        name: '',
        phone: ''
      }
    }
  },

  components: {
    SelectBase,
    ModalBase,
    ButtonBase,
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
      return !this.failedValidation.name || !this.failedValidation.phone
    }
  },

  watch: {
    'user.name': function () {
      let userName = this.user.name
      const isUserNameNotEmpty = userName.length > 0
      if (isUserNameNotEmpty) {
        this.failedValidation.name = true
      } else {
        this.failedValidation.name = false
      }

      this.user.name = userName.slice(0, 1).toUpperCase() + userName.slice(1)
    }
  },

  methods: {
    close () {
      this.$emit('closeModal')
    },

    addUser () {
      const generatedId = Math.random().toString(36).substring(2)
      this.user.id = generatedId

      const phone = this.user.phone
      const modifiedPhone = [
        phone.slice(0, 2), ' ',
        phone.slice(2, 5), ' ',
        phone.slice(5, 8), ' ',
        phone.slice(8, 10), ' ',
        phone.slice(10, 12)].join('')
      this.user.phone = modifiedPhone

      this.$emit('users', this.user)

      this.user = {
        name: '',
        phone: ''
      }
      this.failedValidation = {
        name: false,
        phone: false
      }
      this.close()
    },

    onlyNumbers () {
      const correctPhone = /^((\+7)+([0-9]){10})$/
      this.failedValidation.phone = correctPhone.test(this.user.phone)
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
}

.label {
  display: flex;
  gap: 2rem;
  align-items: center;
  font-size: 0.85rem;
  justify-content: space-between;
}

.buttons {
  display: flex;
}

label > input,
label > select {
  width: 60%;
  height: 1.5rem;
  padding: 0.8rem;
}

.valid {
  border-color: green;
}
</style>
