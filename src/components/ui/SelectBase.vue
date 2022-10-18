<template>
  <select v-if="isUsersEmpty">
    <option value="" disabled selected>{{ defaultValue }}</option>
    <option v-for="user in users" :key="user.name">{{ user.name }}</option>
  </select>
</template>

<script>
export default {
  name: 'SelectBase',
  props: {
    users: {
      required: true,
      type: Array
    },
    defaultValue: {
      required: false,
      type: String
    }
  },
  computed: {
    isUsersEmpty () {
      return this.users.length > 0
    }
  }
}
</script>

<style scoped>

</style>
