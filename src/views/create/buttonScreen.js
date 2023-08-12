import loginView from '../login/loginView.js';
class buttonScreen extends loginView {
    constructor() {
        super();
    }

    CreateDisplayOnScreen() {
        this.NutOnScreen.removeChildren();
        this.NutOnScreenAction.removeChildren();




        let bg_attack_click = new PIXI.Sprite(this.coverImg('bg_attack'));

        let chieu = this.gameWidth > this.gameHeight ? this.gameWidth : this.gameHeight;
        bg_attack_click.width = chieu * 0.13;
        bg_attack_click.height = chieu * 0.13;

        bg_attack_click.x = this.gameWidth - bg_attack_click.width;
        bg_attack_click.y = this.SkillInSrcreen.y - this.SkillInSrcreen.height - bg_attack_click.height / 2;
        if(this.gameWidth > this.gameHeight) { // nếu là màn hình ngnag
            bg_attack_click.y = this.gameHeight - bg_attack_click.height;
        }

        let effAttack = (type) => {
            bg_attack_click.width = chieu * (type == true ? 0.11 : 0.13);
            bg_attack_click.height = chieu * (type == true ? 0.11 : 0.13);
            bg_attack_click.texture = type == true ? this.coverImg('bg_attack_click') : this.coverImg('bg_attack');
        }

        bg_attack_click.alpha = 1;
        bg_attack_click.visible = true;
        bg_attack_click.interactive = true;
        bg_attack_click.buttonMode = true;
        bg_attack_click.on('pointerdown', () => {
            this.interAttack();
            effAttack(true);
        });
        bg_attack_click.on('pointerup', () => {
            effAttack(false);
        });

        // pointerover
        bg_attack_click.on('pointerover', () => {
            effAttack(true);
        });

        // pointerout

        bg_attack_click.on('pointerout', () => {
            effAttack(false);
        });


        let bg_change = new PIXI.Sprite(this.coverImg('change'));

        let chieu2 = this.gameWidth > this.gameHeight ? this.gameWidth : this.gameHeight;

        bg_change.width = chieu2 * 0.08;
        bg_change.height = chieu2 * 0.08;

        bg_change.x = this.gameWidth - bg_change.width;
        bg_change.y = bg_attack_click.y - bg_change.height;

        bg_change.alpha = 1;

        bg_change.visible = true;

        bg_change.interactive = true;
        bg_change.buttonMode = true;
        bg_change.on('pointerdown', () => {
            bg_change.texture = this.coverImg('change_click')
            this.changeClickAuto();
        });

        bg_change.on('pointerup', () => {
            bg_change.texture = this.coverImg('change')
        });


        bg_change.on('pointerover', () => {
            bg_change.texture = this.coverImg('change_click')
        });


        bg_change.on('pointerout', () => {
            bg_change.texture = this.coverImg('change')
        });


        let bg_dauthan = new PIXI.Sprite(this.coverImg('myTexture2dPea0-resources.assets-813'));

        bg_dauthan.width = chieu2 * 0.08;
        bg_dauthan.height = chieu2 * 0.08;


        if(this.gameWidth > this.gameHeight) { // màn ngang
            bg_dauthan.x = bg_attack_click.x - bg_dauthan.width - (bg_dauthan.width / 100 * 10);
            bg_dauthan.y = this.gameHeight - bg_dauthan.height - this.gameHeight * 0.05;
        } else {
            bg_dauthan.x = this.gameWidth - bg_dauthan.width;
            bg_dauthan.y = bg_change.y - bg_dauthan.height - (bg_dauthan.height / 100 * 10);
        }

        bg_dauthan.alpha = 1;
        bg_dauthan.visible = true;
        bg_dauthan.interactive = true;
        bg_dauthan.course = 'pointer';
        bg_dauthan.on('pointerdown', () => {
            this.useDauThan();
        });

        // pointerover

        bg_dauthan.on('pointerover', () => {
            bg_dauthan.texture = this.coverImg('myTexture2dPea1-resources.assets-859')
        });

        // pointerout

        bg_dauthan.on('pointerout', () => {
            bg_dauthan.texture = this.coverImg('myTexture2dPea0-resources.assets-813')
        });

        this.bg_dauthan = bg_dauthan;

        // add background circle white to IN bg_dauthan witdh and height smaller than bg_dauthan

        let bg_dauthan_circle = new PIXI.Graphics();
        bg_dauthan_circle.beginFill(0xffffff);
        bg_dauthan_circle.drawCircle(0, 0, bg_dauthan.width / 100 * 33, bg_dauthan.height / 100 * 30);
        bg_dauthan_circle.endFill();
        bg_dauthan_circle.x = bg_dauthan.x + bg_dauthan_circle.width / 2 + bg_dauthan.width / 100 * 20;
        bg_dauthan_circle.y = bg_dauthan.y + bg_dauthan_circle.height / 2 + bg_dauthan.height / 100 * 20;
        bg_dauthan_circle.alpha = 1;

        bg_dauthan_circle.heightMAX = bg_dauthan_circle.height;

        // add text number to bg_dauthan_circle

        let text_dauthan = new PIXI.Text('99', {
            fontFamily: 'fontchinh',
            fontSize: 13,
            fill: 0x000000,
        });

        text_dauthan.x = bg_dauthan_circle.x - text_dauthan.width / 2;
        text_dauthan.y = bg_dauthan_circle.y - text_dauthan.height / 2;
        this.text_dauthan = text_dauthan;
        this.bg_dauthan_circle = bg_dauthan_circle;


        let bg_notice = new PIXI.Graphics();
        bg_notice.beginFill(0x000000);
        bg_notice.drawRect(0, 0, this.gameWidth, this.gameHeight * 0.05);
        bg_notice.endFill();
        bg_notice.x = 0;
        bg_notice.y = 0;
        bg_notice.alpha = 0.5;
        bg_notice.visible = true;
        bg_notice.interactive = true;
        bg_notice.buttonMode = true;
        bg_notice.y = this.gameHeight - this.gameHeight * 0.05;

        let text_notice = new PIXI.Text('Chúc mừng bạn ABC vừa nhận thành công vũ trụ số 6 cả thế giới đều ngường mộ chúng ta lắm luôn ai cũng mừng cho bạn Chúc mừng bạn ABC vừa nhận thành công vũ trụ số 6 cả thế giới đều ngường mộ chúng ta lắm luôn ai cũng mừng cho bạn', {
            fontFamily: 'fontchinh',
            fontSize: 16,
            fill: 0xFFFFFF,

        });

        text_notice.x = 0;
        text_notice.y = this.gameHeight - this.gameHeight * 0.05 + this.gameHeight * 0.05 / 100 * 50 - text_notice.height / 100 * 50;


        text_notice.visible = false;
        bg_notice.visible = false;

        this.text_notice = text_notice;
        this.bg_notice = bg_notice;


        let circle = new PIXI.Graphics();
        circle.beginFill(0x805a34);
        let nho = this.gameHeight > this.gameWidth ? this.gameWidth : this.gameHeight;
        let lon = this.gameHeight < this.gameWidth ? this.gameHeight : this.gameWidth;
        circle.drawCircle(0, 0, lon * 0.13);
        circle.endFill();
        circle.x = 0 + circle.width / 2;
        circle.y = this.SkillInSrcreen.y - this.SkillInSrcreen.height;
        if(this.gameWidth > this.gameHeight) { // nếu là màn hình ngnag
            circle.y = this.gameHeight - circle.height;

        }
        circle.alpha = 0.5;

        // create circle on center of circle

        let circle2 = new PIXI.Graphics();
        circle2.beginFill(0xde4a07);
        circle2.drawCircle(0, 0, lon * 0.11);
        circle2.endFill();
        circle2.x = circle.x;
        circle2.y = circle.y;

        circle2.interactive = true;
        circle2.course = 'pointer';
        circle2.buttonMode = true;

        circle2.move = false;

        circle2.on('pointerdown', () => {
            circle2.move = true;
        });

        let self = this;

        let resetKey = () => {
            delete self.keysPressed[40];
            delete self.keysPressed[38];
            delete self.keysPressed[37];
            delete self.keysPressed[39];
        }

        let joysicketmove = function(event) {
            if(self.checkKey()) {
                resetKey();
            } else
            if(circle2.move == true) {
                resetKey();
                let newX = event.data.global.x - circle.x;
                let newY = event.data.global.y - circle.y;
                circle2.x = event.data.global.x;
                circle2.y = event.data.global.y;
                if(circle2.x > circle.x + circle.width / 2) {
                    circle2.x = circle.x + circle.width / 2;
                }
                if(circle2.x < circle.x - circle.width / 2) {
                    circle2.x = circle.x - circle.width / 2;

                }
                if(circle2.y > circle.y + circle.height / 2) {
                    circle2.y = circle.y + circle.height / 2;
                }
                if(circle2.y < circle.y - circle.height / 2) {
                    circle2.y = circle.y - circle.height / 2;
                }

                // check distance top left right
                let distance = Math.sqrt(Math.pow(newX, 2) + Math.pow(newY, 2));
                if(distance > circle.width / 2) {
                    circle2.x = newX * circle.width / 2 / distance + circle.x;
                    circle2.y = newY * circle.height / 2 / distance + circle.y;
                }

                // wirte code to determine the direction of the character
                let x = circle2.x - circle.x;
                let y = circle2.y - circle.y;
                let angle = Math.atan2(y, x);
                let degree = angle * 180 / Math.PI;
                let direction = '';
                if(degree > -45 && degree < 45) {
                    direction = 39;
                }
                if(degree > 45 && degree < 135) {
                    direction = 40;
                }
                if(degree > 135 || degree < -135) {
                    direction = 37;
                }
                if(degree > -135 && degree < -45) {
                    direction = 38;
                }
                self.pressNut(direction)
            }
        }


        this.screen.on('pointermove', e => {
            joysicketmove(e);
        });
        this.screen.on('pointerup', e => {
            circle2.x = circle.x;
            circle2.y = circle.y;
            circle2.move = false;
            self.timeRoiTuDo = Date.now() + 500;
            resetKey();
            if(self.my.info.act == 'move') {

                self.my.info.act = 'dungyen';
                self.addAction()
            }
        });


        circle2.on('pointermove', (event) => {
            joysicketmove(event);
        });




        let bg_chat_icon = 'myTexture2dchat-resources.assets-101';
        if(this.PC) bg_chat_icon = 'chat-resources.assets-749';
        let bg_chat_icon_click = 'myTexture2dchat2-resources.assets-430';
        if(this.PC) bg_chat_icon_click = 'chat2-resources.assets-1613';

        let bg_chat = new PIXI.Sprite(this.coverImg(bg_chat_icon));

        bg_chat.width = (this.gameHeight > this.gameWidth ? this.gameHeight : this.gameWidth) * 0.06;
        bg_chat.height = (this.gameHeight > this.gameWidth ? this.gameHeight : this.gameWidth) * 0.06;

        if(this.gameWidth > this.gameHeight) {
            // màn hình ngang 
            bg_chat.x = this.gameWidth * 1 - bg_chat.width - (bg_chat.width / 100 * 20);
            bg_chat.y = 0 + (bg_chat.height / 100 * 10);
        } else {
            bg_chat.height = bg_dauthan.height;
            bg_chat.width = bg_dauthan.width;
            bg_chat.x = this.gameWidth - bg_chat.width;
            bg_chat.y = bg_dauthan.y - bg_chat.height - (bg_chat.height / 100 * 10);
        }

        bg_chat.alpha = 1;
        bg_chat.visible = true;
        bg_chat.interactive = true;
        bg_chat.buttonMode = true;
        bg_chat.on('pointerdown', () => {
            this.openChat();
        });

        // pointerover
        bg_chat.on('pointerover', () => {
            bg_chat.texture = this.coverImg(bg_chat_icon_click)
        });

        // pointerout
        bg_chat.on('pointerout', () => {
            bg_chat.texture = this.coverImg(bg_chat_icon)
        });

        bg_chat.visible = true;


        let chatVoice = new PIXI.Sprite(this.coverImg('micof'));
        chatVoice.width = (this.gameHeight > this.gameWidth ? this.gameHeight : this.gameWidth) * 0.06;
        chatVoice.height = (this.gameHeight > this.gameWidth ? this.gameHeight : this.gameWidth) * 0.06;

        if(this.gameWidth > this.gameHeight) {
            // màn hình ngang 
            chatVoice.x = bg_chat.x - chatVoice.width - (chatVoice.width / 100 * 20);
            chatVoice.y = 0 + (chatVoice.height / 100 * 10);
        } else {
            chatVoice.height = bg_chat.height;
            chatVoice.width = bg_chat.width;
            chatVoice.x = this.gameWidth - chatVoice.width;
            chatVoice.y = bg_chat.y - chatVoice.height - (chatVoice.height / 100 * 10);
        }

        chatVoice.interactive = true;
        chatVoice.course = 'pointer';
        chatVoice.on('pointerdown', () => {
            if(this.autoVoice) {
                chatVoice.texture = this.coverImg('micof');
                this.voiceOff();
            } else {
                chatVoice.texture = this.coverImg('micon');
                this.voiceOn();
            }
        });




        this.NutOnScreenAction.addChild(circle, circle2, bg_change, bg_attack_click, bg_dauthan_circle, bg_dauthan, text_dauthan);
        this.NutOnScreen.addChild(bg_chat, chatVoice, bg_notice, text_notice);

    }


    createDisplayOnPlayerInfo() {
        let my = this.my;

        let khungInfoGame = new PIXI.Container();

        khungInfoGame.interactive = true;
        khungInfoGame.course = 'pointer';
        khungInfoGame.on('pointerdown', () => {
            this.openLastMenu();
        });


        let backGroundKhung = new PIXI.Graphics();


        khungInfoGame.addChild(backGroundKhung);

        let set = {
            max: 300,
            max2: 120,
        };

        khungInfoGame.mwidth = this.gameWidth * 0.7;
        khungInfoGame.mheight = this.gameHeight * 0.35;

        khungInfoGame.mwidth = khungInfoGame.mwidth > set.max ? set.max : khungInfoGame.mwidth;
        khungInfoGame.mheight = khungInfoGame.mheight > set.max2 ? set.max2 : khungInfoGame.mheight;

        khungInfoGame.width = khungInfoGame.mwidth
        khungInfoGame.height = khungInfoGame.mheight


        let back70 = new PIXI.Graphics();

        // show hp and ki height = 80% of back70

        this.hp_BGKhung = new PIXI.Graphics();
        this.hp_BGKhung.lineStyle(0.9, 0x000000, 1); // Độ dày đường viền là 0
        this.hp_BGKhung.beginFill(0xe89222, 0.7); // Màu đen với độ trong suốt là 0.5
        this.hp_BGKhung.drawRoundedRect(0, 0, khungInfoGame.mwidth * 0.7, khungInfoGame.mheight * 0.7, 5);
        this.hp_BGKhung.endFill();
        back70.addChild(this.hp_BGKhung);

        // show progress hp and ki first crate background progress

        this.hpProgress_BGKhung = new PIXI.Graphics();
        this.hpProgress_BGKhung.beginFill(0x000000, 0.7); // Màu đen với độ trong suốt là 0.5
        this.hpProgress_BGKhung.drawRoundedRect(0, 0, this.hp_BGKhung.getBounds().width * 0.8, this.hp_BGKhung.getBounds().height * 0.3, 5);
        this.hpProgress_BGKhung.endFill();
        this.hpProgress_BGKhung.x = this.hp_BGKhung.getBounds().width * 0.1;
        this.hpProgress_BGKhung.y = this.hp_BGKhung.getBounds().height * 0.1;
        this.hp_BGKhung.addChild(this.hpProgress_BGKhung);

        // show progress hp and ki crate progress

        this.hpProgress = new PIXI.Graphics();
        this.hpProgress.beginFill(0xdb2804, 0.7); // Màu đen với độ trong suốt là 0.5
        this.hpProgress.drawRoundedRect(0, 0, this.hpProgress_BGKhung.getBounds().width * 0.5, this.hpProgress_BGKhung.getBounds().height, 5);
        this.hpProgress.maxWidth = this.hpProgress_BGKhung.getBounds().width * 1;
        this.hpProgress.endFill();
        this.hpProgress.x = this.hpProgress_BGKhung.getBounds().width - this.hpProgress_BGKhung.getBounds().width;
        this.hpProgress.y = 0;
        this.hpProgress_BGKhung.addChild(this.hpProgress);



        this.kiProgress_BGKhung = new PIXI.Graphics();
        this.kiProgress_BGKhung.beginFill(0x000000, 0.7); // Màu đen với độ trong suốt là 0.5
        this.kiProgress_BGKhung.drawRoundedRect(0, 0, this.hp_BGKhung.getBounds().width * 0.8, this.hp_BGKhung.getBounds().height * 0.3, 5);
        this.kiProgress_BGKhung.endFill();
        this.kiProgress_BGKhung.x = this.hp_BGKhung.getBounds().width * 0.1;
        this.kiProgress_BGKhung.y = this.hp_BGKhung.getBounds().height * 0.6;
        this.hp_BGKhung.addChild(this.kiProgress_BGKhung);

        // show progress hp and ki crate progress

        this.kiProgress = new PIXI.Graphics();
        this.kiProgress.beginFill(0x0099ce, 0.7); // Màu đen với độ trong suốt là 0.5
        this.kiProgress.drawRoundedRect(0, 0, this.kiProgress_BGKhung.getBounds().width * 0.5, this.kiProgress_BGKhung.getBounds().height, 5);
        this.kiProgress.maxWidth = this.kiProgress_BGKhung.getBounds().width * 1;
        this.kiProgress.endFill();
        this.kiProgress.x = this.kiProgress_BGKhung.getBounds().width - this.kiProgress_BGKhung.getBounds().width;
        this.kiProgress.y = 0;
        this.kiProgress_BGKhung.addChild(this.kiProgress);




        // show text KI and HP on center this.kiProgress and this.hpProgress

        this.hpText = new PIXI.Text(my.info.chiso.hp, {
            fontFamily: "fontchinh",
            fontSize: 11,
            fill: "white",


        });

        this.hpText.x = this.hpProgress_BGKhung.getBounds().width / 2 - this.hpText.getBounds().width / 2;
        this.hpText.y = this.hpProgress_BGKhung.getBounds().height / 2 - this.hpText.getBounds().height / 2;

        this.hpProgress_BGKhung.addChild(this.hpText);

        this.kiText = new PIXI.Text(my.info.chiso.ki, {
            fontFamily: "fontchinh",
            fontSize: 11,
            fill: "white",

        });

        this.kiText.x = this.kiProgress_BGKhung.getBounds().width - this.kiText.getBounds().width;
        this.kiText.y = this.kiProgress_BGKhung.getBounds().height / 2 - this.kiText.getBounds().height / 2;

        this.kiProgress_BGKhung.addChild(this.kiText);







        khungInfoGame.addChild(back70);


        khungInfoGame.x = 0;
        khungInfoGame.y = 0;



        this.khungThongTinDoiThu = new PIXI.Container();

        this.backGoundInfoMMO = new PIXI.Graphics();

        this.backGoundInfoMMO.beginFill(0xe89222, 0.7); // Màu đen với độ trong suốt là 0.5
        this.backGoundInfoMMO.lineStyle(1, 0x000000, 11); // Độ dày đường viền là 0
        let d = khungInfoGame.width * 0.3;
        if(khungInfoGame.width + d < this.gameWidth) d = khungInfoGame.width * 0.5;
        this.backGoundInfoMMO.drawRoundedRect(0, 0, d, khungInfoGame.mheight * 0.5, 5);
        this.backGoundInfoMMO.endFill();

        // show my.name in center this.backGoundInfoMMO

        this.contaiNerNameInHpMMO = new PIXI.Container();

        this.myNameText = new PIXI.Text(my.name, {
            fontFamily: "fontchinh",
            fontSize: 14,
            fill: 0xFFFACD,


        });
        this.myNameText.width = this.myNameText.width > this.backGoundInfoMMO.getBounds().width ? this.backGoundInfoMMO.getBounds().width : this.myNameText.width;
        this.myNameText.height = this.myNameText.height > this.backGoundInfoMMO.getBounds().height ? this.backGoundInfoMMO.getBounds().height : this.myNameText.height;
        this.myNameText.x = this.backGoundInfoMMO.getBounds().width / 2 - this.myNameText.getBounds().width / 2;
        this.myNameText.y = 0;

        // show my.info.chiso.hp in center this.backGoundInfoMMO and on bottom this.myNameText

        this.myHPText = new PIXI.Text(my.info.chiso.hp, {
            fontFamily: "fontchinh",
            fontSize: 11,
            fill: 0xf81010,

        });
        this.myHPText.x = this.backGoundInfoMMO.getBounds().width / 2 - this.myHPText.getBounds().width / 2;
        this.myHPText.y = this.myNameText.getBounds().height;


        this.contaiNerNameInHpMMO.addChild(this.myNameText, this.myHPText);
        this.contaiNerNameInHpMMO.y = this.backGoundInfoMMO.getBounds().height / 2 - this.contaiNerNameInHpMMO.getBounds().height / 2;

        this.backGoundInfoMMO.addChild(this.contaiNerNameInHpMMO);

        this.khungThongTinDoiThu.addChild(this.backGoundInfoMMO);



        this.khungThongTinDoiThu.x = khungInfoGame.width + khungInfoGame.x;




        this.inGame.addChild(khungInfoGame, this.khungThongTinDoiThu);

        this.inGameMSG = new PIXI.Container();
        this.inGameMSG.x = 0;
        this.inGameMSG.y = khungInfoGame.y + khungInfoGame.height;
        this.inGameMSG.name = "Lớp chứa các lớp thông báo kĩ năng";
        this.inGame.addChild(this.inGameMSG);
    }


    createNutDaChet() {
        this.NutDaChet.removeChildren();

        let button = new PIXI.Graphics();
        button.lineStyle(3, 0x5c0518, 1); // Độ dày đường viền là 0
        button.beginFill(0xeea33c, 1); // Màu đen với độ trong suốt là 0.5
        let w = this.gameWidth;
        w = w > 150 ? 150 : w;
        button.drawRoundedRect(0, 0, w, 50, 5);
        button.endFill();
        button.x = this.gameWidth/2 - button.width/2;
        button.y = this.gameHeight - button.height;
        button.interactive = true;
        button.cursor = 'pointer';
        button.on('pointerdown', () => {
            this.boxMenuHoiSinh();
        }
        );

        let text = new PIXI.Text((this._('Kiệt sức')), {
            fontSize: 20,
            fontFamily: 'fontchinh',
            fill: 0x000000,

        });

        text.x = button.width/2 - text.width/2;
        text.y = button.height/2 - text.height/2;

        button.addChild(text);

        this.NutDaChet.addChild(button);

    }


    createSkillOnDisplay() {
        let SkillInSrcreen = this.SkillInSrcreen;
        let SkillDataOnScreen = this.SkillDataOnScreen;
        let my = this.my;
        let setting = this.setting;
        SkillInSrcreen.removeChildren();
        SkillDataOnScreen.background = [];
        SkillDataOnScreen.skill = [];
        SkillDataOnScreen.time = [];
        SkillDataOnScreen.texture = [];
        for(let i = 0; i < 5; i++) {

            let boxSkillSreeenSetting = {
                width: this.gameWidth * 0.15,
                height: this.gameWidth * 0.15,
            };
            if(boxSkillSreeenSetting.width > 50) {
                boxSkillSreeenSetting.width = 40;
                boxSkillSreeenSetting.height = 40;
            }
            if(boxSkillSreeenSetting.width > 100) {
                boxSkillSreeenSetting.width = 48;
                boxSkillSreeenSetting.height = 48;
            }

            if(1 + 1 == 2) {
                let infoMySkill = this.usedSkill(my.oskill[i]);
                if(infoMySkill) {
                    let avatarOfSkillShow = new PIXI.Sprite(this.coverImg(infoMySkill.avatar))
                    avatarOfSkillShow.avatar = infoMySkill.avatar;
                    SkillDataOnScreen.texture.push(avatarOfSkillShow);

                    avatarOfSkillShow.width = boxSkillSreeenSetting.width;
                    avatarOfSkillShow.height = boxSkillSreeenSetting.height;
                    avatarOfSkillShow.x = i * boxSkillSreeenSetting.width * 1.2;
                    avatarOfSkillShow.y = 0;
                    SkillInSrcreen.addChild(avatarOfSkillShow);
                    avatarOfSkillShow.interactive = true;
                    avatarOfSkillShow.cursor = 'pointer';
                    avatarOfSkillShow.on('pointerdown', () => {
                        if(setting.oskill != -1) SkillDataOnScreen.background[setting.oskill].tint = 0xffffff;
                        SkillDataOnScreen.background[i].tint = 0x2cd158;
                        setting.oskill = i;
                    });

                    let WhiteSkillTime = new PIXI.Graphics();
                    WhiteSkillTime.beginFill(0x4ea187, 0.7); // Màu đen với độ trong suốt là 0.5
                    WhiteSkillTime.lineStyle(1, 0x000000, 1); // Độ dày đường viền là 0
                    WhiteSkillTime.drawRect(0, 0, boxSkillSreeenSetting.width, boxSkillSreeenSetting.height);
                    WhiteSkillTime.endFill();
                    WhiteSkillTime.x = i * boxSkillSreeenSetting.width * 1.2;
                    WhiteSkillTime.y = 0;
                    WhiteSkillTime.max = WhiteSkillTime.height;

                    SkillInSrcreen.addChild(WhiteSkillTime);
                    SkillDataOnScreen.time.push(WhiteSkillTime);


                    let borderOfSkillShow = new PIXI.Graphics();
                    borderOfSkillShow.lineStyle(5, 0xeb4c12, 1); // Độ dày đường viền là 0
                    borderOfSkillShow.drawRoundedRect(0, 0, boxSkillSreeenSetting.width, boxSkillSreeenSetting.height, 5);
                    borderOfSkillShow.x = i * boxSkillSreeenSetting.width * 1.2;
                    borderOfSkillShow.y = 0;




                    SkillInSrcreen.addChild(borderOfSkillShow);
                    SkillDataOnScreen.background.push(borderOfSkillShow);



                }
            }

        }


        SkillInSrcreen.x = this.gameWidth / 2 - SkillInSrcreen.width / 2;
        SkillInSrcreen.y = this.gameHeight - SkillInSrcreen.height - this.gameHeight * 0.05;
        this.CreateDisplayOnScreen();
        this.createNutDaChet();
    }

}

export default buttonScreen;
