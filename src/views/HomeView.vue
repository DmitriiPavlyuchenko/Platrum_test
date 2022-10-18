<template>
  <div :class="$style.container">
    <div :class="$style.buttons">
      <ButtonBase :class="$style.button">Добавить</ButtonBase>
    </div>
    <TableApp/>
  </div>
</template>

<script>
import TableApp from '../components/Table/TableApp'
import ButtonBase from '../components/ui/ButtonBase'

export default {
  name: 'HomeView',
  components: {TableApp, ButtonBase}
}
</script>

<style module lang="css">
.container {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 30%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

.buttons {
  align-self: flex-end;
}
</style>
