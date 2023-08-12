import menberPTGuestView from './menberGuestView.js';

export default class ptWhereWho extends menberPTGuestView {
    constructor() {
        super();
    }
    /**
     * @module ptWhereWho
     * @desc : Chưa vào bang hội
     */


    indexNoJoinPT = () => {
        if(this.banghoi.random.length <=0) 
        {
            this.to(-33,{
                type : 'random',
                name : '',
            })
        }
        this.closeBox();
        let background = this.boxBaseBackground();
        this.box.addChild(background);

        //! HEAD
        let head = this.boxBaseHead(background);

        let avatar = this.snowlyImg(this.my.info.coban.avatar);
        avatar.width = head.width * 0.25;
        avatar.height = (head.height * 0.99) > avatar.width ? avatar.width : head.height * 0.99;
        avatar.x = head.width * 0.01;
        avatar.y = head.height * 0.99 - avatar.height;
        head.addChild(avatar);
        let info = new PIXI.Container();

        let gameInfo = this.snowlyText('Chưa vào bang', 18, 'Arial', 0xFFFFFF, false, head.width, head.height);
        info.addChild(gameInfo);

        info.x = avatar.x + avatar.width + avatar.width * 0.05;
        info.y = head.height / 2 - info.height / 2;
        head.addChild(info);

        //! menu
        let menu = this.boxBaseMenu(head, 'banghoi', this.profileMenu);



        //! body
        let body = this.boxBaseBody(background, head, menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body, background);


        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = this.my;

        let menuBox = [{name : 'Tìm bang', function : 'boxFindPT'}, {name : 'Tạo bang', function : 'createPTViewBox'}];

        let box1 = new PIXI.Container();
        hienthinoidung.addChild(box1);
        menuBox.forEach((element,i) => {
            let container = new PIXI.Container();
            container.name ='since04KEY';
            let width = slotwidth * 0.25;
            let space = 10;
            let background = new PIXI.Graphics();
            background.beginFill(0xeeebe6, 1);
            background.drawRect(0, 0, width, slotheight);
            background.endFill();
            container.addChild(background);
            background.x = width * i + space * i;
            let txt = this.html(`<font color="555555">`+element.name+`</font>`);
            txt.x = background.width / 2 - txt.width / 2;
            txt.y = slotheight / 2 - txt.height / 2;
            background.addChild(txt);

            box1.addChild(container);
            container.interactive = true;
            container.on('pointerdown', () => {
                this[element.function]();
            });
        });

        box1.x = slotwidth / 2 - box1.width/2;


        let div1 = new PIXI.Graphics();
        div1.beginFill(0x000000, 0.3);
        div1.drawRect(0, 0, slotwidth, 1);
        div1.endFill();
        div1.y = slotheight + slotheight * 0.1;
        hienthinoidung.addChild(div1);

        let box2 = new PIXI.Graphics();
        box2.beginFill(0xe6ded1, 1);
        box2.drawRect(0, 0, slotwidth, slotheight);
        box2.endFill();
        box2.y = div1.y + div1.height + slotheight * 0.1;
        hienthinoidung.addChild(box2);

        let txt = this.html(`<font color="532905">`+'Danh sách bang'+`</font>`);
        txt.x = box2.width / 2 - txt.width / 2;
        txt.y = slotheight / 2 - txt.height / 2;
        box2.addChild(txt);
        box2.interactive = true;
        box2.on('pointerdown', () => {
            this.to(-33,{
                type : 'random',
                name : '',
            })
        });

        this.banghoi.random.forEach((element,i) => {


            let background = new PIXI.Graphics();
            background.beginFill(0xeeebe6, 1);
            background.drawRect(0, 0, slotwidth, slotheight);
            background.endFill();
            background.y = box2.y + box2.height + slotheight * i + slotheight * 0.1 * i;

            let back30 = new PIXI.Graphics();
            back30.beginFill(0x977b55, 1);
            back30.drawRect(0, 0, slotwidth*0.15, background.height*0.99);
            back30.endFill();
            background.addChild(back30);

            let iconID = this.base_co.find(e => e.id == element.info.icon);
            if(iconID) 
            {
                let icon = this.snowlyImg(iconID.src[0]);
                icon.width = back30.width * 0.9;
                icon.height = icon.width;
                icon.x = back30.width / 2 - icon.width / 2;
                icon.y = back30.height / 2 - icon.height / 2;
                back30.addChild(icon);
            }

            let name = this.html(`<font color="005325">`+element.name+`</font>`);
            name.x = back30.x + back30.width + back30.width * 0.05;
            name.y = background.height*0.2;
            background.addChild(name);

            let desc = this.html(`<font color="0080fe">`+element.info.desc+`</font>`);
            desc.x = back30.x + back30.width + back30.width * 0.05;
            desc.y = background.height - desc.height - background.height*0.2;
            background.addChild(desc);

            background.interactive = true;
            let time = 0;
            background.on('pointerdown', () => {
                time =  Date.now();
            });
            background.on('pointerup', () => {
                let time2 =  Date.now();
                if(time2 - time < 200) return this.previewPT(background,element.id);  
            });
            background.name = 'since04KEY';

            hienthinoidung.addChild(background);

        });





        // end

        let sc = this.snowlySroll(body, hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head, background);
        background.addChild(head, menu, foot);
    }
}