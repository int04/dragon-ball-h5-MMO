import profileView from "./profileView.js";

export default class coPKView extends profileView {
    constructor() {
        super();
    }

    actionDoiCo = (idco) => {
        if(idco < 0 || idco > 9) return false;
        this.await();
        this.to('flags',idco)
    }

    coPKView = () => {
        let my = this.my;
        if(my.id <= 0) return false;
        this.closeBox();
        let background = this.boxBaseBackground();
        this.box.addChild(background);

        //! HEAD
        let head = this.boxBaseHead(background);

        let avatar = this.snowlyImg(561);
        avatar.width = head.width * 0.25;
        avatar.height = (head.height * 0.99) > avatar.width ? avatar.width : head.height * 0.99;
        avatar.x = head.width * 0.01;
        avatar.y = head.height * 0.99 - avatar.height;
        let txtAvatar = this.snowlyText(my.pos.zone, 16, 'Arial', 0xFFFFFF, false, avatar.width, avatar.height);
        head.addChild(avatar, txtAvatar);
        txtAvatar.x = avatar.width / 2 - txtAvatar.width / 2;
        txtAvatar.y = avatar.y + avatar.height / 2 - txtAvatar.height / 2;
        let info = new PIXI.Container();
        let name = '';
        let findMap = this.listMap.find(e => e.id == my.pos.map);
        name = findMap ? findMap.name : '';

        let khuZone = this.snowlyText('Khu vực ' + my.pos.zone + ' ', 16, 'Arial', 0xFFFFFF, false, head.width, head.height);
        let khuMap = this.snowlyText(name, 16, 'Arial', 0xfefe00, false, head.width, head.height);
        khuMap.y = khuZone.height;
        info.addChild(khuZone, khuMap);
        head.addChild(info);
        info.x = avatar.x + avatar.width + avatar.width * 0.05;
        info.y = head.height / 2 - info.height / 2;

        //! menu
        let menu = this.boxBaseMenuTXT(head, 'Đổi cờ');



        //! body
        let body = this.boxBaseBody(background, head, menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body, background);


        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;

        
        let co = {
            0 : {name : 'Tháo cờ', desc : '',img : '2761'},
            1 : {name : 'Cờ đỏ', 'desc' : 'Tăng 5% exp khi đánh quái', img : '2323'},
            2 : {name : 'Cờ xanh lá cây', 'desc' : 'Tăng 5% exp khi đánh quái', img : '2324'},
            3 : {name : 'Cờ xanh da trời', 'desc' : 'Tăng 5% exp khi đánh quái', img : '2325'},
            4 : {name : 'Cờ vàng', 'desc' : 'Tăng 5% exp khi đánh quái', img : '2326'},
            5 : {name : 'Cờ tìm', 'desc' : 'Tăng 5% exp khi đánh quái', img : '2327'},
            6 : {name : 'Cờ cam', 'desc' : 'Tăng 5% exp khi đánh quái', img : '2328'},
            7 : {name : 'Cờ hông', 'desc' : 'Tăng 5% exp khi đánh quái', img : '2329'},
            8 : {name : 'Cờ xanh dương', 'desc' : 'Tăng 5% exp khi đánh quái', img : '2330'},
            9 : {name : 'Cờ đen', 'desc' : 'Tăng 10% exp khi đánh quái', img : '2331'},
        };

        let i = 0;
        for(let value in co) {
            let data = co[value];
            let background = new PIXI.Graphics();
            background.interactive = true;
            background.cursor = 'pointer';
            let time = 0;
            background.on('pointerdown', () => {
                time = Date.now();
            });
            background.on('pointerup', () => {
                if(Date.now() - time <= 150) {
                    this.previewCoPK(background,value);
                }
            });
            background.beginFill(0xd9c8b3, 1);
            background.drawRect(0, 0, slotwidth, slotheight);
            background.endFill();
            background.x = 0;
            background.y = i * slotheight + i * 3;
            hienthinoidung.addChild(background);
            background.name = 'since04KEY';
            i++;
            let _15 = new PIXI.Graphics();
            _15.beginFill(0x977b55, 1);
            _15.drawRect(0, 0, slotwidth * 0.15, 0.99 * slotheight);
            _15.endFill();
            _15.x = 0;
            background.addChild(_15);

            let _avatar = this.snowlyImg(data.img);
            _avatar.width = _15.width * 0.4;
            _avatar.height = _15.height * 0.4;
            _avatar.x = _15.width / 2 - _avatar.width / 2;
            _avatar.y = _15.height / 2 - _avatar.height / 2;
            _15.addChild(_avatar);

            let _85 = new PIXI.Graphics();
            _85.beginFill(0xe6ded1, 1);
            _85.drawRect(0, 0, slotwidth * 0.84, 0.99 * slotheight);
            _85.endFill();
            _85.x = slotwidth * 0.16;
            background.addChild(_85);

            let _desc = new PIXI.Container();
            let _name = new PIXI.Text(data.name, {
                fontSize: 16,
                fill: 0x276a42,
                fontFamily : "Arial",
                fontWeight: 'bold',
            });
            _desc.addChild(_name);

            let desc = new PIXI.Text(data.desc, {
                fontSize: 14,
                fill: 0x0080fe,
                fontFamily : "Arial",
                fontWeight: 'bold',

            });
            _desc.addChild(desc);
            desc.y = _name.height + _name.height * 0.1;
            _85.addChild(_desc);
            _desc.x = 0;
            _desc.y = _85.height / 2 - _desc.height / 2;


        }
        


        // end

        let sc = this.snowlySroll(body, hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head, background);
        background.addChild(head, menu, foot);
    }


    previewCoPK = (data,idco) => {
        let heightKhung = 0;
        let itemPos = data.getBounds();

        
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


        /* Điền dữ liệu ở đây */




        /* Kết thúc */

    

        boxBackground.mwidth = boxBackground.mwidth < width ? width : boxBackground.mwidth;
        heightKhung = heightKhung < height ? height : heightKhung;
        boxBackground.clear();
        boxBackground.lineStyle(1, 0x000000, 1);
        boxBackground.beginFill(0xffffff, 1);
        boxBackground.drawRoundedRect(0, 0, boxBackground.mwidth, heightKhung, 10);
        boxBackground.endFill();

        boxBackground.visible = false;

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
            this.actionDoiCo(idco);

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


        let useText = new PIXI.Text('Đổi cờ', {
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


        let closeButton = new PIXI.Graphics();
        closeButton.name = "since04";
        closeButton.lineStyle(1, 0x000000, 1);
        closeButton.beginFill(0xd68f32, 1);
        closeButton.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
        closeButton.endFill();
        closeButton.x = useButton.getBounds().width + 10;
        closeButton.interactive = true;
        closeButton.cursor = 'pointer';
        closeButton.on('pointerdown', () => {
           
            this.boxPreviewItem.removeChildren();
        });
        // move mouse to useButton change background
        closeButton.on('pointerover', () => {
            closeButton.clear();
            closeButton.lineStyle(1, 0x000000, 1);
            closeButton.beginFill(0x49be62, 1);
            closeButton.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
            closeButton.endFill();
        });

        // move mouse out of useButton change background
        closeButton.on('pointerout', () => {
            closeButton.clear();
            closeButton.lineStyle(1, 0x000000, 1);
            closeButton.beginFill(0xd68f32, 1);
            closeButton.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
            closeButton.endFill();
        });

        let closeText = new PIXI.Text('Đóng', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0x532905,
            fontWrap: true,
            align: 'center',
            WrapWidth: closeButton.getBounds().width,
            WrapHeight: closeButton.getBounds().height
        });

        closeText.style.fontWeight = 'bold';
        closeText.style.fontSize = itemPos.height * 0.25;
        closeText.resolution = 2;
        closeText.x = (closeButton.getBounds().width - closeText.getBounds().width) / 2;
        closeText.y = (closeButton.getBounds().height - closeText.getBounds().height) / 2;
        closeButton.addChild(closeText);

        useContainer.addChild(closeButton);
      

        useContainer.addChild(useButton);




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