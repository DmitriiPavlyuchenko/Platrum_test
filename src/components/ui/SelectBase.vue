<template>
  <select>
    <option disabled selected>{{ defaultValue }}</option>
    <option v-for="user in users" :key="user.id">{{ user.name }}</option>
  </select>
</template>

<script lang="js">
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
  }
}
</script>

<style scoped>

</style>
