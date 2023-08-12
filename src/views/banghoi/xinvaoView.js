import previewBoxPTShow from './preview.js';

export default class xinvaoPTView extends previewBoxPTShow {
    constructor() {
        super();
    }

    boxPTMenberXin = () => {
        let my = this.my;
        if(my.skin.bangID <=0) return this.indexNoJoinPT();


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

        let menuBox = [{name : "Chat\nBang", function : 'boxNewBangHoi'}, {name : 'Thành\nviên', function : 'boxPTMenber'}, {name : 'Xin vào'+(this.banghoi.xinvao.length >=1 ? '('+this.banghoi.xinvao.length+')' : ''), function : 'boxPTMenberXin'}];

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

        let txt = this.html(`<font color="532905">`+'Danh sách xin vào'+`</font>`);
        txt.x = box2.width / 2 - txt.width / 2;
        txt.y = slotheight / 2 - txt.height / 2;
        box2.addChild(txt);

        let bang = this.banghoi;
        // sort DESC time
        this.banghoi.xinvao.sort((a,b) => {
            return b.time - a.time;
        });

        bang.xinvao.forEach((element,i) => {


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

            if(element.avatar) 
            {
                let icon = this.snowlyImg(element.avatar);
                icon.width = back30.width * 0.9;
                icon.height = icon.width;
                icon.x = back30.width / 2 - icon.width / 2;
                icon.y = back30.height / 2 - icon.height / 2;
                back30.addChild(icon);
            }

            let name = this.html(`<font color="back">`+element.name+` (`+this.timeAgo(element.time)+`) </font>`);
            name.x = back30.x + back30.width + back30.width * 0.05;
            name.y = background.height*0.2;
            background.addChild(name);

            let desc = this.html(`<font color="0080fe">Sức mạnh: `+this.intToM(element.sucmanh)+`</font>`);
            desc.x = back30.x + back30.width + back30.width * 0.05;
            desc.y = background.height - desc.height - background.height*0.1;
            background.addChild(desc);


            let buttonRight_dontagree = new PIXI.Graphics();
            buttonRight_dontagree.beginFill(0xe54610, 1);
            buttonRight_dontagree.drawRect(0, 0, slotwidth*0.15, background.height*0.90);
            buttonRight_dontagree.endFill();
            buttonRight_dontagree.x = background.width - buttonRight_dontagree.width;
            background.addChild(buttonRight_dontagree);

            let txt_dontagree = this.html(`<font color="ffffff">`+'Huỷ'+`</font>`);
            txt_dontagree.x = buttonRight_dontagree.width / 2 - txt_dontagree.width / 2;
            txt_dontagree.y = buttonRight_dontagree.height / 2 - txt_dontagree.height / 2;
            buttonRight_dontagree.addChild(txt_dontagree);

            let buttonRight_agree = new PIXI.Graphics();
            buttonRight_agree.beginFill(0xb8e9b1, 1);
            buttonRight_agree.drawRect(0, 0, slotwidth*0.15, background.height*0.90);
            buttonRight_agree.endFill();
            buttonRight_agree.x = background.width - buttonRight_agree.width * 2;
            background.addChild(buttonRight_agree);

            let txt_agree = this.html(`<font color="ffffff">`+'OK'+`</font>`);
            txt_agree.x = buttonRight_agree.width / 2 - txt_agree.width / 2;
            txt_agree.y = buttonRight_agree.height / 2 - txt_agree.height / 2;
            buttonRight_agree.addChild(txt_agree);


            hienthinoidung.addChild(background);

            buttonRight_dontagree.interactive = true;
            let time = 0;
            buttonRight_dontagree.on('pointerdown', () => {
                time = Date.now();
            });
            buttonRight_dontagree.on('pointerup', () => {
                if(Date.now() - time < 200) {
                    this.boxPTMenberXinDontAgree(element.uid);
                }
            });

            buttonRight_agree.interactive = true;
            buttonRight_agree.on('pointerdown', () => {
                time = Date.now();
            }
            );
            buttonRight_agree.on('pointerup', () => {
                if(Date.now() - time < 200) {
                    this.boxPTMenberXinAgree(element.uid);
                }
            }
            );


        });





        // end

        let sc = this.snowlySroll(body, hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head, background);
        background.addChild(head, menu, foot);
    }

    boxPTMenberXinDontAgree = (id) => {
        this.to(-33,{
            type : 'duyet',
            id : id,
            agree : false,
        })
        this.await();
    }

    boxPTMenberXinAgree = (id) => {
        console.log(id)
        this.to(-33,{
            type : 'duyet',
            id : id,
            agree : true,
        })
        this.await();
    }

    outBangHoi = (id) => {
        let checkRight = this.banghoi.menber.find(e => e.id == this.my.id);
        if(!checkRight) return this.indexNoJoinPT();
        if(checkRight.right >=2) return this.chipi("Chủ bang không thể rời bang hội");
        

        this.ptMsgBox('Bạn có muốn rời khỏi bang hội này không ?', () => {
            this.to(-33, {
                type: 'out',
            });
            this.await();
        });
    }

    banghoiphongphoAction = (id) => {
        let checkRight = this.banghoi.menber.find(e => e.id == this.my.id);
        if(!checkRight) return this.indexNoJoinPT();
        if(checkRight.right < 1) return this.chipi("Bạn không có quyền thay đổi phòng phó");

        if(id.right >=2) return this.chipi("Bạn không thể phong cho chủ bang");

        this.to(-33,{
            type : 'phongpho',
            id : id.id,
        })
        this.await();

    }

    PT_Ha_Chuc_Action = (id) => {
        let checkRight = this.banghoi.menber.find(e => e.id == this.my.id);
        if(!checkRight) return this.indexNoJoinPT();
        if(checkRight.right < 2) return this.chipi("Bạn không có quyền hạ chức");

        if(id.right >=2) return this.chipi("Bạn không thể hạ chức chủ bang");

        if(id.right == 0) return this.chipi("Người này đã là thành viên rồi");

        this.to(-33,{
            type : 'hachuc',
            id : id.id,
        })
        this.await();

    }

    PT_Nhuong_Bang = (id) => {
        let checkRight = this.banghoi.menber.find(e => e.id == this.my.id);
        if(!checkRight) return this.indexNoJoinPT();
        if(checkRight.right < 2) return this.chipi("Bạn không có quyền nhường bang");

        if(id.right >=2) return this.chipi("Bạn không thể nhường cho chủ bang");


        

        this.ptMsgBox('Bạn có chắc muốn nhường bang chủ cho người này không ?', () => {
            this.to(-33,{
                type : 'nhuongbang',
                id : id.id,
            })
            this.await();
        });
    }

    PT_Kick_action = (id) => {
        let checkRight = this.banghoi.menber.find(e => e.id == this.my.id);
        if(!checkRight) return this.indexNoJoinPT();
        if(checkRight.right < 1) return this.chipi("Bạn không có quyền kick");
        if(checkRight.right <= id.right) return this.chipi("Bạn không có quyền kick người này");
        if(id.id == this.my.id) return this.chipi("Bạn không thể kick chính mình");

        

        this.ptMsgBox('Bạn có chắc chắn muốn đuổi '+id.name+' ra khỏi bang không ?', () => {
            this.to(-33,{
                type : 'kick',
                id : id.id,
            })
            this.await();
        });
    }

    PT_Moi_Vao_Bang = (id) => {
        let checkRight = this.banghoi.menber.find(e => e.id == this.my.id);
        if(!checkRight) return this.indexNoJoinPT();
        if(checkRight.right < 1) return this.chipi("Bạn không có quyền mời");

        if(this.banghoi.menber.length >= this.banghoi.info.max) return this.chipi("Bang hội đã đủ thành viên");

        let player = this.Charset.find(e => e.id == id);
        if(!player) return this.chipi("Người chơi đã rời khỏi bản đồ rồi");

        if(player.skin.bangID > 0) return this.chipi("Người chơi đã có bang hội rồi");

        this.to(-33,{
            type : 'moi',
            id : id,
            action : 'send',
        });
    }

    PT_Loi_Moi_Vao_bang = (name,bang) => {


        this.ptMsgBox(''+name+' muốn mời bạn vào bang ?',
        () => {
            this.to(-33,{
                type : 'moi',
                bang : bang,
                action : 'accept',
            })
            this.await();
        },

        () => {
            this.to(-33,{
                type : 'moi',
                bang : bang,
                action : 'not_accept',
            })
            this.await();
        }
        
        );

    }

}