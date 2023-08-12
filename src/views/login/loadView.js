import WarningViewclass from './warningView.js';

class loadingView extends WarningViewclass {
    constructor() {
        super();

    }

    openURL = (url = false) => {
        if(!url) return this.notice('Chưa có địa chỉ nhấn');
        if(window.cordova) {
            window.open(url, '_system', 'location=yes');
        } else {
            window.open(url, '_blank');
        }
    }




    LoadFont = (name) => {
        let font1 = new PIXI.Text('', {
            fontFamily: name,
            fontSize: 40,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            align: 'center'
        });
        font1.x = 0;
        font1.y = this.gameHeight / 2 - font1.height / 2;
        return font1;
    }

    createGameConfig = () => {
        this.loadGame.removeChildren();
        let background = new PIXI.Graphics();
        this.loadGame.addChild(background);
        background.beginFill(0x000000, 1);
        background.lineStyle(0, 0x570b21, 1);
        background.drawRoundedRect(0, 0, this.gameWidth, this.gameHeight, 0);
        background.endFill();
        background.interactive = true;

        let txt = new PIXI.Text('Đang tải cấu hình cơ bản...', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            align: 'center'
        });
        txt.x = this.gameWidth / 2 - txt.width / 2;
        txt.y = this.gameHeight / 2 - txt.height / 2;

        let txt2 = new PIXI.Text('.', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            align: 'center'
        });
        txt2.x = this.gameWidth / 2 - txt2.width / 2;
        txt2.y = txt.y + txt.height;
        txt2.name = 'txt2';
        this.loadGame.addChild(txt, txt2);

        let i = 0;

        let time = setInterval(() => {
            if(i == 0) txt2.text = '.';
            if(i == 1) txt2.text = '..';
            if(i == 2) txt2.text = '...';
            i++;
            if(i == 3) i = 0;
        }
        , 300);

        // get data from file ./config.txt 
        let fetch = new XMLHttpRequest();
        fetch.open('GET', './config.json?date='+Date.now(), true);
        fetch.send();
        fetch.onreadystatechange = () => {
            if(fetch.readyState == 4 && fetch.status == 200) {
                let json = JSON.parse(fetch.response);
                for(let i in json) {
                    console.log(i + ' : ' + json[i]);
                }

                this.gameInfo.version = json.version;
                this.gameInfo.timeloadWelcome = json.time;
                this.gameInfo.server = json.server;
                this.gameInfo.gameName = json.name;
                this.gameInfo.name = json.nameDEV;
                this.gameInfo.debug = json.debug;
                this.gameInfo.login = json.login;

                if(this.gameInfo.debug == true) {
                    this.postionChar.visible = true;
                }
                else 
                {
                    this.postionChar.visible = false;
                }


                this.CallWebsocket();
                this.handleData();
                this.createObjectIO();
                this.ioStart();

                /* Tải trước các font */
                let data = [];
                this.gameInfo.font = [];
                for(let font in json.font) {
                    let url = "./assets/font/"+(json.font[font].length >=1 ? json.font[font] : font )+".ttf";
                    this.gameInfo.font.push(font);
                    data.push({
                        name : font,
                        url : url,
                    })
                }

                let j = 0; 
                let express = () => {
                    /*
                    let font = new FontFace(data[j].name, 'url('+data[j].url+')');
                    txt.text = 'Đang tải font:' + data[j].name;
                    txt.x = this.gameWidth / 2 - txt.width / 2;
                    font.load().then((loaded_face) => {
                        document.fonts.add(loaded_face);
                        j++;
                        if(j < data.length) {
                            setTimeout(express, 1);
                        } else {
                            this.packageCombo(txt,time);
                        }
                    });
                    */
                    // dùng promise all cho nhanh

                    let runPromise = (name,url) => {
                        return new Promise((resolve,reject) => {
                            let font = new FontFace(name, 'url('+url+')');
                            font.load().then((loaded_face) => {
                                document.fonts.add(loaded_face);
                                resolve();
                            });
                        });
                    }

                    let array = [];
                    let time = Date.now();
                    for(let i in data) {
                        array.push(runPromise(data[i].name,data[i].url));
                    }
                    Promise.all(array).then((loaded_face) => {
                        this.packageCombo(txt,time);
                        console.log('LoadFont ('+data.length+') packge : ' + (Date.now() - time) + 'ms');
                    });

                }
                express();
            }

            if(fetch.readyState == 4 && fetch.status != 200) {
                clearInterval(time);
                alert('Không thể đọc file dữ liệu của trò chơi');
            }

        };




            
    }

    CreateFontLogin = () => {
        this.loadGame.removeChildren();
        let background = new PIXI.Graphics();
        this.loadGame.addChild(background);
        background.beginFill(0x000000, 1);
        background.lineStyle(0, 0x570b21, 1);
        background.drawRoundedRect(0, 0, this.gameWidth, this.gameHeight, 0);
        background.endFill();
        background.interactive = true;

        let listLoad = new PIXI.Container();
        this.loadGame.addChild(listLoad);
        let listfont = this.gameInfo.font;
        
        listLoad.visible = false;


        let logoAuth = new PIXI.Text(this.gameInfo.name, {
            fontFamily: 'Itim-Regular',
            fontSize: 50,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            align: 'center'
        });
        
       
        let maxW = this.gameWidth * 0.7;
        maxW = maxW > 350 ? 350 : maxW;

        // cover width to font size
        
        logoAuth = this.fontSize(logoAuth,maxW);
        

        logoAuth.x = 0;
        logoAuth.y = this.gameHeight / 2 - logoAuth.height ;
        this.loadGame.addChild(logoAuth);

        let self = this;
        if(this.gameInfo.debug == true) 
        {
            self.ObjectCreatePageLoading();
        }
        else 
        {
            TweenMax.fromTo(logoAuth.position, 0.5, { x: logoAuth.x }, { x:this.gameWidth / 2 - logoAuth.width / 2, repeat: 0 }).then(() => {

                let slotgan = new PIXI.Text('For everyone, for all platforms', {
                    fontFamily: 'Itim-Regular',
                    fontSize: 15,
                    fill: 0xFFFFFF,
                    fontWeight: 'bold',
                    align: 'center'
                });
                slotgan.x = logoAuth.x;
                slotgan.y = logoAuth.y + logoAuth.height;
                slotgan = this.fontSize(slotgan,logoAuth.width*0.5);
                this.loadGame.addChild(slotgan);

                let madeWith = new PIXI.HTMLText('<font color="white">Made with</font> <a href="https://pixijs.com/"><font color="e72264"><b>PixiJS</b></font></a> ', {
                    fontFamily: 'Arial',
                    fontSize: 16,
                    fontWeight: 'bold',
                    align: 'center'
                });
                madeWith.y = logoAuth.height + logoAuth.y;
                madeWith.x = logoAuth.width + logoAuth.x - madeWith.width + 10 ;
                this.loadGame.addChild(madeWith);
                madeWith.alpha = 0;
                TweenMax.to(madeWith, 1, { alpha: 1, onComplete: () => {
                    self.WarningViewController();
                    //self.ObjectCreatePageLoading();
                    
                }});
            });
        }
        







        let version = new PIXI.Text('Client v. ' + this.gameInfo.version, {
            fontFamily: 'Arial',
            fontSize: 14,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            align: 'center'
        });
        version.y = this.gameHeight - version.height - 10;
        version.x = 10;
        this.loadGame.addChild(version);


        let PixiVersion = new PIXI.Text('Since04', {
            fontFamily: 'Arial',
            fontSize: 9,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            align: 'center'
        });
        PixiVersion.y = this.gameHeight - PixiVersion.height - 5;
        PixiVersion.x = this.gameWidth - PixiVersion.width - 30;
        this.loadGame.addChild(PixiVersion);


        let PixijsHtml = new PIXI.Text('PixiJS v. ' + PIXI.VERSION, {
            fontFamily: 'Arial',
            fontSize: 14,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
            align: 'center'
        });
        PixijsHtml.y = version.y - PixijsHtml.height;
        PixijsHtml.x = 10;
        this.loadGame.addChild(PixijsHtml);

        const callback = async () => {
            this.ObjectCreatePageLoading();
        };

        //setTimeout(callback, this.gameInfo.timeloadWelcome);


    }

    ObjectCreatePageLoading = () => {
        this.loadGame.removeChildren();
        let bg_loadGame = new PIXI.Graphics();
        bg_loadGame.beginFill(0x000000);
        bg_loadGame.drawRect(0, 0, this.gameWidth, this.gameHeight);
        bg_loadGame.endFill();
        bg_loadGame.x = 0;
        bg_loadGame.y = 0;
        bg_loadGame.alpha = 1;
        bg_loadGame.visible = true;




        let bg_imgLoad = new PIXI.Sprite(this.coverImg('loadgame'));
        let bg_imgLoad_1 = new PIXI.Sprite(new PIXI.Texture(bg_imgLoad.texture, new PIXI.Rectangle(0, 0, 16, 16)));
        let bg_imgLoad_2 = new PIXI.Sprite(new PIXI.Texture(bg_imgLoad.texture, new PIXI.Rectangle(0, 16, 16, 16)));
        let bg_imgLoad_3 = new PIXI.Sprite(new PIXI.Texture(bg_imgLoad.texture, new PIXI.Rectangle(0, 32, 16, 16)));
        let bg_imgLoad_4 = new PIXI.Sprite(new PIXI.Texture(bg_imgLoad.texture, new PIXI.Rectangle(0, 48, 16, 16)));
        let bg_imgLoad_5 = new PIXI.Sprite(new PIXI.Texture(bg_imgLoad.texture, new PIXI.Rectangle(0, 64, 16, 16)));
        let bg_imgLoad_6 = new PIXI.Sprite(new PIXI.Texture(bg_imgLoad.texture, new PIXI.Rectangle(0, 80, 16, 16)));
        let bg_imgLoad_7 = new PIXI.Sprite(new PIXI.Texture(bg_imgLoad.texture, new PIXI.Rectangle(0, 96, 16, 16)));
        let bg_imgLoad_8 = new PIXI.Sprite(new PIXI.Texture(bg_imgLoad.texture, new PIXI.Rectangle(0, 112, 16, 16)));
        let bg_imgLoad_9 = new PIXI.Sprite(new PIXI.Texture(bg_imgLoad.texture, new PIXI.Rectangle(0, 128, 16, 16)));


        let bgLoadGameAnimation = new PIXI.AnimatedSprite([bg_imgLoad_1.texture, bg_imgLoad_2.texture, bg_imgLoad_3.texture, bg_imgLoad_4.texture, bg_imgLoad_5.texture, bg_imgLoad_6.texture, bg_imgLoad_7.texture, bg_imgLoad_8.texture, bg_imgLoad_9.texture]);
        bgLoadGameAnimation.animationSpeed = 2;
        bgLoadGameAnimation.play();

        bgLoadGameAnimation.x = this.gameWidth / 100 * 50 - bgLoadGameAnimation.width / 100 * 50;
        bgLoadGameAnimation.y = this.gameHeight / 100 * 50 - bgLoadGameAnimation.height / 100 * 50;


        let logo = this.CreateLogo(bg_loadGame.width);
        logo.x = bg_loadGame.width / 2 - logo.width / 2;
        logo.y = bgLoadGameAnimation.y - logo.height - 10;
        bg_loadGame.addChild(logo);

        let bgLoadText = new PIXI.Text('Xin chờ', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xFFFFFF,
            fontWeight: 'bold',
        });

        bgLoadText.x = this.gameWidth / 100 * 50 - bgLoadText.width / 100 * 50;
        bgLoadText.y = this.gameHeight / 100 * 50 - bgLoadText.height / 100 * 50 + bgLoadGameAnimation.height / 100 * 50 + 20;



        let textTip = ["Trái đất có khả năng choáng", "ăn đậu để nhanh hơn"];

        let bgLoadTip = new PIXI.Text(textTip[Math.floor(Math.random() * textTip.length)], {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xE6E6A9,
            fontWeight: 'bold',
        });

        bgLoadTip.x = this.gameWidth / 100 * 50 - bgLoadTip.width / 100 * 50;
        bgLoadTip.y = this.gameHeight / 100 * 50 - bgLoadTip.height / 100 * 50 + bgLoadGameAnimation.height / 100 * 50 + 20 + bgLoadText.height / 100 * 50 + 20;




        this.loadGame.addChild(bg_loadGame, bgLoadGameAnimation, bgLoadText, bgLoadTip);
        this.loadGame.visible = true;
        //this.CreateMainGuestGame();

        this.assetPixi = this.assetPixi || 0;

        let txtLoad = new PIXI.Text('Đang tải 0%', {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xff0000,
            fontWeight: 'bold',
        });
        txtLoad.x = this.gameWidth / 2 - txtLoad.width / 2;
        txtLoad.y = bgLoadTip.y + bgLoadTip.height + 20;
        txtLoad.name = 'txtLoadgame';
        this.loadGame.addChild(txtLoad);

        txtLoad.visible = false;
        this.runPromiseAsset(this.srcSheetPixi.length,txtLoad);
        

    }
}

export default loadingView;
