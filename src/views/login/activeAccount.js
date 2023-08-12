import regView from "./regView.js";

export default class activeAccountView extends regView {
    constructor() {
        super();
    }

    sendInPutActive = (inputUsername, inputPassword) => {
        let username = inputUsername;
        let password = inputPassword;
        if(username.length < 3 || username.length >=20) return this.notice('Tên tài khoản phải từ 3- 20 kí tự');
        if(password.length < 3 || password.length >=20) return this.notice('Mật khẩu phải từ 3- 20 kí tự');
        // allow az09
        let check = /^[a-zA-Z0-9]+$/.test(username);
        if(!check) return this.notice('Tên tài khoản không được chứa kí tự đặc biệt');
        check = /^[a-zA-Z0-9]+$/.test(password);
        if(!check) return this.notice('Mật khẩu không được chứa kí tự đặc biệt');

        let my = this.my;
        if(my.veri == 1) return this.notice('Tài khoản đã xác thực');

        this.to(-35,{
            _1 : username,
            _2 : password,
        });
        this.await();

    }

    pageActiveAccount() {
        let my = this.my;
        if(my.id <=0) return this.pageLogin();

        this.closeBox();
        this.bodyChat.visible = true;
        this.bodyChat.removeChildren();

        let bgW = this.gameWidth * 0.9;
        let bgh = this.gameHeight * 0.5;

        bgW = bgW > 500 ? 500 : bgW;
        bgh = bgh > 400 ? 400 : bgh;

        let bg = new PIXI.Graphics();
        bg.beginFill(0xfee4c6, 1);
        bg.lineStyle(3, 0x6c4a00, 1);

        bg.drawRoundedRect(0, 0, bgW, bgh, 10);
        bg.endFill();
        bg.x = 0;
        bg.y = 0;
        this.bodyChat.addChild(bg);

        let displayChat = new PIXI.HTMLText('Tài khoản của bạn chưa xác thực, vui lòng xác thực để đảm bảo cho tài khoản an toàn.', {
            fontSize: 20,
            fill: 0x532905,
            fontFamily: 'chelthm',
            fontWeight: 'bold',
            align: "center",
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: bgW - 20
            });
        displayChat.x = 10;
        displayChat.y =10;
        bg.addChild(displayChat);

        let containerInput = new PIXI.Container();
        let minput = bgW;
        minput = minput > 250 ? 250 : minput;

        let name1 = new PIXI.Text('Tên tài khoản:', {
            fontSize: 20,
            fill: 0x005325,
            fontFamily: 'chelthm',
            fontWeight: 'bold',
            align: "center",
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: bgW - 20
        });
        name1.y = 0;
        bg.addChild(name1);

        let inputUsername = new PIXI.TextInput({
            input: {
                fontSize: '20px',
                padding: '12px',
                width: minput+'px',
                color: '#26272E'
            },
            box: {
                default: {fill: 0xe8e9f3, rounded: 12},
                focused: {fill: 0xe1e3ee, rounded: 12},
                disabled: {fill: 0xdbdbdb, rounded: 12}
            }
        });
        inputUsername.x = 0;
        inputUsername.y = name1.y + name1.height ;

        containerInput.addChild(name1,inputUsername);
        bg.addChild(containerInput);

        let passwordText = new PIXI.Text('Mật khẩu:', {
            fontSize: 20,
            fill: 0x005325,
            fontFamily: 'chelthm',
            fontWeight: 'bold',
            align: "center",
            fontWeight: 'bold',
            wordWrap: true,
            wordWrapWidth: bgW - 20
        });
        passwordText.y = inputUsername.y + inputUsername.height + 10;
        bg.addChild(passwordText);

        let inputPassword = new PIXI.TextInput({
            input: {
                fontSize: '20px',
                padding: '12px',
                width: minput+'px',
                color: '#26272E'
            },
            box: {
                default: {fill: 0xe8e9f3, rounded: 12},
                focused: {fill: 0xe1e3ee, rounded: 12},
                disabled: {fill: 0xdbdbdb, rounded: 12}
            }
        });

        inputPassword.x = 0;
        inputPassword.y = passwordText.y + passwordText.height;

        containerInput.addChild(passwordText,inputPassword);

        containerInput.x = bgW / 2 - containerInput.width / 2;
        containerInput.y = displayChat.y + displayChat.height + 10;






        let ContainerButton = new PIXI.Container();
        // create button OK and cancel on
        let btnOK = new PIXI.Graphics();
        btnOK.beginFill(0xe57e3b, 1);
        btnOK.lineStyle(3, 0x6a1b26, 1);
        btnOK.drawRoundedRect(0, 0, 70,50, 10);
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
            
            inputPassword.blur();
            inputUsername.blur();
            this.sendInPutActive(inputUsername.text, inputPassword.text);
        });



        


        let btnCancel = new PIXI.Graphics();
        btnCancel.beginFill(0xe57e3b, 1);

        btnCancel.lineStyle(3, 0x6a1b26, 1);
        btnCancel.drawRoundedRect(0, 0, 70,50, 10);
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
        this.bodyChat.y = this.gameHeight/2 - this.bodyChat.height/2;
    }
}