import React, {useRef, useEffect} from 'react';

const Canvas = props => {
    
    const canvasRef = useRef(null)

    let runOnce = true; // initial fields are set, after this is set to false, values will change via input from users
    let index = 0; // index for current command being executed
    let time = 0; // duration of each action executed
    let angle = 0; // angle of the rocket, 0 is upwards
    let angleChange = -1000;

    let x = 100 // inital x position of the rocket
    let y = 700 // initial y position of the rocket
    let yspeed; // moving y speed of the rocket
    let xspeed; // moving x speed of the rocket

    useEffect(() => {

        // getting the canvas
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const Logic = () => {
            if (runOnce) {
                yspeed = props.fields.yspeed
                xspeed = props.fields.xspeed
            }
            // branch off to do whatever from here, read instructions generated by blockly 
            // (e.g. turnRight, so call method update with turnRight if statement branch executed, etc...)

            runOnce = false; // do not change initial speed again after running once
            setTimeout(()=> {
                if (runOnce) console.log("Next Action: #" + (index))
                // if there is an action, begin executing
                if (index !== props.fields.commands.length) update();
                // draw everything the action has specified
                draw();
                window.requestAnimationFrame(Logic)
                // each action runs for three seconds, once reached, reset and go to next action
                //if (props.fields.ready) console.log(time + ":" +props.fields.commands[index])
                if (time === 200) {
                    time = 0;
                    index++;
                }
                else if (props.fields.ready) {
                    time++;
                }
                
            },10)
        }

        function resetRocket(msg) {
            ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
            index = 0;
            time = 0;
            runOnce = true;
            x = 100;
            y = 700;
            angle = 0;
            xspeed = yspeed = 1;
            window.alert(msg);
        }
        
        function update() {
            // if no more commands
            if (index >= props.fields.commands.length) {
                props.fields.ready = false; // turn off simulation
                // if simulation no longer running, reset graphics and states
                if (!props.fields.ready) {
                    resetRocket('Did not reach destination, resetting...');
                }
                return;
            }
            // if player wants to simulate their commands, and list of commands is not empty, do what they say
            if (!props.fields.ready && props.fields.commands.length > 0) return;

            if (props.fields.commands[index].type === "launch") {
                y -= yspeed;
                console.log('Launching rocket...')
            }

            else if (props.fields.commands[index].type === "descend") {
                y += yspeed;
                console.log("Descending rocket...")
            }
            else if (props.fields.commands[index].type === "yspeed") {
                let userInput;
                for (let i=0; i<props.fields.commands.length; i++){
                    if (props.fields.commands[index].childBlocks_[i].type === 'math_number') {
                        // get the value inputted by user
                        userInput = props.fields.commands[index].childBlocks_[i].inputList[0].fieldRow[0].value_;
                        break;
                    }
                }
                yspeed = userInput;
                time = 200 // setting speed, should not have the game waiting for it to complete its action
                console.log('Now set to y speed: ' + yspeed)
            }

            else if (props.fields.commands[index].type === "xspeed") {
                let userInput;
                for (let i=0; i<props.fields.commands.length; i++){
                    if (props.fields.commands[index].childBlocks_[i].type === 'math_number') {
                        // get the value inputted by user
                        userInput = props.fields.commands[index].childBlocks_[i].inputList[0].fieldRow[0].value_;
                        break;
                    }
                }
                xspeed = userInput;
                time = 200 // setting speed, should not have the game waiting for it to complete its action
                console.log('Now set to x speed: ' + xspeed)
            }

            else if (props.fields.commands[index].type === "stall") {
                x += xspeed;
                y -= yspeed;
                console.log('Performing same action for this turn')
            }

            else if (props.fields.commands[index].type === "right") {
                let userInput;
                for (let i=0; i<props.fields.commands.length; i++){
                    if (props.fields.commands[index].childBlocks_[i].type === 'math_number') {
                        // get the value inputted by user
                        userInput = props.fields.commands[index].childBlocks_[i].inputList[0].fieldRow[0].value_;
                        break;
                    }
                }
                let newA = userInput + angle;
                if (angleChange === -1000) {
                    angleChange = newA;
                }
                newA = angleChange;
                if (angle !== angleChange) {
                    angle++;
                }
                else if (angle === angleChange) {
                    angleChange = -1000;
                    time = 200;
                } 
                x += xspeed;
                y -= yspeed;
                console.log('Turning right');
            }

            else if (props.fields.commands[index].type === "left") {
                let userInput;
                for (let i=0; i<props.fields.commands.length; i++){
                    if (props.fields.commands[index].childBlocks_.length === 0) {
                        continue;
                    }
                    if (props.fields.commands[index].childBlocks_[i].type === 'math_number') {
                        // get the value inputted by user
                        userInput = props.fields.commands[index].childBlocks_[i].inputList[0].fieldRow[0].value_;
                        break;
                    }
                }
                let newA = (-1 * (userInput)) + angle;
                if (angleChange === -1000) {
                    angleChange = newA;
                }
                newA = angleChange;
                if (angle !== angleChange) {
                    angle--;
                }
                else if (angle === angleChange) {
                    angleChange = -1000;
                    time = 200;
                } 
                x -= xspeed;
                y -= yspeed;
                console.log('Turning left')
            }
        }
        
        function draw() {
            ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

            // draw the ground
            ctx.fillStyle = '#EBCB83';
            ctx.fillRect(0, 750, ctx.canvas.width, ctx.canvas.height);
            
            // draw the rocket
            ctx.fillStyle = '#ff8080';
            ctx.save()
            ctx.translate(x+30/2,y+50/2)
            ctx.rotate(angle*Math.PI/180)
            ctx.translate(-(x+30/2),-(y+50/2))
            ctx.fillRect(x, y, 30, 50)
            // draw the rocket's engine flames
            if (props.fields.ready) {
                for (let i=0; i<20; i+=1) {
                    ctx.fillStyle = 'red'
                    ctx.fillRect(x+3+i, y+50+(Math.random()*15+1), 5, 5)
                    ctx.clearRect(x+3+i, y+50+(Math.random()*15+1), 5, 5)
                }
                for (let i=0; i<10; i+=1) {
                    ctx.fillStyle = 'red'
                    ctx.fillRect(x+7+i, y+60+(Math.random()*15+1), 5, 5)
                    ctx.clearRect(x+7+i, y+60+(Math.random()*15+1), 5, 5)
                }
            }
            ctx.restore()

            // mark the destination spot
            ctx.fillStyle = "green";
            ctx.fillRect(500, 750, 100, 10);

            let touchGround = false;
            if (x >= 500 && x <= 600 && y >= 650) {
                if (y < 700) y++;
                if (y >= 700) {
                    y = 700;
                    touchGround = true;
                }
            }

            if (touchGround) {
                resetRocket('Stage Complete!!!');
                props.fields.ready = false; // stop simulation
                return;
            }
            

            if (y < 0 || y > ctx.canvas.height || x < 0 || x > ctx.canvas.width) {
                resetRocket('Rocket out of bounds! Resetting...');
                props.fields.ready = false; // stop simulation
            }
        }

        // get the logics to be drawn on the canvas
        Logic();

        // setting the canvas size
        const {width, height} = canvas.getBoundingClientRect();
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
        }
    }, [])

    return <canvas ref={canvasRef} style={{width: 915, height: 975, backgroundColor: `#1F365C`}} {...props}/>
}


export default Canvas;