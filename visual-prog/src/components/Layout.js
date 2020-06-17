import React from 'react';
import Simulation from './Simulation';

/**
 * Constructs the page in which will hold the blockly editor, the simulation canvas and other elements necessary.
 */
class Layout extends React.Component {
    // render method
    render() {
        return (
            // creates the div that creates the page
            <div className="wrapper">
                {/* section that holds the editor */}
                <div className="project-half-1">
                    <h1> Blockly Editor </h1>
                </div>

                {<Simulation />}

                {/* section that holds the visual blocks */}
                <div className="project-commands">
                    <h1> Commands </h1>
                </div>
            </div>
        );
    }
}

export default Layout;