<template>
  <div :class="$style.container">
    <TableApp/>
  </div>
</template>

<script>
import TableApp from '../components/Table/TableApp'

export default {
  name: 'HomeView',
  components: {TableApp}
}
</script>

<style module lang="css">
.container {
  display: flex;
  width: 30%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}
</style>
