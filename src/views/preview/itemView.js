import playerView from '../menu/playerView.js';
import previewSkillView from './skillView.js';
export default class previewViewItem extends previewSkillView {
    constructor() {
        super();
    }

    useItem(id) {
        let my = this.my;
        if(my.id <= 0) this.notice('Có lỗi xảy ra.');
        if(my.ruong.item.find(e => e.id == id) == undefined) return this.notice('Có lỗi xảy ra. code:1.');
        this.notice("xin chờ...", false);
        this.to(-10, id);
    }

    useItemDetu(id) {
        let my = this.my;
        if(my.id <= 0) this.notice('Có lỗi xảy ra.');
        if(my.ruong.item.find(e => e.id == id) == undefined) return this.notice('Có lỗi xảy ra. code:1.');
        this.notice("xin chờ...", false);
        this.to(-16, id);
    }

    

    open_PreviewItem(data, action = {}) {
        let heightKhung = 0;
        let itemPos = data.getBounds();
        let id = data.item;
        if(!id) return false;
        let inBag = this.findBag(id);
        if(!inBag) return false;
        let item = inBag.item;
        let inItem = this.findItem(item);
        let my = this.my;
        // clear preview item
        this.boxPreviewItem.removeChildren();

        this.boxPreviewItem.visible = true;


        this.playSound('click');


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
        console.log(maxX)
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


        if(inBag.hsd && inBag.hsd >= 1) {
            let txt = "HSD: "+this.thoigiancon(inBag.hsd);
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

        if(inBag.hsd && inBag.hsd >= 1) {
            let txt = "("+this.coverTime(inBag.hsd)+")";
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
            for(let i = 0; i < 7; i++) {
                if(listSao[i] && listSao[i] >= 1 || listSao[i] == -1) {
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


        let vut = 0;
        if(action.sell == true) {
            vut = 1;
        }

        let chon = 0;
        if(action.nangcap) {
            chon = 1;
        }

        let layra = 0;
        if(action.layra) {
            layra = 1;
        }
        let layragiaodich = 0;
        if(action.layragiaodich) layragiaodich = 1;

        let giaodich = 0;
        if(action.giaodich) giaodich = 1;


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
            if(inBag.active == 'hanhtrang' && inItem.type == 'ruong') {
                return this.previewItemBox(inItem.id);
            }
            if(inBag.active == 'ruong') return this.ruongBoRa(inBag.id);
            if(layragiaodich == 1 || giaodich == 1) return this.notice(this._('Không thể thực hiện khi đang giao dịch'));
            if(inBag.active == 'detu') self.useItemDetu(inBag.id);
            else
                self.useItem(inBag.id);
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


        let useText = new PIXI.Text((inBag.active == 'ruong' ? 'Lấy ra' : inBag.active == 'hanhtrang' ? 'Sử dụng' : 'Tháo ra'), {
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

        // create button close like use button

        let catvao = 0;
        if(action.catvao) catvao = 1;

        let bora = 0;
        if(action.bora) bora = 1;


        let closeButton = new PIXI.Graphics();
        closeButton.lineStyle(1, 0x000000, 1);
        closeButton.name = "since04";
        closeButton.beginFill(0xd68f32, 1);
        closeButton.drawRoundedRect(0, 0, boxBackground.getBounds().width * 0.2, boxBackground.getBounds().width * 0.2, 10);
        closeButton.endFill();
        closeButton.x = useButton.getBounds().width + 10;

        closeButton.interactive = true;
        closeButton.cursor = 'pointer';

        let pointerStartTimeDung = 0;
        let pointerEndTimeDung = 0;
        closeButton.on("pointerdown", function(event) {
            if(catvao == 1) self.ruongCatVao(inBag.id);
            else if(bora == 1) self.ruongBoRa(inBag.id);
            else
            if(layragiaodich == 1) self.chonGiaoDichRemove(inBag.id);
            else
            if(giaodich == 1) self.chonGiaoDich(inBag.id);
            else
            if(layra == 1) self.RemoveChonNangCap(inBag.id);
            else
            if(chon == 1)
                self.ChooseInNangCap(inBag);
            else
            if(vut == 1)
                self.comfirmSell(inBag.id);
            else
                self.comfirmVutItem(inBag.id);

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




        let closeText = new PIXI.Text(bora == 1 ? 'Lấy ra' : catvao == 1 ? 'Cất vào' : layragiaodich == 1 ? 'Bỏ ra' : giaodich == 1 ? 'Chọn' : layra == 1 ? 'Lấy ra' : chon == 1 ? 'Chọn' : vut == 0 ? 'Vứt' : 'Bán', {
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


        if(inItem.type == 'trangbi' && inBag.active == 'hanhtrang' && my.detu && my.detu.id) {
            let useButtonDetu = new PIXI.Graphics();
            useButtonDetu.name = 'since04';
            useButtonDetu.lineStyle(1, 0x000000, 1);
            useButtonDetu.beginFill(0xd68f32, 1);
            useButtonDetu.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
            useButtonDetu.endFill();
            useButtonDetu.interactive = true;
            useButtonDetu.buttonMode = true;
            let self = this;
            useButtonDetu.on('pointerdown', () => {
                if(layragiaodich == 1 || giaodich == 1) return this.notice(this._('Không thể thực hiện khi đang giao dịch'));
                self.useItemDetu(inBag.id);
            });
            // move mouse to useButton change background
            useButtonDetu.on('pointerover', () => {
                useButtonDetu.clear();
                useButtonDetu.lineStyle(1, 0x000000, 1);
                useButtonDetu.beginFill(0x49be62, 1);
                useButtonDetu.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
                useButtonDetu.endFill();
            });
            // move mouse out of useButton change background
            useButtonDetu.on('pointerout', () => {
                useButtonDetu.clear();
                useButtonDetu.lineStyle(1, 0x000000, 1);
                useButtonDetu.beginFill(0xd68f32, 1);
                useButtonDetu.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
                useButtonDetu.endFill();
            });


            let useTextDetu = new PIXI.Text('Đệ tử', {
                fontFamily: 'Arial',
                fontSize: 16,
                fill: 0x532905,
                fontWrap: true,
                align: 'center',
                WrapWidth: useButtonDetu.getBounds().width,
                WrapHeight: useButtonDetu.getBounds().height
            });
            useTextDetu.name = "since04";
            useTextDetu.style.fontWeight = 'bold';
            useTextDetu.style.fontSize = itemPos.height * 0.25;
            useTextDetu.resolution = 2;
            useTextDetu.x = (useButtonDetu.getBounds().width - useTextDetu.getBounds().width) / 2;
            useTextDetu.y = (useButtonDetu.getBounds().height - useTextDetu.getBounds().height) / 2;
            useButtonDetu.addChild(useTextDetu);

            useContainer.addChild(useButtonDetu);
            useButtonDetu.x = closeButton.getBounds().x + closeButton.getBounds().width + 10;
            useButtonDetu.y = 0;
        }




        if(action.display == 'right') {
            boxBackground.x = this.gameWidth - boxBackground.width;
        }



        boxBackground.y = itemPos.y - boxBackground.getBounds().height + itemPos.height;

        if(boxBackground.y + boxBackground.getBounds().height + useContainer.getBounds().height > this.gameHeight) {
            boxBackground.y = this.gameHeight - boxBackground.getBounds().height - 10 - useContainer.getBounds().height;
        }

        if(boxBackground.y < 0) {
            boxBackground.y = 10;
        }


        useContainer.x = boxBackground.getBounds().x + (boxBackground.getBounds().width - useContainer.getBounds().width) / 2;
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


