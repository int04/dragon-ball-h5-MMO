import snowlyvnThemeDoIkhu from "./boxDoiKhu.js";

class snowlyvnBoxDeTu extends snowlyvnThemeDoIkhu {    
    constructor() {
        super();
        this.profileDetu = [
            {name : "Đệ tử", onclick : 'detu'},
            {name : "Trạng thái", onclick : 'trangthai'},
        ];
    }
    coverTrangThai = (name) => {
        let txt = '';
        (name == 'baove') && (txt = 'Bảo vệ');
        (name == 'ditheo') && (txt = 'Đi theo');
        (name == 'venha') && (txt = 'Về nhà');
        (name == 'tancong') && (txt = 'Tấn công');
        return txt;
    }

    detuSatus = () => {

        if(!this.my.detu  || !this.my.detu.id) return this.closeBox();
        this.closeBox();
        let background = this.boxBaseBackground();
        this.box.addChild(background);
        
        let detu = this.my.detu;

        //! HEAD
        let head = this.boxBaseHead(background);

        let avatar = this.snowlyImg(detu.info.coban.avatar);
        avatar.width = head.width * 0.25;
        avatar.height = (head.height * 0.99) > avatar.width ? avatar.width : head.height * 0.99;
        avatar.x = head.width * 0.01;
        avatar.y = head.height*0.99 - avatar.height;
        head.addChild(avatar);
        let info = new PIXI.Container();
        
        let hp = this.snowlyText('HP: ' + this.number_format(detu.info.chiso.hp)+'/'+ this.number_format(detu.info.chiso.hpFull), 16,'fontchinh', 0xFFFFFF,false,head.width,head.height);
        info.addChild(hp);

        let ki = this.snowlyText('KI: ' + this.number_format(detu.info.chiso.ki)+'/'+ this.number_format(detu.info.chiso.kiFull), 16,'fontchinh', 0xFFFFFF,false,head.width,head.height);
        ki.y = hp.y + hp.height;
        info.addChild(ki);
        
        let chimang = this.snowlyText('Chí mạng: ' + this.number_format(detu.info.chiso.chimang)+' Giáp:'+(detu.info.chiso.giap) , 16,'fontchinh', 0xFFFF00,false,head.width,head.height);
        chimang.y = ki.y + ki.height;
        info.addChild(chimang);
        
        let trangthai = this.snowlyText('Trạng thái: ' + this.coverTrangThai(detu.info.trangthai), 16,'fontchinh', 0xFFFFFF,false,head.width,head.height);
        trangthai.y = chimang.y + chimang.height;
        info.addChild(trangthai);


        head.addChild(info);
        info.x = avatar.x + avatar.width  + avatar.width * 0.05;
        info.y =  head.height/2 - info.height/2;

        //! menu
        let menu = this.boxBaseMenu(head,'trangthai',this.profileDetu);
        


        //! body
        let body = this.boxBaseBody(background,head,menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body,background);


        //let show = new PIXI.Container();
        //hienthinoidung.addChild(show);

        let list = [{name : 'Đi theo', act : 'di theo'}, {name : 'Bảo vệ', act : 'bao ve'}, {name : 'Tấn công', act : 'tan cong'}, {name : 'Về nhà', act : 've nha'}];

        list.forEach((element,i) => {
            let bg = this.snowlyGraphics(body.width,body.height * 0.1,0xe6ded1,0xd9c8b3,1);
            hienthinoidung.addChild(bg);
            bg.y = i * bg.height;
            let txt = this.snowlyText(element.name, 16,'fontchinh', 0x532905,false,bg.width,bg.height);
            bg.addChild(txt);
            txt.x = bg.width/2 - txt.width/2;
            txt.y = bg.height/2 - txt.height/2;
            bg.interactive = true;
            bg.cursor = 'pointer';
            bg.name = "since04KEY";

            bg.on('pointerdown', () => {
                this.send(-8, element.act);
                this.closeBox();
            });
        });

        
       

        // end
     
        let sc = this.snowlySroll(body,hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head,background);
        background.addChild(head,menu,foot);
         
    }

    detuBoxInfo = () => {
        if(!this.my.detu  || !this.my.detu.id) return this.closeBox();
        this.closeBox();
        let background = this.boxBaseBackground();
        this.box.addChild(background);
        
        let detu = this.my.detu;

        //! HEAD
        let head = this.boxBaseHead(background);

        let avatar = this.snowlyImg(detu.info.coban.avatar);
        avatar.width = head.width * 0.25;
        avatar.height = (head.height * 0.99) > avatar.width ? avatar.width : head.height * 0.99;
        avatar.x = head.width * 0.01;
        avatar.y = head.height*0.99 - avatar.height;
        head.addChild(avatar);
        let info = new PIXI.Container();
        
        let sucmanh = this.snowlyText('Sức mạnh: ' + this.number_format(detu.info.coban.sucmanh), 16,'fontchinh', 0xFFFF00,false,head.width,head.height);
        info.addChild(sucmanh);
        let danh = this.snowlyText(this.danhHieu(detu.info.coban.sucmanh), 16,'fontchinh', 0xFFFF00,false,head.width,head.height);
        info.addChild(danh);
        danh.y = sucmanh.y + sucmanh.height;

        let sucdanh = this.snowlyText('Sức đánh: ' + this.number_format(detu.info.chiso.sucdanh), 16,'fontchinh', 0xFFFF00,false,head.width,head.height);
        info.addChild(sucdanh);
        sucdanh.y = danh.y + danh.height;

        let suckhoe = this.snowlyText('Sức khỏe: ' + (detu.info.chiso.suckhoe / detu.info.chiso.suckhoe_max * 100) + '%', 16,'fontchinh', 0xFFFF00,false,head.width,head.height);
        info.addChild(suckhoe);
        suckhoe.y = sucdanh.y + sucdanh.height;
        
        head.addChild(info);
        info.x = avatar.x + avatar.width  + avatar.width * 0.05;
        info.y =  head.height/2 - info.height/2;

        //! menu
        let menu = this.boxBaseMenu(head,'detu',this.profileDetu);
        


        //! body
        let body = this.boxBaseBody(background,head,menu);
        background.addChild(body);

        let hienthinoidung = this.boxBaseMask(body,background);


        // body
        let self = this;
        let clickItem = (listItem) => {
            listItem.interactive = true;
            listItem.cursor = 'pointer';
            let pointerStartTime = 0;
            let pointerEndTime = 0;

            listItem.on("pointerdown", function (event) {
                pointerStartTime = Date.now();
            });

            listItem.on("pointerup", function (event) {
                pointerEndTime = Date.now();
                if (pointerEndTime - pointerStartTime < 300) {
                    self.open_PreviewItem(listItem);
                } 
            });
        }

        let slotwidth = body.width;
        let slotheight = head.width * 0.15;
        slotheight = slotheight > 50 ? 50 : slotheight;
        let my = detu;

        let oTrangBi = 6;

        let fewUse = ['ao', 'quan', 'gang', 'giay', 'rada', 'caitrang']; // thông tin các món trang bị
        let fewY = 0;
        for (let i = 0; i < oTrangBi; i++) {
            let listItem = new PIXI.Container();
            listItem.name = "since04KEY";


            hienthinoidung.addChild(listItem);

            listItem.maxWight = slotwidth;
            listItem.maxHeight = slotheight;
            listItem.width = listItem.maxWight;
            listItem.height = listItem.maxHeight;

            listItem.x = 0;
            listItem.y = slotheight * i + 0;



            let ItemBG = new PIXI.Graphics();

            ItemBG.lineStyle(1, 0xd9c8b3, 1);
            ItemBG.beginFill(0x000000, 0.5);
            ItemBG.drawRoundedRect(0, 0, listItem.maxWight, listItem.maxHeight, 0);
            ItemBG.endFill();

            let BgBolderAvatar = new PIXI.Graphics();
            BgBolderAvatar.lineStyle(1, 0xd9c8b3, 1);
            BgBolderAvatar.beginFill(0x977b55, 1);
            BgBolderAvatar.drawRoundedRect(0, 0, listItem.maxWight * 0.2, listItem.maxHeight, 0);
            BgBolderAvatar.endFill();
            BgBolderAvatar.x = 0;
            BgBolderAvatar.y = 0;

 
            let BgBolderInfo = new PIXI.Graphics();
            BgBolderInfo.lineStyle(1, 0xd9c8b3, 1);
            BgBolderInfo.beginFill(0xe6ded1, 1);
            BgBolderInfo.drawRoundedRect(BgBolderAvatar.x + BgBolderAvatar.getBounds().width, 0, listItem.maxWight * 0.8, listItem.maxHeight, 0);
            BgBolderInfo.endFill();



            if (my.trangbi[fewUse[i]] && my.trangbi[fewUse[i]] != 0) {
                let id = my.trangbi[fewUse[i]];
                let inBag = this.findBag(id);
                if (inBag) {
                    let inItem = this.findItem(inBag.item);
                    if (inItem) {
                        let showImgItem = new PIXI.Sprite(this.coverImg(inItem.avatar));
                        showImgItem.width = BgBolderAvatar.width * 0.35;
                        showImgItem.height = BgBolderAvatar.height * 0.35;
                        showImgItem.x = (BgBolderAvatar.width - showImgItem.width) / 2;
                        showImgItem.y = (BgBolderAvatar.height - showImgItem.height) / 2;
                        BgBolderAvatar.addChild(showImgItem);

                        
                        let showInfoItem = this.snowlyText(inItem.name, 16,'fontchinh', 0x005325,false,BgBolderInfo.width,BgBolderInfo.height);
                        showInfoItem.resolution = 2;
                        showInfoItem.x = BgBolderInfo.getBounds().x + BgBolderInfo.getBounds().width * 0.04;
                        showInfoItem.height = BgBolderInfo.height * 0.38;
                        showInfoItem.y = 0 + BgBolderInfo.height * 0.1;

                        let showDesItem = this.snowlyText(inItem.mota, 14,'fontchinh', 0x0683fd,false,BgBolderInfo.width,BgBolderInfo.height);
                        showDesItem.resolution = 2;
                        showDesItem.x = BgBolderInfo.getBounds().x + BgBolderInfo.getBounds().width * 0.04;
                        showDesItem.height = BgBolderInfo.height * 0.38;
                        showDesItem.y = showInfoItem.y + showInfoItem.height;

                        BgBolderInfo.addChild(showInfoItem, showDesItem);
                        BgBolderInfo.item = inBag.id;




                    }
                }
            }




            ItemBG.addChild(BgBolderAvatar, BgBolderInfo);




            listItem.addChild(ItemBG);

            listItem.item = BgBolderInfo.item;

            clickItem(BgBolderInfo)



        }

        // show skill of detu

        let inskill = [0,150000000,150000000,4000000000];
        let iShow = oTrangBi - 0;
        inskill.forEach((element,i) => {

            let skillContainer = new PIXI.Container();
            skillContainer.name = "since04KEY";

            hienthinoidung.addChild(skillContainer);
            skillContainer.x = 0;
            skillContainer.y = iShow * slotheight +5;
            let skillBackground = this.snowlyGraphics(slotwidth, slotheight, 0xd9c8b3, 0xd9c8b3, 0.5,1);
            skillContainer.addChild(skillBackground);

            let skillTab20 = this.snowlyGraphics(slotwidth * 0.15, slotheight, 0xd9c8b3, 0xff9410, 0.5,1);
            skillBackground.addChild(skillTab20);

            let haveskill = detu.skill[i] != undefined ? true : false;
            let infoSkill;
            if(haveskill) {
                infoSkill = this.usedSkill(detu.skill[i].id);
                if(!infoSkill) haveskill = false;
            }

            if(haveskill) 
            {
                let skillIcon = this.snowlyImg(infoSkill.avatar);
                skillIcon.width = skillTab20.getBounds().width * 0.90;
                skillIcon.height = skillTab20.getBounds().height * 0.90;
                skillIcon.x = (skillTab20.getBounds().width - skillIcon.width) / 2;
                skillIcon.y = (skillTab20.getBounds().height - skillIcon.height) / 2;
                skillTab20.addChild(skillIcon);
            }
            else 
            {
                let skillIcon = this.snowlyImg(5223);
                skillIcon.width = skillTab20.getBounds().width * 0.90;
                skillIcon.height = skillTab20.getBounds().height * 0.90;
                skillIcon.x = (skillTab20.getBounds().width - skillIcon.width) / 2;
                skillIcon.y = (skillTab20.getBounds().height - skillIcon.height) / 2;
                skillTab20.addChild(skillIcon);

            }

            let SkillTab85 = new PIXI.Graphics();
            SkillTab85.lineStyle(1, 0xe6ded1, 1);
            SkillTab85.beginFill(0xe6ded1, 0.5);
            SkillTab85.drawRoundedRect(slotwidth * 0.17, 0, slotwidth * 0.83, slotheight, 0);
            SkillTab85.endFill();
            skillBackground.addChild(SkillTab85);

            let txtNameSkill = 'xin chào';
            if(haveskill) txtNameSkill = infoSkill.name;
            else txtNameSkill = 'Cần '+this.number_format(element)+' sức mạnh. ';

            let skillName = new PIXI.Text(txtNameSkill, {
                fontSize: 14,
                fill: 0x637dfe,
                fontFamily: 'fontchinh',
                
                wordWrap: true,
                wordWrapWidth: SkillTab85.getBounds().width * 0.9,
            });
            skillName.resolution = 2;
            skillName.style.align = 'center';
            skillName.x = SkillTab85.getBounds().x + SkillTab85.getBounds().x / 100 * 10;
            skillName.y = 0;
            SkillTab85.addChild(skillName);

            let mota = 'xxx';
            if(haveskill) mota = 'Cấp độ '+detu.skill[i].level;
            else mota = 'Hãy cùng đệ tử luyện tập để mở kĩ năng này.';

            let skillDes = new PIXI.Text(mota, {
                fontSize: 12,
                fill: 0x005325,
                fontFamily: 'fontchinh',
                
            });

            skillDes.resolution = 2;
            skillDes.style.align = 'center';
            skillDes.x = SkillTab85.getBounds().x + SkillTab85.getBounds().x / 100 * 10;
            skillDes.y = skillName.y + skillName.height + 5;
            SkillTab85.addChild(skillDes);

            iShow++;
        });
       

        // end
     
        let sc = this.snowlySroll(body,hienthinoidung);


        //! foot
        let foot = this.boxBaseFoot(head,background);
        background.addChild(head,menu,foot);
    }

}

export default snowlyvnBoxDeTu;