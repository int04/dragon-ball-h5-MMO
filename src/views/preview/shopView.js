import shopAction from '../shop/shopAction.js';

export default class previewShopView extends shopAction {
    constructor() {
        super();
    }

    useBuy = (id) => {
        let shop = this.shopList.find(e => e.idvp == id);
        if(!shop) return false;

        if(shop.buy * 1 > this.my.tien[shop.type]) {
            this.notice(this._('Bạn không có đủ tiền, hãy chăm chỉ kiếm tiền nhé!'));
            return false;
        }
        this.notice(this._('Xin chờ'), 0);
        this.to(-22, id);


    }

    open_PreviewItemShop(data, action = null) {
        let heightKhung = 0;
        let itemPos = data.getBounds();
        let id = data.item;
        if(!id) return false;
        let inBag = this.item.find(e => e.id == id);
        if(!inBag) return false;
        let item = inBag.id;
        let inItem = this.findItem(item);
        let my = this.my;
        let shop = this.shopList.find(e => e.idvp == data.item);
        if(!shop) return false;
        // clear preview item
        this.boxPreviewItem.removeChildren();

        this.boxPreviewItem.visible = true;


        let boxBackground = new PIXI.Graphics();
        this.boxPreviewItem.addChild(boxBackground);

        let width = this.gameWidth * 0.4;
        let wMin = 350;
        if(width < wMin) width = wMin;
        if(width > this.gameWidth) width = this.gameWidth * 1;

        let height = this.gameHeight * 0.15;
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

        itemName.x = boxBackground.getBounds().width * 0.05;
        itemName.y = 0;
        itemName.resolution = 2;
        boxBackground.addChild(itemName);

        let yy = itemName.y;
        let heightOld = itemName.height;

        /// info vật phẩm Của hành trang 

        let maxX = itemName.x + itemName.width;
        if(inItem.type == 'trangbi') {
            let chiso = inBag.info;


            for(let t in chiso) {
                if(chiso[t] == 0) continue;
                let txt = "";
                if(this.itemTypeName[t].type == '%') {
                    txt = "" + (chiso[t] > 0 ? '+' : '-') + "" + chiso[t] + this.itemTypeName[t].name;
                } else {
                    txt = this.itemTypeName[t].name + "" + (chiso[t] > 0 ? '+' : '-') + "" + chiso[t];
                }
                let hp = new PIXI.Text(txt, {
                    fontFamily: 'Arial',
                    fontSize: 16,
                    fill: 0x00cb00
                });


                hp.x = boxBackground.getBounds().width * 0.05;
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

        if(inBag.khoa && inBag.khoa == 1) {
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
        if(listSao) {
            let num = 0;
            for(let i = 0; i < 6; i++) {
                if(listSao[i]) {
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
        useButton.name = "since04";
        useButton.lineStyle(1, 0x000000, 1);
        useButton.beginFill(0xd68f32, 1);
        useButton.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
        useButton.endFill();
        useButton.interactive = true;
        useButton.buttonMode = true;
        let self = this;
        useButton.on('pointerdown', () => {

            self.useBuy(inBag.id);
        });
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


        let useText = new PIXI.Text('Mua', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0x532905,
            fontWrap: true,
            align: 'center',
            WrapWidth: useButton.getBounds().width,
            WrapHeight: useButton.getBounds().height
        });
        useText.style.fontWeight = 'bold';
        useText.style.fontSize = itemPos.height * 0.25;
        useText.resolution = 2;
        useText.x = (useButton.getBounds().width - useText.getBounds().width) / 2;
        useText.y = (useButton.getBounds().height - useText.getBounds().height) / 2;
        useButton.addChild(useText);

        // create button close like use button

        let closeButton = new PIXI.Graphics();
        closeButton.lineStyle(1, 0x000000, 1);
        closeButton.name = "since04";
        closeButton.beginFill(0xd68f32, 1);
        closeButton.drawRoundedRect(0, 0, boxBackground.getBounds().width * 0.2, boxBackground.getBounds().width * 0.2, 10);
        closeButton.endFill();
        closeButton.x = useButton.getBounds().width + 10;

        closeButton.interactive = true;
        closeButton.cursor = 'pointer';

        closeButton.on("pointerdown", function(event) {

        });


        closeButton.on('pointerover', () => {
            closeButton.clear();
            closeButton.lineStyle(1, 0x000000, 1);
            closeButton.beginFill(0x49be62, 1);
            closeButton.drawRoundedRect(0, 0, boxBackground.getBounds().width * 0.2, boxBackground.getBounds().width * 0.2, 10);
            closeButton.endFill();
        });

        closeButton.on('pointerout', () => {
            closeButton.clear();
            closeButton.lineStyle(1, 0x000000, 1);
            closeButton.beginFill(0xd68f32, 1);
            closeButton.drawRoundedRect(0, 0, boxBackground.getBounds().width * 0.2, boxBackground.getBounds().width * 0.2, 10);
            closeButton.endFill();
        });



        let closeText = new PIXI.Text('Đóng', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0x532905,
            fontWrap: true,
            align: 'center',
            WrapWidth: useButton.getBounds().width
        });
        closeText.style.fontWeight = 'bold';
        closeText.style.fontSize = itemPos.height * 0.25;
        closeText.resolution = 2;
        closeText.x = (closeButton.getBounds().width - closeText.getBounds().width) / 2;
        closeText.y = (closeButton.getBounds().height - closeText.getBounds().height) / 2;
        closeButton.addChild(closeText);

        useContainer.addChild(useButton, closeButton);




        boxBackground.y = itemPos.y - boxBackground.getBounds().height + itemPos.height;

        if(boxBackground.y + boxBackground.getBounds().height + useContainer.getBounds().height > this.gameHeight) {
            boxBackground.y = this.gameHeight - boxBackground.getBounds().height - 10 - useContainer.getBounds().height;
        }

        if(boxBackground.y < 0) {
            boxBackground.y = 10;
        }


        useContainer.x = (boxBackground.getBounds().width - useContainer.getBounds().width) / 2;
        useContainer.y = boxBackground.getBounds().height + boxBackground.getBounds().y;


        let point = 0;
        if(this.pcKey == 'Enter') this.pcKey = '1';

        let banphimPc = setInterval(() => {
            if(this.boxPreviewItem.children.length <= 0) {
                clearInterval(banphimPc);
                return false;
            }

            let children = useContainer.children.filter(e => e.name == 'since04');
            let event = this.pcKey;

            if(event === 'ArrowLeft') {
                point -= 1;
                if(point < 0) point = children.length - 1;

            } else if(event === 'ArrowRight') {
                point += 1;
                if(point >= children.length) point = 0;
            }

            if(event === 'ArrowUp') {
                self.boxPreviewItem.removeChildren();

            } else if(event === 'ArrowDown') {
                self.boxPreviewItem.removeChildren();

            }

            if(event === 'Enter') {
                let current = children[point];
                let event = self.getAllInteractiveChildren(current);
                if(event.length > 0) {
                    event[0].emit('pointerdown');
                    event[0].emit('pointerup');
                    this.boxPreviewItem.removeChildren();
                }
            }

            if(children[point] && self.pcKey.length >= 1) {
                for(let i = 0; i < children.length; i++) {
                    children[i].removeChild(children[i].getChildByName('xanhle'));
                }

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
                let eventclick = self.getAllInteractiveChildren(current);

                if(eventclick.length > 0) {
                    background.interactive = true;
                    background.cursor = 'pointer';
                    // coppy interacive from children[point]
                    background.on('pointerdown', () => {
                        eventclick[0].emit('pointerdown');
                        this.boxPreviewItem.removeChildren();

                    });
                    background.on('pointerup', () => {
                        eventclick[0].emit('pointerup');
                        this.boxPreviewItem.removeChildren();
                    });

                }
            }


            this.pcKey = '';
        }, this.app.ticker.deltaMS);



    }



}
