import Vue from 'vue';
import gameField from './vue-components/field.vue';
import settings from './vue-components/settings.vue';

global.Vue = Vue;
const getMatrix = (height, width) =>
    Array.from({length: height}, () => Array(width).fill(null));

global.vue = new Vue({
    el: '#app',
    components: {
        gameField,
        settings
    },
    data: {
        matrix: getMatrix(10, 10)
    },
    computed: {
        width: {
            get() {
                return this.matrix[0].length;
            },
            set(value) {
                for(const row of this.matrix) 
                    this.resize(row, value, () => null);
            }
        },
        height: {
            get() {
                return this.matrix.length;
            },
            set(value) {
                this.resize(
                    this.matrix, value,
                    () => Array(this.matrix[0].length).fill(null)
                );  
            }
        }
    },
    methods: {
        resize(array, newLength, value) {
            const diff = newLength - array.length;
            const isIncrease = diff > 0;

            array.splice(
                isIncrease ? array.length : newLength,
                isIncrease ? 0 : Math.abs(diff),
                ...Array.from({length: diff}, value)
            ); 
        }
    }
});
