import chipiUpdate from "./chipi.js";
class updateALL extends chipiUpdate {
    constructor() {
        super();
        this.dem = 0;
        this.timeUpdateMove = 0;
        this.timeKiemTraBiDo = 0;
        this.vitricu = 0;
        this.setKeoSpeed = 0.6;
        
        this.app.ticker.add( (delta) => {
            this.reloadTickInGame(delta);
        }
        );
        

    }

    reloadTickInGame = (delta) => {
        this.dem++;
        if(this.dem > 100) this.dem = 0;


        let NhanVat = this.NhanVat;
        let NhanVatGoc = this.NhanVatGoc;
        let my = this.my;

        if(my.id > 0) {
            NhanVat.act = my.info.act;
            this.snowlyDangerNotice(); // cập nhật thông báo ở giữa màn hình
            this.tickerUpdateMouseClickPlayer(); // cập nhật click chuột vào nhân vật
            this.tickerUpdateMyInfo(); // cập nhật thông tin nhân vật
            this.tickerUpdateDauThan(); // cập nhật đầu thần
            this.updateMoveAuto(); // cập nhật di chuyển tự động
            this.AttackDeTu(); // đệ tự tấn công.
            //this.showDisPlayer(); // hiển thị khoảng cách đến đối thủ
            this.statusGiaoDich();
            this.chipiView(); // pet chipi view
            this.backgroundMap(); // cập nhật background

            //this.sinceRunAction(delta); // cập nhật hành động
            this.ProcessLoadPlayer(); // cập nhật nhân vật di chuyển
            // tween
            this.updateAutoMovegoTo(); // tự động di chuyển tới mục tiêu
            this.isDebug();
            this.autoUpdateAttack();
            this.AutoFarmWork();
        }


        //requestAnimationFrame(this.reloadTickInGame);
    }

    AutoFarmWork = () => {
        this.snowlyKeoMap(); // tự động cho nhân vật ở giữa màn hình
        this.snowlyupdateSkill(); // cập nhật kĩ năng
        TWEEN.update()
        this.updateSprite(); // cập nhật các hành động của nhân vật
        this.init(); // cập nhật skill

        this.checkOnDat();
        this.checkDiQuaCau();

        this.tickerEFF(); // cập nhật hiệu ứng bản đồ
        this.snowlyTextnotice(); /// cập nhật thông báo dưới màn hình
        this.snowlyRoiTuDo(); // rơi tự do





    }

    canChinhMap = () => {
        let y = 0;
        /*
            this.gameHeight => height of game
            this.container.y => position of container
            this.bando_bautroi => children on container
        */

        // write program this.bando_bautroi always on top screen this.gameHeight




    }

    checkOnDat = () => {
        return false;
        if(this.my.id <= 0) return false;
        if(this.timeKiemTraBiDo < Date.now()) {
            this.timeKiemTraBiDo = Date.now() + 3000;
            if(this.vitricu == this.NhanVat.x && this.my.info.act == 'fly') {
                console.log('nằm đất')
                this.xulynamdat(this.my.id);
            }
        }

        this.vitricu = this.NhanVat.x;

    };

    showDisPlayer = () => {
        if(this.my.id <= 0) return false;
        this.listPlayerInMap.removeChildren();

        this.nguoichoi.children.forEach((player, i) => {
            if(player.id != this.my.id) {
                let dis = this.khoangCach(player.id, this.my.id);
                let text = new PIXI.Text(player.Ten + " " + (dis) + "m", {
                    fontFamily: 'Arial',
                    fontSize: 12,
                    fill: 0xFFFFFF,
                    align: 'center'
                });
                text.y = i * text.height;
                this.listPlayerInMap.addChild(text);
            }
        });

        this.listPlayerInMap.x = this.gameWidth - this.listPlayerInMap.width;
        this.listPlayerInMap.y = this.gameHeight / 2 - this.listPlayerInMap.height / 2;
    }

    updateMoveAuto = () => {
        if(this.my.id > 0 && this.my.info.act == 'dungyen' && this.timeUpdateMove < Date.now()) {
            this.sendMyMove();
            this.timeUpdateMove = Date.now() + 1000;
        }
    }

    tickerUpdateDauThan = () => {
        if(this.my.id <=0) return false;
        if(this.bg_dauthan == undefined) return false;
        if(this.my.used.dauthan > Date.now()) {
            let time = this.my.used.dauthan - Date.now();
            let timeA = (1 - time / this.my.used.dauthan_time) * 100;
            this.bg_dauthan_circle.height = this.bg_dauthan_circle.heightMAX / 100 * (timeA);
            this.bg_dauthan.texture = this.coverImg('myTexture2dPea1-resources.assets-859')
        } else {
            this.bg_dauthan.texture = this.coverImg('myTexture2dPea0-resources.assets-813')
        }
    }

    tickerUpdateMyInfo = () => {
        if(this.my.id <= 0) return false;
        if(this.hpProgress == undefined) return false;
        if(this.kiProgress == undefined) return false;
        this.hpProgress.width = this.hpProgress.maxWidth / 100 * (this.my.info.chiso.hp / this.my.info.chiso.hpFull * 100);
        this.kiProgress.width = this.kiProgress.maxWidth / 100 * (this.my.info.chiso.ki / this.my.info.chiso.kiFull * 100);

        this.hpText.text = this.my.info.chiso.hp;
        this.hpText.x = 0 + this.hpProgress_BGKhung.getBounds().width / 2 - this.hpText.getBounds().width / 2;
        this.hpText.y = this.hpProgress_BGKhung.getBounds().height / 2 - this.hpText.getBounds().height / 2;

        this.kiText.text = this.my.info.chiso.ki;
        this.kiText.x = this.kiProgress_BGKhung.getBounds().width / 2 - this.kiText.getBounds().width / 2;
        this.kiText.y = this.kiProgress_BGKhung.getBounds().height / 2 - this.kiText.getBounds().height / 2;

        return false;
        if(this.sucmanhText.text != this.number_format(this.my.info.coban.sucmanh)) {
            this.sucmanhText.eff = true;
            this.sucmanhText.load = 1;
            this.sucmanhText.time = 0;
        }
        this.sucmanhText.text = this.number_format(this.my.info.coban.sucmanh);
        this.sucmanhText.x = this.sucmanh_BGKhung.getBounds().width / 2 - this.sucmanhText.getBounds().width / 2;
        this.sucmanhText.y = this.sucmanh_BGKhung.getBounds().height / 2 - this.sucmanhText.getBounds().height / 2;
        if(this.sucmanhText.eff) {
            this.sucmanhText.time++;
            if(this.sucmanhText.time % 10 == 0) {
                if(this.sucmanhText.load == 1) {
                    this.sucmanhText.x += 2;
                    this.sucmanhText.load = 0;
                } else {
                    this.sucmanhText.x -= 2;
                    this.sucmanhText.load = 1;
                }
                this.sucmanhText.style.fill = 0xFFFF33;
                this.sucmanhText.style.fontWeight = 'bold';

            }
            if(this.sucmanhText.time >= 200) {
                this.sucmanhText.x = this.sucmanh_BGKhung.getBounds().width / 2 - this.sucmanhText.getBounds().width / 2;
                this.sucmanhText.eff = false;
                this.sucmanhText.style.fill = 0xFFFFFF;
                this.sucmanhText.style.fontWeight = 'normal';
            }
        }
    }


    tickerEFF = () => {
        
    }


    countScenes(xxzczxc) {
        let count = 0;

        // Đếm số lượng cảnh con trong container hiện tại
        count += xxzczxc.children.length;

        // Duyệt qua từng cảnh con và đệ quy gọi lại hàm countScenes để đếm số lượng cảnh con trong cảnh con
        for(const child of xxzczxc.children) {
            if(child instanceof PIXI.Container) {
                count += this.countScenes(child);
            }
        }

        return count;
    }


    snowlyKeoMap() {
        if(this.my.id <=0) return false;
        if(this.loadGame == true) return false;


        let NhanVat = this.NhanVat;
        let NhanVatGoc = this.NhanVatGoc;
        let my = this.my;
        let container = this.container;

        let nhanVatX_set = NhanVat.x * (container.scale.x);
        let nhanVatY_set = NhanVat.y * (container.scale.y);
        // nhanVatY_set += -this.setKeoSpeed;
        let gameMap = this.gameMap;


        if(this.hold) return false;


        // Tính toán tọa độ trung tâm màn hình
        let screenCenterX = this.gameWidth / 2;
        let screenCenterY = this.gameHeight / 2;

        if(this.vaomap == 1) {
            container.y = 0;
            this.vaomap = 0;
        }

        if(NhanVat.x + screenCenterX >= gameMap.setting.maxX) {

            container.x = -(gameMap.setting.maxX - screenCenterX * 2);
        } else if(NhanVat.x - screenCenterX <= gameMap.setting.minX) {
            container.x = 0;
        } else {
            container.x = this.gameWidth / 2 - nhanVatX_set;
        }




        if(container.y == 0) {
            container.y = this.gameHeight * this.setKeoSpeed - nhanVatY_set;



        } else
        if(NhanVat.y - (this.gameHeight / 2) < gameMap.setting.minY) {
            this.setKeoSpeed = 0.6;

        } else if(NhanVat.y + (this.gameHeight / 2) > gameMap.setting.maxY) {
            this.setKeoSpeed = 0.6;
        } else {

            container.y = this.gameHeight * this.setKeoSpeed - nhanVatY_set;
            let containerPosition = NhanVat.toGlobal(new PIXI.Point(0, 0));
            let height = NhanVat.height;
            height = height > 70 ? 70 : height;
            if(containerPosition.y + height * 2 > this.gameHeight) {
                this.setKeoSpeed -= 0.1;
            }




        }




    }

    snowlyDangerNotice() {
        if(this.my.id <=0) return false;

        let dem = this.dem;
        let dangerUser = this.dangerUser;
        let noiDungDanger = this.noiDungDanger;
        let maskNoiDungDanger = this.maskNoiDungDanger;


        if(dangerUser.visible == false) {
            if(this.logDanger.length >= 1) {
                dangerUser.visible = true;
                noiDungDanger.text = this.logDanger[0];
                noiDungDanger.x = maskNoiDungDanger.x + 10;
                this.logDanger.splice(0, 1);
                dangerUser.time = Date.now() + 500;
            }
        } else {
            if(this.logDanger.length >= 1 && noiDungDanger.width < this.gameWidth) {
                noiDungDanger.text = noiDungDanger.text + ', ' + this.logDanger[0];
                this.logDanger.splice(0, 1);

            }
            if(dem % 2 == 0 && dangerUser.time <= Date.now()) {
                noiDungDanger.x--;
                if(noiDungDanger.x <= -(maskNoiDungDanger.width + noiDungDanger.width / 2)) {
                    dangerUser.visible = false;
                }
            }
        }
    }

    snowlyTextnotice() {
        if(this.my.id <=0) return false;
        this.time.notiAll = this.time.notiAll || 1;

        if(this.time.notiAll >= Date.now()) return false;
        this.time.notiAll = Date.now() + 5;

        let dem = this.dem;
        let text_notice = this.text_notice;
        let bg_notice = this.bg_notice;
        if(text_notice && text_notice.visible == true) {

            text_notice.x--;
            if(text_notice.x <= -text_notice.width) {
                text_notice.x = 0;
                text_notice.visible = false;
                bg_notice.visible = false;
                this.chipi("thời gian hoàn thành "+Math.round((Date.now() - this.time.timeTest)/1000)+" giây.");
            }
        }

        if(text_notice && text_notice.visible == false) {
            if(this.logNotice.length > 0) {
                text_notice.x = this.gameWidth;
                text_notice.text = this.logNotice[0];
                text_notice.visible = true;
                bg_notice.visible = true;
                this.logNotice.splice(0, 1);
                this.time.timeTest = Date.now();
            }

        }
    }

    snowlyRoiTuDo() {


        if(this.timeRoiTuDo != 0) {
            if(this.timeRoiTuDo <= Date.now()) {
                this.keysPressed[40] = true;



            }
        }
    }

    snowlyupdateSkill() {
        if(this.my.id <=0) return false;

        let i = 0;
        let SkillDataOnScreen = this.SkillDataOnScreen;
        let my = this.my;

        for(let i = 0; i < my.oskill.length; i++) {
            let element = my.oskill[i];
            element == -1 ? 0 : element;
            let infoSkill = this.usedSkill(element);
            if(infoSkill && SkillDataOnScreen.time[i]) {
                let infoUseSkill = my.skill.find(e => e.id == infoSkill.id);
                if(infoUseSkill) {
                    if(infoUseSkill.time > Date.now()) {
                        console.log('have')

                        let timecon = infoUseSkill.time - Date.now();


                        let phantramcon = ((infoUseSkill.time - Date.now()) / (infoUseSkill.time - infoUseSkill.lasttime)) * 100;
                        SkillDataOnScreen.time[i].height = SkillDataOnScreen.time[i].max / 100 * phantramcon;
                    } else {
                        SkillDataOnScreen.time[i].height = 0;
                    }

                }
            }
        }
        
    }


    isDebug = () => {
        if(this.loadGame.visible == true) {
            this.keysPressed[37] = false;
            this.keysPressed[38] = false;
            this.keysPressed[39] = false;
            this.keysPressed[40] = false;
        }
        let name = '';
        
        this.showFPS.text = `fps:${Math.round(this.app.ticker.FPS)}  `+(this.gameInfo.debug == true ? `- Spr: ` + this.countScenes(this.container) + `` :'')+`  `;
        this.showFPS.position.set(0, this.gameHeight - this.showFPS.height);

        if(this.gameInfo.debug == true) {
            if(this.my.id >= 1) {
                let mapid = this.my.pos.map;
                let map = this.listMap.find(e => e.id == mapid);
                if(map) {
                    name = '#' + map.id + ' ' + map.name + ' K.' + this.my.pos.zone + '';
                }

            }
            this.postionChar.text = `X: ${Math.round(this.NhanVat.x)} Y: ${Math.round(this.NhanVat.y)} (${name}) `;
            this.postionChar.position.set(0, this.showFPS.y - this.postionChar.height);

        }

        if(this.my.id >=1) {
            if(this.NhanVat.y + this.NhanVat.height >= this.gameMap.setting.maxY) {
                this.xulynamdat2(this.my.id);
            }
        }
    }



}

export default updateALL;
