import toado from '../function/toado.js';
class msgBox extends toado {
    constructor() {
        super();
        this.SkillInSrcreen = new PIXI.Container();
        this.SkillInSrcreen.name = "Lớp chứa skill trong game";
        this.inGame.addChild(this.SkillInSrcreen);
        this.createScientMsgDanger();
    }

    deleteNotice() {
        this.boxError.visible = false;
        this.boxError.removeChildren();
    }

    notice(msg, button = true) {
        this.boxError.visible = true;
        this.boxError.removeChildren();

        this.boxError.interactive = true;

        let bgW = this.gameWidth * 0.9;
        let bgh = this.gameHeight * 0.3;
        bgW = bgW > 600 ? 600 : bgW;

        let bg = new PIXI.Graphics();
        bg.beginFill(0xefe5c2, 1);
        bg.lineStyle(3, 0x8d845b, 1);

        bg.drawRoundedRect(0, 0, bgW, bgh, 10);
        bg.endFill();
        bg.x = 0;
        bg.y = 0;
        this.boxError.addChild(bg);


        let text = new PIXI.Text(msg, {
            fontSize: 16,
            fill: 0x532905,
            fontFamily: 'fontchinh',
            align: "center",
            wordWrap: true,
            wordWrapWidth: bgW - 20
        });
        text.x = bgW / 2 - text.width / 2;

        /// text.y is center of bg
        text.y = bgh / 2 - text.height / 2;


        this.boxError.addChild(text);

        if(button) {
            let btn = new PIXI.Graphics();
            btn.beginFill(0xe27c3a, 1);
            btn.lineStyle(3, 0x6b1d28, 1);

            btn.drawRoundedRect(0, 0, 100, 30, 10);
            btn.endFill();
            btn.x = bgW / 2 - btn.width / 2;
            btn.y = bgh - btn.height / 2;
            this.boxError.addChild(btn);
            let btnText = new PIXI.Text('OK', {
                fontSize: 16,
                fill: 0x532905,
                fontFamily: 'fontchinh',
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
            });
        }




        this.boxError.x = this.gameWidth / 2 - bgW / 2;


        this.boxError.y = this.gameHeight * 0.5;



    }


    createScientMsgDanger() {
        let dangerUser = new PIXI.Container();

        dangerUser.name = "Box cảnh báo";

        let dangerUserBackground = new PIXI.Graphics();

        let dangerWidth = this.gameWidth * 0.25;
        let dangerHeight = this.gameHeight * 0.08;

        dangerUserBackground.beginFill(0x977b55, 0.8); // Màu đen với độ trong suốt là 0.5
        dangerUserBackground.lineStyle(1, 0xb39e83, 1); // Độ dày đường viền là 0
        dangerUserBackground.drawRoundedRect(0, 0, dangerWidth, dangerHeight, 5);
        dangerUserBackground.endFill();

        dangerUser.addChild(dangerUserBackground);

        let LopChuaDanger = new PIXI.Container();

        let noiDungDanger = new PIXI.Text('Đây là cảnh báo đặc biệt dành cho người anh em thiện lành nhé', {
            fontFamily: "fontchinh",
            fontSize: 15,
            fill: "white",
            stroke: '#ff3300',
            strokeThickness: 1,
            align: "center",
        });

        // mask noiDungDanger
        let maskNoiDungDanger = new PIXI.Graphics();
        maskNoiDungDanger.beginFill(0x000000, 1);
        maskNoiDungDanger.drawRect(0, 0, dangerWidth * 0.8, dangerHeight * 0.8);
        maskNoiDungDanger.endFill();
        maskNoiDungDanger.x = dangerWidth * 0.1;
        noiDungDanger.mask = maskNoiDungDanger;


        noiDungDanger.x = maskNoiDungDanger.x + 10;

        LopChuaDanger.addChild(noiDungDanger, maskNoiDungDanger);



        LopChuaDanger.x = 0;

        LopChuaDanger.y = dangerHeight / 2 - noiDungDanger.height / 2;


        dangerUserBackground.addChild(LopChuaDanger);




        dangerUser.x = this.gameWidth * 0.5 - dangerWidth / 2;

        dangerUser.y = this.gameHeight * 0.7 - dangerHeight / 2;

        dangerUser.time = 0;
        dangerUser.visible = false;

        this.dangerUser = dangerUser;
        this.noiDungDanger = noiDungDanger;
        this.maskNoiDungDanger = maskNoiDungDanger;
        this.screen.addChild(dangerUser);


    }


    

}

export default msgBox;
