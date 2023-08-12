import socketIoMsgpackParser from '../assets/CDN/encode.js'

class cache {
    constructor() {
        this.gameInfo = {
            version: '0.0.1 Beta',
            name: 'SnowlyVN',
            gameName: 'Dragon Ball',
            timeloadWelcome: 500,
            font: ['PatrickHandSCRegular', 'PottaOne-Regular', 'fontchinh', 'chelthm', 'staccato'],

        }
        this.logChipi = ["Trò chơi dành cho người trên 12 tuổi. Chơi quá 180 phút mỗi ngày sẽ có hại cho sức khỏe."];
        this.logNhiemVu = [];
        this.listMap = [];
        this.username = '';
        this.password = '';
        this.cacheAction = [];
        this.dataSkill = [];
        this.logNotice = [];
        this.logDanger = [];
        this.logChat = [];
        this.cacheMap = [];
        this.keysPressed = {};
        this.timeRoiTuDo = 0;
        this.actionOld = null;
        this.SkillDataOnScreen = {
            background: [],
            skill: [],
            time: [],
            texture: [],
        }
        this.my = {id : 0,
            info : {},
            skill : {},
            pos : {},
            skin : {},
            eff : {},
            token : {},
            act : {},
            name : {},
        };
        this.Charset = [];
        this.ws = null;
        this.methodWebsocket();
        this.setting = {
            'camdi': 0,
            'mouse': 0, // id mouse
            'type': null,
            'blockcanvas': false,
            'oskill': -1,
            'setting': {
                'eff': true,
            },
            'sprite': {
                width: 48,
                height: 20,

            }
        }
        this.CreatedCookie();
    }

    getCookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i < ca.length; i++) {

            let c = ca[i];
            while(c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if(c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    setCookie = (cname, cvalue, exdays) => {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    CreatedCookie() {
        let username = this.getCookie("username");
        let password = this.getCookie("password");
        this.username = username;
        this.password = password;
    }


    addAction(data = null) {
        let obj = {};
        // check type data of my
        let Charset = this.Charset;
        let cacheAction = this.cacheAction;
        // check exist id
        let my = this.my;
        if(data == null) data = { id: my.id, action: my.info.act };

        
        if(data.action == undefined) {
            console.log('set phu', data)
            data.action = 'move';
        }

        let infoPlayer = data.id == my.id ? my : Charset.find(e => e.id == data.id);
        if(!infoPlayer || !infoPlayer.info || !infoPlayer.info.act) return;

        infoPlayer.info.act = data.action;

        let check = cacheAction.find(element => element.id === data.id);
        if(check) {
            check.action = data.action;
            return;
        }
        
        obj.action = data.action;
        obj.id = data.id;
        cacheAction.push(obj);
    }

    delAction = function(data) {
        let cacheAction = this.cacheAction;
        let index = cacheAction.findIndex(element => element.id === data.id);
        if(index !== -1) cacheAction.splice(index, 1);
    }

    danger = function(txt) {
        // check exist
        let check = this.logDanger.find(element => element === txt);
        if(check) {
            return;
        } else {
            this.logDanger.push(txt);
        }
    }

    methodWebsocket() {
        this.send = function(name, data) {
            if(this.isConnect == false) {
                if(this.loadGame.visible == true) 
                {
                    this.loadGame.visible = false;
                }
                this.deleteNotice();
                return this.notice(this._('Máy chủ đang bảo trì, vui lòng thử lại sau ít phút.'));
            }
            if(data) {
                this.ws.emit(name, data);
            } else this.ws.emit(name);
        }

        this.to = function(name, data) {
            if(data) this.send(name, data);
            else this.send(name);
        }

    }

    lang = (e) => {
        return e;
    }
    _ = (e) => {
        return this.lang(e);
    }

    CallWebsocket() {
        // parser with socket.io-msgpack-parser
        this.ws = io(this.gameInfo.server, {
            transports: ['websocket'],
            parser: socketIoMsgpackParser,

        });
    }




}

export default cache;
