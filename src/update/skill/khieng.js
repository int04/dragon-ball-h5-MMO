import flyFirstCharset from "./baylen.js";
export default class khiengUpdate extends flyFirstCharset {
    constructor() {
        super();
    }

    hanleKhieng = (element) => {
        let addnewskill = this.getEff(element.id);
        let donDanh = this.imgEff(addnewskill, element.id);

        let src = ["k1","k1","k2","k2"];

        let nhanVat = this.getNhanVat(element.uid);
        if(!nhanVat) return element.type = 'delete';

        let my = this.getMy(element.uid);
        if(!my) return element.type = 'delete';

        donDanh.time = donDanh.time || 0;
        donDanh.time += 1;

        donDanh.width = 150;
        donDanh.height = 150;

        donDanh.x = nhanVat.x - Math.abs(nhanVat.width) / 2 - donDanh.width / 2;
        donDanh.y = nhanVat.y + nhanVat.height / 2 - donDanh.height / 2;


        donDanh.start = donDanh.start || 0;

        if(donDanh.time%this.fps()) 
        {
            donDanh.start += 1;
            if(donDanh.start >= src.length) donDanh.start = 0;
        }

        donDanh.texture = this.coverImg(src[donDanh.start]);



        if(my.eff.khieng.active == false) 
        {
            element.type = 'delete';
        }


    }
}