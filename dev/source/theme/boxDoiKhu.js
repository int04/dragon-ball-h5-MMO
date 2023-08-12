import SnowlyVnBoxClass from "./BoxMenu.js";

export default class snowlyvnThemeDoIkhu extends SnowlyVnBoxClass {
    constructor() {
        super();
    }

    boxNewDoiKhu = () => {
        let my = this.my;
        let map = this.listMap.find(e => e.id == my.pos.map);
        if(!map) return this.notice(this._('Không thể đổi khu vực.'));
        if(map && map.max > 0) return this.notice(this._('Không đổi khu vực tại bản đồ này được.'));
        this.to(-19);
    }

    doiKhu = (id) => {
        let my = this.my;
        let map = this.listMap.find(e => e.id == my.pos.map);
        if(!map) return this.notice(this._('Không thể đổi khu vực.'));
        if(map && map.max > 0) return this.notice(this._('Không đổi khu vực tại bản đồ này được.'));
        this.closeBox();
        this.to(-20,id);
        this.notice(this._('Xin chờ...'),false);
    }

    changeZoneSucess = (data) => {
        let my = this.my;
        if(my.id <=0) return false;
        this.deleteNotice();
        my.pos.zone = data._1;
        this.Charset = [];
        this.resetNone();
        this.sendMyMove();
        this.ioGetElementOnMap(); // get player on map
    }


    ioXuListKhu = (data) => {
        console.log(data)
        let my = this.my;
        if(my.id <=0) return false;
        this.closeBox();
        let background = this.boxBaseBackground();
        this.box.addChild(background);

        //! HEAD
        let head = this.boxBaseHead(background);

        let avatar = this.snowlyImg(561);
        avatar.width = head.width * 0.25;
        avatar.height = (head.height * 0.99) > avatar.width ? avatar.width : head.height * 0.99;
        avatar.x = head.width * 0.01;
        avatar.y = head.height*0.99 - avatar.height;
        let txtAvatar = this.snowlyText(my.pos.zone, 16,'Arial', 0xFFFFFF,false,avatar.width,avatar.height);
        head.addChild(avatar,txtAvatar);
        txtAvatar.x = avatar.width/2 - txtAvatar.width/2;
        txtAvatar.y = avatar.y  +  avatar.height/2 - txtAvatar.height/2;
        let info = new PIXI.Container();
        let name = '';
        let findMap = this.listMap.find(e => e.id == my.pos.map);
        name = findMap ? findMap.name : '';

        let khuZone = this.snowlyText('Khu vực '+my.pos.zone+' ', 16,'Arial', 0xFFFFFF,false,head.width,head.height);
        let khuMap = this.snowlyText(name, 16,'Arial', 0xfefe00,false,head.width,head.height);
        khuMap.y = khuZone.height;
        info.addChild(khuZone,khuMap);
        head.addChild(info);
        info.x = avatar.x + avatar.width  + avatar.width * 0.05;
        info.y =  head.height/2 - info.height/2;

        //! menu
        let menu = this.boxBaseMenuTXT(head,'Chọn khu vực');
        


        //! body
        let body = this.boxBaseBody(background,head,menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body,background);


        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;

        let list  = data._1;

        list.forEach((element,i) => {
            let slot = new PIXI.Graphics();
            slot.lineStyle(1, 0xd9c8b3, 1);
            slot.beginFill(0xe6ded1, 1);
            slot.drawRoundedRect(0, 0, slotwidth, slotheight, 0);
            slot.endFill();
            slot.y = i * slotheight * 1.09;
            hienthinoidung.addChild(slot);

            let color = 0x000000;
            if(element._2 < 5) color = 0x00a900;
            else if(element._2 < 9) color = 0xffff00;
            else color = 0xff0000;
            let _30 = new PIXI.Graphics();
            _30.lineStyle(1, 0xd9c8b3, 1);
            _30.beginFill(color, 1);
            _30.drawRoundedRect(0, 0, slotwidth * 0.3, slotheight, 0);
            _30.endFill();
            slot.addChild(_30);
            let txtzone = this.snowlyText(element._1, 16,'Arial', 0xfefe00,true,_30.width,_30.height);
            txtzone.style.fontWeight = 'bold';
            _30.addChild(txtzone);

            let _70 = new PIXI.Graphics();
            _70.lineStyle(1, 0xd9c8b3, 1);
            _70.beginFill(0xe6ded1, 1);
            _70.drawRoundedRect(0, 0, slotwidth * 0.7, slotheight, 0);
            _70.endFill();
            _70.x = _30.width;
            slot.addChild(_70);

            let txt2 = this.snowlyText(element._2+"/"+data._2, 16,'Arial', 0x005325,true,_70.width,_70.height);
            txt2.style.fontWeight = 'bold';
            txt2.x = _70.width * 0.05;
            _70.addChild(txt2);

            slot.interactive = true;
            slot.cursor = 'pointer';
            slot.name = "since04KEY";

            let timeStart = 0;
            let timeEnd = 0;
            
            slot.on('pointerdown', () => {
                timeStart = Date.now();
            });
            slot.on('pointerup', () => {
                timeEnd = Date.now();
                if(timeEnd - timeStart < 200) {
                    this.doiKhu(element._1);
                }
            });

            

        });


        // end

        let sc = this.snowlySroll(body,hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head,background);
        background.addChild(head,menu,foot);

    }
}