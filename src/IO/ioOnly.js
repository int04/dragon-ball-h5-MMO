import ioMethod from './method.js';
class ioOnly extends ioMethod {
    constructor() {
        super();
    }

    createObjectIO = () => {

        this.ws.on('______', (data) => {
            data = this.readData(data);
            this.item = data._.__.___.____;
            this.skill_active = data._.__.___._____;
            this.listMap = data._.__.___.______;
            this.logNhiemVu = data._.__.___._______;
            this.base_co = data._.__.___.________;
            this.data_choang = data._.__.___._________;
        });

        this.ws.on(-100, () => {
            let Charset = this.Charset;
            
            // remove all Charset Zone
            

            this.Charset.forEach((element,i) => {
                if(element.type == 'zone') 
                {
                    this.Charset.splice(i,1);
                    this.deleteNguoiChoi(element.id);
                }
            });
            for(let i = 0; i < Charset.length; i++) {
                if(Charset[i].type == 'player' || Charset[i].type == 'mob' || Charset[i].type == 'zone')
                    Charset[i].delete = true;
            }
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

        this.ws.on("nhatvang", (data) => {
            this.my.tien.vang+= data *1;
            this.chipi("Bạn nhận được " + this.number_format(data) + " vàng");
        });

        this.ws.on("nhatngoc", (data) => {
            this.my.tien.zeni+= data *1;
        });

        this.ws.on(-85, (data) => {
            data = this.readData(data);
            this.my.ruong = data._1;
        });

        this.ws.on(-87, (data) => {
            data = this.readData(data);
            let infoItem = this.findItem(data._1);
            if(data._2 == 1) this.chipi(this._('Bạn nhận được ' + infoItem.name + ' '));
            else this.chipi(this._('Bạn nhận được ' + data._2 + ' ' + infoItem.name + ' '));
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
            this.setCookie('username', data._1, 30);
            this.setCookie('password', data._2, 30);
            this.CreatedCookie();
            this.logInGame();
        });

        this.ws.on("nextMap", (data) => {
            this.nextMap = {
                map : data.map,
                zone : data.zone,
                x : data.x,
                y : data.y,
            }
        });

        this.ws.on("phithuyenroixuong", (id) => {
            game.addEff({
                type : 'phithuyen',
                uid : id,
            })
        });

        this.ws.on("phithuyenhacanh", (id) => {
            game.addEff({
                type : 'phithuyenxuong',
                uid : id,
            })
        });

        this.ws.on(-27604, () => {
            this.my.info.chiso.hp = 1;
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
            this.NhanVatGoc.x = data._2.x;
            this.NhanVatGoc.y = data._2.y;
            this.my.pos.map = data._1;
        });

        this.ws.on(-9828, () => {
            this.chipi(this._('Không thể đổi khu tại đây.'));
        });

        this.ws.on(-9829, () => {
            this.notice(this._('Khu vực này đã đầy người, vui lòng chọn khu vực khác.'));
        });

        this.ws.on(1111, () => {
            this.chipi(this._('Bạn không có đủ tiền để thực hiện'));
        });

        this.ws.on(1211, () => {
            this.chipi(this._('Hành trang phải còn đủ ít nhất một chỗ trống để tháo ra.'));
        });

        this.ws.on(1311, () => {
            this.chipi(this._('Hành trang không còn chỗ trống.'));
        });

        this.ws.on(1411, () => {
            this.chipi(this._('Số lượng vật phẩm này trong hành trang đã đầy. Không thể mua thêm.'));
        });
        this.ws.on(1511, () => {
            this.chipi(this._('Hành trang đã có x99 vật phẩm, không thể mua thêm.'));
        });

        this.ws.on(-45320, () => {
            this.chipi(this._('Hành tinh của bạn không thể sử dụng vật phẩm này..'));
        });

        this.ws.on(-4533, () => {
            this.chipi(this._('Bạn chưa đủ sức mạnh để sử dụng'));
        });

        this.ws.on(-4532, () => {
            this.chipi(this._('Bạn đã học cấp độ này rồi, hãy mua sách cấp cao hơn để học.'));
        });

        this.ws.on(-4531, () => {
            this.chipi(this._('Cấp độ kĩ năng quá cao, bạn cần học kĩ năng cấp thấp trước.'));
        });

        this.ws.on('useskill', (data) => {
            this.my.ruong = data._1;
            this.my.skill = data._2;
            this.deleteNotice();
            this.clickButton('hanhtrang');
            this.chipi(this._('Học cấp tốc kĩ năng thành công. Xin chúc mừng bạn.'));
        });


        this.ws.on('tool', (data) => {
            this.my.ruong = data;

        });

        this.ws.on('cuonghoa', (data) => {
            this.my.ruong = data.ruong;
            this.my.tien = data.tien;
            this.deleteNotice();
            this.danhSachItem.forEach((element, i) => {
                let myitem = this.my.ruong.item.find(e => e.id == element.id);
                if(myitem) {
                    this.danhSachItem[i] = myitem;
                } else {
                    this.danhSachItem = this.danhSachItem.filter(e => e.id != element.id);
                }
            });
            this.closeBox();
            this.ioInsertChat({
                _1: 'ba', // id npc
                _2: 'Um ba la xi bum....',
            })
            game.addEff({
                id: 'cangcap',
                type: 'nangcap',
                up: data.success ? true : false,
                npc: 'ba',
                idvp: data.idvp,
                da: data.da,
            })
        })


        this.ws.on('duclo', (data) => {
            this.my.ruong = data.ruong;
            this.my.tien = data.tien;
            this.deleteNotice();
            this.danhSachItem.forEach((element, i) => {
                let myitem = this.my.ruong.item.find(e => e.id == element.id);
                if(myitem) {
                    this.danhSachItem[i] = myitem;
                } else {
                    this.danhSachItem = this.danhSachItem.filter(e => e.id != element.id);
                }
            });
            this.closeBox();
            this.ioInsertChat({
                _1: 'ba', // id npc
                _2: 'Um ba la xi bum....',
            })
            game.addEff({
                id: 'cangcap',
                type: 'nangcap',
                up: data.success ? true : false,
                npc: 'ba',
                idvp: data.idvp,
                da: 9176,
            })
        })

        this.ws.on('expsao', (data) => {
            this.my.ruong = data.ruong;
            this.my.tien = data.tien;
            this.deleteNotice();
            this.danhSachItem.forEach((element, i) => {
                let myitem = this.my.ruong.item.find(e => e.id == element.id);
                if(myitem) {
                    this.danhSachItem[i] = myitem;
                } else {
                    this.danhSachItem = this.danhSachItem.filter(e => e.id != element.id);
                }
            });
            this.closeBox();
            this.ioInsertChat({
                _1: 'ba', // id npc
                _2: 'Um ba la xi bum....',
            })
            game.addEff({
                id: 'cangcap',
                type: 'nangcap',
                up: 1,
                npc: 'ba',
                idvp: data.idvp,
                da: data.idphale,
            })
        })

        this.ws.on("moigiaodich", (id) => {
            this.duocmoiGiaoDich(id);
        });

        this.ws.on("chapnhangiaodich", (id) => {
            this.giaodich = {
                khoa: 0,
                xong: 0,
                vang: 0,
                doiphuong: {
                    id: id,
                    khoa: 0,
                    xong: 0,
                    vang: 0,
                    data: [],
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
            this.chipi("Xác nhận giao dịch thành công, vui lòng chờ đối phương đồng ý nhé.");
        });

        this.ws.on("doiphuongdakhoa", () => {
            this.giaodich.doiphuong.xong = 1;
            this.boxGiaoDichHanhTrang();
        });

        this.ws.on("doneGiaoDich", (data) => {
            this.my.ruong = data.ruong;
            this.my.tien = data.tien;
            this.chipi(this._('Giao dịch thành công.'));
            this.closeBox();
            this.giaodich.doiphuong = {
                id: 0,
                khoa: 0,
                xong: 0,
                vang: 0,
                data: [],
            }
        });

        this.ws.on("loigiaodich", () => {
            this.closeBox();
            this.giaodich.doiphuong.id = 0;
            this.chipi(this._('Giao dịch bị hủy.'));


        });

        this.ws.on("huygiaodichkhongonline", () => {
            this.closeBox();
            this.chipi(this._('Đối phương không online.'));
            this.giaodich.doiphuong.id = 0;
        });
        this.ws.on("huygiaodichthanhcong", () => {
            this.closeBox();
            this.giaodich.doiphuong = {
                id: 0,
                khoa: 0,
                xong: 0,
                vang: 0,
                data: [],
            }
        });
        this.ws.on("doiphuonghuygiaodich", () => {
            this.closeBox();
            this.giaodich.doiphuong = {
                id: 0,
                khoa: 0,
                xong: 0,
                vang: 0,
                data: [],
            }
            this.chipi(this._('Đối phương đã hủy giao dịch'));
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
            if(mob) {
                mob.info.act = 'attack';

            }
        });

      

        this.ws.on("nhiemvusuccess", (data) => {
            this.closeBox();
            this.deleteNotice();
            this.my.nhiemvu = data.nhiemvu;
            this.my.ruong = data.ruong;
            this.my.tien = data.tien;
            this.my.info = data.info;
        });


        this.ws.on(-98512103, () => {
            this.closeBox();
            this.deleteNotice();
            this.boxNewKyNang();
        });

        this.ws.on("buff_eff", (id) => {
            this.addEff({
                type: 'chung',
                aim: id,
                src: this.createArray(1, 28),
                folder: 'other/buff',
                width: 250,
                height: 250,
            });
        });

        this.ws.on("updateNgocXanh", (data) => {
            this.my.tien.zeni = data;
        });


        this.ws.on('mobHS',(data)=> {
            let mob = this.getMy(data.id);
            if(!mob) return this.ioGetElementOnMap();

            mob.info = data.info;

            let player = this.getNhanVat(data.id);
            if(!player) return this.ioGetElementOnMap();

            player.checkSieuQuai = 0;

            this.deleteEff('sieuquai' + data.id);

        })

        this.ws.on('tien', (data) => {
            this.my.tien = data;
        });

        this.ws.on('skin', (data) => {
            this.my.skin = data;
            this.NhanVat_phukien.children.filter(e => e.name == 'co').forEach(e => {
                e.destroy();
            });

        });


        this.ws.on("ngaunhienbanghoi", (data) => {
            this.banghoi.random = data;
            this.indexNoJoinPT();
        });

        this.ws.on("banghoi", (data) => {
            this.banghoi.info = data.info;
            this.banghoi.name = data.name;
            this.banghoi.menber = data.menber;
            this.banghoi.chat = data.chat;
            this.banghoi.xinvao = data.xinvao;
        });

        this.ws.on("chatPT", (data) => {
            this.banghoi.chat.push(data);
            if(this.box.getChildByName("banghoi_open") != null) 
            {
                this.boxNewBangHoi();
            }
            else 
            {
                this.banghoi.tinnhan++;
            }
        });

        this.ws.on("lammoibanghoi", () => {
            this.to(-33,{
                type : 'me',
            })
    
        });
        
        this.ws.on("bangxin", (data) => {
            this.banghoi.xinvao = data;
        });

        this.ws.on("openduyetmen", () => {
            this.boxPTMenberXin();
            this.deleteNotice();
        });


        this.ws.on("outbanghoi", () => {
            this.boxNewBangHoi();
            this.deleteNotice();
        });

        this.ws.on("phongphosuccess", () => {
            this.deleteNotice();
            this.boxPTMenber();
        });

        this.ws.on("roisocketbang", (id) => {
            this.to(-33,{
                type : 'leave',
                id : id,
            })
        });

        this.ws.on("moi_jo_PT", (data) => {
            this.PT_Loi_Moi_Vao_bang(data.name,data.bang)
        });

        this.ws.on("gianhapbangsuccess", () => {
            this.chipi("Gia nhập bang hội thành công");
            this.deleteNotice();
        });


        this.ws.on("skin_map", (data) => {
            let my = this.getMy(data.id);
            if(my) {
                if(my.id == this.my.id) {
                    this.deleteNotice();
                }
                my.skin = data.skin;
                this.NhanVat_phukien.children.filter(e => e.name == 'co').forEach(e => {
                    e.destroy();
                });
            }
        });

        this.ws.on("OPEN_RUONG", (data) => {
            let my = this.my; 
            my.ruong  = data.ruong;
            my.tien = data.tien;
            this.deleteNotice();
            return this.xulyRuong(data.id, data.i, data.kq);

        });


        this.ws.on("successLK", (data) => {
            this.my.veri = 1;
            this.deleteNotice();
            this.bodyChat.removeChildren();

            this.my.username = data._1;
            this.setCookie('username', data._1, 30);
            this.setCookie('password', data._2, 30);
            this.CreatedCookie();
        });

        this.ws.on("noChar", () => {
            this.guestContainer.visible = true;
            this.loadGame.visible = false; // màn hình load game// chờ loading map
            this.MenuCreateNewPlayer();
            this.notice("Tài khoản của bạn chưa có nhân vật, vui lòng tạo nhé !");
        });

        this.ws.on("bossMove", (data) => {
            let id = data.id;
            let boss = this.getMy(id);
            if(!boss) return this.ioGetElementOnMap();
            boss.pos.x = data.x;
            boss.pos.y = data.y;
            boss.info.move = data.move;

        });

        this.ws.on("bossEffect", (data) => {
            let id = data.id;
            let boss = this.getMy(id);
            if(!boss) {
                return this.ioGetElementOnMap();
            }
            boss.eff[data.d_eff].active = data.active;
        });

        this.ws.on("bossUpdate", (data) => {
            let id = data.id;
            let boss = this.getMy(id);
            if(!boss) {
                return this.ioGetElementOnMap();
            }
            boss.info.chiso.hp = data.hp;
        });

        this.ws.on("server", (data) => {
            this.logNotice.push(data);
        });

        this.ws.on("error", () => {
            this.chipi("Có lỗi xẩy ra, vui lòng thử lại.");
        });

        this.ws.on("2b", (id,time) => {
            if(this.my.id >=1) 
            {
                let skill = this.my.skill.find(e => e.id == id);
                if(skill) 
                {
                    skill.time = Date.now() + time * 1000;
                    skill.lasttime = Date.now();
                }
            }
        });

        this.ws.on("moipvp", (data) => {
            this.PVPView(data.id, data.vang);
        });

        this.ws.on("test", (data) => {
            console.log('test',data);
        });

        this.ws.on("msg", (data) => {
            this.addEff({
                type: data.type,
                to: data.uid,
                value: 1
            })
        });


        this.ws.on("dis", () => {
            this.Charset = [];
            this.resetNone();
            this.guestContainer.visible = true;
            this.my.id = 0;
            this.CreateMainGuestGame();
            this.deleteNotice();
            this.notice("Tài khoản của bạn đang được đăng nhập ở nơi khác. Vui lòng thử lại.");
        });

        this.ws.on(-1306, () => {
            this.CreateMainGuestGame();
            this.inGame.visible = false;
            this.notice(this._('Tài khoản của bạn đang được đăng nhập ở nơi khác. Vui lòng thử lại sau ít phút.'));
        })


        this.ws.on("notJoin", () => {
            this.inGame.visible = true;
            this.loadGame.visible = false;
            this.chipi("bạn không thể vào khu vực này");
        });

        this.ws.on("notQuest", () => {
            this.inGame.visible = true;
            this.loadGame.visible = false;
            this.chipi("Bạn chưa thể đi tới khu vực này. Hãy hoàn thành nhiệm vụ trước.")
        });

        this.ws.on("updatedQuest", (data) => {
            this.my.nhiemvu = data;
        });

    };
}

export default ioOnly;
