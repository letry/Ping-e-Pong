import Vue from 'vue';
import gameField from './vue-components/field.vue';
import settings from './vue-components/settings.vue';
import playerSettings from './vue-components/playerSettings.vue';

import MainController from './game/classes/MainController';
import PlayerController from './game/classes/PlayerController';
import BallController from './game/classes/BallController';
import FieldObject from './game/classes/FieldObject';
import Ticker from './game/utils/ticker';
import config from './game/config/config.json';

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
            this.setBorders(main);
            this.setPlayers(main);
            this.setBall(main, [1, 1], [1, 1]);
            this.setBall(main, [7, 1], [-1, 1]);
            this.addWall(main);
        },
        setPlayers(main) {
            const { player1 } = config.controllers;
            const controller = PlayerController(player1);
            const ticker = Ticker(200);          
            const player = FieldObject('wall', {
                hp: Infinity,
                width: 1
            });
            main.add(player, [1, 3]);
            main.bindController(player, controller);
            main.bindTicker(player, ticker);
            main.startTicker(player);
        },
        setBall(main, xy, direction) {
            const controller = BallController({direction});
            const ticker = Ticker(1000);          
            const ball = FieldObject('ball', {
                hp: Infinity,
                width: 1,
                length: 1,
                power: 1
            });
            main.add(ball, xy);
            main.bindController(ball, controller);
            main.bindTicker(ball, ticker);
            main.startTicker(ball);
        },
        addWall(main) {
            main.add(FieldObject('wall', {
                hp: 3,
                protection: 0,
                length: 8
            }), [0, 1]);

            main.add(FieldObject('wall', {
                hp: 3,
                protection: 0,
                length: 8
            }), [9, 1]);
        },
        setBorders(main) {
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
            };

            if (this.multiWall)
                for (let i = 0; i < this.matrix[0].length; i++)
                    setWalls(i, 1, Infinity, 0);
            else
                setWalls(0, this.matrix.length, Infinity, 0);
        }
    }
});
