import React from 'react';
import Blockly from 'blockly';
import Canvas from './Canvas';

// fields to pass to the canvas to draw
let fields = {
    ready: false,
    imageReady: false,
    level: 1,
    commands: []
}

class Layout extends React.Component {

    workspace; // the visual block toolbox
    defined = false; // if the custom blocks have been defined

    /**
     * Before components load, make them first.
     */
    componentWillMount() {
        this.defineBlocks();
        this.defined = true;
    }

    /**
     * Changing relevant fields and get canvas to draw it
     */
    changeFields() {
        fields.ready = true;
        fields.commands = []
        this.javascriptGeneration()
    }

    /**
     * Define the custom blocks.
     */
    defineBlocks() {

        Blockly.Blocks['launch'] = {
            init: function() {
                this.appendDummyInput().appendField('Launch');
                this.setNextStatement(true);
                this.setPreviousStatement(false);
                this.setColour(160);
                this.setTooltip('Projects the rocket upwards at 100km/h vertically. Starts the rocket. Lasts for 3 seconds.');
            }
          };

        Blockly.Blocks['stall'] = {
            init: function() {
                this.appendDummyInput().appendField('Accelerate');
                this.setNextStatement(true);
                this.setPreviousStatement(true);
                this.setColour(160);
                this.setTooltip('Proceed accelerating in the direction that the rocket is facing. Lasts for 3 seconds.');
            }
        };

        Blockly.Blocks['descend'] = {
            init: function() {
                this.appendDummyInput().appendField('Descend');
                this.setNextStatement(true);
                this.setPreviousStatement(true);
                this.setColour(160);
                this.setTooltip('Drop vertically at the specified vertical speed of the rocket. Lasts for 3 seconds.');
            }
        };

        let yspeed = {
            "type": "yspeed",
            "message0": 'Y Speed %1 km/h',
            "args0": [
              {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number"
              }
            ],
            "colour": 70,
          }

          let xspeed = {
            "type": "xspeed",
            "message0": 'X Speed %1 km/h',
            "args0": [
              {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number"
              }
            ],
            "colour": 70,
          }
        
        Blockly.Blocks['yspeed'] = {
            init: function() {
                this.jsonInit(yspeed)
                this.setNextStatement(true);
                this.setPreviousStatement(true);
                this.setTooltip('Sets the vertical speed of the rocket. This is not an action command, hence its completion is instantaneous.');
            }
        };

        Blockly.Blocks['xspeed'] = {
            init: function() {
                this.jsonInit(xspeed)
                this.setNextStatement(true);
                this.setPreviousStatement(true);
                this.setTooltip('Sets the horizontal speed of the rocket. This is not an action command, hence its completion is instantaneous.');
            }
        };

        let right = {
            "type": "right",
            "message0": 'Turn Right %1 Degrees',
            "args0": [
              {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number"
              }
            ],
            "colour": 0,
          }

          let left = {
            "type": "left",
            "message0": 'Turn Left %1 Degrees',
            "args0": [
              {
                "type": "input_value",
                "name": "VALUE",
                "check": "Number"
              }
            ],
            "colour": 0,
          }

        Blockly.Blocks['right'] = {
            init: function() {
                this.jsonInit(right);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip('Turns the rocket in the clockwise direction until the angle is as specified by the input value. Lasts until the goal angle is reached.');
            }
        }

        Blockly.Blocks['left'] = {
            init: function() {
                this.jsonInit(left);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.setTooltip('Turns the rocket in the anti-clockwise direction until the angle is as specified by the input value. Lasts until the goal angle is reached.');
            }
        };
    }

    /**
     * This method allows the workspace to convert blocks into code and display it.
     * @param {*} change 
     */
    javascriptGeneration() {

        // all the instructions in the blockly editor
        var obj = this.workspace.getAllBlocks();
        var list = Object.values(obj);
        // re-initialise commands list so no duplicates of the same things when event is triggered
        fields.commands = []
        // parse to get the blocks
        for (let i=0; i<list.length; i++) {
            // dont add any value input blocks
            if (list[i].type !== "math_number") {
                fields.commands.push(list[i])
            }
        }
    }

    render() {
        return (
            <div className="wrapper">
                {/* blocks for visual programming */}
                <xml id="toolbox" style={{display: `none`}}>
                    {/* <block type="controls_if"></block>
                    <block type="controls_repeat_ext"></block>
                    <block type="logic_compare"></block>
                    
                    <block type="math_arithmetic"></block>
                    <block type="text"></block>
                    <block type="text_print"></block> */}
                    <category name="Major Rocket Commands" colour="160">
                        { this.defined && <block type="launch"></block>}
                        { this.defined && <block type="stall"></block>}
                        { this.defined && <block type="descend"></block>}
                    </category>

                    <category name="Set Rocket Speed" colour="70">
                        { this.defined && <block type="yspeed"></block>}
                        { this.defined && <block type="xspeed"></block>}
                    </category>
                    <category name="Turning Rocket" colour="0">
                        { this.defined && <block type="left"></block>}
                        { this.defined && <block type="right"></block>}
                    </category>
                    
                    <category name="Value Input" colour="230">
                        <block type="math_number"></block>
                    </category>
                    <category name="Conditionals" colour="200">
                        <block type="controls_if"></block>
                        <block type="logic_compare"></block>
                    </category>

                </xml>
                <div className="elements">
                    <div className="cover">
                        <img width="1" height="1" alt=""></img>
                    </div>
                    {/* visual editor */}
                    <div className="editor">
                        <div className="blocklyDiv" 
                            style={{width: `100%`, height: 1000}} 
                            ref={(ref) => {
                                this.workspace = Blockly.inject(ref,
                                {toolbox: document.getElementById('toolbox')});
                            }}
                            // content changes after dragging and dropping
                            // onMouseMove={() => this.javascriptGeneration()} 
                            // onClick={() => this.javascriptGeneration()}
                            // onBlur={() => this.javascriptGeneration()}
                            >
                        </div>
                        {/* code generated from editor
                        <div style={{margin: 10}}>
                            <h1 style={{color: `grey`}}> Code Generated From Above </h1>
                            <input id="code" style={{width: 800, height: 200, fontSize: 36}} placeholder="None"/>
                        </div> */}
                    </div>
                    {/* rocket game simulation */}
                    <div className="simulation">
                        <div style={{display: 'flex', zIndex: 10, marginBottom: 5}}>
                            <button type="button" className="btn btn-success" style={{width: 100, height: 33, zIndex: 10, marginRight: 3, marginLeft: 3, margin: 2, fontFamily: `Arial`, fontWeight: `bolder`}} onClick={() => {this.changeFields();}}>Run</button>
                            <button type="button" className="btn btn-primary" style={{width: 100, height: 33, zIndex: 10, marginRight: 3, marginLeft: 3, margin: 2, fontFamily: `Arial`, fontWeight: `bolder`}} onClick={() => {fields.ready = false}}>Pause</button>
                            <button type="button" className="btn btn-info" style={{width: 150, height: 33, zIndex: 10, marginRight: 3, margin: 2, marginLeft: 390, fontFamily: `Arial`, fontWeight: `bolder`}} onClick={() => {if (fields.level > 1) fields.level -= 1}}>Prev Level</button>
                            <button type="button" className="btn btn-info" style={{width: 150, height: 33, zIndex: 10, marginRight: 3, margin: 2, marginLeft: 10, fontFamily: `Arial`, fontWeight: `bolder`}} onClick={() => {if (fields.level < 3) fields.level += 1}}>Next Level</button>
                        </div>
                        <Canvas id="canvas" fields={fields}/>
                        <img id="rocket" src="https://webstockreview.net/images/clipart-rocket-animation-12.png" width="30" height="50" hidden onload={() => {fields.imageReady = true}}></img>
                        <img id="grass" src="https://freesvg.org/img/grass-layered.png" width="20" height="20" hidden onload={() => {fields.imageReady = true}}></img>
                        <img id="ground" src="https://t3.ftcdn.net/jpg/02/57/58/20/240_F_257582025_LUf6zGRPA0x0OGaLFS1UJIgkRKrrZhAk.jpg" width="20" height="20" hidden onload={() => {fields.imageReady = true}}></img>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Layout;