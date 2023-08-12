import createSpriteView from './createSpriteView.js';

export default class shopViewPT extends createSpriteView {
    constructor() {
        super();
    }

    btShopBuyIcon = (icon) => {
        if(icon == -1) {
            this.notice('Bạn chưa chọn biểu tượng');
            return;
        }
        let my = this.my;
        let base_icon = this.base_co.find(e => e.id == icon);
        if(my.tien[base_icon.type == 1 ? 'vang' : 'zeni'] < base_icon.cost) {
            this.notice('Bạn không đủ ' + (base_icon.type == 1 ? 'vàng' : 'ngọc xanh') + ' để tạo bang');
            return;
        }

        this.await();

        this.to(-33,{
            type : 'shop_icon',
            iconID : icon,
        })
    }

    boxPTShopBieuTuong = (iconChoose = -1) => {
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
        let menu = this.boxBaseMenuTXT(head, 'Thay đổi biểu tượng');



        //! body
        let body = this.boxBaseBody(background, head, menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body, background);


        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = this.my;

        let bieuTuong = this.html(`

            <center><font color="005325"><b>Biểu tượng:</b></font></center>
        `);

        bieuTuong.x = body.width / 2 - bieuTuong.width / 2;
        bieuTuong.y = 30;
        hienthinoidung.addChild(bieuTuong);


        this.base_co.forEach((e, i) => {
            let container = new PIXI.Container();
            container.name = 'since04KEY';
            let background = new PIXI.Graphics();
            background.beginFill((e.id == iconChoose ? 0x6b1d28 : 0x000000), 0.5);
            background.lineStyle(1, 0x000000, 0.5);
            background.drawRoundedRect(0, 0, slotwidth, slotheight, 0);
            background.endFill();
            container.addChild(background);

            let back30 = new PIXI.Graphics();
            back30.beginFill(0x000000, 0.5);
            back30.lineStyle(1, 0x000000, 0.5);
            back30.drawRoundedRect(0, 0, slotheight, slotheight, 0);
            back30.endFill();

            let icon = this.snowlyImg(e.src[0]);
            icon.width = slotheight * 0.9;
            icon.height = slotheight * 0.9;
            icon.x = slotheight * 0.05;
            icon.y = slotheight * 0.05;
            back30.addChild(icon);

            container.addChild(back30);

            let nameIcon = this.html(`
                <center><font color="blue"><b>${e.name}</b></font></center>
            `);
            nameIcon.x = back30.x + back30.width + 5;
            nameIcon.y = slotheight * 0.2;
            container.addChild(nameIcon);

            let costIcon = this.html(`
                <center><font color="eec385"><b>${this.number_format(e.cost)}</b></font> ${e.type == 1 ? '<font color="yellow">Vàng</font>' : '<font color="005325">Ngọc xanh</font>'} </center>
            `);
            costIcon.x = nameIcon.x;
            costIcon.y = slotheight  - costIcon.height ;
            container.addChild(costIcon);

            container.y = bieuTuong.y + bieuTuong.height + 5 + slotheight * i;

            container.interactive = true;

            let timeClick = 0;

            container.on('pointerdown', () => {
                timeClick = Date.now();
            });
            container.on('pointerup', () => {
                let time = Date.now();
                if(time - timeClick > 200) return;
                this.chipi("Đã chọn biểu tượng " + e.name);
                this.boxPTShopBieuTuong(e.id);
            });

            hienthinoidung.addChild(container);

        });

        let button = new PIXI.Graphics();
        button.beginFill(0x6b1d28, 1);
        button.lineStyle(1, 0x000000, 1);
        button.drawRoundedRect(0, 0, slotwidth * 0.4, slotheight, 10);
        button.endFill();
        button.x = body.width / 2 - button.width / 2;
        button.y = bieuTuong.y + bieuTuong.height + 5 + slotheight * this.base_co.length + 5;
        hienthinoidung.addChild(button);

        let textButton = this.html(`
            <center><font color="ffffff"><b>Cập nhật</b></font></center>
        `);
        textButton.x = button.x + button.width / 2 - textButton.width / 2;
        textButton.y = button.y + button.height / 2 - textButton.height / 2;
        hienthinoidung.addChild(textButton);

        button.interactive = true;
        button.on('pointerdown', () => {
            this.btShopBuyIcon(iconChoose);
        });
        //button.name ="since04KEY";
        


        

        /* Kết thúc */

        let sc = this.snowlySroll(body, hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head, background);
        background.addChild(head, menu, foot);
    }
}