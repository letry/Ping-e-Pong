import MainController from '../game/classes/MainController';
import { inRange } from '../game/utils/random';
import Ticker from '../game/utils/ticker';

export default {
    async start() {
        this.stage = 'play';
        const ticker = Ticker(1e3);                        
        const ball = this.setBall([
            Math.ceil(this.width / 2),
            Math.ceil(this.height / 2)
        ], [
            inRange(0, 2) || -1,
            inRange(0, 2) || -1
        ]);
        const showTempMessage = async (message, seconds) => {
            this.message = message;
            await Ticker(seconds * 1e3).tick();
            this.message = '';
        }
        const countdown = async iterates => {
            if (!iterates) return;
            await showTempMessage(iterates, 1);      
            return await countdown(--iterates)
        }

        await showTempMessage('Обратный отсчёт', 1);
        await countdown(3);

        this.mainController.startTicker(ball);

        showTempMessage('Игра началась!', 3);

        const [rightPlayerIsWinner] = await this.mainController.emitter.once('GameOver');
        
        this.stage = 'gameOver';
        this.players[+!rightPlayerIsWinner].points++;
        await showTempMessage(`Победил игрок ${+!rightPlayerIsWinner + 1}`, 5);
    },

    prepare(isReset) {
        this.stage = 'prepare';

        if (!this.mainController) 
            this.mainController = new MainController(this.matrix);

        if (!isReset) 
            this.setBorders(this.height - 1);

        for (let i = 0; i < this.players.length; i++) {
            const player = this.players[i];
            this.setPlayer(player);                
            this.addWall(player.wall, !i ? 0 : this.width - 1);
        }
    },

    resetTo(stage) {
        const main = this.mainController;
        main.clear(['player', 'border']);
        this.prepare(true);

        switch (stage) {
            case 'settings':
                for (const player of this.players) player.object = null;
                main.clear();
                this.stage = 'settings';
            break;
            case 'start':
                this.start();
            break;
        }
    }
};