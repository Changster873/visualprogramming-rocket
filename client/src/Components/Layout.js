import React, {useRef} from 'react';
import Blockly from 'blockly';
import Canvas from './Canvas';

class Layout extends React.Component {

    workspace; // the visual block toolbox
    defined = false; // if the custom blocks have been defined

    /**
     * Before components load, make them first.
     */
    componentWillMount() {
        this.defineLaunch();
        this.defined = true;
    }

    /**
     * Define the Launch block.
     */
    defineLaunch() {

        Blockly.Blocks['launch'] = {
            init: function() {
            this.appendDummyInput().appendField('Launch');
              this.setNextStatement(true);
              this.setPreviousStatement(false);
              this.setColour(160);
              this.setOutput(true, String)
            }
          };

        Blockly.JavaScript['launch'] = function(block) {
            var arg0 = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_FUNCTION_CALL) || '\'\'';
            return ['var rocket = new Rocket(); \n rocket.launch()', Blockly.JavaScript.ORDER_MEMBER];
        }
    }

    /**
     * This method allows the workspace to convert blocks into code and display it.
     * @param {*} change 
     */
    javascriptGeneration(change) {
        var generation = Blockly.JavaScript.workspaceToCode(this.workspace);
        document.getElementById('code').value = generation;
    }

    render() {
        console.log(this.defined);
        return (
            <div className="wrapper">
                {/* blocks for visual programming */}
                <xml id="toolbox" style={{display: `none`}}>
                    <block type="controls_if"></block>
                    <block type="controls_repeat_ext"></block>
                    <block type="logic_compare"></block>
                    <block type="math_number"></block>
                    <block type="math_arithmetic"></block>
                    <block type="text"></block>
                    <block type="text_print"></block>
                    { this.defined && <block type="launch"></block>}
                </xml>
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
                    {/* code generated from editor */}
                    <div style={{margin: 10}}>
                        <h1 style={{color: `grey`}}> Code Generated From Above </h1>
                        <input id="code" style={{width: 800, height: 200, fontSize: 36}} placeholder="None"/>
                    </div>
                </div>
                {/* rocket game simulation */}
                <div className="simulation">
                    <Canvas />
                </div>
            </div>
        );
    }
}

export default Layout;