import snowlyVNdauThan from './dauthan.js';
class snowlyVNattackDeTu extends snowlyVNdauThan {
    constructor() {
        super();
        this.timeDeTuAttack = 0;
        this.mucTieuDeTu = null;
    }

    khoangCach = (id1, id2) => {
        let player1 = id1 == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(id1);
        let player2 = id2 == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(id2);
        if (!player1) return false;
        if (!player2) return false;
        let Dx = Math.abs(((player1.x - player2.x) ^ 2 + (player1.y - player2.y) ^ 2));
        return this.thapPhan(Dx / 48, 2);
    }

    khoangCach2 = (id1, id2) => {
        let player1 = id1 == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(id1);
        let player2 = id2 == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(id2);
        if (!player1) return false;
        if (!player2) return false;
        let Dx = Math.abs(((Math.abs(player1.x) - Math.abs(player2.x)) ^ 2 + (Math.abs(player1.y) - Math.abs(player2.y)) ^ 2));
        return this.thapPhan(Dx / 48, 2);
    }


    TimKiemMucTieu(detu) {
        let gannhat = -1;
        let detuP = this.nguoichoi.getChildByName(detu.id);
        if (!detuP) return false;
        this.khungThongTinDoiThu.visible = false;
        this.Charset.forEach(player => {
            let Dx = Math.abs(((detuP.x - player.pos.x) ^ 2 + (detuP.y - player.pos.y) ^ 2));
            if (Dx < 400 && (gannhat == -1 || Dx < gannhat) && player.type == 'mob') {
                gannhat = Dx;
                this.mucTieuDeTu = player.id;
            }
        });
    }


    AttackDeTu = () => {
        let my2 = this.my;
        if (my2.id <= 0) return false;
        if (!my2.detu.id) return false;
        if (my2.detu.hp <= 0) return false;
        if (this.timeDeTuAttack > Date.now()) return false;
        this.timeDeTuAttack = Date.now() + 500;

        let detu = my2.detu;
        if (detu.info.trangthai == 'venha') return false;
        if (detu.info.trangthai == 'ditheo') return false;
        if (detu.info.chiso.hp <= 0) return (this.ioInsertChat({
            _1: detu.id,
            _2: (this._('Sư phụ ơi cho con đậu thần với.'))
        }), this.timeDeTuAttack = Date.now() + 5000);
        detu.info.uutien = detu.info.uutien || [];
        if (this.mucTieuDeTu == null && detu.info.uutien.length <= 0) {
            return this.TimKiemMucTieu(detu);
        }
        let my = detu;
        let Charset = this.Charset;

        if (this.mucTieuDeTu) {

            let skill = detu.skill.filter(e => e.time < Date.now());
            // lọc ra các skill có thể dùng

            if (detu.info.trangthai == 'baove') {
                const skillToRemove = [];
                for (let i = 0; i < skill.length; i++) {
                    let e = skill[i];
                    let infoskill = skill_active.find(e2 => e2.id == e.id);
                    if (infoskill && infoskill.dx) {
                        // nếu kĩ năng có giới hạn khoảng cách 
                        if (this.khoangCach(my.id, this.mucTieuDeTu) * 1 > infoskill.dx * 1) {
                            skillToRemove.push(i);
                        }
                    }
                }
                // Xóa các phần tử từ cuối mảng để không làm thay đổi chỉ số của các phần tử phía trước
                for (let j = skillToRemove.length - 1; j >= 0; j--) {
                    skill.splice(skillToRemove[j], 1);
                }
            }

            if (skill.length <= 0) return false;
            let random = Math.floor(Math.random() * skill.length);
            let muctieu = this.mucTieuDeTu;
            let database = null;
            if (this.mucTieuDeTu != 0 && this.mucTieuDeTu != my.id && this.mucTieuDeTu != undefined && this.mucTieuDeTu != null && this.mucTieuDeTu != -1) {
                database = Charset.find(e => e.id == this.mucTieuDeTu);
                if (!database) return this.mucTieuDeTu = null;
            }
            let findskill = my.skill.find(e => e.id == skill[random].id);

            if (!findskill) return this.bug('không tìm thấy kĩ năng'); // nếu không tìm thấy

            if (findskill.time > Date.now()) return this.bug('Chưa hồi xong'); // nếu thời gian chưa hồi xong
            let posKillUse = findskill.id; // id kĩ năng
            let lvKilluse = findskill.level; // level kĩ năng sử dụng

            let infoSkill = this.usedSkill(posKillUse);

            if (infoSkill) {

                if (!this.mucTieuDeTu && infoSkill.type == 'attack') return (this.bug('tấn công ko có mục'), this.mucTieuDeTu = null); // kiểm tra mục tiêu đánh là tấn công, đồng thời kĩ năng không phải là buff


                if (infoSkill.need && infoSkill.need == true && infoSkill.type == 'buff') {
                    if (!database) return this.danger('Chưa có mục tiêu.');
                    if (infoSkill.to && infoSkill.to == 'player' && database.type == 'mob') {
                        return this.danger('Mục tiêu không hợp lệ.');
                    }
                }

                let ki = 0;

                if (infoSkill.kit == 1) ki = infoSkill.ki[lvKilluse];
                if (infoSkill.kit == 2) ki = my.info.chiso.kiFull / 100 * infoSkill.ki[lvKilluse];

                if (my.info.chiso.ki < ki) return this.danger('Không đủ KI để thực hiện'); // ki không đủ


                // add script cho Charset
                let script = infoSkill.script;
                let delay = infoSkill.delay[lvKilluse];
                let eff = infoSkill.eff[lvKilluse];
                let effdelay = infoSkill.effdelay[lvKilluse];


                // add cd skill
                findskill.time = Date.now() + (infoSkill.time[lvKilluse] / 2 * 1000);
                findskill.lasttime = Date.now();

                let serverCode = 1;
                serverCode = database && database.type == 'mob' ? 1 : serverCode;
                serverCode = database && database.type == 'player' ? 2 : serverCode;

                if (infoSkill.type == 'attack') {

                    this.to(-5, {
                        _1: posKillUse,
                        _2: muctieu,
                        _3: serverCode,
                        _4: my.id,
                    })
                } else {

                    this.to(-7, {
                        _1: posKillUse,
                        _2: muctieu,
                        _3: serverCode,
                        _4: my.id,
                    })

                }

                return false;

            }

        }




    }

}

export default snowlyVNattackDeTu;
