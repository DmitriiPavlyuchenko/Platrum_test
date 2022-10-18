<template>
  <table :class="$style.table">
    <tr :class="$style['table__title']">
      <td :class="[$style['table__column'], $style['table__column-first']]">
        Имя
      </td>
      <td :class="[$style['table__column'], $style['table__column-second']]">
        Телефон
      </td>
    </tr>
    <tr :class="$style['table__body']" v-for="user in users" :key="user.id">
      <td :class="[$style['table__column'], $style['table__column-first']]">
        {{ user.name }}
      </td>
      <td :class="[$style['table__column'], $style['table__column-second']]">
        {{ user.phone }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'TableApp',
  props: {
    users: {
      required: false,
      type: Array
    }
  }
}
</script>

<style module lang="css">
.table {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 0.05rem solid var(--grey);
}

tr:not(:first-child) {
  border-top: 0.05rem solid var(--grey);
}

.table__title {
  display: flex;
  gap: 3rem;
  width: 100%;
  font-size: 1.3rem;
}

.table__body {
  display: flex;
  gap: 3rem;
  width: 100%;
  font-size: 1rem;
}

.table__column {
  padding: 0.5rem;
  align-items: center;
}

.table__column-first {
  width: 35%;
}

.table__column-second {
  width: 65%;
  border-left: 0.05rem solid var(--grey);
}
</style>
