import snowlyvnIO from './io.js';
class snowlyvnIoEventOnly extends snowlyvnIO {
    constructor() {
        super();
        this.createObjectIO();
    }

    createObjectIO = () => {

        this.ws.on('______', (data) => {
            console.log(data)
            data = this.readData(data);
            this.item = data._.__.___.____;
            this.skill_active = data._.__.___._____;
            this.listMap = data._.__.___.______;
        });

        this.ws.on(-100 , () => {
            let Charset = this.Charset;
            for (let i = 0; i < Charset.length; i++) {
                if (Charset[i].type == 'player' || Charset[i].type == 'mob' ||  Charset[i].type == 'zone')
                    Charset[i].delete = true;
            }
            // remove all Charset Zone
            this.Charset = Charset.filter(e => e.type != 'zone');
            this.Charset = Charset.filter(e => e.type != 'npc');
            this.resetNone();
            this.deleteNotice();
        });


        this.ws.on(6, () => {
            this.deleteNotice();
        });

        this.ws.on(7, () => {
            this.notice(this._('Bạn chưa đủ sức mạnh để sử dụng'));
        });
        
        

        this.ws.on(-999, () => {
            this.notice(this._('Không tìm thấy UID trên server Socket.IO'));
        })

        this.ws.on(-99, () => {
            this.pageLogin();
            this.inGame.visible = false;
            this.notice(this._('Tên tài khoản hoặc mật khẩu chưa chính xác'));
        })

        this.ws.on('-98', () => {
            this.notice(this._('Tài khoản đã được đăng nhập ở nơi khác. Vui lòng đăng nhập lại.'));
        })

        this.ws.on('-97', () => {
            this.notice(this._('Tài khoản chưa tạo nhân vật, vui lòng đăng nhập lại game để tạo.'));
        })

        this.ws.on(-96, () => {
            this.notice(this._('Không đọc được dữ liệu...'));
        });

        this.ws.on(-95, () => {
            this.notice(this._('Không tìm thấy vật phẩm'));
        });
        this.ws.on(-94, () => {
            this.notice(this._('Không tìm thấy ID VP ở CSDL'));
        });

        this.ws.on(-93, () => {
            this.notice(this._('Vật phẩm này không thể vứt.'));
        });
        this.ws.on(-92, () => {
            this.notice(this._('Vật phẩm này đã bị khóa.'));
        });
        this.ws.on(-91, () => {
            this.notice(this._('Vui lòng tháo vật phẩm ra trước.'));
        });


        this.ws.on(-90, () => {
            this.danger(this._('Vật phẩm này của người khác.'));
        });

        this.ws.on(-89, () => {
            this.danger(this._('Hành trang không đủ chỗ trống.'));
        });

        this.ws.on(-86, (data) => {
            data = this.readData(data);
            this.deleteNguoiChoi(data);
        });

        this.ws.on(-85, (data) => {
            data = this.readData(data);
            this.my.ruong = data._1;
        });

        this.ws.on(-87, (data) => {
            data = this.readData(data);
            let infoItem = this.findItem(data._1);
            if(data._2 == 1) this.danger(this._('Bạn nhận được '+infoItem.name+' '));
            else this.danger(this._('Bạn nhận được '+data._2+' '+infoItem.name+' '));
        });

        this.ws.on(-810, () => {
            this.notice(this._('Tên nhân vật từ 4-12 kí tự. Không được có kí tự đặc biệt'));
        });

        this.ws.on(-850, () => {
            this.notice(this._('Vui lòng chọn hành tinh muốn tham gia.'));
        });

        this.ws.on(-840, () => {
            this.notice(this._('Vui lòng chọn nhân vật'));
        });

        this.ws.on(-830, () => {
            this.notice(this._('Tên nhân vật đã tồn tại.'));
        });

        this.ws.on(-820, (data) => {
            data = this.readData(data);
            this.deleteNotice();
            this.setCookie('username',data._1,30);
            this.setCookie('password',data._2,30);
            this.CreatedCookie();
        });

        this.ws.on(-443, (data) => {
            data = this.readData(data);
            this.deleteNotice();
            this.Charset = [];
            this.resetNone();
            this.joinMap(data._1);
            this.my.pos.x = data._2.x;
            this.my.pos.y = data._2.y;
            this.NhanVat.x = data._2.x;
            this.NhanVat.y = data._2.y;
            this.my.pos.map = data._1;
        });

        this.ws.on(-9828, () => {
            this.notice(this._('Không thể đổi khu tại đây.'));
        });

        this.ws.on(-9829, () => {
            this.notice(this._('Khu vực này đã đầy người, vui lòng chọn khu vực khác.'));
        });

        this.ws.on(1111, () => {
            this.notice(this._('Bạn không có đủ tiền để thực hiện'));
        });

        this.ws.on(1211, () => {
            this.notice(this._('Hành trang phải còn đủ ít nhất một chỗ trống để tháo ra.'));
        });

        this.ws.on(1311, () => {
            this.notice(this._('Hành trang không còn chỗ trống.'));
        });

        this.ws.on(1411, () => {
            this.notice(this._('Số lượng vật phẩm này trong hành trang đã đầy. Không thể mua thêm.'));
        });
        this.ws.on(1511, () => {
            this.notice(this._('Hành trang đã có x99 vật phẩm, không thể mua thêm.'));
        });

        this.ws.on(-45320, () => {
            this.notice(this._('Hành tinh của bạn không thể sử dụng vật phẩm này..'));
        });

        this.ws.on(-4533, () => {
            this.notice(this._('Bạn chưa đủ sức mạnh để sử dụng'));
        });

        this.ws.on(-4532, () => {
            this.notice(this._('Bạn đã học cấp độ này rồi, hãy mua sách cấp cao hơn để học.'));
        });

        this.ws.on(-4531, () => {
            this.notice(this._('Cấp độ kĩ năng quá cao, bạn cần học kĩ năng cấp thấp trước.'));
        });

        this.ws.on('useskill', (data) => {
            this.my.ruong = data._1;
            this.my.skill = data._2;
            this.deleteNotice();
            this.clickButton('hanhtrang');
            this.notice(this._('Học cấp tốc kĩ năng thành công. Xin chúc mừng bạn.'));
        });


        this.ws.on('tool', (data) => {
            this.my.ruong = data;
            
        });

        this.ws.on('cuonghoa', (data) => {
            this.my.ruong = data.ruong;
            this.my.tien = data.tien;
            this.deleteNotice();
            this.danhSachItem.forEach((element,i) => {
                let myitem = this.my.ruong.item.find(e => e.id == element.id);
                if(myitem) {
                    this.danhSachItem[i] = myitem;
                }
                else 
                {
                    this.danhSachItem = this.danhSachItem.filter(e => e.id != element.id);
                }
            });
            this.closeBox();
            this.ioInsertChat({
                _1 : 'ba', // id npc
                _2 : 'Um ba la xi bum....',
            })
            game.addEff({
                id: 'cangcap',
                type : 'nangcap',
                up : data.success ? true : false, 
                npc : 'ba', 
                idvp : data.idvp,
                da : data.da,
            })
        })


        this.ws.on('duclo', (data) => {
            this.my.ruong = data.ruong;
            this.my.tien = data.tien;
            this.deleteNotice();
            this.danhSachItem.forEach((element,i) => {
                let myitem = this.my.ruong.item.find(e => e.id == element.id);
                if(myitem) {
                    this.danhSachItem[i] = myitem;
                }
                else 
                {
                    this.danhSachItem = this.danhSachItem.filter(e => e.id != element.id);
                }
            });
            this.closeBox();
            this.ioInsertChat({
                _1 : 'ba', // id npc
                _2 : 'Um ba la xi bum....',
            })
            game.addEff({
                id: 'cangcap',
                type : 'nangcap',
                up : data.success ? true : false, 
                npc : 'ba', 
                idvp : data.idvp,
                da : 9176,
            })
        })

        this.ws.on('expsao', (data) => {
            this.my.ruong = data.ruong;
            this.my.tien = data.tien;
            this.deleteNotice();
            this.danhSachItem.forEach((element,i) => {
                let myitem = this.my.ruong.item.find(e => e.id == element.id);
                if(myitem) {
                    this.danhSachItem[i] = myitem;
                }
                else 
                {
                    this.danhSachItem = this.danhSachItem.filter(e => e.id != element.id);
                }
            });
            this.closeBox();
            this.ioInsertChat({
                _1 : 'ba', // id npc
                _2 : 'Um ba la xi bum....',
            })
            game.addEff({
                id: 'cangcap',
                type : 'nangcap',
                up : 1, 
                npc : 'ba', 
                idvp : data.idvp,
                da : data.idphale,
            })
        })

        this.ws.on("moigiaodich", (id) => {
            this.duocmoiGiaoDich(id);
        });

        this.ws.on("chapnhangiaodich", (id) => {
            console.log('Giao dich vs', id)
            this.giaodich = {
                khoa : 0,
                xong : 0,
                vang : 0,
                doiphuong : {
                    id : id,
                    khoa : 0,
                    xong : 0,
                    vang :0,
                    data : [],
                }
            };
            this.danhSachItem = [];
            this.deleteNotice();
            this.boxGiaoDichHanhTrang();
        });

        this.ws.on("khoagiaodichthanhcong", () => {
            this.giaodich.khoa = 1;
            this.deleteNotice();
            this.boxGiaoDichHanhTrang();
        });

        this.ws.on("nhangiaodichkhoa", (data) => {
            this.giaodich.doiphuong.khoa = 1;
            this.giaodich.doiphuong.vang = data.vang;
            this.giaodich.doiphuong.data = data.item; 
            this.boxGiaoDichHanhTrang();
        });

        this.ws.on("daxonggiaodich", () => {
            this.giaodich.xong = 1;
            this.deleteNotice();
            this.closeBox();
            this.danger("Xác nhận giao dịch thành công, vui lòng chờ đối phương đồng ý nhé.");
        });

        this.ws.on("doiphuongdakhoa", () => {
            this.giaodich.doiphuong.xong = 1;
            this.boxGiaoDichHanhTrang();
        });

        this.ws.on("doneGiaoDich", (data) => {
            this.my.ruong = data.ruong;
            this.my.tien = data.tien;
            this.notice(this._('Giao dịch thành công.'));
            this.closeBox();
            this.giaodich.doiphuong = {
                id : 0,
                khoa : 0,
                xong : 0,
                vang :0,
                data : [],
            }
        });

        this.ws.on("loigiaodich", () => {
            this.closeBox();
            this.giaodich.doiphuong.id = 0;
            this.notice(this._('Giao dịch bị hủy.'));


        });

        this.ws.on("huygiaodichkhongonline", () => {
            this.closeBox();
            this.notice(this._('Đối phương không online.'));
            this.giaodich.doiphuong.id = 0;
        });
        this.ws.on("huygiaodichthanhcong", () => {
            this.closeBox();
            this.giaodich.doiphuong = {
                id : 0,
                khoa : 0,
                xong : 0,
                vang :0,
                data : [],
            }
        });
        this.ws.on("doiphuonghuygiaodich", () => {
            this.closeBox();
            this.giaodich.doiphuong = {
                id : 0,
                khoa : 0,
                xong : 0,
                vang :0,
                data : [],
            }
            this.notice(this._('Đối phương đã hủy giao dịch'));
        });

        this.ws.on("catdothanhcong", (data) => {
            this.my.ruong = data._1; 
            this.openRuongDo(0);
            this.deleteNotice();
        });

        this.ws.on("closebox", () => {
            this.closeBox();

        });

        this.ws.on("tancongmob", (id) => {
            let mob = this.Charset.find(e => e.id == id);
            if(mob) 
            {
                mob.info.act = 'attack';
               
            }
        });

    };
}

export default snowlyvnIoEventOnly;