<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'InputBase',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  emits: ['input']
}
</script>

<style lang="css" module>
input {
  color: var(--black);
}

input::placeholder {
  color: var(--black);
}
</style>
