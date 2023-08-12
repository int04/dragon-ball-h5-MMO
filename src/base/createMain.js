import { io } from "../IO/message.js";



class loadGame extends io {
    constructor() {
        super();
        /**
         * @start load assets of game.
         */
        this.assetStartGame();
        this.createGameConfig(); // => khởi động game

    }

    e = (msg = 'Có lỗi xẩy ra, vui lòng thử lại.') => {
        return this.chipi(msg);
    }

    AwaitLoadSheet = async () => {
        let src = this.srcSheet;
        
        await src.forEach(async (element) => {
            let list = await fetch('./assets/sheet/' + element + '.json');
            let json = await list.json();
            try {
                let sheet = json.frames;
                let bigImg = json.meta.image;
                let src = PIXI.Texture.from('./assets/sheet/' + bigImg + '', {
                    resourceOptions: {
                        createBitmap: true,
                    },
                });
                for (let i in sheet) {
                    let obj = sheet[i].frame;
                    let name2 = i.replace('.png', '');
                    let rotated = sheet[i].rotated;
                    let trimmed = sheet[i].trimmed;
                    // check exist
                    let check = this.listBigSheet.find(e => e.n == name2);
                    if (check) continue;
                    
                    let frameInfo = {
                        n: name2,
                        t: bigImg,
                        origin: sheet[i].spriteSourceSize,
                        rotated: rotated,
                        trimmed: trimmed,
                    };

                    frameInfo.x = obj.x;
                    frameInfo.y = obj.y;
                    frameInfo.w = obj.w;
                    frameInfo.h = obj.h;
    
                    this.listBigSheet.push(frameInfo);
                }

            } catch (e) {
                console.log(e)
            }
        });

    }

    async assetStartGame() {
        await this.AwaitLoadSheet();
 
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {} else {
            this.PC = true;
        }

    
    
    }


}


class playGame extends loadGame {
    constructor() {
        super();
        this.cacheMap = [];
    }


}


export default playGame;