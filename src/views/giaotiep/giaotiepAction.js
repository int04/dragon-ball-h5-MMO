import pkViewController from '../chucnang/pkView.js';

export default class giaotiepAction extends pkViewController {
    constructor() {
        super();
    }

    talkAction(name,data) {
        if(name == 'goto' && typeof data == 'object' ) return this.baynhanh(data.x,data.y);
        if(name == 'shop_buma') this.to(-21, 'a2');
        if(name == 'shop_popo') this.to(-21, 'awrtyf');
        if(name == 'shop_buma_vo') this.to(-21, 'a3');
        if(name == 'shop_saiyan')  this.to(-21, 'cvb');
        if(name == 'nangcap') {
            this.danhSachItem = [];
            this.luaChonNangCap = 0;

            this.boxNangCapLv('ba');
        }

        if(name == 'duclo') {
            this.danhSachItem = [];
            this.luaChonNangCap = 1;

            this.boxNangCapLv('ba');
        }

        if(name == 'epsao') {
            this.danhSachItem = [];
            this.luaChonNangCap = 2;

            this.boxNangCapLv('ba');

        }

        if(name == 'caythan') 
        {
            this.to(-32,{
                type : 'thucan',
            })
        }

        if(name == 'ruongdo') {
            this.openRuongDo();
        }
        if(name == 'nhiemvu') {
            return this.nhiemvuView(0);
        }
    }
    
};
