import React, { Component } from 'react';
import EditPage from './editPage';
import ShowPage from './showPage';

class Page extends Component {
    state = {
        editMode: false,
    } 
    render() {
        const page = (this.state.editMode) ? <EditPage /> : <ShowPage />; 
        return page;
    }
}
 
export default Page;