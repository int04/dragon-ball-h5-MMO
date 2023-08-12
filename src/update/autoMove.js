import updateMap from "./map.js";


export default class autoMoveUpdate extends updateMap {
    constructor() {
        super();
    }

    angle2 = (x1, y1, x2, y2) => {
        let angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        if(angleDeg < 0) angleDeg += 360;
        return angleDeg;
    }


    updateAutoMovegoTo = () => {

        if(this.my.id <=0) return false;
        if(this.goto == false) return false;

        let id = null; 

        let my = this.my;
        let setting = this.setting;
        if(setting.mouse != 0 && setting.mouse != my.id && setting.mouse != undefined && setting.mouse != null && setting.mouse != -1) {
            id = setting.mouse;
        }

        if(!id) {
            this.goto = false;
            return false;
        }

        let nhanVat = this.NhanVat;
        let NhanVat2 = this.getNhanVat(id);

        let distance = this.distance(nhanVat.x, nhanVat.y, NhanVat2.x, NhanVat2.y);

        let dx = this.gotoDX || 10;

        if(distance <= dx/2) {
            console.log('dừng')
            this.goto = false;
            this.keysPressed[37] = false;
            this.keysPressed[38] = false;
            this.keysPressed[39] = false;
            this.keysPressed[40] = false;

            // trạng thái đứng yên

            if(this.my.info.act == 'fly' || this.my.info.act == 'baylen' || this.my.info.act == 'flymove') {
                this.timeRoiTuDo = Date.now() + 150;
            } else {
                this.timeRoiTuDo = Date.now() + 150;
            }
            if(this.my.info.act == 'move') {

                this.my.info.act = 'dungyen';
                this.addAction()
            }

            if(this.my.info.act == 'fly') {
                this.my.info.act = 'baylen';
                this.addAction();
            }

            return false;
        }
        
        if(Math.abs(Math.abs(nhanVat.y) - Math.abs(NhanVat2.y)) >= nhanVat.height)
        {
            if(nhanVat.y > NhanVat2.y) 
            {
                this.keysPressed[38] = true;
            }
            
            
        }
        else
        if(Math.abs(nhanVat.x - NhanVat2.x) >= 10) 
        {
            if(nhanVat.x > NhanVat2.x) 
            {
                this.keysPressed[37] = true;
            }
            else 
            {
                this.keysPressed[39] = true;
            }
        }
        
        
        
        this.goto = true;

        // check  


        

    }
}