export default class {
    constructor(type = 'block', {hp = 1, protection = 0, power = 0, length = 1, width = 1}) {
        Object.assign(this, {
            protection,
            length,
            width,
            power,
            type,
            hp
        });
    }
}