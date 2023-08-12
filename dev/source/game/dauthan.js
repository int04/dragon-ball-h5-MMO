
import snowlyVNchatClass from "../theme/chat.js";
class snowlyVNdauThan extends snowlyVNchatClass 
{
    constructor() {
        super();
    }

    useDauThan() {
        if(this.my.id <=0) return;
        let my = this.my;
        if (my.used.dauthan <= Date.now()) {
            this.bg_dauthan_circle.height = 0;
            my.used.dauthan = Date.now() + my.used.dauthan_time;
        }
    }

}

export default snowlyVNdauThan;