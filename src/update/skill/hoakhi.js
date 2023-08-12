import effUpdateSucManh from "./eff.js";

export default class hoakhiUpdate extends effUpdateSucManh {
    constructor() {
        super();
    }

    action = (id,name) => {
        return this.addAction({
            id : id,
            action : name,
        })
    }

    vaCham = (e1,e2) => {
        const rectangle1 = e1.getBounds();
        if (!rectangle1) return false;
        const rectangle2 = e2.getBounds();
        if (!rectangle2) return false;
        const e1CenterX = rectangle1.x + rectangle1.width / 2;
        const e1CenterY = rectangle1.y + rectangle1.height / 2;
        return (
            e1CenterX >= rectangle2.x &&
            e1CenterX <= rectangle2.x + rectangle2.width &&
            e1CenterY >= rectangle2.y &&
            e1CenterY <= rectangle2.y + rectangle2.height
        );
    }
    

    getNhanVat = (id) => {
        return this.getSpriteMap(id);
    }

    getMy = (id) => {
        return this.getInfoMap(id);
    }

    hanlehoaKhi = (element) => {
        let addnewskill = this.getEff(element.id);
        let donDanh = this.imgEff(addnewskill, element.id);

        let src = [2175,2175,2176,2176,2177,2177];

        let nhanVat = this.getNhanVat(element.uid);
        if(!nhanVat) return element.type = 'delete';

        let my = this.getMy(element.uid);
        if(!my) return element.type = 'delete';

        donDanh.time = donDanh.time || 0;
        donDanh.time += 1;

        donDanh.width = 150;
        donDanh.height = 150;

        donDanh.x = nhanVat.x + Math.abs(nhanVat.width) / 2 - donDanh.width / 2;
        donDanh.y = nhanVat.y + nhanVat.height / 2 - donDanh.height / 2;

        donDanh.pivot.x = donDanh.width / 2;

        donDanh.start = donDanh.start || 0;

        if(donDanh.time%this.fps()) 
        {
            donDanh.start += 1;
            if(donDanh.start >= src.length) donDanh.start = 0;
        }

        donDanh.texture = this.coverImg(src[donDanh.start]);


        if(my.info.act != 'gong') 
        {
            this.action(my.id,'gong');
        }

        if(my.eff.hoakhi.status == false) 
        {
            element.type = 'delete';
            this.action(my.id,'dungyen')
        }


    }


    handeHoaKhiDamChuong = (element) => {
        let nhanVat_from = this.getNhanVat(element.by);
        if(!nhanVat_from) return element.type = 'delete';
        let by = this.getMy(element.by);
        let nhanVat_to = this.getNhanVat(element.aim);
        if(!nhanVat_to) return element.type = 'delete';

        let addnewskill = this.getEff(element.id);
        let donDanh = this.imgEff(addnewskill, element.id);

        let src = [5723,5724];

        donDanh.time = donDanh.time || 0;
        donDanh.time += 1;
        donDanh.width = 150;
        donDanh.height = 150;
        donDanh.start = donDanh.start || 0;

        donDanh.run = donDanh.run || 0;

        donDanh.texture = this.coverImg(src[donDanh.start]);
        if(donDanh.time%this.fps()) {
            donDanh.start += 1;
            if(donDanh.start >= src.length) donDanh.start = 0;
        }


        donDanh.pivot.x = donDanh.width / 2;

        if(donDanh.run == 0) {
            donDanh.x = nhanVat_from.x + Math.abs(nhanVat_from.width)/2  - donDanh.width / 2;
            donDanh.y = nhanVat_from.y + nhanVat_from.height / 2 - donDanh.height / 2;
            donDanh.run = 1;

            this.action(element.by, 'dotay')
            // tween
            /*
            let tween = new TWEEN.Tween(donDanh)
            .to({x : nhanVat_to.x + Math.abs(nhanVat_to.width)/2  - donDanh.width / 2, y : nhanVat_to.y + nhanVat_to.height / 2 - donDanh.height / 2}, 200)
            .easing(TWEEN.Easing.Linear.None)
            .onComplete(() => {
                element.type = 'delete';
                this.resetAction(element.by);
            }
            )
            .start();
            */
        }

        if(donDanh.run == 1) {
            let speed = 50;
            let x = donDanh.x;
            let y = donDanh.y;
            let x1 = nhanVat_to.x + Math.abs(nhanVat_to.width)/2  - donDanh.width / 2;
            let y1 = nhanVat_to.y + nhanVat_to.height / 2 - donDanh.height / 2;
            let x2 = x1 - x;
            let y2 = y1 - y;
            let x3 = x2 / speed;
            let y3 = y2 / speed;
            donDanh.x += x3;
            donDanh.y += y3;
            //if(Math.abs(x1 - donDanh.x) <= 10 && Math.abs(y1 - donDanh.y) <= 10) {
            if(this.vaCham(nhanVat_to, donDanh)) {
                donDanh.visible = false;
                this.addEff({
                    name: 'Kamejoko',
                    aim: element.aim,
                    level: 1,
                    type: "bum",
                });
                element.type = 'delete';
                if(by.id == this.my.id || (element.detu == true && this.my.detu && this.my.detu.id && this.my.detu.id == by.id)) {
                    this.msgAttack(element);
                }
                
            }

        }
        setTimeout(() => {
            this.resetAction(element.by);
        }, 200);

    }

    handeHoaKhiDam = (element) => {
        let by = element.by == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.by);
        if(!by) return element.type = 'delete';
        if(!element.keyid) return element.type = 'delete';

        let addnewskill = this.getEff(element.id);
        let backGround = this.imgEff(addnewskill, 'backGround');

        backGround.start = backGround.start || 0;
        backGround.time = backGround.time + 1 || 0;
        backGround.src = [2146, 2147];

        backGround.texture = backGround.time % this.fps() == 0 ? this.coverImg(backGround.src[backGround.start]) : backGround.texture;
        backGround.start = backGround.time % this.fps() == 0 ? backGround.start + 1 : backGround.start;
        backGround.start = backGround.start >= backGround.src.length ? 0 : backGround.start;
        backGround.width = by.width > backGround.texture.width ? by.width : backGround.texture.width;
        backGround.height = by.height > backGround.texture.height ? by.height : backGround.texture.height;

        backGround.x = by.x - Math.abs(backGround.width) / 2 - Math.abs(by.width) / 2;
        backGround.y = by.y - backGround.height / 2 + by.height / 2;
        backGround.visible = false;
        let playerNew = this.imgEff(addnewskill, 'playerNew');
        playerNew.alpha = 0.8;

        playerNew.start = playerNew.start || 0;
        playerNew.time = playerNew.time + 1 || 0;
        playerNew.src = [2169,2170,2171,2172];




        playerNew.texture = playerNew.time % this.fps() == 0 ? this.coverImg(playerNew.src[playerNew.start]) : playerNew.texture;
        playerNew.start = playerNew.time % this.fps() == 0 ? playerNew.start + 1 : playerNew.start;
        playerNew.start = playerNew.start >= playerNew.src.length ? playerNew.src.length : playerNew.start;

        playerNew.width = Math.abs(by.width) / 100 * 150;
        playerNew.height = Math.abs(by.height) / 100 * 150;
        playerNew.height = playerNew.height > playerNew.texture.height ? playerNew.texture.height : playerNew.height;
        playerNew.width = playerNew.width > playerNew.texture.width ? playerNew.texture.width : playerNew.width;

        playerNew.x = by.x - (playerNew.width) / 2 ;
        playerNew.y = by.y - playerNew.height + by.height;
        playerNew.pivot.x = playerNew.width / 2;

        playerNew.load = playerNew.load || 0;
        playerNew.combo = playerNew.combo || [];
        playerNew.delay = playerNew.delay || 0;
        playerNew.done = playerNew.done || 0;

        if(playerNew.done == 1) {
            return element.type = 'delete';
        }

        if(playerNew.load != 1) {
            for(let i = 1; i <= this.rand(2, 4); i++) {
                playerNew.combo.push(this.base_combo[this.rand(0, this.base_combo.length - 1)]);
            }
            playerNew.load = 1;
        }

        let base_dondam = [
        [2148, 2195],
        [2149, 2198],
        [2162, 2163],
        [2194, 2197],
        [2193, 2196]
        ];


        let donDam = this.imgEff(addnewskill, 'donDam');
        donDam.scale.x = by.huong == 'right' ? 1 : -1;
        donDam.start = donDam.start || 0;
        donDam.time = donDam.time + 1 || 0;
        donDam.id_base = donDam.id_base || this.rand(0, base_dondam.length - 1);
        donDam.src = base_dondam[donDam.id_base];
        donDam.texture = donDam.time % this.fps() == 0 ? this.coverImg(donDam.src[donDam.start]) : donDam.texture;
        donDam.start = donDam.time % this.fps() == 0 ? donDam.start + 1 : donDam.start;
        donDam.start = donDam.start >= donDam.src.length ? donDam.src.length : donDam.start;
        donDam.width = 100;
        donDam.height = 100;
        donDam.x = by.x - donDam.width / 2;
        donDam.y = by.y - donDam.height + by.height;

        if(donDam.start >= donDam.src.length && playerNew.start >= playerNew.src.length && playerNew.delay < Date.now()) {
            donDam.start = 0;
            donDam.id_base = null;
            playerNew.start = 0;
            if(playerNew.combo.length <= 0) {
                this.resetAction(by.id);
                
                if(by.id == this.my.id || (element.detu == true && this.my.detu && this.my.detu.id && this.my.detu.id == by.id)) {
                    this.msgAttack(element);
                }
                return playerNew.done = 1;
            }

            this.addEff({
                type: 'hieuungTrungDon',
                aim: element.aim
            })


            if(playerNew.combo.length >= 1) {
                let infoPlayer = element.by == this.my.id ? this.my : this.Charset.find(e => e.id == element.by);
                if(!infoPlayer) return element.type = "delete";
                if(!infoPlayer.info) return element.type = "delete";
                if(!infoPlayer.info.act) return element.type = "delete";

                infoPlayer.info.act != playerNew.combo[0] && (infoPlayer.info.act == playerNew.combo[0], this.addAction({ id: infoPlayer.id, action: playerNew.combo[0] }))
                playerNew.combo.shift();
            }

        }
    }
}