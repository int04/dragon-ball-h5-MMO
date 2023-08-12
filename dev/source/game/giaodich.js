import snowlyvnPrviewItem from "../theme/previewitem.js";

export default class snowlyvnGiaoDichaction extends snowlyvnPrviewItem {
    constructor() {
        super();
        this.timeCheckGiaoDich = 0;
    }

    cancelGiaoDich = () => {
        this.to(-25, {
            _1 : 6,
        })
    }

    statusGiaoDich = () => {
        if(this.my.id <=0) return false;
        if(this.timeCheckGiaoDich > Date.now()) return true;
        this.timeCheckGiaoDich = Date.now() + 1000;
        if(this.giaodich.doiphuong.id >=1 && this.giaodich.xong !=1) 
        {
            this.to(-25, {
                _1 : 9,
            })
        }
    } 
    sendGiaodich = (id) => {
        let my = this.Charset.find(e => e.id == id);
        if(!my) return this.notice(this._('Người chơi này không có trên bản đồ'));
        this.to(-25,{
            _1 : 1,
            _2 : id,
        })
        this.closeBox();
    }

    giaodichHuyChapNhan = () => {
        this.to(-25,{
            _1 : 2,
        })
    };

    submitChapNhanLoiMoi = () => {
        this.to(-25,{
            _1 : 3,
        })
    }

    duocmoiGiaoDich = (id) => {
        let my = this.Charset.find(e => e.id == id);
        if(!my) return;

        this.boxError.removeChildren();
        this.boxError.visible = true;
    
        this.boxError.interactive = true;
    
        let bgW = this.gameWidth * 0.6;
        let bgh = this.gameHeight * 0.3;
        let bg = new PIXI.Graphics();
        bg.beginFill(0xefe5c2, 1);
        bg.lineStyle(3, 0x8d845b, 1);
    
        bg.drawRoundedRect(0, 0, bgW, bgh,10);
        bg.endFill();
        bg.x = 0;
        bg.y = 0;
        this.boxError.addChild(bg);
        let text = new PIXI.Text(my.name+this._(' gửi cho bạn một mời bạn giao dịch, bạn có đồng ý không ?'), {
            fontSize: 16,
            fill: 0x532905,
            fontFamily: 'chelthm',
            fontWeight: 'bold',
            align: "center",
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: bgW - 20
        });
        text.x = bgW / 2 - text.width / 2;
        
        /// text.y is center of bg
        text.y = bgh / 2 - text.height / 2;
    
    
        this.boxError.addChild(text);


        let bigbtn = new PIXI.Graphics();
    
        let btn = new PIXI.Graphics();
        btn.beginFill(0xe27c3a, 1);
        btn.lineStyle(3, 0x6b1d28, 1);
        
        btn.drawRoundedRect(0, 0, 100, 30,10);
        btn.endFill();
        btn.x = 0;
        btn.y = 0 ;
        let btnText = new PIXI.Text(this._('OK'), {
            fontSize: 16,
            fill: 0x532905,
            fontFamily: 'chelthm',
            fontWeight: 'bold',
            align: "center",
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: bgW - 20
        });
        btnText.x = btn.width / 2 - btnText.width / 2;
        btnText.y = btn.height / 2 - btnText.height / 2;
        btn.addChild(btnText);
        btn.interactive = true;
        btn.buttonMode = true;
        btn.on('pointerdown', () => {
            this.boxError.removeChildren();

            this.submitChapNhanLoiMoi();
        });


         let btn2 = new PIXI.Graphics();
         btn2.beginFill(0xe27c3a, 1);
         btn2.lineStyle(3, 0x6b1d28, 1);
        
         btn2.drawRoundedRect(0, 0, 100, 30,10);
         btn2.endFill();
         btn2.x =  btn.width +10 ;
         btn2.y = 0 ;
        let btnText2 = new PIXI.Text(this._('Hủy'), {
            fontSize: 16,
            fill: 0x532905,
            fontFamily: 'chelthm',
            fontWeight: 'bold',
            align: "center",
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: bgW - 20
        });
        btnText2.x = btn2.width / 2 - btnText2.width / 2;
        btnText2.y = btn2.height / 2 - btnText2.height / 2;
        btn2.addChild(btnText2);
        btn2.interactive = true;
        btn2.buttonMode = true;
        btn2.on('pointerdown', () => {
            this.boxError.removeChildren();
            this.giaodichHuyChapNhan();
        });
        

        bigbtn.addChild(btn,btn2);
        bigbtn.x = bgW / 2 - bigbtn.width / 2;
        bigbtn.y = bgh - bigbtn.height/2 ;


        this.boxError.addChild(bigbtn);
    
    
    
    
    
        this.boxError.x = this.gameWidth / 2 - bgW / 2;
        this.boxError.y = this.gameHeight *0.5;
        
    

    }


    submitGiaoDich = () => {
        if(this.giaodich.khoa == 0) 
        {
            /**người dùng khóa vật phẩm lại */
            
            // send to server
            this.to(-25,{
                _1 : 4,
                _2 : this.giaodich.vang,
                _3 : this.danhSachItem,
            })
            this.notice(this._('Xin chờ...'),false);
        }
        else
        if(this.giaodich.khoa == 1 && this.giaodich.doiphuong.khoa == 1)
        {
            /**cả 2 người cùng khóa, và người dùng bấm xong */
            this.giaodich.xong = 1;
            // send to server
            // close giao dich
            this.to(-25,{
                _1 : 5,
            })
            this.notice(this._('Xin chờ...'),false);
        }
        else 
        {
            this.notice(this._('Vui lòng chờ đối phương khóa giao dịch.'));
        }
    }
    chonGiaoDich = (id) => {
        if(this.giaodich.khoa == 1) return this.notice(this._('Đã khóa giao dịch, không thể thay đổi.'));
        if(this.giaodich.xong == 1) return this.notice(this._('Xin vui lòng chờ đối phương đồng ý.'));
        if(this.danhSachItem.find(e=> e.id ==id)) return this.notice(this._('Đã có vật phẩm này'));
        let data = this.my.ruong.item.find(e => e.id == id);
        if(!data) return;
        let infoItem = this.item.find(e => e.id == data.item);
        if(!infoItem) return;
        if(data.active != 'hanhtrang') return this.notice(this._('Vui lòng tháo vật phẩm ra trước'));
        if(infoItem.type == 'trangbi') {
            this.danhSachItem.push(data);
            return this.boxGiaoDichHanhTrang();
        }
        else 
        {
            if(infoItem.khoa >=1) return this.notice(this._('Vật phẩm này không thể giao dịch'));
            if(infoItem.giaodich && infoItem.giaodich == 1) return this.notice(this._('Vật phẩm này không thể giao dịch'));
            return this.giaoDichInputValue(id);
        }
    }

    chonGiaoDichRemove = (id) => {
        if(this.giaodich.khoa == 1) return this.notice(this._('Đã khóa giao dịch, không thể thay đổi.'));
        if(this.giaodich.xong == 1) return this.notice(this._('Xin vui lòng chờ đối phương đồng ý.'));
        this.danhSachItem = this.danhSachItem.filter(e => e.id != id);
        this.boxGiaoDichHanhTrang();
    }

    giaoDichSubmitSoluong = (id, soluong) => {
        if(this.giaodich.khoa == 1) return this.notice(this._('Đã khóa giao dịch, không thể thay đổi.'));
        if(this.giaodich.xong == 1) return this.notice(this._('Xin vui lòng chờ đối phương đồng ý.'));
        if(!soluong || soluong <= 0) return this.notice(this._('Số lượng không hợp lệ'));
        let data = this.my.ruong.item.find(e => e.id == id);
        if(!data) return;
        let infoItem = this.item.find(e => e.id == data.item);
        if(!infoItem) return;
        if(infoItem.type == 'trangbi') return this.notice(this._('Vật phẩm này không thể giao dịch'));
        if(soluong > data.soluong) return this.notice(this._('Số lượng nhập nhiều hơn số lượng có trong hành trang'));

        if(this.danhSachItem.find(e=> e.id ==id)) {
            let index = this.danhSachItem.findIndex(e => e.id == id);
            this.danhSachItem[index].soluong = soluong;
        }
        else 
        {
            // create new object from data
            let newObject = Object.assign({}, data);
            newObject.soluong = soluong;
            this.danhSachItem.push(newObject);
            this.boxGiaoDichHanhTrang();
        }

    }

    giaoDichSubmitSoluongVang = (soluong) => {
        if(this.giaodich.khoa == 1) return this.notice(this._('Đã khóa giao dịch, không thể thay đổi.'));
        if(this.giaodich.xong == 1) return this.notice(this._('Xin vui lòng chờ đối phương đồng ý.'));
        if(!soluong || soluong <= 0) return this.notice(this._('Vàng nhập không hợp lệ'));
        if(soluong > this.my.tien.vang) return this.notice(this._('Bạn không có đủ vàng để giao dịch'));
        if(soluong > 500000000) return this.notice(this._('Giao dịch tối đa 500.000.000 vàng'));
        this.giaodich.vang = soluong;
        this.boxGiaoDichHanhTrang();
    }

    giaoDichInputValueVang = () => {
        this.bodyChat.visible = true;
        this.bodyChat.removeChildren();

        let bgW = this.gameWidth * 0.9;
        let bgh = this.gameHeight * 0.5;

        bgW = bgW > 500 ? 500 : bgW;
        bgh = bgh > 150 ? 150 : bgh;
    
        let bg = new PIXI.Graphics();
        bg.beginFill(0xfee4c6, 1);
        bg.lineStyle(3, 0x6c4a00, 1);
    
        bg.drawRoundedRect(0, 0, bgW, bgh,10);
        bg.endFill();
        bg.x = 0;
        bg.y = 0;
        this.bodyChat.addChild(bg);
    
        let displayChat = new PIXI.Text('Nhập vàng muốn giao dịch:', {
            fontSize: 20,
            fill: 0x005325,
            fontFamily: 'chelthm',
            fontWeight: 'bold',
            align: "center",
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: bgW - 20
        });
        displayChat.x = 10;
        displayChat.y = bg.height * 0.3 - displayChat.height ;
        bg.addChild(displayChat);

    
        let inputChat = new PIXI.TextInput({
            input: {
                fontSize: '9px',
                padding: '12px',
                color: '#7a1125'
            },
            box: {
                default: {fill: 0xeec385, rounded: 10, stroke: {color: 0xfff6eb, width: 1}},
                focused: {fill: 0xa7f2ac, rounded: 10, stroke: {color: 0xfff6eb, width: 1}},
                disabled: {fill: 0xDBDBDB, rounded: 12}
            }
        })
        inputChat.width = bgW * 0.9;
        inputChat.height = bgh * 0.4;
        inputChat.x = (bgW - (bgW * 0.9)) / 2;
        inputChat.y = bg.height * 0.7 - inputChat.height / 2;
        bg.addChild(inputChat);
    
        setTimeout(() => {
            inputChat.focus();
            
        }, 100);
    
        //inputChat is number
        inputChat.restrict = '0123456789';
        inputChat.htmlInput.setAttribute('type', 'number')
       
    
        let ContainerButton = new PIXI.Container();
        // create button OK and cancel on
        let btnOK = new PIXI.Graphics();
        btnOK.beginFill(0xe57e3b, 1);
        btnOK.lineStyle(3, 0x6a1b26, 1);
        btnOK.drawRoundedRect(0, 0, bgW * 0.2, bgh * 0.3, 10);
        btnOK.endFill();
        btnOK.x = 0;
        btnOK.y = 0;
        ContainerButton.addChild(btnOK);
    
        let btnOKText = new PIXI.Text('OK', {
            fontSize: 20,
            fill: 0x532905,
            fontFamily: 'chelthm',
            fontWeight: 'bold',
            align: "center",
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: bgW - 20
        });
        btnOKText.x = btnOK.width / 2 - btnOKText.width / 2;
        btnOKText.y = btnOK.height / 2 - btnOKText.height / 2;
        btnOK.addChild(btnOKText);
    
        btnOK.interactive = true;
        btnOK.buttonMode = true;
        btnOK.on('pointerdown', () => {
            this.giaoDichSubmitSoluongVang(inputChat.text)
            // delete focus inputChat
            inputChat.blur();
            inputChat.text = '';
            this.bodyChat.visible = false;
            this.bodyChat.removeChildren();
        });
    
      
    
    
        let btnCancel = new PIXI.Graphics();
        btnCancel.beginFill(0xe57e3b, 1);
    
        btnCancel.lineStyle(3, 0x6a1b26, 1);
        btnCancel.drawRoundedRect(0, 0, bgW * 0.2, bgh * 0.3, 10);
        btnCancel.endFill();
        btnCancel.x = btnOKText.x + btnOKText.width +  btnCancel.width /2 ;
        btnCancel.y = 0;
        ContainerButton.addChild(btnCancel);
    
        let btnCancelText = new PIXI.Text('Đóng', {
            fontSize: 20,
            fill: 0x532905,
            fontFamily: 'chelthm',
            fontWeight: 'bold',
            align: "center",
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: bgW - 20
        });
        btnCancelText.x = btnCancel.width / 2 - btnCancelText.width / 2;
        btnCancelText.y = btnCancel.height / 2 - btnCancelText.height / 2;
        btnCancel.addChild(btnCancelText);
    
        btnCancel.interactive = true;
        btnCancel.buttonMode = true;
        btnCancel.on('pointerdown', () => {
            this.bodyChat.visible = false;
            this.bodyChat.removeChildren();
        });
    
        bg.addChild(ContainerButton);
    
        // ContainerButton is center of bg
        ContainerButton.x = bgW / 2 - ContainerButton.width / 2;
        ContainerButton.y = bg.height * 0.95;
    
        this.bodyChat.x = this.gameWidth / 2 - this.bodyChat.width / 2;
        // body chat is 70% of this.gameHeight
        this.bodyChat.y = this.gameHeight*0.9 - this.bodyChat.height;
    
    }

    giaoDichInputValue = (id) => {
        this.bodyChat.visible = true;
        this.bodyChat.removeChildren();

        let bgW = this.gameWidth * 0.9;
        let bgh = this.gameHeight * 0.5;

        bgW = bgW > 500 ? 500 : bgW;
        bgh = bgh > 150 ? 150 : bgh;
    
        let bg = new PIXI.Graphics();
        bg.beginFill(0xfee4c6, 1);
        bg.lineStyle(3, 0x6c4a00, 1);
    
        bg.drawRoundedRect(0, 0, bgW, bgh,10);
        bg.endFill();
        bg.x = 0;
        bg.y = 0;
        this.bodyChat.addChild(bg);
    
        let displayChat = new PIXI.Text('Nhập số lượng:', {
            fontSize: 20,
            fill: 0x005325,
            fontFamily: 'chelthm',
            fontWeight: 'bold',
            align: "center",
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: bgW - 20
        });
        displayChat.x = 10;
        displayChat.y = bg.height * 0.3 - displayChat.height ;
        bg.addChild(displayChat);

    
        let inputChat = new PIXI.TextInput({
            input: {
                fontSize: '9px',
                padding: '12px',
                color: '#7a1125'
            },
            box: {
                default: {fill: 0xeec385, rounded: 10, stroke: {color: 0xfff6eb, width: 1}},
                focused: {fill: 0xa7f2ac, rounded: 10, stroke: {color: 0xfff6eb, width: 1}},
                disabled: {fill: 0xDBDBDB, rounded: 12}
            }
        })
        inputChat.width = bgW * 0.9;
        inputChat.height = bgh * 0.4;
        inputChat.x = (bgW - (bgW * 0.9)) / 2;
        inputChat.y = bg.height * 0.7 - inputChat.height / 2;
        bg.addChild(inputChat);
    
        setTimeout(() => {
            inputChat.focus();
            
        }, 100);
    
        //inputChat is number
        inputChat.restrict = '0123456789';
        inputChat.htmlInput.setAttribute('type', 'number')
       
    
        let ContainerButton = new PIXI.Container();
        // create button OK and cancel on
        let btnOK = new PIXI.Graphics();
        btnOK.beginFill(0xe57e3b, 1);
        btnOK.lineStyle(3, 0x6a1b26, 1);
        btnOK.drawRoundedRect(0, 0, bgW * 0.2, bgh * 0.3, 10);
        btnOK.endFill();
        btnOK.x = 0;
        btnOK.y = 0;
        ContainerButton.addChild(btnOK);
    
        let btnOKText = new PIXI.Text('OK', {
            fontSize: 20,
            fill: 0x532905,
            fontFamily: 'chelthm',
            fontWeight: 'bold',
            align: "center",
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: bgW - 20
        });
        btnOKText.x = btnOK.width / 2 - btnOKText.width / 2;
        btnOKText.y = btnOK.height / 2 - btnOKText.height / 2;
        btnOK.addChild(btnOKText);
    
        btnOK.interactive = true;
        btnOK.buttonMode = true;
        btnOK.on('pointerdown', () => {
            this.giaoDichSubmitSoluong(id,inputChat.text)
            // delete focus inputChat
            inputChat.blur();
            inputChat.text = '';
            this.bodyChat.visible = false;
            this.bodyChat.removeChildren();
        });
    
        // add window keydown event
        
    
    
        let btnCancel = new PIXI.Graphics();
        btnCancel.beginFill(0xe57e3b, 1);
    
        btnCancel.lineStyle(3, 0x6a1b26, 1);
        btnCancel.drawRoundedRect(0, 0, bgW * 0.2, bgh * 0.3, 10);
        btnCancel.endFill();
        btnCancel.x = btnOKText.x + btnOKText.width +  btnCancel.width /2 ;
        btnCancel.y = 0;
        ContainerButton.addChild(btnCancel);
    
        let btnCancelText = new PIXI.Text('Đóng', {
            fontSize: 20,
            fill: 0x532905,
            fontFamily: 'chelthm',
            fontWeight: 'bold',
            align: "center",
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: bgW - 20
        });
        btnCancelText.x = btnCancel.width / 2 - btnCancelText.width / 2;
        btnCancelText.y = btnCancel.height / 2 - btnCancelText.height / 2;
        btnCancel.addChild(btnCancelText);
    
        btnCancel.interactive = true;
        btnCancel.buttonMode = true;
        btnCancel.on('pointerdown', () => {
            this.bodyChat.visible = false;
            this.bodyChat.removeChildren();
        });
    
        bg.addChild(ContainerButton);
    
        // ContainerButton is center of bg
        ContainerButton.x = bgW / 2 - ContainerButton.width / 2;
        ContainerButton.y = bg.height * 0.95;
    
        this.bodyChat.x = this.gameWidth / 2 - this.bodyChat.width / 2;
        // body chat is 70% of this.gameHeight
        this.bodyChat.y = this.gameHeight*0.9 - this.bodyChat.height;
    }


    open_previewGiaoDich(data, action = {}) {
        let heightKhung = 0;
        let itemPos = data.getBounds();
        let id = data.item;
        if (!id) return false;
        let inBag = this.giaodich.doiphuong.data.find(e => e.id == id);
        if (!inBag) return false;
        let item = inBag.item;
        let inItem = this.findItem(item);
        let my = this.my;
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