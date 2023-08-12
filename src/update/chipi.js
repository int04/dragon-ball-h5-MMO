
import autoMoveUpdate from "./autoMove.js";

export default class chipiUpdate extends autoMoveUpdate {
    constructor() {
        super();
    }

    chipi = (txt) => {
        this.deleteNotice();
        if(this.logChipi.find(x => x == txt)) return;
        if(this.chipiBox.children.length >=1) {
            let container = this.chipiBox.getChildByName("chipi");
            let chipiMsg = container.getChildByName("chipi_msg");
            let mess = chipiMsg.getChildByName("chipi_txt");
            if(mess.text == txt) return;
            
        }
        this.logChipi.push(txt);
    }

    chipiView = () => {
        if(this.logChipi.length >=1 && this.chipiBox.children.length <=0) {
            let txt = this.logChipi[0];
            this.logChipi.shift();
            let container = new PIXI.Container();
            container.name = "chipi";
            this.chipiBox.addChild(container);

            let chipiSrc = new PIXI.Sprite(this.coverImg("514"));
            chipiSrc.name = "chipi_img";
            container.addChild(chipiSrc);
            chipiSrc.width = 50;
            chipiSrc.height = 50;
            chipiSrc.x = this.gameWidth /2;
            const bubblePadding = 10;
            const bubble = new PIXI.Graphics();
            bubble.name = "chipi_msg";

            const textStyle = new PIXI.TextStyle({
                align: "center",
                breakWords: true,
                fontSize: 14,
                whiteSpace: "normal",
                wordWrap: true,
                wordWrapWidth: 110,
                fontWeight: "bold",
            });
            // caculator text width and break line

           

            const newmessage = new PIXI.Text(txt, textStyle);


            newmessage.wordWrapWidth = 200 - bubblePadding * 2;
            newmessage.resolution = 2;
            newmessage.anchor.set(0.5);
            bubble.addChild(newmessage);
            newmessage.name = "chipi_txt";
            newmessage.position.set(bubble.width / 2, bubble.height / 2 );
            bubble.beginFill(0xffffff);
            bubble.lineStyle(1, 0x000000, 3)

            bubble.drawRoundedRect(
                -bubblePadding,
                -bubblePadding,
                newmessage.width + bubblePadding * 2 < 110 ?
                110 :
                newmessage.width + bubblePadding * 2,
                newmessage.height + bubblePadding * 2 < 50 ?
                50 :
                newmessage.height + bubblePadding * 2,
                10
            );
            bubble.endFill();

            bubble.pivot.set(bubble.width / 2, bubble.height / 2);
            bubble.visible = false;

            const trangle = new PIXI.Graphics();
            trangle.beginFill(0xffffff);
            trangle.lineStyle(1, 0x000000, 3)
            trangle.moveTo(0, 0);
            trangle.lineTo(10, 10);
            trangle.lineTo(20, 0);
            trangle.endFill();
            trangle.pivot.set(trangle.width / 2, trangle.height / 2);
            trangle.position.set(bubble.width / 2 - trangle.width/2, bubble.height - trangle.height + 4  );
            bubble.addChild(trangle);

            

            container.addChild(bubble);
        }

        if(this.chipiBox.children.length >=1) {
            let container = this.chipiBox.getChildByName("chipi");
            let chipiSrc = container.getChildByName("chipi_img");
            let chipiMsg = container.getChildByName("chipi_msg");
            let mess = chipiMsg.getChildByName("chipi_txt");
            container.time = container.time || 0;
            container.time += 1;
            container.chipi = container.chipi || 1;

            if(this.chipiBox.have == 1)
            {
                this.chipiBox.have = 0;
                container.chipi = 2;
                chipiMsg.visible = true;

            }

            let charPos = this.NhanVat.getGlobalPosition();
            container.sprite = container.sprite || 0;
            let src = {
                "saiyan" : [514,514,515,515],
                "traidat" : ["chipi_1","chipi_1","chipi_2","chipi_2"],
                "namek" : ["chipi_1_1","chipi_1_1","chipi_1_2","chipi_1_2"]
            };
            chipiSrc.texture = this.coverImg(src[this.my.info.coban.type][container.sprite]);
            if(container.time % this.fps() == 0) {
                container.sprite += 1;
                container.sprite = container.sprite >= src[this.my.info.coban.type].length ? 0 : container.sprite;
            }
            chipiSrc.x = charPos.x;
            if(this.NhanVat.huong == 'right') 
            {
                chipiSrc.x = charPos.x - Math.abs(this.NhanVat.width) - chipiSrc.width;
                chipiSrc.scale.x = 1;
                chipiSrc.width = 50;
            }
            else
            if(this.NhanVat.huong == 'left')
            {
                chipiSrc.scale.x = -1;
                chipiSrc.width = 50;
                chipiSrc.x = charPos.x + chipiSrc.width;
            }
            
            if(container.chipi == 1) 
            {
                let yto = charPos.y - chipiSrc.height;
                new TWEEN.Tween(chipiSrc).to({y: yto}, 300,createjs.Ease.easeOutQuad).start().onComplete(() => {
                    chipiMsg.visible = true;
                });
                container.chipi = 2;

            }

    
            if(container.chipi == 2)
            {
                let yto = charPos.y - chipiSrc.height;

                let ytiep = yto - mess.height;
                if(ytiep < 0) yto = 0 + mess.height + chipiSrc.height;

                chipiSrc.y = yto;
                chipiMsg.position.y = chipiSrc.y - (mess.height + 10 * 2) / 2 - 1;
                
                if(this.NhanVat.huong == 'right')
                {
                    chipiMsg.x = chipiSrc.x - Math.abs(chipiSrc.width)/2 + mess.width / 2 + Math.abs(chipiSrc.width/2);
                }
                else
                {
                    chipiMsg.x = chipiSrc.x + Math.abs(chipiSrc.width)/2 - mess.width / 2 - Math.abs(chipiSrc.width/2) + + Math.abs(chipiSrc.width/2);
                }
                
                

                
            }
            console.log()

            if(container.time >= (50+mess.text.length) * this.fps())
            {
                let txt2 = this.logChipi[0];
                if(txt2)
                {
                    this.chipiBox.removeChild(container);
                    this.chipiBox.have = 1;
                }
                else 
                {
                    chipiMsg.visible = false;
                    if(container.chipi == 2)
                    {
                        container.chipi = 3;
                        TweenMax.to(chipiSrc, 0.5, {y: -1, onComplete: () => {
                            this.chipiBox.removeChild(container);
                        }
                        });
    
                    }
                }


            }
            

        }
    }
}