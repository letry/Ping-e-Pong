import bonusConfig from '../config/bonusConfig';
import { inRange } from '../utils/random';

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
        this.tickerConfig.isRun = true;
        while(this.mainController.isStarted && this.tickerConfig.isRun) {
            
        }
    }
    generate() {
        const { value: name, arguments } = bonusConfig[inRange(0, bonusConfig.length)];
        const [ enableForTypes, value, period ] = arguments.map(f => f());

        return { 
            name, 
            value,
            period,
            enableForTypes
        }
    }
}
