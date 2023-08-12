import animationClass from "../function/animation.js";


export default class flyFirstCharset extends animationClass {
    constructor() {
        super();
    }

    baylenEFF2 = (element) => {
        let addnewskill = this.getEff(element.id);
        let donDanh = this.imgEff(addnewskill, element.id);
        let NhanVat = this.getNhanVat(element.by);
        if(!NhanVat) return element.type = 'delete';

        let src = [2155,2156,2157];
        donDanh.run = donDanh.run || 1;

        if(donDanh.run == 1)
        {
            donDanh.run = 2;
            let sprite = new PIXI.AnimatedSprite(src.map(e => this.coverImg(e)));
            sprite.animationSpeed = 0.2;
            sprite.loop = false;
            sprite.x = NhanVat.x - Math.abs(NhanVat.width) - 50  ;
            sprite.y = NhanVat.y + sprite.height/2;
            sprite.scale.set(0.5);
            sprite.play();
            addnewskill.addChild(sprite);
            sprite.onComplete = () => {
                element.type = 'delete';
            }
        }



    }

    baylenEFF = (element) => {
        let addnewskill = this.getEff(element.id);
        let donDanh = this.imgEff(addnewskill, element.id);
        let NhanVat = this.getNhanVat(element.by);
        if(!NhanVat) return element.type = 'delete';

        let src = [2155,2156,2157];
        donDanh.run = donDanh.run || 1;

        if(donDanh.run == 1)
        {
            donDanh.run = 2;
            let sprite = new PIXI.AnimatedSprite(src.map(e => this.coverImg(e)));
            sprite.animationSpeed = 0.2;
            sprite.loop = false;
            sprite.x = NhanVat.x - Math.abs(NhanVat.width) - 50  ;
            sprite.y = NhanVat.y+80 + sprite.height/2;
            sprite.scale.set(0.5);
            sprite.play();
            addnewskill.addChild(sprite);
            sprite.onComplete = () => {
                element.type = 'delete';
            }
        }



    }


    moveEFF = (element) => {
        let addnewskill = this.getEff(element.id);
        let donDanh = this.imgEff(addnewskill, element.id);
        let NhanVat = this.getNhanVat(element.by);
        if(!NhanVat) return element.type = 'delete';

        let src = ["now_chay_3","now_chay_2","now_chay_1"];
        donDanh.run = donDanh.run || 1;

        if(donDanh.run == 1)
        {
            donDanh.run = 2;
            let sprite = new PIXI.AnimatedSprite(src.map(e => this.coverImg(e)));
            sprite.animationSpeed = 0.5;
            sprite.loop = false;
            sprite.x = NhanVat.x - Math.abs(NhanVat.width) - 50  ;
            sprite.y = NhanVat.y + NhanVat.height - sprite.height/2;
            sprite.play();
            addnewskill.addChild(sprite);
            sprite.onComplete = () => {
                element.type = 'delete';
            }
        }



    }
}