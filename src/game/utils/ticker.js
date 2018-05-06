export default (interval, tickIncrement = 0, { min = 0, max = Infinity } = {}) => ({
    get interval() {
        return interval;
    },
    set interval(val) {
        return interval = val;
    },
    tick() {
        return new Promise(resolve => setTimeout(() => {
            const nextInterval = interval + tickIncrement;
            if (nextInterval > min && nextInterval < max) 
                interval = nextInterval;
            resolve();
        }, interval));
    }
});
