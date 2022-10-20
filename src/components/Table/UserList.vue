<template>
  <table :class="$style.table">
    <tr :class="$style['title']">
      <td :class="[$style['column'], $style['column-first']]" :style="{cursor: 'pointer'}" @click="sortList">
        Имя
      </td>
      <td :class="[$style['column'], $style['column-second']]">
        Телефон
      </td>
    </tr>
    <list-transition>
      <user-tree v-for="user in users" :key="user.id" :user="user"/>
    </list-transition>
  </table>
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
  border-top: 0.05rem solid var(--grey);
  border-right: 0.05rem solid var(--grey);
}

.title {
  display: flex;
  gap: 1.5rem;
  width: 100%;
  font-size: 1.3rem;
  border-bottom: 0.05rem solid var(--grey);
}

.column {
  padding: 0.3rem;
  align-items: center;
}

.table > tr {
  border-left: 0.05rem solid var(--grey);
}

.table > .title > .column-first {
  min-width: 35%;
  word-break: break-all;
}

.table > .title > .column-second {
  min-width: 65%;
  display: flex;
}
</style>
