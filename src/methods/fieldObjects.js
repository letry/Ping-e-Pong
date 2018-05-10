import PlayerController from '../game/classes/PlayerController';
import BallController from '../game/classes/BallController';
import FieldObject from '../game/classes/FieldObject';
import config from '../game/config/config.json';
import Ticker from '../game/utils/ticker';

export default {
    setPlayer(player) {
        const main = this.mainController;            
        const playerIndex = this.players.indexOf(player);
        const conf = config.controllers.players[playerIndex];
        const controller = PlayerController(conf);

        if (!player.object) 
            main.add(player.object = FieldObject('player', { hp: Infinity }), [
                !playerIndex ? 1 : this.width - 2,
                 Math.floor(this.height / 2)
            ]);
        else 
            Object.assign(player, {
                isReady: false,
                protection: 0,
                power: 0
            });

        this.setPlayerLength(player, player.length);
        this.setSpeed(player, player.speed);            
        main.bindController(player.object, controller);
        main.startTicker(player.object);
    },
    setBall(xy, direction) {
        const main = this.mainController;
        const ball = FieldObject('ball', { hp: Infinity, power: 3});
        main.add(ball, xy);
        main.bindController(ball, BallController({direction}));
        main.bindTicker(ball, Ticker(400 - this.difficult * 100, this.difficult * -1, {min: 50}));
        return ball;
    },
    setBorders(y) {
        const main = this.mainController;
        
        main.add(FieldObject('border', {
            hp: Infinity,
            protection: 0,
            width: this.width
        }), [0, y]);

        if (y) this.setBorders(0);
    },
    addWall(hp, x) {
        const iterates = this.multiWall ? this.height - 1 : 2;
        for (let y = 1; y < iterates; y++)
            this.mainController.add(FieldObject('wall', {
                protection: 2,
                width: 1, hp,
                length: this.multiWall ? 1 : this.height - 2
            }), [x, y]);
    }
};