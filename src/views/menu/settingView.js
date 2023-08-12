import musicView from "./setting/musicView.js";

export default class settingView extends musicView {
    constructor() {
        super();
    }

    runBoxSetting = () => {
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
        let menu = this.boxBaseMenuTXT(head, 'Chức năng');



        //! body
        let body = this.boxBaseBody(background, head, menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body, background);


        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = this.my;

        let arrayMenu = [{
                name: 'Cài đặt âm thanh',
                action: 'runBoxSettingMusic',
        }

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

            let slot_text = new PIXI.Text(arrayMenu[i].name, {
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
                    let list = arrayMenu[i].action.split(',');
                    list.forEach(element => {
                        self[element]();
                    });
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