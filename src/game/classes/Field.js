export default class extends Array {
    constructor(width, height) {
        super(height);
        this.width = width;
    }

    get width() {
        return this[0].length;
    }
    set width(length) {
        this._setWidth(length);
    }

    get height() {
        return this.length;
    }
    set height(length) {
        const diff = length - this.length;
        this.length = length;
        if (diff > 0) 
            this._setWidth(this.width, length - diff - 1);
    }

    _setWidth(length, i = 0) {
        for (; i < this.length; i++)
            this[i] = Array.from({length}).fill(null);
    }
}