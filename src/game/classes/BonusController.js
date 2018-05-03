import Emitter from 'promise-event-emitter';
import vector from '../utils/vector';

export default ({ activatorList, mainController, activate, value }) => {
    const emitter = new Emitter();    

    void async function move() {
        const [type, data] = await emitter.once('moveAnswer');
        if (type === 'ok') return move();

        const {position, direction} = data;
        const [x, y] = vector.summ(position, direction);
        const activator = mainController.field[y][x];

        if (activator.type.includes('bonus') 
        || !activatorList.includes(activator.type)) {
            emitter.emit('move', direction);
            return move();
        }
        
        return activate({ mainController, direction, position, value });
    }();

    return emitter;
}