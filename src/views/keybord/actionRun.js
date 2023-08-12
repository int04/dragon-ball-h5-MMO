import buttonScreen from '../create/buttonScreen.js';


export class keypressMove_Run extends buttonScreen {
    constructor() {
        super();
        this.cumDau = 0;
        //this.sinceRunAction(1);
        requestAnimationFrame(this.sinceRunAction);
    }

    choang = () => {
        let list = this.data_choang;
        let i = 0;
        list.forEach(element => {
            if(this.my.eff[element] && this.my.eff[element].active == true) i = 1;
        });
        if(i == 1) return true;
        return false;
    }

    pressNut = (key) => {
        if(this.my.info.chiso.hp <= 0 || this.choang()) {
            this.keysPressed[37] = false;
            this.keysPressed[38] = false;
            this.keysPressed[39] = false;
            this.keysPressed[40] = false;
        }

        if(key == 37 || key == 38 || key == 39 || key == 40) {
            if(this.loadGame.visible == true) return false;
            if(this.NhanVat.visible == false) return false;
            if(this.my.info.chiso.hp <= 0) return false;
            if(this.choang()) return false;
            if(this.keysPressed[key] == true) return false;
            this.keysPressed[key] = true;
        }

        
    }

    sinceRunAction = (ms = 0.38) => {


        if(this.my.id == 0) return requestAnimationFrame(this.sinceRunAction);
        if(this.my.info.chiso.hp <= 0) {
            this.NutOnScreenAction.visible = false;
            this.SkillInSrcreen.visible = false;
            this.NutDaChet.visible = true;
        }
        else 
        if(this.NutOnScreenAction && this.NutOnScreenAction.visible == false) {
            this.NutOnScreenAction.visible = true;
            this.SkillInSrcreen.visible = true;
            this.NutDaChet.visible = false;
        }

        this.moveTimeout++;
        // if(this.moveTimeout%(this.fps()/2)) return requestAnimationFrame(this.sinceRunAction);
        if(this.moveTimeout > 100) this.moveTimeout = 0;

        let speednew = 0;
        speednew += this.my.info.speed;
        speednew -= this.app.ticker.FPS / 60;

        let action = this.cacheAction.find(e => e.id == this.my.id);
        if(action) {
            let name = action.action;
            if(name == 'fly') {
                speednew += 0.5;
            }
            

        }
        
        let datd = this.bando.children.filter(item => item.type === "dat");
        let longdat = this.bando.children.filter(item => item.type === "longdat");
        let NhanVatX = this.NhanVat.x;
        let NhanVatY = this.NhanVat.y;


        if(this.lanDauBay && this.keysPressed[38]) {
            if(this.checkOnDat22(this.my.id)) {
                this.lanDauBay = false;
                //speednew +=80;
                this.addEff({
                    id: 'fly_first_eff_khoi_' + this.my.id,
                    type: 'flyKI_first',
                    by: this.my.id,
                })
            }
        }




        
        



        // ! di chuyển thì xóa trạng thái nhả phím
        if(this.keysPressed[37] || this.keysPressed[38] || this.keysPressed[39] || this.keysPressed[40]) {

            // kiểm tra chặn không cho lên map 
            if(this.keysPressed[38] && this.cumDau == false) {
                this.timeRoiTuDo = 0;
                if((this.NhanVat.y - speednew) <= this.gameMap.setting.minY) {
                    // speednew = speed to this.gameMap.setting.minY 
                    speednew = Math.max(0, this.NhanVat.y - this.gameMap.setting.minY);

                }
            } else
            if(this.keysPressed[40]) {

                /**
                 * @desc: Thuộc tính rơi tự do
                 */

                /* 
                    - ta có ms : là tốc độ làm mới khung (tính băng giay)
                */

                if(this.timeRoiTuDo <= Date.now() && this.timeRoiTuDo != 0) {
                    this.CreateRoi = this.CreateRoi || 1;
                    if(this.CreateRoi == 1) {
                        this.thoigianroitudo = 0;
                        this.timeSetRoiTuDo = 0;
                        this.speedOld = speednew + 3;
                        this.CreateRoi = 2;
                    }

                    let thoigian = 0.387/1000; // quy đổi thời gian ra milisecond
                    this.thoigianroitudo += thoigian;
                    /* 
                        công thức tính vận tốc là:
                        v = g * t
                    */

                    let g = 9.8; // 9,8m/s  
                    // quy đổi ra vận tốc là milisecond

                    let v = g * this.thoigianroitudo; // vận tốc
                    v = v + 2.5; // tăng thêm vận tốc
                    this.timeSetRoiTuDo = 0;
                    this.speedOld = v;



                }

                if(this.keysPressed[40]) 
                {
                    speednew = this.speedOld;
                }
                else 
                {
                }




                if((this.NhanVat.y + speednew) >= this.gameMap.setting.maxY) {
                    speednew = Math.max(0, this.gameMap.setting.maxY - this.NhanVat.y);
                }
            } else
            if(this.keysPressed[37]) {
                this.timeRoiTuDo = 0;
                if((this.NhanVat.x - speednew) <= this.gameMap.setting.minX) {
                    speednew = 0;
                    this.NhanVat.x = this.gameMap.setting.minX + this.NhanVat.width;
                    this.NhanVatGoc.x = this.gameMap.setting.minX + this.NhanVat.width;
                }
            } else
            if(this.keysPressed[39]) {
                this.timeRoiTuDo = 0;
                if((this.NhanVat.x + speednew) >= this.gameMap.setting.maxX) {
                    speednew =0;
                    this.NhanVat.x = this.gameMap.setting.maxX- this.NhanVat.width/2; 
                    this.NhanVatGoc.x = this.gameMap.setting.maxX- this.NhanVat.width/2;
                    this.chipi("Ô ! hình như va phải bức tường rồi");
                }
            }

            if(this.keysPressed[39] || this.keysPressed[37] || this.keysPressed[38] || this.keysPressed[40]) {
                let docao = Math.abs(this.NhanVat.y - this.yFirst);
            }


            if(this.keysPressed[40]) {

                let isPlayerOnDatLayer = false;
                let k = 0;
                for(let i = 0; i < datd.length; i++) {
                    let mapSprite = datd[i];
                    if(this.hitTestRectangleDown(this.NhanVatGoc, mapSprite, 'down', speednew,1)) {
                        isPlayerOnDatLayer = true;
                        k = i;
                        break;
                    }
                }

                if(isPlayerOnDatLayer) {
                    this.my.info.act = 'dungyen';
                    this.addAction();
                    // deleteSkill('dauvan_' + this.my.id);

                    this.cumDau = false;



                    this.NhanVat.y = Math.round(datd[k].y - this.NhanVatGoc.height + 24);
                    this.NhanVatGoc.y = Math.round(datd[k].y - this.NhanVatGoc.height + 24);

                    this.NhanVat.y = Math.round(this.NhanVat.y)
                    this.yFirst = this.NhanVat.y;

                    this.CreateRoi = 1;
                    this.lanDauBay = true;
                    this.timeRoiTuDo = 0;
                    delete this.keysPressed[40];
                    speednew = 0;

                    this.actionMap.nuida = 0;
                    this.actionMap.nuixa = 0;


                }



            }

            if(this.keysPressed[38]) {

                for(let i = 0; i < longdat.length; i++) {
                    let dat = longdat[i];
                    if(this.hitTestRectangle(this.NhanVat, dat, 'up', speednew)) {
                        if(this.calculateDistanceX(this.NhanVat, dat, 'up', speednew * 2) + 1 <= this.NhanVat.height) {
                            let array = ["x219$28"];
                            // if sprite.name in array
                            if(array.indexOf(dat.name) != -1) {
                                this.cumDau = true;
                                this.NhanVat.y = Math.round(dat.y + dat.height + 24);
                                this.NhanVatGoc.y = Math.round(dat.y + dat.height + 24);
                                this.keysPressed[38] = false;
                            }
                            speednew = 0;
                            break;

                        }
                    }
                }


            }

            if(this.keysPressed[37]) {

                let chamdat = 0;
                let k = 0;
                for(let i = 0; i < longdat.length; i++) {
                    let dat = longdat[i];
                    if(longdat[i].x + longdat[i].width > this.NhanVat.x - speednew) continue;

                    if(this.hitTestRectangle(this.NhanVat, dat, 'left', speednew)) {
                        chamdat = 1;
                        k = i;
                        break;
                    }
                }

                if(chamdat) {
                    delete this.keysPressed[37];
                    speednew = 0;
                }


            }

            if(this.keysPressed[39]) {

                let chamdat = 0;
                let k = 0;

                for(let i = 0; i < longdat.length; i++) {
                    if(longdat[i].x + longdat[i].width < this.NhanVat.x + speednew) continue;

                    let dat = longdat[i];
                    if(this.hitTestRectangle(this.NhanVat, dat, 'right', speednew)) {
                        chamdat = 1;
                        k = i;
                        break;
                    }
                }

                if(chamdat) {

                    delete this.keysPressed[39];
                    speednew = 0;
                }



            }

            if(this.keysPressed[37] || this.keysPressed[39]) {
                if(this.my.info.act == 'move') {
                    let chamdat = 0;
                    for(let i = 0; i < datd.length; i++) {
                        let dat = datd[i];
                        if(this.hitTestRectangle(this.NhanVat, dat, 'down', speednew)) {
                            chamdat++;
                            break;
                        }
                    }
                    if(chamdat <= 0) {
                        this.my.info.act = 'baylen';

                        this.addAction()

                    }
                }

                
                if(this.my.info.act == 'fly') {
                    let biendo = 5;
                    this.NhanVat.biendo = this.NhanVat.biendo || 0;
                    if(this.NhanVat.biendo == 1) {}
                    if(this.NhanVat.biendo == 5) {}
                    this.NhanVat.biendo++;
                    if(this.NhanVat.biendo > 50) this.NhanVat.biendo = 1;



                }
            }


        }



        /**
         * Xử lý bay lên
         */

        if(this.keysPressed[38] || this.keysPressed[40] && speednew >= 1) {
            if(this.keysPressed[38] && this.cumDau == true) {
                return false;
            }
            this.NhanVat.y += this.keysPressed[38] ? -speednew : speednew;
            this.NhanVatGoc.y += this.keysPressed[38] ? -speednew : speednew;
            this.NhanVat_phukien.y += this.keysPressed[38] ? -speednew : speednew;
            this.my.info.move = this.keysPressed[38] ? 'up' : 'down';

            this.my.info.act = 'baylen';
            this.addAction()

            let checkNuiDa = this.bando_nuida.toGlobal(new PIXI.Point(0, 0));
            let checkNhanVat = this.NhanVat.toGlobal(new PIXI.Point(0, 0));
            checkNhanVat.width = this.NhanVat.width;
            checkNhanVat.height = this.NhanVat.height;
            checkNuiDa.width = this.bando_nuida.width;
            checkNuiDa.height = this.bando_nuida.height;

            let checkNuiXa = this.bando_nuixa.toGlobal(new PIXI.Point(0, 0));
            checkNuiXa.width = this.bando_nuixa.width;
            checkNuiXa.height = this.bando_nuixa.height;

            if(this.keysPressed[38]) 
            {
                /* Bay lên */
                if(Math.abs(this.actionMap.nuida) < this.bando_nuida.height && this.hitTestRectangle2(checkNhanVat, checkNuiDa))
                {
                    this.actionMap.nuida += 0.5;
                }

                if(Math.abs(Math.round(this.actionMap.nuida)) >= 1 && !this.hitTestRectangle2(checkNhanVat, checkNuiDa,'up',this.NhanVat.height))
                {
                    if(Math.abs(this.actionMap.nuixa) < this.bando_nuixa.height*0.2 && this.hitTestRectangle2(checkNhanVat, checkNuiXa))
                    {
                        this.actionMap.nuixa += 0.5;
                    }
                }
                
            }

            if(this.keysPressed[40])
            {
                /* Bay xuống */
                if(this.actionMap.nuida > 0  && this.hitTestRectangle2(checkNhanVat, checkNuiDa) && this.actionMap.nuixa < 0)
                {
                    this.actionMap.nuida -= 1;
                }

                if(this.actionMap.nuixa > 0 && this.hitTestRectangle2(checkNhanVat, checkNuiXa) )
                {
                    this.actionMap.nuixa -= 0.5;
                }
            }


        }
        if(this.keysPressed[39] || this.keysPressed[37]) {


            let skewX = 0;


            if(this.keysPressed[39]) {
                this.NhanVat.x += speednew;
                this.NhanVatGoc.x += speednew;
                this.NhanVat_phukien.x += speednew;
                this.my.info.move = 'right';
                skewX = -0.1; // Góc nghiêng khi di chuyển về bên phải
                this.NhanVat.huong = 'right';

                if(this.NhanVat.scale.x != 1) {
                    this.NhanVat.scale.x = 1;
                    this.NhanVat.pivot.x = this.NhanVat.width;
                }
            } else {
                this.my.info.move = 'left';
                this.NhanVat.x -= speednew;
                this.NhanVatGoc.x -= speednew;
                this.NhanVat_phukien.x -= speednew;
                if(this.NhanVat.scale.x != -1) {
                    this.NhanVat.scale.x = -1;
                    this.NhanVat.pivot.x = 0;
                }
                this.NhanVat.huong = 'left';

                skewX = 0.1; // Góc nghiêng khi di chuyển về bên trái
            }

            this.NhanVat.move = this.my.info.move;


            if(this.keysPressed[37]) {
                //  this.NhanVat.rotation = -Math.PI/2 ;
            } else if(this.keysPressed[39]) {
                // this.NhanVat.rotation = Math.PI/2 ;
            }


            if(this.my.info.act == 'baylen' || this.my.info.act == 'fly') {
                /*
                // hiệu ứng rơi nếu nhân vật quá gần so với mặt đất
                let chamdat = 0;
                let ii = null;
                let locdat = this.bando.children.filter(item => item.type == "dat");
                for(let i = 0; i < locdat.length; i++) {
                    let dat = datd[i];
                    if(this.hitTestRectangle(this.NhanVatGoc, dat, 'down', this.NhanVatGoc.height)) {
                        chamdat++;
                        ii = i;
                        break;
                    }
                }
                if(ii != null) {
                    let dx  = this.calculateDistance(this.NhanVatGoc, locdat[ii]);
                    console.log(dx);
                    if(dx <= 150)
                    {
                        //this.keysPressed[40] = true;
                        this.my.info.act = 'dotay';
                        this.timeRoiTuDo =1;
                    }
                }
                */
            }
            

            if(this.my.info.act == 'baylen') {
                this.my.info.act = 'fly';
            } else
            if(this.my.info.act == 'fly') {
                this.my.info.act = 'fly';
            } else {
                this.my.info.act = 'move';

            }
            this.addAction()


        }




        if(this.keysPressed[16]) {
            //giaoTiep();
        }


        // reset sprite 

        if(this.keysPressed[37] || this.keysPressed[38] || this.keysPressed[39] || this.keysPressed[40]) {

            /**
             * @desc: nếu khi nhân vật đang bay mà bấm nút lên sẽ tạo hiệu ứng bay lên thay vì bay tiếp.
             */

            if(this.my.info.act == 'fly' && this.keysPressed[38]) {
                if((this.keysPressed[37]) || this.keysPressed[39]) {
                    this.my.info.act == 'baylen';
                    this.addAction({
                        action: 'baylen',
                        id: this.my.id,
                    })
                }
            }
            if(this.cumDau) 
            {
                this.action(this.my.id, 'dotay');
                this.keysPressed[40] = true;
            }

            if(speednew >= 1 && this.sendToServer == true) {
                if(this.keysPressed[37]) this.my.info.move = 'left';
                if(this.keysPressed[38]) this.my.info.move = 'up';
                this.NhanVat.move = this.my.info.move;

                this.sendMyMove();

                this.sendToServer = false;

                setTimeout(() => {
                    this.sendToServer = true;
                }, 500)


            }

            




        }

        requestAnimationFrame(this.sinceRunAction);

    }
} 