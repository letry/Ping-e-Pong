import bit from './bit';

export default {
    getInvert(bitmaskNumber) {
        return bit.invert(bitmaskNumber) ^ 1;
    },
    getMoveDelta(bitmaskNumber) {
        return parseInt(this.parseToMove(bitmaskNumber).map(Math.abs).join(''), 2);
    },
    ricochet(direction, barrierDirection) {
        return direction % 2 ? this.getInvert(direction) 
            : direction ^ (this.getMoveDelta(this.getInvert(barrierDirection)) << 1);
    }
}