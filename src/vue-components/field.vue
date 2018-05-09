<script>
import vector from '../game/utils/vector'
export default {
  name: 'game-field',
  props: {
      matrix: Array
  },
  methods: {
      getStyle(object) {
        const typesAdd = {
            ball: [0, 70, 0],
            player: [0, 0, 70]
        }
        const color = vector.summ(
            Array(3).fill( Math.min(object.hp, 255) * 50 ),
            typesAdd[object.type] || Array(3).fill(0)
        );
            
        return {
            boxShadow: `0 0 0 ${object.protection * 2}px inset, 0 0 ${object.power}px`,
            background: `rgb(${color})`
        }
      }
  }
}
</script>

<template>
      <table>
      <tr v-for="(row, rowIndex) of matrix" :key="rowIndex">
          <td v-for="(cell, cellIndex) of row"
              :style="cell ? getStyle(cell) : {}"
              :key="cellIndex">
          </td>
      </tr>
  </table>
</template>

<style>
    table {
        margin: 0 auto;
        background: #999999;
    }
    td {
        width: 30px;
        height: 30px;
        border: 1px solid black;
    }
</style>
