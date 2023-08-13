import React, { Component } from 'react';
import Axios from 'axios';

class TestComp extends Component {
    async sendTestData1() {
        console.log("yo");
        try {
            let res = await Axios.post('http://192.168.1.240:3003/getAllPageNames', {text: "you bro"});
            console.log(res);
        }
        catch(error) {
            console.log(error);
        }
    }
    render() { 
        return (<button onClick={this.sendTestData1}>Send Data test</button>);
    }
}
 
export default TestComp;