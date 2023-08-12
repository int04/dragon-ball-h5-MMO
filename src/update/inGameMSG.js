import eff from './eff.js';

export default class inGameMSG extends eff {
    constructor() {
        super();
    }

    timeEnd = (timestemp) => {
        let time = Date.now();
        let timeEnd = timestemp - time;
        if(timeEnd <=0) return '0s';
        let s = Math.floor(timeEnd / 1000);
        if(s <=0) return '0s';
        let m = Math.floor(s / 60);
        if(m <=0) return s+'s';

        if(m >= 1) {
            return m+'p'+(s - m * 60)+'';
        }
    }

    updateInGameMSG = () => {
        let inGameMSG = this.inGameMSG;
        let y = 0;
        let x = 10;
        let chatbangNew = inGameMSG.getChildByName('chatbangNew');
        if(this.banghoi.tinnhan >=1) 
        {
            if(!chatbangNew) 
            {
                chatbangNew = new PIXI.HTMLText('Có '+this.banghoi.tinnhan+' tin nhắn mới', {
                    fontFamily: 'Arial',
                    fontSize: 15,
                    fill: 0xffffff,
                    align: 'center',
                    fontWeight: 'bold',
                    wordWrap: true,
                    wordWrapWidth: this.gameWidth,

                })
                chatbangNew.name = 'chatbangNew';
                chatbangNew.x = x;
                chatbangNew.y = y + 10;
                y += chatbangNew.height + chatbangNew.y;
                inGameMSG.addChild(chatbangNew);
                chatbangNew.time = 0;
                chatbangNew.interactive = true;
                chatbangNew.cursor = 'pointer';
                chatbangNew.on('pointerdown', () => {
                    this.boxNewBangHoi();
                });
            }
            else 
            {
                chatbangNew.time++;
                chatbangNew.time = chatbangNew.time > 10 ? 0 : chatbangNew.time;
                chatbangNew.text = 'Có '+this.banghoi.tinnhan+' tin nhắn mới';
                chatbangNew.visible = true;
                if(chatbangNew.time  == 5)  chatbangNew.style.fill = 0xff0000;
                if(chatbangNew.time  == 10) chatbangNew.style.fill = 0xffffff;


            }
        }
        else 
        {
            if(chatbangNew) chatbangNew.visible = false;
        }


        let chuoiEFF = {
            khieng : "3784",
            rungu : "3782",
            hoakhi : "718",
            taitaonangluong : "720",

        };

        let space = 4;
        let run = 0;
        for(let i in chuoiEFF) 
        {
            let objectname = i+"_skill_eff";
            let textname = i+"_text";
            let obb = inGameMSG.getChildByName(objectname);
            let text = inGameMSG.getChildByName(textname);
            if(this.my.eff && this.my.eff[i] && this.my.eff[i].active && this.my.eff[i].active == true ) 
            {
                

                if(!obb)
                {
                    obb = new PIXI.Sprite(this.coverImg(chuoiEFF[i]));
                    obb.name = objectname;
                    obb.width = 50;
                    obb.height = 50;
                    obb.x = x;
                    obb.y = y + 5;
                    x += obb.width + space;
                    y += obb.height + obb.y;
                    inGameMSG.addChild(obb);

                    let text = new PIXI.HTMLText(this.timeEnd(this.my.eff[i].time), {
                        fontFamily: 'Arial',
                        fontSize: 20,
                        fill:  0xffffff,
                        align: 'center',
                        fontWeight: 'bold',
                        wordWrap: true,
                        wordWrapWidth: obb.width,
                        
                    });
                    text.style.stroke = 0x000000;
                    text.style.strokeThickness = 1;
                    text.style.dropShadow = true;
                    text.style.dropShadowColor =0x000000;
                    text.style.dropShadowBlur = 1;
                    text.style.dropShadowAngle = Math.PI / 6;
                    text.style.dropShadowDistance = 1;
                    
                    text.name = textname;
                    text.x = obb.x + obb.width / 2 - text.width / 2;
                    text.y = y ;
                    inGameMSG.addChild(text);

                }
                else 
                {
                    obb.x = obb.width * run + space * run;
                    obb.visible = true;
                    text.visible = true;
                    text.text = this.timeEnd(this.my.eff[i].time);
                    text.x = obb.x + obb.width / 2 - text.width / 2;
                    run++;

                }

            }
            else 
            {
                if(obb) obb.visible = false;
                if(text) text.visible = false;
            }

        }

    }
}