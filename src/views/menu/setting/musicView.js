
import hoiSinhView from "../hoisinhView.js";

export default class settingMusicView extends hoiSinhView {
    constructor() {
        super();
        this.offMusic = {};
        this.offMusic.valueSound = 1;

        if(localStorage.getItem('offMusic')) {
            this.offMusic = JSON.parse(localStorage.getItem('offMusic'));
        }
        if(!this.offMusic.valueSound) {
            this.offMusic.valueSound = 1;
        }
    }

    checkedMusic = (name) => {
        if(this.offMusic[name]) {
            return false;
        }
        return true;
    }

    updatedMusic =(name) => {
        if(name == 'valueSound') {
            let value = this.offMusic.valueSound;
            let valueNew = value + 0.1;
            if(valueNew > 1) {
                valueNew = 0;
            }
            this.offMusic.valueSound = valueNew;
        }
        else 
        {
            if(this.offMusic[name]) {
                this.offMusic[name] = false;
            } else {
                this.offMusic[name] = true;
            }
        }
        localStorage.setItem('offMusic', JSON.stringify(this.offMusic));
        this.runBoxSettingMusic();
        this.chipi("Cài đặt thành công. Một số chức năng sẽ được áp dụng khi bạn di chuyển qua khu vực khác.")
        this.resumeMusic(); // cập nhật

    }

    runBoxSettingMusic = () => {
        this.closeBox();
        let background = this.boxBaseBackground();
        this.box.addChild(background);

        //! HEAD
        let head = this.boxBaseHead(background);

        let avatar = this.snowlyImg(this.my.info.coban.avatar);
        avatar.width = head.width * 0.25;
        avatar.height = (head.height * 0.99) > avatar.width ? avatar.width : head.height * 0.99;
        avatar.x = head.width * 0.01;
        avatar.y = head.height * 0.99 - avatar.height;
        head.addChild(avatar);
        let info = new PIXI.Container();

        let gameInfo = this.snowlyText(this.gameInfo.gameName + ' ' + this.gameInfo.version, 18, 'fontchinh', 0xFFFFFF, false, head.width, head.height);
        info.addChild(gameInfo);

        let nhanVat = this.snowlyText("Nhân vật: " + this.my.name, 16, 'fontchinh', 0xFFFF00, false, head.width, head.height);
        nhanVat.y = gameInfo.height;
        info.addChild(nhanVat);

        let server = this.snowlyText("Tài khoản máy chủ: " + this.my.server + " sao", 16, 'fontchinh', 0xFFFF00, false, head.width, head.height);
        server.y = gameInfo.height + nhanVat.height;
        info.addChild(server);

        let username = this.snowlyText("" + this.my.username, 16, 'fontchinh', 0xFFFF00, false, head.width, head.height);
        username.y = gameInfo.height + nhanVat.height + server.height;
        info.addChild(username);

        head.addChild(info);
        info.x = avatar.x + avatar.width + avatar.width * 0.05;
        info.y = head.height / 2 - info.height / 2;

        //! menu
        let menu = this.boxBaseMenuTXT(head, 'Cài đặt âm thanh');



        //! body
        let body = this.boxBaseBody(background, head, menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body, background);


        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = this.my;

        let arrayMenu = [
            {   name: 'Toàn bộ âm thanh',action: 'hieuung'},
            {   name: '+ Âm thanh chạy',action: 'chay'},
            {   name: '+ Âm thanh bay',action: 'bayKI'},
            {   name: '+ Nhạc nền',action: 'backgroundMusic'},
            {   name: 'Âm lượng nhạc nền:'+Math.round(this.offMusic.valueSound*100)+'%',action: 'valueSound'},
        ];

        for(let i = 0; i < arrayMenu.length; i++) {
            let slot = new PIXI.Graphics();
            slot.lineStyle(1, 0xd9c8b3, 1);
            slot.name = "since04KEY";

            slot.beginFill(0xe6ded1, 1);
            slot.drawRoundedRect(0, 0, slotwidth, slotheight, 0);
            slot.endFill();
            slot.y = i * slotheight * 1.09;
            hienthinoidung.addChild(slot);
            let txt = '';
            txt = arrayMenu[i].name + (arrayMenu[i].action == 'valueSound' ? '' : (this.checkedMusic(arrayMenu[i].action) ? ' [Đang bật]' : ' [Đang tắt]'));

            let slot_text = new PIXI.Text(txt, {
                fontSize: 14,
                fill: 0x684323,
                fontFamily: 'fontchinh',
                wordWrap: true,
                wordWrapWidth: slotwidth,
                fontWeight: '900',

                strokeThickness: 0,
            });
            slot_text.resolution = 2;
            slot_text.style.align = 'center';

            slot_text.position.set(
                (slotwidth - slot_text.width * slot_text.scale.x) / 2, (slotheight - slot_text.height * slot_text.scale.y) / 2);
            slot.addChild(slot_text);

            slot.interactive = true;
            slot.buttonMode = true;


            let pointerStartTime = 0;
            let pointerEndTime = 0;

            slot.on("pointerdown", function(event) {
                pointerStartTime = Date.now();
            });
            let self = this;
            slot.on("pointerup", function(event) {
                pointerEndTime = Date.now();
                self.playSound('click');
                if(pointerEndTime - pointerStartTime < 200) {
                    self.updatedMusic(arrayMenu[i].action);
                } else {}
            });


        }

        // end

        let sc = this.snowlySroll(body, hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head, background);
        background.addChild(head, menu, foot);
    }
}