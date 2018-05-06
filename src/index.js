import Vue from 'vue';
import gameField from './vue-components/field.vue';
import settings from './vue-components/settings.vue';
import playerSettings from './vue-components/playerSettings.vue';

import MainController from './game/classes/MainController';
import PlayerController from './game/classes/PlayerController';
import BallController from './game/classes/BallController';
import FieldObject from './game/classes/FieldObject';
import Ticker from './game/utils/ticker';
import { inRange } from './game/utils/random';
import config from './game/config/config.json';

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
            length: 1,
            wall: 1,
            speed: 1,
            isReady: false,
            object: {}
        }, {
            points: 6,
            length: 1,
            wall: 1,
            speed: 1,
            isReady: false,
            object: {}
        }],
        mainController: {}
    },
    computed: {
        width: {
            get() {
                return this.matrix[0].length;
            },
            set(value) {
                for(const row of this.matrix) 
                    this.resizeField(row, value, () => null);
            }
        },
        height: {
            get() {
                return this.matrix.length;
            },
            set(value) {
                this.resizeField(
                    this.matrix, value,
                    () => Array(this.matrix[0].length).fill(null)
                );
            }
        }
    },
    methods: {
        resizeField(array, newLength, value) {
            const diff = newLength - array.length;

            return diff > 0
                ? array.push(...Array.from({length: diff}, value))
                : array.splice(newLength);
        },
        setReady(player) {
            player.isReady = true;
            if (this.players.every(({isReady}) => isReady)) 
                this.start();
        },
        setWallHp(player, hp) {
            player.wall = hp;
            const wallXindex = !this.players.indexOf(player) ? 0 : this.width - 1;
            const yIterates = this.multiWall ? this.height - 1 : 2;
            
            for (let y = 1; y < yIterates; y++)
                this.matrix[y][wallXindex].hp = hp;                
        },
        setSpeed(player, speed) {
            player.speed = speed;
            this.mainController.bindTicker(player.object, Ticker(500 / speed));
        },
        setPlayerLength(player, length) {
            const main = this.mainController;
            player.length = length;
            const xIndex = !this.players.indexOf(player) ? 1 : this.width - 2;

            main.remove(player.object);
            player.object.length = length;   // todo не сбрасывать координаты
            main.add(player.object, [xIndex, Math.floor(this.height / 2)]);
        },
        prepare() {
            this.stage = 'prepare'; 
            this.mainController = new MainController(this.matrix);
            this.setBorders();

            for (let i = 0; i < this.players.length; i++) {
                const player = this.players[i];
                this.addWall(player.wall, !i ? 0 : this.width - 1);
                this.setPlayer(player);
            }
        },
        start() {
            this.stage = 'play';
            const ball = this.setBall([
                Math.ceil(this.width / 2),
                Math.ceil(this.height / 2)
            ], [
                inRange(0, 2) || -1,
                inRange(0, 2) || -1
            ]);

            setTimeout(() => {
                this.mainController.startTicker(ball);
            }, 3e3);
        },
        setPlayer(player) {
            const main = this.mainController;            
            const playerIndex = this.players.indexOf(player);
            const conf = config.controllers.players[playerIndex];
            const controller = PlayerController(conf);        
            player.object = FieldObject('wall', {
                length: player.length,
                hp: Infinity
            });
            this.setSpeed(player, player.speed);            

            main.add(player.object, [
                !playerIndex ? 1 : this.width - 2,
                 Math.floor(this.height / 2)
            ]);
            main.bindController(player.object, controller);
            main.startTicker(player.object);
        },
        setBall(xy, direction) {
            const main = this.mainController;
            const controller = BallController({direction});
            const ticker = Ticker(200);          
            const ball = FieldObject('ball', {
                hp: Infinity,
                width: 1,
                length: 1,
                power: 3
            });
            main.add(ball, xy);
            main.bindController(ball, controller);
            main.bindTicker(ball, ticker);
            return ball;
        },
        setBorders() {
            const main = this.mainController;
            main.add(FieldObject('wall', {
                hp: Infinity,
                protection: 0,
                width: this.width
            }), [0, 0]);

            main.add(FieldObject('wall', {
                hp: Infinity,
                protection: 0,
                width: this.width
            }), [0, this.height - 1]);
        },
        addWall(hp, x) {
            const block = this.multiWall ? this.height - 1 : 2;
            for (let y = 1; y < block; y++) {
                this.mainController.add(FieldObject('wall', {
                    protection: 2,
                    width: 1, hp,
                    length: this.multiWall ? 1 : this.height - 2
                }), [x, y]);
            }
        }
    }
});
