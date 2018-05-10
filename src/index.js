import Vue from 'vue';
import gameField from './vue-components/field.vue';
import settings from './vue-components/settings.vue';
import playerSettings from './vue-components/playerSettings.vue';

import fieldObjects from './methods/fieldObjects';
import settingsHandlers from './methods/settings';
import stage from './methods/stage';

new Vue({
    el: '#app',
    components: {
        gameField,
        settings,
        playerSettings    
    },
    data: {
        message: '',
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
            object: null
        }, {
            points: 6,
            length: 1,
            wall: 1,
            speed: 1,
            isReady: false,
            object: null
        }],
        mainController: null
    },
    computed: {
        title() {
            const stageTitleMap = {
                settings: 'Пинг-е-Понг',
                prepare: 'Подготовка игроков'
            }
            return stageTitleMap[this.stage];
        },
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
        ...stage,
        ...fieldObjects,
        ...settingsHandlers,        
    }
});