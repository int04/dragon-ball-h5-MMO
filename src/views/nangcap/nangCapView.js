import NangCapAction from "./nangCapAction.js";
export default class nangCapView extends NangCapAction {
    constructor() {
        super();
        this.luaChonNangCap = 0;
        this.danhSachItem = [];
    }


    boxBaseMenuNangCap = (head, name, list) => {
        let boxCreateMenuShop = (menu, name, list) => {
            let Container = new PIXI.Container();
            list.forEach((element, i) => {
                let test = menu.width * 0.98;
                let space = 2;
                test -= space * (list.length - 1);
                let min = test * 0.2;
                let minM = test / list.length;
                if(min > minM) min = minM;
                let button = this.snowlyGraphics(min, menu.height * 0.85, (element.onclick == name ? 0xb8e9b1 : 0xffe6c8), 0x6c4a00, 2, 10)
                button.x = i * button.width + i * space;
                let text = this.snowlyText(element.name, 16, 'fontchinh', 0x555555, true, button.width, button.height);
                button.addChild(text);
                this.snowlyEvent(button, () => {
                    this.shopChoose = element.onclick;
                    this.boxNangCapLv();
                });
                Container.addChild(button);
            });
            Container.y = menu.height / 2 - Container.height / 2;
            return Container;
        }

        let menu = this.snowlyGraphics(head.width, head.height * 0.5, 0xd9c8b3, 0x8d845b, 0);
        menu.addChild(boxCreateMenuShop(menu, name, list));

        menu.x = head.width / 2 - menu.width / 2;
        menu.y = head.height;

        return menu;
    }


    boxNangCapLv = (npc = 'ba') => {


        let menuList = [{
            name: 'Nâng cấp',
            onclick: 1,
        }];
        menuList.push({
            name: 'Hành trang',
            onclick: 999,
        });
        if(this.shopChoose != 1 && this.shopChoose != 999) this.shopChoose = 1;

        if(this.shopChoose == 999) {
            this.boxShopHanhTrang(menuList, { nangcap: true }, 2); // ! Chú ý ở đây
            return false;
        }

        this.closeBox();
        let background = this.boxBaseBackground();
        this.box.addChild(background);
        let head = this.boxBaseHead(background);

        npc = this.Charset.find(e => e.id == npc);
        if(!npc) {
            this.closeBox();
            this.notice(this._('Không tìm thấy người bán hàng.'));
            return false;
        }

        let avatar = this.snowlyImg(npc.source.script.avatar);
        avatar.width = head.width * 0.25;
        avatar.height = (head.height * 0.99) > avatar.width ? avatar.width : head.height * 0.99;
        avatar.x = head.width * 0.01;
        avatar.y = head.height * 0.99 - avatar.height;
        head.addChild(avatar);
        let info = new PIXI.Container();
        let txt1 = "Xin chào !";
        let txt2 = "Ta sẽ phù phép cho trang bị của ngươi trở nên mạnh mẽ hơn ";

        let gioithieu = this.snowlyText(txt1, 16, 'Arial', 0xFFFFFF, false, head.width * 0.7, head.height * 0.5);
        let gioithieu2 = this.snowlyText(txt2, 16, 'Arial', 0xFFFFFF, true, head.width * 0.7, head.height * 0.5);
        gioithieu2.y = gioithieu.height + gioithieu.y;
        info.addChild(gioithieu, gioithieu2);

        head.addChild(info);
        info.x = avatar.x + avatar.width + avatar.width * 0.05;
        info.y = head.height / 2 - info.height / 2;

        let menu = this.boxBaseMenuNangCap(head, this.shopChoose, menuList);



        //! body
        let body = this.boxBaseBody(background, head, menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body, background);

        let self = this;


        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = this.my;


        let clickItem = (listItem) => {
            listItem.interactive = true;
            listItem.cursor = 'pointer';
            let pointerStartTime = 0;
            let pointerEndTime = 0;

            listItem.on("pointerdown", function(event) {
                pointerStartTime = Date.now();
            });

            listItem.on("pointerup", function(event) {
                pointerEndTime = Date.now();
                if(pointerEndTime - pointerStartTime < 300) {
                    self.open_PreviewItem(listItem, {
                        layra: true,
                    });
                }
            });
        }

        let y = 0;

        for(let i = 0; i < this.danhSachItem.length; i++) {
            let listItem = new PIXI.Container();
            hienthinoidung.addChild(listItem);
            listItem.name = 'since04KEY';
            listItem.maxWight = slotwidth;
            listItem.maxHeight = slotheight;
            listItem.width = listItem.maxWight;
            listItem.height = listItem.maxHeight;

            listItem.x = 0;
            listItem.y = slotheight * i + 0;
            y = listItem.y + listItem.height;



            let ItemBG = new PIXI.Graphics();

            ItemBG.lineStyle(1, 0xd9c8b3, 1);
            ItemBG.beginFill(0x000000, 0.5);
            ItemBG.drawRoundedRect(0, 0, listItem.maxWight, listItem.maxHeight, 0);
            ItemBG.endFill();

            let BgBolderAvatar = new PIXI.Graphics();
            BgBolderAvatar.lineStyle(1, 0xd9c8b3, 1);
            BgBolderAvatar.beginFill(0xb39e83, 1);
            BgBolderAvatar.drawRoundedRect(0, 0, listItem.maxWight * 0.2, listItem.maxHeight, 0);
            BgBolderAvatar.endFill();
            BgBolderAvatar.x = 0;
            BgBolderAvatar.y = 0;


            let BgBolderInfo = new PIXI.Graphics();
            BgBolderInfo.lineStyle(1, 0xd9c8b3, 1);
            BgBolderInfo.beginFill(0xeeebe6, 1);
            BgBolderInfo.drawRoundedRect(BgBolderAvatar.x + BgBolderAvatar.getBounds().width, 0, listItem.maxWight * 0.8, listItem.maxHeight, 0);
            BgBolderInfo.endFill();



            let inBag = this.danhSachItem[i];
            if(inBag) {
                let inItem = this.findItem(inBag.item);
                if(inItem) {
                    let showImgItem = new PIXI.Sprite(this.coverImg(inItem.avatar));
                    showImgItem.width = 25;
                    showImgItem.height = 25;
                    showImgItem.x = (BgBolderAvatar.width - showImgItem.width) / 2;
                    showImgItem.y = (BgBolderAvatar.height - showImgItem.height) / 2;
                    BgBolderAvatar.addChild(showImgItem);

                    if(inBag.soluong > 1) {
                        let showImgQuantity = new PIXI.Text(inBag.soluong, {
                            fontSize: 16,
                            fill: 0xfefe00,
                            fontFamily: 'fontchinh',
                            wordWrap: true,

                            wordWrapWidth: BgBolderAvatar.width,
                        });

                        // showImgQuantity.width = BgBolderAvatar.width * 0.1;
                        //showImgQuantity.height = BgBolderAvatar.height * 0.1;
                        showImgQuantity.height = BgBolderAvatar.height * 0.38;
                        showImgQuantity.x = BgBolderAvatar.width - showImgItem.width;
                        showImgQuantity.y = BgBolderAvatar.height - showImgItem.height;
                        BgBolderAvatar.addChild(showImgQuantity);


                    }


                    let showInfoItem = new PIXI.Text(inItem.name, {
                        fontSize: 16,
                        fill: 0x005325,
                        fontFamily: 'fontchinh',
                        wordWrap: true,

                        wordWrapWidth: BgBolderInfo.width,
                    });

                    showInfoItem.resolution = 2;
                    showInfoItem.x = BgBolderInfo.getBounds().x + BgBolderInfo.getBounds().width * 0.04;
                    showInfoItem.height = BgBolderInfo.height * 0.38;
                    showInfoItem.y = 0 + BgBolderInfo.height * 0.1;

                    let showDesItem = new PIXI.Text(inItem.mota, {
                        fontSize: 14,
                        fill: 0x0683fd,
                        fontFamily: 'fontchinh',
                        wordWrap: true,

                        wordWrapWidth: BgBolderInfo.width,
                    });

                    showDesItem.resolution = 2;
                    showDesItem.x = BgBolderInfo.getBounds().x + BgBolderInfo.getBounds().width * 0.04;
                    showDesItem.height = BgBolderInfo.height * 0.38;
                    showDesItem.y = showInfoItem.y + showInfoItem.height;




                    BgBolderInfo.addChild(showInfoItem, showDesItem);




                }
            }

            ItemBG.addChild(BgBolderAvatar, BgBolderInfo);

            listItem.addChild(ItemBG);
            listItem.item = this.danhSachItem[i].id;


            clickItem(listItem)




        }


        if(this.danhSachItem.length == 0) {
            let txts = "";
            if(this.luaChonNangCap == 0) txts = "Bạn chưa chọn vật phẩm nào cả!\n Để nâng cấp đồ vui lòng vào hành trang chọn món đồ và loại đá phù hợp để nâng cấp.";
            if(this.luaChonNangCap == 1) txts = "Bạn chưa chọn vật phẩm nào cả !\n Để đục lỗ trang bị vui lòng chọn vật phẩm trang bị muốn đục lỗ, sau đó bấm Tiến Hành để đục.";
            if(this.luaChonNangCap == 2) txts = "Bạn chưa chọn vật phẩm nào cả !\n Để ép sao pha lê cho trang bị, bạn hãy chọn món đồ và sao pha lê cần ép.";
            let txt = this.snowlyText(this._(txts), 16, 'chelthm', 0x532905, false, body.width, body.height);
            txt.style.fontWeight = 'bold';
            hienthinoidung.addChild(txt);
        } else {
            hienthinoidung = this.nangCapXemtruoc(hienthinoidung);
            let button = this.snowlyGraphics(body.width * 0.3, body.height * 0.1, 0xdf793a, 0x590c24, 2, 10);
            button.x = body.width / 2 - button.width / 2;
            button.y = hienthinoidung.y + hienthinoidung.themmoi + button.height + 60;
            let text = this.snowlyText('Tiến hành', 16, 'fontchinh', 0x532905, true, button.width, button.height);
            button.addChild(text);
            button.interactive = true;
            button.cursor = 'pointer';
            button.name = 'since04KEY';

            button.on('pointerdown', () => {
                this.sanLocNangCap();
            });

            hienthinoidung.addChild(button);

        }


        let sc = this.snowlySroll(body, hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head, background);
        background.addChild(head, menu, foot);

        let checkWidth = background.width * 2;
        if(checkWidth <= this.gameWidth) {
            this.boxBaseShopRight('nangcap');
        }
    }


    ChooseInNangCap = (data) => {
        if(data.active != 'hanhtrang') return this.notice(this._('Vui lòng tháo vật phẩm ra trước.'));
        if(this.danhSachItem.find(e => e.id == data.id)) return this.notice(this._('Đã chọn vật phẩm này rồi.'));
        this.danhSachItem.push(data);
        this.boxNangCapLv();
    }

    RemoveChonNangCap = (id) => {
        this.danhSachItem = this.danhSachItem.filter(e => e.id != id);
        this.boxNangCapLv();
    }
}
