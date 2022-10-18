<template>
  <input
    :value="value"
    @input="$emit('input', $event.target.value)"
  />
</template>

<script lang="js">
export default {
  name: 'InputBase',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  emits: ['input']
}
</script>

<style lang="css" module>
input {
  color: var(--black);
  border-color: inherit;
}

input:focus {
  outline: none;
}

input::placeholder {
  color: var(--black);
}
</style>
