import { actionSprite } from "../action.js";

export default class phiThuyenClass extends actionSprite {
    constructor() {
        super();
        this.nextMap = {
            id : 0,
            zone : -1,
            x : 0,
            y : 0,
        };
    }

    veNha = () =>{
        let my = this.my;

        let setting = {
            traidat : { map : 1, x : 730, y : -40},
            saiyan : {map : 52, x : 904, y : -43},
            namek : {map : 24, x : 1245, y : -43},
        }

        this.to(-32,{
            type : 'checked',
            map : setting[my.info.coban.type].map,
            zone : -1,
            x : setting[my.info.coban.type].x,
            y : setting[my.info.coban.type].y,
        })
    }

    baynhanh = (ArrayX, y) => {
        let xMin = ArrayX[0];
        let xMax = ArrayX[1];
        let mapid = ArrayX[2];
        this.to(-32,{
            type : 'checked',
            map : mapid,
            zone : -1,
            x : this.rand(xMin,xMax),
            y : y,
        })
    }

    ketNoiPhiThuyen = () => {

        this.inGame.visible = false;
        this.loadGame.visible = true;

        this.to(-32,{
            type : 'join',
            map : this.nextMap.map,
            zone : this.nextMap.zone,
            x : this.nextMap.x,
            y : this.nextMap.y,
        })

        // xoá map
        this.deleteNotice();
        this.Charset = [];
        this.resetNone();
        this.my.pos.x = this.nextMap.x;
        this.my.pos.y = this.nextMap.y;
        this.NhanVat.x = this.nextMap.x;
        this.NhanVat.y = this.nextMap.y;
        this.my.pos.map = this.nextMap.id;
        this.NhanVatGoc.x = this.NhanVat.x;
        this.NhanVatGoc.y = this.NhanVat.y;
    }

    phithuyen_Handle = (element) => {
        let src = ["phiThuyenTraiDat","myTexture2dmaybay2-resources.assets-1251","myTexture2dmaybay3-resources.assets-233"];
        let src_open = ["phiThuyenTraiDat","myTexture2dmaybay2-resources.assets-1251","myTexture2dmaybay3-resources.assets-233"];

        let idIndex = 0;
        let type = {
            traidat : 0,
            namek : 1,
            saiyan : 2
        }

        let nhanVat = this.getNhanVat(element.uid);
        if(!nhanVat) return element.type = 'delete';

        let thongTin = this.getMy(nhanVat.id);
        if(!thongTin) return element.type = 'delete';

        idIndex = type[thongTin.info.coban.type];

        let addnewskill = this.getEff(element.id);
        let donDanh = this.imgEff(addnewskill, element.id);

        donDanh.run = donDanh.run || 1;
        donDanh.time = donDanh.time || 0;
        donDanh.time++;

        if(donDanh.run == 1) 
        {
            this.playSound('bay',false,nhanVat.x,'bay' + element.id);
            donDanh.run = "1_0";
            donDanh.y = this.gameMap.setting.minY;
            donDanh.x = nhanVat.x - Math.abs(nhanVat.width) - donDanh.width;
            donDanh.to = nhanVat.y;
            let to = nhanVat.y;
            nhanVat.y = this.gameMap.setting.minY >> 0;
            nhanVat.visible = false;

            donDanh.texture = this.coverImg(src[idIndex]);
            donDanh.width = 100;
            donDanh.height = 100;
            // tween
            let tween = new TWEEN.Tween(donDanh)
            .to({y: to}, 2000)
            .onUpdate(() => {
                nhanVat.y = donDanh.y;
                nhanVat.visible = false;
                if(this.my.id == element.uid) {
                    this.NhanVatGoc.y = donDanh.y;
                }
            })
            .onComplete(() => {
                donDanh.action = 30;
                donDanh.run = 2;

                donDanh.texture = this.coverImg(src_open[idIndex]);
            })
            .start();
        }

        if(donDanh.run == 2 && donDanh.time%this.fps() ==0) 
        {
            // hiệu ứng nhân vật bay vào phi thuyền
            this.action(element.uid,'dungyen');
            nhanVat.visible = true;
            donDanh.run = 3;
            if(this.my.id == element.uid) {
                this.xulynamdat(element.uid);
            }
            

        }

        if(donDanh.run ==3) 
        {
            donDanh.run = 4;
            let tween = new TWEEN.Tween(donDanh)
            .to({y: this.gameMap.setting.minY}, 1000)
            .onComplete(() => {
                element.type = 'delete';
            })
            .start();
        }

    }

    phithuyenHandle = (element) => {
        let src = ["phiThuyenTraiDat","myTexture2dmaybay2-resources.assets-1251","myTexture2dmaybay3-resources.assets-233"];
        let src_open = ["phiThuyenTraiDat","myTexture2dmaybay2-resources.assets-1251","myTexture2dmaybay3-resources.assets-233"];

        let idIndex = 0;
        let type = {
            traidat : 0,
            namek : 1,
            saiyan : 2
        }

        let nhanVat = this.getNhanVat(element.uid);
        if(!nhanVat) return element.type = 'delete';

        let thongTin = this.getMy(nhanVat.id);
        if(!thongTin) return element.type = 'delete';

        idIndex = type[thongTin.info.coban.type];


        let addnewskill = this.getEff(element.id);
        let donDanh = this.imgEff(addnewskill, element.id);

        donDanh.run = donDanh.run || 1;
        donDanh.time = donDanh.time || 0;
        donDanh.time++;

        if(donDanh.run == 1) 
        {
            this.playSound('bay',false,nhanVat.x,'bay' + element.id);
            donDanh.run = 2;
            donDanh.y = nhanVat.y - this.gameHeight;
            donDanh.x = nhanVat.x - Math.abs(nhanVat.width) - donDanh.width;
            donDanh.texture = this.coverImg(src[idIndex]);
            donDanh.width = 100;
            donDanh.height = 100;
            // tween
            let tween = new TWEEN.Tween(donDanh)
            .to({y: nhanVat.y}, 1000)
            .onComplete(() => {
                donDanh.action = 30;
                donDanh.texture = this.coverImg(src_open[idIndex]);
            })
            .start();
        }

        if(donDanh.run == 2 && donDanh.time%this.fps() ==0) 
        {
            // hiệu ứng nhân vật bay vào phi thuyền
            if(donDanh.action >= 1) 
            {
                donDanh.action--;
                nhanVat.y -= 2;
                this.action(element.uid,'baylen');
                if(donDanh.action <=0) 
                {
                    donDanh.run = 3;
                    nhanVat.visible = false;
                    if(this.my.id == element.uid) {
                        this.NhanVatGoc.y = nhanVat.y;
                    }
                }

            }

        }

        // bay phi thuyền lên

        if(donDanh.run ==3) 
        {
            donDanh.run = 4;

            let tween = new TWEEN.Tween(donDanh)
            .to({y: this.gameMap.setting.minY}, 1000)
            .onUpdate(() => {
                nhanVat.y = donDanh.y;
                nhanVat.visible = false;
                if(this.my.id == element.uid) {
                    this.NhanVatGoc.y = donDanh.y;
                }
            })
            .onComplete(() => {
                nhanVat.visible = true;
                element.type = 'delete';
                if(this.my.id == element.uid) {
                    this.ketNoiPhiThuyen();
                }
            })
            .start();
        }

    }
}
/* 
    game.addEff({
        type : 'phithuyen',
        uid : 1,
    })
*/