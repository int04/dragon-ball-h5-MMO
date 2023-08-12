import GiaoDich from "../trade/tradeView.js";
export default class shopView extends GiaoDich {
    constructor() {
        super();
    }

    ioBoxShopSuccess(data) {

        this.my.ruong = data._1;
        this.my.tien = data._2;
        if(!data._3) this.danger('Mua thành công.');
        else this.danger('Bạn nhận được ' + data._3 + ' vàng. ');
        this.boxBaseShop();
        this.deleteNotice();
    }


    ioBoxShop(data) {
        let my = this.my;
        if(my.id <= 0) return false;
        my.ruong = data._4;
        my.tien = data._3;
        this.shopData = data._1;
        this.shopList = data._2;
        this.shopChoose = 0;
        this.shopData.id = data.npc;
        this.boxBaseShop();
    }




    boxBaseMenuShop = (head, name, list) => {
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
                    this.boxBaseShop();
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


    boxShopHanhTrang(menuList, object = { sell: true }, objecttype = 1) {
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
        let menu;

        if(objecttype == 1) menu = this.boxBaseMenuShop(head, 999, menuList);
        else if(objecttype == 2) menu = this.boxBaseMenuNangCap(head, 999, menuList);


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
                    self.open_PreviewItem(listItem, object);
                }
            });
        }

        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = this.my;

        let oTrangBi = 6;

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
        let iItem = 0;
        let dataItem = my.ruong.item.filter(item => item.active === "hanhtrang");
        dataItem.forEach(element => {
            element.lastTime = element.lastTime || Date.now();
        });
        dataItem.sort(function(a, b) { return a.lastTime - b.lastTime });
        for(let i = oTrangBi; i < my.ruong.slot + oTrangBi; i++) {
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

            let color = 0xeeebe6;
            if(dataItem[iItem]) {
                let inBag = dataItem[iItem];
                {
                    if(this.danhSachItem.find(e => e.id == inBag.id)) {
                        color = 0x532905;
                    }
                }
            }

            let BgBolderInfo = new PIXI.Graphics();
            BgBolderInfo.lineStyle(1, 0xd9c8b3, 1);
            BgBolderInfo.beginFill(color, 1);
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


    }

    boxBaseShop = () => {
        let menuList = [];
        this.shopData.data.forEach((element, i) => {
            menuList.push({
                name: element.name,
                onclick: i,
            })
        });

        menuList.push({
            name: 'Hành trang',
            onclick: 999,
        });
        if(this.shopChoose == 999) {
            this.boxShopHanhTrang(menuList);
            return false;
        }

        this.closeBox();
        let background = this.boxBaseBackground();
        this.box.addChild(background);

        //! HEAD
        let head = this.boxBaseHead(background);

        let npc = this.shopData.id;
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
        let txt2 = "Cậu cần gì nào ?";

        let gioithieu = this.snowlyText(txt1, 16, 'fontchinh', 0xFFFFFF, false, head.width * 0.7, head.height * 0.5);
        let gioithieu2 = this.snowlyText(txt2, 16, 'fontchinh', 0x29ba58, false, head.width * 0.7, head.height * 0.5);
        gioithieu2.y = gioithieu.height + gioithieu.y;
        info.addChild(gioithieu, gioithieu2);

        head.addChild(info);
        info.x = avatar.x + avatar.width + avatar.width * 0.05;
        info.y = head.height / 2 - info.height / 2;

        //! menu



        let menu = this.boxBaseMenuShop(head, this.shopChoose, menuList);



        //! body
        let body = this.boxBaseBody(background, head, menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body, background);


        // body
        let self = this;


        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = this.my;

        let shopData = this.shopData.data[this.shopChoose].list;

        let iItem = 0;
        let ii = -1;
        let dataItem = my.ruong.item.filter(item => item.active === "hanhtrang");
        for(let i = 0; i < shopData.length; i++) {
            let inItem = this.findItem(shopData[i]);

            if(!inItem) continue;
            if(inItem.type == 'item' && inItem.type2 == 'sachvo' && (inItem.class != my.info.coban.type && inItem.class != 'all')) continue;

            ii++;
            let listItem = new PIXI.Container();

            listItem.name = "since04KEY";
            hienthinoidung.addChild(listItem);

            listItem.maxWight = slotwidth;
            listItem.maxHeight = slotheight;
            listItem.width = listItem.maxWight;
            listItem.height = listItem.maxHeight;

            listItem.x = 0;
            listItem.y = slotheight * ii + 0;



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



            if(inItem) {
                let showImgItem = new PIXI.Sprite(this.coverImg(inItem.avatar));
                showImgItem.width = 25;
                showImgItem.height = 25;
                showImgItem.x = (BgBolderAvatar.width - showImgItem.width) / 2;
                showImgItem.y = (BgBolderAvatar.height - showImgItem.height) / 2;
                BgBolderAvatar.addChild(showImgItem);




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

                let shopList = this.shopList.find(e => e.idvp == inItem.id);
                let showCostIcon = new PIXI.Sprite(this.coverImg(shopList.type == 'vang' ? '930' : '932'));
                showCostIcon.width = slotheight * 0.4;
                showCostIcon.height = slotheight * 0.4;
                showCostIcon.y = BgBolderInfo.height * 0.1;
                showCostIcon.x = body.width - showCostIcon.width - showCostIcon.width * 0.5;

                let showCostText = new PIXI.Text(this.intToM(shopList.buy), {
                    fontSize: 16,
                    fill: 0xfea900,
                    fontFamily: 'fontchinh',
                    fontWeight: 'bold',
                    wordWrap: true,
                });
                showCostText.y = showCostIcon.y + showCostIcon.height / 2 - showCostText.height / 2;
                showCostText.x = showCostIcon.x - showCostText.width - showCostIcon.width * 0.3;

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
                BgBolderInfo.addChild(showCostIcon, showCostText);



            }




            ItemBG.addChild(BgBolderAvatar, BgBolderInfo);




            listItem.addChild(ItemBG);
            listItem.item = shopData[i];


            listItem.interactive = true;
            listItem.cursor = 'pointer';
            let pointerStartTime = 0;
            let pointerEndTime = 0;

            listItem.on("pointerdown", function(event) {
                pointerStartTime = Date.now();

            });

            listItem.on("pointerup", function(event) {
                pointerEndTime = Date.now();
                if(pointerEndTime - pointerStartTime < 200) {
                    self.open_PreviewItemShop(listItem);
                    gioithieu.text = "yêu cầu "+self.intToM(inItem.sucmanh)+" Sức mạnh ";
                    let shopList = self.shopList.find(e => e.idvp == inItem.id);

                    gioithieu2.text = self.intToM(shopList.buy) + " " + (shopList.type == 'vang' ? 'Vàng' : 'Ngọc') ;
                } else {
                    gioithieu.text = txt1;
                    gioithieu2.text = txt2;
                }
            });

            iItem++;




        }

        // end

        let sc = this.snowlySroll(body, hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head, background);
        background.addChild(head, menu, foot);

        let checkWidth = background.width * 2;
        if(checkWidth <= this.gameWidth) {
            this.boxBaseShopRight();
        }
    }



    boxBaseShopRight = (sinceType = 'shop') => {
        let background = this.boxBaseBackground(false);
        this.box.addChild(background);
        //! HEAD
        let head = this.boxBaseHead(background);
        head.x = background.width / 2 - head.width / 2;
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
        let menu = this.boxBaseMenuTXT(head, 'Hành trang');



        //! body
        let body = this.boxBaseBody(background, head, menu);

        let hienthinoidung = new PIXI.Container();

        hienthinoidung.name = "tabname";


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

                    if(sinceType == 'ruong') {
                        self.open_PreviewItem(listItem, {
                            display: 'right',
                            catvao: true,
                        });
                    } else
                    if(sinceType == 'shop') {
                        self.open_PreviewItem(listItem, {
                            display: 'right',
                            sell: true,
                        });
                    } else {
                        self.open_PreviewItem(listItem, {
                            display: 'right',
                            nangcap: true,
                        });
                    }

                }
            });
        }

        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = this.my;

        let oTrangBi = 6;

        let fewUse = ['ao', 'quan', 'gang', 'giay', 'rada', 'caitrang']; // thông tin các món trang bị
        let fewY = 0;
        for(let i = 0; i < oTrangBi; i++) {
            let listItem = new PIXI.Container();
            listItem.name = 'since04KEY';
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
        let iItem = 0;
        let dataItem = my.ruong.item.filter(item => item.active === "hanhtrang");
        dataItem.forEach(element => {
            element.lastTime = element.lastTime || Date.now();
        });
        dataItem.sort(function(a, b) { return a.lastTime - b.lastTime });
        for(let i = oTrangBi; i < my.ruong.slot + oTrangBi; i++) {
            let listItem = new PIXI.Container();

            hienthinoidung.addChild(listItem);
            listItem.name = 'since04KEY';
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

            let color = 0xeeebe6;
            if(dataItem[iItem]) {
                let inBag = dataItem[iItem];
                {
                    if(this.danhSachItem.find(e => e.id == inBag.id)) {
                        color = 0x532905;
                    }
                }
            }


            let BgBolderInfo = new PIXI.Graphics();
            BgBolderInfo.lineStyle(1, 0xd9c8b3, 1);
            BgBolderInfo.beginFill(color, 1);
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
        let bouns = body.height / 100 * 150;
        bouns = 0;
        let viewport = new pixi_viewport.Viewport({
            screenWidth: body.width,
            screenHeight: body.height + bouns,
            worldWidth: hienthinoidung.width,
            worldHeight: hienthinoidung.height + bouns,
            passiveWheel: true,
        });
        viewport.name = "Lớp cuộn";
        viewport.addChild(hienthinoidung);

        viewport.width = body.width * 0.99;


        body.addChild(viewport);
        viewport
            .drag({
                direction: 'y',
                pressDrag: true,
                factor: 1,

            })
            .decelerate({
                friction: 0.95,
                bounce: 0.8,
                minSpeed: 0.01,
            })
        viewport.bounce({
            top: true,
            bottom: true,
            friction: 0.5,
            time: 0,
            ease: 'easeInOutSine',
        });


        /* Hiệu ứng con trỏ trên bàn phím */



        let point = -1;
        let eventGame = () => {
            self.pcSettimeEntactive2 = setInterval(function() {
                let event = self.pcKey;
                if(self.box.visible == false) {
                    clearInterval(self.pcSettimeEntactive2);
                    return false;
                }
                if(self.conTro != 1) return false;

                let children = hienthinoidung.children.filter(e => e.name == 'since04KEY');

                if(event === 'ArrowUp') {
                    self.boxPreviewItem.removeChildren();
                    point -= 1;
                    if(point < 0) point = children.length - 1;

                } else if(event === 'ArrowDown') {
                    self.boxPreviewItem.removeChildren();
                    point += 1;
                    if(point >= children.length) point = -1;
                }

                if(event === 'Enter') {
                    let current = children[point];
                    let event = self.getAllInteractiveChildren(current);
                    if(event.length > 0 && self.boxPreviewItem.children.length == 0) {
                        event[0].emit('pointerdown');
                        event[0].emit('pointerup');
                    }
                }

                if(children[point] && self.pcKey.length >= 1) {
                    for(let i = 0; i < children.length; i++) {
                        children[i].removeChild(children[i].getChildByName('xanhle'));
                    }

                    viewport.moveCenter(children[point].x, children[point].y);
                    let width = children[point].width;
                    let height = children[point].height;
                    let background = new PIXI.Graphics();
                    background.lineStyle(0, 0x000000, 1);
                    background.beginFill(0xf8fe4a, 0.5);
                    background.drawRoundedRect(0, 0, width, height, 0);
                    background.endFill();
                    background.name = "xanhle";
                    children[point].addChild(background);

                    let current = children[point];
                    let eventdata = self.findInteractiveObjects(current);

                    if(eventdata.length > 0) {
                        background.interactive = true;
                        background.cursor = 'pointer';
                        // coppy interacive from children[point]
                        background.on('pointerdown', () => {
                            eventdata[0].emit('pointerdown');
                        });
                        background.on('pointerup', () => {
                            eventdata[0].emit('pointerup');
                        });

                    }
                }
                if(self.boxPreviewItem.children.length <= 0)
                    self.pcKey = '';
            }, this.app.ticker.deltaMS);
        }

        eventGame();
        let pointerStartTime = 0;
        let pointerEndTime = 0;

        viewport.on('pointerdown', (event) => {
            pointerStartTime = Date.now();
            this.conTro = 1;



        });

        viewport.on("pointerup", function(event) {
            pointerEndTime = Date.now();
            if(pointerEndTime - pointerStartTime < 200) {
                let x = event.data.global.x;
                let y = event.data.global.y;
                let pointMenu = hienthinoidung.toLocal(new PIXI.Point(x, y));
                pointMenu.x = Math.round(pointMenu.x);
                pointMenu.y = Math.round(pointMenu.y);
                let children = hienthinoidung.children.filter(e => e.name == 'since04KEY');
                for(let i = 0; i < children.length; i++) {
                    children[i].removeChild(children[i].getChildByName('xanhle'));
                }
                for(let i = 0; i < children.length; i++) {

                    if(children[i].x <= pointMenu.x && pointMenu.x <= children[i].x + children[i].width && children[i].y <= pointMenu.y && pointMenu.y <= children[i].y + children[i].height) {
                        point = i;
                        let width = children[i].width;
                        let height = children[i].height;
                        let background = new PIXI.Graphics();
                        background.lineStyle(0, 0x000000, 1);
                        background.beginFill(0xf8fe4a, 0.5);
                        background.drawRoundedRect(0, 0, width, height, 0);
                        background.endFill();
                        background.name = "xanhle";
                        children[i].addChild(background);
                        let current = children[i];
                        let event = self.getAllInteractiveChildren(current);
                        if(event.length > 0) {
                            background.interactive = true;
                            background.cursor = 'pointer';
                            background.on('pointerdown', () => {
                                event[0].emit('pointerdown');
                            });
                            background.on('pointerup', () => {
                                event[0].emit('pointerup');
                            });
                        }
                    }
                }

            } else {
                clearInterval(self.pcSettimeEntactive2);
                setTimeout(function() {
                    clearInterval(self.pcSettimeEntactive2);
                    eventGame();
                }, 200);
            }
        });

        /*  */
        //! foot
        background.addChild(body);

        let foot = this.boxBaseFoot(head, background);
        background.addChild(head, menu, foot);
        foot.y = this.gameHeight - foot.height;



        background.x = this.gameWidth - background.width;

    }



}
