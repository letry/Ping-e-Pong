import common from './common';

export default {
    summ: (v1, v2) => v1.map((n, i) => n + v2[i]),
    multiply: (v1, v2) => v1.map((n, i) => n * v2[i]),
    reverse: v => v.map(n => -n || 0),
    normalizeWith(v1, v2, min = -1, max = 1) {
        const finder = n => n < min || n > max;
        const isUncertain = v1.some(finder);
        const isReplace = n => !isUncertain && !n || finder(n);

        return v1.map((n, i) => isReplace(v1[i]) ? v2[i] : n);
    },
    toValue(vector) {
        const isOdd = +vector.some(n => !n);
        const [x, y] = vector.map((n, isY) => 
            n < 0 ? 0 : +(!isOdd || n ||
            vector[0] === -1 || vector[1] === 1));

        return parseInt(`${x}${y}${isOdd}`, 2);
    },
    fromValue(value) {
        const isOdd = value % 2;
        const bitmask = (value >> 1).toString(2).padStart(2, 0);
        const yIs0 = bitmask[0] ^ bitmask[1];

        return bitmask.split('').map((str, isY) => 
            isOdd && !(isY ^ yIs0) ? 0 : +str || -1);
    },
    ...common
}