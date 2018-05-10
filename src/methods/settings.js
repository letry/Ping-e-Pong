import Ticker from '../game/utils/ticker';

export default {
    resizeField(array, newLength, value) {
        const diff = newLength - array.length;

        return diff > 0
            ? array.push(...Array.from({length: diff}, value))
            : array.splice(newLength);
    },
    setReady(player) {
        player.isReady = true;
        if (this.players.every(({isReady}) => isReady)) 
            this.start();
    },
    setWallHp(player, hp) {
        player.wall = hp;
        const wallXindex = !this.players.indexOf(player) ? 0 : this.width - 1;
        const yIterates = this.multiWall ? this.height - 1 : 2;
        
        for (let y = 1; y < yIterates; y++)
            this.matrix[y][wallXindex].hp = hp;                
    },
    setSpeed(player, speed) {
        player.speed = speed;
        this.mainController.bindTicker(player.object, Ticker((200 + this.difficult * 100) / speed));
    },
    setPlayerLength(player, length) {
        const main = this.mainController;
        player.length = length;
        const xIndex = !this.players.indexOf(player) ? 1 : this.width - 2;

        main.remove(player.object);
        player.object.length = length;   // todo не сбрасывать координаты
        main.add(player.object, [xIndex, Math.floor(this.height / 2)]);
    }
};