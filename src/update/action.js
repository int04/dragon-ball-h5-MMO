import moveSprite from "./move.js";
/**
 * @snowlyvn
 * @desc: action sprite: kamejoko, dame,...
 */
class actionSprite extends moveSprite {
    constructor() {
        super();
        this.attackTimeout = 0;
        requestAnimationFrame(this.updateSprite);
    }

    updateSprite = () => {
        this.attackTimeout++;
        if(this.attackTimeout % (this.fps())) return;
        if(this.attackTimeout > 100) this.attackTimeout = 0;
        if(this.loadGame.visible == true) return;

        let self = this;
        Promise.all([
            this.cacheAction.map(element => {
                return new Promise((res, fai) => {

                    if(self.my.id <= 0) return res(0);
                    let playerAo;
                    let playerQuan;
                    let playerDau;

                    let head;
                    let foot;
                    let body;

                    // đầu buồi ấy
                    let phantu_playerDau;
                    let name_move_playerDau;
                    let data_load_playerDau;
                    let load_item_farm_playerDau;
                    let count_farm_playerDau;

                    // áo 
                    let phantu;
                    let name_move;
                    let data_load;
                    let load_item_farm;
                    let count_farm;

                    let load_playerQuan;
                    let load_playerAo;
                    let load_playerDau;

                    // quần
                    let phantu_playerQuan;
                    let name_move_playerQuan;
                    let data_load_playerQuan;
                    let load_item_farm_playerQuan;
                    let count_farm_playerQuan;

                    let Player = null;
                    let myPlayer = null;
                    let Player_phukien = null;

                    let findMMo = self.Charset.find(e => e.id == element.id);
                    let infoPlayer;
                    if(element.id == self.my.id) {
                        infoPlayer = self.my;
                    } else {
                        infoPlayer = findMMo;
                    }
                    if(!infoPlayer) {
                        // delete action
                        self.delAction(element);
                    }
                    // cấu hình sprite cho quái
                    if(findMMo && findMMo.type == 'mob') {
                        Player = self.nguoichoi.getChildByName(element.id)
                        Player_phukien = self.nguoichoi_phukien.getChildByName(element.id)
                        if(Player) {
                            myPlayer = self.Charset.find(item => item.id == element.id);
                            if(myPlayer) {
                                playerAo = Player.getChildByName('playerAo');


                                phantu = myPlayer.skin.ao;

                            } else {
                                Player = null;
                            }
                        } else {
                            Player = null;
                        }

                        if(Player != null) {
                            // event;

                            // playerAo.sprite = 0;
                            // playerQuan.sprite = 0;
                            //  playerDau.sprite = 0;


                            if(element.action != 'move') {
                                Player.skew.x = 0;
                            }

                            if(element.action == 'fly') {
                                Player.reset = 1;
                            }


                            Player.actionReset = 'move';

                            element.action = element.action == 'bidanh' ? 'choang' : element.action;


                            if(element.action == 'move') {
                                if(Player.move == 'left') {
                                    Player.skew.x = 0.1;
                                }
                                if(Player.move == 'right') {
                                    Player.skew.x = -0.1;
                                }
                                let sprites = [playerAo];
                                sprites.forEach((sprite) => {


                                    if(sprite === playerAo) {
                                        phantu = myPlayer.skin.ao;
                                        name_move = playerAo.sprite;
                                        data_load = self.getImg(phantu)
                                            .farm[0].move;
                                        load_item_farm = data_load.farme;
                                        count_farm = load_item_farm.length;
                                        name_move = playerAo.sprite >= count_farm - 1 ? 0 : playerAo.sprite;
                                        playerAo.sprite = name_move;
                                        playerAo.x = 0;
                                        playerAo.y = 0;
                                        if(data_load.width < 10 && data_load.height < 10) {
                                            playerAo.scale.set(data_load.width, data_load.height);
                                        } else {
                                            playerAo.width = data_load.width;
                                            playerAo.height = data_load.height;
                                        }
                                        playerAo.texture =
                                            this.coverImg(this.getFarm(phantu, name_move, 'move'));

                                        if(playerAo.sprite == count_farm) {
                                            playerAo.sprite = 0;
                                        }

                                        playerAo.time = playerAo.time || 0;
                                        playerAo.time = playerAo.time > 100 ? 0 : playerAo.time;
                                        playerAo.time += 1;
                                        if(playerAo.time % 2 == 0)
                                            playerAo.sprite++;

                                    }


                                });

                            } else

                            if(element.action == 'choang') {
                                let sprites = [playerAo];
                                sprites.forEach((sprite) => {

                                    if(sprite === playerAo) {
                                        let phantu = myPlayer.skin.ao;
                                        let name_move = 0;
                                        let data_load = self.getImg(phantu)
                                            .farm[0].choang;
                                        let load_item_farm = data_load.farme;
                                        let count_farm = load_item_farm.length;

                                        playerAo.x = 0;
                                        playerAo.y = 0;

                                        // ! Cập nhật kích thước
                                        if(data_load.width < 10 && data_load.height < 10) {
                                            playerAo.scale.set(data_load.width, data_load.height);
                                        } else {
                                            playerAo.width = data_load.width;
                                            playerAo.height = data_load.height;
                                        }
                                        playerAo.texture =
                                            this.coverImg(this.getFarm(phantu, name_move, 'choang'));
                                    }




                                });
                            } else
                            if(element.action == 'attack') {

                                let sprites = [playerAo];
                                sprites.forEach((sprite) => {


                                    if(sprite === playerAo) {
                                        phantu = myPlayer.skin.ao;
                                        name_move = playerAo.sprite;
                                        data_load = self.getImg(phantu)
                                            .farm[0].attack;
                                        load_item_farm = data_load.farme;
                                        count_farm = load_item_farm.length;
                                        name_move = playerAo.sprite >= count_farm - 1 ? 0 : playerAo.sprite;
                                        playerAo.sprite = name_move;
                                        playerAo.x = 0;
                                        playerAo.y = 0;
                                        if(data_load.width < 10 && data_load.height < 10) {
                                            playerAo.scale.set(data_load.width, data_load.height);
                                        } else {
                                            playerAo.width = data_load.width;
                                            playerAo.height = data_load.height;
                                        }
                                        playerAo.texture =
                                            this.coverImg(this.getFarm(phantu, name_move, 'attack'));

                                        if(playerAo.sprite == count_farm) {
                                            playerAo.sprite = 0;
                                        }

                                        playerAo.time = playerAo.time || 0;


                                        playerAo.sprite++;

                                        setTimeout(() => {
                                            this.addAction({
                                                id: element.id,
                                                action: 'move'
                                            })
                                        }, 400);

                                    }


                                });




                            } else
                            if(element.action == 'dungyen') {
                                let sprites = [playerAo];
                                sprites.forEach((sprite) => {



                                    if(sprite === playerAo) {
                                        let phantu = myPlayer.skin.ao;
                                        let data_load = self.getImg(phantu)
                                            .farm[0].move;

                                        let load_item_farm = data_load.farme;
                                        let count_farm = load_item_farm.length;
                                        let name_move = playerAo.sprite > count_farm - 1 ? 0 : playerAo.sprite;

                                        playerAo.x = 0;
                                        playerAo.y = 0;

                                        // ! Cập nhật kích thước
                                        if(data_load.width < 10 && data_load.height < 10) {
                                            playerAo.scale.set(data_load.width, data_load.height);
                                        } else {
                                            playerAo.width = data_load.width;
                                            playerAo.height = data_load.height;
                                        }
                                        playerAo.texture =
                                            this.coverImg(this.getFarm(phantu, name_move, 'move'));



                                    }


                                });


                                // nhún nhảy...
                                if(playerAo.load == 0) {
                                    playerAo.y -= 1;

                                }

                                if(playerAo.load == 5) {
                                    playerAo.y += 1;
                                    playerAo.load = 0;
                                }
                                playerAo.load += 1;
                            }



                        }

                    } else

                    // cấu hình sprite cho người chơi & BOSS
                    {
                        
                        if(element.id == self.my.id) {
                            myPlayer = self.my;
                            Player = self.NhanVat;
                            playerAo = Player.getChildByName('ao');
                            playerQuan = Player.getChildByName('quan');
                            playerDau = Player.getChildByName('dau');

                            head = Player.getChildByName('head');
                            foot = Player.getChildByName('foot');
                            body = Player.getChildByName('body');

                            head = head;
                            foot = foot;
                            body = body;

                            phantu_playerDau = self.my.skin.dau;
                            phantu = self.my.skin.ao;
                            phantu_playerQuan = self.my.skin.quan;
                            Player_phukien = self.NhanVat_phukien;


                        } else {
                            Player = self.nguoichoi.getChildByName(element.id)
                            Player_phukien = self.nguoichoi_phukien.getChildByName(element.id)
                            if(Player) {
                                myPlayer = self.Charset.find(item => item.id == element.id);
                                if(myPlayer) {
                                    playerAo = Player.getChildByName('playerAo');
                                    playerQuan = Player.getChildByName('playerQuan');
                                    playerDau = Player.getChildByName('playerDau');

                                    head = Player.getChildByName('head');
                                    foot = Player.getChildByName('foot');
                                    body = Player.getChildByName('body');
                                    phantu_playerDau = myPlayer.skin.dau;
                                    phantu = myPlayer.skin.ao;
                                    phantu_playerQuan = myPlayer.skin.quan;

                                } else {
                                    Player = null;
                                }
                            } else {
                                Player = null;
                            }

                        }




                        if(Player != null) {
                         if(myPlayer.skin.theobo && myPlayer.skin.theobo.length >=1)
                         {
                            if(myPlayer.skin.ao == '' || !myPlayer.skin.ao) { 
                                let findnameAo = self.images.find(e => e.id == myPlayer.skin.theobo && e.type == 'ao');
                                if(findnameAo) myPlayer.skin.ao = findnameAo.name;
                            }
                            if(myPlayer.skin.quan == '' || !myPlayer.skin.quan) {
                                let findnameQuan = self.images.find(e => e.id == myPlayer.skin.theobo && e.type == 'quan');
                                if(findnameQuan) myPlayer.skin.quan = findnameQuan.name;
                            }
                            if(myPlayer.skin.dau == '' || !myPlayer.skin.dau) {
                                let findnameDau = self.images.find(e => e.id == myPlayer.skin.theobo && e.type == 'dau');
                                if(findnameDau) myPlayer.skin.dau = findnameDau.name;
                            }
                            
                         }

                            if(element.action != 'move') {

                                Player.skew.x = 0;
                            }

                            // nghiêng nhân vật khi đi
                            if(element.action == 'move') {
                                if(Player.huong == 'left') {
                                    Player.skew.x = 0.08;
                                } else
                                if(Player.huong == 'right') {
                                    Player.skew.x = -0.08;
                                }

                                this.playSound("chay",true,Player.x,Player.id+"_chay");
                            }
                            else 
                            {
                                this.deleteSound(Player.id+"_chay");
                            }

                            if(element.action == 'fly') {
                                Player.reset = 1;
                            }

                            if(element.action != 'fly' && Player.reset == 1) {
                                playerAo.pivot.set(0, 0);
                                playerAo.rotation = 0;
                                Player.reset = 0;
                                // delete eff
                                self.deleteSkill('fly_' + myPlayer.id);
                                Player_phukien.visible = true;
                            }

                            if(element.action == 'attack') {

                            }
                            Player.khongtrung = Player.khongtrung || 0;
                            if(element.action == 'fly' || element.action == 'baylen') {
                                Player.khongtrung = 1;
                            }

                            if(1 - 1 == 0 && element.action != 'fly') {
                                Player.actionReset = 'dungyen';

                                let nameSprite = element.action;
                                nameSprite = nameSprite == 'keepkame' ? 'dam2' : nameSprite;
                                if(nameSprite == 'dungyen' && Player.id == self.my.id) {
                                    // NhanVatGoc.removeAllChild();
                                    // NhanVatGoc = Player;
                                }

                                if(Player.khongtrung == 1) {
                                    if(nameSprite == 'dungyen') {
                                        if(self.checkOnDat22(myPlayer.id)) {
                                            Player.khongtrung = 0;
                                        } else {

                                            nameSprite = 'baylen';

                                        }
                                    }
                                }

                                if(Player.id == self.my.id) {
                                    if(nameSprite != 'dotay' && self.keysPressed[40] && !self.checkOnDat22(myPlayer.id)) {
                                        nameSprite = 'dotay';
                                    }
                                }



                                let sprites = [playerAo, playerQuan, playerDau];
                                sprites.forEach((sprite) => {

                                    if(sprite === playerQuan) {

                                        phantu = myPlayer.skin.quan;
                                        name_move = playerQuan.sprite;
                                        data_load = self.getImg(phantu).farm[0][nameSprite];



                                        if(data_load) {
                                            load_item_farm = data_load.farme;
                                            count_farm = load_item_farm.length;
                                            playerQuan.x = data_load.x;

                                            if(data_load.width < 1 && data_load.height < 1) {
                                                let width = data_load.width;
                                                let height = data_load.height;
                                                width+= data_load.width_m > 0 ? data_load.width_m : 0;
                                                height+= data_load.height_m > 0 ? data_load.height_m : 0;
                                                playerQuan.scale.set(width, height);
                                            } else {
                                                playerQuan.width = data_load.width;
                                                playerQuan.height = data_load.height;
                                            }


                                            playerQuan.y = Math.abs(self.getImg(myPlayer.skin.dau).farm[0][nameSprite].y);



                                            playerQuan.texture = this.coverImg(this.getFarm(phantu, name_move, nameSprite));
                                            playerQuan.time = playerQuan.time || 0;
                                            
                                            if(count_farm > 1) {
                                                if( playerQuan.time <= Date.now())
                                                {
                                                    playerQuan.time = Date.now() + 60;

                                                    playerQuan.sprite++;
                                                }
                                            }

                                            if(playerQuan.sprite + 1 >= count_farm) {
                                                playerQuan.sprite = 0;
                                            }

                                        }
                                    }

                                    if(sprite === playerAo) {


                                        phantu = myPlayer.skin.ao;
                                        name_move = playerAo.sprite;
                                        data_load = self.getImg(phantu).farm[0][nameSprite];
                                        if(data_load) {
                                            load_item_farm = data_load.farme;
                                            count_farm = load_item_farm.length;
                                            playerAo.x = data_load.x + ((data_load.xx < 0 || data_load.xx > 0) ? data_load.xx : 0);
                                            playerAo.y = Math.abs(self.getImg(myPlayer.skin.dau).farm[0][nameSprite].y) - Math.abs(self.getImg(myPlayer.skin.ao).farm[0][nameSprite].y);


                                            if(data_load.width < 1 && data_load.height < 1) {
                                                let width = data_load.width;
                                                let height = data_load.height;
                                                width+= data_load.width_m > 0 ? data_load.width_m : 0;
                                                height+= data_load.height_m > 0 ? data_load.height_m : 0;
                                                playerAo.scale.set(width, height);
                                            } else {
                                                playerAo.width = data_load.width;
                                                playerAo.height = data_load.height;
                                            }
                                            playerAo.time = playerAo.time || 0;
                                            playerAo.texture = this.coverImg(this.getFarm(phantu, name_move, nameSprite));
                                            
                                            if(count_farm > 1) {
                                                if(playerAo.time <= Date.now())
                                                {
                                                    playerAo.sprite++;
                                                    playerAo.time = Date.now() + 60;
                                                }
                                            }

                                            if(playerAo.sprite + 1 >= count_farm) {
                                                playerAo.sprite = 0;
                                            }

                                        }
                                    }

                                    if(sprite === playerDau) {

                                        phantu = myPlayer.skin.dau;
                                        name_move = playerDau.sprite;
                                        data_load = self.getImg(phantu).farm[0][nameSprite];
                                        if(data_load) {
                                            load_item_farm = data_load.farme;
                                            count_farm = load_item_farm.length;
                                            playerDau.x = data_load.x + ((data_load.xx < 0 || data_load.xx > 0) ? data_load.xx : 0);
                                            playerDau.y = Math.abs(self.getImg(myPlayer.skin.quan).farm[0][nameSprite].y);;


                                            if(data_load.width < 1 && data_load.height < 1) {
                                                let width = data_load.width;
                                                let height = data_load.height;
                                                width+= data_load.width_m > 0 ? data_load.width_m : 0;
                                                height+= data_load.height_m > 0 ? data_load.height_m : 0;
                                                playerDau.scale.set(width, height);
                                            } else {
                                                playerDau.width = data_load.width;
                                                playerDau.height = data_load.height;
                                            }

                                            playerDau.texture = this.coverImg(this.getFarm(phantu, name_move, nameSprite));
                                            if(playerDau.sprite + 1 >= count_farm) {
                                                playerDau.sprite = 0;
                                            }

                                            if(count_farm > 1) {
                                                playerDau.sprite++;
                                            }

                                        }
                                    }




                                });




                            } else
                            if(element.action == 'fly') {

                                Player.actionReset = 'baylen';
                                Player.oldACT = 'fly';
                                //Player_phukien.visible = false;
                                load_playerQuan = self.getImg(myPlayer.skin.quan);
                                load_playerAo = self.getImg(myPlayer.skin.ao);
                                load_playerDau = self.getImg(myPlayer.skin.dau);

                                if(!load_playerDau.farm[0].flymove) return;
                                if(!load_playerAo.farm[0].flymove) return;
                                if(!load_playerQuan.farm[0].flymove) return;

                                playerQuan.sprite = 0;
                                phantu = myPlayer.skin.quan;
                                name_move = playerQuan.sprite;
                                data_load = self.getImg(phantu)
                                    .farm[0].flymove;
                                load_item_farm = data_load.farme;
                                count_farm = load_item_farm.length;
                                playerQuan.x = data_load.x;
                                playerQuan.y = data_load.y;
                                // update x, y of quan
                                playerQuan.texture =
                                    this.coverImg(this.getFarm(phantu, name_move, 'flymove'));
                                if(data_load.width > 0 && data_load.height >= 0) {
                                    let width = data_load.width;
                                    let height = data_load.height;
                                    width+= data_load.width_m > 0 ? data_load.width_m : 0;
                                    height+= data_load.height_m > 0 ? data_load.height_m : 0;
                                    playerQuan.scale.set(width, height);

                                }



                                playerAo.texture = this.coverImg(this.getFarm(myPlayer.skin.ao, 0, 'flymove'));
                                playerAo.sprite = 0;
                                playerAo.x = load_playerAo.farm[0].flymove.x;
                                playerAo.y = load_playerAo.farm[0].flymove.y;

                                // playerAo.pivot.set(playerAo.width / 2, 0);
                                //playerAo.rotation = Math.PI / 2;


                                if(load_playerAo.farm[0].flymove.width > 0 && load_playerAo.farm[0].flymove.height >= 0) {
                                    let width = load_playerAo.farm[0].flymove.width;
                                    let height = load_playerAo.farm[0].flymove.height;
                                    width+= load_playerAo.farm[0].flymove.width_m > 0 ? load_playerAo.farm[0].flymove.width_m : 0;
                                    height+= load_playerAo.farm[0].flymove.height_m > 0 ? load_playerAo.farm[0].flymove.height_m : 0;

                                    playerAo.scale.set(width, height);

                                }



                                playerDau.texture =
                                    this.coverImg(this.getFarm(myPlayer.skin.dau, 0, 'flymove'));
                                playerDau.sprite = 0;


                                playerDau.x = load_playerDau.farm[0].flymove.x;
                                playerDau.y = load_playerDau.farm[0].flymove.y;




                                if(load_playerDau.farm[0].flymove.width > 0 && load_playerDau.farm[0].flymove.height >= 0) {
                                    let width = load_playerDau.farm[0].flymove.width;
                                    let height = load_playerDau.farm[0].flymove.height;
                                    width+= load_playerDau.farm[0].flymove.width_m > 0 ? load_playerDau.farm[0].flymove.width_m : 0;
                                    height+= load_playerDau.farm[0].flymove.height_m > 0 ? load_playerDau.farm[0].flymove.height_m : 0;
                                    playerDau.scale.set(width, height);

                                }

                                let down = 1;
                                if(playerAo.load == 0) {

                                    playerAo.y -= down;
                                    playerDau.y -= down;
                                    playerQuan.y -= down;

                                }

                                if(playerAo.load >= 3) {
                                    playerAo.y += down;
                                    playerDau.y += down;
                                    playerQuan.y += down;

                                    playerAo.load = 0;
                                }
                                playerAo.load += 1;

                                this.addEff({
                                    id: 'fly_' + myPlayer.id,
                                    type: 'flyKI',
                                    name: 'kiBay',
                                    by: myPlayer.id,
                                })
                            }

                            if(element.action == 'baylen' || element.action =='dotay') 
                            {
                            }

                            let cong = 2;
                            if(playerAo.load == 0) {
                                playerAo.y -= 1;
                                playerDau.y -= 1;
                                playerAo.load += 1;

                            } else
                            if(playerAo.load == 10) {
                                playerAo.y += 1;
                                playerDau.y += 1;
                                playerAo.load = 0;
                            } else {
                                playerAo.load += 1;

                            }

                            let biendo = 5;
                            Player.giatoc = Player.giatoc || 0;
                            Player.giatoc += 1;




                        }
                    }


                    // xử lý phụ kiện


                    if(Player_phukien && Player) {

                        if(myPlayer.type == 'player' && myPlayer.detu) {
                            let detu = myPlayer.detu;

                            // xóa đệ tử
                            if(detu.id && detu.info && detu.info.trangthai && detu.info.trangthai == 'venha') {
                                Player.detu = 0;
                                let find = self.Charset.find(e => e.id == detu.id);
                                if(find) {
                                    self.deleteNguoiChoi(detu.id);
                                }
                            }
                        }

                        Player_phukien.x = Player.x;
                        Player_phukien.y = Player.y;
                        Player_phukien.width = Player.width;
                        Player_phukien.height = Player.height;
                        Player_phukien.scale.x = Player.scale.x;
                        Player_phukien.scale.y = Player.scale.y;
                        Player_phukien.pivot.x = Player.pivot.x;
                        Player_phukien.pivot.y = Player.pivot.y;
                        Player_phukien.resolution = 2;
                        Player_phukien.rotation = Player.rotation;
                        Player_phukien.visible = Player.visible;

                        Player.id = myPlayer.id;
                        Player.name = myPlayer.id;
                        Player.namdat = Player.namdat || 0;

                        if(myPlayer.info.act != 'dungyen') {
                            Player.namdat = 0;
                        }

                        Player.dungyen = Player.dungyen || 0;

                        if(myPlayer.info.act == 'dungyen' && Player.dungyen == 0 && myPlayer.type == 'player' ) {
                            Player.dungyen = 1;
                            self.addEff({
                                type: 'dungyen',
                                by: myPlayer.id,
                                id : 'haoquang'+myPlayer.id,
                            });
                        } else
                        if(myPlayer.info.act != 'dungyen')
                        {
                            Player.dungyen = 0;
                        }


                        if(myPlayer.info.act == 'dungyen' && Player.namdat == 0 && myPlayer.type != 'mob') {
                            //self.xulynamdat(myPlayer.id);
                        }

                        if(myPlayer.info.act != 'flymove') {
                            if(Player.huong == 'left' && Player.scale.x != -1) {
                                Player.scale.x = -1;
                                Player.pivot.x = 0;
                            }
                            if(Player.huong == 'right' && Player.scale.x != 1) {
                                Player.scale.x = 1;
                                Player.pivot.x = Player.width;
                            }
                        }

                        let playerDrawGraphic = Player_phukien.getChildByName('playerDrawGraphic');
                        if(playerDrawGraphic == undefined) {
                            playerDrawGraphic = new PIXI.Graphics();
                            playerDrawGraphic.name = 'playerDrawGraphic';
                            Player_phukien.addChild(playerDrawGraphic);
                            // show text NhanVat.width on the playerDrawGraphic
                            let playerDrawGraphicText = self.Text('x,y:' + Math.round(Player.x) + ', ' + Math.round(Player.y) + ' #' + (Player.id) + '').size(11).vien(0, 4).dam();
                            playerDrawGraphicText.name = 'playerDrawGraphicText';
                            playerDrawGraphic.addChild(playerDrawGraphicText);
                            playerDrawGraphicText.y = 0 - playerDrawGraphicText.height;
                            if(myPlayer.type != 'npc') {
                                playerDrawGraphicText.visible = false;
                            }


                        } else {
                            if(myPlayer.type != 'npc') {
                                let playerDrawGraphicText = playerDrawGraphic.getChildByName('playerDrawGraphicText');
                                playerDrawGraphicText.text = 'x,y:' + Math.round(Player.x) + ', ' + Math.round(Player.y) + ' ';
                            }

                            playerDrawGraphic.clear();
                            playerDrawGraphic.lineStyle(1, 0x000000, 1);
                            playerDrawGraphic.beginFill(0x000000, 0.1);
                            playerDrawGraphic.drawRect(0, 0, Math.abs(Player.width), Player.height);
                            playerDrawGraphic.endFill();
                            playerDrawGraphic.visible = false;

                        }

                        // hiển thị con trỏ click //



                        // create bar HP //
                        if(Player.getBounds().width >=1)
                        Player.maxWidth = Player.maxWidth || Player.getBounds().width;
                        let playerisHP2;
                        if(Player.maxWidth >=10)
                        {
                            if(myPlayer.type == 'mob' &&  self.setting.mouse != -1 && self.setting.mouse != myPlayer.id && Player.selectedBarHp == 1) 
                            {
                                Player.selectedBarHp = 0;
                                let playerisHP = Player_phukien.getChildByName('playerisHP');
                                playerisHP2 = Player_phukien.getChildByName('playerisHP2');
                                if(playerisHP) {
                                    playerisHP.destroy();
                                }
                                if(playerisHP2) {
                                    playerisHP2.destroy();
                                }

                            }
                            if(myPlayer.type == 'mob' && self.setting.mouse != -1 && self.setting.mouse == myPlayer.id) {
                                Player.selectedBarHp = 1;
                                let playerisHP = Player_phukien.getChildByName('playerisHP');
                                if(playerisHP == undefined) {
                                    playerisHP = new PIXI.Graphics();
                                    playerisHP.name = 'playerisHP';
                                    Player_phukien.addChild(playerisHP);
                                }
                                playerisHP.clear();
                                playerisHP.lineStyle(1, 0x000000, 1);
                                playerisHP.beginFill(0x6e646e, 1);
                                playerisHP.drawRoundedRect(0, 0, Math.abs(Player.maxWidth), 5,20);
                                playerisHP.endFill();
    
                                playerisHP2 = Player_phukien.getChildByName('playerisHP2');
                                if(playerisHP2 == undefined) {
                                    playerisHP2 = new PIXI.Graphics();
                                    playerisHP2.name = 'playerisHP2';
                                    Player_phukien.addChild(playerisHP2);
                                }
                                playerisHP2.clear();
                                playerisHP2.lineStyle(1, 0x000000, 1);
                                let color = 0x60e11b;
                                if(myPlayer.info.chiso.hp < myPlayer.info.chiso.hpFull / 2) color = 0xf9f805;
                                if(myPlayer.info.chiso.hp < myPlayer.info.chiso.hpFull / 4) color = 0xFF0000;
                                playerisHP2.beginFill(color, 1);
                                playerisHP2.drawRoundedRect(0, 0, Math.abs(Player.maxWidth) * (myPlayer.info.chiso.hp / myPlayer.info.chiso.hpFull), 5,20);
                                // round rectangle


                                playerisHP2.endFill();
                                playerisHP2.x = 0;
                                playerisHP2.width = Math.abs(Player.maxWidth) * (myPlayer.info.chiso.hp /  myPlayer.info.chiso.hpFull);
                                playerisHP2.height = 5;
    
    
                                playerisHP2.y = -playerisHP2.height - 10;
                                playerisHP.y = -playerisHP2.height - 10;
    
                                if(Player.huong == 'right') {
                                    playerisHP2.scale.set(1, 1);
                                    playerisHP2.pivot.x = 0;
                                    
                                } else
                                if(Player.huong == 'left') {
                                    playerisHP2.scale.set(-1, 1);
                                    playerisHP2.pivot.x = -playerisHP2.width;
                                }
    
                            }
                        }
                        


                        // hiển thị tên //
                        let playerisName = Player_phukien.getChildByName('playerisName');
                        if(playerisName == undefined) {
                            let fontColor = 0xFFFFFF;
                            if(myPlayer.type == 'npc') fontColor = 0xf9f805;
                            if(myPlayer.type == 'mob') fontColor = 0xFF0000;
                            if(myPlayer.type == 'boss') fontColor = 0xFF0000;

                            if(myPlayer.of >= 1) fontColor = 0x00fefe;

                            if(self.my.skin.bangID >= 1 && myPlayer.skin.bangID >= 1 && self.my.skin.bangID == myPlayer.skin.bangID) {
                                fontColor = 0x76b13a;
                            }

                            playerisName = new PIXI.Text(myPlayer.name+(self.gameInfo.debug == true ? '['+myPlayer.id+']': ''), {
                                fontFamily: "Arial",
                                fontSize: 14,
                                fill: fontColor,
                                fontWeight: 'bold',
                                align: "center",
                            });
                            playerisName.name = 'playerisName';
                            Player_phukien.addChild(playerisName);
                            playerisName.scale.set(1, 1);
                            playerisName.pivot.x = playerisName.width / 2;

                            if(myPlayer.type == 'npc'|| myPlayer.type == 'boss') {
                                playerisName.resolution = 2;
                                playerisName.style.stroke = '#000000';
                                playerisName.style.strokeThickness = 4;

                            }

                            if(myPlayer.type == 'mob') {
                                playerisName.resolution = 2;
                                playerisName.style.stroke = '#000000';
                                playerisName.style.strokeThickness = 4;
                                playerisName.style.dropShadow = true;
                                playerisName.style.dropShadowColor = '#000000';
                                playerisName.style.dropShadowBlur = 4;
                                playerisName.style.dropShadowAngle = Math.PI / 6;
                                playerisName.style.dropShadowDistance = 6;
                            }
                            if(myPlayer.id == self.my.id) playerisName.visible = false;

                            playerisName.pivot.x = playerisName.width / 2;

                        } else {
                            playerisName.x = Math.abs(Player.width) / 2 - Math.abs(playerisName.width) / 2;
                            playerisName.y = -playerisName.height - 10;


                            if(Player.sound) {
                                playerisName.text = myPlayer.name + ' 🎙️';
                            } else {
                                playerisName.text = myPlayer.name;
                            }

                            playerisName.text = myPlayer.name+(self.gameInfo.debug == true ? '['+myPlayer.id+']': '');

                            if(Player.move == 'right') {
                                playerisName.scale.set(1, 1);
                                playerisName.pivot.x = 0;
                                Player.huong = 'right';
                                
                            } else
                            if(Player.move == 'left') {
                                playerisName.scale.set(-1, 1);
                                playerisName.pivot.x = playerisName.width;
                                Player.huong = 'left';
                            }

                        }
                        if(myPlayer.type == 'mob') playerisName.visible = false;


                        let playerisClick = Player_phukien.getChildByName('playerisClick');
                        if(playerisClick == undefined) {
                            playerisClick = new PIXI.Sprite(self.coverImg('PreviewClick'));
                            playerisClick.name = 'playerisClick';
                            Player_phukien.addChild(playerisClick);
                            playerisClick.load = 1;
                        } else {
                            playerisClick.width = 20;
                            playerisClick.height = 20;
                            if(playerisName) {
                                playerisClick.x = Math.abs(Player.width) / 2 - Math.abs(playerisClick.width) / 2;
                                playerisClick.y = playerisName.y - playerisClick.height;
                                if(playerisClick.load == 2) {
                                    playerisClick.y -= 1;
                                }
                                if(playerisClick.load == 4) {
                                    playerisClick.y += 1;
                                    playerisClick.load = 0;
                                }
                                playerisClick.load++;

                            }
                        }

                        if(myPlayer.type == 'npc') 
                        {
                            let iconnhiemvu = Player_phukien.getChildByName('iconnhiemvu');
                            if(!iconnhiemvu) {
                                iconnhiemvu = new PIXI.Sprite(self.coverImg('q_nhiemvu_1'));
                                iconnhiemvu.name = 'iconnhiemvu';
                                Player_phukien.addChild(iconnhiemvu);
                                iconnhiemvu.width = 30;
                                iconnhiemvu.height = 30;
                                iconnhiemvu.load = 1;
                                iconnhiemvu.start = 0;
                            }
                            else 
                            {
                                iconnhiemvu.x = Math.abs(Player.width) / 2 - Math.abs(iconnhiemvu.width) / 2;
                                iconnhiemvu.y = playerisName.y - iconnhiemvu.height;
                                let src = ["q_nhiemvu_1","q_nhiemvu_2","q_nhiemvu_3"];
                                iconnhiemvu.load++;
                                if(iconnhiemvu.load >= 10000) iconnhiemvu.load = 0;
                                if(iconnhiemvu.load % self.fps() == 0) {
                                    iconnhiemvu.texture = this.coverImg(src[iconnhiemvu.start]);
                                    iconnhiemvu.start++;
                                    if(iconnhiemvu.start >= src.length) iconnhiemvu.start = 0;
                                }
                            }
                            iconnhiemvu.visible = false;
                            if(self.my.nhiemvu.data.id == myPlayer.id) iconnhiemvu.visible = true;
                        }

                        if(myPlayer.type == 'player' && !myPlayer.of) {
                            let iconTuongTac = Player_phukien.getChildByName('iconTuongTac');
                            if(iconTuongTac == undefined) {
                                iconTuongTac = new PIXI.Sprite(self.coverImg('myTexture2dchat-resources.assets-101'));
                                iconTuongTac.name = 'iconTuongTac';
                                Player_phukien.addChild(iconTuongTac);
                                iconTuongTac.width = 40;
                                iconTuongTac.height = 40;
                                iconTuongTac.interactive = true;
                                iconTuongTac.cursor = 'pointer';

                                // change icon when hover
                                iconTuongTac.on('mouseover', function() {
                                    iconTuongTac.texture = self.coverImg('myTexture2dchat2-resources.assets-430');
                                });
                                iconTuongTac.on('mouseout', function() {
                                    iconTuongTac.texture = self.coverImg('myTexture2dchat-resources.assets-101');
                                });

                                // click
                                iconTuongTac.on('pointerdown', function() {
                                    self.viewInfoPlayer(myPlayer.id);
                                });

                            } else {
                                iconTuongTac.x = Math.abs(Player.width) / 2 - Math.abs(iconTuongTac.width) / 2;
                                iconTuongTac.y = playerisName.y - playerisClick.height - iconTuongTac.height;
                            }
                            if(self.setting.mouse != -1 && self.setting.mouse == myPlayer.id) {
                                iconTuongTac.visible = true;
                            } else {
                                iconTuongTac.visible = false;
                            }
                        }

                        if(self.setting.mouse != -1 && self.setting.mouse == myPlayer.id) {
                            playerisClick.visible = true;
                        } else {
                            playerisClick.visible = false;
                        }

                        let playisChoang = Player_phukien.getChildByName('playisChoang');
                        if(playisChoang == undefined) {
                            playisChoang = new PIXI.Sprite();
                            playisChoang.name = 'playisChoang';
                            Player_phukien.addChild(playisChoang);
                            playisChoang.src = ["968", "969", "970"];
                            playisChoang.start = 0;
                            playisChoang.time = 0;
                        } else {
                            playisChoang.time++;
                            if(playisChoang.time >= 10000) playisChoang.time = 0;
                            if(playisChoang.time % 2 == 0) {
                                playisChoang.texture = this.coverImg(playisChoang.src[playisChoang.start]);
                                playisChoang.start++;
                                if(playisChoang.start >= playisChoang.src.length) playisChoang.start = 0;
                            }
                            playisChoang.width = 70;
                            playisChoang.height = 40;
                            playisChoang.x = Math.abs(Player.width) / 2 - Math.abs(playisChoang.width) / 2;
                            playisChoang.y = playerisName.y - playisChoang.height;

                        }

                        let rungu = Player_phukien.getChildByName('rungu');
                        if(rungu == undefined) {
                            rungu = new PIXI.Sprite(self.coverImg('rungu'));
                            rungu.name = 'rungu';
                            Player_phukien.addChild(rungu);
                        }
                        else{
                            // w 24, 27
                            let src = ["rungu1","rungu2","rungu3","rungu4"];
                            rungu.time = !rungu.time ? 0 : rungu.time;
                            rungu.start = !rungu.start ? 0 : rungu.start;
                            rungu.time++;
                            if(rungu.time >= 10000) rungu.time = 0;
                            if(rungu.time % 2 == 0) {
                                rungu.texture = this.coverImg(src[rungu.start]);
                                rungu.start++;
                                if(rungu.start >= src.length) rungu.start = 0;
                            }
                            rungu.width = 24;
                            rungu.height = 27;
                            rungu.x = Math.abs(Player.width)/2 + Math.abs(rungu.width)/2 ;
                            rungu.y = 0  ;


                        }




                        // ! kết thúc


                        // xử lý các hiệu ứng
                        if(myPlayer.eff) {

                            // thái dương hạ san
                            if(myPlayer.eff.thaiduonghasan && myPlayer.eff.thaiduonghasan.active == true) {
                                playisChoang.visible = true;
                                Player.action = myPlayer.info.act;
                                Player.tdhs = 1;
                                myPlayer.info.act = 'choang';
                                self.addAction({
                                    id: myPlayer.id,
                                    action: myPlayer.info.act
                                });

                                if(myPlayer.id == self.my.id) {
                                    self.GrapSCwhite.visible = true;
                                }
                            } else {
                                playisChoang.visible = false;
                                if(myPlayer.info.act == 'choang' && Player.tdhs && Player.tdhs == 1) {
                                    myPlayer.info.act = Player.action ? Player.action : 'dungyen';
                                    self.addAction({
                                        id: myPlayer.id,
                                        action: myPlayer.info.act
                                    });
                                    Player.tdhs = 0;
                                }

                                if(myPlayer.id == self.my.id) {
                                    self.GrapSCwhite.visible = false;
                                }
                            }

                            // and

                            // kĩ năng tái tạo năng lượng
                            if(myPlayer.eff.taitaonangluong && myPlayer.eff.taitaonangluong.active == true) {
                                if(myPlayer.info.act != 'gong')
                                {
                                    Player.action = myPlayer.info.act;
                                    myPlayer.info.act = 'gong';
                                    self.addAction({
                                        id: myPlayer.id,
                                        action: myPlayer.info.act
                                    });
                                }
                                self.addEff({
                                    type: 'taitaonangluong',
                                    aim: myPlayer.id,
                                    id: 'taitaonangluong_' + myPlayer.id,
                                    name: 'taitaonangluong',
                                    level: 1,
                                })
                            }

                            // kĩ năng hoá khỉ 
                            if(myPlayer.eff && myPlayer.eff.hoakhi && myPlayer.eff.hoakhi.status == true) {
                                
                                self.addEff({
                                    type: 'hoakhi',
                                    uid: myPlayer.id,
                                    id: 'hoakhi_' + myPlayer.id,
                                    name: 'hoakhi',
                                    level: 1,
                                })
                            }

                            // khiêng năng lượng
                            if(myPlayer.eff.khieng && myPlayer.eff.khieng.active == true) {
                                
                                self.addEff({
                                    type: 'khieng',
                                    uid: myPlayer.id,
                                    id: 'khieng_' + myPlayer.id,
                                    name: 'khieng',
                                    level: 1,
                                })
                            }

                            if(myPlayer.eff.rungu && myPlayer.eff.rungu.active == true) {
                                
                                rungu.visible = true;
                            }
                            else 
                            {
                                rungu.visible = false;
                            }
                        }


                        // !! kết thúc


                        // Dành riêng cho người chơi, cho BOT, cho NPC
                        if(myPlayer.type != 'mob' || myPlayer.id == self.my.id) {
                            let playerIsDie = Player_phukien.getChildByName('playerIsDie');
                            if(playerIsDie == undefined) {
                                playerIsDie = new PIXI.Sprite(this.coverImg('834'));
                                playerIsDie.name = 'playerIsDie';
                                Player_phukien.addChild(playerIsDie);
                                playerIsDie.visible = false;
                                const blurFilter1 = new PIXI.filters.BlurFilter();
                                blurFilter1.blur = 0;
                                playerIsDie.filters = [blurFilter1];
                                playerIsDie.width = 50;
                                playerIsDie.height = 50;
                                playerIsDie.x = Math.abs(Player.width) / 2 - Math.abs(playerIsDie.width) / 2;
                                playerIsDie.y = playerisName.y - playerIsDie.height;

                            }

                            

                            if(infoPlayer.info.chiso.hp <= 0) {
                            
                                // filters black

                                let fildter = new PIXI.filters.ColorMatrixFilter();
                                fildter.blackAndWhite(true);
                                Player.filters = [fildter];
                                

                                
                            
                            } else {
                                Player.filters = [];
                            
                            }

                            // xử lý bang hội
                            let co = Player_phukien.getChildByName('co');
                            if(co) {
                                if(infoPlayer.skin.bang >= 1) {


                                    co.time = !co.time ? 0 : co.time;
                                    co.start = !co.start ? 0 : co.start;

                                    if(co.time == 0) {
                                        co.src = this.base_co.find(e => e.id == infoPlayer.skin.bang).src;
                                        co.width = this.base_co.find(e => e.id == infoPlayer.skin.bang).width;
                                        co.height = this.base_co.find(e => e.id == infoPlayer.skin.bang).height;
                                    }

                                    co.visible = true;
                                    // co.y center of playerAo

                                    co.setY = co.setY || playerAo.height;
                                    if(co.setY <=10) {
                                        co.setY = playerAo.height;
                                    }
                                    co.y = playerAo.y + co.setY - co.height;
                                    co.x = playerDau.x - co.width / 2 + playerDau.width / 4;
                                    co.time++;
                                    if(co.time >= 1000) co.time = 0;
                                    if(co.time % 5 == 0 && co.src.length >= 1) {
                                        co.texture = this.coverImg(co.src[co.start]);
                                        co.start++;
                                        if(co.start >= co.src.length) co.start = 0;
                                    } else
                                    if(co.time % 10 == 0) {
                                        if(co.start == 0) {
                                            co.y -= 1;
                                            co.start = 1;
                                        } else
                                        if(co.start == 1) {
                                            co.y += 1;
                                            co.start = 0;
                                        }

                                    }
                                } else {
                                    co.visible = false;
                                }
                            } else {
                                let co = new PIXI.Sprite();
                                co.name = 'co';
                                co.visible = false;
                                Player_phukien.addChild(co);
                            }


                            // xử lý cờ PK
                            let coPK = Player_phukien.getChildByName('coPK');
                            if(coPK) {
                                if(myPlayer.skin.coPK >0 ) 
                                {
                                    coPK.visible = true;
                                    let codat = [0,2323,2324,2325,2326,2327,2328,2329,2330,2331];
                                    coPK.texture = this.coverImg(codat[myPlayer.skin.coPK]);
                                    coPK.width = 20;
                                    coPK.height = 20;
                                    coPK.x = Math.abs(Player.width) / 2 - Math.abs(coPK.width) / 2;
                                    coPK.y = playerisName.y - playerisClick.height;
                                    
                                    if(playerisClick.visible == true) 
                                    {
                                        coPK.x+= playerisClick.width;
                                    }

                                    if(coPK.load == 2) {
                                        coPK.y -= 1;
                                    }
                                    if(coPK.load == 4) {
                                        coPK.y += 1;
                                        coPK.load = 0;
                                    }
                                    coPK.load++;

                                }
                                else 
                                {
                                    coPK.visible = false;
                                }
                            }
                            else 
                            {
                                coPK = new PIXI.Sprite();
                                coPK.name = 'coPK';
                                coPK.load =0;
                                coPK.visible = false;
                                Player_phukien.addChild(coPK);
                            }
                        }


                    }



                    res('success')
                });
            })
        ]).then(e => {})

        //requestAnimationFrame(this.updateSprite)
    }




}

export {
    actionSprite
};
