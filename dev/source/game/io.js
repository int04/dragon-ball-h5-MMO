import { snowlyvnIOMethod } from "./IOMethod.js";

class snowlyvnIO extends snowlyvnIOMethod
{
    constructor() {
        super();
        this.snowlyvnIO_Only();
    }

    readData = (data) => {

        if(!(data instanceof ArrayBuffer)) {
            return data;
        }
        let data2 = msgpack.decode(new Uint8Array(data));
        if(data2) return data2;
        return data;
    }

    snowlyvnIO_Only = () => {
        this.ws.onAny( (event, ...args) => {
            if(args[0])
            {
                let data = args[0];
                if(typeof data == 'string') return this.IoEvent(args);
                if(typeof data == 'number') return this.IoEvent(args);
                if(typeof data == 'boolean') return this.IoEvent(args);
                if(typeof data == 'undefined') return this.IoEvent(args);
                if(typeof data == 'function') return this.IoEvent(args);
                data = this.readData(args[0]);
                this.IoEvent(data);
            }
    });
    }

    IoMsgNotice = (data) => {

        if (!!data.notice) {
            if (data.notice.load)
                return this.notice(data.notice.text, false);

            return this.notice(data.notice.text);
        }
    }

    IoEvent = (args) => {
        if(!args) return false;
        if(typeof args !=  'object') return;
        if( args == null) return;
        let data = args;
        
        if(!!data.noti) this.notice(data.noti);

        if (!!data._a) this.IoMovePlayer(data);
        if (!!data._b) this.ioInsertPlayer(data); // người chơi mới vào
        if (!!data._c) this.ioUpdateMobInmap(data);
        if (!!data._d) this.ioInsertAttack(data);
        if (!!data._e) this.ioInsertAttackInfo(data);
        if (!!data._f) this.ioInsertAttackEFF(data);
        if (!!data._g) this.ioInsertInfoPlayer(data);
        if (!!data._h) this.ioInsertChat(data); // data chát
        if (!!data._i) this.ioUpdateRuong(data); // rương đồ
        if (!!data._j) this.ioUpdateInfoSkin(data); // cập nhật rương đồ, chỉ số khi mặc đồ, dùng item
        if (!!data._k) this.ioUpdateAction(data); // cập nhật hành động của nhân vật
        if (!!data._l) this.ioUpdateVatPhamRoiDat(data); // cập nhật hành động của nhân vật
        if (!!data._m) this.ioUpdateDeTu(data); // update đệ tử
        if (!!data._n) this.checkIdPlayerOnMap(data); // kiểm tra người chơi đã tồn tại trên cõi đời này chưa...
        if (!!data._o) this.ioUpdateRuongDeTu(data);
        if (!!data._p) this.IoMap(data); // cập nhật map
        if (!!data._q) this.playAudio(data);
        if(!!data._aa) this.ioXuListKhu(data);
        if(!!data._ba) this.changeZoneSucess(data);
        if(!!data.notice) this.IoMsgNotice(data);
        if(!!data._s) this.ioBoxShop(data);
        if(!!data._s2) this.ioBoxShopSuccess(data);


        if (!!data.closeNotice) {
            this.boxError.removeChildren();
        }
        if (!!data.login) {
            if (data.login.status) {
                this.my = data.login.my;
                this.NhanVat.x = this.my.pos.x;
                this.NhanVat.y = this.my.pos.y;
                this.NhanVat.id = this.my.id;
                this.LoadAssetPlayer();
                this.guestContainer.visible = false;
                this.loadGame.visible = false;
                clearInterval(this.InputSetInverti);
                this.logNotice.push('Trò chơi dành cho người trên 12 tuổi. Chơi quá 180 phút mỗi ngày sẽ ảnh hưởng đến sức khỏe');
            }
        }


        if (!!data.eff) {
            let my = this.my;
            let Charset = this.Charset;
            for (let i = 0; i < data.eff.length; i++) {
                let dataOfPlayer = data.eff[i].id == my.id ? my : Charset.find(e => e.id == data.eff[i].id);
                if (dataOfPlayer) {
                    dataOfPlayer.eff = data.eff[i].eff;
                } else {
                    this.ioGetElementOnMap();
                }
            }
        }

        


        


        

        


       
       
        


       




    
    }
}

export default snowlyvnIO;