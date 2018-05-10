import vector from '../utils/vector';
import FieldController from './FieldController';
import Emitter from 'promise-event-emitter';

export default class extends FieldController {
    constructor(field) {
        super(field);
        this.objectTickerMap = new Map();
        this.objectControllerMap = new Map();
        this.emitter = new Emitter();
        this.isStarted = true;
    }

    delete(object) {
        return [
            this.remove(object),
            this.objectTickerMap.delete(object),       
            this.objectControllerMap.delete(object),
        ]
    }

    bindController(object, controller) {
        return this.objectControllerMap.set(object, controller);
    }

    hit(object, target) {
        const delta = object.power - target.protection;
        if (delta > 0) target.hp -= delta;
        if (target.hp < 1) this.delete(target);
    }

    bindTicker(object, ticker) {
        return this.objectTickerMap.set(object, ticker);
    }

    stopGame(ball) {
        const [leftLose] = this.objectPositionMap.get(ball);
        for (const controller of this.objectControllerMap.values()) 
            for (const eventName of controller.eventNames()) 
                controller.off(eventName, 'reject', 'GameOver');
        this.emitter.emit('GameOver', leftLose);
    }

    async startTicker(object) {
        const controller = this.objectControllerMap.get(object);        

        while (this.isStarted && object.hp > 0) {
            const ticker = this.objectTickerMap.get(object);
            
            const tryMove = async (retries = 4) => {
                controller.emit('canMove');
                const [direction] = await controller.once('move');
                const { barrierDirection, barrierObject: target } = this.getBarrierInfo(object, direction);

                if (target === undefined && object.type === 'ball')
                    return this.stopGame(object);

                if (barrierDirection) {
                    this.crashHandle(object, target, direction, barrierDirection)
                    if (object.hp > 0 && target.hp >= 0 && retries > 0) 
                        return tryMove(--retries);
                }

                if (retries && target !== undefined) this.move(object, direction);
                controller.emit('moveAnswer', 'ok');
            }
            await tryMove();
            await ticker.tick();
        }
    }

    redirect(object, direction) {
        const controller = this.objectControllerMap.get(object);
        const position = this.objectPositionMap.get(object);

        return !controller ? false :
            controller.emit('moveAnswer', 'redirect', {
                direction, position
            });

    }

    crashHandle(object, target, direction, barrierDirection) {
        this.hit(object, target);
        this.hit(target, object);
        this.redirect(object, vector.reverse(barrierDirection));
        this.redirect(target, direction);
    }

    clear(saveTypes = []) {
        for (const object of this.objectPositionMap.keys()) 
            if (!saveTypes.includes(object.type))
                this.delete(object);
    }
}