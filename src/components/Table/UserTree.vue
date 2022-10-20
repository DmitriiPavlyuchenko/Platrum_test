<template>
  <tr :class="$style['body']" :style="userPadding">
    <b-alert show :class="$style.alert" class="d-flex justify-content-between mb-1">
      <span v-if="hasChildren">+</span>
      <span v-else-if="child">+</span>
      {{ user.name }}
      {{ user.phone }}
    </b-alert>
    <!--    <td :class="[$style['column'], $style['column-first']]" :style="borderBottom">-->
    <!--    </td>-->
    <!--    <td :class="[$style['column'], $style['column-second']]" :style="[userMargin, borderBottom]">-->
    <!--    </td>-->
    <div v-if="hasChildren" :class="$style['user-children']">
      <list-transition>
        <user-tree v-for="user in user.usersList" :key="user.id" :user="user"
                   :spacing="spacing + 5" :child="true" :margin="margin + 5" :border-top="borderBottom"/>
      </list-transition>
    </div>
  </tr>
</template>

<script>
import ListTransition from '../transitions/ListTransition'

export default {
  name: 'UserTree',
  components: {ListTransition},

  props: {
    user: {
      type: Object,
      required: true
    },

    spacing: {
      type: Number,
      default: 0
    },

    margin: {
      type: Number,
      default: 0
    },

    child: {
      type: Boolean
    }
  },

  computed: {
    userPadding () {
      return {
        'padding-left': `${this.spacing}px`
      }
    },

    borderBottom () {
      return {
        'border-bottom': '0.05rem solid var(--grey)'
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
  display: grid;
  grid-template-columns: 40% 60%;
  width: 100%;
  font-size: 1rem;
}

.user-children > span > .body {
  display: flex;
  justify-content: space-between;
}

.column-first {
  width: 35%;
  word-break: break-all;
}

.column-second {
  width: 65%;
  display: flex;
  flex: 0 0 100%;
}

span > tr > td {
  border-left: 0.05rem solid var(--grey);
}

td {
  min-width: 100%;
  padding: 0.3rem;
}

.alert {
  display: flex;
  justify-content: space-between;
}
</style>
