import autoUpdateAttack from './auto.js';

/**
 * @snowlyvn
 * @desc: update eff Map
 */

class updateMap extends autoUpdateAttack {
    constructor() {
        super();
        this.createHoldMap();
        this.mapMore = {};
    }

    checkDiQuaCau = () => {
        let name = 'x22$26';
        let data = this.bando.children.filter(e => e.name == name);
        data.forEach(cau => {
            cau.yOld = cau.yOld || cau.y;
            cau.danhun = cau.danhun || 0;
            let conguoidung = 0;
            this.cacheAction.forEach(u => {
                let player = u.id == this.my.id ? this.NhanVat : this.nguoichoi.children.find(e => e.id == u.id);
                if(player) {
                    if(this.hitTestRectangle(player, cau) && player.act && player.act != 'fly') {
                        conguoidung = 1;
                    }
                }
            });
            if(conguoidung == 1 && cau.danhun == 0) {
                cau.danhun = 1;
                cau.y = cau.yOld + 3;
            } else if(conguoidung == 0 && cau.danhun == 1) {
                cau.danhun = 0;
                cau.y = cau.yOld - 3;
            }
        });
    }

    backgroundMap = () => {
        this.HoaRoiCuaPhat();

        this.lopCanhNen.x = this.container.x--;


        this.bando_nuixanua.y =this.gameHeight*0.4 - this.bando_nuixa.height/2  ;

        this.bando_bautroi.y = this.bando_nuixanua.y ;

        
            




        this.bando_nuixa.y = this.gameHeight*0.4 + this.bando_nuixa.height *0.1 +this.actionMap.nuixa    ;

        

        let checkNuiDa = this.bando_nuida.toGlobal(new PIXI.Point(0, 0));
        this.bando_nuida.y = this.gameHeight*0.7 - this.bando_nuida.height/2 + this.actionMap.nuida;

        


        this.bando_chantroi.y = this.bando_nuixanua.y + this.bando_nuixanua.height;

        this.bando_chantroi.height = this.bando_nuixa.y + this.bando_nuixa.height - this.bando_chantroi.y;
        this.bando_chantroi.width = this.bando_nuixa.width;


        this.bando_channuixa.y = this.bando_nuixa.y + this.bando_nuixa.height - 10;

        this.bando_channuixa.width = this.bando_nuixa.width;

        this.bando_channuixa.height = this.bando_nuida.y + this.bando_nuida.height - this.bando_channuixa.y;





        this.nen.y = this.bando_nuida.y + this.bando_nuida.height;
        // sét giá trị ban đầu cho các bản đồ
        this.bando_nuida.start = this.bando_nuida.start || 0;
        if(this.bando_nuida.start == 0) {
            this.bando_nuida.start = 1;
            this.bando_nuida.yMax = this.bando_nuida.y;
            this.bando_nuida.yMin = this.bando_nuida.y - this.bando_nuida.height * 0.2;
        }



        // so sánh vị trí this.NhanVat so với this.bando_nuida bằng point 
        let point = this.bando_nuida.toGlobal(new PIXI.Point(0, 0));
        let point2 = this.bando_nuixa.toGlobal(new PIXI.Point(0, 0));
        let point3 = this.bando_nuixanua.toGlobal(new PIXI.Point(0, 0));

        let containerPosition = this.NhanVat.toGlobal(new PIXI.Point(0, 0));

        let nhanVatY = containerPosition.y;


        

        






        

    }


    suongMuCheConTim = () => {
        this.updateInGameMSG(); // cập nhật thông tin trong game
        let map = this.mapMore;
        if(!map) return;
        if(map.suong && map.suong >= 1) 
        {
            if(this.bando_suongmu.children.length >=1) 
            {
                this.bando_suongmu.x -= map.suong*1;
                if(this.bando_suongmu.x < this.bando_suongmu.minx) this.bando_suongmu.x = 0;
            }
        }
    }
    

    HoaRoiCuaPhat = () => {
        let map = this.mapMore;
        if(!map) return this.mapMore = {time : 0};
        map.time = map.time || 0;
        map.time += 1;
        if(map.time > 100) map.time = 0;

        if(map.time%this.fps() == 0) 
        {
            this.suongMuCheConTim();

            this.themHoaRoi = this.themHoaRoi || 0;
            let eff = map.eff;
            if(eff && eff.length >=1) 
            {
                eff.forEach(src => {
                    let list = this.bando_hieuung.children.filter(e => e.namesprite == src);
                    let daco = list.length;
                    while(daco < (30) ) 
                    {
                        let xMin = this.NhanVat.x - this.gameWidth/2;
                        let xMax = this.NhanVat.x + this.gameWidth/2;
                        let yMin = this.NhanVat.y - this.gameHeight/2;


                        let x = this.rand(xMin, xMax);
                        let y = this.rand(yMin, this.NhanVat.y - 100);

                        let spriteGoc = new PIXI.Sprite(this.coverImg(src,'map/eff'));

                        let numSprite = 4;

                        let width = spriteGoc.width;
                        let height = spriteGoc.height/numSprite;
                        if(width < 10) break;
                        let arrayFrame = [];
                        for(let i = 0; i < numSprite; i++)
                        {
                            let frame = new PIXI.Texture(spriteGoc.texture, new PIXI.Rectangle(0, i*height, width, height));
                            arrayFrame.push(frame);
                        }

                        let animation = new PIXI.AnimatedSprite(arrayFrame);
                        animation.animationSpeed = 0.1;
                        animation.loop = true;
                        animation.play();

                        animation.width = 24;
                        animation.height = 24;

                        animation.x = x;
                        animation.y = y;

                        animation.namesprite = src;

                        animation.run = 0;

                        // random X, Y to

                        


                        this.bando_hieuung.addChild(animation);

                        daco += 1;
                       

                    }

                    let notRun = list.filter(e => e.run == 0);
                    if(notRun.length > 0)
                    {
                        notRun.forEach(animation => {
                            let dat = this.bando.children.filter(e => e.type == 'dat' && e.y > animation.y && e.x - this.gameWidth/2 < animation.x && e.x + this.gameWidth/2 > animation.x );
                            if(dat.length == 0) return;

                            let randomDat = dat[this.rand(0, dat.length - 1)];
                            animation.run = 1;
                            animation.xTo = randomDat.x + randomDat.width/2 - animation.width/2;
                            animation.yTo = randomDat.y - animation.height + 20 + this.rand(1,10);

                            let self = this;
                            // tween animation
                            let tween = new TWEEN.Tween(animation)
                            .to({x: animation.xTo, y: animation.yTo}, this.rand(2000,20000) )
                            .onUpdate( (sprite) => {
                                let vitriNow = this.NhanVat.x - this.gameWidth/2;
                                let vitriMax = this.NhanVat.x + this.gameWidth/2;
                                if(sprite.x > this.NhanVat.x && sprite.x > vitriMax)
                                {
                                    sprite.y = sprite.yTo;
                                    sprite.x = sprite.xTo;
                                    sprite.delete = 1;
                                }
                                if(sprite.x < this.NhanVat.x && sprite.x < vitriNow)
                                {
                                    sprite.y = sprite.yTo;
                                    sprite.x = sprite.xTo;
                                    sprite.delete = 1;
                                }
                            })
                            .onComplete(function() {
                                animation.stop();
                                if(animation.delete) 
                                {
                                    animation.destroy();
                                }
                                else 
                                {
                                    setTimeout(() => {
                                        animation.destroy();
                                    }, self.rand(500,2000));
                                }
                            })
                            .start();
                        });
                    }
                });
            }
        }

    }



    createHoldMap = () => {
        let point = 0;
        let pointOld = 0;


        let actionKeo = (event) => 
        {

            if(this.hold) 
            {
                let map = this.gameMap.setting;
                let minX = map.minX;
                let maxX = map.maxX;
                let minY = map.minY;
                let maxY = map.maxY;
                let x = event.data.global.x;
                let y = event.data.global.y;
                let x1 = this.trussX - x;
                let y1 = this.trussY - y;
                this.trussX = x;
                this.trussY = y;
                
                point = x;
                let dakeo = Math.abs(point - pointOld);
                let position = this.NhanVat.toGlobal(new PIXI.Point(0, 0));
                let xt = this.gameWidth - position.x;
               // if(this.NhanVat.x - dakeo <= minX) return false;

                //let x2 = this.container.x - x1;
                //let y2 = this.container.y - y1;


                if(this.container.x - this.gameWidth / 2 <= minX)
                {
                }
                let x2 = this.container.x - x1;
                let y2 = this.container.y - y1;


                this.container.x = x2;
                this.container.y = y2;


            }

        }

        let actionNha = () => {
            this.hold = false;
            this.truss = false;
            point = 0;
            pointOld = 0;
        }

        let actionCreate = (event) => {
            this.hold = true;
            this.vaomap = 1;
            this.truss = true;
            this.trussX = event.data.global.x;
            this.trussY = event.data.global.y;
            pointOld = event.data.global.x;
        }

        this.container.interactive = true;
        // hold and truss up and down, left and right
        this.container.on('pointerdown', (event) => {
            actionCreate(event)
        });

        this.container.on('pointerup', (event) => {
            actionNha();
        });

        this.container.on('pointermove', (event) => {
            actionKeo(event)
        });

        this.container.on('pointerupoutside', (event) => {
            actionNha();
        });

        this.container.on('pointerout', (event) => {
            actionNha();
        });

        this.container.on('pointerover', (event) => {
            actionNha();
        });

        this.lopCanhNen.interactive = true;

        this.lopCanhNen.on('pointerdown', (event) => {
            actionCreate(event)
        });

        this.lopCanhNen.on('pointerup', (event) => {
            actionNha();
        });

        this.lopCanhNen.on('pointermove', (event) => {
            actionKeo(event)
        });

        this.lopCanhNen.on('pointerupoutside', (event) => {
            actionNha();
        });

        this.lopCanhNen.on('pointerout', (event) => {
            actionNha();
        });

        this.lopCanhNen.on('pointerover', (event) => {
            actionNha();
        });



    }
}
export default updateMap;
