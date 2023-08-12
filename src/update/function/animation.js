import phiThuyenClass from "../skill/phithuyen.js";

export default class animationClass extends phiThuyenClass {
    constructor() {
        super();
    }

    animation = (src, speed = 0.5, loop = true) =>  {
        let images  = src.map(e => this.coverImg(e));
        let sprite = new PIXI.AnimatedSprite(images);
        sprite.animationSpeed = speed;
        sprite.loop = loop;
        sprite.play();
        return sprite;
    }
}

/* 
    game.addEff({type : 'boom', from : '1'})
*/