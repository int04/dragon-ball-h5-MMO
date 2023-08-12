import Graphics from './graphics.js';

export default class SheetImges extends Graphics {
    constructor() {
        super();
        this.publicListSheet = [];
        this.insertSheet();
        this.srcSheet = ['dam'];
        this.srcSheetPixi = [

    
            ];
        this.listSheet = []; // size use
        this.listBigSheet = []; // toàn bộ các sheet
        /**
         * loading toàn bộ sheet vào listBigSheet
         * lấy từ listSHeet, chưa có thì load từ listbigSheet sau đó xóa listBigSheet
         */
        this.loadBigSite = true;
        this.listSheetEmpty = []; // danh sách sheet rỗng
    }

    checkSheet(name) {
        let sheet = this.publicListSheet.find(e => e.name == name);
        if(sheet) return sheet;
        return false;
    }


  

    coverSheet(name) {
        // check PIXI.Texture
        let name2 = name+'.png';

        // check cache PIXI.Texture
        let check = PIXI.utils.TextureCache[name2];
        if(check) {
            // check
            console.log('lấy sheet này')
            return check;
        }

        if(this.loadBigSite && this.listSheetEmpty.findIndex(e => e == name) == -1) {
            let sheet = this.listSheet.find(e => e.n == name);
            if(!sheet) {
                sheet = this.listBigSheet.find(e => e.n == name);
                if(sheet) {
                    this.listSheet.push(sheet);
                }
            }

            if(sheet) {
                let src = PIXI.Texture.from('./assets/sheet/' + sheet.t + '', {
                    resourceOptions: {
                        createBitmap: false,
                    },
                });
                let run = new PIXI.Sprite(src);
                if(sheet.rotated) {
                    run.rotation = - Math.PI / 2;
                }



                let newsrc = new PIXI.Texture(run.texture, new PIXI.Rectangle(sheet.x, sheet.y, sheet.w, sheet.h));
                return newsrc;

            } else {
                this.listSheetEmpty.push(name);
            }
        }

        /* Xử lý sheet mục khác */

        let sheet = this.checkSheet(name);
        if(sheet) {
            let src = PIXI.Texture.from('./assets/char/' + sheet.sheet + '.png', {
                resourceOptions: {
                    createBitmap: false,
                },
            });

            let run = new PIXI.Sprite(src);



            let newsrc = new PIXI.Texture(run.texture, new PIXI.Rectangle(sheet.x, sheet.y, sheet.w, sheet.h));
            return newsrc;
        }
        return false;
    }

    insertSheet = () => {
        this.publicListSheet.push(
            //{name : '', sheet : 'big', x : , y : , w : , h : },

            {"name":"514","sheet":"big3","x":475,"y":-2,"w":128,"h":112.00000000000001},
            {"name":"515","sheet":"big3","x":601,"y":-3,"w":128,"h":112.00000000000001},

            {"name":"chipi_1","sheet":"big3","x":396,"y":265,"w":87,"h":87},
            {"name":"chipi_2","sheet":"big3","x":396,"y":177,"w":87,"h":87},

            {"name":"chipi_1_1","sheet":"big3","x":1,"y":769,"w":107,"h":104},
            {"name":"chipi_1_2","sheet":"big3","x":0,"y":876,"w":130,"h":103},

            {"name":"rungu1","sheet":"rungu","x":0,"y":0,"w":24,"h":27},
            {"name":"rungu2","sheet":"rungu","x":0,"y":27,"w":24,"h":27},
            {"name":"rungu3","sheet":"rungu","x":0,"y":54,"w":24,"h":27},
            {"name":"rungu4","sheet":"rungu","x":0,"y":81,"w":24,"h":27},

            {"name":"q_nhiemvu_1","sheet":"big1","x":972,"y":218,"w":41,"h":65},
            {"name":"q_nhiemvu_2","sheet":"big1","x":972,"y":284,"w":41,"h":65},
            {"name":"q_nhiemvu_3","sheet":"big3","x":849,"y":0,"w":41,"h":64},

            {"name":"now_chay_1","sheet":"chay_eff","x":0,"y":0,"w":46,"h":48},
            {"name":"now_chay_2","sheet":"chay_eff","x":48,"y":0,"w":44,"h":47},
            {"name":"now_chay_3","sheet":"chay_eff","x":93,"y":16,"w":24,"h":27},


        );
    }

}
