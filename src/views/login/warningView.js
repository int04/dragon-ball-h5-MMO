import loadPackageView from "./loadPackage.js";

export default class WarningViewclass extends loadPackageView {
    constructor() {
        super();
    }

    WarningViewController = () => {
        this.loadGame.removeChildren();
        let background = new PIXI.Graphics();
        this.loadGame.addChild(background);
        background.beginFill(0x000000, 1);
        background.lineStyle(0, 0x570b21, 1);
        background.drawRoundedRect(0, 0, this.gameWidth, this.gameHeight, 0);
        background.endFill();
        background.interactive = true;

        let txt = new PIXI.HTMLText(`<big><center><font color="red">WARNING !!!:</font></center></big>  <br>
            Trò chơi được viết hoàn toàn độc lập, không sử dụng bất kì client/server của tổ chức hay cá nhân nào ! <br>
            Trò chơi là dự án của sinh viên ngành CNTT, không có mục đích thương mại.<br>
            Trò chơi là mã nguồn mở, được chia sẻ tới mọi người với mục đích học tập, tìm hiểu cấu trúc trò chơi. <br>
            Nạp thẻ có chức năng duy trì máy chủ, dự án. <Br>
        <br>`, {
            fontSize: 16,
            fill: 0xffffff,
            fontFamily: 'Arial',
            wordWrap: true,
            wordWrapWidth: this.gameWidth - 20,
            fontWeight: 'bold',
            align: 'center'
            });
        txt.x = (this.gameWidth - txt.width) / 2;
        txt.y = (this.gameHeight - txt.height) / 2;
        background.addChild(txt); 


        let PressToContinue = new PIXI.Text(this._('Click để tiếp tục'), {
            fontSize: 20,
            fill: 0xffffff,
            fontFamily: 'Arial',
            wordWrap: true,
            wordWrapWidth: this.gameWidth - 20,
            fontWeight: 'bold',
            align: 'center'
            });
        PressToContinue.x = (this.gameWidth - PressToContinue.width) / 2;
        PressToContinue.y = txt.y + txt.height + 20;
        background.addChild(PressToContinue);

        // tạo hiệu ứng cho chữ PressToContinue
        TweenMax.to(PressToContinue, 1, {
            alpha: 0,
            repeat: -1,
            yoyo: true,
            ease: Power0.easeNone,
            speed: 10,
            delay: 0.1,
        });

        background.interactive = true;
        background.on('pointerdown', () => {
            this.ObjectCreatePageLoading();
        });



    }
}