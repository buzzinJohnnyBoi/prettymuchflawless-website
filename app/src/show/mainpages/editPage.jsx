import React, { Component } from 'react';
import Image from './imageUpload';
import Axios from 'axios';
import './page.css';
class EditPage extends Component {
    state = { 
        content: null,
        text: [

        ],
        image: [

        ],
        video: [

        ],
        deleteMode: false

    } 
    componentDidMount() {
        this.getPage();
    }
    saveData = async() => {
        const content = this.state.content;
        let text = [];
        let image = [];
        let video = [];

        for (let i = 0; i < content.length; i++) {
            if(content[i].type == 'text') {
                text.push({id: i + 1, content: content[i].content});
            }
            else if(content[i].type == 'image') {
                image.push({id: i + 1, content: content[i].content});
            }
            else if(content[i].type == 'video') {
                video.push({id: i + 1, content: content[i].content});
            }
        }
        const sendData = JSON.stringify({
            text: text,
            image: image,
            video: video,
        });
        const currentPath = window.location.pathname;
        const path = currentPath.substring(1, currentPath.length);
        let res = await Axios.post('http://192.168.1.240:3003/updatePage', {layout: sendData, link: path});
        this.processContent(res.data);
    }
    componentDidUpdate(prevProps) {
        if (this.props.currentLink !== prevProps.currentLink) {
          this.getPage();
        }
    }
    async getPage() {
        try {
            const currentPath = window.location.pathname;
            const path = this.props.currentLink;
            console.log(path)
            let res = await Axios.post('http://192.168.1.240:3003/getPage', {link: path});
            this.processContent(res.data);
        }
        catch(error) {
            console.log(error);
        }
    }
    processContent = (data) => {
        if(data != null) {
            const content = JSON.parse(data.layout);
            const text = content.text;
            const image = content.image;
            const video = content.video;
            var newContent = []
            let index = 0;
            let largestIndex = text.length + image.length + video.length;
            while (index <= largestIndex) {
                for (let i = 0; i < text.length; i++) {
                    if(text[i].id == index) {
                        newContent.push({id: index, type: 'text', content: text[i].content});
                        break;
                    }
                }
                for (let i = 0; i < image.length; i++) {
                    if(image[i].id == index) {
                        newContent.push({id: index, type: 'image', content: image[i].content});
                        break;
                    }
                }
                for (let i = 0; i < video.length; i++) {
                    if(video[i].id == index) {
                        newContent.push({id: index, type: 'video', content: video[i].content});
                        break;
                    }
                }
                index++;
            }
            this.setState({
                content: newContent,
                text: content.text,
                image: content.image,
                video: content.video,
            });
        }
    }
    update = (e, i) => {
        const content = this.state.content;
        const updatedContent = [...content];
        updatedContent[i].content = e.target.value;
        console.log(updatedContent)

        this.setState({ content: updatedContent });
    }
    renderInputData() {
        const content = this.state.content.map((data, i) => {     
            if(data.type === 'text') {
                return (
                    // onClick={(this.state.deleteMode) ? null : this.delete()}
                    <div key={i} onClick={(!this.state.deleteMode) ? null : () => this.delete(i)}>
                        <textarea value={data.content} onChange={(e) => this.update(e, i)}></textarea>
                    </div>
                )
            }
            else if(data.type === 'image') {
                return (
                    <div key={i} onClick={(!this.state.deleteMode) ? null : () => this.delete(i)}>
                        <Image />
                    </div>
                );
            }
            else if(data.type === 'video') {
                const embedUrl = `https://www.youtube.com/embed/${data.content}`;
                return (<div key={i} onClick={(!this.state.deleteMode) ? null : () => this.delete(i)}>
                    <iframe
                      width={200}
                      height={200}
                      src={embedUrl}
                      title="YouTube Video Player"
                      allowFullScreen
                    ></iframe>
                    <input type='text' value={data.content} onChange={(e) => this.update(e, i)}></input>
                  </div>);
            }
        });
        return content;
    }
    createText = () => {
        const content = this.state.content;
        const updatedContent = [...content];
        updatedContent.push({id: updatedContent[updatedContent.length - 1].id + 1, type: 'text', content: ''});
        console.log(updatedContent)
        this.setState({
            content: updatedContent
        });
    }
    createImage = () => {
        const content = this.state.content;
        const updatedContent = [...content];
        updatedContent.push({id: updatedContent[updatedContent.length - 1].id + 1, type: 'image', content: ''});
        console.log(updatedContent)
        this.setState({
            content: updatedContent
        });
    }
    createYTvideo = () => {
        const content = this.state.content;
        const updatedContent = [...content];
        updatedContent.push({id: updatedContent[updatedContent.length - 1].id + 1, type: 'video', content: ''});
        console.log(updatedContent)
        this.setState({
            content: updatedContent
        });
    }
    delete(index) {
        const content = this.state.content;
        const updatedContent = [...content];
        for (let i = 0; i < content.length; i++) {
            if(index == i) {
                updatedContent.splice(i, 1);
                break;
            }
        }
        this.setState({
            content: updatedContent
        });
    }
    deleteMode = () => {
        const newMode = (this.state.deleteMode) ? false : true;
        this.setState({deleteMode: newMode});
    }
    render() { 
        const input = (this.state.content != null) ? this.renderInputData() : 'loading';
        const deleteBtn = (!this.state.deleteMode) ? (<button onClick={this.deleteMode}>Delete Mode</button>) : (<button onClick={this.deleteMode}>Stop Delete</button>);
        return (
            <div className='content'>  
                <div className='edit'>
                    {input}
                </div>
                <div className='tools'>
                    <button onClick={this.createText}>Add Text box</button><br></br>
                    <button onClick={this.createImage}>Add Image</button><br></br>
                    <button onClick={this.createYTvideo}>Add YouTube Video</button><br></br>
                    {deleteBtn}<br></br>
                    <button onClick={this.saveData}>Save</button><br></br>
                </div>
            </div>
        );
    }

}
 
export default EditPage;