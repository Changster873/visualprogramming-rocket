import React from 'react';
import Blockly from 'blockly';
import Canvas from './Canvas';

// fields to pass to the canvas to draw
let fields = {
    yspeed: 1,
    xspeed: 1,
    ready: false,
    commands: []
}

// changing relevant fields and get canvas to draw it
const changeFields = () => {
    fields.ready = true
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
     * Define the custom blocks.
     */
    defineBlocks() {

        Blockly.Blocks['launch'] = {
            init: function() {
                this.appendDummyInput().appendField('Launch');
                this.setNextStatement(true);
                this.setPreviousStatement(false);
                this.setColour(160);
            }
          };

        Blockly.Blocks['stall'] = {
            init: function() {
                this.appendDummyInput().appendField('Stall');
                this.setNextStatement(true);
                this.setPreviousStatement(true);
                this.setColour(160);
            }
        };

        Blockly.Blocks['descend'] = {
            init: function() {
                this.appendDummyInput().appendField('Descend');
                this.setNextStatement(true);
                this.setPreviousStatement(true);
                this.setColour(160);
            }
        };
        
        Blockly.Blocks['yspeed'] = {
            init: function() {
                this.appendValueInput('VALUE')
                    .setCheck('Number')
                    .appendField('Y Speed')
                this.setNextStatement(true);
                this.setPreviousStatement(true);
                this.setColour(160);
            }
        };

        Blockly.Blocks['xspeed'] = {
            init: function() {
                this.appendValueInput('VALUE')
                    .setCheck('Number')
                    .appendField('X Speed')
                this.setNextStatement(true);
                this.setPreviousStatement(true);
                this.setColour(160);
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
            "colour": 160,
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
            "colour": 160,
          }

        Blockly.Blocks['right'] = {
            init: function() {
                this.jsonInit(right);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
            }
        }

        Blockly.Blocks['left'] = {
            init: function() {
                this.jsonInit(left);
                this.setPreviousStatement(true);
                this.setNextStatement(true);
            }
        };
    }

    /**
     * This method allows the workspace to convert blocks into code and display it.
     * @param {*} change 
     */
    javascriptGeneration() {

        // all the instructions in the blockly editor
        var obj = this.workspace.blockDB_;
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
                    <block type="math_number"></block>
                    { this.defined && <block type="launch"></block>}
                    { this.defined && <block type="yspeed"></block>}
                    { this.defined && <block type="xspeed"></block>}
                    { this.defined && <block type="left"></block>}
                    { this.defined && <block type="right"></block>}
                    { this.defined && <block type="stall"></block>}
                    { this.defined && <block type="descend"></block>}
                </xml>
                <div className="elements">
                    {/* visual editor */}
                    <div className="editor">
                        <div className="blocklyDiv" 
                            style={{width: 800, height: 1000}} 
                            ref={(ref) => {
                                this.workspace = Blockly.inject(ref,
                                {toolbox: document.getElementById('toolbox')});
                            }}
                            // content changes after dragging and dropping
                            onMouseMove={() => this.javascriptGeneration()} 
                            onClick={() => this.javascriptGeneration()}
                            onBlur={() => this.javascriptGeneration()}
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
                    <button style={{width: 100, zIndex: 10}} onClick={() => {changeFields();}}>Run/Start</button>
                    <button style={{width: 100, zIndex: 10}} onClick={() => {fields.ready = false}}>Pause</button>
                        <Canvas fields={fields}/>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Layout;