import React, { Component } from 'react';
import Axios from 'axios';
import YouTube from './youtube';
import './styling/page.css';

class ShowPage extends Component {
    state = {
        content: null,
        videos: null,
        screenWidth: window.innerWidth
    } 
    componentDidMount() {
        window.addEventListener("resize", this.updateWidth);
        this.getPage();
    }
    componentDidUpdate(prevProps) {
        if (this.props.currentLink !== prevProps.currentLink) {
            this.getPage();
        }
    }
    updateWidth = () => {
        this.setState({
          screenWidth: window.innerWidth
        });
    };
    async getPage() {
        try {
            const path = this.props.currentLink;
            document.title = ((path == '') ? 'Home' : path) + ' - Pretty Much Flawless';
            let res = await Axios.post('http://192.168.1.240:3003/getPage', {link: path});
            this.processContent(res.data);
            if(path == "Articles") {
                const articles = await Axios.post('http://192.168.1.240:3003/getAllArticles', {});
                this.addArticles(articles.data);
            }
        }
        catch(error) {
            console.log(error);
        }
    }
    addArticles = (data) => {
        var newContent = [...this.state.content];
        const len = newContent.length;
        for (let i = 0; i < data.length; i++) {
            const article = data[i];
            newContent.push({id: len + i, type: 'article', name: article.name, link: 'article/' + article.link})
        }
        this.setState({
            content: newContent,
        });
    }
    processContent = (data) => {
        if(data != null) {
            const content = JSON.parse(data.layout);
            const text = content.text;
            const image = content.image;
            const video = content.video;
            var newContent = [];
            let index = 0;
            let largestIndex = text.length + image.length + video.length;
            while (index <= largestIndex) {
                for (let i = 0; i < text.length; i++) {
                    if(text[i].id == index) {
                        newContent.push({id: index, type: 'text', content: text[i].content, largeText: (text[i].largeText == null) ? false : true});
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
            const webscrapedVideos = (data.videos == undefined) ? null : data.videos;
            this.setState({
                content: newContent,
                videos: webscrapedVideos
            });
        }
    }
    renderInputData() {
        if(this.props.currentLink == "YouTube") {
            return <YouTube content={this.state.content} videos={this.state.videos} getWidthElements={this.getWidthElements}/>
        }
        else {
            const content = this.state.content.map((data, i) => {     
                if(data.type === 'text') {
                    const text = (data.largeText) ? <h1>{data.content}</h1> : <p>{data.content}</p>
                    return (
                        // onClick={(this.state.deleteMode) ? null : this.delete()}
                        <div key={i}>
                            {text}
                        </div>
                    )
                }
                else if(data.type === 'image') {
                    return (<div key={i}><img src={`http://192.168.1.240:3003/${data.content}`} width={this.getWidthElements()}></img></div>);
                }
                else if(data.type === 'article') {
                    return (<div key={i}><a href={data.link}>{data.name}</a></div>);
                }
                else if(data.type === 'video') {
                    const embedUrl = `https://www.youtube.com/embed/${data.content}`;
    
                    return (<div key={i}>
                        <iframe
                          width={this.getWidthElements()}
                          height={this.getWidthElements() * 0.555}
                          src={embedUrl}
                          title="YouTube Video Player"
                          allowFullScreen
                        ></iframe>
                      </div>);
                }
            });
            return content;
        }
    }
    getWidthElements = () => {
        if(this.state.screenWidth < 650) {
            return this.state.screenWidth * 0.85 - 4;
        }
        else {
            return this.state.screenWidth * 0.70 - 4;
        }
    }
    render() { 
        const input = (this.state.content != null) ? this.renderInputData() : 'loading';
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