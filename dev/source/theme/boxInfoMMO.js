
import snowlyVNPriviewItemShop from './previewitemShop.js';

export default class snowlyvnInfoPlayerMMO extends snowlyVNPriviewItemShop {
    constructor() {
        super();
    }
    /**
     * @snowlyvn
     * @since04
     * @param {object} data
     * @param {object} data._a
     * @param {object} data._a.id
     * @param {object} data._a.name
     * @module: xem thông tin người chơi.
     */

    boxBaseMenuPlayer = (head,name,list,id) => {
        let boxCreateMenuShop = (menu,name,list) => {
            let Container = new PIXI.Container();
            list.forEach((element,i) => {
                let test = menu.width * 0.98;
                let space = 2;
                test -= space * (list.length - 1);
                let min = test * 0.2;
                let minM = test/ list.length;
                if(min > minM) min = minM;
                let button = this.snowlyGraphics(min, menu.height * 0.85, (element.onclick == name ? 0xb8e9b1 :   0xffe6c8), 0x6c4a00, 2,10)
                button.x = i * button.width + i * space;
                let text = this.snowlyText(element.name, 16,'fontchinh', 0x555555,true,button.width,button.height);
                button.addChild(text);
                this.snowlyEvent(button, () => {
                    this.viewInfoPlayer(id,element.onclick);
                });
                Container.addChild(button);
            });
            Container.y = menu.height/2 - Container.height/2;
            return Container;
        }

        let menu = this.snowlyGraphics(head.width, head.height*0.5, 0xd9c8b3, 0x8d845b, 0);
        menu.addChild(boxCreateMenuShop(menu,name,list));

        menu.x = head.width/2 - menu.width/2;
        menu.y = head.height;

        return menu;
    }

    viewInfoPlayerTrangbi = (id,listMenu) => {
        this.closeBox();
        let my = this.Charset.find(e => e.id == id);
        if(!my) return this.notice(this._('Người chơi này đã rời khỏi bản đồ'));


        let background = this.boxBaseBackground();
        this.box.addChild(background);

        //! HEAD
        let head = this.boxBaseHead(background);

        let avatar = this.snowlyImg(my.info.coban.avatar);
        avatar.width = head.width * 0.25;
        avatar.height = (head.height * 0.99) > avatar.width ? avatar.width : head.height * 0.99;
        avatar.x = head.width * 0.01;
        avatar.y = head.height*0.99 - avatar.height;
        head.addChild(avatar);
        let info = new PIXI.Container();
        let hp = this.snowlyText("HP: " + my.info.chiso.hp + " / " + my.info.chiso.hpFull + "", 16,'fontchinh', 0xfefe00,false,head.width,head.height);
        hp.y = 0;
        info.addChild(hp);

        let ki = this.snowlyText("KI: " + my.info.chiso.ki + " / " + my.info.chiso.kiFull + "", 16,'fontchinh', 0xfefe00,false,head.width,head.height);
        ki.y = hp.y + hp.height;
        info.addChild(ki);

        let sucdanh = this.snowlyText("Sức đánh: " + my.info.chiso.sucdanh + "", 16,'fontchinh', 0xfefe00,false,head.width,head.height);
        sucdanh.y = ki.y + ki.height;
        info.addChild(sucdanh);

        let giap = this.snowlyText("Giáp: " + my.info.chiso.giap + ", Chí mạng: "+my.info.chiso.chimang+"%", 16,'fontchinh', 0xfefe00,false,head.width,head.height);
        giap.y = sucdanh.y + sucdanh.height;
        info.addChild(giap);

        head.addChild(info);
        info.x = avatar.x + avatar.width  + avatar.width * 0.05;
        info.y =  head.height/2 - info.height/2;

        //! menu
        let menu = this.boxBaseMenuPlayer(head,1,listMenu,id);
        


        //! body
        let body = this.boxBaseBody(background,head,menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body,background);


        // body
        let self = this;
        let clickItem = (listItem) => {
            listItem.interactive = true;
            listItem.cursor = 'pointer';
            let pointerStartTime = 0;
            let pointerEndTime = 0;

            listItem.on("pointerdown", function (event) {
                pointerStartTime = Date.now();
            });

            listItem.on("pointerup", function (event) {
                pointerEndTime = Date.now();
                if (pointerEndTime - pointerStartTime < 300) {
                    self.playerPreviewItem(listItem,my.ruong.item);
                } 
            });
        }

        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;

        let oTrangBi = 6;

        let fewUse = ['ao', 'quan', 'gang', 'giay', 'rada', 'caitrang']; // thông tin các món trang bị
        let fewY = 0;
        for (let i = 0; i < oTrangBi; i++) {
            let listItem = new PIXI.Container();

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



            if (my.trangbi[fewUse[i]] && my.trangbi[fewUse[i]] != 0) {
                let id = my.trangbi[fewUse[i]];
                let inBag = my.ruong.item.find(e => e.id == id);
                if (inBag) {
                    let inItem = this.findItem(inBag.item);
                    if (inItem) {
                        let showImgItem = new PIXI.Sprite(this.coverImg(inItem.avatar));
                        showImgItem.width =25;
                        showImgItem.height =25;
                        showImgItem.x = (BgBolderAvatar.width - showImgItem.width) / 2;
                        showImgItem.y = (BgBolderAvatar.height - showImgItem.height) / 2;
                        BgBolderAvatar.addChild(showImgItem);

                        
                        let showInfoItem = this.snowlyText(inItem.name, 16,'fontchinh', 0x005325,false,BgBolderInfo.width,BgBolderInfo.height);
                        showInfoItem.resolution = 2;
                        showInfoItem.x = BgBolderInfo.getBounds().x + BgBolderInfo.getBounds().width * 0.04;
                        showInfoItem.height = BgBolderInfo.height * 0.38;
                        showInfoItem.y = 0 + BgBolderInfo.height * 0.1;

                        let showDesItem = this.snowlyText(inItem.mota, 14,'fontchinh', 0x0683fd,false,BgBolderInfo.width,BgBolderInfo.height);
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

        let sc = this.snowlySroll(body,hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head,background);
        background.addChild(head,menu,foot);
    }

    viewInfoPlayer = (id,chon = 0) => {
        let listMenu = [
            {name : 'Hành động',onclick : 0},
            {name : 'Thông tin',onclick : 1},
        ]
        if(chon == 1) return this.viewInfoPlayerTrangbi(id,listMenu);
        this.closeBox();
        let my = this.Charset.find(e => e.id == id);
        if(!my) return this.notice(this._('Người chơi này đã rời khỏi bản đồ'));


        let background = this.boxBaseBackground();
        this.box.addChild(background);

        //! HEAD
        let head = this.boxBaseHead(background);

        let avatar = this.snowlyImg(my.info.coban.avatar);
        avatar.width = head.width * 0.25;
        avatar.height = (head.height * 0.99) > avatar.width ? avatar.width : head.height * 0.99;
        avatar.x = head.width * 0.01;
        avatar.y = head.height*0.99 - avatar.height;
        head.addChild(avatar);
        let info = new PIXI.Container();

        let myname = this.snowlyText(my.name, 20,'fontchinh', 0xFFFFFF,false,head.width,head.height);
        info.addChild(myname);


        let suckhoe = this.snowlyText('Sức khỏe: ' + (my.info.chiso.suckhoe / my.info.chiso.suckhoe_max * 100) + '%', 16,'fontchinh', 0xFFFF00,false,head.width,head.height);
        info.addChild(suckhoe);
        suckhoe.y = myname.height;
        let danh = this.snowlyText(this.danhHieu(my.info.coban.sucmanh), 16,'fontchinh', 0xFFFF00,false,head.width,head.height);
        danh.y = suckhoe.height + myname.height;
        info.addChild(danh);
        
        let sucmanh = this.snowlyText('Sức mạnh: ' + this.number_format(my.info.coban.sucmanh), 16,'fontchinh', 0xFFFF00,false,head.width,head.height);
        sucmanh.y =  danh.y + danh.height;
        info.addChild(sucmanh);

        head.addChild(info);
        info.x = avatar.x + avatar.width  + avatar.width * 0.05;
        info.y =  head.height/2 - info.height/2;

        //! menu
        let menu = this.boxBaseMenuPlayer(head,chon,listMenu,id);
        


        //! body
        let body = this.boxBaseBody(background,head,menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body,background);


        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;

        let arrayMenu = [{
            name: 'Kết bạn',
            action: 'detu',
        }, {
            name: 'Thách đấu',
            action: 'doiKhu'
        }, 
        {
            name : 'Giao dịch',
            action : 'giaodich',
        }
    
    ];

        for (let i = 0; i < arrayMenu.length; i++) {
            let slot = new PIXI.Graphics();
            slot.lineStyle(1, 0xd9c8b3, 1);
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

            slot.on("pointerdown", function (event) {
                pointerStartTime = Date.now();
            });
            let self = this;
            slot.on("pointerup", function (event) {
                pointerEndTime = Date.now();
                if (pointerEndTime - pointerStartTime < 200) {
                    (arrayMenu[i].action == 'giaodich') && self.sendGiaodich(id);
                } else {
                }
            });


        }

        // end
     
        let sc = this.snowlySroll(body,hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head,background);
        background.addChild(head,menu,foot);
    }


    playerPreviewItem = (data,ruong) => {
        let heightKhung = 0;
        let itemPos = data.getBounds();
        let id = data.item;
        let action = {};
        if (!id) return false;
        let inBag = ruong.find(e => e.id == id);
        if (!inBag) return false;
        let item = inBag.item;
        let inItem = this.findItem(item);
        // clear preview item
        this.boxPreviewItem.removeChildren();

        this.boxPreviewItem.visible = true;

        


        let boxBackground = new PIXI.Graphics();
        this.boxPreviewItem.addChild(boxBackground);

        let width = this.gameWidth * 0.4;
        let wMin = 350;
        if(width < wMin) width = wMin;
        if(width > this.gameWidth) width = this.gameWidth*1;

        let height = this.gameHeight*0.15;
        let hMin = 85;
        if(height < hMin) height = hMin;


        boxBackground.mwidth = width;
        boxBackground.mheight = height;




        boxBackground.beginFill(0xfefefe, 1);
        boxBackground.drawRoundedRect(0, 0, boxBackground.mwidth, boxBackground.mheight, 5);
        boxBackground.endFill();

        boxBackground.x = 10;

        let AvatarItem = new PIXI.Sprite(this.coverImg(inItem.avatar));
        AvatarItem.width = 25;
        AvatarItem.height = 25;
        AvatarItem.x = boxBackground.width - AvatarItem.width - 10;
        AvatarItem.y = 0;
        boxBackground.addChild(AvatarItem);

        let itemName = new PIXI.Text(inItem.name + (inBag.level && inBag.level >= 1 ? " [+" + inBag.level + "]" : ""), {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0x532905,
            align: 'center'
        });
        itemName.style.fontWeight = 'bold';
        itemName.style.fontSize = itemPos.height * 0.4;
        itemName.height = itemName.style.fontSize;

        itemName.x = boxBackground.getBounds().width *0.05 ;
        itemName.y = 0;
        itemName.resolution = 2;
        boxBackground.addChild(itemName);

        let yy = itemName.y;
        let heightOld = itemName.height;

        /// info vật phẩm Của hành trang 

        let maxX = itemName.x + itemName.width ;
        console.log(maxX)
        if (inItem.type == 'trangbi') {
            let chiso = inBag.info;


            for (let t in chiso) {
                if (chiso[t] == 0) continue;
                let txt = "";
                if (this.itemTypeName[t].type == '%') {
                    txt = "" + (chiso[t] > 0 ? '+' : '-') + "" + chiso[t] + this.itemTypeName[t].name;
                } else {
                    txt = this.itemTypeName[t].name + "" + (chiso[t] > 0 ? '+' : '-') + "" + chiso[t];
                }
                let hp = new PIXI.Text(txt, {
                    fontFamily: 'Arial',
                    fontSize: 16,
                    fill: 0x00cb00
                });


                hp.x = boxBackground.getBounds().width *0.05 ;
                hp.style.fontWeight = 'bold';




                hp.y = yy + heightOld;
                hp.style.fontSize = itemPos.height * 0.25;
                hp.height = hp.style.fontSize;
                hp.resolution = 2;
                boxBackground.addChild(hp);
                yy = hp.y;
                heightOld = hp.height;
                heightKhung += hp.height;

            }


        }

        if (inBag.khoa && inBag.khoa == 1) {
            let txt = "Không thể giao dịch";
            let hp = new PIXI.Text(txt, {
                fontFamily: 'Arial',
                fontSize: 16,
                fill: 0x00cb00
            });
            hp.x = boxBackground.getBounds().width - hp.getBounds().width;
            hp.style.fontWeight = 'bold';
            hp.y = yy + heightOld;
            hp.style.fontSize = itemPos.height * 0.27;
            hp.height = hp.style.fontSize;
            hp.resolution = 2;
            boxBackground.addChild(hp);
            yy = hp.y;
            heightOld = hp.height;
            heightKhung += hp.height;

        }

        // create <hr> 
        let hr = new PIXI.Graphics();
        hr.lineStyle(1, 0x000000, 1);
        hr.moveTo(0, yy + heightOld + 20);
        hr.lineTo(boxBackground.mwidth * 0.8, yy + heightOld + 20);
        // hr x = center
        hr.x = (boxBackground.mwidth - hr.width) / 2;
        boxBackground.addChild(hr);



            // create desc item, item text on center of hr and word wrap hr

        let desc = new PIXI.Text(inItem.motadai, {
            fontFamily: 'Arial',
            fontSize: 14,
            fill: 0x000000,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: boxBackground.mwidth * 0.8,
        });
        desc.style.fontWeight = 'bold';
        desc.style.fontSize = itemPos.height * 0.25;
        desc.resolution = 2;
        desc.x = (boxBackground.mwidth - desc.width) / 2;
        desc.y = yy + heightOld + 20;
        boxBackground.addChild(desc);
        heightKhung += desc.height + 5;
        yy = desc.y;
        heightOld = desc.height + 5;


        let listSao = inBag.sao;
        let saoContainer = new PIXI.Container();
        if (listSao) {
            let num = 0;
            for (let i = 0; i < 7; i++) {
                if (listSao[i] && listSao[i] >= 1 || listSao[i] == -1) {
                    let sao = new PIXI.Sprite(this.coverImg(listSao[i] >= 1 ? 'saoxanh' : 'saoden'));
                    sao.width = itemPos.width * 0.1;
                    sao.height = itemPos.height * 0.4;

                    saoContainer.addChild(sao);
                    sao.x = (num % 3) * sao.width;
                    sao.y = Math.floor(num / 3) * sao.height;
                    num++;
                }

            }

            saoContainer.x = (boxBackground.mwidth - saoContainer.width) / 2;
            saoContainer.y = yy + heightOld;
            boxBackground.addChild(saoContainer);
            heightKhung += saoContainer.height + saoContainer.height / 100 * 10;

        }




        heightKhung += itemName.height + AvatarItem.height;


        boxBackground.mwidth = boxBackground.mwidth < width ? width : boxBackground.mwidth;
        heightKhung = heightKhung < height ? height : heightKhung;
        boxBackground.clear();
        boxBackground.lineStyle(1, 0x000000, 1);
        boxBackground.beginFill(0xffffff, 1);
        boxBackground.drawRoundedRect(0, 0, boxBackground.mwidth, heightKhung, 10);
        boxBackground.endFill();


        // create button use item height = 30% of boxBackground, width = 30% of boxBackground use Graphics

        let useContainer = new PIXI.Container();
        this.boxPreviewItem.addChild(useContainer);

        let useButton = new PIXI.Graphics();
        useButton.lineStyle(1, 0x000000, 1);
        useButton.beginFill(0xd68f32, 1);
        useButton.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
        useButton.endFill();
        useButton.interactive = true;
        useButton.buttonMode = true;
        let self = this;
      
        // move mouse to useButton change background
        useButton.on('pointerover', () => {
            useButton.clear();
            useButton.lineStyle(1, 0x000000, 1);
            useButton.beginFill(0x49be62, 1);
            useButton.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
            useButton.endFill();
        });
        // move mouse out of useButton change background
        useButton.on('pointerout', () => {
            useButton.clear();
            useButton.lineStyle(1, 0x000000, 1);
            useButton.beginFill(0xd68f32, 1);
            useButton.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
            useButton.endFill();
        });


        let useText = new PIXI.Text(this._('Đóng'), {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0x532905,
            fontWrap: true,
            align: 'center',
            WrapWidth: useButton.getBounds().width
        });
        useText.style.fontWeight = 'bold';
        useText.style.fontSize = itemPos.height * 0.25;
        useText.resolution = 2;
        useText.x = (useButton.getBounds().width - useText.getBounds().width) / 2;
        useText.y = (useButton.getBounds().height - useText.getBounds().height) / 2;
        useButton.addChild(useText);

        

        useContainer.addChild(useButton);


       



        if(action.display == 'right')
        {
            boxBackground.x = this.gameWidth - boxBackground.width;
        }



        boxBackground.y = itemPos.y - boxBackground.getBounds().height + itemPos.height;

        if (boxBackground.y + boxBackground.getBounds().height + useContainer.getBounds().height > this.gameHeight) {
            boxBackground.y = this.gameHeight - boxBackground.getBounds().height - 10 - useContainer.getBounds().height;
        }

        if (boxBackground.y < 0) {
            boxBackground.y = 10;
        }


        useContainer.x = boxBackground.getBounds().x + (boxBackground.getBounds().width - useContainer.getBounds().width) / 2;
        useContainer.y = boxBackground.getBounds().height + boxBackground.getBounds().y;




    }
}