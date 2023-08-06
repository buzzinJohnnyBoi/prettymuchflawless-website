import React, { Component } from 'react';
import Axios from 'axios';

class CreateNew extends Component {
    state = {
        newPage: '',
    }
    saveData = async() => {
        const link = this.state.newPage.replace(/\s/g, '');
        let res = await Axios.post('http://192.168.1.240:3003/create', {name: this.state.newPage, link: link});
        this.processContent(res.data);
    }
    update = (e) => {
        const value = e.target.value;
        const newValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
        this.setState({newPage: newValue});
    }
    render() { 
        return (
        <div className='content'>
            New Page Name: 
            <input
                type='text'
                value={this.state.newPage}
                onChange={this.update}
            />
            <button onClick={this.saveData}>Create</button><br></br>
        </div>);
    }
}
 
export default CreateNew;