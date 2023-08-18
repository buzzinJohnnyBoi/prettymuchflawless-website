import React, { Component } from 'react';

class elementSeparator extends Component {
    render() { 
        return (
            <div className='lineBreak'>
                <button onClick={() => {this.props.createText(this.props.id)}}>Add Text box</button>
                <button onClick={() => {this.props.createImage(this.props.id)}}>Add Image</button>
                <button onClick={() => {this.props.createYTvideo(this.props.id)}}>Add YouTube Video</button>
            </div>
        );
    }
}
 
export default elementSeparator;