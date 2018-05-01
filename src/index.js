import Vue from 'vue';
import gameField from './vue-components/field.vue';
import settings from './vue-components/settings.vue';

global.Vue = Vue;
global.vue = new Vue({
    el: '#app',
    components: {
        gameField,
        settings
    },
    data: {
        stage: 'settings',
        matrix: Array.from({length: 10}, () => Array(10).fill(null)),
        theme: 'easy',
        difficult: '1',        
        multiWall: false,
        bonuses: false        
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

            return diff > 0
                ? array.push(...Array.from({length: diff}, value))
                : array.splice(newLength);
        },
        start() {
            this.stage = 'prepare';
            console.log();
        }
    }
});
