<template>
  <tr :class="$style['body']" :style="userMargin">
    <td :class="[$style['column'], $style['column-first']]">
      {{ user.name }}
    </td>
    <td :class="[$style['column'], $style['column-second']]">
      {{ user.phone }}
    </td>
    <div v-if="hasChildren" :class="$style['user-children']">
      <list-transition>
        <tree-user v-for="user in user.usersList" :key="user.id" :user="user"
                   :spacing="spacing + 10"/>
      </list-transition>
    </div>
  </tr>
</template>

<script>
import ListTransition from '../transitions/ListTransition'

export default {
  name: 'TreeUser',
  components: {ListTransition},

  props: {
    user: {
      type: Object,
      required: true
    },

    spacing: {
      type: Number,
      default: 0
    }
  },

  computed: {
    userMargin () {
      return {
        'padding-left': `${this.spacing}px`
      }
    },

    hasChildren () {
      const {usersList} = this.user
      return usersList && usersList.length > 0
    }
  }
}
</script>

<style module lang="css">
.body {
  display: block;
  gap: 1.5rem;
  width: 100%;
  font-size: 1rem;
}

.column-first {
  width: 35%;
  word-break: break-all;
}

.column-second {
  width: 65%;
//border-left: 0.05rem solid var(--grey);
}

.user-children {
  display: flex;
  flex-direction: column;
}

tr {
  border-top: 0.05rem solid var(--grey);
  width: 100%;
}
</style>
