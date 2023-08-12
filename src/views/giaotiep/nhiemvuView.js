import soundView from '../sound/soundView.js';

export default class nhiemvuView extends soundView {
    constructor(){
        super();
    }

    hoanThanhNhiemVu = () => {
        this.notice(this._('Xin chờ...'));
        this.to(-30,1);
    }

    nhiemvuView = (i = 0) => {
        let my = this.my;
        if(!my.nhiemvu.data.id) return this.chipi("tạm thời chưa có nhiệm vụ");
        if(my.nhiemvu.data.type != 'talk') return this.chipi("Hãy lên đường làm nhiệm vụ đi nào.");

        let dataNhiemVu = this.logNhiemVu.find(e => e.id == this.my.nhiemvu.id && (e.class == this.my.info.coban.type || e.class == 'all'));
        if(!dataNhiemVu) return this.chipi("Không đọc được dữ liệu nhiệm vụ.");
        let data = dataNhiemVu.list[my.nhiemvu.now];
        if(!data) return this.chipi("Không đọc được dữ liệu nhiệm vụ nội dung.");

        let msgData = data.data[i];
        if(!msgData) return this.chipi("Đã hết nội dung.");

        let npc = this.Charset.find(e => e.id == this.my.nhiemvu.data.id);
        if(!npc) return this.chipi("Hãy tới map có NPC để nói chuyện");
        

        this.NutOnScreen.visible = false;

        this.closeBox();
        this.khungGiaoTiep.removeChildren();
        this.khungGiaoTiep.visible = true;
        let width = this.gameWidth * 0.8;
        let height = this.gameHeight * 0.4;
        width = width > 600 ? 600 : width;
        let nen = this.snowlyGraphics(width, height, 0x166304, 0x000000, 0.0001, 10, 0)
        this.khungGiaoTiep.addChild(nen);
        nen.x = (this.gameWidth - width) / 2;
        nen.y = this.gameHeight*1.1 - nen.height;

        let height2 = height * 0.4;

        let text = "";
        text += msgData + "";

        let msgbox = this.snowlyGraphics(width, height2, 0xfefefe, 0x000000, 2, 10);
        nen.addChild(msgbox);

        // reapce $ with my name
        text = text.replace(/\$/g, my.name);

        let txt = new PIXI.Text(text, {
            fontSize: 15,
            fill: 0x000000,
            fontFamily: 'Arial',
            wordWrap: true,
            wordWrapWidth: width - 20,
            fontWeight: 'bold',
            align: "center",

        });
        txt.x = msgbox.width / 2 - txt.width / 2;
        txt.y = msgbox.height / 2 - txt.height / 2;
        msgbox.addChild(txt);

        let button = this.snowlyGraphics(100, 50, 0xd79132, 0x000000, 2, 10);
        nen.addChild(button);
        button.y = msgbox.height - button.height/4;
        button.x = msgbox.width / 2 - button.width / 2;

        let txt2 = new PIXI.Text(( i+1 < data.data.length ? 'Tiếp tục' : 'Xong'), {
            fontSize: 15,
            fill: 0x000000,
            fontFamily: 'Arial',
            wordWrap: true,
            wordWrapWidth: width - 20,
            fontWeight: 'bold',
            align: "center",

        });
        txt2.x = button.width / 2 - txt2.width / 2;
        txt2.y = button.height / 2 - txt2.height / 2;
        button.addChild(txt2);

        button.interactive = true;
        button.buttonMode = true;
        button.on('pointerdown', () => {
            if(i+1 < data.data.length) {
                this.nhiemvuView(i+1);
            }
            else {
                this.khungGiaoTiep.removeChildren();
                this.hoanThanhNhiemVu();
                this.NutOnScreen.visible = true;
            }
        });


        if(npc.source.script.avatar.length >= 1) {
            let img = new PIXI.Sprite(this.coverImg("" + (npc.source.script.avatar) + ""));
            let wmx = nen.width * 1;
            wmx = wmx > 100 ? 100 : wmx;
            img.height = wmx;
            img.width = wmx;
            img.x = 0;
            img.y = 0 - img.height;
            nen.addChild(img);
        }



    }
}