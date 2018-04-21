import vector from '../utils/vector';

export default class {
    constructor(field) {
        this.field = field;
        this.objectControllerMap = new Map();
        this.objectPositionMap = new Map();        
        this.objectTickerMap = new Map();
    }

    add(object, [x, y]) {
        if (this.getObjectsInRange(object, [x, y])
            .some(x => x.some(obj => obj && obj !== object))) return;

        this.objectPositionMap.set(object, [x, y]);       
        return fieldMapper(object, (xi, yi) => {
            return this.field[y + yi][x + xi] = object;
        });
    }

    move(object, direction) {
        const currentPosition = this.objectPositionMap.get(object); 
        const newPosition = vector.summ(currentPosition, direction);
        this.remove(object);
        this.add(object, newPosition);
    }

    remove(object) {
        const [x, y] = this.objectPositionMap.get(object);
        this.fieldMapper(object, (xi, yi) => {
            this.field[y + yi][x + xi] = null;
        });
        return [
            this.objectTickerMap.delete(object),
            this.objectControllerMap.delete(object),
        ];
    }

    bindController(object, controller) {
        return this.objectControllerMap.set(object, controller);
    }

    bindTicker(object, ticker) {
        const existing = this.objectTickerMap.get(object);
        const newConfig = { isRun: false, ticker };

        return existing ? Object.assign(exist, newConfig)
            : this.objectTickerMap.set(object, newConfig);
    }

    getBarrierInfo(object, direction) {
        const currentPosition = this.objectPositionMap.get(object);        
        const isDiagonal = direction.every(n => n);
        const checkingDirections = [direction];
        let barrierObject;
                
        if (isDiagonal) 
            checkingDirections.unshift(...[
                vector.summ(direction, [1, 0]),
                vector.summ(direction, [0, 1])
            ])
        
        const barrierDirection = checkingDirections.find(checkingDir => {
            const nextPosition = vector.summ(currentPosition, checkingDir);
            const nextRange = this.getObjectsInRange(object, nextPosition);
            return nextRange.some(x => x.some(obj => {
                if (obj !== null && obj !== object)
                    return barrierObject = obj;
            }));
        });

        return { barrierDirection, barrierObject };
    }

    hit(object, target) {
        const delta = object.power - target.protection;
        if (delta > 0) target.hp -= delta;
        if (target.hp < 1) this.remove(target);
    }

    async startTicker(object) {
        const controller = this.objectControllerMap.get(object);        
        const config = this.objectTickerMap.get(object);
        config.isRun = true;

        while (config.isRun && object.hp > 0) {
            await void function tryMove() {
                const movePromise = controller.once('move');
                controller.emit('canMove');
                const direction = await movePromise();
                const { barrierDirection, barrierObject: target } = this.getBarrierInfo(object, direction);

                if (barrierDirection) {
                    const targetController = this.objectControllerMap(target);
                    this.hit(object, target);
                    this.hit(target, object);

                    targetController.emit('moveAnswer', {
                        type: 'redirect', 
                        data: direction
                    });
                    controller.emit('moveAnswer', {
                        type: 'redirect', 
                        data: vector.reverse(barrierDirection)
                    });

                    if (object.hp > 0 && target.hp > 0) return tryMove();
                }

                this.move(object, direction);
                controller.emit('moveAnswer', {
                    type: 'ok', data: null
                });
            }();

            await config.ticker();
        }
    }

    stopTicker(object) {
        const config = this.objectTickerMap.get(object);
        return config ? !(config.isRun = false) : false;
    }

    getObjectsInRange({ length, width }, [x, y]) {
        return fieldMapper(object, (xi, yi) => {
            return this.field[y + yi][x + xi];          
        });
    }

    fieldMapper({ length, width }, func) {
        return Array.from({ length }, (v, yi) => {
            return Array.from({ length: width }, (v, xi) => {
                return func(xi, yi);
            });
        });
    }
}