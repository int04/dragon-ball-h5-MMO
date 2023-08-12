import qckkUpdate from "./qckk.js";

export default class effUpdateSucManh extends qckkUpdate {
    constructor() {
        super();
    }

    getPlayPhuKien = (id) => {
        if(id == this.my.id) {
            return this.NhanVat_phukien;
        }
        let nguoichoi_phukien = this.nguoichoi_phukien.getChildByName(id);
        if(!nguoichoi_phukien) return false;
        return nguoichoi_phukien;
    }

    EffPlayer = async (element,value = null) => {
        if(element.them) value = element.them;
        let addnewskill = this.getEff2(element.id);
        let donDanh = this.imgEff(addnewskill, element.id);
        let NhanVat = this.getNhanVat(element.by);
        if(!NhanVat) return element.type = 'delete';

        donDanh.run = donDanh.run || 1;

        let getMy = this.getMy(NhanVat.id);
        let src= [];

        let sucmanh = getMy.info.coban.sucmanh;
        let he = getMy.info.coban.type;

        let sheeet = [
            {
                src : [984,964,965,966,967,982,983],
                width : 100,
                height : 130,
                speed : 0.5,
            },
            {
                src : [971,972,973,974],
                width : 80,
                height : 50,
                speed : 0.4,
            },
            {
                src : [986,975,977,978],
                width : 100,
                height : 120,
                speed : 0.5,
            }, 

            {
                src : [984,964,965,966,967,982,983],
                width : 100,
                height : 130,
                speed : 0.5,
                them : 1,
            },

            {
                src : [971,972,973,974],
                width : 80,
                height : 50,
                speed : 0.4,
                them : 2,
            },
            {
                src : [986,975,977,978],
                width : 100,
                height : 120,
                speed : 0.5,
                them : "0",
            }, 
            {
                sheet: "aura_13_0",
                length: 4,
                width : 150,
                height : 200,
                w : 400,
                h : 1600,
                speed : 0.5,
            }
        ];
        let i = 6;
        /* 
            0 : siêu saiyan cấp 1
            1 : siêu nhân cấp 1
            2 : siêu namek cấp 1
            3 : siêu saiyan cấp 2,
            4 : siêu nhân cấp 2,
            5 : siêu namek cấp 2,
        */

        if(value != null) i = value;

        src = sheeet[i].src;
        let width = sheeet[i].width;
        let height = sheeet[i].height;
        let speed = sheeet[i].speed;
        let sheet = sheeet[i].sheet;
        if(donDanh.run == 1)
        {
            donDanh.run = 2;
            if(value == null && sheeet[i].them) {
                this.addEff({
                    type: 'dungyen',
                    by: NhanVat.id,
                    id : 'haoquang_2_'+NhanVat.id+'_'+Date.now(),
                    them : sheeet[i].them,
                });
            }
            if(src) {
                src = src.map(e => this.coverImg(e));
            }

            if(sheet) {
                src = [];
                let baseImg = await new PIXI.Sprite(this.coverImg(sheet));
                let width = sheeet[i].w;
                let height = sheeet[i].h;
                let length = sheeet[i].length;
                for(let j = 0; j < length; j++)
                {
                    let texture = new PIXI.Texture(baseImg.texture, new PIXI.Rectangle(0, height/length * j, width, height/length));
                    src.push(texture);
                }
            }

            let sprite = new PIXI.AnimatedSprite(src);
            sprite.animationSpeed = speed;
            sprite.loop = true;
            sprite.x = NhanVat.x - Math.abs(NhanVat.width) - 50  ;
            sprite.y = NhanVat.y + sprite.height/2;
            sprite.width = width;
            sprite.height = height;
            sprite.play();
            sprite.name = 'eff';
            sprite.visible = false;
            sprite.time = Date.now() + 300;
            addnewskill.addChild(sprite);
            

            
        }

        let sprite = addnewskill.getChildByName('eff');

        if(sprite)
        {
            if(sprite.time < Date.now()) sprite.visible = true;
            sprite.y = NhanVat.y  - sprite.height + NhanVat.height ;
            sprite.x = NhanVat.x - sprite.width / 2 - Math.abs(NhanVat.width) / 2;
            sprite.pivot.x = NhanVat.width/2;

        }

        element.timeOfSkill =  Date.now() + 10000;

        if(getMy && (getMy.info.act != 'dungyen' || getMy.info.chiso.hp <=0)) element.type = 'delete';

    }
}