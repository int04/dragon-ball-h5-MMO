import xinvaoPTView from './xinvaoView.js';



export default class previewMenberBT_ extends xinvaoPTView {
    constructor() {
        super();
    }

    coverTime = (timeasteamp) => {
        // cover to h-m-s day-month-year
        let date = new Date(timeasteamp);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();

        return hour + ':' + minute + ':' + second + ' ' + day + '/' + month + '/' + year;


    }

    previewMenberOffcial = (data,menber) => {
        let heightKhung = 0;
        let itemPos = data.getBounds();

        
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


        /* Điền dữ liệu ở đây */

        let nhanVat = this.createSprite(menber.skin.ao,menber.skin.quan,menber.skin.dau);
        nhanVat.x = boxBackground.mwidth * 0.05;
        nhanVat.y = boxBackground.mheight * 0.05;
        boxBackground.addChild(nhanVat);
        heightKhung += nhanVat.height + nhanVat.y;


        // name left of boxBackground
        let name = this.html(`<font color="532905" style="align:right;">`+menber.name+`</font>`);
        name.x =  boxBackground.mwidth - name.width - boxBackground.mwidth * 0.05;
        name.y = boxBackground.mheight * 0.05;
        boxBackground.addChild(name);
        heightKhung += name.height;

        let chucVu;
        if(menber.right == 2) chucVu = this.html(`<font color="red">`+'Bang chủ'+`</font>`);
        else if(menber.right == 1) chucVu = this.html(`<font color="green">`+'Phó bang'+`</font>`);
        else chucVu = this.html(`<font color="black">`+'Thành viên'+`</font>`);
        
        chucVu.x =  boxBackground.mwidth - chucVu.width - boxBackground.mwidth * 0.05;
        chucVu.y = name.y + name.height;
        boxBackground.addChild(chucVu);
        heightKhung += chucVu.height;

        let sucManh = this.html(`<font color="637dfe">`+'Sức mạnh: '+this.intToM(menber.sucmanh)+`</font>`);
        sucManh.x =  boxBackground.mwidth - sucManh.width - boxBackground.mwidth * 0.05;
        sucManh.y = chucVu.y + chucVu.height;
        boxBackground.addChild(sucManh);
        heightKhung += sucManh.height;

        let div = new PIXI.Graphics();
        div.beginFill(0x000000, 0.5);
        div.drawRect(0, 0, boxBackground.mwidth * 0.8, 1);
        div.endFill();
        div.y =  nhanVat.height + nhanVat.height * 0.1;
        div.x = boxBackground.mwidth/2 - div.width/2;
        boxBackground.addChild(div);
        heightKhung += div.height;


        let choDau = this.html(`<font color="83c629">`+'Cho đậu: '+menber.chodau+`</font>`);
        choDau.x =  boxBackground.mwidth/2 - choDau.width/2;
        choDau.y = div.y + div.height + 10;
        boxBackground.addChild(choDau);
        heightKhung += choDau.height + 10;

        let nhanDau = this.html(`<font color="83c629">`+'Nhận đậu: '+menber.nhandau+`</font>`);
        nhanDau.x =  boxBackground.mwidth/2 - nhanDau.width/2;
        nhanDau.y = choDau.y + choDau.height;
        boxBackground.addChild(nhanDau);

        let dateJoin = this.html(`<font color="black">`+'Ngày gia nhập: '+this.coverTime(menber.time)+`</font>`);
        dateJoin.x =  boxBackground.mwidth/2 - dateJoin.width/2;
        dateJoin.y = nhanDau.y + nhanDau.height;
        boxBackground.addChild(dateJoin);




        /* Kết thúc */

    

        boxBackground.mwidth = boxBackground.mwidth < width ? width : boxBackground.mwidth;
        heightKhung = heightKhung < height ? height : heightKhung;
        boxBackground.clear();
        boxBackground.lineStyle(1, 0x000000, 1);
        boxBackground.beginFill(0xffffff, 1);
        boxBackground.drawRoundedRect(0, 0, boxBackground.mwidth, heightKhung, 10);
        boxBackground.endFill();


        // create button use item height = 30% of boxBackground, width = 30% of boxBackground use Graphics

        let useContainer = new PIXI.Container();
        this.boxPreviewItem.addChild(useContainer);


        let listButton = [
            {name : 'Phong phó', function : 'banghoiphongphoAction', 'right' : 1, 'rightLow' : 0},
            {name : 'Hạ chức', function : 'PT_Ha_Chuc_Action', 'right' : 2, 'rightLow' : 1},
            {name : 'Đuổi', function : 'PT_Kick_action', 'right' : 1, 'rightLow' : 1},
            {name : 'Nhường', function : 'PT_Nhuong_Bang', 'right' : 2, 'rightLow' : 1},
            {name : 'Đóng', 'right' : 0, 'rightLow' : 3}
        ];

        let space = 3;
        let x = 0;

        let myright = this.banghoi.menber.find(e => e.id == this.my.id);
        if(myright) {
            myright = myright.right;
        }
        else 
        {
            myright = 0;
        }
        let self = this;

        listButton.forEach((element,i) => {
            if(myright >= element.right && menber.right <= element.rightLow && (this.my.id != menber.id || element.name == 'Đóng')) {
                /**
                 * @desc: quyền hiện tại phải lớn hơn hoặc bằng quyền button, và quyền hiện tại của menber phải thấp hơn điều kiện
                 */
                let but = new PIXI.Graphics();
                but.name = "since04";
                but.lineStyle(1, 0x000000, 1);
                but.beginFill(0xd68f32, 1);
                but.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
                but.endFill();
                but.interactive = true;
                let text = this.html(`<font color="532905">`+element.name+`</font>`);
                text.x = (but.getBounds().width - text.width) / 2;
                text.y = (but.getBounds().height - text.height) / 2;
                but.addChild(text);
                but.x = x;
                x += but.getBounds().width + space;
                useContainer.addChild(but);

                console.log('have')

                but.on('pointerdown', () => {
                    if(element.function) {
                        this[element.function](menber);
                    }
                    this.boxPreviewItem.removeChildren();
                }
                );

                but.on('pointerover', () => {

                    but.clear();
                    but.lineStyle(1, 0x000000, 1);
                    but.beginFill(0x49be62, 1);
                    but.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
                    but.endFill();
                }
                );

                but.on('pointerout', () => {

                    but.clear();
                    but.lineStyle(1, 0x000000, 1);
                    but.beginFill(0xd68f32, 1);
                    but.drawRoundedRect(0, 0, boxBackground.mwidth * 0.2, boxBackground.mwidth * 0.2, 10);
                    but.endFill();
                }
                );

            }
        });





        boxBackground.y = itemPos.y - boxBackground.getBounds().height + itemPos.height;

        if(boxBackground.y + boxBackground.getBounds().height + useContainer.getBounds().height > this.gameHeight) {
            boxBackground.y = this.gameHeight - boxBackground.getBounds().height - 10 - useContainer.getBounds().height;
        }

        if(boxBackground.y < 0) {
            boxBackground.y = 10;
        }


        useContainer.x = (boxBackground.getBounds().width - useContainer.getBounds().width) / 2;
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
                self.boxPreviewItem.removeChildren();

            } else if(event === 'ArrowDown') {
                self.boxPreviewItem.removeChildren();

            }

            if(event === 'Enter') {
                let current = children[point];
                let event = self.getAllInteractiveChildren(current);
                if(event.length > 0) {
                    event[0].emit('pointerdown');
                    event[0].emit('pointerup');
                    this.boxPreviewItem.removeChildren();
                }
            }

            if(children[point] && self.pcKey.length >= 1) {
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
                let eventclick = self.getAllInteractiveChildren(current);

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