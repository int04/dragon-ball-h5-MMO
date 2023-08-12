import { keypressMove_Run } from './actionRun.js';
class keypressMove extends keypressMove_Run {
    constructor() {
        super();
        this.moveTimeout = 0;
        this.sinceKeyDown(); // ấn xuống
        this.sinceKeyUp(); // nhả phím
        this.sinceKeyOne(); // nhấn phím một lần
        this.sendToServer = true;
        this.logChange = [];
        this.timeSetRoiTuDo = 0;
        this.thoigianroitudo = 0;
        this.speedOld = 1;
        this.lanDauBay = true;

        this.yFirst = 0; // y vị trí trước khi bay
        this.docao = 0; // độ cao khi bay

        this.actionMap = {
            nuida : 0,
            nuixa : 0,
        };
        this.goto = false;
    }


    coppy(value) {
        // coppy to clipboard
        let input = document.createElement('input');
        input.value = value;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);

    }

    /**
     * @param {number} keyCode
     * @desc: kiểm tra đối tượng nằm trên bản dồ
     */
    checkOnDat22 = (id, key = 'down') => {
        let player = this.my.id == id ? this.NhanVat : this.nguoichoi.children.find(e => e.id == id);
        let data = this.my.id == id ? this.my : this.Charset.find(e => e.id == id);
        if(!player) return true;
        if(!data) return true;
        let datd = this.bando.children.filter(item => item.type === "dat");

        // check on dat
        let isPlayerOnDatLayer = false;
        let k = 0;
        for(let i = 0; i < datd.length; i++) {
            let mapSprite = datd[i];

            if(this.hitTestRectangle(player, mapSprite, key, 10)) {
                isPlayerOnDatLayer = true;
                k = i;
                break;
            }
        }
        if(!isPlayerOnDatLayer) {
            if(data.id == this.my.id) {
                this.timeRoiTuDo = Date.now() + 150;
            }
        }

        if(isPlayerOnDatLayer) {
            if(data.id == this.my.id) {
                this.timeRoiTuDo = Date.now() + 150;
                this.addEff({
                    id: 'fly_first_eff_khoi2_' + this.my.id,
                    type: 'flyKI_first2',
                    by: this.my.id,
                })
            }
            return true;
        }
        return false;
    }

    /**
     * @method: checkOnDat
     * @param {number} id
     * @desc: kiểm tra đối tượng nằm trên bản dồ
     */

    xulynamdat = (id, when = false) => {
        if(id != this.my.id) return false;
        console.log('Vài lần')

        if(!this.cacheAction.find(e => e.id == id)) {
            this.cacheAction.push({
                id: id,
                action: 'dungyen',
            });
        }

        let datd = this.bando.children.filter(item => item.type === "dat");

        let data = this.my.id == id ? this.my : this.Charset.find(e => e.id == id);
        if(!data) return false;

        let player = this.my.id == id ? this.NhanVat : this.nguoichoi.children.find(e => e.id == id);
        if(!player) return false;
        player.visible = false;

        let gannhat = null;
        let k = null;
        for(let i = 0; i < datd.length; i++) {
            let dat = datd[i];

            let dx = this.calculateDistance(player, dat);
            if(gannhat == null || gannhat > dx) {
                gannhat = dx;
                k = i;
            }
        }

        if(k != null) {
            player.y = Math.round(datd[k].y - player.height + 24);
            player.y = Math.round(player.y);
            this.NhanVatGoc.y = player.y;
            this.NhanVatGoc.x = player.x;
            data.pos.y = player.y;
            this.lanDauBay = true;
            //this.checkOnDat22(id);

        }
        console.log('k',k)


        player.namdat = 1;
        this.sendMyMove();

        if(when == true) {
            

        }
        player.visible = true;


    }


    xulynamdat2 = (id, when = false) => {
        if(id != this.my.id) return false;
        console.log('Vài lần')

        if(!this.cacheAction.find(e => e.id == id)) {
            this.cacheAction.push({
                id: id,
                action: 'dungyen',
            });
        }

        let datd = this.bando.children.filter(item => item.type === "dat");

        let data = this.my.id == id ? this.my : this.Charset.find(e => e.id == id);
        if(!data) return false;

        let player = this.my.id == id ? this.NhanVat : this.nguoichoi.children.find(e => e.id == id);
        if(!player) return false;
        player.visible = false;

        let gannhat = null;
        let k = null;
        for(let i = 0; i < datd.length; i++) {
            let dat = datd[i];

            let dx = this.calculateDistance(player, dat);
            if(gannhat == null || gannhat > dx) {
                gannhat = dx;
                k = i;
            }
        }

        if(k != null) {
            player.y = Math.round(datd[k].y - player.height *3);
            player.y = Math.round(player.y);
            this.NhanVatGoc.y = player.y;
            this.NhanVatGoc.x = player.x;
            data.pos.y = player.y;
            this.lanDauBay = true;
            //this.checkOnDat22(id);

        }


        player.namdat = 1;
        this.sendMyMove();

        if(when == true) {
            

        }
        player.visible = true;


    }


    /**
     * @method: checkey 
     * @desc: kiểm tra xem có mở các menu không ? Nếu đang mở các menu thì không cho phép di chuyển
     * @return {boolean}
     * @param {number} id
     * @param {string} key
     * 
    */
    checkKey = () => {
        // if list box is visible, No action
        if(this.box.children.length <= 0) this.box.visible = false;
        if(this.boxError.children.length <= 0) this.boxError.visible = false;
        if(this.khungGiaoTiep.children.length <= 0) this.khungGiaoTiep.visible = false;
        if(this.bodyChat.children.length <= 0) this.bodyChat.visible = false;


        if(this.box.visible == true) return true;
        if(this.boxError.visible == true) return true;
        if(this.khungGiaoTiep.visible == true) return true;
        if(this.bodyChat.visible == true) return true;

        return false;
    }


    /**
     * @method: sendMyMove
     * @desc: Cập nhật các dữ liệu của người dùng tới websocket.
     */
    sendMyMove = () => {
        let _move = this.NhanVat.huong ? this.NhanVat.huong : 'right';
        this.to('-3', {
            _1: this.NhanVat.x,
            _2: this.NhanVat.y,
            _3: _move == 'right' ? 1 : 2,
            _4: this.my.info.act,
        })
    }


    /**
     * @method: changeClickAuto
     * @desc: thay đổi đối tượng click vào biểu tượng thay đổi hoặc ấn F2
     */
    changeClickAuto() {
        if((this.setting.mouse != 0 || this.setting.mouse != 1) && this.logChange.find(e => e == this.setting.mouse) == undefined) {
            this.logChange.push(this.setting.mouse);
        }
        let have = 0;
        for(let i = 0; i < this.Charset.length; i++) {
            let nhanVat = this.getNhanVat(this.Charset[i].id);
            if(!nhanVat) continue;
            if(nhanVat.visible == false) continue;
            let dx = Math.abs(((this.NhanVat.x - this.Charset[i].pos.x) ^ 2 + (this.NhanVat.y - this.Charset[i].pos.y) ^ 2));
            if(dx < 200 && this.logChange.find(e => e == this.Charset[i].id) == undefined) {
                this.setting.mouse = this.Charset[i].id;
                have = 1;
                this.logChange.push(this.Charset[i].id);
                break;
            }
        }
        if(have == 0) {
            this.logChange = [];
        }
    }

    /**
     * @method: sinceKeyUp
     * @desc: Xử lý sau khi không giữ phím nữa.
     */
    sinceKeyUp = () => {
        
        document.addEventListener("keyup", (e) => {
            if(this.my.info.act == 'fly' || this.my.info.act == 'baylen' || this.my.info.act == 'flymove') {
                this.timeRoiTuDo = Date.now() + 150;
            } else {
                this.timeRoiTuDo = Date.now() + 150;
            }
            if(this.my.info.act == 'move') {

                this.my.info.act = 'dungyen';
                this.addAction()
            }


            if(this.my.info.act == 'fly') {
                this.my.info.act = 'baylen';
                this.addAction();
            }

            if((this.keysPressed[40] || this.keysPressed[38] || this.keysPressed[37] || this.keysPressed[39]) && this.my.id > 0) {
                setTimeout(() => {
                    this.sendMyMove();
                }, 1);
            }

            if(this.goto) {
                this.keysPressed[37] = false;
                this.keysPressed[38] = false;
                this.keysPressed[39] = false;
                this.keysPressed[40] = false;
            }

            delete this.keysPressed[e.keyCode];
        });
    }


    
    /**
     * @method: sinceKeyDown
     * @desc: Xử lý khi giữ phím xuống.
     */

    
    sinceKeyDown = () => {
        document.addEventListener("keydown", (e) => {
           
            if(e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 37 || e.keyCode == 39) {
                if(this.goto) {
                    this.keysPressed[37] = false;
                    this.keysPressed[38] = false;
                    this.keysPressed[39] = false;
                    this.keysPressed[40] = false;
                    this.goto = false;
                }
            }

            if(e.keyCode == 116) 
            {
                e.preventDefault();
                this.coppy(''+Math.round(this.NhanVat.x)+', '+Math.round(this.NhanVat.y)+',');
            }

            this.timeRoiTuDo = 0;
            delete this.keysPressed[40];
            if((e.keyCode == 40 || e.keyCode == 38 || e.keyCode == 37 || e.keyCode == 39)) {
                if(this.my && this.my.id >= 1 && this.my.info.chiso.hp <= 0) {
                    return false;
                }
            }

            if(e.keyCode == 112) {
                e.preventDefault();
            }

            if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) {
                this.pressNut(e.keyCode);
            }
            else 
            {
                this.keysPressed[e.keyCode] = true;
            }

            if((this.keysPressed[40] || this.keysPressed[38] || this.keysPressed[37] || this.keysPressed[39] || this.keysPressed[13]) && this.my.id == 0 || this.checkKey() == true) {
                this.keysPressed[40] = false;
                this.keysPressed[38] = false;
                this.keysPressed[37] = false;
                this.keysPressed[39] = false;
                this.keysPressed[13] = false;

            }
        });
    }

    sinceKeyOne = () => {
        document.addEventListener("keydown", (e) => {
            if(e.keyCode >= 49 && e.keyCode <= 53) {
                return this.numberAttack(e.keyCode);
            }
            if(e.keyCode >= 97 && e.keyCode <= 101) {
                return this.numberAttack(e.keyCode);
            }

            if(e.keyCode == 13) {
                return this.interAttack();
            }

            if(e.keyCode == 82) {
                this.openChat();
            }

            if(e.keyCode == 112) {
                this.openLastMenu();
            }

            if(e.keyCode == 113) {
                this.changeClickAuto();
            }


        }, { capture: true, passive: false });
    }



    
}

export default keypressMove;
