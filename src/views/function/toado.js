import actionFunc from './action.js';

class toado extends actionFunc {
    constructor() {
        super();
    }


    hitTestRectangle2(sprite1, sprite2, move = 0, td = 0,checked = false) {
        const rectangle1 = sprite1;
        if(!rectangle1) return false;
        const rectangle2 = sprite2;
        if(!rectangle2) return false;
        if(move != 0) {
            if(move == 'right') rectangle1.x += td;
            if(move == 'left') rectangle1.x -= td;
            if(move == 'up') rectangle1.y -= td;
            if(move == 'down') rectangle1.y += td;
        }

       



        return rectangle1.x < rectangle2.x + rectangle2.width &&
            rectangle1.x + rectangle1.width > rectangle2.x &&
            rectangle1.y < rectangle2.y + rectangle2.height &&
            rectangle1.y + rectangle1.height > rectangle2.y;
    }

    hitTestRectangleDown(sprite1, sprite2, move = 0, td = 0,checked = false) {
        const rectangle1 = sprite1.getBounds();
        if(!rectangle1) return false;
        const rectangle2 = sprite2.getBounds();
        rectangle2.x = rectangle2.x + rectangle2.width;
        if(!rectangle2) return false;
        if(move != 0) {
            if(move == 'right') rectangle1.x += td;
            if(move == 'left') rectangle1.x -= td;
            if(move == 'up') rectangle1.y -= td;
            if(move == 'down') rectangle1.y += td;
        }

       



        return rectangle1.x < rectangle2.x + rectangle2.width &&
            rectangle1.x + rectangle1.width > rectangle2.x &&
            rectangle1.y < rectangle2.y + rectangle2.height &&
            rectangle1.y + rectangle1.height > rectangle2.y;
    }

    hitTestRectangle(sprite1, sprite2, move = 0, td = 0,checked = false) {
        const rectangle1 = sprite1.getBounds();
        if(!rectangle1) return false;
        const rectangle2 = sprite2.getBounds();
        if(!rectangle2) return false;
        if(move != 0) {
            if(move == 'right') rectangle1.x += td;
            if(move == 'left') rectangle1.x -= td;
            if(move == 'up') rectangle1.y -= td;
            if(move == 'down') rectangle1.y += td;
        }

        if(checked) 
        {
            //rectangle2.x = rectangle2.x + rectangle2.width/2 ;
            
        }



        return rectangle1.x < rectangle2.x + rectangle2.width &&
            rectangle1.x + rectangle1.width > rectangle2.x &&
            rectangle1.y < rectangle2.y + rectangle2.height &&
            rectangle1.y + rectangle1.height > rectangle2.y;
    }

    calculateDistanceXandWidth(sprite1, sprite2) {

        const rect1 = sprite1;
        const rect2 = sprite2;

        let x1_min = rect1.x;
        let x1_max = rect1.x + rect1.width;

        let x2_min = rect2.x;
        let x2_max = rect2.x + rect2.width;

        let y1_min = rect1.y;
        let y1_max = rect1.y + rect1.height;

        let y2_min = rect2.y;
        let y2_max = rect2.y + rect2.height;

        // calculate pythagoras (a^2 + b^2 = c^2)
        let dx = Math.max(x1_min, x2_min) - Math.min(x1_max, x2_max);
        let dy = Math.max(y1_min, y2_min) - Math.min(y1_max, y2_max);

        return Math.sqrt(dx * dx + dy * dy);

        
    



    }

   

    calculateDistance(sprite1, sprite2, move = 0, td = 0) {
        const rectangle1 = sprite1;
        const rectangle2 = sprite2;
        if(move != 0) {
            if(move == 'right') rectangle1.x += td;
            if(move == 'left') rectangle1.x -= td;
            if(move == 'up') rectangle1.y -= td;
            if(move == 'down') rectangle1.y += td;
        }

        const dx = rectangle2.x - rectangle1.x; // Độ chênh lệch về phương x
        const dy = rectangle2.y - rectangle1.y; // Độ chênh lệch về phương y

        // Sử dụng định lý Pythagoras để tính khoảng cách Euclidean
        return Math.sqrt(dx * dx + dy * dy);
    }

    checkCollisionX(sprite1, sprite2, move = 0, td = 0) {
        const rect1 = sprite1.getBounds();
        const rect2 = sprite2.getBounds();
        if(move != 0) {
            if(move == 'right') rect1.x += td;
            if(move == 'left') rect1.x -= td;
            if(move == 'up') rect1.y -= td;
            if(move == 'down') rect1.y += td;
        }


        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x;
    }

    calculateDistanceX(sprite1, sprite2, move = 0, td = 0) {
        const rect1 = sprite1.getBounds();
        const rect2 = sprite2.getBounds();
        if(move != 0) {
            if(move == 'right') rect1.x += td;
            if(move == 'left') rect1.x -= td;
            if(move == 'up') rect1.y -= td;
            if(move == 'down') rect1.y += td;
        }
        const distanceX = Math.abs(rect2.x - rect1.x); // Khoảng cách giữa sprite1 và sprite2 theo chiều ngang (trục x)
        return distanceX;
    }

    calculateDistanceY(sprite1, sprite2, move = '', td = '') {
        const rect1 = sprite1.getBounds();
        const rect2 = sprite2.getBounds();
        if(move != 0) {
            if(move == 'right') rect1.x += td;
            if(move == 'left') rect1.x -= td;
            if(move == 'up') rect1.y -= td;
            if(move == 'down') rect1.y += td;
        }
        const distanceY = Math.abs(rect2.y - rect1.y); // Khoảng cách giữa sprite1 và sprite2 theo chiều dọc (trục y)
        return distanceY;
    }

    checkCollisionY(sprite1, sprite2, move = '', td = '') {
        const rect1 = sprite1.getBounds();
        const rect2 = sprite2.getBounds();
        if(move != 0) {
            if(move == 'right') rect1.x += td;
            if(move == 'left') rect1.x -= td;
            if(move == 'up') rect1.y -= td;
            if(move == 'down') rect1.y += td;
        }



        return rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    }


}

export default toado;
