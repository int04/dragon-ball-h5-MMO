

let move =null;
move_block = null;

const bando = new PIXI.Container();

let tungBuoc = false;
let PressKey = false;

let chamXoa = false;

let settingXoa = function()
{
    if(chamXoa) chamXoa = false;
    else chamXoa = true;
}

let setingBuoc = function() 
{
    if(tungBuoc) tungBuoc = false;
    else tungBuoc = true;
}

let NhanVatGan = null;

let setting_map = {
    default : true,
    dat : {
        show : true,
        luoi : true,
        xoa: false,
    }, 
    hoa: {
        show : true,
        luoi : true,        xoa: false,

    }, 
    cay: {
        show : true,
        luoi : true,        xoa: false,

    },
    nuida: {
        show : true,
        luoi : true,        xoa: false,

    },
    nuixa: {
        show : true,
        luoi : true,        xoa: false,

    },
    nuixanua: {
        show : true,
        luoi : true,        xoa: false,

    },
    bautroi: {
        show : true,
        luoi : true,        xoa: false,

    },
    longdat: {
        show : true,
        luoi : true,        xoa: false,

    },
    che : {
        show : true,
        luoi : true,        xoa: false,

    },

    block : {
        show : true,
        luoi : true,        xoa: false,

    }
}

let KeoCanVas = function () {
    if(setting_map.default) setting_map.default = false;
    else setting_map.default = true;
}


let updateSetting4 = function(name) 
{


  
   
    if(setting_map[name].xoa)
    {
        setting_map[name].xoa = false;
    }
    else 
    {
        setting_map[name].xoa = true;
    }
}

let updateSetting2 = function(name) 
{


    if(name == "hienALl")
    {
        for (let key in setting_map) {
            setting_map[key].luoi = setting_map[key].luoi == true ? false : true;
        }
        return false;
    }
   
    if(setting_map[name].luoi)
    {
        setting_map[name].luoi = false;
    }
    else 
    {
        setting_map[name].luoi = true;
    }
}

let updateSetting = function(name) 
{
    // hide all 
    if(name == "AnALL")
    {
        for (let key in setting_map) {
            setting_map[key].show = false;
        }
        return false;
    }

    if(name == "hienall")
    {
        for (let key in setting_map) {
            setting_map[key].show = setting_map[key].show == true ? false : true;
        }
        return false;
    }


    if(setting_map[name].show)
    {
        setting_map[name].show = false;
    }
    else 
    {
        setting_map[name].show = true;
    }
}


function XuatMap() {
    let data = "";
    // id#name#type#x#y#width#height
    for (let i = 0; i < bando.children.length; i++) {
        let element = bando.children[i];
        // type: IMG^id^x,y,width,height!
        if(element.type == 'block') continue;
        data+=`${(element.src )}^${element.type}^${element.x},${element.y},${element.width},${element.height}`+(element.scale.x== -1 ?',-1':'')+`!`;
    }
    // remove last !
    data = data.slice(0, -1);

    return data;

}

function saveMap() {
    let data = XuatMap();
    let data2 = (data);
    $("#map").val(data2);
}



const spritePool = {
    dat: [],
    hoa: [],
    cay: [],
    nuida: [],
    nuixa: [],
    nuixanua: [],
    bautroi: [],
    longdat: [],
    che : [],
    block : [],
};

function getSprite(type, texture) {
    let sprite;
    if (spritePool[type].length > 0) {
        sprite = spritePool[type].pop();
        sprite.texture = texture;
        sprite.baseTexture.scaleMode = PIXI.SCALE_MODES.LINEAR; // Đặt chế độ lọc texture thành PIXI.LINEAR
        sprite.resolution = 2;
        sprite.visible = true;
    } else {
        sprite = new PIXI.Sprite(texture);
        sprite.width = sprite.texture.width;
        sprite.height = sprite.texture.height;
        
      
        sprite.type = type;
    }


    return sprite;
}

function returnSprite(sprite) {
    // spritePool[sprite.type].push(sprite);
    // sprite.visible = true;
    // Remove the sprite from its parent
    sprite.parent.removeChild(sprite);

}


function deleteAll() {
    bando.children = [];
}


let data_map = "";


function loadDataMap() {
    deleteAll();
    data_map = $("#map").val();
    loadMap();
}


let taoKhung = function(newSprite)
{
    let boundingBox = new PIXI.Graphics();
    boundingBox.lineStyle(2, 0xFFFFFF); // Đặt độ rộng viền và màu sắc
    boundingBox.name = "baoquanh";
    boundingBox.drawRect(0, 0, newSprite.width, newSprite.height); // Vẽ hình chữ nhật dựa trên kích thước của sprite
    newSprite.addChild(boundingBox); // Thêm hình chữ nhật vào sprite
    newSprite.interactive = true;
    newSprite.buttonMode = true;


    newSprite.on('pointerdown', function() {
        if(chamXoa)
        {
            console.log('xóa')
            returnSprite(newSprite);
        }
        else
        if(move == null) 
        {
            boundingBox.clear(); // Xóa hình chữ nhật cũ
            boundingBox.lineStyle(2, 0xFF0000); // Đặt độ rộng viền và màu sắc mới (màu đỏ)
            boundingBox.drawRect(0, 0, newSprite.width, newSprite.height); // Vẽ lại hình chữ nhật mới
            move = newSprite;
            move_block = boundingBox;

        }
    });
    return newSprite;
}

let spri = function(sprite) 
{
   
                    let boundingBox = new PIXI.Graphics();
                    boundingBox.lineStyle(2, 0xFFFFFF); // Đặt độ rộng viền và màu sắc
                    boundingBox.name = "baoquanh";
                    boundingBox.drawRect(0, 0, sprite.width, sprite.height); // Vẽ hình chữ nhật dựa trên kích thước của sprite
                    sprite.addChild(boundingBox); // Thêm hình chữ nhật vào sprite
                    sprite.interactive = true;
                    sprite.buttonMode = true;
                    console.log(sprite)

                    sprite.on('pointerover', function() {
                        if(setting_map[sprite.type].xoa)
                        {
                            console.log('xóa')
                            returnSprite(sprite);
                        }
                    });


                    sprite.on('pointerdown', function() {

                       

                        if(chamXoa)
                        {
                            console.log('xóa')
                            returnSprite(sprite);
                        }
                        else
                        if(move == null) 
                        {
                            boundingBox.clear(); // Xóa hình chữ nhật cũ
                            boundingBox.lineStyle(2, 0xFF0000); // Đặt độ rộng viền và màu sắc mới (màu đỏ)
                            boundingBox.drawRect(0, 0, sprite.width, sprite.height); // Vẽ lại hình chữ nhật mới
                            move = sprite;
                            move_block = boundingBox;

                        }
                    });


                    if(sprite.name == "lacay2" || sprite.name == "lacay3" || sprite.name == "lacay4" || sprite.name == "lacay5" || sprite.name == "lacay6") 
                    {
                        let loadSprite = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
                        let SrcImg = 4;
                        let SrcHeight = 18;
                        let yyget = 0;
                        let yOne= loadSprite.height / SrcImg;
                        let arrayFrame =[];
                        for(let i = 0; i < SrcImg; i++){

                            arrayFrame.push(new PIXI.Texture(loadSprite.texture, new PIXI.Rectangle(0, yyget, loadSprite.width, yOne)));
                            yyget += yOne;
                        }
                        let newSprite = new PIXI.extras.AnimatedSprite(arrayFrame);
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
                        newSprite.height = loadSprite.height/SrcImg;
                        newSprite.type = sprite.type;
                        newSprite.coppy = 0;
                        newSprite.time = 0;
                        newSprite.css = 1;
                        newSprite = taoKhung(newSprite);
                        
                        return newSprite;
                    }


                    if(sprite.name == "ImgEffect_6") 
                    {
                        let image = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
                        arrayFrame = [ new PIXI.Texture(image.texture, new PIXI.Rectangle(0,0,88,82)),
                            new PIXI.Texture(image.texture, new PIXI.Rectangle(96,0,85,82)),
                            new PIXI.Texture(image.texture, new PIXI.Rectangle(180,0,82,82)),
                            new PIXI.Texture(image.texture, new PIXI.Rectangle(0,80,83,79)),
                            new PIXI.Texture(image.texture, new PIXI.Rectangle(0,80,83,79)),
                            new PIXI.Texture(image.texture, new PIXI.Rectangle(86,81,85,77)),
                            new PIXI.Texture(image.texture, new PIXI.Rectangle(174,80,86,79)),];
                        let newSprite = new PIXI.extras.AnimatedSprite(arrayFrame);
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


                    if(sprite.name == "ImgEffect_8") 
                    {
                        let image = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
                        let newSprite = new PIXI.Container();
                        let than = new PIXI.Sprite(new PIXI.Texture(image.texture, new PIXI.Rectangle(190,0,93,57)));
                        newSprite.addChild(than);
                        newSprite.x =  app.screen.width - newSprite.width;
                        newSprite.y =  app.screen.height/2;
                        
                        let canvas_load = new PIXI.extras.AnimatedSprite(
                            [
                            new PIXI.Texture(image.texture, new PIXI.Rectangle(1,43,53,56)),
                            new PIXI.Texture(image.texture, new PIXI.Rectangle(56,44,58,53)),
                        
                            ]
                        );
                        canvas_load.x = than.x + canvas_load.width/2 - 2;
                        canvas_load.y =than.y - than.height/2 - canvas_load.height/2 + 5;
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


                    if(sprite.name == "ImgEffect_1") 
                    {
                        let image = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
                        let newSprite = new PIXI.Container();
                       
                        let canvas_load = new PIXI.extras.AnimatedSprite(
                            [
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(0,93,73,55)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(0,40,64,53)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(1,0,71,40)),
                        
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

                    if(sprite.name == 'ImgEffect_10')
                    {
                        let image = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
                        let newSprite = new PIXI.Container();
                       
                        let canvas_load = new PIXI.extras.AnimatedSprite(
                            [
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(28,0,44,44)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(72,0,40,43)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(112,1,39,43)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(151,1,42,42)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(193,0,42,43)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(235,0,40,44)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(276,0,40,44)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(315,0,41,42)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(356,0,44,43)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(399,0,42,44)),
                        
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


                    if(sprite.name == 'x2wtf' || sprite.name == 'x2twtf')
                    {
                        let image = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
                        let newSprite = new PIXI.Container();
                       
                        let canvas_load = new PIXI.extras.AnimatedSprite(
                            [
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(0,0,96,96)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(0,48,96,96)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(0,48+48,96,96)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(0,48+48+48,96,96)),
                        
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
                        newSprite.width = 48;
                        newSprite.height = 48;
                        newSprite.type = sprite.type;
                        newSprite.coppy = 0;
                        newSprite.css = 1;

                        newSprite = taoKhung(newSprite);
                        
                        return newSprite;
                    }

                    if(sprite.name == 'x2wts' || sprite.name == 'x2wtsN' || sprite.name == 'x2wtsN2')
                    {
                        let image = new PIXI.Sprite(PIXI.utils.TextureCache[sprite.name]);
                        let newSprite = new PIXI.Container();
                       
                        let canvas_load = new PIXI.extras.AnimatedSprite(
                            [
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(0,0,96,98)),
                                new PIXI.Texture(image.texture, new PIXI.Rectangle(0,98,96,98)),
                        
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
                        newSprite.width = 48;
                        newSprite.height = 48;
                        newSprite.type = sprite.type;
                        newSprite.coppy = 0;
                        newSprite.css = 1;

                        newSprite = taoKhung(newSprite);
                        
                        return newSprite;
                    }

                    return sprite;


                    
}


    let loadMap = function() {
        // type: IMG^id^x,y,width,height!
        let coverMap = data_map.split("!");
        coverMap.forEach(e => {
            if(e.length >=1)
            {
                let element = {};
                let tach = e.split("^");
                element.name = tach[0];
                element.type = tach[1];
                if(element.name && element.type) {
                    
                    let tach2 = tach[2].split(",");
                    element.x = +tach2[0];
                    element.y = +tach2[1];
                    element.width = +tach2[2];
                    element.height = +tach2[3];
                    let sprite = getSprite(element.type, PIXI.utils.TextureCache[element.name]);
                    sprite.x = element.x;
                    sprite.y = element.y;
                    sprite.name = element.name;
                    sprite.width = element.width;
                    sprite.height = element.height;
                    sprite.src = element.name;
                    sprite.coppy = 0;
                    sprite = spri(sprite);
                    if(tach2[4] == -1) sprite.scale.x = -1;
                    bando.addChild(sprite);
                }
                
            }
        })
    }

function randNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addEvent(x,y) {
    let name = $("#add_name").val();
    let type = $("#add_type").val();
    let width = +$("#add_width").val();
    let height = +$("#add_height").val();

    let oX = 1;
    let oY = 1;

    let scale = +$("#add_scale").val();

    let hoa = $("#add_random").val();

    let checked = bando.children.find(e => e.x == x && e.y == y && e.type == type && e.name == name);
    if(checked) {
        console.log('trùng')
        return false;
    }

    for(let i = 1; i <= oY; i++) 
    {
        for(let j = 1; j <= oX; j++) 
        {
            if(type == 'hoa' && hoa.length >=1)
            {
                let r = hoa.split(",");
                let newname = '';
                while(newname.length < 1)
                {
                    newname = r[randNumber(0, r.length - 1)];
                }
                name = newname;
            }

            console.log('add')
            let sprite = getSprite(type, PIXI.utils.TextureCache[name]);

            sprite.width = width <=0 ? sprite.texture.width : width;
            sprite.height = height <=0 ? sprite.texture.height : height;
            if(width <=0) 
            {
                let sinFind = sin.find(e => e.name == name);
                if(sinFind) sprite.width = sinFind.width;
            }
            if(height <=0)
            {
                let sinFind = sin.find(e => e.name == name);
                if(sinFind) sprite.height = sinFind.height;
            }
            
            sprite.name = name;
            sprite.src = name;

            sprite.x = x + (sprite.width * (j - 1));
            sprite.y = y + (sprite.width * (i - 1));
            sprite.coppy = 0;
            sprite = spri(sprite);

            if(scale != 1)
            sprite.scale.x = scale;
          
            bando.addChild(sprite);
        }
    }

    
    saveMap();
}

function button_add() {
    let name = $("#add_name").val();
    let type = $("#add_type").val();
    let x = +$("#add_x").val();
    let y = +$("#add_y").val();
    let width = +$("#add_width").val();
    let height = +$("#add_height").val();

    let oX = +$("#add_oX").val();
    let oY = +$("#add_oY").val();

    let scale = +$("#add_scale").val();

    let hoa = $("#add_random").val();

    for(let i = 1; i <= oY; i++) 
    {
        for(let j = 1; j <= oX; j++) 
        {
            if(type == 'hoa' && hoa.length >=1)
            {
                let r = hoa.split(",");
                let newname = '';
                while(newname.length < 1)
                {
                    newname = r[randNumber(0, r.length - 1)];
                }
                name = newname;
            }

            console.log('add')
            let sprite = getSprite(type, PIXI.utils.TextureCache[name]);

            sprite.width = width <=0 ? sprite.texture.width : width;
            sprite.height = height <=0 ? sprite.texture.height : height;
            if(width <=0) 
            {
                // set scale 0.5 
                sprite.scale.x = 0.5;
                let sinFind = sin.find(e => e.name == name);
                if(sinFind) sprite.width = sinFind.width;
            }
            if(height <=0)
            {
                // set scale 0.5
                sprite.scale.y = 0.5;
                let sinFind = sin.find(e => e.name == name);
                if(sinFind) sprite.height = sinFind.height;
            }
            
            sprite.name = name;
            sprite.src = name;

            sprite.x = x + (sprite.width * (j - 1));
            sprite.y = y + (sprite.width * (i - 1));
            sprite.coppy = 0;
            sprite = spri(sprite);

            if(scale != 1)
            sprite.scale.x = scale;
          
            bando.addChild(sprite);
        }
    }

    
    saveMap();
}   

function coppy(value) {
    // coppy to clipboard
    let input = document.createElement('input');
    input.value = value;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

}

function coppyX() {
    if(move != null) 
    {
        let spriteadd = getSprite(move.type, PIXI.utils.TextureCache[move.src]);
        move.coppy++;
        spriteadd.name = move.name;
        spriteadd.src = move.name;

        spriteadd.x = move.x + move.width * (move.coppy );
        spriteadd.y = move.y;
        spriteadd.width = move.width;
        spriteadd.height = move.height;
        spriteadd.coppy = 0;
        spriteadd = spri(spriteadd);
        bando.addChild(spriteadd);
    }
}


function button_save() {
    let id = $("#edit_ii").val();
    let id2= $("#edit_i").val();

    let edit_name = $("#edit_name").val();
    let edit_type = $("#edit_type").val();
    let edit_x = +$("#edit_x").val();
    let edit_y = +$("#edit_y").val();
    let edit_width = +$("#edit_width").val();
    let      edit_height = +$("#edit_height").val();
    let edit_scale = +$("#edit_scale").val();

    let get  =  bando.children.indexOf(move); 
    move.type = edit_type;
    move.x = edit_x;
    move.y = edit_y;
    move.width = edit_width;
    move.height = edit_height;
    move.scale.x =edit_scale;



    if(id != id2)
    {

        if(id2 < 0) id2 = 0;
        if(id2 > bando.children.length) id2 = bando.children.length;
        bando.children.splice(get, 1);
        bando.children.splice(id2, 0, move);
        console.log('lưu')


    }


    saveMap();

    
}


// window realy load
window.onload = function() {
    assetDat.forEach(element => {
        if(element.length >=1)
        $("#tab1").append(`<img style="max-width: 50px;" onclick="selectedImg('${element}')" src="/assets/map/dat/${element}.png">`);
    });
    assetCayCoi.forEach(element => {
        if(element.length >=1)

        $("#tab2").append(`<img style="max-width: 50px;" onclick="selectedImg('${element}')" src="/assets/map/caycoi/${element}.png">`);
    });
    assetNhaCua.forEach(element => {
        if(element.length >=1)

        $("#tab3").append(`<img style="max-width: 50px;" onclick="selectedImg('${element}')" src="/assets/map/nhacua/${element}.png">`);
    });
    assetKhac.forEach(element => {
        if(element.length >=1)

        $("#tab4").append(`<img style="max-width: 150px;" onclick="selectedImg('${element}')" src="/assets/map/khac/${element}.png">`);
    });
    assetTrangTri.forEach(element => {
        if(element.length >=1)

        $("#tab5").append(`<img style="max-width: 50px;" onclick="selectedImg('${element}')" src="/assets/map/trangtri/${element}.png">`);
    });

    assetEff.forEach(element => {
        if(element.length >=1)

        $("#tab6").append(`<img style="max-width: 50px;" onclick="selectedImg('${element}')" src="/assets/map/eff/${element}.png">`);
    });

    asset18_2_2023.forEach(element => {
        if(element.length >=1)

        $("#tab7").append(`<img id="`+element+`" style="max-width: 80px;" onclick="selectedImg('${element}')" src="/assets/map/khac2/${element}.png">`);
    });

    khac3nek.forEach(element => {
        if(element.length >=1)

        $("#tab8").append(`<img id="`+element+`" style="max-width: 80px;" onclick="selectedImg('${element}')" src="/assets/map/khac3/${element}.png">`);
    });

    newnhacua.forEach(element => {
        $("#tab3").append(`<img style="max-width: 80px;" onclick="selectedImg('${element}')" src="/assets/map/khac2/${element}.png">`);
  
        // delete img id 
        $("#"+element).remove();
    });

    newcaycoi.forEach(element => {
        $("#tab2").append(`<img style="max-width: 80px;" onclick="selectedImg('${element}')" src="/assets/map/khac2/${element}.png">`);
  
        // delete img id 
        $("#"+element).remove();
    });
};


function selectedImg(e) 
{
    coppy(`"`+e+`",`);
    $("#add_name").val(e);
    $("#add_random").val($("#add_random").val().split(",").length >=1 ? $("#add_random").val() + "," + e : e);
}



let sin = [];


sin.push({"name":"x21$1","width":48,"height":48},{"name":"x21$17","width":48,"height":48},{"name":"x21$18","width":48,"height":48},{"name":"x21$19","width":48,"height":48},{"name":"x21$2","width":48,"height":48},{"name":"x21$20","width":48,"height":48},{"name":"x21$21","width":48,"height":48},{"name":"x21$22","width":48,"height":48},{"name":"x21$23","width":48,"height":48},{"name":"x21$24","width":48,"height":48},{"name":"x21$25","width":48,"height":48},{"name":"x21$26","width":48,"height":48},{"name":"x21$27","width":48,"height":48},{"name":"x21$28","width":48,"height":48},{"name":"x21$29","width":48,"height":48},{"name":"x21$3","width":48,"height":48},{"name":"x21$30","width":48,"height":48},{"name":"x21$31","width":48,"height":48},{"name":"x21$32","width":48,"height":48},{"name":"x21$33","width":48,"height":48},{"name":"x21$34","width":48,"height":48},{"name":"x21$4","width":48,"height":48},{"name":"x21$5","width":48,"height":48},{"name":"x21$6","width":48,"height":48},{"name":"x210$1","width":48,"height":48},{"name":"x210$10","width":48,"height":48},{"name":"x210$11","width":48,"height":48},{"name":"x210$14","width":48,"height":48},{"name":"x210$15","width":48,"height":48},{"name":"x210$16","width":48,"height":48},{"name":"x210$2","width":48,"height":48},{"name":"x210$20","width":48,"height":48},{"name":"x210$21","width":48,"height":48},{"name":"x210$24","width":48,"height":48},{"name":"x210$25","width":48,"height":48},{"name":"x210$29","width":48,"height":48},{"name":"x210$3","width":48,"height":48},{"name":"x210$4","width":48,"height":48},{"name":"x210$5","width":48,"height":48},{"name":"x210$6","width":48,"height":48},{"name":"x210$7","width":48,"height":48},{"name":"x210$8","width":48,"height":48},{"name":"x210$9","width":48,"height":48},{"name":"x211$1","width":48,"height":48},{"name":"x211$17","width":48,"height":48},{"name":"x211$18","width":48,"height":48},{"name":"x211$19","width":48,"height":48},{"name":"x211$2","width":48,"height":48},{"name":"x211$20","width":48,"height":48},{"name":"x211$3","width":48,"height":48},{"name":"x211$4","width":48,"height":48},{"name":"x211$5","width":48,"height":48},{"name":"x211$6","width":48,"height":48},{"name":"x211$7","width":48,"height":48},{"name":"x211$8","width":48,"height":48},{"name":"x212$1","width":48,"height":48},{"name":"x212$10","width":48,"height":48},{"name":"x212$11","width":48,"height":48},{"name":"x212$12","width":48,"height":48},{"name":"x212$13","width":48,"height":48},{"name":"x212$14","width":48,"height":48},{"name":"x212$15","width":48,"height":48},{"name":"x212$16","width":48,"height":48},{"name":"x212$17","width":48,"height":48},{"name":"x212$2","width":48,"height":48},{"name":"x212$3","width":48,"height":48},{"name":"x212$32","width":48,"height":48},{"name":"x212$33","width":48,"height":48},{"name":"x212$4","width":48,"height":48},{"name":"x212$5","width":48,"height":48},{"name":"x212$6","width":48,"height":48},{"name":"x212$7","width":48,"height":48},{"name":"x212$8","width":48,"height":48},{"name":"x212$9","width":48,"height":48},{"name":"x213$2","width":48,"height":48},{"name":"x213$3","width":48,"height":48},{"name":"x213$4","width":48,"height":48},{"name":"x214$1","width":48,"height":48},{"name":"x214$2","width":48,"height":48},{"name":"x214$3","width":48,"height":48},{"name":"x214$4","width":48,"height":48},{"name":"x214$5","width":48,"height":48},{"name":"x214$6","width":48,"height":48},{"name":"x215$1","width":48,"height":48},{"name":"x215$10","width":48,"height":48},{"name":"x215$11","width":48,"height":48},{"name":"x215$2","width":48,"height":48},{"name":"x215$3","width":48,"height":48},{"name":"x215$4","width":48,"height":48},{"name":"x215$5","width":48,"height":48},{"name":"x215$6","width":48,"height":48},{"name":"x215$7","width":48,"height":48},{"name":"x215$8","width":48,"height":48},{"name":"x215$9","width":48,"height":48},{"name":"x216$1","width":48,"height":48},{"name":"x216$2","width":48,"height":48},{"name":"x216$3","width":48,"height":48},{"name":"x216$4","width":48,"height":48},{"name":"x216$5","width":48,"height":48},{"name":"x216$6","width":48,"height":48},{"name":"x216$7","width":48,"height":48},{"name":"x216$8","width":48,"height":48},{"name":"x217$1","width":48,"height":48},{"name":"x217$10","width":48,"height":48},{"name":"x217$11","width":48,"height":48},{"name":"x217$2","width":48,"height":48},{"name":"x217$22","width":48,"height":48},{"name":"x217$23","width":48,"height":48},{"name":"x217$24","width":48,"height":48},{"name":"x217$25","width":48,"height":48},{"name":"x217$26","width":48,"height":48},{"name":"x217$27","width":48,"height":48},{"name":"x217$3","width":48,"height":48},{"name":"x217$35","width":48,"height":48},{"name":"x217$36","width":48,"height":48},{"name":"x217$4","width":48,"height":48},{"name":"x217$5","width":48,"height":48},{"name":"x217$6","width":48,"height":48},{"name":"x217$7","width":48,"height":48},{"name":"x217$8","width":48,"height":48},{"name":"x217$9","width":48,"height":48},{"name":"x218$1","width":48,"height":48},{"name":"x218$10","width":48,"height":48},{"name":"x218$11","width":48,"height":48},{"name":"x218$12","width":48,"height":48},{"name":"x218$13","width":48,"height":48},{"name":"x218$14","width":48,"height":48},{"name":"x218$15","width":48,"height":48},{"name":"x218$16","width":48,"height":48},{"name":"x218$17","width":48,"height":48},{"name":"x218$18","width":48,"height":48},{"name":"x218$19","width":48,"height":48},{"name":"x218$2","width":48,"height":48},{"name":"x218$20","width":48,"height":48},{"name":"x218$21","width":48,"height":48},{"name":"x218$22","width":48,"height":48},{"name":"x218$23","width":48,"height":48},{"name":"x218$3","width":48,"height":48},{"name":"x218$4","width":48,"height":48},{"name":"x218$5","width":48,"height":48},{"name":"x218$6","width":48,"height":48},{"name":"x218$7","width":48,"height":48},{"name":"x218$8","width":48,"height":48},{"name":"x218$9","width":48,"height":48},{"name":"x219$1","width":48,"height":48},{"name":"x219$10","width":48,"height":48},{"name":"x219$11","width":48,"height":48},{"name":"x219$12","width":48,"height":48},{"name":"x219$17","width":48,"height":48},{"name":"x219$18","width":48,"height":48},{"name":"x219$19","width":48,"height":48},{"name":"x219$2","width":48,"height":48},{"name":"x219$20","width":48,"height":48},{"name":"x219$21","width":48,"height":48},{"name":"x219$22","width":48,"height":48},{"name":"x219$23","width":48,"height":48},{"name":"x219$24","width":48,"height":48},{"name":"x219$25","width":48,"height":48},{"name":"x219$26","width":48,"height":48},{"name":"x219$27","width":48,"height":48},{"name":"x219$28","width":48,"height":48},{"name":"x219$3","width":48,"height":48},{"name":"x219$4","width":48,"height":48},{"name":"x219$5","width":48,"height":48},{"name":"x219$6","width":48,"height":48},{"name":"x219$7","width":48,"height":48},{"name":"x219$8","width":48,"height":48},{"name":"x219$9","width":48,"height":48},{"name":"x22$11","width":48,"height":48},{"name":"x22$12","width":48,"height":48},{"name":"x22$13","width":48,"height":48},{"name":"x22$14","width":48,"height":48},{"name":"x22$15","width":48,"height":48},{"name":"x22$16","width":48,"height":48},{"name":"x22$17","width":48,"height":48},{"name":"x22$18","width":48,"height":48},{"name":"x22$19","width":48,"height":48},{"name":"x22$20","width":48,"height":48},{"name":"x22$21","width":48,"height":48},{"name":"x22$22","width":48,"height":48},{"name":"x22$23","width":48,"height":48},{"name":"x22$24","width":48,"height":48},{"name":"x22$26","width":48,"height":48},{"name":"x22$30","width":48,"height":48},{"name":"x22$31","width":48,"height":48},{"name":"x22$32","width":48,"height":48},{"name":"x22$33","width":48,"height":48},{"name":"x22$8","width":48,"height":48},{"name":"x22$9","width":48,"height":48},{"name":"x220$1","width":48,"height":48},{"name":"x220$10","width":48,"height":48},{"name":"x220$11","width":48,"height":48},{"name":"x220$12","width":48,"height":48},{"name":"x220$13","width":48,"height":48},{"name":"x220$14","width":48,"height":48},{"name":"x220$15","width":48,"height":48},{"name":"x220$16","width":48,"height":48},{"name":"x220$17","width":48,"height":48},{"name":"x220$18","width":48,"height":48},{"name":"x220$19","width":48,"height":48},{"name":"x220$2","width":48,"height":48},{"name":"x220$20","width":48,"height":48},{"name":"x220$3","width":48,"height":48},{"name":"x220$34","width":48,"height":48},{"name":"x220$35","width":48,"height":48},{"name":"x220$36","width":48,"height":48},{"name":"x220$37","width":48,"height":48},{"name":"x220$38","width":48,"height":48},{"name":"x220$4","width":48,"height":48},{"name":"x220$5","width":48,"height":48},{"name":"x220$6","width":48,"height":48},{"name":"x220$7","width":48,"height":48},{"name":"x220$8","width":48,"height":48},{"name":"x220$9","width":48,"height":48},{"name":"x221$1","width":48,"height":48},{"name":"x221$10","width":48,"height":48},{"name":"x221$11","width":48,"height":48},{"name":"x221$12","width":48,"height":48},{"name":"x221$13","width":48,"height":48},{"name":"x221$14","width":48,"height":48},{"name":"x221$15","width":48,"height":48},{"name":"x221$16","width":48,"height":48},{"name":"x221$17","width":48,"height":48},{"name":"x221$18","width":48,"height":48},{"name":"x221$2","width":48,"height":48},{"name":"x221$3","width":48,"height":48},{"name":"x221$4","width":48,"height":48},{"name":"x221$5","width":48,"height":48},{"name":"x221$6","width":48,"height":48},{"name":"x221$7","width":48,"height":48},{"name":"x221$8","width":48,"height":48},{"name":"x221$9","width":48,"height":48},{"name":"x222$1","width":48,"height":48},{"name":"x222$10","width":48,"height":48},{"name":"x222$11","width":48,"height":48},{"name":"x222$12","width":48,"height":48},{"name":"x222$13","width":48,"height":48},{"name":"x222$14","width":48,"height":48},{"name":"x222$15","width":48,"height":48},{"name":"x222$16","width":48,"height":48},{"name":"x222$17","width":48,"height":48},{"name":"x222$2","width":48,"height":48},{"name":"x222$3","width":48,"height":48},{"name":"x222$4","width":48,"height":48},{"name":"x222$5","width":48,"height":48},{"name":"x222$6","width":48,"height":48},{"name":"x222$7","width":48,"height":48},{"name":"x222$8","width":48,"height":48},{"name":"x222$9","width":48,"height":48},{"name":"x223$1","width":48,"height":48},{"name":"x223$10","width":48,"height":48},{"name":"x223$11","width":48,"height":48},{"name":"x223$12","width":48,"height":48},{"name":"x223$13","width":48,"height":48},{"name":"x223$14","width":48,"height":48},{"name":"x223$15","width":48,"height":48},{"name":"x223$16","width":48,"height":48},{"name":"x223$17","width":48,"height":48},{"name":"x223$18","width":48,"height":48},{"name":"x223$19","width":48,"height":48},{"name":"x223$2","width":48,"height":48},{"name":"x223$20","width":48,"height":48},{"name":"x223$21","width":48,"height":48},{"name":"x223$22","width":48,"height":48},{"name":"x223$23","width":48,"height":48},{"name":"x223$3","width":48,"height":48},{"name":"x223$4","width":48,"height":48},{"name":"x223$5","width":48,"height":48},{"name":"x223$6","width":48,"height":48},{"name":"x223$7","width":48,"height":48},{"name":"x223$8","width":48,"height":48},{"name":"x223$9","width":48,"height":48},{"name":"x224$1","width":48,"height":48},{"name":"x224$10","width":48,"height":48},{"name":"x224$11","width":48,"height":48},{"name":"x224$12","width":48,"height":48},{"name":"x224$13","width":48,"height":48},{"name":"x224$14","width":48,"height":48},{"name":"x224$2","width":48,"height":48},{"name":"x224$3","width":48,"height":48},{"name":"x224$4","width":48,"height":48},{"name":"x224$5","width":48,"height":48},{"name":"x224$6","width":48,"height":48},{"name":"x224$7","width":48,"height":48},{"name":"x224$8","width":48,"height":48},{"name":"x224$9","width":48,"height":48},{"name":"x225$16","width":48,"height":48},{"name":"x225$17","width":48,"height":48},{"name":"x225$18","width":48,"height":48},{"name":"x225$19","width":48,"height":48},{"name":"x225$2","width":48,"height":48},{"name":"x225$20","width":48,"height":48},{"name":"x225$21","width":48,"height":48},{"name":"x225$22","width":48,"height":48},{"name":"x225$3","width":48,"height":48},{"name":"x225$4","width":48,"height":48},{"name":"x225$5","width":48,"height":48},{"name":"x225$6","width":48,"height":48},{"name":"x225$7","width":48,"height":48},{"name":"x226$1","width":48,"height":48},{"name":"x227$10","width":48,"height":48},{"name":"x227$11","width":48,"height":48},{"name":"x227$3","width":48,"height":48},{"name":"x227$4","width":48,"height":48},{"name":"x227$5","width":48,"height":48},{"name":"x227$6","width":48,"height":48},{"name":"x227$7","width":48,"height":48},{"name":"x227$8","width":48,"height":48},{"name":"x227$9","width":48,"height":48},{"name":"x228$1","width":48,"height":48},{"name":"x228$10","width":48,"height":48},{"name":"x228$11","width":48,"height":48},{"name":"x228$12","width":48,"height":48},{"name":"x228$13","width":48,"height":48},{"name":"x228$14","width":48,"height":48},{"name":"x228$15","width":48,"height":48},{"name":"x228$16","width":48,"height":48},{"name":"x228$17","width":48,"height":48},{"name":"x228$18","width":48,"height":48},{"name":"x228$19","width":48,"height":48},{"name":"x228$2","width":48,"height":48},{"name":"x228$20","width":48,"height":48},{"name":"x228$21","width":48,"height":48},{"name":"x228$22","width":48,"height":48},{"name":"x228$23","width":48,"height":48},{"name":"x228$24","width":48,"height":48},{"name":"x228$25","width":48,"height":48},{"name":"x228$26","width":48,"height":48},{"name":"x228$27","width":48,"height":48},{"name":"x228$28","width":48,"height":48},{"name":"x228$29","width":48,"height":48},{"name":"x228$3","width":48,"height":48},{"name":"x228$30","width":48,"height":48},{"name":"x228$31","width":48,"height":48},{"name":"x228$32","width":48,"height":48},{"name":"x228$33","width":48,"height":48},{"name":"x228$34","width":48,"height":48},{"name":"x228$35","width":48,"height":48},{"name":"x228$4","width":48,"height":48},{"name":"x228$5","width":48,"height":48},{"name":"x228$6","width":48,"height":48},{"name":"x228$7","width":48,"height":48},{"name":"x228$8","width":48,"height":48},{"name":"x228$9","width":48,"height":48},{"name":"x229$1","width":48,"height":48},{"name":"x229$10","width":48,"height":48},{"name":"x229$11","width":48,"height":48},{"name":"x229$12","width":48,"height":48},{"name":"x229$13","width":48,"height":48},{"name":"x229$14","width":48,"height":48},{"name":"x229$15","width":48,"height":48},{"name":"x229$16","width":48,"height":48},{"name":"x229$17","width":48,"height":48},{"name":"x229$18","width":48,"height":48},{"name":"x229$19","width":48,"height":48},{"name":"x229$2","width":48,"height":48},{"name":"x229$3","width":48,"height":48},{"name":"x229$4","width":48,"height":48},{"name":"x229$5","width":48,"height":48},{"name":"x229$6","width":48,"height":48},{"name":"x229$7","width":48,"height":48},{"name":"x229$8","width":48,"height":48},{"name":"x229$9","width":48,"height":48},{"name":"x23$1","width":48,"height":48},{"name":"x23$10","width":48,"height":48},{"name":"x23$11","width":48,"height":48},{"name":"x23$12","width":48,"height":48},{"name":"x23$13","width":48,"height":48},{"name":"x23$14","width":48,"height":48},{"name":"x23$15","width":48,"height":48},{"name":"x23$16","width":48,"height":48},{"name":"x23$17","width":48,"height":48},{"name":"x23$18","width":48,"height":48},{"name":"x23$19","width":48,"height":48},{"name":"x23$2","width":48,"height":48},{"name":"x23$20","width":48,"height":48},{"name":"x23$21","width":48,"height":48},{"name":"x23$22","width":48,"height":48},{"name":"x23$23","width":48,"height":48},{"name":"x23$24","width":48,"height":48},{"name":"x23$25","width":48,"height":48},{"name":"x23$26","width":48,"height":48},{"name":"x23$27","width":48,"height":48},{"name":"x23$28","width":48,"height":48},{"name":"x23$29","width":48,"height":48},{"name":"x23$3","width":48,"height":48},{"name":"x23$39","width":48,"height":48},{"name":"x23$4","width":48,"height":48},{"name":"x23$40","width":48,"height":48},{"name":"x23$41","width":48,"height":48},{"name":"x23$42","width":48,"height":48},{"name":"x23$43","width":48,"height":48},{"name":"x23$44","width":48,"height":48},{"name":"x23$45","width":48,"height":48},{"name":"x23$46","width":48,"height":48},{"name":"x23$47","width":48,"height":48},{"name":"x23$48","width":48,"height":48},{"name":"x23$49","width":48,"height":48},{"name":"x23$5","width":48,"height":48},{"name":"x23$50","width":48,"height":48},{"name":"x23$51","width":48,"height":48},{"name":"x23$52","width":48,"height":48},{"name":"x23$53","width":48,"height":48},{"name":"x23$54","width":48,"height":48},{"name":"x23$6","width":48,"height":48},{"name":"x23$7","width":48,"height":48},{"name":"x23$8","width":48,"height":48},{"name":"x23$9","width":48,"height":48},{"name":"x230$1","width":48,"height":48},{"name":"x230$10","width":48,"height":48},{"name":"x230$11","width":48,"height":48},{"name":"x230$12","width":48,"height":48},{"name":"x230$13","width":48,"height":48},{"name":"x230$14","width":48,"height":48},{"name":"x230$15","width":48,"height":48},{"name":"x230$16","width":48,"height":48},{"name":"x230$2","width":48,"height":48},{"name":"x230$25","width":48,"height":48},{"name":"x230$26","width":48,"height":48},{"name":"x230$27","width":48,"height":48},{"name":"x230$3","width":48,"height":48},{"name":"x230$4","width":48,"height":48},{"name":"x230$5","width":48,"height":48},{"name":"x230$6","width":48,"height":48},{"name":"x230$7","width":48,"height":48},{"name":"x230$8","width":48,"height":48},{"name":"x230$9","width":48,"height":48},{"name":"x231$1","width":48,"height":48},{"name":"x231$10","width":48,"height":48},{"name":"x231$11","width":48,"height":48},{"name":"x231$12","width":48,"height":48},{"name":"x231$13","width":48,"height":48},{"name":"x231$2","width":48,"height":48},{"name":"x231$3","width":48,"height":48},{"name":"x231$31","width":48,"height":48},{"name":"x231$32","width":48,"height":48},{"name":"x231$33","width":48,"height":48},{"name":"x231$7","width":48,"height":48},{"name":"x231$8","width":48,"height":48},{"name":"x231$9","width":48,"height":48},{"name":"x24$1","width":48,"height":48},{"name":"x24$10","width":48,"height":48},{"name":"x24$11","width":48,"height":48},{"name":"x24$2","width":48,"height":48},{"name":"x24$3","width":48,"height":48},{"name":"x24$4","width":48,"height":48},{"name":"x24$5","width":48,"height":48},{"name":"x24$6","width":48,"height":48},{"name":"x24$7","width":48,"height":48},{"name":"x24$8","width":48,"height":48},{"name":"x24$9","width":48,"height":48},{"name":"x25$1","width":48,"height":48},{"name":"x25$10","width":48,"height":48},{"name":"x25$11","width":48,"height":48},{"name":"x25$12","width":48,"height":48},{"name":"x25$13","width":48,"height":48},{"name":"x25$14","width":48,"height":48},{"name":"x25$15","width":48,"height":48},{"name":"x25$16","width":48,"height":48},{"name":"x25$17","width":48,"height":48},{"name":"x25$18","width":48,"height":48},{"name":"x25$19","width":48,"height":48},{"name":"x25$2","width":48,"height":48},{"name":"x25$20","width":48,"height":48},{"name":"x25$21","width":48,"height":48},{"name":"x25$28","width":48,"height":48},{"name":"x25$29","width":48,"height":48},{"name":"x25$3","width":48,"height":48},{"name":"x25$30","width":48,"height":48},{"name":"x25$31","width":48,"height":48},{"name":"x25$32","width":48,"height":48},{"name":"x25$33","width":48,"height":48},{"name":"x25$34","width":48,"height":48},{"name":"x25$35","width":48,"height":48},{"name":"x25$36","width":48,"height":48},{"name":"x25$4","width":48,"height":48},{"name":"x25$5","width":48,"height":48},{"name":"x25$6","width":48,"height":48},{"name":"x25$7","width":48,"height":48},{"name":"x25$8","width":48,"height":48},{"name":"x25$9","width":48,"height":48},{"name":"x26$21","width":48,"height":48},{"name":"x26$22","width":48,"height":48},{"name":"x27$1","width":48,"height":48},{"name":"x27$10","width":48,"height":48},{"name":"x27$11","width":48,"height":48},{"name":"x27$12","width":48,"height":48},{"name":"x27$13","width":48,"height":48},{"name":"x27$14","width":48,"height":48},{"name":"x27$15","width":48,"height":48},{"name":"x27$16","width":48,"height":48},{"name":"x27$17","width":48,"height":48},{"name":"x27$18","width":48,"height":48},{"name":"x27$19","width":48,"height":48},{"name":"x27$2","width":48,"height":48},{"name":"x27$20","width":48,"height":48},{"name":"x27$21","width":48,"height":48},{"name":"x27$22","width":48,"height":48},{"name":"x27$23","width":48,"height":48},{"name":"x27$24","width":48,"height":48},{"name":"x27$25","width":48,"height":48},{"name":"x27$26","width":48,"height":48},{"name":"x27$3","width":48,"height":48},{"name":"x27$4","width":48,"height":48},{"name":"x27$5","width":48,"height":48},{"name":"x27$6","width":48,"height":48},{"name":"x27$7","width":48,"height":48},{"name":"x27$8","width":48,"height":48},{"name":"x27$9","width":48,"height":48},{"name":"x28$1","width":48,"height":48},{"name":"x28$10","width":48,"height":48},{"name":"x28$11","width":48,"height":48},{"name":"x28$12","width":48,"height":48},{"name":"x28$13","width":48,"height":48},{"name":"x28$14","width":48,"height":48},{"name":"x28$15","width":48,"height":48},{"name":"x28$16","width":48,"height":48},{"name":"x28$17","width":48,"height":48},{"name":"x28$2","width":48,"height":48},{"name":"x28$24","width":48,"height":48},{"name":"x28$25","width":48,"height":48},{"name":"x28$27","width":48,"height":48},{"name":"x28$28","width":48,"height":48},{"name":"x28$29","width":48,"height":48},{"name":"x28$3","width":48,"height":48},{"name":"x28$30","width":48,"height":48},{"name":"x28$31","width":48,"height":48},{"name":"x28$32","width":48,"height":48},{"name":"x28$33","width":48,"height":48},{"name":"x28$34","width":48,"height":48},{"name":"x28$35","width":48,"height":48},{"name":"x28$36","width":48,"height":48},{"name":"x28$4","width":48,"height":48},{"name":"x28$5","width":48,"height":48},{"name":"x28$6","width":48,"height":48},{"name":"x28$7","width":48,"height":48},{"name":"x28$8","width":48,"height":48},{"name":"x28$9","width":48,"height":48},{"name":"x29$10","width":48,"height":48},{"name":"x29$11","width":48,"height":48},{"name":"x29$12","width":48,"height":48},{"name":"x29$13","width":48,"height":48},{"name":"x29$14","width":48,"height":48},{"name":"x29$15","width":48,"height":48},{"name":"x29$16","width":48,"height":48},{"name":"x29$17","width":48,"height":48},{"name":"x29$18","width":48,"height":48},{"name":"x29$19","width":48,"height":48},{"name":"x29$20","width":48,"height":48},{"name":"x29$21","width":48,"height":48},{"name":"x29$9","width":48,"height":48})

sin.push({"name":"2bgItem0","width":242,"height":250},{"name":"2bgItem1","width":256,"height":280},{"name":"2bgItem100","width":75,"height":135},{"name":"2bgItem12","width":198,"height":286},{"name":"2bgItem13","width":136,"height":172},{"name":"2bgItem16","width":159,"height":255},{"name":"2bgItem2","width":184,"height":192},{"name":"2bgItem20","width":102,"height":104},{"name":"2bgItem213","width":212,"height":165},{"name":"2bgItem23","width":136,"height":138},{"name":"2bgItem49","width":148,"height":148},{"name":"2bgItem5","width":154,"height":272},{"name":"2bgItem50","width":54,"height":128},{"name":"2bgItem6","width":204,"height":239},{"name":"2bgItem7","width":238,"height":244},{"name":"2bgItem81","width":128,"height":134})

sin.push({"name":"x2b11","width":254,"height":230})

sin.push({"name":"x2b00-1","width":336,"height":160},{"name":"x2b00-2","width":336,"height":160},{"name":"x2b00-3","width":336,"height":160},{"name":"x2b00-4","width":336,"height":160},{"name":"x2b00-5","width":336,"height":160},{"name":"x2b00","width":336,"height":160},{"name":"x2b01-1","width":336,"height":146},{"name":"x2b01-2","width":336,"height":146},{"name":"x2b01-3","width":528,"height":154},{"name":"x2b01-4","width":336,"height":146},{"name":"x2b01-5","width":336,"height":146},{"name":"x2b01","width":336,"height":146},{"name":"x2b02-1","width":528,"height":154},{"name":"x2b02-2","width":528,"height":154},{"name":"x2b02-3","width":336,"height":146},{"name":"x2b02-4","width":510,"height":154},{"name":"x2b02-5","width":510,"height":154},{"name":"x2b02","width":510,"height":154},{"name":"x2b03-1","width":258,"height":120},{"name":"x2b03-2","width":258,"height":120},{"name":"x2b03-3","width":258,"height":114},{"name":"x2b03-4","width":258,"height":120},{"name":"x2b03-5","width":258,"height":120},{"name":"x2b03","width":258,"height":120},{"name":"x2b10","width":266,"height":176},{"name":"x2b100","width":422,"height":150},{"name":"x2b101","width":388,"height":162},{"name":"x2b110-1","width":544,"height":172},{"name":"x2b110-2","width":300,"height":188},{"name":"x2b110","width":324,"height":164},{"name":"x2b111-1","width":276,"height":200},{"name":"x2b111-2","width":276,"height":152},{"name":"x2b111","width":296,"height":82},{"name":"x2b112-1","width":416,"height":154},{"name":"x2b112-2","width":230,"height":236},{"name":"x2b112","width":488,"height":256},{"name":"x2b12","width":284,"height":300},{"name":"x2b120","width":574,"height":114},{"name":"x2b13","width":284,"height":300},{"name":"x2b130","width":182,"height":130},{"name":"x2b131","width":240,"height":160},{"name":"x2b140","width":298,"height":76},{"name":"x2b141","width":300,"height":118},{"name":"x2b150","width":134,"height":76},{"name":"x2b151","width":270,"height":450},{"name":"x2b160","width":336,"height":268},{"name":"x2b161","width":832,"height":146},{"name":"x2b162","width":416,"height":154},{"name":"x2b163","width":416,"height":416},{"name":"x2b170","width":336,"height":268},{"name":"x2b171","width":832,"height":146},{"name":"x2b172","width":416,"height":154},{"name":"x2b173","width":416,"height":416},{"name":"x2b180","width":416,"height":268},{"name":"x2b181","width":832,"height":146},{"name":"x2b182","width":416,"height":154},{"name":"x2b183","width":416,"height":416},{"name":"x2b20","width":220,"height":126},{"name":"x2b21","width":220,"height":52},{"name":"x2b22","width":220,"height":64},{"name":"x2b23","width":210,"height":30},{"name":"x2b24","width":178,"height":122},{"name":"x2b30","width":504,"height":358},{"name":"x2b31","width":272,"height":86},{"name":"x2b32","width":404,"height":224},{"name":"x2b40","width":324,"height":206},{"name":"x2b41","width":324,"height":108},{"name":"x2b42","width":364,"height":138},{"name":"x2b43","width":364,"height":186},{"name":"x2b50","width":348,"height":70},{"name":"x2b51","width":560,"height":128},{"name":"x2b52","width":560,"height":158},{"name":"x2b53","width":254,"height":162},{"name":"x2b60","width":308,"height":62},{"name":"x2b61","width":400,"height":138},{"name":"x2b62","width":296,"height":76},{"name":"x2b63","width":292,"height":128},{"name":"x2b70","width":338,"height":78},{"name":"x2b71","width":212,"height":52},{"name":"x2b72","width":212,"height":70},{"name":"x2b73","width":254,"height":102},{"name":"x2b80-2","width":324,"height":206},{"name":"x2b80-4","width":496,"height":322},{"name":"x2b80-5","width":220,"height":96},{"name":"x2b80","width":324,"height":206},{"name":"x2b81-1","width":498,"height":198},{"name":"x2b81-2","width":498,"height":198},{"name":"x2b81-4","width":468,"height":196},{"name":"x2b81-5","width":462,"height":218},{"name":"x2b81","width":498,"height":198},{"name":"x2b82-1","width":406,"height":134},{"name":"x2b82-2","width":406,"height":134},{"name":"x2b82-4","width":510,"height":226},{"name":"x2b82","width":406,"height":140},{"name":"x2b92","width":410,"height":118},{"name":"x2b93","width":254,"height":96},{"name":"x2cl0","width":160,"height":38},{"name":"x2cl1","width":160,"height":38},{"name":"x2sun1","width":80,"height":76},{"name":"x2sun10","width":56,"height":56},{"name":"x2sun11","width":134,"height":134},{"name":"x2sun12","width":36,"height":36},{"name":"x2sun13","width":134,"height":134},{"name":"x2sun14","width":36,"height":36},{"name":"x2sun15","width":208,"height":208},{"name":"x2sun160","width":80,"height":80},{"name":"x2sun161","width":40,"height":40},{"name":"x2sun162","width":2,"height":2},{"name":"x2sun18","width":80,"height":80},{"name":"x2sun2","width":170,"height":170},{"name":"x2sun3","width":104,"height":104},{"name":"x2sun4","width":60,"height":58},{"name":"x2sun5","width":136,"height":136},{"name":"x2sun6","width":56,"height":52},{"name":"x2sun7","width":50,"height":50},{"name":"x2sun8","width":60,"height":58},{"name":"x2sun9","width":42,"height":42},{"name":"x2tuyet","width":10,"height":30},{"name":"x2twtf","width":48,"height":192},{"name":"x2uwt","width":48,"height":48},{"name":"x2uwtN","width":48,"height":48},{"name":"x2uwtN2","width":48,"height":48},{"name":"x2wtf","width":48,"height":192},{"name":"x2wts","width":48,"height":98},{"name":"x2wtsN","width":48,"height":98},{"name":"x2wtsN2","width":48,"height":98})

sin.push({"name":"2bgItem10","width":218,"height":144},{"name":"2bgItem130","width":344,"height":104},{"name":"2bgItem131","width":126,"height":74},{"name":"2bgItem212","width":246,"height":164},{"name":"2bgItem28","width":168,"height":182},{"name":"2bgItem78","width":246,"height":224},{"name":"2bgItem80","width":120,"height":108})


sin.push({"name":"x21$10","width":48,"height":48},{"name":"x21$11","width":48,"height":48},{"name":"x21$12","width":48,"height":48},{"name":"x21$13","width":48,"height":48},{"name":"x21$14","width":48,"height":48},{"name":"x21$15","width":48,"height":48},{"name":"x21$16","width":48,"height":48},{"name":"x21$35","width":48,"height":48},{"name":"x21$36","width":48,"height":48},{"name":"x21$37","width":48,"height":48},{"name":"x21$38","width":48,"height":48},{"name":"x21$39","width":48,"height":48},{"name":"x21$40","width":48,"height":2},{"name":"x21$7","width":48,"height":48},{"name":"x21$8","width":48,"height":48},{"name":"x21$9","width":48,"height":48},{"name":"x210$12","width":48,"height":48},{"name":"x210$13","width":48,"height":48},{"name":"x210$17","width":48,"height":48},{"name":"x210$18","width":48,"height":48},{"name":"x210$19","width":48,"height":48},{"name":"x210$22","width":48,"height":48},{"name":"x210$23","width":48,"height":48},{"name":"x210$26","width":48,"height":48},{"name":"x210$27","width":48,"height":48},{"name":"x210$28","width":48,"height":48},{"name":"x211$10","width":48,"height":48},{"name":"x211$11","width":48,"height":48},{"name":"x211$12","width":48,"height":48},{"name":"x211$13","width":48,"height":48},{"name":"x211$14","width":48,"height":48},{"name":"x211$15","width":48,"height":48},{"name":"x211$16","width":48,"height":48},{"name":"x211$21","width":48,"height":48},{"name":"x211$22","width":48,"height":48},{"name":"x211$23","width":48,"height":48},{"name":"x211$9","width":48,"height":48},{"name":"x212$18","width":48,"height":48},{"name":"x212$19","width":48,"height":48},{"name":"x212$20","width":48,"height":48},{"name":"x212$21","width":48,"height":48},{"name":"x212$22","width":48,"height":48},{"name":"x212$23","width":48,"height":48},{"name":"x212$24","width":48,"height":48},{"name":"x212$25","width":48,"height":48},{"name":"x212$26","width":48,"height":48},{"name":"x212$27","width":48,"height":48},{"name":"x212$28","width":48,"height":48},{"name":"x212$29","width":48,"height":48},{"name":"x212$30","width":48,"height":48},{"name":"x212$31","width":48,"height":48},{"name":"x212$32","width":48,"height":48},{"name":"x212$33","width":48,"height":48},{"name":"x212$34","width":48,"height":48},{"name":"x212$35","width":48,"height":2},{"name":"x213$1","width":48,"height":48},{"name":"x217$12","width":48,"height":48},{"name":"x217$13","width":48,"height":48},{"name":"x217$14","width":48,"height":48},{"name":"x217$15","width":48,"height":48},{"name":"x217$16","width":48,"height":48},{"name":"x217$17","width":48,"height":48},{"name":"x217$18","width":48,"height":48},{"name":"x217$19","width":48,"height":48},{"name":"x217$20","width":48,"height":48},{"name":"x217$21","width":48,"height":48},{"name":"x217$28","width":48,"height":48},{"name":"x217$29","width":48,"height":48},{"name":"x217$30","width":48,"height":48},{"name":"x217$31","width":48,"height":48},{"name":"x217$32","width":48,"height":48},{"name":"x217$33","width":48,"height":48},{"name":"x217$34","width":48,"height":48},{"name":"x219$13","width":48,"height":48},{"name":"x219$14","width":48,"height":48},{"name":"x219$15","width":48,"height":48},{"name":"x219$16","width":48,"height":48},{"name":"x22$1","width":48,"height":48},{"name":"x22$2","width":48,"height":48},{"name":"x22$25","width":48,"height":48},{"name":"x22$27","width":48,"height":48},{"name":"x22$28","width":48,"height":48},{"name":"x22$29","width":48,"height":48},{"name":"x22$3","width":48,"height":48},{"name":"x22$34","width":48,"height":48},{"name":"x22$35","width":48,"height":48},{"name":"x22$36","width":48,"height":2},{"name":"x22$4","width":48,"height":48},{"name":"x22$5","width":48,"height":48},{"name":"x22$6","width":48,"height":48},{"name":"x22$7","width":48,"height":48},{"name":"x220$21","width":48,"height":48},{"name":"x220$22","width":48,"height":48},{"name":"x220$23","width":48,"height":48},{"name":"x220$24","width":48,"height":48},{"name":"x220$25","width":48,"height":48},{"name":"x220$26","width":48,"height":48},{"name":"x220$27","width":48,"height":48},{"name":"x220$28","width":48,"height":48},{"name":"x220$29","width":48,"height":48},{"name":"x220$30","width":48,"height":48},{"name":"x220$31","width":48,"height":48},{"name":"x220$32","width":48,"height":48},{"name":"x220$33","width":48,"height":48},{"name":"x224$15","width":48,"height":48},{"name":"x224$16","width":48,"height":48},{"name":"x224$17","width":48,"height":48},{"name":"x224$18","width":48,"height":48},{"name":"x224$19","width":48,"height":48},{"name":"x224$20","width":48,"height":48},{"name":"x224$21","width":48,"height":48},{"name":"x224$22","width":48,"height":48},{"name":"x225$10","width":48,"height":48},{"name":"x225$11","width":48,"height":48},{"name":"x225$12","width":48,"height":48},{"name":"x225$13","width":48,"height":48},{"name":"x225$14","width":48,"height":48},{"name":"x225$15","width":48,"height":48},{"name":"x225$8","width":48,"height":48},{"name":"x225$9","width":48,"height":48},{"name":"x226$2","width":48,"height":48},{"name":"x226$3","width":48,"height":48},{"name":"x226$4","width":48,"height":48},{"name":"x226$5","width":48,"height":48},{"name":"x226$6","width":48,"height":48},{"name":"x226$7","width":48,"height":48},{"name":"x226$8","width":48,"height":48},{"name":"x227$1","width":48,"height":48},{"name":"x227$12","width":48,"height":48},{"name":"x227$13","width":48,"height":48},{"name":"x227$14","width":48,"height":48},{"name":"x227$15","width":48,"height":48},{"name":"x227$16","width":48,"height":48},{"name":"x227$2","width":48,"height":48},{"name":"x229$20","width":48,"height":48},{"name":"x229$21","width":48,"height":48},{"name":"x229$22","width":48,"height":48},{"name":"x229$23","width":48,"height":48},{"name":"x229$24","width":48,"height":48},{"name":"x229$25","width":48,"height":48},{"name":"x229$26","width":48,"height":48},{"name":"x229$27","width":48,"height":48},{"name":"x229$28","width":48,"height":48},{"name":"x229$29","width":48,"height":48},{"name":"x229$30","width":48,"height":48},{"name":"x229$31","width":48,"height":48},{"name":"x229$32","width":48,"height":48},{"name":"x229$33","width":48,"height":48},{"name":"x229$34","width":48,"height":48},{"name":"x229$35","width":48,"height":48},{"name":"x229$36","width":48,"height":48},{"name":"x229$37","width":48,"height":48},{"name":"x23$30","width":48,"height":48},{"name":"x23$31","width":48,"height":48},{"name":"x23$32","width":48,"height":48},{"name":"x23$33","width":48,"height":48},{"name":"x23$34","width":48,"height":48},{"name":"x23$35","width":48,"height":48},{"name":"x23$36","width":48,"height":48},{"name":"x23$37","width":48,"height":48},{"name":"x23$38","width":48,"height":48},{"name":"x230$17","width":48,"height":48},{"name":"x230$18","width":48,"height":48},{"name":"x230$19","width":48,"height":48},{"name":"x230$20","width":48,"height":48},{"name":"x230$21","width":48,"height":48},{"name":"x230$22","width":48,"height":48},{"name":"x230$23","width":48,"height":48},{"name":"x230$24","width":48,"height":48},{"name":"x230$28","width":48,"height":48},{"name":"x230$29","width":48,"height":48},{"name":"x230$30","width":48,"height":48},{"name":"x231$14","width":48,"height":48},{"name":"x231$15","width":48,"height":48},{"name":"x231$16","width":48,"height":48},{"name":"x231$17","width":48,"height":48},{"name":"x231$18","width":48,"height":48},{"name":"x231$19","width":48,"height":48},{"name":"x231$20","width":48,"height":48},{"name":"x231$21","width":48,"height":48},{"name":"x231$22","width":48,"height":48},{"name":"x231$23","width":48,"height":48},{"name":"x231$24","width":48,"height":48},{"name":"x231$25","width":48,"height":48},{"name":"x231$26","width":48,"height":48},{"name":"x231$27","width":48,"height":48},{"name":"x231$28","width":48,"height":48},{"name":"x231$29","width":48,"height":48},{"name":"x231$30","width":48,"height":48},{"name":"x231$4","width":48,"height":48},{"name":"x231$5","width":48,"height":48},{"name":"x231$6","width":48,"height":48},{"name":"x24$12","width":48,"height":48},{"name":"x24$13","width":48,"height":48},{"name":"x24$14","width":48,"height":48},{"name":"x24$15","width":48,"height":48},{"name":"x24$16","width":48,"height":48},{"name":"x24$17","width":48,"height":48},{"name":"x24$18","width":48,"height":48},{"name":"x24$19","width":48,"height":48},{"name":"x24$20","width":48,"height":2},{"name":"x25$22","width":48,"height":48},{"name":"x25$23","width":48,"height":48},{"name":"x25$24","width":48,"height":48},{"name":"x25$25","width":48,"height":48},{"name":"x25$26","width":48,"height":48},{"name":"x25$27","width":48,"height":48},{"name":"x25$37","width":48,"height":48},{"name":"x25$38","width":48,"height":48},{"name":"x26$1","width":48,"height":48},{"name":"x26$10","width":48,"height":48},{"name":"x26$11","width":48,"height":48},{"name":"x26$12","width":48,"height":48},{"name":"x26$13","width":48,"height":48},{"name":"x26$14","width":48,"height":48},{"name":"x26$15","width":48,"height":48},{"name":"x26$16","width":48,"height":48},{"name":"x26$17","width":48,"height":48},{"name":"x26$18","width":48,"height":48},{"name":"x26$19","width":48,"height":48},{"name":"x26$2","width":48,"height":48},{"name":"x26$20","width":48,"height":48},{"name":"x26$23","width":48,"height":48},{"name":"x26$24","width":48,"height":48},{"name":"x26$25","width":48,"height":48},{"name":"x26$26","width":48,"height":48},{"name":"x26$27","width":48,"height":48},{"name":"x26$28","width":48,"height":48},{"name":"x26$29","width":48,"height":48},{"name":"x26$3","width":48,"height":48},{"name":"x26$30","width":48,"height":48},{"name":"x26$31","width":48,"height":48},{"name":"x26$32","width":48,"height":48},{"name":"x26$33","width":48,"height":48},{"name":"x26$4","width":48,"height":48},{"name":"x26$5","width":48,"height":48},{"name":"x26$6","width":48,"height":48},{"name":"x26$7","width":48,"height":48},{"name":"x26$8","width":48,"height":48},{"name":"x26$9","width":48,"height":48},{"name":"x27$27","width":48,"height":48},{"name":"x27$28","width":48,"height":48},{"name":"x27$29","width":48,"height":48},{"name":"x27$30","width":48,"height":48},{"name":"x27$31","width":48,"height":48},{"name":"x27$32","width":48,"height":48},{"name":"x27$33","width":48,"height":48},{"name":"x28$18","width":48,"height":48},{"name":"x28$19","width":48,"height":48},{"name":"x28$20","width":48,"height":48},{"name":"x28$21","width":48,"height":48},{"name":"x28$22","width":48,"height":48},{"name":"x28$23","width":48,"height":48},{"name":"x28$26","width":48,"height":48},{"name":"x28$37","width":48,"height":48},{"name":"x28$38","width":48,"height":48},{"name":"x28$39","width":48,"height":48},{"name":"x28$40","width":48,"height":48},{"name":"x28$41","width":48,"height":48},{"name":"x28$42","width":48,"height":48},{"name":"x28$43","width":48,"height":48},{"name":"x28$44","width":48,"height":2},{"name":"x29$1","width":48,"height":48},{"name":"x29$2","width":48,"height":48},{"name":"x29$22","width":48,"height":48},{"name":"x29$23","width":48,"height":48},{"name":"x29$24","width":48,"height":48},{"name":"x29$25","width":48,"height":48},{"name":"x29$26","width":48,"height":48},{"name":"x29$3","width":48,"height":48},{"name":"x29$4","width":48,"height":48},{"name":"x29$5","width":48,"height":48},{"name":"x29$6","width":48,"height":48},{"name":"x29$7","width":48,"height":48},{"name":"x29$8","width":48,"height":48},{"name":"x2b64","width":346,"height":178},{"name":"x2caycot","width":20,"height":76})


sin.push({"name":"2bgItem11","width":98,"height":74},{"name":"2bgItem111","width":346,"height":148},{"name":"2bgItem128","width":66,"height":48},{"name":"2bgItem129","width":80,"height":70},{"name":"2bgItem138","width":34,"height":100},{"name":"2bgItem14","width":112,"height":28},{"name":"2bgItem142","width":376,"height":190},{"name":"2bgItem143","width":376,"height":190},{"name":"2bgItem15","width":172,"height":104},{"name":"2bgItem157","width":54,"height":254},{"name":"2bgItem18","width":304,"height":172},{"name":"2bgItem19","width":232,"height":150},{"name":"2bgItem21","width":11,"height":108},{"name":"2bgItem24","width":14,"height":144},{"name":"2bgItem27","width":140,"height":114},{"name":"2bgItem3","width":90,"height":66},{"name":"2bgItem4","width":104,"height":58},{"name":"2bgItem79","width":348,"height":132},{"name":"2bgItem8","width":104,"height":70},{"name":"2bgItem82","width":102,"height":72},{"name":"2bgItem83","width":90,"height":94},{"name":"2bgItem84","width":408,"height":212},{"name":"2bgItem9","width":96,"height":92},{"name":"2bgItem96","width":32,"height":26},{"name":"2bgItem97","width":186,"height":216},{"name":"2bgItem99","width":93,"height":108})

sin.push({"name":"x2twtf","width":48,"height":192},{"name":"x2wtf","width":48,"height":192},{"name":"x2wts","width":48,"height":98},{"name":"x2wtsN","width":48,"height":98},{"name":"x2wtsN2","width":48,"height":98}
)

sin.push({"name":"lacay2","width":18,"height":72},{"name":"lacay3","width":14,"height":56},{"name":"lacay4","width":14,"height":56},{"name":"lacay5","width":12,"height":48})