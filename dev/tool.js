const gameWidth = document.getElementById("game").offsetWidth;
const gameHeight = document.getElementById("game").offsetHeight;
const app = new PIXI.Application({
    width: gameWidth - 0,
    height: gameHeight - 0,
    backgroundColor: 0x1099bb,
    antialias: true,
    resolution: 1.001,
});
//globalThis.__PIXI_APP__ = app;

// set the canvas width and height to fill the screen
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";


// add the canvas that Pixi automatically created for you to the HTML document

const gameDiv = document.getElementById("game");


gameDiv.appendChild(app.view);

// load the images we need

// loading asset

// loading asset from images send to load(setup)

function xoaall(name) 
{
    let list = bando.children.filter(e => e.type == name);
    list.forEach(e => {
        bando.removeChild(e);
    }
    );
}

function playGame() {

    let keysPressed = {};


    // khởi tạo các lớp
    /**
     * !Khởi tạo trò chơi
     * ? container: là lớp body chính của bản đồ
     * app : là lớp chính của canvas
     * bando: là lớp chứa bản đồ,
     * nguoichoi: là lớp chứa nhân vật, npc, bot, quái
     * nhanvat: là lớp chứa nhân vật của chính mình
     *
     */
    const container = new PIXI.Container();
    let inGame = new PIXI.Container();
    let loadGame = new PIXI.Container();
    container.blendMode = PIXI.BLEND_MODES.SCREEN;
    container.resolution = 2;



    // khởi tạo bản đồ
    // khởi tạo người chơi khác
    let nguoichoi = new PIXI.Container();
    let kiNang = new PIXI.Container();
    let Chat = new PIXI.Container();
    let luoiBlock = new PIXI.Container();



    
    // add block 48x48 

  

    


  

    


    loadMap();

    // thêm bản đồ vào lớp body
    container.addChild(bando);

    let timeReander;

    container.addChild(nguoichoi)


    const XY = new PIXI.Text('X,Y:', {
        fill: 'white'
    });
   

    XY.position.set(0,10);

  
    donDanh = XY;
    donDanh.style.stroke = "#000000";
    donDanh.style.strokeThickness = 4;
    donDanh.style.dropShadow = true;
    donDanh.style.dropShadowColor = "#000000";
    donDanh.style.dropShadowBlur = 4;
    donDanh.style.dropShadowAngle = Math.PI / 6;
    donDanh.style.dropShadowDistance = 6;
    inGame.addChild(XY);



    for(let i = 0; i < 70; i++)
    {
        for(let j = -50; j < 50; j++)
        {
            let block2 = new PIXI.Graphics();
            block2.beginFill(0x000000,0.3);
            block2.lineStyle(1, 0xFFFFFF, 0.5, 0.5, true); // Áp dụng nét đứt

            block2.drawRect(0, 0, 48, 48);
            block2.endFill();
            block2.x = i * 48;
            block2.y = j * 48;
            block2.alpha = 0.5;
            block2.type = 'block';

            block2.interactive = true;
            block2.on("mouseover",function() {
                XY.text = `X: ${block2.x} Y: ${block2.y} `
                console.log('mouseover');
                if(keysPressed[66]) 
                {
                    console.log('click');
                    addEvent(block2.x, block2.y)
                }
            });
            block2.on("mouseout",function() {
                XY.text = `X: ${block2.x} Y: ${block2.y} `
                if(keysPressed[66]) 
                {
                    console.log('click');
                    addEvent(block2.x, block2.y)
                }
            });

            block2.on("mousedown",function() {
                
                console.log('mousedown')
            });


        

            bando.addChild(block2);
        }
    }


    // Return all sprites to the pool
    function returnSpritesToPool(container) {
        container.children.forEach(sprite => {
            returnSprite(sprite);
        });
        loadMap();
        console.log('tái tạo mnap')
    }




    let NhanVat = new PIXI.Container();




    // Tính toán kích thước của hình chữ nhật bao quanh lớp NhanVat
    let hinhChuNhatWidth = 48;
    let hinhChuNhatHeight = 48; // Cạnh dưới bắt đầu từ phần tử Quan

    // Vẽ hình chữ nhật bao quanh lớp NhanVat
    let hinhChuNhat = new PIXI.Graphics();
    hinhChuNhat.lineStyle(2, 0xFF0000); // Đổi màu và độ dày của đường viền hình chữ nhật
    hinhChuNhat.drawRect(0, 0, hinhChuNhatWidth, hinhChuNhatHeight);

    hinhChuNhat.interactive = true;
    hinhChuNhat.buttonMode = true;




    NhanVat.addChild(hinhChuNhat);


    NhanVat.scale.x = 1;
    NhanVat.pivot.x = NhanVat.width;

    // click 
    NhanVat.interactive = true;
    NhanVat.buttonMode = true;


    NhanVat.on('pointerdown', ClickNhanVat);




    container.addChild(NhanVat)



    container.addChild(luoiBlock);

    function ClickNhanVat() {
        console.log('click nhan vat')
    }




    const postionChar = new PIXI.Text('X,Y:', {
        fill: 'white'
    });
   

    postionChar.position.set(0, app.renderer.height - postionChar.height - 10);

    app.ticker.add(() => {

        let count = 0;
        let name = '';
        for (let k in setting_map) 
        {
            if(setting_map[k].xoa) {count++;
                name = name+k+',';
            }
        }

        // show X, Y of NhanVat
        postionChar.text = `X: ${NhanVat.x} Y: ${NhanVat.y} (`+(count >= 1 ? name+' ' : '')+`) `

    })
    donDanh = postionChar;
    donDanh.style.stroke = "#000000";
    donDanh.style.strokeThickness = 4;
    donDanh.style.dropShadow = true;
    donDanh.style.dropShadowColor = "#000000";
    donDanh.style.dropShadowBlur = 4;
    donDanh.style.dropShadowAngle = Math.PI / 6;
    donDanh.style.dropShadowDistance = 6;

    // effect shadow for postionChar
   






    let timeNhaPhim;

    let oneclick = false;
    /**
     * ! code khi người dùng nhấn phím
     * ?
     */
    document.addEventListener("keydown", (e) => {
        console.log(e.keyCode, PressKey)
        if (e.keyCode == 112) {
            e.preventDefault();
        }

        if(e.keyCode === 38 || e.keyCode === 40) 
        {
            e.preventDefault();
        }

       

       
       

        if(tungBuoc) 
        {
             if(PressKey == false) {
                keysPressed[e.keyCode] = true;
                PressKey = true;

             }
        }
        else 
        {
            keysPressed[e.keyCode] = true;
        }

    });

    let resetChar = function(type = null) {


    };

    /**
     * ! code khi người dùng nhả phím ra
     */
    document.addEventListener("keyup", (e) => {
        oneclick = false;
        PressKey = false;


        if(e.keyCode == 67 )
        {
            
            if(move != null) 
            {
                coppyX();

            }
        }

        if(e.keyCode == 45) 
        {
            for (let k in setting_map) 
            {
                setting_map[k].xoa = false;
            }
        }

        if(e.keyCode == 110) 
        {
            if($("#add_name").length >= 1 && $("#add_type").length >= 1)
            button_add();
        }

        if (e.keyCode == 16) {
            if (move != null) {
                returnSprite(move);
                move = null;
            }
        }

        if(e.keyCode == 13) 
        {
            if(move != null) 
            {
                let xungquanh = move.getChildByName('baoquanh');
                xungquanh.clear(); // Xóa hình chữ nhật cũ
                xungquanh.lineStyle(2, 0xffff); // Đặt độ rộng viền và màu sắc mới (màu đỏ)
                xungquanh.drawRect(0, 0, move.width, move.height); // Vẽ lại hình chữ nhật mới
                xungquanh.endFill(); // Kết thúc việc vẽ
                // save
                NhanVat = NhanVatGan;
                move = null;
                NhanVatGan = null;
            }
        }

        delete keysPressed[e.keyCode];
    });

    let moveTimeout;




    function MoveSprites() {
        let speednew = 0;
        speednew  = speed;


        clearTimeout(moveTimeout);

        if(NhanVatGan == null) 
        {
            NhanVatGan = NhanVat;
        }

        if(move != null) 
        {
            NhanVat = move;
        }

        if(move == null && NhanVatGan != null) 
        {
            NhanVat = NhanVatGan;
        }
        

        if (move != null) {
            if (keysPressed[38] || keysPressed[40]) {

                move.y += keysPressed[38] ? -speednew : speednew;
            } else if (keysPressed[39] || keysPressed[37]) {
                move.x += keysPressed[37] ? -speednew : speednew;
            }
        }
        else 
        {
            if (keysPressed[38] || keysPressed[40] && speednew >= 1) {
            // up
            NhanVat.y += keysPressed[38] ? -speednew : speednew;
        }
        if (keysPressed[39] || keysPressed[37]) {


            NhanVat.x += keysPressed[37] ? -speednew : speednew;




        }
        }


        

        if(keysPressed[87])
        {
            container.y += speednew;
        }
        if(keysPressed[83])
        {
            container.y -= speednew;
        }

        if(keysPressed[68] )
        {
            container.x -= speednew;
        }

        if(keysPressed[65])
        {
            container.x += speednew;
        }



        if(tungBuoc)
        {
            




        }

        delete keysPressed[38];
            delete keysPressed[40];
            delete keysPressed[39];
            delete keysPressed[37];
            delete keysPressed[110];
            delete keysPressed[13];
            delete keysPressed[16];
            delete keysPressed[67];


        if(!keysPressed[66])
        {
            $("#add_x").val(NhanVat.x-48);
            $("#add_y").val(NhanVat.y);
        }


        moveTimeout = setTimeout(() => {
            requestAnimationFrame(MoveSprites, 33.33);
        }, 30);

        // reset sprite 
    }


    /**
     * function tấn công của nhân vật
     */


    requestAnimationFrame(MoveSprites, 33.33);


    // Code xử lý vị trí 

    const text = new PIXI.Text('Mouse position: 0, 0', {
        fill: 'white'
    });

    text.position.set(app.renderer.width - text.width - 10, app.renderer.height - text.height - 10);



    app.renderer.view.addEventListener('mousemove', e => {

        let x = e.clientX - app.renderer.view.offsetLeft;
        let y = e.clientY - app.renderer.view.offsetTop;


        text.text = `${x}, ${y}`;
        // show mouse position type text on bottom right screen



    });




    // phần xử lý giao tiếp




    app.view.addEventListener('wheel', (event) => {
        // Lấy tọa độ chuột

        const delta = event.deltaY;
        const scale = delta > 0 ? 1.1 : 0.9;
        container.scale.x *= scale;
        container.scale.y *= scale;
        container.width *= scale;
        container.height *= scale;
        event.preventDefault();

    });




    // Gắn sự kiện 'pointerdown' lên DOM element của PixiJS
    app.view.addEventListener('pointerdown', (event) => {
        isMouseDown = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    // Gắn sự kiện 'pointerup' lên DOM element của PixiJS
    app.view.addEventListener('pointerup', () => {
        isMouseDown = false;
        setting.blockcanvas = false;
        console.log('nhả')
            // ? reset  
        KeoX = 0;
        keoY = 0;
    });

    // Gắn sự kiện 'pointermove' lên DOM element của PixiJS
    app.view.addEventListener('pointermove', (event) => {
        if (isMouseDown) {
            movementX = event.clientX - mouseX;
            movementY = event.clientY - mouseY;
            setting.blockcanvas = true;



            if (1 + 1 != 2) {


            } else {
                // ! màn hình chính
                if (movementX < 0) {

                    if (KeoX <= 500) {
                        container.x -= 5;
                    }

                } else if (movementX > 0) {

                    if (KeoX <= 500) {
                        container.x += 5;
                    }

                } else
                if (movementY < 0) {
                    console.log('Lên');
                } else if (movementY > 0) {
                    console.log('Xuống');
                }
            }

        }
    });

    let nhanVatX_set = app.renderer.width / 2;
    let nhanVatY_set = app.renderer.height / 2;


    const showFPS = new PIXI.Text('Mouse position: 0, 0', {
        fill: 'white'
    });

    showFPS.position.set(app.renderer.width - showFPS.width - 10, 70);




    function countScenes(xxzczxc) {
        let count = 0;

        // Đếm số lượng cảnh con trong container hiện tại
        count += xxzczxc.children.length;

        // Duyệt qua từng cảnh con và đệ quy gọi lại hàm countScenes để đếm số lượng cảnh con trong cảnh con
        for (const child of xxzczxc.children) {
            if (child instanceof PIXI.Container) {
                count += countScenes(child);
            }
        }

        return count;
    }


    function ClickNguoiChoi() {
        // get X, Y
        let x = this.x;
        let y = this.y;
        let name = this.name;
        let id = this.id;
        let skin = this.skin;
        console.log(x, y, name)
        setting.mouse = this.id;
        console.log(this)
    }

    container.resolution = 2;

    container.scale.set(1); // Đặt tỷ lệ scale của sprite

    let screen = new PIXI.Container();

    setInterval(() => {
        //  box_Chat();
    }, 1000);




    // ! ##################################THÊM CÁC SỰ KIỆN################################################

    inGame.addChild(container); // gọi phần chứa contrainer
    screen.addChild(inGame); /// Nhân vật/ map / in game
    inGame.addChild(postionChar, showFPS)

    screen.addChild(loadGame); /// Nhân vật/ map / in game


    // ? ##################################KẾT THÚC SỰ KIỆN################################################




    app.stage.addChild(screen)


    let dem = 0;
    app.ticker.add(() => {

        speed = +$("#speed").val();

        if(move != null) 
        {
            // hide add
            $("#add").hide();
            $("#edit").show();

            if($("#edit_ii").val() != bando.children.indexOf(move))
            {
                $("#edit_ii").val(bando.children.indexOf(move));

                $("#edit_i").val(bando.children.indexOf(move));
                $("#edit_x").val(move.x);
                $("#edit_y").val(move.y);
                $("#edit_type").val(move.type);
                $("#edit_name").val(move.src);
                $("#edit_width").val(move.width);
                $("#edit_height").val(move.height);
                $("#edit_scale").val(move.scale.x);
            }




        }
        else 
        {
            // show add 
            $("#edit").hide();
            $("#add").show();
        }

        // xử lý bản đồ
        let lastBauTroi = 0;
        let lastNuiXaNua = 0;
        let lastNuiXa = 0;

        const customSort = (a, b) => {
            const order = ['block','bautroi', 'nuixanua', 'nuixa', 'nuida'];
            const indexA = order.indexOf(a.type);
            const indexB = order.indexOf(b.type);
          
            // Nếu cả a.type và b.type không thuộc trong order, giữ nguyên vị trí
            if (indexA === -1 && indexB === -1) {
              return 0;
            }
          
            // Nếu chỉ a.type không thuộc trong order, đưa a.type xuống dưới b.type
            if (indexA === -1) {
              return 1;
            }
          
            // Nếu chỉ b.type không thuộc trong order, đưa b.type xuống dưới a.type
            if (indexB === -1) {
              return -1;
            }
          
            // Cả a.type và b.type đều thuộc trong order, sắp xếp theo thứ tự của order
            return indexA - indexB;
          };
          
          bando.children.sort(customSort);


        for(var i = 0; i < bando.children.length; i++)
        {


            // kiểm tra thuộc tính;
            let element = bando.children[i];

            /*
            if(element.type == "bautroi" && element.edited == undefined)  
            {
                let get  =  bando.children.indexOf(element); 
                let gan = element;
                gan.edited = true;
                bando.children.splice(get, 1);
                bando.children.splice(0, 0, gan);
            }
            else 
            {
                if(element.type == "bautroi" && element.edited == true)  
                {
                    lastBauTroi = i;
                }
            }

            if(element.type == "nuixanua" && element.edited == undefined)
            {
                let get  =  bando.children.indexOf(element); 
                let gan = element;
                gan.edited = true;
                bando.children.splice(get, 1);
                bando.children.splice(lastBauTroi, 0, gan);
            }
            else
            {
                if(element.type == "nuixanua" && element.edited == true)
                {
                    lastNuiXaNua = i;
                }
            }

            if(element.type == "nuixa" && element.edited == undefined)
            {
                let get  =  bando.children.indexOf(element);
                let gan = element;
                gan.edited = true;
                bando.children.splice(get, 1);
                bando.children.splice(lastNuiXaNua, 0, gan);
            }
            else
            {
                if(element.type == "nuixa" && element.edited == true)
                {
                    lastNuiXa = i;
                }
            }

            if(element.type == "nuida" && element.edited == undefined)
            {
                let get  =  bando.children.indexOf(element);
                let gan = element;
                gan.edited = true;
                bando.children.splice(get, 1);
                bando.children.splice(lastNuiXa, 0, gan);
            }
            else
            {
                
            }

            */







            // show, hide 
            if(!setting_map[element.type].show && element.visible == true){
                element.visible = false;
            }
            else 
            {
                if(setting_map[element.type].show && element.visible == false){
                    element.visible = true;
                }
            }
            
            let luoi = element.getChildByName("baoquanh");
            if(luoi) 
            {
                if(!setting_map[element.type].luoi && luoi.visible == true){
                luoi.visible = false;
            }
            else 
            {
                if(setting_map[element.type].luoi && luoi.visible == false){
                    luoi.visible = true;
                }
            }
            }
        };



        showFPS.text = `FPS: ${Math.round(app.ticker.FPS)} - Spr: ${countScenes(container)}   `;

        nhanVatX_set = NhanVat.x * container.scale.x;
        nhanVatY_set = NhanVat.y * container.scale.y;
        nhanVatY_set += -60;

        if (setting_map.default) {
            container.x = app.renderer.width / 2 - nhanVatX_set;
            container.y = app.renderer.height / 2 - nhanVatY_set;

        }


    });




}