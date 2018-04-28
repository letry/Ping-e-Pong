import config from '../config/config';
import { byConfig, inRange } from '../utils/random';

export default class {
    constructor(mainController) {
        Object.assign(this, {
            mainController,
            tickerConfig: {
                isRun: false,
                ticker: {}
            }
        });
    }
    bindTicker(ticker) {
        this.tickerConfig.ticker = ticker;
    }
    stop() {
        this.tickerConfig.isRun = false;
    }
    start() {
        
    }
    generate() {
        const types = ['ball', 'wall', 'player'];
        types.splice(inRange(0, 3), 1);
        const bitMapForActivatorType = byConfig(config.chanceBalance.disabledForTypes).toString(2).padStart(2, 0);
        const disabledForTypes = types.filter((type, i) => +bitMapForActivatorType[i]);
        const value = byConfig(config.chanceBalance.value);
        const props = { disabledForTypes, value };

        const getHandler = method => (array, array1) => 
            array[method](val => array1.includes(val));

        const funcs = {
            every: getHandler('every'),
            equalOr: getHandler('some'),
            equal: (val, val1) => val === val1,
            inRange: (value, [min, max]) => 
                value >= min && value <= max
        }

        const possibleBonuses = config.bonuses.filter(bonus => {
            return bonus.possible.every(({func, prop, data}) => {
                return funcs[func](props[prop], data);
            });
        });

        const chanceBonusConfig = possibleBonuses
            .map(({value}) => ({value, chance: 1 / possibleBonuses.length}));

        return { 
            name: byConfig(chanceBonusConfig),
            disabledForTypes,
            value
        };
    }
}
