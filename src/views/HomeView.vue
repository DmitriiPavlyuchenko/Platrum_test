<template>
  <table-app></table-app>
</template>

<script lang="js">
import UsersList from '../components/Table/TableApp.vue'
import TableApp from '../components/Table/TableApp'

export default {
  name: 'HomeView',
  components: {TableApp, UsersList}
}
</script>
