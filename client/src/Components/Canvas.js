import React, {useRef} from 'react';

function Canvas() {
    const canvas = useRef(null);
    const obj = canvas.current;
    const ctx = obj.getContext('2d');

    return (
        <canvas id="canvas" width="800" height="1000" style={{backgroundColor: `black`}}/>
    );
}
export default Canvas;