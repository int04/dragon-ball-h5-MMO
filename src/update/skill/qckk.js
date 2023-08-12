import khieng from "./khieng.js";

export default class qckkUpdate extends khieng {
    constructor() {
        super();
    }

    handleQCKK = (element) => {

        let nhanVat_from = this.getSpriteMap(element.from);
        if(!nhanVat_from) return element.type = 'delete';

        let nhanVat_to = this.getSpriteMap(element.to);
        if(!nhanVat_to) return element.type = 'delete';

        let my_from = this.getInfoMap(element.from);
        if(!my_from) return element.type = 'delete';

        let my_to = this.getInfoMap(element.to);
        if(!my_to) return element.type = 'delete';

        let addnewskill = this.getEff(element.id);
        let donDanh = this.imgEff(addnewskill, element.id);
        donDanh.time = donDanh.time || 0;
        donDanh.time += 1;

        donDanh.bay = donDanh.bay || 2;

        donDanh.setY = donDanh.setY || null;

        if(donDanh.bay == 2) 
        {
            /* Kiểm tra xem có đứng trên đất không */
            donDanh.bay = 3;
            if(this.checkOnDat22(my_from.id)) 
            {
                donDanh.setY = nhanVat_from.y - 150;
            }
            else 
            {
                donDanh.bay = 4;
            }
        }

        /* cho nhân vật bay lên */
        if(donDanh.setY != null && donDanh.time%this.fps() == 0) 
        {
            nhanVat_from.y -= my_from.info.speed;
            if(nhanVat_from.y <= donDanh.setY)
            {
                donDanh.setY = null;
                donDanh.bay = 4; // tích tụ lực
            }
            my_from.pos.y = nhanVat_from.y;
            this.action(my_from.id,'baylen');
            if(my_from.id == this.my.id) 
            {
                this.NhanVatGoc.y = nhanVat_from.y;
                this.timeRoiTuDo = 0;
                this.sendMyMove();
            }
        }

        if(donDanh.bay ==4) 
        {
            // tạo hiệu ứng quả cầu kênh khí
            let src = [2175, 2176, 2177];
            donDanh.start = donDanh.start || 0;
            donDanh.width = 150;
            donDanh.height = 150;
            donDanh.x = nhanVat_from.x + Math.abs(nhanVat_from.width) / 2 - donDanh.width / 2;
            donDanh.y = nhanVat_from.y - donDanh.height ;
            donDanh.pivot.x = donDanh.width / 2;
            if(donDanh.time%this.fps()) 
            {
                donDanh.start += 1;
                if(donDanh.start >= src.length) donDanh.start = 0;
            }
            donDanh.texture = this.coverImg(src[donDanh.start]);

            this.action(my_from.id,'dotay');

            if(my_from.id == this.my.id) 
            {
                this.timeRoiTuDo = 0;
            }

            /* Tạo thêm các hiệu ứng tích tụ năng lượng */
            donDanh.run = donDanh.run || 0;
            donDanh.eff = donDanh.eff ||50;

            if(donDanh.run == 0 && donDanh.eff >= 1) {
                donDanh.run = 1;

                for(let q = 0; q <= 10; q++) {
                    donDanh.eff -= 1;
                    let img2 = new PIXI.Sprite(this.coverImg(this.rand(1,5) == 1 ? 64 : 438));
                    let x, y;
                    if(this.rand(1, 10) <= 5) x = this.rand(this.gameMap.setting.minX-10, this.gameMap.setting.minX);
                    else x = this.rand(this.gameMap.setting.maxX, this.gameMap.setting.maxX + 10);

                    if(this.rand(1, 10) <= 5) y = this.rand(this.gameMap.setting.minY - 10, this.gameMap.setting.minY);
                    else y = this.rand(this.gameMap.setting.maxY, this.gameMap.setting.maxY + 10);
                    img2.x = x;
                    img2.y = y;
                    img2.width = 48;
                    img2.height = 48;
                    addnewskill.addChild(img2);
                    img2.pivot.x = img2.width / 2;
    
                    let tween = new TWEEN.Tween(img2)
                        .to({ x: donDanh.x , y: donDanh.y + donDanh.height/2 }, 500)
                        .onComplete(() => {

                            addnewskill.removeChild(img2);
                            if(donDanh.eff <= 0) {

                                if(my_from.id == this.my.id)
                                this.timeRoiTuDo = Date.now() + 200;
                                this.action(my_from.id,'baylen');
                                
                                donDanh.bay = 5;
                                
                            } 
                            else 
                            {
                                donDanh.run = 0;
                            }


                        })
                        .start();
                }



            }

        }

        if(donDanh.bay == 5)
        {
            let src = [2175, 2176, 2177];
            if(donDanh.time%this.fps()) 
            {
                donDanh.start += 1;
                if(donDanh.start >= src.length) donDanh.start = 0;
            }
            donDanh.texture = this.coverImg(src[donDanh.start]);
            let speed = 100;
            let x = donDanh.x;
            let y = donDanh.y;
            let x1 = nhanVat_to.x + Math.abs(nhanVat_to.width)/2  - donDanh.width / 2;
            let y1 = nhanVat_to.y + nhanVat_to.height / 2 - donDanh.height / 2;
            let x2 = x1 - x;
            let y2 = y1 - y;
            let x3 = x2 / speed;
            let y3 = y2 / speed;
            donDanh.x += x3;
            donDanh.y += y3;
            if(this.vaCham(donDanh, nhanVat_to)) {
                donDanh.visible = false;

                this.addEff({
                    type: "nhapnhay",
                });
                
                this.addEff({
                    name: "bumbumbumQCKK",
                    type: "bum",
                    aim: element.to,
                    level: 1,
                });
                
                if(element.from == this.my.id || (element.detu == true && this.my.detu && this.my.detu.id && this.my.detu.id == element.from)) this.msgAttack(element);
                element.type = 'delete';
                
            }


        }

    }
}

/* 
     game.addEff({ from : 1, type : 'qckknew', to : 1053   });
*/