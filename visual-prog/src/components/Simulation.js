import Rocket from './Rocket';

function Simulation () {

    var rocket;
    var ctx;

    console.log(document.body)

    var game = {
        canvas: document.createElement("canvas"),
        start: function () {
            this.canvas.width = 1400;
            this.canvas.height = 900;
            this.context = this.canvas.getContext('2d');
            var div = document.createElement('div');
            div.setAttribute("class","project-half-2");
            div.appendChild(this.canvas);
            document.body.childNodes[3].childNodes[0].childNodes[0].insertBefore(div, document.body.childNodes[3].childNodes[0].childNodes[0].childNodes[1])
            this.interval = setInterval(this.updateGame, 20);
        },
        clear: function () {
            this.context.clearRect(0, 0, 1400, 900);
        }
    };

    function startGame () {
        game.start();
        rocket = new Rocket(100, 600, 100, 100, game.canvas.getContext('2d'));
    }

    function updateGame () {
        game.clear();
        rocket.update();
    }

    return null;
}

export default Simulation;