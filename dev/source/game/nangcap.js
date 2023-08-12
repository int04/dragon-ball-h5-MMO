
import snowlyvnGiaoDichaction from "../game/giaodich.js";
/**
 * @author : snowlyvn
 * @team : snowlyvn's team
 * @packge : snowlyvnNangCapAction
 */

export default class snowlyvnNangCapAction extends snowlyvnGiaoDichaction {
    constructor() {
        super();
    }

    noticeNangCap = () => {
        let dsvp = this.danhSachItem;
        if(!dsvp) return;

        let idtb = null;
        let idtbtype = null;
        let idvp = null;
        let idvptype = null;
        let datatb = null;
        let infotb = null;

        for(let i = 0; i < dsvp.length; i++)
        {
            let element = dsvp[i];
            let infoItem = this.item.find(e => e.id == element.item);
            if(!infoItem) {
                return this.notice(this._('Có lỗi xẩy ra.'));
            }
            if(infoItem.type == 'trangbi') 
            {
                if(idtb == null)
                {
                    idtb = element.id;
                    idtbtype = infoItem.type2;
                    datatb = element;
                    infotb = infoItem;
                }
                else 
                {
                    return this.notice(this._('Chỉ nâng cấp được 1 trang bị một lần.'));
                }
            }

            if(infoItem.type == 'item')
            {
                if(idvp == null)
                {
                    idvp = element.id;
                    idvptype = infoItem.type3;
                }
                else 
                {
                    return this.notice(this._('Chỉ chọn loại đá phù hợp với trang bị thôi..'));
                }
            }
        }
        if(idtb == null) return this.notice(this._('Bạn chưa chọn trang bị để nâng cấp.'));
        if(idvp == null) return this.notice(this._('Bạn chưa chọn đá để nâng cấp.'));
        if(idvptype != idtbtype) return this.notice(this._('Loại đá không phù hợp để có thể nâng cấp.'));

        if(datatb.level && datatb.level >=7) return this.notice(this._('Trang bị đã đạt cấp tối đa.'));
    
        this.to(-24, {
            _1 : '1',
            _2 : idtb,
            _3 : idvp,
        })
        this.notice(this._('Xin chờ...'));

    }

    CuongHoaXemTruoc = (hienthinoidung) => {
        /* hiển thị ra menu */
        let dsvp = this.danhSachItem;
        if(!dsvp) return;

        let idtb = null;
        let idtbtype = null;
        let idvp = null;
        let idvptype = null;
        let datatb = null;
        let infotb = null;

        for(let i = 0; i < dsvp.length; i++)
        {
            let element = dsvp[i];
            let infoItem = this.item.find(e => e.id == element.item);
            if(!infoItem) {
                return hienthinoidung;
            }
            if(infoItem.type == 'trangbi') 
            {
                if(idtb == null)
                {
                    idtb = element.id;
                    idtbtype = infoItem.type2;
                    datatb = element;
                    infotb = infoItem;
                }
                else 
                {
                    return hienthinoidung;

                }
            }

            if(infoItem.type == 'item')
            {
                if(idvp == null)
                {
                    idvp = element.id;
                    idvptype = infoItem.type3;
                }
                else 
                {
                    return hienthinoidung;

                }
            }
        }
        if(idtb == null) return hienthinoidung;
        if(idvp == null) return hienthinoidung;
        if(idvptype != idtbtype) return hienthinoidung;

        if(datatb.level && datatb.level >=7) return hienthinoidung;

        let tile = {
            "ao" : [90,80,70,50,30,10,5],
            "quan" : [95,80,72,61,33,10,3],
            "gang" : [70,50,40,20,15,2,1],
            "giay" : [99,90,80,50,30,10,5], 
            "rada" : [70,60,50,40,30,20,10],
        };
        let thuoctinh = {
            "ao" : [10,12,13,14,15,16,17],
            "quan" : [10,15,20,25,30,35,40],
            "gang" : [5,10,15,18,20,33,35],
            "giay" : [10,12,13,14,15,16,17],
            "rada" : [5,5,5,5,5,5,5],
        };
        let itemcan = {
            "ao" : [10,20,35,42,51,60,78],
            "quan" : [15,30,50,65,75,85,90],
            "gang" : [10,20,30,40,50,60,70],
            "giay" : [10,20,35,42,51,60,78],
            "rada" : [10,20,35,42,51,60,78],
        }
        let vangcan = {
            "ao" : [10000,60000,150000,356000,925000,1250000,2104000],
            "quan" : [10000,60000,150000,356000,925000,1250000,2104000],
            "gang" : [20000,90000,550000,1356000,1925000,31250000,41250000],
            "giay" : [10000,60000,150000,256000,725000,1250000,2104000],
            "rada" : [10000,60000,150000,356000,925000,1250000,2104000],
        }



        let containerText = new PIXI.Container();

        let y = 0;
        let txtName = new PIXI.Text(infotb.name + "["+datatb.level+"] => ["+(datatb.level+1)+"] ", {fontFamily : 'Arial', fontSize: 20, fill : 0x637dfe, align : 'center'});
        txtName.style.fontWeight = 'bold';
        containerText.addChild(txtName);

        
        for(let t in infotb.info)
        {
            let chiso = infotb.info;
            if (chiso[t] == 0) continue;
            let txt = "";

            let thuoctinhmoi = 0;
            thuoctinhmoi = Math.ceil(datatb.info[t] + datatb.info[t]/100*thuoctinh[idtbtype][datatb.level]);
            
            txt = this.itemTypeName[t].name + "" + (datatb.info[t] > 0 ? '+' : '-') + "" + datatb.info[t]+ " => " + thuoctinhmoi;
            

            let txtr = new PIXI.Text(txt, {fontFamily : 'Arial', fontSize: 16, fill : 0x532905, align : 'center'});
            txtr.style.fontWeight = 'bold';
            txtr.y = y + txtName.height;
            containerText.addChild(txtr);
            y += txtr.height;
        }

        let tilethanhcong = new PIXI.Text(this._('Tỉ lệ thành công: ') + tile[idtbtype][datatb.level] + "%", {fontFamily : 'Arial', fontSize: 16, fill : 0x637dfe, align : 'center'});
        tilethanhcong.style.fontWeight = 'bold';
        tilethanhcong.y = y + txtName.height;
        containerText.addChild(tilethanhcong);

        let txtItemCan = new PIXI.Text(this._('Số lượng đá cần: ') + itemcan[idtbtype][datatb.level], {fontFamily : 'Arial', fontSize: 16, fill : 0xfe0000, align : 'center'});
        txtItemCan.style.fontWeight = 'bold';
        txtItemCan.y = y + txtName.height + tilethanhcong.height;
        containerText.addChild(txtItemCan);

        let txtVangCan = new PIXI.Text(this._('Số lượng vàng cần: ') + vangcan[idtbtype][datatb.level], {fontFamily : 'Arial', fontSize: 16, fill : 0x00cb00, align : 'center'});
        txtVangCan.style.fontWeight = 'bold';
        txtVangCan.y = y + txtName.height + tilethanhcong.height + txtItemCan.height;
        containerText.addChild(txtVangCan);

        containerText.y = hienthinoidung.y + hienthinoidung.height;
        containerText.x = hienthinoidung.width/2 - containerText.width/2;


        hienthinoidung.themmoi = containerText.height;
        hienthinoidung.addChild(containerText);

        return hienthinoidung;

    }


    noticeDucLo = () => {
        let dsvp = this.danhSachItem;
        if(!dsvp) return;

        let idtb = null;
        let idtbtype = null;
        let datatb = null;
        let infotb = null;

        for(let i = 0; i < dsvp.length; i++)
        {
            let element = dsvp[i];
            let infoItem = this.item.find(e => e.id == element.item);
            if(!infoItem) {
                return this.notice(this._('Có lỗi xẩy ra.'));;
            }
            if(infoItem.type == 'trangbi') 
            {
                if(idtb == null)
                {
                    idtb = element.id;
                    idtbtype = infoItem.type2;
                    datatb = element;
                    infotb = infoItem;
                }
                else 
                {
                    return this.notice(this._('Chỉ có thể đục lỗ 1 trang bị một lần.'));

                }
            }
 
        }
        if(idtb == null) return this.notice(this._('Không có vật phẩm nào được chọn.'));

        
        let sao = datatb.sao; 
        sao = typeof sao == 'object' ? sao : [0,0,0,0,0,0,0];


        let daco = 0;

        sao.forEach(element => {
            if(element != 0) daco++;
        });
        if(daco >=7) return this.notice(this._('Trang bị đã có tối đa lỗ.'));

        this.to(-24, {
            _1 : '2',
            _2 : idtb,
        })
    }


    DucLoXemTruoc = (hienthinoidung) => {
        /* hiển thị ra menu */
        let dsvp = this.danhSachItem;
        if(!dsvp) return;

        let idtb = null;
        let idtbtype = null;
        let datatb = null;
        let infotb = null;

        for(let i = 0; i < dsvp.length; i++)
        {
            let element = dsvp[i];
            let infoItem = this.item.find(e => e.id == element.item);
            if(!infoItem) {
                return hienthinoidung;
            }
            if(infoItem.type == 'trangbi') 
            {
                if(idtb == null)
                {
                    idtb = element.id;
                    idtbtype = infoItem.type2;
                    datatb = element;
                    infotb = infoItem;
                }
                else 
                {
                    return hienthinoidung;

                }
            }
 
        }
        if(idtb == null) return hienthinoidung;

        
        let sao = datatb.sao; 
        sao = typeof sao == 'object' ? sao : [0,0,0,0,0,0,0];


        let daco = 0;

        sao.forEach(element => {
            if(element != 0) daco++;
        });



        let containerText = new PIXI.Container();

        let y = 0;
        let txtName = new PIXI.Text(infotb.name + "["+datatb.level+"]  ", {fontFamily : 'Arial', fontSize: 20, fill : 0x637dfe, align : 'center'});
        txtName.style.fontWeight = 'bold';
        containerText.addChild(txtName);

        let txtSao = new PIXI.Text(this._('Số sao hiện tại: ') + daco + (daco >=7 ?" (tối đa)" :""), {fontFamily : 'Arial', fontSize: 16, fill : 0xfe0000, align : 'center'});
        txtSao.style.fontWeight = 'bold';
        txtSao.y = y + txtName.height;
        containerText.addChild(txtSao);

        let vangcan = [5,10,20,40,80,90,120];
        let tile = [50,40,30,20,10,5,2];

        if(daco <7)
        {
            let txtmota = new PIXI.Text(this._('Để lên: ') + (daco+1)+" sao cần:", {fontFamily : 'Arial', fontSize: 16, fill : 0x532905, align : 'center'});
            txtmota.style.fontWeight = 'bold';
            txtmota.y = y + txtName.height + txtSao.height;
            containerText.addChild(txtmota);

            let txtVangCan = new PIXI.Text(this._('Vàng cần: ') + this.number_format(vangcan[daco]*1000000), {fontFamily : 'Arial', fontSize: 16, fill : 0x00cb00, align : 'center'});
            txtVangCan.style.fontWeight = 'bold';
            txtVangCan.y = y + txtName.height + txtSao.height + txtmota.height;

            containerText.addChild(txtVangCan);

            let txtTile = new PIXI.Text(this._('Tỉ lệ thành công: ') + tile[daco] + "%", {fontFamily : 'Arial', fontSize: 16, fill : 0xfe0000, align : 'center'});
            txtTile.style.fontWeight = 'bold';
            txtTile.y = y + txtName.height + txtSao.height + txtmota.height + txtVangCan.height;
            containerText.addChild(txtTile);

        }
        
       

     

        containerText.y = hienthinoidung.y + hienthinoidung.height;
        containerText.x = hienthinoidung.width/2 - containerText.width/2;


        hienthinoidung.themmoi = containerText.height;
        hienthinoidung.addChild(containerText);

        return hienthinoidung;

    }

    noticeEpSao = () => {
        let list = this.danhSachItem;
        let trangbi = null;
        let phale = null;

        for(let i = 0; i < list.length; i++)
        {
            let element = list[i];
            let infoItem = this.item.find(e => e.id == element.item);
            if(infoItem.type == 'trangbi') 
            {
                if(trangbi == null) trangbi = element;
                else return this.notice(this._('Chỉ có thể ép sao cho 1 trang bị một lần.'));
            }
            if(infoItem.type == 'item')
            {
                if(phale == null) phale = element;
                else return this.notice(this._('Chỉ được chọn 1 sao pha lê một lần.'));
            }
        }
        if(!trangbi || !phale) return this.notice(this._('Hãy chọn món đồ và sao pha lê để nâng cấp.'));

        let infoPhaLe = this.item.find(e => e.id == phale.item);
        let infoTrangBi = this.item.find(e => e.id == trangbi.item);
        if(infoPhaLe.thuoctinh && infoPhaLe.value*1 >= 0) {
            trangbi.sao = typeof trangbi.sao == 'object' ? trangbi.sao : [0,0,0,0,0,0,0];
            if(trangbi.sao.filter(e => e == -1).length <=0) return this.notice(this._('Trang bị không còn lỗ trống để ép.'));
            if(this.my.zeni < 10) return this.notice(this._('Không đủ ngọc xanh để thực hiện.'));
            this.to(-24, {
                _1 : 3,
                _2 : trangbi.id,
                _3 : phale.id,
            })


        }
        else 
        {
            return this.notice(this._('Sao pha lê không có thuộc tính.'));
        }
    }

    epSaoPhaLeXemTruoc = (hienthinoidung) => {

        let list = this.danhSachItem;
        let trangbi = null;
        let phale = null;

        for(let i = 0; i < list.length; i++)
        {
            let element = list[i];
            let infoItem = this.item.find(e => e.id == element.item);
            if(infoItem.type == 'trangbi') 
            {
                if(trangbi == null) trangbi = element;
                else return hienthinoidung;
            }
            if(infoItem.type == 'item')
            {
                if(phale == null) phale = element;
                else return hienthinoidung;
            }
        }
        if(!trangbi || !phale) return hienthinoidung;

        let infoPhaLe = this.item.find(e => e.id == phale.item);
        let infoTrangBi = this.item.find(e => e.id == trangbi.item);
        if(infoPhaLe.thuoctinh && infoPhaLe.value*1 >= 0) 
        {

            let containerText = new PIXI.Container();
            let y = 0;
            trangbi.sao = typeof trangbi.sao == 'object' ? trangbi.sao : [0,0,0,0,0,0,0];
            let txtName = new PIXI.Text(infoTrangBi.name + "["+trangbi.level+"]  ", {fontFamily : 'Arial', fontSize: 20, fill : 0x637dfe, align : 'center'});
            txtName.style.fontWeight = 'bold';
            containerText.addChild(txtName);

            let txtSaoHave = new PIXI.Text( trangbi.sao.filter(e => e != -0).length+ " "+this._("Sao")+"" , {fontFamily : 'Arial', fontSize: 16, fill : 0xfe0000, align : 'center'});
            txtSaoHave.style.fontWeight = 'bold';
            txtSaoHave.y = y + txtName.height;
            containerText.addChild(txtSaoHave);

            let txtSaoTrong = new PIXI.Text(  this._("Số sao có thể ép: ")+ (trangbi.sao.filter(e => e == -1).length) + "" , {fontFamily : 'Arial', fontSize: 16, fill : 0x00cb00, align : 'center'});
            txtSaoTrong.style.fontWeight = 'bold';
            txtSaoTrong.y = y + txtName.height + txtSaoHave.height;
            containerText.addChild(txtSaoTrong);

            let txtmota = new PIXI.Text(this._('Thuộc tính sau ép: '), {fontFamily : 'Arial', fontSize: 16, fill : 0x532905, align : 'center'});
            txtmota.style.fontWeight = 'bold';
            txtmota.y = y + txtName.height + txtSaoHave.height + txtSaoTrong.height;
            containerText.addChild(txtmota);

            let now = trangbi.info[infoPhaLe.thuoctinh] || 0;

            let txtThuocTinh = new PIXI.Text(this.itemTypeName[infoPhaLe.thuoctinh].name + " " + now+  " => " + (now+infoPhaLe.value*1), {fontFamily : 'Arial', fontSize: 16, fill : 0xfe0000, align : 'center'});
            txtThuocTinh.style.fontWeight = 'bold';
            txtThuocTinh.y = y + txtName.height + txtSaoHave.height + txtSaoTrong.height + txtmota.height;
            containerText.addChild(txtThuocTinh);

            let canvang = new PIXI.Text(this._('Cần 10 ngọc xanh.'), {fontFamily : 'Arial', fontSize: 16, fill : 0x8d1d24, align : 'center'});
            canvang.style.fontWeight = 'bold';
            canvang.y = y + txtName.height + txtSaoHave.height + txtSaoTrong.height + txtmota.height + txtThuocTinh.height;
            containerText.addChild(canvang);


            



            containerText.y = hienthinoidung.y + hienthinoidung.height;
            containerText.x = hienthinoidung.width/2 - containerText.width/2;
            hienthinoidung.themmoi = containerText.height;
            hienthinoidung.addChild(containerText);
        }

         


        return hienthinoidung;
    }

    nangCapXemtruoc = (hienthinoidung) => {
        if(this.luaChonNangCap == 0) return this.CuongHoaXemTruoc(hienthinoidung);
        if(this.luaChonNangCap == 1) return this.DucLoXemTruoc(hienthinoidung);
        if(this.luaChonNangCap == 2) return this.epSaoPhaLeXemTruoc(hienthinoidung);
    }

    sanLocNangCap = () => {
        if(this.luaChonNangCap == 0) this.noticeNangCap();
        if(this.luaChonNangCap == 1) this.noticeDucLo();
        if(this.luaChonNangCap == 2) this.noticeEpSao();
    }
}