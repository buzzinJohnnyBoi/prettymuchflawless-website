import React, { Component } from 'react';
import EditPage from './editPage';
import ShowPage from './showPage';
import './page.css';

class Page extends Component {
    state = {
        editMode: true,
    }
    
    render() {
        console.log(this.props.currentLink)
        const page = (this.state.editMode) ? <EditPage currentLink={this.props.currentLink}/> : <ShowPage currentLink={this.props.currentLink}/>; 
        return <div className='page'>{page}</div>;
    }
}
 
export default Page;