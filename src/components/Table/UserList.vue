<template>
  <div :class="$style.table">
    <ul :class="$style['title']">
      <li :class="[$style['column'], $style['column-title']]">
        <span :style="{cursor: 'pointer'}" @click="sortList">Имя</span>
        <span>Телефон</span>
      </li>
    </ul>
    <list-transition>
      <user-tree v-for="user in users" :key="user.id" :user="user"/>
    </list-transition>
  </div>
</template>

<script lang="js">
import ListTransition from '../transitions/ListTransition'
import UserTree from './UserTree'

export default {
  name: 'UserList',
  components: {ListTransition, UserTree},

  props: {
    users: {
      required: false,
      type: Array
    }
  },

  emits: ['sort'],

  methods: {
    sortList () {
      this.$emit('sort')
    }
  }
}
</script>

<style module lang="css">
.table {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 0.05rem solid var(--grey);
}

.column-title {
  display: flex;
  font-size: 1.3rem;
}

.column-title > :first-child {
  width: 40%;
  padding-left: 0.3rem;
}

.column-title > :last-child {
  width: 60%;
  padding-left: 0.5rem;
}
</style>
