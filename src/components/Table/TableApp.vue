<template>
  <table :class="$style.table">
    <tr :class="$style['title']">
      <td :class="[$style['column'], $style['column-first']]">
        Имя
      </td>
      <td :class="[$style['column'], $style['column-second']]">
        Телефон
      </td>
    </tr>
    <tr :class="$style['body']" v-for="user in users" :key="user.id">
      <td :class="[$style['column'], $style['column-first']]">
        {{ user.name }}
      </td>
      <td :class="[$style['column'], $style['column-second']]">
        {{ user.phone }}
      </td>
    </tr>
  </table>
</template>

<script lang="js">
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

.title {
  display: flex;
  gap: 1.5rem;
  width: 100%;
  font-size: 1.3rem;
}

.body {
  display: flex;
  gap: 1.5rem;
  width: 100%;
  font-size: 1rem;
}

.column {
  padding: 0.5rem;
  align-items: center;
}

.column-first {
  width: 35%;
  word-break: break-all;
}

.column-second {
  width: 65%;
  border-left: 0.05rem solid var(--grey);
}
</style>
