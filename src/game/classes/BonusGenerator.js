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
    run() {
        
    }
}