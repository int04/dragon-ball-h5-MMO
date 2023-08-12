import player from '../create/player.js';

export default class awaitMap extends player {
    constructor() {
        super();

    }

    /**
     * @module loadGame
     * @desc: Kiểm tra các đối tượng trên bản đồ đã được tạo và hiển thị lên màn hình chưa, nếu chưa thì tiếp tục quay lại render.
     * @if  : Nếu đối tượng chưa render, có thể xẩy ra một số lỗi như: không thể cho NPC chạm đất, cho nhân vật chính khi vào bản đồ chạm đất (dẫn tới tình trạng lơ lửng).
     */

    successLoadGame = () => {

        this.inGame.visible = true;
        this.loadGame.visible = false;
        this.vaomap = 1;
        this.snowlyKeoMap();
        this.xulynamdat(this.my.id,true);

    }

    checkCreateObjectOnMap = () => {
        return this.xulyAssetOnMap();
    }


    xulyAssetOnMap = () => {
        /**
         * @since04
         * @desc: What is this?
         * @return: Đây là hàm xử lý các NPC, hay quái trên bản đồ. Chúng ta sẽ loading hết các hiệu ứng của chúng trước khi trả về cho người dùng.
         */
        let list = [];
        this.Charset.forEach(element => {
            if(element.skin) 
            {
                for(let k in element.skin) {
                    let value = element.skin[k];
                    if(!value) continue;
                    // check exist
                    let check = list.findIndex(e => e == value);
                    if(check == -1) list.push(value);

                }
            }
        });
        
        let array = [];

        list.forEach(element => {
            let images = this.getImg(element);
            if(images) {
                let farm = images.farm[0];
                if(farm) {
                    for(let nameSprite in farm) 
                    {
                        let push = farm[nameSprite].farme;
                        if(push) {
                            push.forEach(callNameSprite => {
                                let checked = array.findIndex(e => e == callNameSprite);
                                if(checked == -1) array.push(callNameSprite);
                            });
                        }
                    }
                }
            }
        });



        let i = 0;
        let txtLoad = this.loadGame.getChildByName('txtLoadgame');
        
        let PromiseLoad = (src) => {
            return new Promise((resolve, reject) => {
                txtLoad.visible = true;
                if(PIXI.utils.TextureCache[src]) {
                    i++;
                    return resolve();
                }
                let load = this.load(src);
                load.then(e => {
                    // get kb of image
                    let kb = e.length / 1024;
                    kb = Math.round(kb * 100) / 100;
                    i+=1;
                    txtLoad.text = 'Đã tải '+i+'/'+(array.length-1)+' gói tài nguyên nhân vật... ';
                    txtLoad.x = this.gameWidth / 2 - txtLoad.width / 2;
                    resolve();
                });

            });
        }

        let listLoad = [];
        array.forEach(element => {
            let src = this.getUrlImg(element);
            listLoad.push(PromiseLoad(src));
        }
        );
        let timeLoad = Date.now();
        Promise.all(listLoad).then(e => {
            console.log('load Sprite ('+array.length+'): '+(Date.now() - timeLoad)+'ms');
            txtLoad.visible = false;
            return this.successLoadGame();
        });

    }
}
