<template>
  <ul :class="$style['body']">
    <li :class="$style.wrapper">
      <span :class="$style.name" :style="userPadding">
      <span v-if="hasChildren">+</span>
      <span v-else-if="child">+</span>
        {{ user.name }}</span>
      <span :class="$style.phone">{{ user.phone }}</span>
    </li>
    <div v-if="hasChildren" :class="$style['user-children']">
      <list-transition>
        <user-tree v-for="user in user.usersList" :key="user.id" :user="user"
                   :spacing="spacing + 5" :child="true" :margin="margin + 5" :border-top="borderBottom"/>
      </list-transition>
    </div>
  </ul>
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
.wrapper {
  display: flex;
  padding-left: 0.5rem;
  border-top: 0.05rem solid var(--grey);
}

.phone {
  flex: 0 0 60%;
  padding-left: 0.3rem;
}

.name {
  flex: 0 0 40%;
  padding-left: 2rem;
}

ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
}

li {
  display: flex;
  height: 1.8rem;
  align-items: center;
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

.alert {
  display: flex;
  justify-content: space-between;
}
</style>
