import settingView from "../settingView.js";

export default class resposiveRuongView extends settingView {
    constructor() {
        super();
        this.dangmoruong = false;
    }
    chonRuong = (id) => {
        if(!this.dangmoruong ) return;
    }



    getContentBox = () => {
        let box = this.box.getChildByName('Lớp BOX');
        if(!box) return false;
        let content = box.getChildByName('lớp body');
        if(!content) return false;

        let data = content.getChildByName('data');
        if(!data) return false;
        let body = data.getChildByName('body');
        if(!body) return false;
        return body;
    }

    

    startOpenRuong = (id) => {

        let my = this.my.ruong.item.find(e => e.item == id && e.active == 'hanhtrang');
        if(!my) return this.chipi('Bạn đã hết rương này rồi.');
        if(my.soluong <=0) return this.chipi('Bạn đã hết rương này rồi.');

        let item = this.item.find(e => e.id == id);
        if(!item) return this.chipi('Không thể mở rương này.');

        if(item.type != 'ruong') return this.chipi('Không thể mở rương này.!');




        let body = this.getContentBox();
        if(!body) return this.chipi('Có lỗi xẩy ra, vui lòng thử lại.');

        let button = body.getChildByName('ButonOpenRuong');
        button.visible = false;

        let soluong = 0;
        let i = 0;

        let count = 0;
        for(let iditem in item.list) 
        {
            let item2 = this.item.find(e => e.id == iditem);
            if(!item2) continue;
            // ẩn các object
            
            setTimeout(() => {
                let ob = body.getChildByName('item_' + i);

                let avatar = ob.getChildByName('avatar_' + i);
                avatar.texture = this.coverImg(item.avatar);
                let _75 = ob.getChildByName('descInfo_' + i);
                let name = _75.getChildByName('name_' + i);
                name.text = '????';
                let desc = _75.getChildByName('desc_' + i);
                desc.text = 'Chạm để mở rương';
                let tile = _75.getChildByName('tile_' + i);
                tile.visible = false;
                i++;
                if(i == count) {
                    this.dangmoruong = true;
                }

            },count*100);
            count++;
        }


        
    }


    xulyRuong = (id, i, kq) => {
        /**
         * @desc: id => id vp
         * @desc: i => vị trí người dùng chọn
         * @desc: kq => vị trí kết quả trong mảng
         */
        let item = this.item.find(e => e.id == id);
        if(!item) return this.chipi('Không thể mở rương này.');
        if(item.type != 'ruong') return this.chipi('Không thể mở rương này.!');

        let mang = [];
        let count = 0;
        let conlai = [];
        for(let iditem in item.list) {
            if(kq != count) conlai.push(iditem);
            item.list[iditem].idvp = iditem;
            mang.push(item.list[iditem]);
            count++;
        }

        // hiển thị kết quả vị trí  của user chọn trước
        let body = this.getContentBox();
        if(!body) return this.chipi('Có lỗi xẩy ra, vui lòng thử lại.');

        let button = body.getChildByName('ButonOpenRuong');
        button.visible = false;

        let getInfo = mang[kq];
        if(!getInfo) return this.chipi('Có lỗi xẩy ra, vui lòng thử lại.');

        let getInfoItem = this.item.find(e => e.id == getInfo.idvp);
        let ob = body.getChildByName('item_' + i);
        ob.idItem =getInfoItem;
        let avatar = ob.getChildByName('avatar_' + i);
        avatar.texture = this.coverImg(getInfoItem.avatar);
        let _75 = ob.getChildByName('descInfo_' + i);


        let name = _75.getChildByName('name_' + i);
        name.text = getInfoItem.name;
        name.style.color = 0x00ff00;
        let desc = _75.getChildByName('desc_' + i);
        let res = '';
        if(getInfo.date == 0) res = 'Vĩnh viễn';
        else res = getInfo.date+' ngày';
        desc.text = res;
        let tile = _75.getChildByName('tile_' + i);
        tile.visible = true;
        tile.text = getInfo.tile+'%';

        let mang2 = [];


        // random swap position conlai array
        for (let j = 0; j < conlai.length; j++) {
            let random = Math.floor(Math.random() * conlai.length);
            let temp = conlai[j];
            conlai[j] = conlai[random];
            conlai[random] = temp;
        }
        console.log(conlai)



        // random lại vị trí 

        let vitriconlai = [];
        for (let j = 0; j < mang.length; j++) {
            if(j != i) vitriconlai.push(j);
        }
        let dem2 = 0;
        
        setTimeout(() => {
            for (let j = 0; j < vitriconlai.length; j++) {
                let ob = body.getChildByName('item_' + vitriconlai[j]);
                let _75 = ob.getChildByName('descInfo_' + vitriconlai[j]);
                let name = _75.getChildByName('name_' + vitriconlai[j]);
                name.text = 'Đang mở...';
                setTimeout(() => {
    
    
                    let idvp = conlai[dem2];
                    let trochoiVP = item.list[idvp];
                    let itemVP = this.item.find(e => e.id == idvp);
    
                    let ob = body.getChildByName('item_' + vitriconlai[dem2]);
                    ob.idItem =itemVP;
                    let avatar = ob.getChildByName('avatar_' + vitriconlai[dem2]);
                    avatar.texture = this.coverImg(itemVP.avatar);
                    let _75 = ob.getChildByName('descInfo_' + vitriconlai[dem2]);
                    let name = _75.getChildByName('name_' + vitriconlai[dem2]);
                    name.text = itemVP.name;
                    name.style.color = 0x1c643a;
                    let desc = _75.getChildByName('desc_' + vitriconlai[dem2]);
                    let res = '';
                    if(trochoiVP.date == 0) res = 'Vĩnh viễn';
                    else res = trochoiVP.date+' ngày';
                    desc.text = res;
                    let tile = _75.getChildByName('tile_' + vitriconlai[dem2]);
                    tile.visible = true;
                    tile.text = trochoiVP.tile+'%';
    
                    dem2++;
                    if(dem2 == vitriconlai.length) {
                        button.visible = true;
                    }
    
                    
    
                }, j*300);
            }
        }, 500);



    }

    openBoxRuong = (i, id) => {
        let my = this.my.ruong.item.find(e => e.item == id && e.active == 'hanhtrang');
        if(!my) return this.chipi('Bạn đã hết rương này rồi.');
        if(my.soluong <=0) return this.chipi('Bạn đã hết rương này rồi.');

        let otrong = this.my.ruong.item.filter(e => e.active == 'hanhtrang');
        let slot = this.my.ruong.slot;
        let con = slot - otrong.length;
        if(con <= 0) return this.chipi('Hành trang của bạn đã đầy.');

        this.dangmoruong = false;

        this.await();
        this.to(-34,{
            id : id,
            i : i,
        });
        // gửi data lên server.
    }

    thoigiancon = (time) => {
        let tg = time - Date.now();
        if(tg <= 0) return 'Đã hết hạn';
        let phut = Math.floor(tg / 60000);
        if(phut <= 60) return phut+' phút';
        let gio = Math.floor(phut / 60);
        if(gio <= 24) return gio+' giờ';
        let ngay = Math.floor(gio / 24);
        return ngay+' ngày';

    }
}