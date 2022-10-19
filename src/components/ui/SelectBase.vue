<template>
  <select :value="value" @change="$emit('input', $event.target.value)">
    <option disabled value="">{{ defaultValue }}</option>
    <option v-for="option in options" :value="option.id" :key="option.id">{{ option.name }}</option>
  </select>
</template>

<script lang="js">
export default {
  name: 'SelectBase',

  props: {
    options: {
      required: true,
      type: Array,
      default: () => []
    },
    defaultValue: {
      required: false,
      type: String
    },
    value: {
      type: String,
      required: true
    }
  },

  emits: ['input']
}
</script>

<style scoped>

</style>
