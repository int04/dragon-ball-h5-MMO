import snowlyvnAwaitLoadingGame from './loadGame.js';

class objectMap extends snowlyvnAwaitLoadingGame
{
    constructor() {
        super();
         console.log('class map')
         this.spritePool = {
            dat: [],
            hoa: [],
            cay: [],
            nuida: [],
            nuixa: [],
            nuixanua: [],
            bautroi: [],
            longdat: [],
            che: [],
        };
        this.srcDaLoad = [];
    }

    returnSprite(sprite) {
        this.spritePool[sprite.type].push(sprite);
        sprite.visible = false;
    }

    taoKhung (sp) {
        return sp;
    }

    spri (sprite) {
        let taoKhung = this.taoKhung;
        if (sprite.name == "lacay2" || sprite.name == "lacay3" || sprite.name == "lacay4" || sprite.name == "lacay5" || sprite.name == "lacay6") {
            let loadSprite = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
            let SrcImg = 4;
            let SrcHeight = 18;
            let yyget = 0;
            let yOne = loadSprite.height / SrcImg;
            let arrayFrame = [];
            for (let i = 0; i < SrcImg; i++) {
    
                arrayFrame.push(new PIXI.Texture(loadSprite.texture, new PIXI.Rectangle(0, yyget, loadSprite.width, yOne)));
                yyget += yOne;
            }
            let newSprite = new PIXI.AnimatedSprite(arrayFrame);
            newSprite.animationSpeed = 0.10;
            newSprite.play();
            newSprite.x = sprite.x;
            newSprite.src = sprite.name;
            newSprite.y = sprite.y;
            newSprite.ygoc = sprite.y;
            newSprite.xgoc = sprite.x;
            newSprite.name = sprite.name;
            newSprite.autofollow = true; // thuộc tính rơi
            newSprite.width = loadSprite.width;
            newSprite.height = loadSprite.height / SrcImg;
            newSprite.type = sprite.type;
            newSprite.coppy = 0;
            newSprite.time = 0;
            newSprite.css = 1;
            newSprite = taoKhung(newSprite);
    
            return newSprite;
        }
    
    
        if (sprite.name == "ImgEffect_6") {
            let image = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
            arrayFrame = [new PIXI.Texture(image.texture, new PIXI.Rectangle(0, 0, 88, 82)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(96, 0, 85, 82)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(180, 0, 82, 82)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(0, 80, 83, 79)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(0, 80, 83, 79)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(86, 81, 85, 77)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(174, 80, 86, 79)), ];
            let newSprite = new PIXI.AnimatedSprite(arrayFrame);
            newSprite.animationSpeed = 0.15;
            newSprite.play();
            newSprite.x = sprite.x;
            newSprite.y = sprite.y;
            newSprite.ygoc = sprite.y;
            newSprite.xgoc = sprite.x;
            newSprite.src = sprite.name;
            newSprite.name = sprite.name;
            newSprite.width = newSprite.width;
            newSprite.height = newSprite.height;
            newSprite.type = sprite.type;
            newSprite.coppy = 0;
            newSprite.css = 1;
            newSprite.scal = true;
            newSprite = taoKhung(newSprite);
    
            return newSprite;
        }
    
    
        if (sprite.name == "ImgEffect_8") {
            let image = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
            let newSprite = new PIXI.Container();
            let than = new PIXI.Sprite(new PIXI.Texture(image.texture, new PIXI.Rectangle(190, 0, 93, 57)));
            newSprite.addChild(than);
            newSprite.x = app.screen.width - newSprite.width;
            newSprite.y = app.screen.height / 2;
    
            let canvas_load = new PIXI.AnimatedSprite(
                                [
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(1, 43, 53, 56)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(56, 44, 58, 53)),
    
                                ]
            );
            canvas_load.x = than.x + canvas_load.width / 2 - 2;
            canvas_load.y = than.y - than.height / 2 - canvas_load.height / 2 + 5;
            canvas_load.animationSpeed = 0.15;
    
            canvas_load.play();
    
    
            newSprite.addChild(canvas_load)
            newSprite.x = sprite.x;
            newSprite.y = sprite.y;
            newSprite.ygoc = sprite.y;
            newSprite.xgoc = sprite.x;
            newSprite.name = sprite.name;
            newSprite.src = sprite.name;
            newSprite.width = newSprite.width;
            newSprite.height = newSprite.height;
            newSprite.type = sprite.type;
            newSprite.coppy = 0;
            newSprite.css = 1;
            newSprite.scal = true; // hiệu ứng quay phải quay trái
    
            newSprite = taoKhung(newSprite);
    
            return newSprite;
        }
    
    
        if (sprite.name == "ImgEffect_1") {
            let image = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
            let newSprite = new PIXI.Container();
    
            let canvas_load = new PIXI.AnimatedSprite(
                                [
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(0, 93, 73, 55)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(0, 40, 64, 53)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(1, 0, 71, 40)),
    
                                ]
            );
            canvas_load.animationSpeed = 0.15;
    
            canvas_load.play();
    
    
            newSprite.addChild(canvas_load)
            newSprite.x = sprite.x;
            newSprite.y = sprite.y;
            newSprite.ygoc = sprite.y;
            newSprite.xgoc = sprite.x;
            newSprite.name = sprite.name;
            newSprite.src = sprite.name;
            newSprite.width = newSprite.width;
            newSprite.height = newSprite.height;
            newSprite.type = sprite.type;
            newSprite.coppy = 0;
            newSprite.css = 1;
            newSprite.scal = true; // hiệu ứng quay phải quay trái
    
            newSprite = taoKhung(newSprite);
    
            return newSprite;
        }
    
        if (sprite.name == 'ImgEffect_10') {
            let image = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
            let newSprite = new PIXI.Container();
    
            let canvas_load = new PIXI.AnimatedSprite(
                                [
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(28, 0, 44, 44)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(72, 0, 40, 43)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(112, 1, 39, 43)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(151, 1, 42, 42)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(193, 0, 42, 43)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(235, 0, 40, 44)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(276, 0, 40, 44)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(315, 0, 41, 42)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(356, 0, 44, 43)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(399, 0, 42, 44)),
    
                                ]
            );
            canvas_load.animationSpeed = 0.15;
    
            canvas_load.play();
    
    
            newSprite.addChild(canvas_load)
            newSprite.x = sprite.x;
            newSprite.y = sprite.y;
            newSprite.ygoc = sprite.y;
            newSprite.xgoc = sprite.x;
            newSprite.name = sprite.name;
            newSprite.src = sprite.name;
            newSprite.width = newSprite.width;
            newSprite.height = newSprite.height;
            newSprite.type = sprite.type;
            newSprite.coppy = 0;
            newSprite.css = 1;
            newSprite.scal = true; // hiệu ứng quay phải quay trái
    
            newSprite = taoKhung(newSprite);
    
            return newSprite;
        }
    
    
        if (sprite.name == 'x2wtf' || sprite.name == 'x2twtf') {
            let image = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
            let newSprite = new PIXI.Container();
    
            let canvas_load = new PIXI.AnimatedSprite(
                                [
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(0, 0, 48, 48)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(0, 48, 48, 48)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(0, 48 + 48, 48, 48)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(0, 48 + 48 + 48, 48, 48)),
    
                                ]
            );
            canvas_load.animationSpeed = 0.15;
    
            canvas_load.play();
    
    
            newSprite.addChild(canvas_load)
            newSprite.x = sprite.x;
            newSprite.y = sprite.y;
            newSprite.ygoc = sprite.y;
            newSprite.xgoc = sprite.x;
            newSprite.name = sprite.name;
            newSprite.src = sprite.name;
            newSprite.width = newSprite.width;
            newSprite.height = newSprite.height;
            newSprite.type = sprite.type;
            newSprite.coppy = 0;
            newSprite.css = 1;
    
            newSprite = taoKhung(newSprite);
    
            return newSprite;
        }
    
        if (sprite.name == 'x2wts' || sprite.name == 'x2wtsN' || sprite.name == 'x2wtsN2') {
            let image = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
            let newSprite = new PIXI.Container();
    
            let canvas_load = new PIXI.AnimatedSprite(
                                [
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(0, 0, 48, 49)),
                                    new PIXI.Texture(image.texture, new PIXI.Rectangle(0, 49, 48, 49)),
    
                                ]
            );
            canvas_load.animationSpeed = 0.1;
    
            canvas_load.play();
    
    
            newSprite.addChild(canvas_load)
            newSprite.x = sprite.x;
            newSprite.y = sprite.y;
            newSprite.ygoc = sprite.y;
            newSprite.xgoc = sprite.x;
            newSprite.name = sprite.name;
            newSprite.src = sprite.name;
            newSprite.width = newSprite.width;
            newSprite.height = newSprite.height;
            newSprite.type = sprite.type;
            newSprite.coppy = 0;
            newSprite.css = 1;
    
            newSprite = taoKhung(newSprite);
    
            return newSprite;
        }
    
        return sprite;
    }

    releaseSprite(sprite) {
        this.spritePool[sprite.type].push(sprite);
        sprite.visible = false;
    }

    getSprite(type, texture) {
        let sprite;
    
        if (this.spritePool[type].length > 0) {
            sprite = this.spritePool[type].pop();
            sprite.texture = texture;
            sprite.visible = true;
        } else {
            sprite = new PIXI.Sprite(texture);
            sprite.resolution = 2;
            sprite.type = type;
        }
    
        sprite.release = function() {
            releaseSprite(this);
        }
    
        return sprite;
    }


    DeleteMap() {
        this.bando.removeChildren();
        this.bando_nuida.removeChildren();
        this.bando_nuixa.removeChildren();
        this.bando_nuixanua.removeChildren();
        this.bando_bautroi.removeChildren();
        this.bando_che.removeChildren();
        this.spritePool.dat = [];
        this.spritePool.hoa = [];
        this.spritePool.cay = [];
        this.spritePool.nuida = [];
        this.spritePool.nuixa = [];
        this.spritePool.nuixanua = [];
        this.spritePool.bautroi = [];
        this.spritePool.longdat = [];
        this.spritePool.che = [];
    }

    loadMap = function(textures = false) {
        this.DeleteMap();
        let data_map = this.cacheMap;
        let my = this.my;
        let gameMap = this.gameMap;
        let NhanVat = this.NhanVat;
        let NhanVatGoc = this.NhanVatGoc;
        let coverMap = data_map.split("!");
        for (let i = 0; i < coverMap.length; i++) {
            let e = coverMap[i];
            if (e.length >= 1) {
                let element = {};
                let tach = e.split("^");
                element.name = tach[0];
                element.type = tach[1];
                let tach2 = tach[2].split(",");
                element.x = +tach2[0];
                element.y = +tach2[1];
                element.width = +tach2[2];
                element.height = +tach2[3];
                let sprite = this.getSprite(element.type, this.coverImgMap(element.name));
                sprite.x = element.x;
                sprite.y = element.y;
                sprite.width = element.width;
                sprite.height = element.height;
                
    
                // cover size low 0.5
    
                sprite.name = element.name;
    
                if (gameMap.setting.maxY < element.y) {
                    gameMap.setting.maxY = element.y;
                    gameMap.size.idMaxY = element.height;
                }
                if (gameMap.setting.minY > element.y) {
                    gameMap.setting.minY = element.y - element.height ;

                    gameMap.size.idMinY = element.height;
                }
                if (gameMap.setting.maxX < element.x) {
                    gameMap.setting.maxX = element.x;
                    gameMap.size.idMaxX = element.width;
                }
                if (gameMap.setting.minX > element.x) {
                    gameMap.setting.minX = element.x;
                    gameMap.size.idMinX = element.width;
                }
    
    
                sprite = this.spri(sprite);
                sprite.src = element.name;
                if (sprite.scal) {
                    sprite.pivot.x = sprite.width;
                }
                if (sprite.type == 'nuida') {
                    this.bando_nuida.addChild(sprite);
                } else
                if (sprite.type == 'nuixa') {
                    this.bando_nuixa.addChild(sprite);
                } else
                if (sprite.type == 'nuixanua') {
                    this.nen.y =sprite.y ;

                    this.bando_nuixanua.addChild(sprite);
                } else
                if (sprite.type == 'bautroi') {
                    this.bando_bautroi.addChild(sprite);
                } else
                if (sprite.type == 'che') {
                    this.bando_che.addChild(sprite);
                } else {
                    this.bando.addChild(sprite);
                }
            }

            // if last element
            if(i == coverMap.length -1)
            {
                this.checkCreateObjectOnMap();
            }
    
        }
        try {
    
            gameMap.setting.minY -= gameMap.size.idMinY / 2;
            gameMap.setting.maxY += gameMap.size.idMaxY / 2;
            gameMap.setting.minX -= gameMap.size.idMinX;
            gameMap.setting.maxX += gameMap.size.idMaxX;
    
        } catch (e) {
            console.log(e)
        }
    
        gameMap.setting.minX = 0;
        
        if(my.id >=1)
        {
            NhanVat.x = my.pos.x;
            NhanVat.y = my.pos.y;
            NhanVatGoc.x = my.pos.x;
            NhanVatGoc.y = my.pos.y;
        }

        this.nen.width = this.container.width;
        this.nen.height = this.container.height;
    
    }




    // tải asset của người chơi
    LoadAssetPlayer() {
        let my = Object.create(this.my);
        let getAo = [my.skin.ao,my.skin.quan,my.skin.dau];
        getAo.forEach( async e => {
            let run = this.images.find(ee => ee.name == e);
            if (run != undefined) {
                let f = run.farm[0];
                if(f) 
                {
                    for(let type in f) 
                    {
                        let bien = f[type].farme;
                        bien.forEach(async eee => {
                            await PIXI.Sprite.from(this.coverImg(eee));
                        });
                        this.createSkillOnDisplay();
                        this.TaoSprite2();
                    }
                }
            }
        });
        this.joinMap(my.pos.map);

    }


    joinMap = (id) => {
        this.inGame.visible = false; 
        this.loadGame.visible = true;
        this.to(-17,id);
    }

    joinChuyenMap = (id) => {
        this.notice(this._('Xin chờ...'),false);
        this.to(-18,id);
    }

    LoadAssetMap = async  function() {
        this.inGame.visible = false; 
        this.loadGame.visible = true;
        this.gameMap = {
            setting: {
                maxY: 0,
                minY: 0,
                maxX: 0,
                minX: 0,
            },
            size: {
                idMaxX: 0,
                idMaxY: 0,
                idMinX: 0,
                idMinY: 0,

            }
        };

        let data_map = this.cacheMap;
        let coverMap = data_map.split("!");

        let listAsset = [];

        for (let i = 0; i < coverMap.length; i++) {
            let e = coverMap[i];
            if (e.length >= 1) {

                let element = {};
                let tach = e.split("^");
                element.name = tach[0];
                element.type = tach[1];
                let tach2 = tach[2].split(",");
                element.x = +tach2[0];
                element.y = +tach2[1];
                element.width = +tach2[2];
                element.height = +tach2[3];

                let find = this.assets.find(e => e.name == element.name);
                if(!find) return false;
                if(listAsset.find (e => e == element.name)) continue;


                let loadchua = this.srcDaLoad.find(e => e == element.name);
                if(loadchua) continue;
                this.srcDaLoad.push(element.name);
                listAsset.push(element.name)
            }
        }

        /*
        let texture = PIXI.Assets.load(listAsset);
        texture.then((textures) => {
            console.log('hi')
            this.loadMap(textures);
            
        });
        */
        listAsset.forEach( async (element) => {
            /*
            let src =   PIXI.Texture.from(element, {
                resourceOptions : {
                    createBitmap : false,
                }, 
                });
                */
                

            // awaitPIXI.Texture.from
            await PIXI.Sprite.from(this.coverImgMap(element));

        });

        console.log('Tổng,',listAsset.length)

        this.loadMap();



        




    }

}

export default objectMap;