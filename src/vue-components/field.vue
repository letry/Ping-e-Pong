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
              {{cell || 1}}
          </td>
      </tr>
  </table>
</template>

<style>
    #obj {
        box-shadow: 0 0 0 5px inset, 0 0 5px 5px
    }
</style>
