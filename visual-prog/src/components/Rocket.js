/**
 * Rocket Class
 * @param {*} x 
 * @param {*} y 
 * @param {*} width 
 * @param {*} height 
 * @param {*} context 
 */
function Rocket (x, y, width, height, context) {
    this.x = x; // 
    this.y = y;
    this.width = width;
    this.height = height;
    this.update = function () {
        var ctx = context;
        ctx.fillStyle = "red";
        ctx.fillRect(x, y, width, height);
    }
}

export default Rocket;