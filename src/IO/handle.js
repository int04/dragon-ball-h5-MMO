import updateALL from "../update/all.js";
class iohandle extends updateALL {
    constructor() {
        super();
    }

    ioUpdateDeTu = (data) => {
        let id = data._1;
        let detu = data._2;
        let player = data._1 == this.my.id ? this.my : this.Charset.find(e => e.id == data._1);
        if(player) {
            player.detu = detu;
        }
    };

    ioUpdateVatPhamRoiDat = (data) => {
        data._1.type = 'item';
        data._1.info = {
            chiso: {
                hp: 1
            }
        }
        if(data._2) {
            // cập nhật hiệu ứng vứt đồ
            let player = data._2 == this.my.id ? this.my : this.Charset.find(e => e.id == data._2);
            if(player) {
                this.addAction({
                    id: player.id,
                    action: 'dam4'
                })
                setTimeout(() => {
                    this.addAction({
                        id: player.id,
                        action: 'dungyen'
                    })
                }, 200);
            }
        }
        this.Charset.push(data._1);
    }

    ioGetElementOnMap = () => {
        if(this.my.id <= 0) return false;
        this.to('-4');
    }
    checkIdPlayerOnMap = (data) => {
        let id = data._1;
        let player = data._1 == this.my.id ? this.my : this.Charset.find(e => e.id == data._1);
        if(!player) {
            this.ioGetElementOnMap();
        }

    ioUpdateAction = (data) => {
            let Charset = this.Charset;
            let player = Charset.find(e => e.id == data._1);
            if(player) {
                player.info.act = data._2;

            } else {
                this.ioGetElementOnMap();
            }

        }
    }

    ioUpdateInfoSkin = (data) => {
        let my = this.my;
        let Charset = this.Charset;
        let WHO = my.id == data._1 ? my : Charset.find(e => e.id == data._1);
        if(WHO) {
            WHO.info = data._2;
            WHO.skin = data._3;

            if(WHO.id == my.id) 
            {
                this.NhanVatGoc.removeChildren();
                this.TaoSprite2();
                if(!this.checkOnDat22(my.id)){
                    this.xulynamdat(my.id);
                }
            }
            
        } else {
            this.ioGetElementOnMap();

        }
    }

    ioUpdateRuong = (data) => {

        if(!!data._1) {
            this.my.ruong = data._1;
        }
        if(!!data._2) {
            this.my.trangbi = data._2;
        }
        this.clickButton('hanhtrang');
        this.deleteNotice();

    }

    ioUpdateRuongDeTu = (data) => {

        if(!!data._1) {
            this.my.ruong = data._1;
        }
        if(!!data._2) {
            this.my.detu.trangbi = data._2;
        }
        if(!!data._3) {
            this.my.detu.info = data._3;
        }
        this.clickButton('detu');
        this.deleteNotice();

    }

    ioInsertChat = (data) => {
        let logChat = this.logChat;
        for(let i = 0; i < logChat.length; i++) {
            if(logChat[i].uid == data._1) {
                logChat[i].type = 'delete';
            }
        }
        logChat.push({
            id: this.randomAZ(10),
            uid: data._1,
            text: data._2,
            type: 'chat'
        })
    }


    ioInsertInfoPlayer = (data) => {
        let my = this.my;
        let Charset = this.Charset;
        if(data._1.id == my.id) {
            this.my = data._1;
        } else {
            let Charplayer = Charset.find(e => e.id == data._1.id);
            if(Charplayer) {
                Object.assign(Charplayer, data._1);
            } else {
                Charset.push(data._1);
            }
        }
    }

    ioInsertAttackInfo = (data) => {
        let cover = {};
        cover.fromID = data._1;
        cover.toID = data._2;
        cover.value = data._3;
        cover.type = data._4;
        cover.from = data._5;
        cover.to = data._6;
        return this.reposiveAttackInfo(cover);
    }

    ioInsertAttackEFF = (data) => {
        let cover = {};
        cover.from = data._1;
        cover.type = data._2;
        cover.keyid = data._3;
        cover.to = data._4;
        this.reposiveSkillEff(cover);
    }

    ioInsertAttack = (data) => {
        let cover = {};
        cover.from = data._1;
        cover.type = data._2;
        cover.id = data._3;
        cover.level = data._4;
        cover.victim = data._5;
        cover.keyid = data._6;
        cover.detu = data._7;
        return this.reposiveAttack(cover);
    }

    ioUpdateMobInmap = (data) => {
        let Charset = this.Charset;
        let self = this;
        for(let i = 0; i < data._1.length; i++) {
            let element = data._1[i];
            let mob = Charset.find(e => e.id == element._1);
            if(mob) {
                mob.pos.x = element._2.x >> 0;
                if(mob.namdat == false) {
                    mob.pos.y = element._2.y >> 0;
                }
                mob.info.move = element._3;
                mob.info.act = mob.info.act != 'attack' ? element._4 : 'attack';
                mob.eff = element._5;
                self.addAction({
                    id: mob.id,
                    action: mob.info.act,
                })

            } else {
                self.ioGetElementOnMap();
                break;
            }

        }

    }



    ioInsertPlayer = (data) => {

        if(this.my.id <= 0) return;

        


        if(this.loadGame.visible == true ) {
        }


        if(!data) return false;

        let Charset = this.Charset;

        if(!!data._5) {
            let Charset = this.Charset;

            for(let i = 0; i < data._5.length; i++) {
                if(Charset.find(e => e.id == data._5[i].id) == undefined) {
                    let npc = data._5[i];
                    let ao = "";
                    let quan = "";
                    let dau = "";
                    ao = npc.script.ao;
                    quan = npc.script.quan;
                    dau = npc.script.dau;
                    if(npc.script.theobo) {
                        let findnameAo = this.images.find(e => e.id == npc.script.theobo && e.type == 'ao');
                        if(findnameAo) ao = findnameAo.name;
                        let findnameQuan = this.images.find(e => e.id == npc.script.theobo && e.type == 'quan');
                        if(findnameQuan) quan = findnameQuan.name;
                        let findnameDau = this.images.find(e => e.id == npc.script.theobo && e.type == 'dau');
                        if(findnameDau) dau = findnameDau.name;

                    }

                    Charset.push({
                        source: npc,
                        type: 'npc',
                        id: npc.id,
                        name: npc.name,
                        eff: {
                            choang: {
                                time: 0,
                            }
                        },
                        skin: {
                            ao: ao,
                            quan: quan,
                            dau: dau,
                        },
                        info: {
                            chiso: {
                                hp: 1,
                                hpFull: 1,
                            },
                            coban: {
                                avatar: "516",
                                sucmanh: 100,
                            },
                            'act': 'dungyen',
                            'move': npc.move || 'right',
                            'right': npc.auto || false,
                            speed: 1,

                        },
                        pos: {
                            map: npc.map.map,
                            x: npc.map.x,
                            y: npc.map.y,

                        },


                    })
                }

            }
        }

       
        if(!!data._2) {
            let Charset = this.Charset;

            for(let i = 0; i < data._2.length; i++) {
                if(Charset.find(e => e.id == data._2[i].id) == undefined)
                    Charset.push(data._2[i]);
            }
        }

        if(!!data._3) {
            let Charset = this.Charset;

            for(let i = 0; i < data._3.length; i++) {
                if(Charset.find(e => e.id == data._3[i].id) == undefined) {
                    data._3[i].type = 'item';
                    data._3[i].info = {
                        chiso: {
                            hp: 1
                        }
                    }
                    Charset.push(data._3[i]);
                }

            }
        }

        if(!!data._4) {
            let Charset = this.Charset;

            for(let i = 0; i < data._4.length; i++) {
                if(Charset.find(e => e.id == data._4[i].id) == undefined) {
                    // change name zone;
                    let to = data._4[i].target.map;
                    let findMap = this.listMap.find(e => e.id == to);
                    if(findMap) {
                        data._4[i].name = findMap.name;
                    }
                    data._4[i].type = 'zone';
                    data._4[i].info = {
                        chiso: {
                            hp: 1
                        }
                    }
                    Charset.push(data._4[i]);
                }

            }
        }

        if(!!data._1) {
            let Charset = this.Charset;
            // add new player
            for(let i = 0; i < data._1.length; i++) {
                if( data._1[i].id == this.my.id) continue;
                if(Charset.find(e => e.id == data._1[i].id) == undefined)
                    Charset.push(data._1[i]);
            }
        }


       
        if(!!data._6) {
            let Charset = this.Charset;
            for(let i = 0; i < data._6.length; i++) {
                if(Charset.find(e => e.id == data._6[i].id) == undefined)
                {
                    let dataset = data._6[i];
                    let ao = "";
                    let quan = "";
                    let dau = "";
                    ao = dataset.skin.ao;
                    quan = dataset.skin.quan;
                    dau = dataset.skin.dau;
                    if(dataset.skin.theobo) {
                        let findnameAo = this.images.find(e => e.id == dataset.skin.theobo && e.type == 'ao');
                        if(findnameAo) ao = findnameAo.name;
                        let findnameQuan = this.images.find(e => e.id == dataset.skin.theobo && e.type == 'quan');
                        if(findnameQuan) quan = findnameQuan.name;
                        let findnameDau = this.images.find(e => e.id == dataset.skin.theobo && e.type == 'dau');
                        if(findnameDau) dau = findnameDau.name;

                    }

                    dataset.skin.ao = ao;
                    dataset.skin.quan = quan;
                    dataset.skin.dau = dau;


                    Charset.push(dataset);


            }
        }
        }

        // for this.nguoichoi 
        this.resetNone();




    }

    IoMovePlayer = (data) => {
        let Charset = this.Charset;
        let player = Charset.find(e => e.id == data._1);
        if(player) {
            player.pos.x = data._2 >> 0;
            player.pos.y = data._3 >> 0;
            player.info.move = data._4 == 1 ? 'right' : 'left';
            player.info.act = data._5;
        } else {
            console.log('ko tim thay player', data._1)
            this.ioGetElementOnMap();
        }
    }


    resetNone = () => {
        for(let i = 0; i < this.nguoichoi.children.length; i++) {
            let element = this.nguoichoi.children[i];
            if(element.type == 'detu') {
                let detu = this.Charset.find(e => e.id == element.id);
                if(!detu) {
                    this.deleteNguoiChoi(element.id);
                } else {
                    let sp = this.Charset.find(e => e.id == element.of);
                    if(!sp) {
                        this.deleteNguoiChoi(element.id);
                    }
                }
            } else {
                let player = this.Charset.find(e => e.id == element.id);
                if(!player) {
                    this.deleteNguoiChoi(element.id);
                }
            }
        }
    }


    logInGame = () => {
        if(!!this.username == false || this.username.length < 1) return this.pageLogin();
        if(!!this.password == false || this.password.length < 1) return this.pageLogin();

        this.loadGame.visible = true;
        this.to("-1", {
            _1: this.username,
            _2: this.password,
        })
    }

    outGame = () => {
        this.Charset = [];
        this.resetNone();
        this.guestContainer.visible = true;
        this.my.id = 0;
        this.CreateMainGuestGame();
        this.to(-14);
    }

    IoMap = (data) => {

        let base = data._1;
        let map = data._2;
        let zone = data._3;
        

        let more = data._6;
        this.mapMore = {};

        this.nen.tint = 0x155e1d;
        this.bando_channuixa.tint = 0x147415;
        this.bando_chantroi.tint = 0x49b45b;
        this.app.renderer.background.color = 0x19b0f8;


        this.stopMusic();

        if(more) {
            let color = more.color;
            if(color) {
                this.nen.tint = color.chan || 0x155e1d;
                this.bando_channuixa.tint = color.channui || 0x147415;
                this.bando_chantroi.tint = color.chantroi || 0x49b45b;
                this.app.renderer.background.color = color.background || 0x19b0f8;
            }
            if(more.music) 
            {
                this.playMusic(more.music,true);
            }
        }


        this.mapMore = more;




        let my = this.my;
        if(my.id >= 1) {
            my.pos.map = map;
            my.pos.zone = zone;
            this.sendMyMove();
        }
        this.cacheMap = base;
        this.Charset = [];

        if(data._7) {
            this.ioInsertPlayer(data._7);
        }
        this.LoadAssetMap();

    }
    
    a = (id) => {
        this.to(-27,id);
    }

}

export {
    iohandle
}
