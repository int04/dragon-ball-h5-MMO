import hoakhiUpdate from "./hoakhi.js";
export default class updateKamejoko extends hoakhiUpdate {
    constructor() {
        super();
    }

    getSpriteMap = (id) => {
        let sprite = false; 
        if(id == this.my.id) sprite = this.NhanVat;
        else sprite = this.nguoichoi.getChildByName(id);

        if(!sprite) return false;
        return sprite;
    }
    getInfoMap = (id) => {
        let sprite = false;
        if(id == this.my.id) sprite = this.my;
        else sprite = this.Charset.find(e => e.id == id);

        if(!sprite) return false;
        return sprite;
    }
    /*
        game.dataSkill.push({
            from : 1,
            to : 'a2a',
            type : 'kamejoko',
            id : 'kamejoko',

        })
    */

    handleKamejoko = (element) => {
        let from = element.from;
        let to = element.to;

        let spriteFrom = this.getSpriteMap(from);
        let spriteTo = this.getSpriteMap(to);
        if(!spriteFrom || !spriteTo) return element.type = 'delete';

        let addnewskill = this.getEff(element.id);
        let donDanh = this.imgEff(addnewskill, element.id);

        donDanh.start = donDanh.start || 0;

        if(donDanh.start == 0) 
        {
            donDanh.start = 1;
            let startY = spriteFrom.y - 50;
            let startX = spriteFrom.x;
            let targetX = spriteTo.x;
            let targetY = spriteTo.y ;
            
            
            let num1 = new PIXI.Sprite(this.coverImg("64"));
            num1.name ="goc";
            addnewskill.addChild(num1);
            num1.x = startX;
            num1.y = startY;

            let max  =3;
            for(let i = 0; i < max; i++) {
                let num = new PIXI.Sprite(this.coverImg("64"));
                num.x = num1.x - num.width*(i);
                num.y = num1.y;
                num.name ="kame"
                num1 = num;
                addnewskill.addChild(num);
            }

            let self = this;
            const speed = 0.9; // Tốc độ di chuyển (pixel/giây)

            let distance = Math.sqrt(Math.pow(targetX - startX, 2) + Math.pow(targetY - startY, 2));
            let time = distance / speed;
            // tween
            let tween = new TWEEN.Tween(num1)
            .to({x : targetX, y : targetY}, time)
            .easing(TWEEN.Easing.Linear.None) // Loại easing, có thể thay đổi
            .onComplete(function(){
            })
            .start();
            

        }

        let donDanhx = this.imgEff(addnewskill, 'goc');
        let listkame = addnewskill.children.filter(e => e.name == "kame");
        if(listkame.length > 0) {
            listkame.forEach((e,i) => {
                e.x = donDanhx.x - e.width*(i);
            })
        }

        
    }
}