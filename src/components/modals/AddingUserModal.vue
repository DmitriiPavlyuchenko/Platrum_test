<template>
  <modal-base :isModalOpen="isModalOpen" @closeModal="close">
    <template #header>
      <span :class="$style.title">Добавление пользователя</span>
    </template>
    <template #body>
      <div :class="$style.form">
        <label for="name" :class="$style.label">
          Имя
          <input-base v-model="user.name" type="text" id="name"
                      :class="$style.input"/>
        </label>
        <label for="phone" :class="$style.label">
          Телефон
          <input-base v-model="user.phone" type="phone" id="phone" :class="$style.input"/>
        </label>
        <label :class="$style.label" for="chief">
          Начальник
          <select-base :default-value="'Выберите начальника'" :class="$style.select"
                       id="chief" :users="usersStorage"/>
        </label>
      </div>
    </template>
    <template #footer>
      <div :class="$style.buttons">
        <button :class="$style.button" @click="addUser" type="button">Сохранить</button>
      </div>
    </template>
  </modal-base>
</template>

<script>
import ModalBase from '../ui/ModalBase'
import InputBase from '../ui/InputBase'
import ButtonBase from '../ui/ButtonBase'
import SelectBase from '../ui/SelectBase'

export default {
  name: 'AddingUserModal',

  data () {
    return {
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

  methods: {
    close () {
      this.$emit('closeModal')
    },

    addUser () {
      const id = Math.random().toString(36).substring(2)
      this.user.id = id
      this.$emit('users', this.user)
      this.user = {
        name: '',
        phone: ''
      }
      this.close()
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
}
</style>
