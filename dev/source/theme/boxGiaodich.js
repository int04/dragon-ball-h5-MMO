import snowlyvnRuongDo from "./boxRuongDoNha.js";
export default class snowlyvnGiaoDich extends snowlyvnRuongDo {
    constructor() {
        super();
        this.giaoDichChoose = 1;
        this.giaodich = {
            khoa : 0,
            xong : 0,
            vang : 0,
            doiphuong : {
                id : 0,
                khoa : 0,
                xong : 0,
                vang :100000,
                data : [
                    {"id":"0VtDISCxcs","active":"hanhtrang","info":{"hp":0,"giap":678,"chimang":0,"sucdanh":0,"ki":0,"hutmau":0,"hoimau":0,"hoiki30s":0,"hoihp30s":0,"hoiki":0,"hutki":0,"phandon":0,"hoichieu":0,"gocgiap":0,"gochp":0,"gocki":0,"gocsucdanh":0},"item":12,"soluong":1,"khoa":0,"level":0,"sao":[-1,-1,-1,0,0,0,0],"lastTime":1686482372648,"saotrong":0},{"id":"1nGGNDWtEo","active":"hanhtrang","item":"166","soluong":2,"khoa":0,"level":0,"sao":0,"saotrong":0},

                    {"id":"VbpZGYEGYl","active":"hanhtrang","item":"164","soluong":50,"lastTime":1686481708668,"khoa":0},

                ],
            }
        };
    }

    boxBaseMenuGiaoDich = (head,name,list) => {
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
                    this.giaoDichChoose = element.onclick;
                    this.boxGiaoDichHanhTrang();
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

    giaodichDoiPhuong = (menuList) => {

        let uid = this.giaodich.doiphuong.id;
        let find = this.Charset.find(e => e.id == uid);
        if(!find) return this.notice(this._('Người chơi này không có trên bản đồ'));
        this.closeBox();
        let background = this.boxBaseBackground();
        this.box.addChild(background);
        let head = this.boxBaseHead(background);

        let avatar = this.snowlyImg(find.info.coban.avatar);
        avatar.width = head.width * 0.25;
        avatar.height = (head.height * 0.99) > avatar.width ? avatar.width : head.height * 0.99;
        avatar.x = head.width * 0.01;
        avatar.y = head.height*0.99 - avatar.height;
        head.addChild(avatar);
        let info = new PIXI.Container();
        
        let username = this.snowlyText(find.name, 16,'fontchinh', 0xFFFFFF,false,head.width,head.height);
        username.y = 0;
        info.addChild(username);
        let sucmanh = this.snowlyText("Sức mạnh: " + this.number_format(find.info.coban.sucmanh) + "", 16,'fontchinh', 0xfefe00,false,head.width,head.height);
        sucmanh.y = username.y + username.height;
        info.addChild(sucmanh);


        
        head.addChild(info);
        info.x = avatar.x + avatar.width  + avatar.width * 0.05;
        info.y =  head.height/2 - info.height/2;


        let menu = this.boxBaseMenuGiaoDich(head,this.giaoDichChoose,menuList);
        


        //! body
        let body = this.boxBaseBody(background,head,menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body,background);

        let self = this;
       

        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = this.my;

        if(this.giaoDichChoose == 999) 
        {
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
                        self.open_previewGiaoDich(listItem,{
                            layragiaodich : true,
                        });
                    } 
                });
            }
    
            let y = 0;

            /* Số vàng */

            let listItem = new PIXI.Container();
            hienthinoidung.addChild(listItem);
            listItem.maxWight = slotwidth;
            listItem.maxHeight = slotheight;
            listItem.width = listItem.maxWight;
            listItem.height = listItem.maxHeight;

            listItem.x = 0;
            listItem.y = slotheight * -1 + 0;
            y = listItem.y + listItem.height;



            let ItemBG = new PIXI.Graphics();

            ItemBG.lineStyle(1, 0xd9c8b3, 1);
            ItemBG.beginFill(0x000000, 0.5);
            ItemBG.drawRoundedRect(0, 0, listItem.maxWight, listItem.maxHeight, 0);
            ItemBG.endFill();

            let BgBolderAvatar = new PIXI.Graphics();
            BgBolderAvatar.lineStyle(1, 0xd9c8b3, 1);
            BgBolderAvatar.beginFill( 0xeeebe6, 1);
            BgBolderAvatar.drawRoundedRect(0, 0, listItem.maxWight * 1, listItem.maxHeight, 0);
            BgBolderAvatar.endFill();
            BgBolderAvatar.x = 0;
            BgBolderAvatar.y = 0;

            let txtVangDaChon = this.snowlyText(this.number_format(this.giaodich.doiphuong.vang)+ ' vàng', 16,'fontchinh', 0xfea900,false,BgBolderAvatar.width,BgBolderAvatar.height);
            txtVangDaChon.x = BgBolderAvatar.getBounds().x +  txtVangDaChon.width/2;
            txtVangDaChon.y = BgBolderAvatar.getBounds().height/2 - txtVangDaChon.height/2;
            BgBolderAvatar.addChild(txtVangDaChon);
            let t = '';
            if(this.giaodich.doiphuong.khoa == 1) t= 'Đối phương đã khóa giao dịch, dưới đây là danh sách vật phẩm của đối phương.';
            if(this.giaodich.doiphuong.xong == 1) t= 'Đối phương đã xác nhận giao dịch, bạn hãy ấn nút "xong" để giao dịch hoàn tất.';

            let dakhoa = this.snowlyText(t, 16,'fontchinh', 0xff0000,false,BgBolderAvatar.width,BgBolderAvatar.height);
            dakhoa.x = BgBolderAvatar.getBounds().width/2 - dakhoa.width/2;
            dakhoa.y = BgBolderAvatar.y - dakhoa.height;
            BgBolderAvatar.addChild(dakhoa);

            if(this.giaodich.doiphuong.khoa == 0) dakhoa.visible = false;
            if(this.giaodich.doiphuong.xong == 0) dakhoa.visible = false;
            if(this.giaodich.doiphuong.khoa == 1) dakhoa.visible = true;
            if(this.giaodich.doiphuong.xong == 1) dakhoa.visible = true;




            ItemBG.addChild(BgBolderAvatar);
            listItem.addChild(ItemBG);
    
            /* Kết thúc */
            for (let i = 0; i < this.giaodich.doiphuong.data.length; i++) {
                let listItem = new PIXI.Container();
                hienthinoidung.addChild(listItem);
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
    
    
    
                let inBag = this.giaodich.doiphuong.data[i];
                if (inBag) {
                    let inItem = this.findItem(inBag.item);
                    if (inItem) {
                        let showImgItem = new PIXI.Sprite(this.coverImg(inItem.avatar));
                        showImgItem.width = 25;
                        showImgItem.height = 25;
                        showImgItem.x = (BgBolderAvatar.width - showImgItem.width) / 2;
                        showImgItem.y = (BgBolderAvatar.height - showImgItem.height) / 2;
                        BgBolderAvatar.addChild(showImgItem);
    
                        if (inBag.soluong > 1) {
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
                listItem.item =  this.giaodich.doiphuong.data[i].id;
    
    
                clickItem(listItem)
    
    
    
    
    
            }
    
            
    
        }


        let sc = this.snowlySroll(body,hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head,background);
        background.addChild(head,menu,foot);

    }


    giaodichDoiPhuongright = () => {

        let uid = this.giaodich.doiphuong.id;
        let find = this.Charset.find(e => e.id == uid);
        if(!find) return this.notice(this._('Người chơi này không có trên bản đồ'));
        let background = this.boxBaseBackground();
        this.box.addChild(background);
        let head = this.boxBaseHead(background);

        let avatar = this.snowlyImg(find.info.coban.avatar);
        avatar.width = head.width * 0.25;
        avatar.height = (head.height * 0.99) > avatar.width ? avatar.width : head.height * 0.99;
        avatar.x = head.width * 0.01;
        avatar.y = head.height*0.99 - avatar.height;
        head.addChild(avatar);
        let info = new PIXI.Container();
        
        let username = this.snowlyText(find.name, 16,'fontchinh', 0xFFFFFF,false,head.width,head.height);
        username.y = 0;
        info.addChild(username);
        let sucmanh = this.snowlyText("Sức mạnh: " + this.number_format(find.info.coban.sucmanh) + "", 16,'fontchinh', 0xfefe00,false,head.width,head.height);
        sucmanh.y = username.y + username.height;
        info.addChild(sucmanh);


        
        head.addChild(info);
        info.x = avatar.x + avatar.width  + avatar.width * 0.05;
        info.y =  head.height/2 - info.height/2;


        let menu = this.boxBaseMenuTXT(head,'Giao dịch');
        


        //! body
        let body = this.boxBaseBody(background,head,menu);
        background.addChild(body);

        let hienthinoidung = new PIXI.Container();

        let self = this;
       

        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = this.my;

        if(this.giaoDichChoose) 
        {
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
                        self.open_previewGiaoDich(listItem,{
                            layragiaodich : true,
                            display: 'right',
                        });
                    } 
                });
            }
    
            let y = 0;

            /* Số vàng */

            let listItem = new PIXI.Container();
            hienthinoidung.addChild(listItem);
            listItem.maxWight = slotwidth;
            listItem.maxHeight = slotheight;
            listItem.width = listItem.maxWight;
            listItem.height = listItem.maxHeight;

            listItem.x = 0;
            listItem.y = slotheight * -1 + 0;
            y = listItem.y + listItem.height;



            let ItemBG = new PIXI.Graphics();

            ItemBG.lineStyle(1, 0xd9c8b3, 1);
            ItemBG.beginFill(0x000000, 0.5);
            ItemBG.drawRoundedRect(0, 0, listItem.maxWight, listItem.maxHeight, 0);
            ItemBG.endFill();

            let BgBolderAvatar = new PIXI.Graphics();
            BgBolderAvatar.lineStyle(1, 0xd9c8b3, 1);
            BgBolderAvatar.beginFill( 0xeeebe6, 1);
            BgBolderAvatar.drawRoundedRect(0, 0, listItem.maxWight * 1, listItem.maxHeight, 0);
            BgBolderAvatar.endFill();
            BgBolderAvatar.x = 0;
            BgBolderAvatar.y = 0;

            let txtVangDaChon = this.snowlyText(this.number_format(this.giaodich.doiphuong.vang)+ ' vàng', 16,'fontchinh', 0xfea900,false,BgBolderAvatar.width,BgBolderAvatar.height);
            txtVangDaChon.x = BgBolderAvatar.getBounds().x +  txtVangDaChon.width/2;
            txtVangDaChon.y = BgBolderAvatar.getBounds().height/2 - txtVangDaChon.height/2;
            BgBolderAvatar.addChild(txtVangDaChon);

            let t = '';
            if(this.giaodich.doiphuong.khoa == 1) t= 'Đối phương đã khóa giao dịch, dưới đây là danh sách vật phẩm của đối phương.';
            if(this.giaodich.doiphuong.xong == 1) t= 'Đối phương đã xác nhận giao dịch, bạn hãy ấn nút "xong" để giao dịch hoàn tất.';

            let dakhoa = this.snowlyText(t, 16,'fontchinh', 0xff0000,false,BgBolderAvatar.width,BgBolderAvatar.height);
            dakhoa.x = BgBolderAvatar.getBounds().width/2 - dakhoa.width/2;
            dakhoa.y = BgBolderAvatar.y - dakhoa.height;
            BgBolderAvatar.addChild(dakhoa);

            if(this.giaodich.doiphuong.khoa == 0) dakhoa.visible = false;
            if(this.giaodich.doiphuong.xong == 0) dakhoa.visible = false;
            if(this.giaodich.doiphuong.khoa == 1) dakhoa.visible = true;
            if(this.giaodich.doiphuong.xong == 1) dakhoa.visible = true;
            



            ItemBG.addChild(BgBolderAvatar);
            listItem.addChild(ItemBG);
    
            /* Kết thúc */
            for (let i = 0; i < this.giaodich.doiphuong.data.length; i++) {
                let listItem = new PIXI.Container();
                hienthinoidung.addChild(listItem);
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
    
    
    
                let inBag = this.giaodich.doiphuong.data[i];
                if (inBag) {
                    let inItem = this.findItem(inBag.item);
                    if (inItem) {
                        let showImgItem = new PIXI.Sprite(this.coverImg(inItem.avatar));
                        showImgItem.width = 25;
                        showImgItem.height = 25;
                        showImgItem.x = (BgBolderAvatar.width - showImgItem.width) / 2;
                        showImgItem.y = (BgBolderAvatar.height - showImgItem.height) / 2;
                        BgBolderAvatar.addChild(showImgItem);
    
                        if (inBag.soluong > 1) {
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
                listItem.item =  this.giaodich.doiphuong.data[i].id;
    
    
                clickItem(listItem)
    
    
    
    
    
            }
    
            
    
        }


        let bouns = body.height / 100 * 150;

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

        //! foot
        background.addChild(body);

        let foot = this.boxBaseFoot(head,background);
        background.addChild(head,menu,foot);
        foot.y = this.gameHeight - foot.height;


        background.x = this.gameWidth - background.width;


    }

    boxGiaoDichHanhTrang = () => {


        let menuList = [{
            name : 'Hành trang',
            onclick : 1,
        },
        {
            name : 'Đã chọn',
            onclick : 2,
        }
    ];
        menuList.push({
            name : 'Đối phương',
            onclick : 999, 
        });

        if(this.giaoDichChoose == 999) return this.giaodichDoiPhuong(menuList);

        this.closeBox();
        let background = this.boxBaseBackground();
        this.box.addChild(background);
        let head = this.boxBaseHead(background);

        let avatar = this.snowlyImg(this.my.info.coban.avatar);
        avatar.width = head.width * 0.25;
        avatar.height = (head.height * 0.99) > avatar.width ? avatar.width : head.height * 0.99;
        avatar.x = head.width * 0.01;
        avatar.y = head.height*0.99 - avatar.height;
        head.addChild(avatar);
        let info = new PIXI.Container();
        let hp = this.snowlyText("HP: " + this.my.info.chiso.hp + " / " + this.my.info.chiso.hpFull + "", 16,'fontchinh', 0xfefe00,false,head.width,head.height);
        hp.y = 0;
        info.addChild(hp);

        let ki = this.snowlyText("KI: " + this.my.info.chiso.ki + " / " + this.my.info.chiso.kiFull + "", 16,'fontchinh', 0xfefe00,false,head.width,head.height);
        ki.y = hp.y + hp.height;
        info.addChild(ki);

        let sucdanh = this.snowlyText("Sức đánh: " + this.my.info.chiso.sucdanh + "", 16,'fontchinh', 0xfefe00,false,head.width,head.height);
        sucdanh.y = ki.y + ki.height;
        info.addChild(sucdanh);

        let giap = this.snowlyText("Giáp: " + this.my.info.chiso.giap + ", Chí mạng: "+this.my.info.chiso.chimang+"%", 16,'fontchinh', 0xfefe00,false,head.width,head.height);
        giap.y = sucdanh.y + sucdanh.height;
        info.addChild(giap);
        
        head.addChild(info);
        info.x = avatar.x + avatar.width  + avatar.width * 0.05;
        info.y =  head.height/2 - info.height/2;


        let menu = this.boxBaseMenuGiaoDich(head,this.giaoDichChoose,menuList);
        


        //! body
        let body = this.boxBaseBody(background,head,menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body,background);

        let self = this;
       

        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = this.my;


        if(this.giaoDichChoose == 1)
        {
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
                        self.open_PreviewItem(listItem, {
                            giaodich : true,
                        });
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
                    let inBag = this.findBag(id);
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
    
    
            let iItem = 0;
            let dataItem = my.ruong.item.filter(item => item.active === "hanhtrang");
            dataItem.forEach(element => {
                element.lastTime = element.lastTime || Date.now();
            });
            dataItem.sort(function(a, b){return a.lastTime - b.lastTime});
            for (let i = oTrangBi; i < my.ruong.slot + oTrangBi; i++) {
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
                BgBolderAvatar.beginFill(0xb39e83, 1);
                BgBolderAvatar.drawRoundedRect(0, 0, listItem.maxWight * 0.2, listItem.maxHeight, 0);
                BgBolderAvatar.endFill();
                BgBolderAvatar.x = 0;
                BgBolderAvatar.y = 0;


                let color = 0xeeebe6;
                if (dataItem[iItem]) {
                    let inBag = dataItem[iItem];
                    {
                        if(this.danhSachItem.find(e => e.id == inBag.id))
                        {
                            color = 0x532905;
                        }
                    }
                }
    
    
    
                let BgBolderInfo = new PIXI.Graphics();
                BgBolderInfo.lineStyle(1, 0xd9c8b3, 1);
                BgBolderInfo.beginFill(color, 1);
                BgBolderInfo.drawRoundedRect(BgBolderAvatar.x + BgBolderAvatar.getBounds().width, 0, listItem.maxWight * 0.8, listItem.maxHeight, 0);
                BgBolderInfo.endFill();
    
    
    
                if (dataItem[iItem]) {
                    let inBag = dataItem[iItem];
                    if (inBag) {
                        let inItem = this.findItem(inBag.item);
                        if (inItem) {
                            let showImgItem = new PIXI.Sprite(this.coverImg(inItem.avatar));
                            showImgItem.width = 25;
                            showImgItem.height = 25;
                            showImgItem.x = (BgBolderAvatar.width - showImgItem.width) / 2;
                            showImgItem.y = (BgBolderAvatar.height - showImgItem.height) / 2;
                            BgBolderAvatar.addChild(showImgItem);
    
                            if (inBag.soluong > 1) {
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
        }
        else 
        if(this.giaoDichChoose == 2) 
        {
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
                        self.open_PreviewItem(listItem,{
                            layragiaodich : true,
                        });
                    } 
                });
            }
    
            let y = 0;

            /* Số vàng */

            let listItem = new PIXI.Container();
            hienthinoidung.addChild(listItem);
            listItem.maxWight = slotwidth;
            listItem.maxHeight = slotheight;
            listItem.width = listItem.maxWight;
            listItem.height = listItem.maxHeight;

            listItem.x = 0;
            listItem.y = slotheight * -1 + 0;
            y = listItem.y + listItem.height;



            let ItemBG = new PIXI.Graphics();

            ItemBG.lineStyle(1, 0xd9c8b3, 1);
            ItemBG.beginFill(0x000000, 0.5);
            ItemBG.drawRoundedRect(0, 0, listItem.maxWight, listItem.maxHeight, 0);
            ItemBG.endFill();

            let BgBolderAvatar = new PIXI.Graphics();
            BgBolderAvatar.lineStyle(1, 0xd9c8b3, 1);
            BgBolderAvatar.beginFill( 0xeeebe6, 1);
            BgBolderAvatar.drawRoundedRect(0, 0, listItem.maxWight * 0.8, listItem.maxHeight, 0);
            BgBolderAvatar.endFill();
            BgBolderAvatar.x = 0;
            BgBolderAvatar.y = 0;

            let txtVangDaChon = this.snowlyText(this.number_format(this.giaodich.vang)+ ' vàng', 16,'fontchinh', 0xfea900,false,BgBolderAvatar.width,BgBolderAvatar.height);
            txtVangDaChon.x = BgBolderAvatar.getBounds().x +  txtVangDaChon.width/2;
            txtVangDaChon.y = BgBolderAvatar.getBounds().height/2 - txtVangDaChon.height/2;
            BgBolderAvatar.addChild(txtVangDaChon);
            


            let BgBolderInfo = new PIXI.Graphics();
            BgBolderInfo.lineStyle(1, 0xd9c8b3, 1);
            BgBolderInfo.beginFill(0xb39e83, 1);
            BgBolderInfo.drawRoundedRect(BgBolderAvatar.x + BgBolderAvatar.getBounds().width, 0, listItem.maxWight * 0.2, listItem.maxHeight, 0);
            BgBolderInfo.endFill();
            let txt = this.snowlyText('Nhập', 16,'fontchinh', 0x005325,false,BgBolderInfo.width,BgBolderInfo.height);
            txt.x = BgBolderInfo.getBounds().x +  txt.width/2;
            txt.y = BgBolderInfo.getBounds().height/2 - txt.height/2;
            BgBolderInfo.addChild(txt);
            BgBolderInfo.interactive = true;
            BgBolderInfo.coursor = 'pointer';
            BgBolderInfo.on('pointerdown', () => {
                this.giaoDichInputValueVang();
            });

            ItemBG.addChild(BgBolderAvatar, BgBolderInfo);
            listItem.addChild(ItemBG);
    
            /* Kết thúc */
            for (let i = 0; i < this.danhSachItem.length; i++) {
                let listItem = new PIXI.Container();
                hienthinoidung.addChild(listItem);
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
                if (inBag) {
                    let inItem = this.findItem(inBag.item);
                    if (inItem) {
                        let showImgItem = new PIXI.Sprite(this.coverImg(inItem.avatar));
                        showImgItem.width = 25;
                        showImgItem.height = 25;
                        showImgItem.x = (BgBolderAvatar.width - showImgItem.width) / 2;
                        showImgItem.y = (BgBolderAvatar.height - showImgItem.height) / 2;
                        BgBolderAvatar.addChild(showImgItem);
    
                        if (inBag.soluong > 1) {
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
    
            
            let button = this.snowlyGraphics(body.width * 0.3, body.height * 0.1, 0xdf793a, 0x590c24, 2,10);
            button.y = hienthinoidung.y   + button.height + 60;

            let hide = 0;
            let txt2 = "";
            if(this.giaodich.khoa == 0) 
            {
                txt2 = "Khóa";
                hide = 1;
            }
            else 
            if(this.giaodich.khoa == 1 && this.giaodich.doiphuong.khoa == 1 && this.giaodich.xong == 0)
            {
                txt2 ="Xong";
                hide = 1;
            }
            

            let text = this.snowlyText(txt2, 16,'fontchinh', 0x532905,true,button.width,button.height);
            button.addChild(text);
            button.interactive = true;
            button.cursor = 'pointer';
    
            button.on('pointerdown', () => {
                this.submitGiaoDich();
            });
            button.visible = hide;
            hienthinoidung.addChild(button);
        }


        let sc = this.snowlySroll(body,hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head,background);
        background.addChild(head,menu,foot);

        let checkWidth = background.width*2;
        if(checkWidth <= this.gameWidth)
        {
            this.giaodichDoiPhuongright();
        }
        
    }
}