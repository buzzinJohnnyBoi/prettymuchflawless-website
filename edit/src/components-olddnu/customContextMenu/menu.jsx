import React, { Component } from 'react';

import './menu.css';

class CustomContentMenu extends Component {
    setCoords = (x, y) => {
        console.log(x);
        console.log(y);
    }
    getStyle = () => {
        const display = (this.props.visable) ? 'block' : 'none';
        console.log(this.props.visable)
        return {left: this.props.x + 'px', top: this.props.y + 'px', display: display}
    }
    render() { 
        const style = this.getStyle();
        return (
            <div className='menu' style={style}>
                <li>Add</li>
                <li>Slice</li>
                <li>Something</li>
            </div>
        );
    }
}
 
export default CustomContentMenu;