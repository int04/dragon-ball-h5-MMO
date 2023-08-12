import shopViewPT from './shopView.js';


export default class msgBoxPTView extends shopViewPT {
    constructor() {
        super();
    }
    ptMsgBox = (msg, callback, callback2 = false) => {
        return this.msgBox(msg, callback, callback2);
    }
    msgBox = (msg, callback, callback2 = false) => {

        this.boxError.removeChildren();
        this.boxError.visible = true;

        this.boxError.interactive = true;

        let bgW = this.gameWidth * 0.6;
        let bgh = this.gameHeight * 0.3;
        let bg = new PIXI.Graphics();
        bg.beginFill(0xefe5c2, 1);
        bg.lineStyle(3, 0x8d845b, 1);

        bg.drawRoundedRect(0, 0, bgW, bgh, 10);
        bg.endFill();
        bg.x = 0;
        bg.y = 0;
        this.boxError.addChild(bg);

        let text = new PIXI.Text( this._(msg), {
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

        btn.drawRoundedRect(0, 0, 100, 30, 10);
        btn.endFill();
        btn.x = 0;
        btn.y = 0;
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


            if (callback) callback();
        });


        let btn2 = new PIXI.Graphics();
        btn2.beginFill(0xe27c3a, 1);
        btn2.lineStyle(3, 0x6b1d28, 1);

        btn2.drawRoundedRect(0, 0, 100, 30, 10);
        btn2.endFill();
        btn2.x = btn.width + 10;
        btn2.y = 0;
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
            if(callback2) callback2();
        });


        bigbtn.addChild(btn, btn2);
        bigbtn.x = bgW / 2 - bigbtn.width / 2;
        bigbtn.y = bgh - bigbtn.height / 2;


        this.boxError.addChild(bigbtn);




        this.boxError.x = this.gameWidth / 2 - bgW / 2;
        this.boxError.y = this.gameHeight * 0.5;


    }
}