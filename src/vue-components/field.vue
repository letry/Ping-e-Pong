<script>
export default {
  name: 'game-field',
  props: {
      matrix: Array
  }
}
</script>

<template>
      <table>
      <tr v-for="(row, rowIndex) of matrix" :key="rowIndex">
          <td v-for="(cell, cellIndex) of row" :key="cellIndex">
              {{cell}}
          </td>
      </tr>
  </table>
</template>

<style>

</style>
