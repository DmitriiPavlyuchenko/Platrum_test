<template>
  <zoom-transition>
    <div v-if="isModalOpen" :class="$style['modal-mask']" @click="close">
      <div :class="$style['modal-wrapper']">
        <div :class="$style['modal-container']" role="dialog" @click.stop>
          <div :class="$style['modal-header']">
            <slot name="header"></slot>
          </div>
          <div :class="$style['modal-body']">
            <slot name="body"></slot>
          </div>
          <div :class="$style['modal-footer']">
            <slot name="footer"></slot>
          </div>
          <button-base type="button" :class="$style['modal-close']" @click="close"
          >x
          </button-base>
        </div>
      </div>
    </div>
  </zoom-transition>
</template>

<script>
import {defineComponent} from 'vue'
import ZoomTransition from '../transitions/ZoomTransition.vue'

export default defineComponent({
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
})
</script>

<style lang="css" module>
.modal-mask {
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

.modal-wrapper {
  width: 100%;
}

.modal-container {
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

.modal-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.5rem;
  text-align: center;
  color: var(--black);
}

.modal-footer {
  display: flex;
  text-align: center;
  justify-content: center;
}

.modal-body {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.modal-button {
  color: var(--black);
  display: inline-block;
}

.modal-close {
  position: absolute;
  color: var(--black);
  font-size: 1.5rem;
  background-color: initial;
  top: 0.5rem;
  right: 0.5rem;
}

.modal-close:hover {
  color: var(--grey);
}
</style>
