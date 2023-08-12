import updateMouseClass from "./pointer.js";

/**
 * @snowlyvn
 * @desc: update eff on player,...
 */
class eff extends updateMouseClass {
    constructor() {
        super();
        requestAnimationFrame(this.init);
    }

    getEff2 = (id) => {
        let kiNang = this.nennhanvat;
        if(kiNang.getChildByName(id) == undefined) {
            let addnewskill = new PIXI.Container();
            addnewskill.id = id;
            addnewskill.name = id;
            kiNang.addChild(addnewskill);
            return addnewskill;
        } else {
            return kiNang.getChildByName(id);
        }
    }

    getEff = (id) => {
        let kiNang = this.kiNang;
        if(kiNang.getChildByName(id) == undefined) {
            let addnewskill = new PIXI.Container();
            addnewskill.id = id;
            addnewskill.name = id;
            kiNang.addChild(addnewskill);
            return addnewskill;
        } else {
            return kiNang.getChildByName(id);
        }
    }



    imgEff(chidren, name) {
        if(chidren.getChildByName(name) == undefined) {
            let img = new PIXI.Sprite();
            img.name = name;
            img.x = null;
            img.y = null;
            chidren.addChild(img);
            return img;
        } else {
            return chidren.getChildByName(name);
        }
    }

    textEff(chidren, name) {
        if(chidren.getChildByName(name) == undefined) {
            let text = new PIXI.Text();
            text.name = name;
            text.x = null;
            text.y = null;
            chidren.addChild(text);
            return text;
        } else {
            return chidren.getChildByName(name);
        }
    }

    msgAttack = function(element) {
        this.to(-6, element.keyid);
    }


    resetAction = function(id) {
        let my = this.my;
        let NhanVat = this.NhanVat;
        let nguoichoi = this.nguoichoi;

        let getPlayer = id == my.id ? NhanVat : nguoichoi.getChildByName(id);
        if(!getPlayer) return;

        getPlayer.actionReset = getPlayer.actionReset || 'dungyen';
        this.addAction({
            id: id,
            action: getPlayer.actionReset,
        })
    }

    checkAction = function(id, name) {
        let my = this.my;
        let NhanVat = this.NhanVat;
        let nguoichoi = this.nguoichoi;
        let Charset = this.Charset;
        let infoPlayer = id == my.id ? my : this.Charset.find(e => e.id == id);
        if(!infoPlayer) return;
        if(!infoPlayer.info) return;
        if(!infoPlayer.info.act) return;
        if(infoPlayer.info.act != name) {
            infoPlayer.info.act = name;
            this.addAction({
                id: id,
                action: name,
            })
        }
    }

    createArray(start, max) {
        return Array.from({ length: max - start + 1 }, (_, i) => i + start);
    }


    init = () => {
        let dataSkill = this.dataSkill;
        let logChat = this.logChat;


        dataSkill.forEach((element) => {

            if(!element.timeOfSkill) {
                element.timeOfSkill = Date.now() + 120 * 1000;
            } else if(element.timeOfSkill < Date.now()) {
                element.type = "delete";
            }


            if(element.dame >= 1) {
                let to = element.aim;
                let from = element.by;

                if(from == this.my.id) {
                    if(this.my.info.chiso.hp <= 0) return (element.type = "delete");
                } else {}
            }

            if(element.type == "delete") {
                if(element.sound) {
                    this.deleteSound(element.sound);
                }
                if(this.kiNang.getChildByName(element.id) != undefined) {
                    this.kiNang.removeChild(this.kiNang.getChildByName(element.id));
                }

                if(this.nennhanvat.getChildByName(element.id) != undefined) {
                    this.nennhanvat.removeChild(this.nennhanvat.getChildByName(element.id));
                }
                

                this.dataSkill = this.dataSkill.filter(function(obj) {
                    return obj.id !== element.id;
                });
            }

            if(element.type == 'kamejoko') {
                return this.handleKamejoko(element);
            }

            if(element.type == 'hoakhi') 
            {
                return this.hanlehoaKhi(element);
            }

            if(element.type == 'dungyen') {
                return this.EffPlayer(element);
            }

            if(element.type == 'hoakhi') 
            {
                return this.hanlehoaKhi(element);
            }

            if(element.type == 'nangcap') {
                let nangcap = this.screen.getChildByName('nangcap');
                if(!nangcap) {
                    nangcap = new PIXI.Container();
                    nangcap.name = 'nangcap';
                    this.screen.addChild(nangcap);
                    let manden = this.snowlyGraphics(this.gameWidth, this.gameHeight, 0x000000, 0x000000, 0.5, 0, 0.5);
                    manden.name = 'manden';
                    nangcap.addChild(manden);
                }
                let mauden = nangcap.getChildByName('manden');

                let tinhW = mauden.width * 0.9;
                let tinhH = mauden.height * 0.5;

                if(tinhW > 700) tinhW = 700;

                let nen2 = mauden.getChildByName('nen2');
                if(!nen2) {
                    nen2 = this.snowlyGraphics(tinhW, tinhH, 0xffffff, 0x000000, 0.0001, 0, 0);
                    nen2.name = 'nen2';
                    nen2.x = mauden.width / 2 - nen2.width / 2;
                    nen2.y = mauden.height / 2 - nen2.height / 2;
                    mauden.addChild(nen2);


                    let img = new PIXI.Sprite(this.coverImg(element.idvp));
                    img.width = 48;
                    img.x = nen2.width / 2 - img.width / 2;
                    img.y = nen2.y;
                    img.name = 'img';
                    nen2.addChild(img);
                    img.time = 0;
                    img.eff = this.rand(10, 20);
                    img.run = 0;

                }

                let img = nen2.getChildByName('img');

                if(img.run == 0 && img.eff >= 1) {


                    for(let q = 0; q <= this.rand(1, 10); q++) {
                        img.run = 1;
                        img.eff -= 1;

                        let img2 = new PIXI.Sprite(this.coverImg(element.da));
                        let x, y;
                        if(this.rand(1, 10) <= 5) x = this.rand(-10, 0);
                        else x = this.rand(this.gameWidth, this.gameWidth + 10);

                        if(this.rand(1, 10) <= 5) y = this.rand(-10, 0);
                        else y = this.rand(this.gameHeight, this.gameHeight + 10);
                        img2.x = x;
                        img2.y = y;
                        let withgoc = img2.width;
                        let heightgoc = img2.height;
                        img2.width = 48;
                        img2.height = 48;
                        this.screen.addChild(img2);

                        // get img point center
                        let imgPosion = img.toGlobal(new PIXI.Point(0, 0));



                        // tween img2 to img
                        let tween = new TWEEN.Tween(img2)
                            .to({ x: imgPosion.x, y: imgPosion.y }, 300)
                            .onComplete(() => {

                                img.timeCham = Date.now() + 300;

                                this.screen.removeChild(img2);

                                let listEff = this.createArray(1, 21);
                                let frames = [];
                                let type = 'success';
                                type = element.up == 1 ? type : 'fail';
                                let src = type == 'success' ? 'other/sao' : 'other/fai';
                                listEff = type == 'success' ? listEff : this.createArray(1, 16);
                                for(let j = 0; j < listEff.length; j++) {
                                    frames.push(this.coverImg(listEff[j], src));
                                }


                                if(img.eff <= 0) {

                                    this.ioInsertChat({
                                        _1: element.npc, // id npc
                                        _2: type == 'success' ? 'Chúc mừng con nhé !' : 'Xin lỗi ta đã cố hết sức.',
                                    })

                                    let textureArray = frames;
                                    let sao = new PIXI.AnimatedSprite(textureArray);
                                    // sao is center of img
                                    sao.x = imgPosion.x + img.width / 2 - sao.width / 2;
                                    sao.y = imgPosion.y + img.height / 2 - sao.height / 2;
                                    sao.animationSpeed = 0.5;
                                    sao.loop = false;
                                    sao.play();
                                    sao.name = 'eff';
                                    this.screen.addChild(sao);
                                    //check complete
                                    sao.onComplete = () => {
                                        this.screen.removeChild(sao);
                                        this.boxNangCapLv(element.npc);
                                        element.type = 'delete';
                                        this.screen.removeChild(nangcap);
                                    }
                                } else {
                                    img.run = 0;
                                }


                            })
                            .start();
                    }



                }
                img.time++;

                if(img.timeCham >= Date.now()) {
                    if(img.time % 2 == 0) {
                        img.x += 1;
                    } else {
                        img.x -= 1;
                    }
                }




            }

            if(element.type == 'boom') {
                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, element.id);
                donDanh.src = [2175, 2176, 2177];
                donDanh.time = donDanh.time + 1 || 0;
                donDanh.start = donDanh.start || 0;
                donDanh.width = 150;
                donDanh.height = 150;
                let sprite = element.from == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.from);
                if(!sprite) return element.type = 'delete';

                donDanh.x = sprite.x - donDanh.width / 2 - Math.abs(sprite.width) / 2;
                donDanh.y = sprite.y - donDanh.height / 2 + sprite.height / 2;

                /*
                donDanh.texture = donDanh.time % this.fps() == 0 ? this.coverImg(donDanh.src[donDanh.start]) : donDanh.texture;
                donDanh.start = donDanh.time % this.fps() == 0 ? donDanh.start + 1 : donDanh.start;
                donDanh.start >= donDanh.src.length && (donDanh.start = 0);
                */ 

                donDanh.animation = donDanh.animation || 10;

                if(donDanh.animation == 10) {
                    donDanh.animation = 4;
                    let animation = this.animation(donDanh.src,0.5,true);
                    animation.width = 150;
                    animation.height = 150;
                    animation.x = sprite.x - donDanh.width / 2 - Math.abs(sprite.width) / 2;
                    animation.y = sprite.y - donDanh.height / 2 + sprite.height / 2;
                    animation.name = 'animation';
                    addnewskill.addChild(animation);
                }

                let animation = addnewskill.getChildByName('animation');
                if(animation) {
                    animation.width = 150;
                    animation.height = 150;
                }
                


                this.checkAction(element.from, 'gong');

                donDanh.run = donDanh.run || 0;
                donDanh.eff = donDanh.eff || this.rand(40,60);
                // hiệu ứng tích tụ các năng lượng

                if(donDanh.run == 0 && donDanh.eff >= 1) {
                    donDanh.run = 1;

                    for(let q = 0; q <= this.rand(10, 30); q++) {
                        donDanh.eff -= 1;
                        let img2 = new PIXI.Sprite(this.coverImg(this.rand(1,5) == 1 ? 64 : 438));
                        let x, y;
                        if(this.rand(1, 10) <= 5) x = this.rand(this.gameMap.setting.minX-10, this.gameMap.setting.minX);
                        else x = this.rand(this.gameMap.setting.maxX, this.gameMap.setting.maxX + 10);

                        if(this.rand(1, 10) <= 5) y = this.rand(this.gameMap.setting.minY - 10, this.gameMap.setting.minY);
                        else y = this.rand(this.gameMap.setting.maxY, this.gameMap.setting.maxY + 10);
                        img2.x = x;
                        img2.y = y;
                        img2.width = 48;
                        img2.height = 48;
                        addnewskill.addChild(img2);

        
                        let tween = new TWEEN.Tween(img2)
                            .to({ x: donDanh.x + donDanh.width/2, y: donDanh.y + donDanh.height/2 }, 500)
                            .onComplete(() => {

                                addnewskill.removeChild(img2);
                                if(donDanh.eff <= 0) {

                                    this.resetAction(element.from);
                                    this.addEff({
                                        type: "nhapnhay",
                                    });
                                    if(element.from == this.my.id || (element.detu == true && this.my.detu && this.my.detu.id && this.my.detu.id == element.from)) this.msgAttack(element);
                                    element.type = 'delete';
                                } 
                                else 
                                {
                                    donDanh.run = 0;
                                }


                            })
                            .start();
                    }



                }


                if(donDanh.time >= 60 * this.fps()) {
                    
                }


            } else

            if(element.type == 'loop') {
                let sprite = element.aim == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.aim);
                if(!sprite) {
                    return element.type = 'delete';
                }

                if(!element.src) return element.type = 'delete';

                if(sprite.visible == false) return element.type = 'delete';



                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, element.id);
                donDanh.src = element.src;
                donDanh.time = donDanh.time + 1 || 0;
                donDanh.start = donDanh.start || 0;
                donDanh.width = element.width || 100;
                donDanh.height = element.height || 100;
                donDanh.run = donDanh.run || 0;
                donDanh.visible = false;

                donDanh.x = sprite.x - donDanh.width / 2 - Math.abs(sprite.width) / 2;
                donDanh.y = sprite.y  - donDanh.height + sprite.height ;
                donDanh.pivot.x = sprite.width/2;

                if(donDanh.time % this.fps() == 0) {
                    donDanh.texture = this.coverImg(donDanh.src[donDanh.start], (element.folder || 'char'));
                    donDanh.start++;
                }
                if(donDanh.start >= donDanh.src.length) {
                    donDanh.start = 0;
                }



            } else

            if(element.type == 'chung') {
                let sprite = element.aim == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.aim);
                if(!sprite) {
                    return element.type = 'delete';
                }
                if(!element.src) return element.type = 'delete';


                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, element.id);
                donDanh.src = element.src;
                donDanh.time = donDanh.time + 1 || 0;
                donDanh.start = donDanh.start || 0;
                donDanh.width = element.width || 100;
                donDanh.height = element.height || 100;
                donDanh.run = donDanh.run || 0;

                donDanh.x = sprite.x - donDanh.width / 2 - Math.abs(sprite.width) / 2;
                donDanh.y = sprite.y - donDanh.height / 2 + sprite.height / 2;

                if(donDanh.time % this.fps() == 0) {
                    donDanh.texture = this.coverImg(donDanh.src[donDanh.start], (element.folder || 'char'));
                    donDanh.start++;
                }
                if(donDanh.start >= donDanh.src.length) {
                    element.type = 'delete';
                }
            } else



            if(element.type == 'hieuungSAo') {
                let sprite = element.aim == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.aim);
                if(!sprite) return element.type = 'delete';

                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, element.id);
                donDanh.src = this.createArray(1, 21);
                donDanh.time = donDanh.time + 1 || 0;
                donDanh.start = donDanh.start || 0;
                donDanh.width = 200;
                donDanh.height = 200;
                donDanh.run = donDanh.run || 0;

                donDanh.x = sprite.x - donDanh.width / 2 - Math.abs(sprite.width) / 2;
                donDanh.y = sprite.y - donDanh.height / 2 + sprite.height / 2;

                if(donDanh.time % this.fps() == 0) {
                    donDanh.texture = this.coverImg(donDanh.src[donDanh.start], 'other/sao');
                    donDanh.start++;
                }
                if(donDanh.start >= donDanh.src.length) {
                    element.type = 'delete';
                }
            } else

            if(element.type == 'hieuungTrungDon') {
                let sprite = element.aim == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.aim);
                if(!sprite) return element.type = 'delete';

                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, element.id);
                donDanh.src = [730, 731, 732, 733];
                donDanh.time = donDanh.time + 1 || 0;
                donDanh.start = donDanh.start || 0;
                donDanh.width = 70;
                donDanh.height = 70;
                donDanh.run = donDanh.run || 0;

                donDanh.maxX = donDanh.maxX || sprite.x;
                donDanh.minX = donDanh.minX || sprite.x - donDanh.width;
                donDanh.maxY = donDanh.maxY || sprite.y + sprite.height;
                donDanh.minY = donDanh.minY || sprite.y - donDanh.height;

                if(donDanh.run != 10) {
                    donDanh.x = this.rand(donDanh.minX, donDanh.maxX);
                    donDanh.y = this.rand(donDanh.minY, donDanh.maxY);
                    donDanh.run = 10;
                }

                if(donDanh.time % this.fps() == 0) {
                    donDanh.texture = this.coverImg(donDanh.src[donDanh.start]);
                    donDanh.start++;
                }
                if(donDanh.start >= donDanh.src.length) {
                    element.type = 'delete';
                }

            } else

            if(element.type == "duoccuu") {
                let sprite =
                    element.from == this.my.id ?
                    this.NhanVat :
                    this.nguoichoi.getChildByName(element.from);
                let sql =
                    element.from == this.my.id ? this.my : this.Charset.find((e) => e.id == element.from);
                if(!sprite) return (element.type = "delete");
                if(!sql) return (element.type = "delete");

                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, "hieuung1");
                let src = [744, 745, 746];
                donDanh.width = 70;
                donDanh.height = 70;
                donDanh.x = sprite.x - donDanh.width / 2 - Math.abs(sprite.width) / 2;
                donDanh.y = sprite.y;
                donDanh.time = donDanh.time || 0;
                donDanh.start = donDanh.start || 0;
                donDanh.time++;

                if(donDanh.time % this.fps() == 0) {
                    donDanh.texture = this.coverImg(src[donDanh.start]);
                    donDanh.start++;
                }
                if(donDanh.start >= src.length) {
                    element.type = "delete";
                }
            } else

            if(element.type == "dicuu") {
                let sprite =
                    element.from == this.my.id ?
                    this.NhanVat :
                    this.nguoichoi.getChildByName(element.from);
                let sql =
                    element.from == this.my.id ? this.my : this.Charset.find((e) => e.id == element.from);
                if(!sprite) return (element.type = "delete");
                if(!sql) return (element.type = "delete");

                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, "hieuung1");
                let src = [693, 694, 695, 706, 707, 708, 709, 710];
                donDanh.width = 70;
                donDanh.height = 70;
                donDanh.x = sprite.x - donDanh.width / 2 - Math.abs(sprite.width) / 2;
                donDanh.y = sprite.y;
                donDanh.time = donDanh.time || 0;
                donDanh.start = donDanh.start || 0;
                donDanh.time++;

                if(sql.info.act != "gong") {
                    sprite.action = sql.info.act;
                    sql.info.act = "gong";
                    this.addAction({
                        id: sql.id,
                        action: "gong",
                    });
                }

                if(donDanh.time % this.fps() == 0) {
                    donDanh.texture = this.coverImg(src[donDanh.start]);
                    donDanh.start++;
                    donDanh.start >= src.length && (donDanh.start = 0);
                }

                let donBuff = this.imgEff(addnewskill, "hieuung2");
                donBuff.time = donBuff.time + 1 || 0;
                donBuff.start = donBuff.start || 0;
                donBuff.src = [738, 739, 740, 741, 742, 743];
                donBuff.texture = donBuff.time % this.fps() == 0 ? this.coverImg(donBuff.src[donBuff.start]) : donBuff.texture;
                donBuff.start = donBuff.time % this.fps() == 0 ? donBuff.start + 1 : donBuff.start;
                donBuff.scale.x = sprite.huong == "right" ? 1 : -1;
                donBuff.width = 70;
                donBuff.height = 70;

                donBuff.visible = false;

                donBuff.x = sprite.x - Math.abs(sprite.width) + sprite.width / 2;
                donBuff.y = sprite.y - donBuff.height / 2 + sprite.height / 2;
                donBuff.pivot.x = donBuff.width / 2;
                donBuff.visible = true;

                if(donBuff.start >= donBuff.src.length) {
                    element.type = "delete";
                    if(sql.info.act == "gong") {
                        this.resetAction(sql.id);
                    }
                }
            } else

            if(element.type == "tdhseff") {
                let sprite =
                    element.from == this.my.id ?
                    this.NhanVat :
                    this.nguoichoi.getChildByName(element.from);
                let sql =
                    element.from == this.my.id ? this.my : this.Charset.find((e) => e.id == element.from);
                if(!sprite) return (element.type = "delete");
                if(!sql) return (element.type = "delete");

                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, "hieuung1");
                let src = [48, 49, 50, 51, 53, 54, 55, 979];
                donDanh.width = 70;
                donDanh.height = 70;
                donDanh.x = sprite.x - donDanh.width / 2 - Math.abs(sprite.width) / 2;
                donDanh.y = sprite.y;
                donDanh.time = donDanh.time || 0;
                donDanh.start = donDanh.start || 0;
                donDanh.time++;

                if(sql.info.act != "gong") {
                    sprite.action = sql.info.act;
                    sql.info.act = "gong";
                    this.addAction({
                        id: sql.id,
                        action: "gong",
                    });
                }

                if(donDanh.time % this.fps() == 0) {
                    donDanh.texture = this.coverImg(src[donDanh.start]);
                    donDanh.start++;
                }
                if(donDanh.start >= src.length) {
                    element.type = "delete";
                    if(sql.info.act == "gong") {
                        this.resetAction(sql.id);
                    }
                }
            }
            else

            if(element.type == 'phithuyenxuong')
            {
                return this.phithuyen_Handle(element);
            }

            if(element.type == 'phithuyen')
            {
                return this.phithuyenHandle(element);
            }
            else

            if(element.type == 'moveonDat')
            {
                return this.moveEFF(element);
            }
            else
            if(element.type == "flyKI_first2") 
            {
                return this.baylenEFF2(element);
            }
           

            if(element.type == "flyKI_first") 
            {
                return this.baylenEFF(element);
            }
            else
            if(element.type == "flyKI") {
                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, element.id);
                element.level = 1;
                let infoSkill = this.checkSkill(element.name, element.level);
                if(!infoSkill) return element.type = 'delete';

                let mucTieu = element.by == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.by);
                if(!mucTieu) return element.type = 'delete';
                let startSkill = infoSkill.start;

                donDanh.start = donDanh.start || 0;
                donDanh.time = donDanh.time + 1 || 0;

                let quan = element.by == this.my.id ? this.NhanVat.getChildByName('quan') : mucTieu.getChildByName('playerQuan');
                if(!quan) return element.type = 'delete';

                donDanh.scale.x = 1;
                donDanh.height = 70;
                donDanh.width = 100;

                element.sound = this.playSound("bayKI",false,mucTieu.x,mucTieu.id+"_fly");


                /*
                if(mucTieu.huong == "right") {
                    donDanh.x = mucTieu.x - donDanh.width - quan.width;
                    donDanh.y = mucTieu.y - donDanh.height / 2;
                }

                if(mucTieu.huong == "left") {
                    startSkill = infoSkill.end;
                    donDanh.x = mucTieu.x + Math.abs(mucTieu.width) - donDanh.width / 2 -
                        quan.width;


                    donDanh.y = mucTieu.y - donDanh.height / 2;
                }
                */
                donDanh.y = mucTieu.y - donDanh.height / 2;
                donDanh.x = mucTieu.x - mucTieu.width - donDanh.width + quan.width/2;

                if(mucTieu.huong == 'left')
                {
                    donDanh.scale.x = -1;
                    donDanh.width = 100;
                    donDanh.x = mucTieu.x  + 100 - quan.width/2;
                }

                if(donDanh.time % this.fps() == 0 && donDanh.time >= (this.fps() * 5)) {
                    donDanh.texture = this.coverImg(startSkill.src[donDanh.start]);
                    donDanh.start++;

                    if(donDanh.start >= startSkill.src.length) {
                        donDanh.start = 0;
                    }

                    donDanh.visible = true;
                }




            } else
            if(element.type == "end") {
                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, element.id);
                element.level = 1;
                let infoSkill = this.checkSkill(element.name, element.level);
                let mucTieu = element.aim == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.aim);
                if(!mucTieu) return element.type = 'delete';
                if(!infoSkill) return element.type = 'delete';

                let from = element.by == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.by);
                if(!from) element.type = 'delete';

                let startSkill = infoSkill.end;
                donDanh.width = 45;
                donDanh.height = 45;
                donDanh.time = donDanh.time + 1 || 0;
                donDanh.start = donDanh.start || 0;

                donDanh.x = mucTieu.x - Math.abs(mucTieu.width) / 2 - donDanh.width / 2;
                donDanh.y = mucTieu.y + Math.abs(mucTieu.height) / 2 - donDanh.height / 2;

                donDanh.texture = donDanh.time % this.fps() == 0 ? this.coverImg(startSkill.src[donDanh.start]) : donDanh.texture;
                donDanh.start = donDanh.time % this.fps() == 0 ? donDanh.start + 1 : donDanh.start;

                (donDanh.start >= startSkill.src.length) && (element.type = 'delete');

            } else

            if(element.type == "donDam") {

                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, element.id);
                element.level = 1;
                let mucTieu = element.aim == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.aim);
                if(!mucTieu) return element.type = "delete";
                let from = element.by == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.by);
                if(!from) return element.type = "delete";

                donDanh.time = donDanh.time + 1 || 0;
                donDanh.start = donDanh.start || 0;

                element.volume = element.volume || 1;
                if(element.volume == 1) 
                {
                    element.volume = 2;
                    this.playSound("dam"+this.rand(1,3),false,from.x,from.id+"_dondam");
                }



                donDanh.combo = donDanh.combo || Object.create(this.spriteComBo[this.rand(0, this.spriteComBo.length - 1)].data);
                //donDanh.combo = donDanh.combo || Object.create(this.spriteComBo[0].data);
                donDanh.createAction = donDanh.createAction || 0;
                if(donDanh.createAction == 0) {
                    donDanh.createAction = 1;
                    donDanh.combo.forEach(element => {
                        element.action = this.base_combo[this.rand(0, this.base_combo.length - 1)];
                    });
                }

                let infoPlayer = element.by == this.my.id ? this.my : this.Charset.find(e => e.id == element.by);
                if(!infoPlayer) return element.type = "delete";
                if(!infoPlayer.info) return element.type = "delete";
                if(!infoPlayer.info.act) return element.type = "delete";

                donDanh.oldACT = donDanh.oldACT || infoPlayer.info.act;
                donDanh.delay = donDanh.delay || 0;

                let data_skill = donDanh.combo;
                if(data_skill.length <= 0) return (element.type = "delete");

                if(donDanh.delay < Date.now() && donDanh.time % this.fps() == 0) {
                    donDanh.visible = true;
                    data_skill = data_skill[0];
                    data_skill.action = data_skill.action;
                    infoPlayer.info.act != data_skill.action && (infoPlayer.info.act = data_skill.action, this.addAction({
                        id: element.by,
                        action: data_skill.action,
                    }));
                    donDanh.scale.x = from.huong == 'right' ? 1 : -1;
                    donDanh.texture = this.coverImg(data_skill.group[donDanh.start]);
                    donDanh.width = donDanh.texture.baseTexture.width > 70 ? 70 : donDanh.texture.baseTexture.width;
                    donDanh.height = donDanh.texture.baseTexture.height > 70 ? 70 : donDanh.texture.baseTexture.height;
                    donDanh.x = from.x - donDanh.width / 2;
                    donDanh.y = from.y + from.height / 2 - donDanh.height / 2;
                    donDanh.start = donDanh.start + 1;

                    if(donDanh.start >= data_skill.group.length) {
                        donDanh.delay = data_skill.delay ? Date.now() + data_skill.delay : 0;
                        donDanh.start = 0;
                        donDanh.combo.shift();

                        if(donDanh.combo.length <= 0) {
                            donDanh.done = 1;
                        }
                    }

                }

                if(donDanh.done && donDanh.done == 1) {
                    this.resetAction(element.by);

                    this.addEff({
                        name: element.name,
                        level: 1,
                        startX: element.startX,
                        startY: element.startX,
                        aim: element.aim,
                        type: "end",
                        by: element.by,
                    });

                    if(element.by == this.my.id || (element.detu == true && this.my.detu && this.my.detu.id && this.my.detu.id == element.by)) this.msgAttack(element);
                    element.type = "delete";
                }


            } else

            if(element.type == 'qckknew')
            {
                return this.handleQCKK(element);
            }

            else 

            if(element.type == 'khieng')
            {
                return this.hanleKhieng(element);
            }

            else 


            if(element.type == "dongdat") {
                let addnewskill = this.getEff(element.id);
                let donDanh = this.textEff(addnewskill, element.id);
                element.level = 1;
                donDanh.visible = false;
                donDanh.time = donDanh.time + 1 || 0;
                donDanh.start = donDanh.start || 0;
                donDanh.c = 0.1;
                donDanh.goc = inGame.y;
                const amplitude = 10;
                const frequency = 0.1;
                donDanh.c += 0.1;
                inGame.y = Math.sin(donDanh.c * frequency) * amplitude;

                (donDanh.time >= 60 * this.fps()) && (element.type = "delete") && (inGame.y = donDanh.goc);

            } else

            if(element.type == "het" || element.type == "het_traidat" || element.type == "het_namek") {
                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, element.id);
                element.level = 1;
                let infoSkill = this.checkSkill(element.name, element.level);
                if(!infoSkill) return element.type = "delete";
                let startSkill = infoSkill.end;
                donDanh.start = donDanh.start || 0;
                donDanh.time = donDanh.time + 1 || 0;
                let soKhung = startSkill.src.length;
                let mucTieu = element.aim == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.aim);
                if(!mucTieu) return element.type = "delete";
                let wm = Math.abs(mucTieu.width);
                donDanh.width = wm + (wm / 100) * 90;
                donDanh.height = mucTieu.height + (mucTieu.height / 100) * 90;

                donDanh.x = mucTieu.x - donDanh.width + (wm / 100) * 50;
                donDanh.y = mucTieu.y - donDanh.height + mucTieu.height;
                donDanh.visible = true;

                donDanh.texture = donDanh.time % this.fps() == 0 ? this.coverImg(startSkill.src[donDanh.start]) : donDanh.texture;
                donDanh.start = donDanh.time % this.fps() == 0 ? donDanh.start + 1 : donDanh.start;
                donDanh.start = donDanh.start >= startSkill.src.length ? 0 : donDanh.start;
                (donDanh.time >= 10 * this.fps()) && (element.type = "delete");

            } else

            if(element.type == "dichchuyen") {
                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, element.id);
                element.level = 1;
                let infoSkill = this.checkSkill(element.name, element.level);
                if(!infoSkill) return element.type = "delete";
                let startSkill = infoSkill.end;
                donDanh.time = donDanh.time + 1 || 0;
                donDanh.start = donDanh.start || 0;
                let soKhung = startSkill.src.length;
                let mucTieu = element.aim == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.aim);
                if(!mucTieu) return element.type = "delete";
                let wm = Math.abs(mucTieu.width);
                donDanh.x = mucTieu.x;
                donDanh.y = mucTieu.y;
                mucTieu.visible = false;
                donDanh.texture = donDanh.time % this.fps() == 0 ? this.coverImg(startSkill.src[donDanh.start]) : donDanh.texture;
                donDanh.start = donDanh.time % this.fps() == 0 ? donDanh.start + 1 : donDanh.start;

                (donDanh.start > soKhung) && (element.type = 'delete') && (mucTieu.visible = true);

            } else

            if(element.type == "taitaonangluong") {
                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, element.id);
                element.level = 1;
                let infoSkill = this.checkSkill(element.name, element.level);
                if(!infoSkill) return element.type = "delete";
                let startSkill = infoSkill.end;
                donDanh.start = donDanh.start || 0;
                donDanh.time = donDanh.time + 1 || 0;

                let mucTieu = element.aim == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.aim);
                if(!mucTieu) return element.type = "delete";

                let wm = Math.abs(mucTieu.width);
                donDanh.width = wm + (wm / 100) * 90;
                donDanh.height = mucTieu.height + (mucTieu.height / 100) * 90;
                donDanh.x = mucTieu.x - donDanh.width + (wm / 100) * 50;
                donDanh.y = mucTieu.y - donDanh.height + mucTieu.height;

                donDanh.texture = donDanh.time % this.fps() == 0 ? this.coverImg(startSkill.src[donDanh.start]) : donDanh.texture;
                donDanh.start = donDanh.time % this.fps() == 0 ? donDanh.start + 1 : donDanh.start;
                donDanh.start = donDanh.start >= startSkill.src.length ? 0 : donDanh.start;

                let info = element.aim == this.my.id ? this.my : this.Charset.find((e) => e.id == element.aim);
                if(!info) return element.type = "delete";

                (info.eff && info.eff.taitaonangluong && !info.eff.taitaonangluong.active) && (element.type = "delete") && (info.info.act = mucTieu.action) && (this.addAction({ id: info.id, action: info.info.act }));


            } else

            if(element.type == "nhapnhay") {
                let addnewskill = this.getEff(element.id);
                let donDanh = this.textEff(addnewskill, element.id);
                donDanh.time = donDanh.time + 1 || 0;

                this.GrapSCwhite.visible = donDanh.time % 3 == 0 ? true : donDanh % 2 == 0 ? false : this.GrapSCwhite.visible;

                if(donDanh.time < 100) {
                    setTimeout(() => {
                        element.type = "delete";
                        this.GrapSCwhite.visible = false;
                    }, 500);
                    donDanh.time = 100;
                }

            } else
            if(element.type == 'hoakhi_dondam') {
                return this.handeHoaKhiDam(element);
            }
            else 
            if(element.type == 'hoakhi_kame') {
                return this.handeHoaKhiDamChuong(element);
            }
            else 

            if(element.type == 'donDamKaioKen') {
                let by = element.by == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.by);
                if(!by) return element.type = 'delete';
                let mucTieu = element.aim == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.aim);
                if(!mucTieu) return element.type = 'delete';
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

                let playerNew = this.imgEff(addnewskill, 'playerNew');
                playerNew.alpha = 0.8;

                playerNew.start = playerNew.start || 0;
                playerNew.time = playerNew.time + 1 || 0;
                playerNew.src = [2190, 2190, 2191, 2192, 2192];


                playerNew.scale.x = by.huong == 'right' ? 1 : -1;


                playerNew.texture = playerNew.time % this.fps() == 0 ? this.coverImg(playerNew.src[playerNew.start]) : playerNew.texture;
                playerNew.start = playerNew.time % this.fps() == 0 ? playerNew.start + 1 : playerNew.start;
                playerNew.start = playerNew.start >= playerNew.src.length ? playerNew.src.length : playerNew.start;

                playerNew.height = 70;
                playerNew.width = 50;

                playerNew.x = by.x - (playerNew.width) / 2 - (by.width) / 2;
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

                    backGround.visible = this.rand(1, 100) < 50 ? true : false;
                    playerNew.visible = this.rand(1, 100) < 50 ? true : false;

                    if(playerNew.combo.length >= 1) {
                        let infoPlayer = element.by == this.my.id ? this.my : this.Charset.find(e => e.id == element.by);
                        if(!infoPlayer) return element.type = "delete";
                        if(!infoPlayer.info) return element.type = "delete";
                        if(!infoPlayer.info.act) return element.type = "delete";

                        infoPlayer.info.act != playerNew.combo[0] && (infoPlayer.info.act == playerNew.combo[0], this.addAction({ id: infoPlayer.id, action: playerNew.combo[0] }))
                        playerNew.combo.shift();
                    }

                }




            } else


            

            if(element.type == "skill") {
                if(this.kiNang.getChildByName(element.id) == undefined) {
                    let addnewskill = new PIXI.Container();
                    addnewskill.id = element.id;
                    addnewskill.name = element.id;
                    let infoSkill = this.checkSkill(element.name, element.level);
                    let mucTieu;
                    if(element.aim == this.my.id) {
                        // ! nếu mục tiêu là chính người chơi
                        mucTieu = this.NhanVat;
                    } // ! mục tiêu là người chơi, npc khác
                    else {
                        mucTieu = this.nguoichoi.getChildByName(element.aim);
                    }
                    let widthThem = 0;

                    let donFollow = new PIXI.Container();
                    if(mucTieu != undefined) {
                        let startSkill = infoSkill.start;
                        let donDanh = new PIXI.Sprite(this.coverImg(startSkill.src[0]));

                        if(startSkill.width <= 1 && startSkill.height <= 1) {
                            donDanh.scale.set(startSkill.width, startSkill.height);
                        } else if(startSkill.width == -1 && startSkill.height == -1) {
                            donDanh.width = mucTieu.width;
                            donDanh.height = mucTieu.height;
                        } else {
                            donDanh.width = startSkill.width;
                            donDanh.height = startSkill.height;
                        }
                        //widthThem+=donDanh.width;
                        donDanh.hieuung = 0;

                        donDanh.y = startSkill.y + element.startY;
                        donDanh.start = 0;
                        donDanh.name = element.id;
                        if(infoSkill.follow) {
                            // hide donDanh
                            donDanh.visible = false;
                        }

                        if(mucTieu.x < element.startX) {
                            donDanh.x = element.startX - Math.abs(donDanh.width) * 2;
                        } else {
                            donDanh.x = element.startX + startSkill.x * -1 + widthThem;
                        }

                        donDanh.hieuung = 0;
                        if(infoSkill.follow) {
                            let follow = infoSkill.follow;
                            donFollow.name = element.id;
                            let loop = follow.loop;
                            loop = 10;
                            let xFirst = 0;
                            let yFirst = 0;
                            let lastY = 0;

                            let nguonDanh;
                            let nguoiDanhAo;
                            if(element.by == this.my.id) {
                                nguonDanh = this.NhanVat;
                                if(!nguonDanh) return element.type = "delete"; // nếu không thể tìm được người tấn công đòn

                                nguoiDanhAo = nguonDanh.getChildByName("ao");
                            } else {
                                nguonDanh = this.nguoichoi.getChildByName(element.by);
                                if(!nguonDanh) return element.type = "delete"; // nếu không thể tìm được người tấn công đòn

                                nguoiDanhAo = nguonDanh.getChildByName("playerAo");
                                if(!nguoiDanhAo) return element.type = "delete";
                            }


                            //
                            let bullet = new PIXI.Sprite(this.coverImg(follow.src[0]));
                            if(follow.width == -1 && follow.height == -1) {
                                bullet.width = mucTieu.width;
                                bullet.height = mucTieu.height;
                            } else {
                                bullet.scale.set(follow.width, follow.height);
                            }

                            let dolon = Math.abs(mucTieu.y - element.startY);

                            // tính chênh lệnh độ lớn

                            if(mucTieu.x >= element.startX) {
                                // mục tiêu ở phía bên phải

                                if(dolon < bullet.height) {
                                    // nếu mục hợp lệ thì tiến hành đòn đánh ngang
                                    bullet.x =
                                        element.startX -
                                        bullet.width / 2 -
                                        nguonDanh.width / 2 +
                                        nguoiDanhAo.width / 2;
                                    bullet.y = element.startY + bullet.height / 2;
                                    donDanh.loai = 1;
                                } else if(dolon > bullet.height && element.startY > mucTieu.y) {
                                    // nếu trường hợp mục tiêu ở bên phải và đường đạn bắn từ dưới lên
                                    bullet.x =
                                        element.startX -
                                        bullet.width / 2 -
                                        nguonDanh.width / 2 +
                                        nguoiDanhAo.width / 2;
                                    bullet.y =
                                        element.startY + bullet.height / 2 + nguoiDanhAo.height;
                                    donDanh.loai = 2;
                                } else if(dolon > bullet.height && element.startY < mucTieu.y) {
                                    // nếu trường hợp mục tiêu ở bên phải và đường đạn bắn từ trên xuống

                                    bullet.x =
                                        element.startX -
                                        bullet.width / 2 -
                                        nguonDanh.width / 2 +
                                        nguoiDanhAo.width / 2;
                                    bullet.y =
                                        element.startY + bullet.height / 2 - nguoiDanhAo.height;
                                    donDanh.loai = 3;
                                }
                            } else {
                                // mục tiêu ở phía bên trái

                                if(dolon < bullet.height) {
                                    // nếu mục hợp lệ thì tiến hành đòn đánh ngang
                                    // bullet.x = element.startX  -  bullet.width/2 - nguonDanh.width/2 - nguoiDanhAo.width/2;
                                    bullet.x =
                                        element.startX -
                                        bullet.width / 2 +
                                        Math.abs(nguonDanh.width) / 2 -
                                        Math.abs(nguoiDanhAo.width) / 2;
                                    bullet.y =
                                        element.startY +
                                        bullet.height +
                                        Math.abs(nguonDanh.height) / 2;
                                    donDanh.loai = 4;
                                } else if(dolon > bullet.height && element.startY > mucTieu.y) {
                                    // nếu trường hợp mục tiêu ở bên trái và đường đạn bắn từ dưới lên
                                    bullet.x =
                                        element.startX -
                                        bullet.width / 2 +
                                        Math.abs(nguonDanh.width) / 2 -
                                        Math.abs(nguoiDanhAo.width) / 2;
                                    bullet.y =
                                        element.startY +
                                        bullet.height +
                                        Math.abs(nguonDanh.height) / 2;
                                    donDanh.loai = 5;
                                } else if(dolon > bullet.height && element.startY < mucTieu.y) {
                                    // nếu trường hợp mục tiêu ở bên trái và đường đạn bắn từ Trên trời xuống
                                    bullet.x =
                                        element.startX -
                                        bullet.width / 2 -
                                        nguonDanh.width / 2 -
                                        nguoiDanhAo.width / 2;
                                    bullet.y =
                                        element.startY +
                                        bullet.height +
                                        Math.abs(nguonDanh.height) / 2;
                                    donDanh.loai = 6;
                                }
                            }

                            // set scale

                            bullet.scale.set(0.7);
                            bullet.name = element.id + "bullet";

                            bullet.zIndex = 999;

                            // set rotation
                            let angle = Math.atan2(mucTieu.y - bullet.y, mucTieu.x - bullet.x);
                            bullet.rotation = angle;
                            // set speed

                            bullet.visible = false;
                            addnewskill.addChild(bullet);
                        }

                        donDanh.time = 0;

                        addnewskill.addChild(donDanh);

                        this.kiNang.addChild(addnewskill);

                        if(element.aim == this.my.id) {
                            // ! nếu mục tiêu là chính người chơi
                            mucTieu = this.NhanVat;
                        } // ! mục tiêu là người chơi, npc khác
                        else {
                            mucTieu = this.nguoichoi.getChildByName(element.aim);
                        }

                        if(element.name == "Kamejoko") {
                            donDanh.choload = 1;
                            donDanh.farm = 0;
                            donDanh.vis = 0;
                        }
                    }
                } else {
                    let addnewskill = this.kiNang.getChildByName(element.id);
                    let donDanh = addnewskill.getChildByName(element.id);
                    let infoSkill = this.checkSkill(element.name, element.level);
                    let startSkill = infoSkill.start;
                    let mucTieu;
                    let speed = startSkill.speed;
                    let follow = infoSkill.follow;
                    let soKhung = follow.src.length;

                    if(element.aim == this.my.id) {
                        // ! nếu mục tiêu là chính người chơi
                        mucTieu = this.NhanVat;
                    } // ! mục tiêu là người chơi, npc khác
                    else {
                        mucTieu = this.nguoichoi.getChildByName(element.aim);
                    }
                    if(mucTieu != undefined) {
                        let act;
                        if(element.by == this.my.id) {
                            act = this.my.info.act;
                        } else {
                            act = this.Charset.find((item) => item.id == element.by);
                            if(!act) return (element.type = "delete");
                            act = act.info.act;
                        }
                        if(donDanh.choload && donDanh.choload == 1) {
                            donDanh.FPS = Math.round(this.app.ticker.FPS / 60) <= 0 ? 1 * 2 : Math.round(this.app.ticker.FPS / 60) * 2;
                            donDanh.vis++;


                            if(act != "dam5") {
                                act = "dam5";
                                this.addAction({
                                    id: element.by,
                                    action: act,
                                });
                            }
                            if(donDanh.vis % donDanh.FPS == 0) {
                                let nguoiDanh;
                                let nguoiDanhAo;
                                if(element.by == this.my.id) nguoiDanh = this.NhanVat;
                                else nguoiDanh = this.nguoichoi.getChildByName(element.by);
                                if(!nguoiDanh) return (element.type = "delete");

                                if(element.by == this.my.id)
                                    nguoiDanhAo = nguoiDanh.getChildByName("ao");
                                else nguoiDanhAo = nguoiDanh.getChildByName("playerAo");
                                if(!nguoiDanhAo) return (element.type = "delete");

                                donDanh.texture = this.coverImg(startSkill.src[donDanh.farm]);

                                if(nguoiDanh.width < 0) {
                                    donDanh.x = nguoiDanh.x - Math.abs(nguoiDanh.width);
                                } else {
                                    donDanh.x =
                                        nguoiDanh.x -
                                        Math.abs(nguoiDanh.width) -
                                        nguoiDanhAo.width / 2;
                                }
                                donDanh.width = 60;
                                donDanh.height = 60;
                                donDanh.y = nguoiDanh.y + nguoiDanhAo.height / 2;

                                donDanh.visible = true;
                                donDanh.farm++;
                                if(donDanh.farm >= startSkill.src.length) {
                                    donDanh.choload = 0;
                                    donDanh.visible = false;
                                }
                            }
                            return false;
                        }

                        let listbuild = addnewskill.children.filter(
                            (item) => item.name === element.id + "bullet"
                        );
                        let listbuild_bullet_success = addnewskill.children.filter(
                            (item) => item.name === element.id + "bullet_success"
                        );
                        donDanh.time += 1;
                        for(let i = listbuild_bullet_success.length - 1; i >= 0; i--) {
                            let old = listbuild_bullet_success[i];

                            donDanh.FPS = Math.round(this.app.ticker.FPS / 60) <= 0 ? 1 * 2 : Math.round(this.app.ticker.FPS / 60) * 2;
                            donDanh.FPS-=3;
                            donDanh.FPS = donDanh.FPS <= 0 ? 1 : donDanh.FPS;
                            if(donDanh.time % donDanh.FPS == 0) {
                                old.texture = this.coverImg(follow.src[old.start]);

                                old.start++;
                                if(old.start + 1 > soKhung) {
                                    old.start = 0;
                                }
                            }

                            if(
                                element.by &&
                                element.action &&
                                element.action == "keepKame" &&
                                act != "dam2"
                            ) {
                                act = "dam2";
                                this.addAction({
                                    id: element.by,
                                    action: act,
                                });
                            }

                            if(
                                donDanh.time % donDanh.FPS == 0 &&
                                old.visible == false &&
                                old.daload != 2
                            ) {
                                old.visible = true;
                                old.daload = 2;
                                if(i == 0) {
                                    for(let j = 0; j < listbuild_bullet_success.length; j++) {
                                        listbuild_bullet_success[j].visible = false;
                                        if(j >= listbuild_bullet_success.length - 1) {

                                            this.addEff({
                                                name: element.name,
                                                aim: element.aim,
                                                level: 1,
                                                type: "bum",
                                                dame: element.dame,
                                            });

                                            element.type = "delete";
                                            if(
                                                element.by &&
                                                element.action &&
                                                element.action == "keepKame" &&
                                                act == "dam2"
                                            ) {
                                                this.resetAction(element.by)
                                                if(element.by == this.my.id || (element.detu == true && this.my.detu && this.my.detu.id && this.my.detu.id == element.by)) this.msgAttack(element);
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                        }

                        // tạo hướng đạn
                        for(let i = 0; i < listbuild.length; i++) {
                            let old = listbuild[i];
                            let angle = Math.atan2(mucTieu.y - old.y, mucTieu.x - old.x);
                            old.rotation = angle;
                            if(
                                i + 1 == listbuild.length &&
                                donDanh.time % 1 == 0 &&
                                donDanh.done != 1
                            ) {
                                // add new bullet
                                let follow = infoSkill.follow;
                                let loop = follow.loop;
                                let xFirst = 0;
                                let yFirst = 0;
                                let lastY = 0;
                                let bullet = new PIXI.Sprite(this.coverImg(follow.src[0]));
                                if(follow.width == -1 && follow.height == -1) {
                                    bullet.width = mucTieu.width;
                                    bullet.height = mucTieu.height;
                                } else {
                                    bullet.scale.set(follow.width, follow.height);
                                }

                                bullet.scale.set(0.7);
                                bullet.name = element.id + "bullet";

                                bullet.visible = false;
                                bullet.zIndex = old.zIndex - 1;

                                if(donDanh.loai == 1) {
                                    // đòn đánh ngang về bên phải của mục tiêu
                                    bullet.x = old.x + bullet.width / 2;
                                    bullet.y = old.y;
                                    bullet.rotation = Math.atan2(
                                        mucTieu.y - bullet.y,
                                        mucTieu.x - bullet.x
                                    );
                                    if(bullet.x > mucTieu.x) {
                                        // nếu như mà đạn đã vượt quá nhân vật thì dừng lại
                                        donDanh.done = 1;
                                        bullet.rotation = 0;
                                    }
                                } else if(donDanh.loai == 2) {
                                    // đòn đánh từ dưới lên từ bên sang phải
                                    bullet.x = old.x + bullet.width / 2;
                                    bullet.y = old.y - bullet.height / 2;
                                    bullet.rotation = Math.atan2(
                                        mucTieu.y - bullet.y,
                                        mucTieu.x - bullet.x
                                    );
                                    if(bullet.y >= mucTieu.y) {
                                        // nếu như mà đạn đã vượt quá nhân vật thì dừng lại
                                        // tiếp tục tạo sprite theo chiều dọc
                                        if(bullet.x >= mucTieu.x) {
                                            bullet.x = old.x;
                                        }
                                    } else {
                                        bullet.y = old.y;
                                        // nếu như đã tạo xong y, tiến hành tạo tăng X.
                                        if(bullet.x > mucTieu.x) {
                                            // nếu đã tăng xong X.
                                            donDanh.done = 1;
                                            bullet.rotation = 0;
                                        }
                                    }
                                } else if(donDanh.loai == 3) {
                                    // đòn đánh từ dưới lên từ bên sang phải
                                    bullet.x = old.x + bullet.width / 2;
                                    bullet.y = old.y + bullet.height / 2;
                                    bullet.rotation = Math.atan2(
                                        mucTieu.y - bullet.y,
                                        mucTieu.x - bullet.x
                                    );
                                    if(bullet.y <= mucTieu.y) {
                                        // nếu đường đạn vẫn nhỏ hơn muctieu.Y thì tăng
                                        if(bullet.x >= mucTieu.x) {
                                            bullet.x = old.x;
                                        }
                                    } else {
                                        bullet.y = old.y;
                                        // nếu như đã tạo xong y, tiến hành tạo tăng X.
                                        if(bullet.x >= mucTieu.x) {
                                            // nếu đã tăng xong X.
                                            donDanh.done = 1;
                                            bullet.rotation = 0;
                                        }
                                    }
                                } else if(donDanh.loai == 4) {
                                    // đòn đánh ngang về bên phải của mục tiêu
                                    bullet.x = old.x - Math.abs(bullet.width) / 2;
                                    bullet.y = old.y;
                                    bullet.rotation = Math.atan2(
                                        mucTieu.y - bullet.y,
                                        mucTieu.x - bullet.x
                                    );
                                    if(bullet.x < mucTieu.x) {
                                        // nếu như mà đạn đã vượt quá nhân vật thì dừng lại
                                        donDanh.done = 1;
                                        bullet.rotation = 0;
                                    }
                                } else if(donDanh.loai == 5) {
                                    // đòn đánh từ dưới lên từ bên sang phải
                                    bullet.x = old.x - Math.abs(bullet.width) / 2;
                                    bullet.y = old.y - bullet.height / 2;

                                    bullet.rotation = Math.atan2(
                                        mucTieu.y - bullet.y,
                                        mucTieu.x - bullet.x
                                    );
                                    if(bullet.y >= mucTieu.y) {
                                        // nếu như mà đạn đã vượt quá nhân vật thì dừng lại
                                        // tiếp tục tạo sprite theo chiều dọc
                                        if(bullet.x <= mucTieu.x) {
                                            bullet.x = old.x;
                                        }
                                    } else {
                                        bullet.y = old.y;
                                        // nếu như đã tạo xong y, tiến hành tạo tăng X.
                                        if(bullet.x < mucTieu.x) {
                                            // nếu đã tăng xong X.
                                            bullet.x += bullet.width - mucTieu.width / 2;
                                            donDanh.done = 1;
                                            bullet.rotation = 0;
                                        }
                                    }
                                } else if(donDanh.loai == 6) {
                                    // đòn đánh từ dưới lên từ bên sang phải
                                    bullet.x = old.x - bullet.width / 2;
                                    bullet.y = old.y + bullet.height / 2;
                                    bullet.rotation = Math.atan2(
                                        mucTieu.y - bullet.y,
                                        mucTieu.x - bullet.x
                                    );
                                    if(bullet.y <= mucTieu.y) {
                                        // nếu đường đạn vẫn nhỏ hơn muctieu.Y thì tăng
                                        if(bullet.x <= mucTieu.x) {
                                            bullet.x = old.x;
                                        }
                                    } else {
                                        bullet.y = old.y;
                                        // nếu như đã tạo xong y, tiến hành tạo tăng X.
                                        if(bullet.x <= mucTieu.x) {
                                            old.x += old.width - mucTieu.width / 2;
                                            // nếu đã tăng xong X.
                                            donDanh.done = 1;
                                            bullet.rotation = 0;
                                        }
                                    }
                                } else {
                                    element.type = "delete";
                                }

                                bullet.start = 0;

                                if(donDanh.done == 1) {
                                    listbuild.sort((a, b) => {
                                        return a.zIndex - b.zIndex;
                                    });

                                    listbuild.forEach((elementx) => {
                                        let newClass = Object.create(elementx);
                                        newClass.name = element.id + "bullet_success";
                                        addnewskill.addChild(newClass);
                                    });
                                }

                                if(donDanh.done != 1) addnewskill.addChild(bullet);
                            }
                        }
                    } else {
                        addnewskill.removeChild(donDanh);
                        this.kiNang.removeChild(addnewskill);
                    }
                }
            } else

                // masenko 

                if(element.type == "skill_one") {
                    let addnewskill = this.getEff(element.id);
                    let donDanh = this.imgEff(addnewskill, element.id);
                    element.level = 1;
                    let infoSkill = this.checkSkill(element.name, element.level);
                    if(!infoSkill) return element.type = 'delete';
                    let mucTieu = element.aim == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.aim);
                    if(!mucTieu) return element.type = 'delete';
                    let startSkill = infoSkill.start;

                    donDanh.width = 70;
                    donDanh.height = 70;
                    donDanh.start = donDanh.start || 0;
                    donDanh.time = donDanh.time + 1 || 0;
                    let from = element.by == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.by);
                    if(!from) return element.type = 'delete';
                    donDanh.x = donDanh.x || from.x - donDanh.width / 2;
                    donDanh.y = donDanh.y || from.y;


                    donDanh.texture = donDanh.time % this.fps() == 0 ? this.coverImg(startSkill.src[donDanh.start]) : donDanh.texture;
                    donDanh.start = donDanh.time % this.fps() == 0 ? donDanh.start + 1 : donDanh.start;
                    donDanh.start > startSkill.src.length && (donDanh.start = 0);

                    if(donDanh.time % this.fps() == 0) {
                        let speedt = 20;

                        if(donDanh.x < mucTieu.x) {
                            if(donDanh.x + speedt > mucTieu.x) {
                                speedt = mucTieu.x - donDanh.x;
                            }
                            donDanh.x += speedt;
                        }

                        if(donDanh.x > mucTieu.x) {
                            if(donDanh.x - speedt < mucTieu.x) {
                                speedt = donDanh.x - mucTieu.x;
                            }
                            donDanh.x -= speedt;
                        }

                        if(donDanh.y < mucTieu.y) {

                            if(donDanh.y + speedt > mucTieu.y) {
                                speedt = mucTieu.y - donDanh.y;
                            }
                            donDanh.y += speedt;
                        }

                        if(donDanh.y > mucTieu.y) {
                            if(donDanh.y - speedt < mucTieu.y) {
                                speedt = donDanh.y - mucTieu.y;
                            }
                            donDanh.y -= speedt;
                        }
                    }

                    if(donDanh.x == mucTieu.x && donDanh.y == mucTieu.y) {
                        if(element.by == this.my.id && element.keyid || (element.detu == true && this.my.detu && this.my.detu.id && this.my.detu.id == element.by)) {
                            this.msgAttack(element);
                        }
                        this.addEff({
                            name: element.name,
                            aim: element.aim,
                            level: 1,
                            type: "bum",
                            dame: element.dame,
                        });

                        element.type = "delete";
                        
                    }

                    let info = this.getInfoMap(element.by);
                    if(info) 
                    {
                        this.addAction({
                            id : element.by,
                            action : 'dam2'
                        })
                        setTimeout(() => {
                            this.resetAction(element.by)
                        }, 200);
                    }




                }

            else

            if(element.type == "bum") {
                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, element.id);
                donDanh.start = donDanh.start || 0;
                donDanh.time = donDanh.time + 1 || 0;
                donDanh.visible = true;
                let infoSkill = this.checkSkill(element.name, element.level);
                if(!infoSkill) return element.type = 'delete';
                let startSkill = infoSkill.end;
                let soKhung = startSkill.src.length;
                let mucTieu = element.aim == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.aim);
                if(!mucTieu) return element.type = 'delete';
                donDanh.scale.set(startSkill.width, startSkill.height);
                donDanh.FPS = this.app.ticker.FPS > 240 ? 10 : this.app.ticker.FPS > 120 ? 6 : this.app.ticker.FPS > 60 ? 3 : 2;
                donDanh.texture = donDanh.time % donDanh.FPS == 0 ? this.coverImg(startSkill.src[donDanh.start]) : donDanh.texture;
                donDanh.start = donDanh.time % donDanh.FPS == 0 ? donDanh.start + 1 : donDanh.start;
                donDanh.x = mucTieu.x - donDanh.width / 2 - Math.abs(mucTieu.width) / 2;
                donDanh.y = mucTieu.y;
                (donDanh.start >= soKhung) && (element.type = 'delete') && (donDanh.visible = false);
            } else

            if(element.type == "vangmau") {
                let addnewskill = this.getEff(element.id);
                let donDanh = this.imgEff(addnewskill, element.id);
                donDanh.start = donDanh.start || 0;
                donDanh.time = donDanh.time + 1 || 0;
                donDanh.visible = true;

                let startSkill = ["vang_1", "vang_2", "vang_3"];
                let mucTieu = element.aim == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.aim);
                if(!mucTieu) return element.type = 'delete';

                donDanh.texture = this.coverImg(startSkill[donDanh.start]);
                donDanh.scale.x = mucTieu.huong == 'right' ? -1 : 1;
                donDanh.pivot.x = mucTieu.huong == 'right' ? -donDanh.width : 0;
                donDanh.height = donDanh.height > mucTieu.height ? mucTieu.height : donDanh.height;
                donDanh.x = mucTieu.x;
                donDanh.y = mucTieu.y;

                donDanh.FPS = this.fps();

                donDanh.texture = donDanh.time % donDanh.FPS == 0 ? this.coverImg(startSkill[donDanh.start]) : donDanh.texture;
                donDanh.start = donDanh.time % donDanh.FPS == 0 ? donDanh.start + 1 : donDanh.start;

                (donDanh.start >= startSkill.length) && (element.type = 'delete') && (donDanh.visible = false);

            } else

            if(element.type == "truhp") {

                let addnewskill = this.getEff(element.id);
                let donDanh = this.textEff(addnewskill, element.id);
                donDanh.text = "-" + element.value + "";
                donDanh.style = {
                    fontFamily: "staccato",
                    fontSize: 18,
                    fill: "0xFF0000",
                    align: "center",
                    fontWeight: "bold",
                };
                donDanh.start = donDanh.start || 0;
                donDanh.time = donDanh.time + 1 || 0;
                donDanh.visible = true;
                let ChoPlayer = this.my.id == element.to ? this.my : this.Charset.find(item => item.id == element.to);
                if(donDanh.time <= 3) {
                    if(ChoPlayer) {
                        ChoPlayer.info.act = "choang";
                        this.addAction({
                            id: ChoPlayer.id,
                            action: "choang",
                        });

                        setTimeout(() => {
                            this.resetAction(ChoPlayer.id)
                        }, 150);
                    } else {
                        this.addAction({
                            id: element.to,
                            action: "bidanh",
                        });
                    }
                    this.addEff({
                        name: "vangmau",
                        aim: element.to,
                        level: 1,
                        type: "vangmau",
                    });
                    donDanh.time = 5;

                }

                let mucTieu = element.to == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.to);
                if(!mucTieu) return element.type = 'delete';

                donDanh.x = donDanh.x || mucTieu.x - Math.abs(mucTieu.width) / 2 - donDanh.width / 2;
                donDanh.y = donDanh.y || mucTieu.y - donDanh.height;
                donDanh.FPS = this.fps();
                donDanh.y -= donDanh.time % donDanh.FPS == 0 ? 3 : 0;

                donDanh.run = donDanh.run || 1;
                if(donDanh.run == 1) 
                {
                    donDanh.run = 2;
                    setTimeout(() => {
                        element.type = 'delete';
                    }, 300);
                }

            } else

            if(element.type == "conghp") {
                let addnewskill = this.getEff(element.id);
                let donDanh = this.textEff(addnewskill, element.id);
                donDanh.text = "+" + element.value + "";
                donDanh.style = {
                    fontFamily: "staccato",
                    fontSize: 18,
                    fill: "red",
                    align: "center",
                };
                donDanh.start = donDanh.start || 0;
                donDanh.time = donDanh.time + 1 || 0;

                let mucTieu = element.to == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.to);
                if(!mucTieu) return element.type = 'delete';

                donDanh.x = donDanh.x || mucTieu.x - Math.abs(mucTieu.width) / 2 - donDanh.width / 2;
                donDanh.y = donDanh.y || mucTieu.y;

                donDanh.FPS = this.fps();
                donDanh.y -= donDanh.time % donDanh.FPS == 0 ? 3 : 0;

                donDanh.run = donDanh.run || 1;
                if(donDanh.run == 1) 
                {
                    this.playSound('conghp',false, mucTieu.x, 'conghp_'+element.to);
                    donDanh.run = 2;
                    setTimeout(() => {
                        element.type = 'delete';
                    }, 300);
                }
            } else

            if(element.type == "truki") {

                let addnewskill = this.getEff(element.id);
                let donDanh = this.textEff(addnewskill, element.id);

                donDanh.text = "-" + element.value + " KI";
                donDanh.style = {
                    fontFamily: "staccato",
                    fontSize: 18,
                    fill: "blue",
                    align: "center",
                }
                donDanh.start = donDanh.start || 0;
                donDanh.time = donDanh.time + 1 || 0;

                donDanh.visible = true;

                let mucTieu = element.to == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.to);
                if(!mucTieu) return element.type = 'delete';

                donDanh.x = donDanh.x || mucTieu.x - Math.abs(mucTieu.width) / 2 - donDanh.width / 2;
                donDanh.y = donDanh.y || mucTieu.y - 50;

                donDanh.FPS = this.fps();
                donDanh.y -= donDanh.time % donDanh.FPS == 0 ? 3 : 0;

                donDanh.run = donDanh.run || 1;
                if(donDanh.run == 1) 
                {
                    donDanh.run = 2;
                    setTimeout(() => {
                        element.type = 'delete';
                    }, 300);
                }

            } else

            if(element.type == "chimang") {
                let addnewskill = this.getEff(element.id);
                let donDanh = this.textEff(addnewskill, element.id);

                donDanh.text = "CHÍ MẠNG";
                donDanh.style = {
                    fontFamily: "staccato",
                    fontSize: 18,
                    fill: 0xff9000,
                    align: "center",
                }
                donDanh.style.stroke = "#000000";
                donDanh.style.strokeThickness = 4;
                donDanh.style.dropShadow = true;
                donDanh.style.dropShadowColor = "#000000";
                donDanh.style.dropShadowBlur = 4;
                donDanh.style.dropShadowAngle = Math.PI / 6;
                donDanh.style.dropShadowDistance = 6;

                donDanh.start = donDanh.start || 0;
                donDanh.time = donDanh.time || 0;

                donDanh.visible = true;

                let mucTieu = element.to == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.to);

                if(!mucTieu) return false;

                donDanh.time++;

                donDanh.x = donDanh.x || mucTieu.x - Math.abs(mucTieu.width) / 2 - donDanh.width / 2;
                donDanh.y = donDanh.y || mucTieu.y - 20;
                donDanh.FPS = this.fps();

                if(donDanh.time % donDanh.FPS == 0) {
                    donDanh.x += donDanh.start == 5 ? 1 : donDanh.start == 1 ? -1 : 0;
                    donDanh.start = donDanh.start == 6 ? 0 : donDanh.start + 1;

                }

                if(donDanh.time < 20) {
                    setTimeout(() => {
                        element.type = 'delete';
                    }, 200);
                    donDanh.time = 21;
                }


            } else

            if(element.type == "congexp") {

                let addnewskill = this.getEff(element.id);
                let donDanh = this.textEff(addnewskill, element.id);

                donDanh.text = "+" + element.value;
                donDanh.style = {
                    fontFamily: "staccato",
                    fontSize: 18,
                    fill: "0x00FF00",
                    align: "center",
                    fontWeight: "bold",
                }
                donDanh.style.stroke = "#000000";
                donDanh.style.strokeThickness = 4;
                donDanh.style.dropShadow = true;
                donDanh.style.dropShadowColor = "#000000";
                donDanh.style.dropShadowBlur = 4;
                donDanh.style.dropShadowAngle = Math.PI / 6;
                donDanh.style.dropShadowDistance = 6;
                donDanh.time = donDanh.time + 1 || 0;
                donDanh.start = donDanh.start || 0;


                let mucTieu = element.to == this.my.id ? this.NhanVat : this.nguoichoi.getChildByName(element.to);
                if(!mucTieu) return element.type = 'delete';


                donDanh.x = donDanh.x || mucTieu.x - Math.abs(mucTieu.width) / 2 - donDanh.width / 2;
                donDanh.y = donDanh.y || mucTieu.y - 20;

                donDanh.FPS = this.fps();

                donDanh.y -= donDanh.time % donDanh.FPS == 0 ? 2 : 0;


                donDanh.run = donDanh.run || 1;
                if(donDanh.run == 1) 
                {
                    donDanh.run = 2;
                    setTimeout(() => {
                        element.type = 'delete';
                    }, 300);
                }

                donDanh.visible = true;


            }
        });

        const bubblePadding = 10;

        this.logChat.forEach((message) => {

            if(this.Chat.getChildByName(message.id) == undefined) {
                const bubble = new PIXI.Graphics();
                bubble.name = message.id;
                bubble.id = message.id;
                bubble.uid = message.uid;


                const newmessage = new PIXI.Text(message.text, {
                    align: "center",
                    breakWords: true,
                    fontSize: 14,
                    whiteSpace: "normal",
                    wordWrap: true,
                    wordWrapWidth: 110,
                    fontWeight: "bold",
                });

                newmessage.wordWrapWidth = 200 - bubblePadding * 2;
                newmessage.name = message.id;
                newmessage.id = message.id;
                newmessage.anchor.set(0.5);
                newmessage.time = 0;
                newmessage.dem = 0;

                bubble.addChild(newmessage);
                newmessage.position.set(bubble.width / 2, bubble.height / 2 );
                newmessage.resolution = 2;
                bubble.lineStyle(1, 0x000000, 3)
                bubble.beginFill(0xffffff);
                bubble.drawRoundedRect(
                    -bubblePadding,
                    -bubblePadding,
                    newmessage.width + bubblePadding * 2 < 110 ?
                    110 :
                    newmessage.width + bubblePadding * 2,
                    newmessage.height + bubblePadding * 2 < 50 ?
                    50 :
                    newmessage.height + bubblePadding * 2,
                    10
                );
                bubble.endFill();



                bubble.pivot.set(bubble.width / 2, bubble.height / 2);
                bubble.visible = false;

                // trangle chat bottom bubble
                const trangle = new PIXI.Graphics();
                trangle.beginFill(0xffffff);
                trangle.lineStyle(1, 0x000000, 3)
                trangle.moveTo(0, 0);
                trangle.lineTo(10, 10);
                trangle.lineTo(20, 0);
                trangle.endFill();
                trangle.pivot.set(trangle.width / 2, trangle.height / 2);
                trangle.position.set(bubble.width / 2 - trangle.width/2, bubble.height - trangle.height + 4  );
                bubble.addChild(trangle);



                this.Chat.addChild(bubble);
            } else {
                let bubble = this.Chat.getChildByName(message.id);
                let mess = bubble.getChildByName(message.id);

                if(message.type == "delete") {
                    this.Chat.removeChild(bubble);
                    this.logChat = this.logChat.filter(function(obj) {
                        return obj.id !== message.id;
                    });
                    return false;
                }

                let mucTieuChat;
                let getinfoDau;
                if(message.uid == this.my.id) {
                    mucTieuChat = this.NhanVat;
                    getinfoDau = mucTieuChat.getChildByName("dau");
                    if(!getinfoDau) return (message.type = "delete");
                    bubble.position.set(
                        mucTieuChat.x - 7,
                        mucTieuChat.y - (mess.height + bubblePadding * 2) / 2
                    );
                } else {
                    mucTieuChat = this.nguoichoi.getChildByName(message.uid);
                    if(!mucTieuChat) return (message.type = "delete");
                    if(mucTieuChat != undefined)
                        bubble.position.set(
                            mucTieuChat.x - 7,
                            mucTieuChat.y - (mess.height + bubblePadding * 2) / 2 - 30
                        );
                }
                if(mess.dem % 1 == 0) {
                    if(mess.time >= 80 * this.fps()) {
                        this.Chat.removeChild(bubble);
                        this.logChat = this.logChat.filter(function(obj) {
                            return obj.id !== message.id;
                        });
                    }
                }
                mess.dem++;
                mess.time++;
                bubble.visible = true;
            }
        });
        //requestAnimationFrame(this.init);
    }
}

export default eff;
