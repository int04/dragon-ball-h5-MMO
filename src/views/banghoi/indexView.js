import chatViewPT from './chatView.js';



export default class PtIndexView extends chatViewPT {
    constructor() {
        super();
        this.banghoi = {
            name: '',
            info : {},
            menber : [],
            random : [],
            tinnhan : 0,
        };
    }
    /**
     * @desc : Đã vào bang hội
     */

    timeAgo = (timesteamp) => {
        // a second ago...
        let time = Date.now() - timesteamp;
        let second = Math.floor(time / 1000);
        if(second < 60) return second + ' giây trước';
        // a minute ago...
        let minute = Math.floor(second / 60);
        if(minute < 60) return minute + ' phút trước';
        // a hour ago...
        let hour = Math.floor(minute / 60);
        if(hour < 24) return hour + ' giờ trước';
        // a day ago...
        let day = Math.floor(hour / 24);
        if(day < 30) return day + ' ngày trước';
        // a month ago...
        let month = Math.floor(day / 30);
        if(month < 12) return month + ' tháng trước';
        // a year ago...
        let year = Math.floor(month / 12);
        return year + ' năm trước';

    }


    boxNewBangHoi = () => {
        let my = this.my;
        this.banghoi.tinnhan = 0;
        if(my.skin.bangID <=0) return this.indexNoJoinPT();


        this.closeBox();
        let background = this.boxBaseBackground();
        background.name = 'banghoi_open';
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

        let gameInfo = this.snowlyText(this.banghoi.name, 18, 'Arial', 0xFFFFFF, false, head.width, head.height);
        info.addChild(gameInfo);


        let sucmanh = this.snowlyText('Thành tích: ' + this.intToM(this.banghoi.info.sucmanh) , 15, 'Arial', 0xfefe00, false, head.width, head.height);
        sucmanh.y = gameInfo.height;
        info.addChild(sucmanh);

        let level = this.snowlyText('Cấp độ: ' + this.banghoi.info.level , 15, 'Arial', 0xfefe00, false, head.width, head.height);
        level.y = gameInfo.height + sucmanh.height;
        info.addChild(level);

        let desc = this.snowlyText('Thành viên: ' + this.banghoi.menber.length+'/'+this.banghoi.info.max , 15, 'Arial', 0xfefe00, false, head.width, head.height);
        desc.y = gameInfo.height + sucmanh.height + level.height;
        info.addChild(desc);



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

        let menuBox = [{name : "Chat\nBang", function : 'oepnChatPTView'}, {name : 'Thành\nviên'+(this.banghoi.xinvao.length >=1 ? '('+this.banghoi.xinvao.length+')' : ''), function : 'boxPTMenber'}];

        let box1 = new PIXI.Container();
        hienthinoidung.addChild(box1);
        menuBox.forEach((element,i) => {
            let container = new PIXI.Container();
            container.name ='since04KEY';
            let width = slotwidth * 0.25;
            let space = 1;
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

        let txt = this.html(`<font color="532905">`+'Tin nhắn'+`</font>`);
        txt.x = box2.width / 2 - txt.width / 2;
        txt.y = slotheight / 2 - txt.height / 2;
        box2.addChild(txt);

        // sort DESC time
        this.banghoi.chat.sort((a,b) => {
            return b.time - a.time;
        });

        this.banghoi.chat.forEach((element,i) => {


            let background = new PIXI.Graphics();
            background.beginFill(0xeeebe6, 1);
            background.drawRect(0, 0, slotwidth * 0.98, slotheight);
            background.endFill();
            background.y = box2.y + box2.height + slotheight * i + slotheight * 0.1 * i;

            let color = 'black';
            let menber = this.banghoi.menber.find(e => e.id == element.uid);
            if(menber) {
                if(menber.right == 2) color = 'red';
                if(menber.right == 1) color = 'green';
            }

            let name = this.html(`<font color="`+color+`" style="font-size:16px">`+element.name+`</font>`);
            name.x = background.width * 0.01;
            name.y = slotheight * 0.1;
            background.addChild(name);

            let timeago = this.html(`<font color="black" style="font-size:14px">`+this.timeAgo(element.time)+`</font>`);
            timeago.x = background.width - timeago.width - background.width * 0.01;
            timeago.y = slotheight * 0.1 ;
            background.addChild(timeago);

            let removeHtml = element.text.replace(/(<([^>]+)>)/ig,"");

            let text = this.html(`<font color="black" style="font-size:14px">`+removeHtml+`</font>`);
           
            text.x = background.width * 0.01;
            text.y = name.y + name.height + slotheight * 0.1;
            background.addChild(text);


            background.interactive = true;
            let time = 0;
            background.on('pointerdown', () => {
                time =  Date.now();
            });
            background.on('pointerup', () => {
                let time2 =  Date.now();
                if(time2 - time < 200) return this.previewPTChat(background,element);  
            });
            background.name = 'since04KEY';

            background.x = slotwidth / 2 - background.width / 2;
            hienthinoidung.addChild(background);

        });





        // end

        let sc = this.snowlySroll(body, hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head, background);
        background.addChild(head, menu, foot);
    }
}