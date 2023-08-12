import preViewItemShopBoxRuong from "./previewItem.js";


export default class itemBoxRuongOpen extends preViewItemShopBoxRuong {
    constructor() {
        super();
    }

    previewItemBox = (id) => {
        let item = this.item.find(e => e.id == id);
        if(!item) return this.chipi("có lỗi xẩy ra");
        if(item.type != 'ruong') return this.chipi("có lỗi xẩy ra");

        this.closeBox();
        let background = this.boxBaseBackground();
        this.box.addChild(background);

        //! HEAD
        let head = this.boxBaseHead(background);

        let avatar = this.snowlyImg(item.avatar);
        avatar.width = head.width * 0.2;
        avatar.height = (head.height * 0.5) > avatar.width ? avatar.width : head.height * 0.5;
        avatar.x = head.width * 0.01;
        avatar.y = head.height * 0.99 - avatar.height;
        head.addChild(avatar);
        let info = new PIXI.Container();

        let nameItem = new PIXI.HTMLText(item.name, {
            fontSize: 16,
            fill: 0xf6f3ea,
            fontFamily : "Arial",
            fontWeight: '900',
        });
        info.addChild(nameItem);

        let descItem = new PIXI.HTMLText(item.mota, {
            fontSize: 14,
            fill: 0xf6f3ea,
            fontFamily : "Arial",
            fontWeight: '900',

        });
        info.addChild(descItem);
        descItem.y = nameItem.height + nameItem.height * 0.1;
        

        head.addChild(info);
        info.x = avatar.x + avatar.width + avatar.width * 0.05;
        info.y = head.height / 2 - info.height / 2;

        //! menu
        let menu = this.boxBaseMenuTXT(head, item.name);



        //! body
        let body = this.boxBaseBody(background, head, menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body, background);


        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = this.my;

        let i = 0;
        for (let idItem in item.list) 
        {
            let value = item.list[idItem];
            let item2 = this.item.find(e => e.id == idItem);
            if(item2) 
            {
                let slot = new PIXI.Graphics();
                slot.beginFill(0xd9c8b3, 1);
                slot.drawRect(0, 0, slotwidth, slotheight);
                slot.endFill();
                slot.x = 0;
                slot.y = i * slotheight + i * 2;
                hienthinoidung.addChild(slot);
                slot.name = 'item_'+i;
                slot.bienphu = i;
                slot.idItem = item2;
                slot.interactive = true;
                slot.cursor = 'pointer';
                let time = 0;
                slot.on('pointerdown', () => {
                    time = Date.now() 
                });
                slot.on('pointerup', () => {
                    if(Date.now() - time < 200) {
                        if(this.dangmoruong) {
                            this.openBoxRuong(slot.bienphu, item.id);
                            return false;
                        }
                        this.previewItemBoxRuong(slot, slot.idItem);
                    }
                });

                let _30  = new PIXI.Graphics();
                _30.beginFill(0x977b55, 1);
                _30.drawRect(0, 0, slotwidth * 0.25, slotheight);
                _30.endFill();
                _30.x = 0;
                slot.addChild(_30);

                let avatar = this.snowlyImg(item2.avatar);
                avatar.width = slotheight * 0.8;
                avatar.height = slotheight * 0.8;
                avatar.x =  _30.width / 2 - avatar.width / 2;
                avatar.y = _30.height / 2 - avatar.height / 2;
                avatar.name = "avatar_"+i;
                slot.addChild(avatar);


                let _75 = new PIXI.Graphics();
                _75.name = 'descInfo_'+i;
                _75.beginFill(0xe6ded1, 1);
                _75.drawRect(0, 0, slotwidth * 0.74, slotheight);
                _75.endFill();
                _75.x = slotwidth * 0.26;
                slot.addChild(_75);

                let name = new PIXI.HTMLText(item2.name, {
                    fontSize: 14,
                    fill: 0x1c643a,
                    fontFamily : "Arial",
                    fontWeight: '900',
                });
                name.x = _75.width * 0.01;
                name.y = _75.height * 0.01;
                name.name = "name_"+i;
                _75.addChild(name);

                let res = '';
                if(value.date == 0) res = 'Vĩnh viễn';
                else res = value.date+' ngày';
                let desc = new PIXI.HTMLText(res, {
                    fontSize: 12,
                    fill: 0x0080fe,
                    fontFamily : "Arial",
                    fontWeight: '900',
                });
                desc.x = _75.width * 0.01;
                desc.y = name.height + name.height * 0.1;
                desc.name = "desc_"+i;
                _75.addChild(desc);

                let tile = new PIXI.HTMLText(value.tile+'%', {
                    fontSize: 12,
                    fill: 0x0080fe,
                    fontFamily : "Arial",
                    fontWeight: '900',
                });
                tile.x = _75.width - tile.width - tile.width/2;
                tile.y = _75.height/2 - tile.height/2;
                tile.name = "tile_"+i;
                _75.addChild(tile);
                i++;

            }
        }


        let button = new PIXI.Graphics();
        button.name = 'ButonOpenRuong';
        button.beginFill(0x977b55, 1);
        button.drawRoundedRect(0, 0, slotwidth*0.3, slotheight, 10);
        button.endFill();
        button.x = slotwidth / 2 - button.width / 2;
        button.y = i * slotheight + i * 2 + 10;
        hienthinoidung.addChild(button);

        let text = new PIXI.HTMLText('Mở nào !', {
            fontSize: 14,
            fill: 0xf6f3ea,
            fontFamily : "Arial",
            fontWeight: '900',
        });
        text.x = button.width / 2 - text.width / 2;
        text.y = button.height / 2 - text.height / 2;
        button.addChild(text);

        button.interactive = true;
        button.cursor = 'pointer';
        let time = 0;
        button.on('pointerdown', () => {
            time = Date.now()
        });
        button.on('pointerup', () => {
            if(Date.now() - time < 200) {
                this.startOpenRuong(item.id);
            }
        });


        // end

        let sc = this.snowlySroll(body, hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head, background);
        background.addChild(head, menu, foot);

    }
}

