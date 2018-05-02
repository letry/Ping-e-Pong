import Vue from 'vue';
import gameField from './vue-components/field.vue';
import settings from './vue-components/settings.vue';
import playerSettings from './vue-components/playerSettings.vue';

import MainController from './game/classes/MainController';
import FieldObject from './game/classes/FieldObject';

global.Vue = Vue;
global.vue = new Vue({
    el: '#app',
    components: {
        gameField,
        settings,
        playerSettings
    },
    data: {
        stage: 'settings',
        matrix: Array.from({length: 10}, () => Array(10).fill(null)),
        theme: 'easy',
        difficult: '1',
        multiWall: false,
        bonuses: false,
        players: [{
            points: 6,
            width: 1,
            wall: 1,
            speed: 1
        }, {
            points: 6,
            width: 1,
            wall: 1,
            speed: 1
        }]
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
            const main = global.ctrl = new MainController(this.matrix);

            const setWalls = (x, width, hp, protection) => {
                main.add(FieldObject('wall', {
                    hp,
                    protection,
                    width
                }), [x, 0]);

                main.add(FieldObject('wall', {
                    hp,
                    protection,
                    width
                }), [x, this.matrix.length - 1]);
            }

            if (this.multiWall)
                for (let i = 0; i < this.matrix[0].length; i++)
                    setWalls(i, 1, Infinity, 0);
            else
                setWalls(0, this.matrix.length, Infinity, 0);

            console.log();
        }
    }
});
