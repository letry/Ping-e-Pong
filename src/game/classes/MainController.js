import vector from '../utils/vector';
import FieldController from './FieldController';

export default class extends FieldController {
    constructor(field) {
        super(field);
        this.objectTickerMap = new Map();
        this.objectControllerMap = new Map();        
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
        const existing = this.objectTickerMap.get(object);
        const newConfig = { isRun: false, ticker };
        return existing ? Object.assign(existing, newConfig)
            : this.objectTickerMap.set(object, newConfig);
    }

    async startTicker(object) {
        const controller = this.objectControllerMap.get(object);        
        const config = this.objectTickerMap.get(object);
        config.isRun = true;

        while (config.isRun && object.hp > 0) {
            const position = this.objectPositionMap(target);
            
            await void function tryMove(retries = 3) {
                controller.emit('canMove');
                const [direction] = await controller.once('move');
                const { barrierDirection, barrierObject: target } = this.getBarrierInfo(object, direction);

                if (barrierDirection) {
                    const targetController = this.objectControllerMap(target);
                    const targetPosition = this.objectPositionMap(target);

                    this.hit(object, target);
                    this.hit(target, object);

                    targetController.emit('moveAnswer', 'redirect', {
                        direction,
                        position: targetPosition
                    });
                    controller.emit('moveAnswer', 'redirect', {
                        direction: vector.reverse(barrierDirection),
                        position
                    });

                    if (object.hp > 0 && target.hp >= 0 && retries) 
                        return tryMove(--retries);
                }

                this.move(object, direction);
                controller.emit('moveAnswer', 'ok');
            }();

            await config.ticker.tick();
        }
    }

    stopTicker(object) {
        const config = this.objectTickerMap.get(object);
        return config ? !(config.isRun = false) : false;
    }
}