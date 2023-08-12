import Box from '../create/box.js';


export default class createSpriteView extends Box {
    constructor() {
        super();
    }
    /**
     * @module: createSpriteView
     * @description: Tạo hình ảnh nhân vật từ các kết cấu có sẵn
     */

    createSprite = (aos,quans,daus) => {
        let nhanVat = new PIXI.Container();

        let load_quan = this.getSkin(quans);
        let load_ao = this.getSkin(aos);
        let load_dau = this.getSkin(daus);

        let quan = new PIXI.Sprite(this.coverImg(load_quan.farm[0].dungyen.farme[0]));
        quan.scale.set(load_quan.farm[0].dungyen.width, load_quan.farm[0].dungyen.height);
        quan.sprite = 0;
        quan.name = "quan222";
        let ao = new PIXI.Sprite(this.coverImg(load_ao.farm[0].dungyen.farme[0]));
        ao.sprite = 0;
        ao.name = 'ao222';
        ao.scale.set(load_ao.farm[0].dungyen.width, load_ao.farm[0].dungyen.height);
        let dau = new PIXI.Sprite(this.coverImg(load_dau.farm[0].dungyen.farme[0]));
        dau.scale.set(load_dau.farm[0].dungyen.width, load_dau.farm[0].dungyen.height);
        dau.sprite = 0;
        dau.name = 'dau222';
        dau.x = load_dau.farm[0].dungyen.x;
        quan.x = load_quan.farm[0].dungyen.x;
        ao.x = load_ao.farm[0].dungyen.x;
        ao.load = 0;

        dau.y = Math.abs(this.getImg(quans).farm[0]["dungyen"].y);
        ao.y = Math.abs(this.getImg(daus).farm[0]["dungyen"].y) - Math.abs(this.getImg(aos).farm[0]["dungyen"].y);
        quan.y = Math.abs(this.getImg(daus).farm[0]["dungyen"].y);
        nhanVat.addChild(quan, dau, ao);
        return nhanVat;
    }
}