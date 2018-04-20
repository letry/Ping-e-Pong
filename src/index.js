import Vue from 'vue';
import gameField from './vue-components/field.vue';
import PromiseEmmiter, {PromisifyEventEmitter} from './game/classes/PromiseEmitter';
global.PromiseEmmiter = PromiseEmmiter;
global.PromisifyEventEmitter = PromisifyEventEmitter;

global.vue = new Vue({
    el: '#app',
    data: {
        matrix: [
            [1,2,3,4],
            [1,2,3,4],
            [1,2,3,4],
            [2,3,4,5]
        ]
    },
    components: {
        gameField
    },
    methods: {
        handler(...args) {
            console.log(args);
        }
    }
});
