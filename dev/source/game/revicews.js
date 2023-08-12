import snowlyvnIoEventOnly from "./IOeventOny.js";
class reviceWebSocket extends snowlyvnIoEventOnly {
    constructor() {
        super();

        this.snowlyvnSocketIO();
        
    }


    snowlyvnSocketIO = () => {
        this.ws.on("connect", (socket) => {
            console.log('connected');
            this.send("game");
            this.deleteNotice();
            if(this.my.id > 0) 
            {
                this.to('-2',{
                    _1 : this.my.id,
                    _2 : this.my.token,
                })
                this.notice(this.lang('Đang kết nối lại nhân vật.'), false)
            }
          });
        this.ws.on("a", (data) => {
            console.log(data); 
        });

        this.ws.on('data',(data) => {
            console.log(data)
        })

        this.ws.on("disconnect", () => {
            console.log("Disconnected");
            this.notice(this._('Mất kết nối tới máy chủ... Đang thử kết nối lại'), false)
        });
    }

    


    test() {
        this.ws.onopen = (evt) => {
            let my = this.my;
            if (my.id > 0) {
                this.to({
                    login: {
                        type: 'connect',
                        id: my.id,
                        token: my.token,
                    }
                });
                this.notice('Đang kết nối...', false)

            }
            this.loadGame.visible = false;
            console.log('Connect to server success');
            return true;
        }

        this.ws.onclose = (evt) => {
            return this.CallWebsocket(); // reconnect to server
        }

        this.ws.onerror = (evt) => {
            console.log('Error: ' + evt.data);
        }

        this.ws.onmessage = (evt) => {
            return (this.binary(evt.data));
        }

        this.binary = (data) => {
            this.reader = new FileReader();
            this.reader.readAsBinaryString(
                new Blob([data], {
                    type: "application/json"
                })
            );
            this.reader.onload = (event) => {
                let result = JSON.parse(event.target.result);
                return this.readMessage(result);
            };
        };
    }

    readMessage = (data) => {
        
        

        
    }




}

export { reviceWebSocket };