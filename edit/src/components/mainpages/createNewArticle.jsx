import React, { Component } from 'react';
import Axios from 'axios';

class createNewArticle extends Component {
    state = {
        newPage: '',
        deletePage: '',
        newPageMessage: null,
        deletePageMessage: null,
    }
    saveData = async() => {
        const link = this.state.newPage.replace(/\s/g, '');
        let res = await Axios.post('http://192.168.1.240:3003/createArticle', {name: this.state.newPage, link: link});
        console.log(res);
        const msg = (res.data) ? {message: 'Created Successfully', status: true} : {message: 'Create Failed', status: false};
        this.setState({newPageMessage: msg });
    }
    deletePage = async() => {
        const link = this.state.deletePage.replace(/\s/g, '');
        let res = await Axios.post('http://192.168.1.240:3003/deleteArticle', {name: this.state.deletePage, link: link});
        const msg = (res.data) ? {message: 'Deleted Successfully', status: true} : {message: 'Delete Failed', status: false};
        this.setState({deletePageMessage: msg });
    }
    update = (e, val) => {
        const value = e.target.value;
        const newValue = value.replace(/[^a-zA-Z0-9\s]/g, '');
        this.setState({[val]: newValue});
    }
    render() { 
        const createMsg = (this.state.createMsg == null) ? <br></br> : <div className={'Msg' + this.state.createMsg.status}>{this.state.createMsg.message}</div>
        const deletePageMsg = (this.state.deletePageMessage == null) ? <br></br> : <div className={'Msg' + this.state.deletePageMessage.status}>{this.state.deletePageMessage.message}</div>
        console.log(createMsg)
        return (
        <div className='content'>
            <br></br>
            New Article Title: 
            <input
                type='text'
                value={this.state.newPage}
                onChange={(e) => {this.update(e, 'newPage')}}
            />
            <button onClick={this.saveData}>Create</button>
            {createMsg}
            Delete Article:
            <input
                type='text'
                value={this.state.deletePage}
                onChange={(e) => {this.update(e, 'deletePage')}}
            />
            <button onClick={this.deletePage}>Delete</button>
            {deletePageMsg}
            <br></br>
        </div>);
    }
}
 
export default createNewArticle;