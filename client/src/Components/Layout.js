import React from 'react';
import Blockly from 'blockly';

class Layout extends React.Component {

    workspace;

    /**
     * This method allows the workspace to convert blocks into code and display it.
     * @param {*} change 
     */
    javascriptGeneration(change) {
        var generation = Blockly.JavaScript.workspaceToCode(this.workspace);
        document.getElementById('code').value = generation;
    }

    render() {
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
                </xml>
                {/* visual editor */}
                <div className="editor">
                    <div className="blocklyDiv" 
                        style={{width: 1250, height: 1000}} 
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
                        <input id="code" style={{width: 1240, height: 200, fontSize: 36}} placeholder="None"/>
                    </div>
                </div>
                {/* rocket game simulation */}
                <div className="simulation">
                    <h1> YES </h1>
                </div>
            </div>
        );
    }
}

export default Layout;