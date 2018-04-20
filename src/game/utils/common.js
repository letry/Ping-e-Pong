export default {
    chain(start) {
        return new Proxy(this, {
            get: (target, prop, receiver) => prop === 'value' ? start
                : (...args) => {
                    start = target[prop](start, ...args);
                    return receiver;
                }
        });
    }
}