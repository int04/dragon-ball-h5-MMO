
import  updateKamejoko  from "./skill/kamejoko.js";


export default class updateMouseClass extends updateKamejoko {
    constructor() {
        super();
    }

    tickerUpdateMouseClickPlayer = () => {
        this.isClickPlayer();
        this.isNotClickPlayer();
    }

    isNotClickPlayer = () => {
        if(this.my.id <=0) return false;
        if(this.setting.mouse == 0 || this.setting.mouse == -1 && this.dem % 10 == 0) {
            let gannhat = -1;
            this.khungThongTinDoiThu.visible = false;
            this.Charset.forEach(player => {
                let getNhanVat = this.getNhanVat(player.id);
                if(!getNhanVat) return false;
                let Dx = this.calculateDistanceXandWidth(this.NhanVat, getNhanVat);
                let maxDx = 100;
                if(player.type == 'mob' || player.type == 'player'  || player.type == 'boss') {
                    maxDx = 400;
                }

                let nhanvat = this.getNhanVat(player.id);

                if(Dx < maxDx && (gannhat == -1 || Dx < gannhat) && nhanvat.visible == true ) {
                    gannhat = Dx;
                    this.setting.mouse = player.id;
                }
            });
        }

    }

    isClickPlayer = () => {
        if(this.autoAttack == true) return false;
        if(this.my.id <=0) return false;

        if(this.setting.mouse != 0) {
            let player = this.Charset.find(e => e.id == this.setting.mouse);
            if(!player) {
                this.setting.mouse = 0;
                this.khungThongTinDoiThu.visible = false;
            } else {

                // check khoảng cách 
                let trenmap = this.nguoichoi.children.find(e => e.id == player.id);
                if(!trenmap) return this.setting.mouse = 0;
                if(trenmap.visible == false) return this.setting.mouse = 0;
                let Dx = this.calculateDistanceXandWidth(this.NhanVat, trenmap);
                Dx = Math.round(Dx);

                let maxDx = 100;
                if(trenmap.type == 'mob' || trenmap.type == 'player' || player.type == 'boss') {
                    maxDx = 400;
                }


                if(Dx > maxDx) {
                    this.setting.mouse = -1;
                    this.khungThongTinDoiThu.visible = false;
                }
                this.khungThongTinDoiThu.visible = true;
                this.myHPText.text = this.number_format(player.info.chiso.hp) + "(" + Dx + "cm)";
                this.myNameText.text = player.name;
                this.myHPText.x = this.backGoundInfoMMO.getBounds().width / 2 - this.myHPText.getBounds().width / 2;
                this.myNameText.x = this.backGoundInfoMMO.getBounds().width / 2 - this.myNameText.getBounds().width / 2;

            }
        }
    }
}