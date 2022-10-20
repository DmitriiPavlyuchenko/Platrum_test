<template>
  <transition-group name="user-list">
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  name: 'ListTransition'
}
</script>

<style lang="css">
.user-list-item {
  display: inline-block;
  margin-right: 10px;
}

.user-list-enter-active,
.user-list-leave-active {
  transition: all 1s ease;
}

.user-list-enter-from,
.user-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.user-list-move {
  transition: transform 0.4s ease;
}
</style>
