import nhiemvuView from "../giaotiep/nhiemvuView.js";

export default class pkViewController extends nhiemvuView {
    constructor() {
        super();

        
    }

    PVPView = (id, vang) => {
        let info = this.getMy(id);
        if(id) 
        {
            this.msgBox(" "+info.name+" muốn thách đấu với bạn với mức cược "+this.number_format(vang)+" vàng", 
            () => {
                this.PVP_Yes(id);
            }, 
            () => {
                this.PVP_No(id);
            });
        }
    }

    PVP_Yes = (id) => {
        this.to('pvp', {
            id : id,
            type : 'yes'
        });
        this.deleteNotice();

    }

    PVP_No = (id) => {
        this.deleteNotice();
        this.to('pvp', {
            id : id,
            type : 'no'
        });
    }

    sendPVP = (id, cuoc) => {
        if(!id || !cuoc) return;
        if(cuoc < 1000 || cuoc > 2000000000) return this.chipi("Số tiền cược không hợp lệ");
        let info = this.getMy(id);
        if(!info) return this.chipi("Người chơi đã rời khỏi bản đồ");
        if(info.id == this.myId) return this.chipi("Không thể tự thách đấu");

        this.bodyChat.removeChildren();
        this.closeBox();
        this.to('pvp',{
            id: id,
            vang : cuoc,
            type : 'send'
        })
    }
    
    formInputPkView = (id) => {
        let info = this.getMy(id);
        if(!info) return;
        this.bodyChat.visible = true;
        this.bodyChat.removeChildren();

        let bgW = this.gameWidth * 0.9;
        let bgh = this.gameHeight * 0.5;

        bgW = bgW > 500 ? 500 : bgW;
        bgh = bgh > 150 ? 150 : bgh;

        let bg = new PIXI.Graphics();
        bg.beginFill(0xfee4c6, 1);
        bg.lineStyle(3, 0x6c4a00, 1);

        bg.drawRoundedRect(0, 0, bgW, bgh, 10);
        bg.endFill();
        bg.x = 0;
        bg.y = 0;
        this.bodyChat.addChild(bg);

        let displayChat = new PIXI.Text('Nhập số tiền cược muốn thách đấu (1k - 2B vàng):', {
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
        displayChat.y = 10;
        bg.addChild(displayChat);

        let inputChat = new PIXI.TextInput({
            input: {
                fontSize: '15px',
                padding: '12px',
                color: '#7a1125',
                width: bgW * 0.9,
                height: bg.height * 0.3,
            },
            box: {
                default: { fill: 0xeec385, rounded: 10, stroke: { color: 0xfff6eb, width: 1 } },
                focused: { fill: 0xa7f2ac, rounded: 10, stroke: { color: 0xfff6eb, width: 1 } },
                disabled: { fill: 0xDBDBDB, rounded: 12 }
            }
        })
        inputChat.x = (bgW - (bgW * 0.9)) / 2;
        inputChat.y = bg.height * 0.7 - inputChat.height / 2;
        // set input type number
        inputChat.htmlInput.type = 'number';
        inputChat.htmlInput.min = 1000;
        inputChat.htmlInput.max = 2000000000;
        inputChat.htmlInput.value = 1000;
        bg.addChild(inputChat);

        // focus inputChat
        setTimeout(() => {
            inputChat.focus();
            // clear focus inputChat

        }, 100);

        // create button OK and cancel on center of bg


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
            this.sendPVP(id, inputChat.text);
            // delete focus inputChat
            inputChat.blur();
            inputChat.text = '';
        });



        inputChat.on('keydown', (e) => {
            if(e == 13) {
                this.sendPVP(id, inputChat.text);
                inputChat.blur();
                inputChat.text = '';
            }
        });


        let btnCancel = new PIXI.Graphics();
        btnCancel.beginFill(0xe57e3b, 1);

        btnCancel.lineStyle(3, 0x6a1b26, 1);
        btnCancel.drawRoundedRect(0, 0, bgW * 0.2, bgh * 0.3, 10);
        btnCancel.endFill();
        btnCancel.x = btnOKText.x + btnOKText.width + btnCancel.width / 2;
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
        this.bodyChat.y = this.gameHeight * 0.9 - this.bodyChat.height;
    }
    
}