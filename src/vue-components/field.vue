<script>
export default {
  name: 'game-field',
  props: {
      matrix: Array
  },
  methods: {
      getStyle(object) {
          return {
              
          };
      }
  }
}
</script>

<template>
      <table>
      <tr v-for="(row, rowIndex) of matrix" :key="rowIndex">
          <td v-for="(cell, cellIndex) of row"
              :style="getStyle(cell)"
              :key="cellIndex">
          </td>
      </tr>
  </table>
</template>

<style>
    table {
        margin: 0 auto;
    }
    td {
        width: 30px;
        height: 30px;
        border: 1px solid black;
    }
    #obj {
        box-shadow: 0 0 0 5px inset, 0 0 5px 5px
    }
</style>
