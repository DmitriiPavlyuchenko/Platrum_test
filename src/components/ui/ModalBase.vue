<template>
  <zoom-transition>
    <div v-if="isModalOpen" :class="$style['mask']" @click="close">
      <div :class="$style['wrapper']">
        <div :class="$style['container']" role="dialog" @click.stop>
          <div :class="$style['header']">
            <slot name="header"></slot>
          </div>
          <div :class="$style['body']">
            <slot name="body"></slot>
          </div>
          <div :class="$style['footer']">
            <slot name="footer"></slot>
          </div>
          <button type="button" :class="$style['close']" @click="close"
          >x
          </button>
        </div>
      </div>
    </div>
  </zoom-transition>
</template>

<script lang="js">
import ZoomTransition from '../transitions/ZoomTransition.vue'

export default {
  name: 'ModalBase',

  components: {ZoomTransition},

  props: {
    isModalOpen: {
      type: Boolean,
      required: true
    }
  },

  emits: ['closeModal'],

  mounted () {
    document.addEventListener('keydown', this.handleKeydown)
  },

  beforeUnmount () {
    document.removeEventListener('keydown', this.handleKeydown)
  },

  methods: {
    handleKeydown (event) {
      if (this.isModalOpen && event.key === 'Escape') {
        this.close()
      }
    },

    close () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="css" module>
.mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.5s ease;
}

.wrapper {
  width: 100%;
}

.container {
  position: relative;
  max-width: 22.5rem;
  width: 100%;
  min-height: 10rem;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 0 auto;
  padding: 20px 30px;
  background-color: var(--white);
  border-radius: 0.5rem;
  transition: all 0.7s ease;
}

.header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.5rem;
  text-align: center;
  color: var(--black);
}

.footer {
  display: flex;
}

.body {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.button {
  color: var(--black);
  display: inline-block;
}

.close {
  position: absolute;
  color: var(--black);
  font-size: 1.5rem;
  background-color: initial;
  top: 0.5rem;
  right: 0.5rem;
}

.close:hover {
  color: var(--grey);
}
</style>
