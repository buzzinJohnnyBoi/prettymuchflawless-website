import React, { Component } from 'react';
import './footer.css';

class Footer extends Component {
    render() { 
        const date = new Date();
        const year = date.getFullYear();
        return (
            <div className='footer'>
                <p>Copyright {year} prettymuchflawless.com</p>
                <div className='line'></div>
                <p>Web Hosting + Development by John Campbell</p>
            </div>
        );
    }
}
 
export default Footer;