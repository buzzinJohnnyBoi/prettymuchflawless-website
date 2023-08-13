import React, { Component } from 'react';
import Axios from 'axios';
import './page.css';

class ShowPage extends Component {
    state = {
        content: null,
    } 
    componentDidMount() {
        this.getPage();
    }
    componentDidUpdate(prevProps) {
        if (this.props.currentLink !== prevProps.currentLink) {
            this.getPage();
        }
    }
    async getPage() {
        try {
            const path = this.props.currentLink;
            document.title = ((path == '') ? 'Home' : path) + ' - Pretty Much Flawless';
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
            console.log(content);
            const text = content.text;
            const image = content.image;
            const video = content.video;
            var newContent = [];
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
            console.log(newContent);
            this.setState({
                content: newContent,
            });
        }
    }
    renderInputData() {
        const content = this.state.content.map((data, i) => {     
            if(data.type === 'text') {
                return (
                    // onClick={(this.state.deleteMode) ? null : this.delete()}
                    <div key={i}>
                        <h1>{data.content}</h1>
                    </div>
                )
            }
            else if(data.type === 'image') {
                return (<div key={i}><img src={`http://192.168.1.240:3003/${data.content}`}></img></div>);
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
                  </div>);
            }
        });
        return content;
    }
    render() { 
        const input = (this.state.content != null) ? this.renderInputData() : 'loading';
        console.log(input);
        return (
            <div className='page'>
                <div className='content'>
                    {input}
                </div>
            </div>
        );
    }
}
 
export default ShowPage;