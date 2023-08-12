import ioOnly from "./ioOnly.js";
/**
 * @module: reviceWebSocket
 * @description: revice data from server
 * @param: none
 * @return: none
 * @example: none
 * 
 */
class io extends ioOnly {

    constructor() {
        super();
        this.isConnect = false;

    }

    ioStart = () => {
        this.ws.on("connect", (socket) => {
            this.isConnect = true;
            this.send("game");
            this.deleteNotice();
            if (this.my.id > 0) {
                this.to('-2', {
                    _1: this.my.id,
                    _2: this.my.token,
                })
                this.notice(this.lang('Đang kết nối lại nhân vật.'), false)
            }
        });
        this.ws.on("a", (data) => {
            console.log(data);
        });

        this.ws.on('data', (data) => {
            console.log(data)
        })

        this.ws.on("disconnect", () => {
            this.isConnect = false;
            this.Charset = [];
            this.resetNone();
            this.notice(this._('Mất kết nối tới máy chủ... Đang thử kết nối lại'), false)
        });
    }

}

export { io };
