import Emitter from 'promise-event-emitter';
import vector from '../utils/vector';

export default (config, {direction}) => {
    const emitter = new Emitter();    

    const getDirection = barrierDirection => 
        !barrierDirection ? direction
            : vector.chain(direction)
                .summ(barrierDirection)
                .normalizeWith(barrierDirection)
                .value;

    void async function move() {
        await emitter.once('canMove');

        await void async function waitMoveAndHandle(reason) {
            const direction = getDirection(reason);

            emitter.emit('move', direction);
            const answer = await emitter.once('moveAnswer');
            return answer.type === 'ok' 
                ? Promise.resolve() 
                : waitMoveAndHandle(answer.data);
        }();

        return move();
    }();

    return emitter;
}