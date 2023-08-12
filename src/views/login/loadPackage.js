import getAssetPixi from "./loadAsset.js";

export default class loadPackageView extends getAssetPixi {
    constructor() {
        super();
                // clearInterval(time);
                // this.CreateFontLogin();
    }

    packageCombo = (txt,time) => {
        let src = ['combo','baseCombo','npc','baseSkill','mob','quan','dau','ao','caitrang','map/caycoi','map/eff','map/khac','map/dat','map/nhacua','map/trangtri', 'map/khac2','map/khac3'];
        let i = 0;

        // Promiseall sẽ nhanh hơn =]

        let PromisePackage = (url) => {
            return new Promise((resolve, reject) => {
                let name = url;
                url = './assets/package/' + url + '.json?v='+this.gameInfo.version;
                // xhr 
                txt.text = 'Đang tải gói cơ bản: '+name;
                txt.x = this.gameWidth/2 - txt.width/2;
                let xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onload = () => {
    
                    if(xhr.readyState == 4 && xhr.status == 200) {
                        let data = JSON.parse(xhr.responseText);
                        if(name == 'combo') this.spriteComBo = data;
                        else if(name == 'baseSkill') this.skill = data;
                        else if(name == 'baseCombo') this.base_combo = data;
                        else if(name == 'map/caycoi' || name == 'map/eff' || name == 'map/khac' || name == 'map/dat' || name == 'map/nhacua' || name == 'map/trangtri' || name == 'map/khac2' || name == 'map/khac3') {
                            data.forEach(element => {
                                this.assets.push({ name: element, url: './assets/'+name+'/' + element + '.png' });
                            });
                        }
                        
                        else 
                        {
                            this.images = this.images.concat(data);
                        }
                        resolve();
                    }
                    else {
                        reject();
                        alert('Can not load package:'+src[i]+'. Please reload page or contact admin in forum.');
                    }
                    
    
                };
                xhr.send();
            });
        }

        let array = [];
        for(let i = 0; i < src.length; i++) {
            array.push(PromisePackage(src[i]));
        }
        let timeLoad = Date.now();
        Promise.all(array).then(() => {
            console.log('loading package ('+src.length+') time: '+(Date.now() - timeLoad)+'ms');
            this.CreateFontLogin();
            clearInterval(time);
        });
    }


}