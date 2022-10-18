<template>
  <transition appear name="zoom">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: 'ZoomTransition'
}
</script>

<style lang="css">
.zoom-enter-active,
.zoom-leave-active {
  transition: opacity 0.5s ease;
}

.zoom-enter,
.zoom-leave-to {
  opacity: 0;
}
</style>
