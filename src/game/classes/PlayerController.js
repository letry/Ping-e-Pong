import Emitter from 'promise-event-emitter';
import Promisify from 'promisify-event-emitter'
const docEmitter = new Promisify(document);

export default (keyEventMap) => {
    const emitter = new Emitter();    

    const waitExistKeys = async () => 
        keyEventMap[(await docEmitter.once('keydown'))[0].key] || waitExistKeys();

    void async function move() {
        await emitter.once('canMove');

        await void async function waitMoveAndHandle() {
            const key = await waitExistKeys();
            emitter.emit('move', key);
            const [type] = await emitter.once('moveAnswer');
            if (type === 'redirect') return waitMoveAndHandle();
        }();

        return move();
    }();

    return emitter;
}
