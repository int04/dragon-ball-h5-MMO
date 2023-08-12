import playerView from '../menu/playerView.js';

export default class previewSkillView extends playerView {
    constructor() {
        super();
    }

    userTang = (type, value) => {
        let obj2 = {hpGoc : 0, kiGoc : 1, sucdanhGoc : 2, chimangGoc : 3, giapGoc : 4};
        if(obj2[type] == undefined) return this.chipi("Có sự cố xẩy ra");
        let newid = obj2[type];
        if(this.my.id <= 0) return false;

        let my = this.my;

        let obj = ["hpGoc","kiGoc","sucdanhGoc","chimangGoc","giapGoc"];
        let chiso = obj[newid];
        let arrayUp = [20, 200, 2000];
        arrayUp = chiso == 'hpGoc' ? [20, 200, 2000,20000] : arrayUp;
        arrayUp = chiso == 'kiGoc' ? [20, 200, 2000,20000] : arrayUp;
        arrayUp = chiso == 'sucdanhGoc' ? [1, 10, 100,1000] : arrayUp;
        arrayUp = chiso == 'chimangGoc' ? [1] : arrayUp;
        arrayUp = chiso == 'giapGoc' ? [1, 10, 100] : arrayUp;

        if(arrayUp.findIndex(e => e == value) == -1) return this.chipi("Có lỗi xẩy ra");

        let need = 0;
        need = chiso == 'hpGoc' ? this.tangHP(my.info.chiso[chiso], value) : need;
        need = chiso == 'kiGoc' ? this.tangHP(my.info.chiso[chiso], value) : need;
        need = chiso == 'sucdanhGoc' ? this.tangSucDanh(my.info.chiso[chiso], value) : need;
        need = chiso == 'chimangGoc' ? this.tangchiMang(my.info.chiso[chiso], value) : need;
        need = chiso == 'giapGoc' ? this.tangGiap(my.info.chiso[chiso], value) : need;

        if(my.info.coban.tiemnang < need) return this.chipi("Chưa đủ tiềm năng để cộng.");

        this.to(-31,{
            _1 : newid,
            _2 : value
        })
        this.notice(this._('Xin chờ'),false);

        console.log(type,value)
    }

    userSkill(id, o) {
        if(this.my.id <= 0) return false;
        // function is select skill for user   
        for(let i = 0; i < this.my.oskill.length; i++) {
            if(this.my.oskill[i] == id) {
                this.my.oskill[i] = 0;
            }
        }
        this.my.oskill[o] = id;
        this.createSkillOnDisplay();
        this.to(-9, this.my.oskill);
    }

    Open_preSkill = function(data, action = null) {
        let my = this.my;
        let heightKhung = 0;
        let itemPos = data.getBounds();
        let id = data.skill;
        if(!id) return false;

        let myidskill = my.skill.find(e => e.id == id);

        let skill = this.skill_active.find(e => e.id == id && (e.class == 'all' || e.class == my.info.coban.type));

        if(!skill) return false;

        if(!myidskill) {
            return this.notice(this._('Bạn chưa có kĩ năng này.'));
        } else if(skill.id >= 1) {
            if(myidskill.level < 1) return this.notice(this._('Bạn chưa học kĩ năng này. Hãy tới sưu phụ để học (Miễn phí) hoặc mua sách võ công tại URON.'));
        }


        // clear preview item
        this.boxPreviewItem.removeChildren();

        this.boxPreviewItem.visible = true;


        let boxBackground = new PIXI.Graphics();
        this.boxPreviewItem.addChild(boxBackground);



        let width = this.gameWidth * 0.4;
        let wMin = 350;
        if(width < wMin) width = wMin;
        if(width > this.gameWidth) width = this.gameWidth * 1;

        let height = this.gameHeight * 0.15;
        let hMin = 85;
        if(height < hMin) height = hMin;


        boxBackground.mwidth = width;
        boxBackground.mheight = height;


        boxBackground.beginFill(0xfefefe, 1);
        boxBackground.drawRoundedRect(0, 0, boxBackground.mwidth, boxBackground.mheight, 5);
        boxBackground.endFill();

        boxBackground.x = 10;


        if(skill.type == 'bidong') {
            let txt = "";
            if(skill.object == 'hpGoc') txt = "Sử dụng " + this.number_format(this.tangHP(my.info.chiso[skill.object], 20)) + " tiềm năng để tăng 20 HP gốc.";
            else if(skill.object == 'kiGoc') txt = "Sử dụng " + this.number_format(this.tangHP(my.info.chiso[skill.object], 20)) + " tiềm năng để tăng 20 KI gốc.";
            else if(skill.object == 'sucdanhGoc') txt = "Sử dụng " + this.number_format(this.tangSucDanh(my.info.chiso[skill.object], 1)) + " tiềm năng để tăng 1 Sức đánh gốc.";
            else if(skill.object == 'giapGoc') txt = "Sử dụng " + this.number_format(this.tangGiap(my.info.chiso[skill.object], 1)) + " tiềm năng để tăng 1 giáp gốc.";
            else if(skill.object == 'chimangGoc') txt = "Sử dụng " + this.number_format(this.tangchiMang(my.info.chiso[skill.object], 1)) + " tiềm năng để tăng 1 chí mạng gốc.";

            console.log(skill)
            let TxtBox = new PIXI.Text(txt, {
                fontSize: 13,
                fill: 0x0080fe,
                fontFamily: 'chelthm',
                fontWeight: 'bold',
                align: "center",
                fontWeight: 'bold',
                fontWrap: true,
                wordWrap: true,
                wordWrapWidth: boxBackground.mwidth / 2
            });
            TxtBox.y = 5;
            TxtBox.x = boxBackground.mwidth / 2 - TxtBox.width / 2;
            TxtBox.resolution = 2;
            heightKhung += TxtBox.height + 10;
            boxBackground.addChild(TxtBox);
        } else {
            let mySkill = my.skill.find(e => e.id == skill.id);
            if(mySkill && my.skill.level <= 0) {


                let TxtBox = new PIXI.Text("Bạn chưa học kĩ năng này, hãy tới Quy Lão Kame để học miễn phí hoặc mua sách võ công để học", {
                    fontSize: 13,
                    fill: 0x0080fe,
                    fontFamily: 'chelthm',
                    fontWeight: 'bold',
                    align: "center",
                    fontWeight: 'bold',
                    fontWrap: true,
                    wordWrap: true,
                    wordWrapWidth: boxBackground.mwidth / 2
                });
                TxtBox.y = 5;
                TxtBox.x = boxBackground.mwidth / 2 - TxtBox.width / 2;
                TxtBox.resolution = 2;
                heightKhung += TxtBox.height + 10;
                boxBackground.addChild(TxtBox);
            } else {
                let nameSkill = new PIXI.Text(skill.name, {
                    fontSize: 13,
                    fill: 0x532905,
                    fontFamily: 'chelthm',
                    fontWeight: 'bold',
                    align: "center",
                    fontWeight: 'bold',
                    fontWrap: true,
                    wordWrap: true,
                    wordWrapWidth: boxBackground.mwidth / 2
                });
                nameSkill.y = 5;
                nameSkill.x = boxBackground.mwidth / 2 - nameSkill.width / 2;
                nameSkill.resolution = 2;
                heightKhung += nameSkill.height + 10;
                boxBackground.addChild(nameSkill);

                let motaSkill = new PIXI.Text(skill.mota, {
                    fontSize: 13,
                    fill: 0xc6e59d,
                    fontFamily: 'chelthm',
                    fontWeight: 'bold',
                    align: "center",
                    fontWeight: 'bold',
                    fontWrap: true,
                    wordWrap: true,
                    wordWrapWidth: boxBackground.mwidth / 1.3
                });
                motaSkill.y = nameSkill.y + nameSkill.height;
                motaSkill.x = boxBackground.mwidth / 2 - motaSkill.width / 2;
                motaSkill.resolution = 2;
                heightKhung += motaSkill.height;
                boxBackground.addChild(motaSkill);


                let hr = new PIXI.Graphics();
                hr.lineStyle(1, 0x000000, 1);
                hr.moveTo(0, motaSkill.y + motaSkill.height + 10);
                hr.lineTo(boxBackground.mwidth * 0.8, motaSkill.y + motaSkill.height + 10);
                // hr x = center
                hr.x = (boxBackground.mwidth - hr.width) / 2;
                boxBackground.addChild(hr);

                let levelSkill = new PIXI.Text("Cấp độ: " + mySkill.level, {
                    fontSize: 13,
                    fill: 0x637dfe,
                    fontFamily: 'chelthm',
                    fontWeight: 'bold',
                    align: "center",
                    fontWeight: 'bold',
                    fontWrap: true,
                    wordWrap: true,
                    wordWrapWidth: boxBackground.mwidth / 2
                });
                levelSkill.y = motaSkill.y + motaSkill.height + 15;
                levelSkill.x = boxBackground.mwidth / 2 - levelSkill.width / 2;
                levelSkill.resolution = 2;
                heightKhung += levelSkill.height + 15;
                boxBackground.addChild(levelSkill);


                let desc = '';
                desc = (skill.type == 'attack' ? 'Gây sát thương ' + skill.dame[mySkill.level] + '%' : 'Thời gian tác dụng ' + skill.dame[mySkill.level] + ' giây ');
                if(skill.desc) 
                {
                    // repace $ to  skill.dame[mySkill.level] 
                    desc = skill.desc.replace('$', skill.dame[mySkill.level]);
                }

                let dameSkill = new PIXI.Text(desc, {
                    fontSize: 13,
                    fill: 0x0080fe,
                    fontFamily: 'chelthm',
                    fontWeight: 'bold',
                    align: "center",
                    fontWeight: 'bold',
                    fontWrap: true,
                    wordWrap: true,
                    wordWrapWidth: boxBackground.mwidth / 2
                });
                dameSkill.y = levelSkill.y + levelSkill.height;
                dameSkill.x = boxBackground.mwidth / 2 - dameSkill.width / 2;
                dameSkill.resolution = 2;
                heightKhung += dameSkill.height;
                boxBackground.addChild(dameSkill);


                let kiSkill = new PIXI.Text("KI tiêu hao: " + skill.ki[mySkill.level] + (skill.kit == 2 ? '%' : ''), {
                    fontSize: 13,
                    fill: 0x0080fe,
                    fontFamily: 'chelthm',
                    fontWeight: 'bold',
                    align: "center",
                    fontWeight: 'bold',
                    fontWrap: true,
                    wordWrap: true,
                    wordWrapWidth: boxBackground.mwidth / 2
                });
                kiSkill.y = dameSkill.y + dameSkill.height;
                kiSkill.x = boxBackground.mwidth / 2 - kiSkill.width / 2;
                kiSkill.resolution = 2;
                heightKhung += kiSkill.height;
                boxBackground.addChild(kiSkill);

                let timeSkill = new PIXI.Text("Thời gian hồi: " + skill.time[mySkill.level] * 1000 + " mili giây", {
                    fontSize: 13,
                    fill: 0x0080fe,
                    fontFamily: 'chelthm',
                    fontWeight: 'bold',
                    align: "center",
                    fontWeight: 'bold',
                    fontWrap: true,
                    wordWrap: true,
                    wordWrapWidth: boxBackground.mwidth / 2
                });

                timeSkill.y = kiSkill.y + kiSkill.height;
                timeSkill.x = boxBackground.mwidth / 2 - timeSkill.width / 2;
                timeSkill.resolution = 2;
                heightKhung += timeSkill.height;
                boxBackground.addChild(timeSkill);

                let hr2 = new PIXI.Graphics();
                hr2.lineStyle(1, 0x000000, 1);
                hr2.moveTo(0, timeSkill.y + timeSkill.height + 10);
                hr2.lineTo(boxBackground.mwidth * 0.8, timeSkill.y + timeSkill.height + 10);
                // hr x = center
                hr2.x = (boxBackground.mwidth - hr2.width) / 2;
                boxBackground.addChild(hr2);


                let descUpLevel = new PIXI.Text(mySkill.level < 7 ? 'Để lên cấp ' + (mySkill.level + 1) + ', hãy đến Quy Lão Kame để học miễn phí hoặc mua sách võ công.' : 'Đã đạt cấp độ tối đa.', {
                    fontSize: 13,
                    fill: 0x532905,
                    fontFamily: 'chelthm',
                    fontWeight: 'bold',
                    align: "center",
                    fontWeight: 'bold',
                    fontWrap: true,
                    wordWrap: true,
                    wordWrapWidth: boxBackground.mwidth / 2
                });
                descUpLevel.y = timeSkill.y + timeSkill.height + 15;
                descUpLevel.x = boxBackground.mwidth / 2 - descUpLevel.width / 2;
                descUpLevel.resolution = 2;
                heightKhung += descUpLevel.height + 15;
                boxBackground.addChild(descUpLevel);


            }
        }




        boxBackground.mwidth = boxBackground.mwidth < width ? width : boxBackground.mwidth;




        boxBackground.clear();
        boxBackground.lineStyle(1, 0x000000, 1);
        boxBackground.beginFill(0xffffff, 1);
        boxBackground.drawRoundedRect(0, 0, boxBackground.mwidth, heightKhung, 10);
        boxBackground.endFill();


        // create button use item height = 30% of boxBackground, width = 30% of boxBackground use Graphics

        let useContainer = new PIXI.Container();
        this.boxPreviewItem.addChild(useContainer);


        if(skill.type == 'bidong') {


            if(1 + 1 == 2) {
                let arrayUp = [20, 200, 2000];

                arrayUp = skill.object == 'hpGoc' ? [20, 200, 2000,20000] : arrayUp;
                arrayUp = skill.object == 'kiGoc' ? [20, 200, 2000,20000] : arrayUp;
                arrayUp = skill.object == 'sucdanhGoc' ? [1, 10, 100,1000] : arrayUp;
                arrayUp = skill.object == 'chimangGoc' ? [1] : arrayUp;
                arrayUp = skill.object == 'giapGoc' ? [1, 10, 100] : arrayUp;

                let self = this;
                arrayUp.forEach(element => {

                    let buttonUp = new PIXI.Graphics();
                    buttonUp.lineStyle(1, 0x5f1a30, 1);
                    buttonUp.beginFill(0xd68f32, 1);
                    buttonUp.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 5);
                    buttonUp.endFill();
                    buttonUp.x = (useContainer.children.length * (buttonUp.getBounds().width + 10));
                    buttonUp.y = 0;
                    buttonUp.name = 'since04';
                    useContainer.addChild(buttonUp);
                    buttonUp.interactive = true;
                    buttonUp.buttonMode = true;
                    buttonUp.on('pointerdown', function() {
                        self.userTang(skill.object, element);
                    });

                    // change color when hover
                    buttonUp.on('pointerover', function() {
                        buttonUp.tint = 0x49be62;
                    });
                    buttonUp.on('pointerout', function() {
                        buttonUp.tint = 0xffffff;
                    });

                    let t = "";

                    t = skill.object == 'hpGoc' ? "tăng " + element + " HP -" + this.intToM(this.tangHP(my.info.chiso[skill.object], element)) + " " : t;
                    t = skill.object == 'kiGoc' ? "tăng " + element + " KI -" + this.intToM(this.tangHP(my.info.chiso[skill.object], element)) + " " : t;
                    t = skill.object == 'sucdanhGoc' ? "tăng " + element + " Sức đánh -" + this.intToM(this.tangSucDanh(my.info.chiso[skill.object], element)) + " " : t;
                    t = skill.object == 'chimangGoc' ? "tăng " + element + " Chí mạng -" + this.intToM(this.tangchiMang(my.info.chiso[skill.object], element)) + " " : t;
                    t = skill.object == 'giapGoc' ? "tăng " + element + " Giáp -" + this.intToM(this.tangGiap(my.info.chiso[skill.object], element)) + " " : t;


                    let tiemnangcan = 0;
                    tiemnangcan = skill.object == 'hpGoc' ? this.tangHP(my.info.chiso[skill.object], element) : tiemnangcan;
                    tiemnangcan = skill.object == 'kiGoc' ? this.tangHP(my.info.chiso[skill.object], element) : tiemnangcan;
                    tiemnangcan = skill.object == 'sucdanhGoc' ? this.tangSucDanh(my.info.chiso[skill.object], element) : tiemnangcan;
                    tiemnangcan = skill.object == 'chimangGoc' ? this.tangchiMang(my.info.chiso[skill.object], element) : tiemnangcan;
                    tiemnangcan = skill.object == 'giapGoc' ? this.tangGiap(my.info.chiso[skill.object], element) : tiemnangcan;

                    if(my.info.coban.tiemnang < tiemnangcan) {
                        buttonUp.visible = false;

                    }

                    let txt = new PIXI.Text(t, {
                        fontSize: 13,
                        fill: 0x532905,
                        fontFamily: 'chelthm',
                        fontWeight: 'bold',
                        align: "center",
                        fontWeight: 'bold',
                        fontWrap: true,
                        wordWrap: true,
                        wordWrapWidth: buttonUp.getBounds().width / 1.3


                    });
                    txt.resolution = 2;
                    txt.y = buttonUp.getBounds().height / 2 - txt.height / 2;
                    txt.x = buttonUp.getBounds().width / 2 - txt.width / 2;
                    buttonUp.addChild(txt);


                    useContainer.addChild(buttonUp);


                });
            }

        } else {
            let mySkill = my.skill.find(e => e.id == skill.id);
            if(mySkill && mySkill.level >= 1) {
                let soO = 5;
                let arrayUp = [0, 1, 2, 3, 4];
                arrayUp.forEach(element => {

                    let buttonUp = new PIXI.Graphics();
                    buttonUp.lineStyle(1, 0x5f1a30, 1);
                    buttonUp.beginFill(0xd68f32, 1);
                    buttonUp.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 5);
                    buttonUp.endFill();
                    buttonUp.x = (useContainer.children.length * (buttonUp.getBounds().width + 10));
                    buttonUp.y = 0;
                    useContainer.addChild(buttonUp);
                    buttonUp.interactive = true;
                    buttonUp.buttonMode = true;
                    let self = this;
                    buttonUp.on('pointerdown', function() {
                        self.userSkill(skill.id, element);
                    });
                    buttonUp.name = 'since04';
                    // change color when hover
                    buttonUp.on('pointerover', function() {
                        buttonUp.tint = 0x49be62;
                    });
                    buttonUp.on('pointerout', function() {
                        buttonUp.tint = 0xffffff;
                    });



                    let txt = new PIXI.Text("Gán phím " + (element + 1) + " ", {
                        fontSize: 13,
                        fill: 0x532905,
                        fontFamily: 'chelthm',
                        fontWeight: 'bold',
                        align: "center",
                        fontWeight: 'bold',
                        fontWrap: true,
                        wordWrap: true,
                        wordWrapWidth: buttonUp.getBounds().width / 1.3
                    })
                    txt.resolution = 2;
                    txt.y = buttonUp.getBounds().height / 2 - txt.height / 2;
                    txt.x = buttonUp.getBounds().width / 2 - txt.width / 2;
                    buttonUp.addChild(txt);

                });



            }
        }




        boxBackground.y = itemPos.y - boxBackground.getBounds().height + itemPos.height;

        if(boxBackground.y + boxBackground.getBounds().height + useContainer.getBounds().height > this.gameHeight) {
            boxBackground.y = this.gameHeight - boxBackground.getBounds().height - 10 - useContainer.getBounds().height;
        }

        if(boxBackground.y < 0) {
            boxBackground.y = 10;
        }


        useContainer.x = (boxBackground.getBounds().width - useContainer.getBounds().width) / 2;
        if(useContainer.x < 0) useContainer.x = boxBackground.getBounds().x;
        useContainer.y = boxBackground.getBounds().height + boxBackground.getBounds().y;



        let point = 0;
        if(this.pcKey == 'Enter') this.pcKey = '1';

        let banphimPc = setInterval(() => {
            if(this.boxPreviewItem.children.length <= 0) {
                clearInterval(banphimPc);
                return false;
            }

            let children = useContainer.children.filter(e => e.name == 'since04');
            let event = this.pcKey;

            if(event === 'ArrowLeft') {
                point -= 1;
                if(point < 0) point = children.length - 1;

            } else if(event === 'ArrowRight') {
                point += 1;
                if(point >= children.length) point = 0;
            }

            if(event === 'ArrowUp') {
                this.boxPreviewItem.removeChildren();

            } else if(event === 'ArrowDown') {
                this.boxPreviewItem.removeChildren();

            }

            if(event === 'Enter') {
                let current = children[point];
                let event = this.getAllInteractiveChildren(current);
                if(event.length > 0) {
                    event[0].emit('pointerdown');
                    event[0].emit('pointerup');
                    this.boxPreviewItem.removeChildren();
                }
            }

            if(children[point] && this.pcKey.length >= 1) {
                for(let i = 0; i < children.length; i++) {
                    children[i].removeChild(children[i].getChildByName('xanhle'));
                }

                let width = children[point].width;
                let height = children[point].height;
                let background = new PIXI.Graphics();
                background.lineStyle(0, 0x000000, 1);
                background.beginFill(0xf8fe4a, 0.5);
                background.drawRoundedRect(0, 0, width, height, 0);
                background.endFill();
                background.name = "xanhle";
                children[point].addChild(background);

                let current = children[point];
                let eventclick = this.getAllInteractiveChildren(current);

                if(eventclick.length > 0) {
                    background.interactive = true;
                    background.cursor = 'pointer';
                    // coppy interacive from children[point]
                    background.on('pointerdown', () => {
                        eventclick[0].emit('pointerdown');
                        this.boxPreviewItem.removeChildren();

                    });
                    background.on('pointerup', () => {
                        eventclick[0].emit('pointerup');
                        this.boxPreviewItem.removeChildren();
                    });

                }
            }


            this.pcKey = '';
        }, this.app.ticker.deltaMS);

    }
}