import Vue from 'vue';
import gameField from './vue-components/field.vue';
import settings from './vue-components/settings.vue';
import Field from './game/classes/Field';

global.vue = new Vue({
    el: '#app',
    data: {
        matrix: new Field(10, 10)
    },
    components: {
        gameField,
        settings
    },
    methods: {
        handler(...args) {
            console.log(args);
        }
    }
});
