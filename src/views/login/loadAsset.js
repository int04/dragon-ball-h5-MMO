import objectMap from '../map/map.js';

export default class getAssetPixi extends objectMap {
    constructor() {
        super();
    }

    loadSuccessAll = () => {
        this.CreateMainGuestGame();
        let txt2 = this.loadGame.getChildByName('txt2');
        let txtLoad = this.loadGame.getChildByName('txtLoadgame');
        if(txt2 && txtLoad) {
            txt2.visible = false;
            txtLoad.visible = false;
        }
    }

    loadAssetMapPreview = () => {
        let i = 0;
        let list = [];
        let txt2 = this.loadGame.getChildByName('txt2');
        let txtLoad = this.loadGame.getChildByName('txtLoadgame');

        let t = 0;
        let invalue = setInterval(() => {
            if(t ==0) txt2.text = 'Loading.';
            if(t ==1) txt2.text = 'Loading..';
            if(t ==2) txt2.text = 'Loading...';
            t++;
            if(t == 3) t = 0;
            txt2.x = this.gameWidth / 2 - txt2.width / 2;
            txt2.visible = true;
        },500);

        let run = () => {
            if(i >= list.length) 
            {
                clearInterval(invalue);
                return this.loadSuccessAll();
            }

            let srcUrl = list[i].url;
            let load = PIXI.Assets.load(srcUrl);
            txtLoad.visible = true;
            load.then(e => {
                i+=1;
                txtLoad.text = 'Đã tải '+i+'/'+(list.length-1)+' gói tài nguyên bản đồ... ';
                txtLoad.x = this.gameWidth / 2 - txtLoad.width / 2;
                run();
            });


        }

        txtLoad.visible = true;

        txtLoad.text = 'Đang tải gói tài nguyên bản đồ...';
        txtLoad.x = this.gameWidth / 2 - txtLoad.width / 2;
        

        run();

    }

    runPromiseAsset = (max,txtLoad,i = 0) => {
        if(this.srcSheetPixi.length == i) 
        {
            txtLoad.visible = false;
            this.loadAssetMapPreview();
            return false;
        }

        let name = this.srcSheetPixi[i];

        let load = PIXI.Assets.load('./assets/sheet/' + name + '.json');
        txtLoad.visible = true;

        txtLoad.text = 'Đang tải gói '+name+' '+(Math.floor(i/(max)*100))+'%';
        txtLoad.x = this.gameWidth / 2 - txtLoad.width / 2;

        let t = 0;

        txtLoad.hello = txtLoad.hello || 0;
        let txt2;
        if(txtLoad.hello == 0) 
        {
            txtLoad.hello = 1;
            txt2 = new PIXI.Text('Loading...', {
                fontFamily: 'Arial',
                fontSize: 16,
                fill: 0xFFFFFF,
                fontWeight: 'bold',
            });
            txt2.x = this.gameWidth / 2 - txt2.width / 2;
            txt2.y = txtLoad.y + txtLoad.height + 20;
            txt2.name = 'txt2';
            this.loadGame.addChild(txt2);
        }
        else 
        {
            txt2 = this.loadGame.getChildByName('txt2');
        }

        let invalue = setInterval(() => {
            if(t ==0) txt2.text = 'Loading.';
            if(t ==1) txt2.text = 'Loading..';
            if(t ==2) txt2.text = 'Loading...';
            t++;
            if(t == 3) t = 0;
            txt2.x = this.gameWidth / 2 - txt2.width / 2;
        },500);


        load.then(e => {
            this.assetPixi++;
            txtLoad.text = 'Tải '+name+' thành công. '+(Math.floor(i/(max-1)*100))+'%,... loading...';
            txtLoad.x = this.gameWidth / 2 - txtLoad.width / 2;
            i+=1;
            clearInterval(invalue);

            this.runPromiseAsset(max,txtLoad,i);
        })

    }
}