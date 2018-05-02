import vector from '../utils/vector';

export default class {
    constructor(field) {
        this.field = field;
        this.objectPositionMap = new Map();  
    }

    add(object, [x, y]) {
        this.objectPositionMap.set(object, [x, y]);       
        return this.fieldMapper(object, (xi, yi) => {
            return this.field[y + yi].splice(x + xi, 1, object);
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
            this.field[y + yi].splice(x + xi, 1, null);
        });
        return this.objectPositionMap.delete(object);
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