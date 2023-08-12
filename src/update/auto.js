import inGameMSG  from './inGameMSG.js';

export default class autoUpdateAttack extends inGameMSG {
    constructor() {
        super();
        this.autoAttack = false;
        this.timeAuto = 0;
    }

    autoUpdateAttack = () => {
        if(this.autoAttack == false) return;
        if(this.keysPressed[37] || this.keysPressed[38] || this.keysPressed[39] || this.keysPressed[40]) return;
        if(this.timeAuto > Date.now())  return;
        this.timeAuto = Date.now() + 100;
        let my = this.my;
        if(my.info.act != 'dungyen' && my.info.act != 'baylen') return;
        if(my.info.coban.hp <= 0) return;
        let setting = this.setting;
        let chonSkill = setting.oskill;
        let muctieu = setting.mouse;

        if(muctieu == -1 || !muctieu) {
            return this.autoFindTarget();
        }
        let info;
        if(muctieu) {
            info = this.getMy(muctieu);
        }

    

        let gan = my.oskill; // is array
        
        let index = [];

        gan.forEach((element,i) => {
            let skill = my.skill.find(e => e.id == element && e.level > 0 && e.time < Date.now());
            if(skill) index.push(i)
        });

        if(index.length <= 0) return;

        let rand = index[this.rand(0, index.length - 1)];

        this.setting.oskill = rand;


        this.dcttTarget();


        if(info.type == 'item') return this.interAttack();

        if(!info || info.type != 'mob' || info.info.chiso.hp <= 0) {
            this.setting.mouse = -1;
            return this.autoFindTarget();
        }

        this.interAttack();
    }

    dcttTarget = () => {
        let setting = this.setting;
        let target = setting.mouse;
        let my = this.my;
        let findskill = my.skill.find(e => e.id == my.oskill[setting.oskill]); // tìm kiếm thông tin kĩ năng level, time của bản thân
        if(findskill) {
            let infoSkill = this.usedSkill( findskill.id);
            if(infoSkill) {
                if(infoSkill.dx && infoSkill.dx > 0 && target) {
                    let nhanVat = this.NhanVat;
                    let NhanVat2 = this.getNhanVat(target);
                    let distance = this.calculateDistanceXandWidth(nhanVat, NhanVat2);
                    let getMy = this.getMy(target);
                    if(distance > infoSkill.dx*2) {

                        this.NhanVat.x = NhanVat2.x;
                        this.NhanVat.y = NhanVat2.y;
                        this.NhanVatGoc.x = NhanVat2.x;
                        this.NhanVatGoc.y = NhanVat2.y;
                        if(getMy.namdat) {
                            this.xulynamdat(this.my.id,true);
                        }
                    }
                }
            }

        }
    }

    autoFindTarget = () => {


        let list = this.Charset.filter(e => e.id != this.my.id && (e.type == 'mob' && e.info.chiso.hp > 0) || (e.type == 'item' && e.uid == this.my.id));
        if(list.length >=1) {

            let random = this.rand(0, list.length - 1);
            let target = list[random].id;
            this.setting.mouse = target;
            this.dcttTarget();
        }
    }
}