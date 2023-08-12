import nangCapView from "../nangcap/nangCapView.js";

export default class ruongNhaView extends nangCapView {
    constructor() {
        super();
    }

    boxBaseMenuShopRuong = (head, name, list) => {
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
                    this.openRuongDo(element.onclick);
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

    ruongCatVao = (id) => {
        this.notice(this._('Xin chờ'), false);

        this.to(-26, {
            _1: 1,
            _2: id,
        })
    }

    ruongBoRa = (id) => {
        this.notice(this._('Xin chờ'), false);

        this.to(-26, {
            _1: 2,
            _2: id,
        })
    }



    openRuongDo(id = 0) {

        let menulist = [
            { name: 'Rương đồ', onclick: 0 },
            { name: 'Hành trang', onclick: 1 },
        ];
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
        let hp = this.snowlyText("HP: " + this.my.info.chiso.hp + " / " + this.my.info.chiso.hpFull + "", 16, 'fontchinh', 0xfefe00, false, head.width, head.height);
        hp.y = 0;
        info.addChild(hp);

        let ki = this.snowlyText("KI: " + this.my.info.chiso.ki + " / " + this.my.info.chiso.kiFull + "", 16, 'fontchinh', 0xfefe00, false, head.width, head.height);
        ki.y = hp.y + hp.height;
        info.addChild(ki);

        let sucdanh = this.snowlyText("Sức đánh: " + this.my.info.chiso.sucdanh + "", 16, 'fontchinh', 0xfefe00, false, head.width, head.height);
        sucdanh.y = ki.y + ki.height;
        info.addChild(sucdanh);

        let giap = this.snowlyText("Giáp: " + this.my.info.chiso.giap + ", Chí mạng: " + this.my.info.chiso.chimang + "%", 16, 'fontchinh', 0xfefe00, false, head.width, head.height);
        giap.y = sucdanh.y + sucdanh.height;
        info.addChild(giap);

        head.addChild(info);
        info.x = avatar.x + avatar.width + avatar.width * 0.05;
        info.y = head.height / 2 - info.height / 2;

        //! menu
        let menu = this.boxBaseMenuShopRuong(head, id, menulist);



        //! body
        let body = this.boxBaseBody(background, head, menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body, background);


        // body
        let self = this;
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
                        catvao: id == 1 ? 1 : 0,
                        bora: id == 0 ? 1 : 0,
                    });
                }
            });
        }

        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = this.my;

        let oTrangBi = 6;
        if(id == 0) oTrangBi = 0;

        let fewUse = ['ao', 'quan', 'gang', 'giay', 'rada', 'caitrang']; // thông tin các món trang bị
        let fewY = 0;
        for(let i = 0; i < oTrangBi; i++) {
            let listItem = new PIXI.Container();
            listItem.name = "since04KEY";
            hienthinoidung.addChild(listItem);

            listItem.maxWight = slotwidth;
            listItem.maxHeight = slotheight;
            listItem.width = listItem.maxWight;
            listItem.height = listItem.maxHeight;

            listItem.x = 0;
            listItem.y = slotheight * i + 0;



            let ItemBG = new PIXI.Graphics();

            ItemBG.lineStyle(1, 0xd9c8b3, 1);
            ItemBG.beginFill(0x000000, 0.5);
            ItemBG.drawRoundedRect(0, 0, listItem.maxWight, listItem.maxHeight, 0);
            ItemBG.endFill();

            let BgBolderAvatar = new PIXI.Graphics();
            BgBolderAvatar.lineStyle(1, 0xd9c8b3, 1);
            BgBolderAvatar.beginFill(0x977b55, 1);
            BgBolderAvatar.drawRoundedRect(0, 0, listItem.maxWight * 0.2, listItem.maxHeight, 0);
            BgBolderAvatar.endFill();
            BgBolderAvatar.x = 0;
            BgBolderAvatar.y = 0;


            let BgBolderInfo = new PIXI.Graphics();
            BgBolderInfo.lineStyle(1, 0xd9c8b3, 1);
            BgBolderInfo.beginFill(0xe6ded1, 1);
            BgBolderInfo.drawRoundedRect(BgBolderAvatar.x + BgBolderAvatar.getBounds().width, 0, listItem.maxWight * 0.8, listItem.maxHeight, 0);
            BgBolderInfo.endFill();



            if(my.trangbi[fewUse[i]] && my.trangbi[fewUse[i]] != 0) {
                let id = my.trangbi[fewUse[i]];
                let inBag = this.findBag(id);
                if(inBag) {
                    let inItem = this.findItem(inBag.item);
                    if(inItem) {
                        let showImgItem = new PIXI.Sprite(this.coverImg(inItem.avatar));
                        showImgItem.width = 25;
                        showImgItem.height = 25;
                        showImgItem.x = (BgBolderAvatar.width - showImgItem.width) / 2;
                        showImgItem.y = (BgBolderAvatar.height - showImgItem.height) / 2;
                        BgBolderAvatar.addChild(showImgItem);


                        let showInfoItem = this.snowlyText(inItem.name, 16, 'fontchinh', 0x005325, false, BgBolderInfo.width, BgBolderInfo.height);
                        showInfoItem.resolution = 2;
                        showInfoItem.x = BgBolderInfo.getBounds().x + BgBolderInfo.getBounds().width * 0.04;
                        showInfoItem.height = BgBolderInfo.height * 0.38;
                        showInfoItem.y = 0 + BgBolderInfo.height * 0.1;

                        let showDesItem = this.snowlyText(inItem.mota, 14, 'fontchinh', 0x0683fd, false, BgBolderInfo.width, BgBolderInfo.height);
                        showDesItem.resolution = 2;
                        showDesItem.x = BgBolderInfo.getBounds().x + BgBolderInfo.getBounds().width * 0.04;
                        showDesItem.height = BgBolderInfo.height * 0.38;
                        showDesItem.y = showInfoItem.y + showInfoItem.height;

                        BgBolderInfo.addChild(showInfoItem, showDesItem);
                        BgBolderInfo.item = inBag.id;




                    }
                }
            }




            ItemBG.addChild(BgBolderAvatar, BgBolderInfo);




            listItem.addChild(ItemBG);

            listItem.item = BgBolderInfo.item;

            clickItem(BgBolderInfo)



        }

        let slotbag = id == 0 ? my.ruong.ruong : my.ruong.slot;

        let iItem = 0;
        let dataItem = my.ruong.item.filter(item => item.active === (id == 1 ? "hanhtrang" : "ruong"));
        dataItem.forEach(element => {
            element.lastTime = element.lastTime || Date.now();
        });
        dataItem.sort(function(a, b) { return a.lastTime - b.lastTime });
        for(let i = oTrangBi; i < slotbag + oTrangBi; i++) {
            let listItem = new PIXI.Container();
            listItem.name = "since04KEY";

            hienthinoidung.addChild(listItem);

            listItem.maxWight = slotwidth;
            listItem.maxHeight = slotheight;
            listItem.width = listItem.maxWight;
            listItem.height = listItem.maxHeight;

            listItem.x = 0;
            listItem.y = slotheight * i + 0;



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



            if(dataItem[iItem]) {
                let inBag = dataItem[iItem];
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
            }




            ItemBG.addChild(BgBolderAvatar, BgBolderInfo);




            listItem.addChild(ItemBG);
            listItem.item = dataItem[iItem] ? dataItem[iItem].id : null;


            clickItem(listItem)

            iItem++;




        }

        // end

        let sc = this.snowlySroll(body, hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head, background);
        background.addChild(head, menu, foot);

        let checkWidth = background.width * 2;
        if(checkWidth <= this.gameWidth) {
            this.boxBaseShopRight('ruong');
        }
    }
}
