import React, { Component } from 'react';

class YouTubePage extends Component {
    state = {
        screenWidth: window.innerWidth
    } 
    componentDidMount() {
        window.addEventListener("resize", this.updateWidth);
    }
    updateWidth = () => {
        this.setState({
          screenWidth: window.innerWidth
        });
    };
    getVideoRenderWidth = () => {
        if(this.state.screenWidth < 650) {
            return this.state.screenWidth * 0.85 - 4;
        }
        else {
            return this.state.screenWidth * 0.70/2 - 4;
        }
    }
    renderInputData() {
        const content = this.props.content.map((data, i) => {     
            if(data.type === 'text') {
                const text = (data.largeText) ? <h1>{data.content}</h1> : <p>{data.content}</p>
                return (
                    <div key={i}>
                        {text}
                    </div>
                )
            }
            else if(data.type === 'image') {
                return (<div key={i}><img src={`http://192.168.1.240:3003/${data.content}`} width={this.getVideoRenderWidth()}></img></div>);
            }
            else if(data.type === 'video') {
                const embedUrl = `https://www.youtube.com/embed/${data.content}`;
                return (<div key={i}>
                    <iframe
                      width={200}
                      height={200 * 0.555}
                      src={embedUrl}
                      title="YouTube Video Player"
                      allowFullScreen
                    ></iframe>
                  </div>);
            }
        });
        content.push(<div key={1200 +"info"}><h1>You can find my YouTube channel here:</h1><a className='hyperlink' href='https://www.youtube.com/@prettymuchflawless-cn1ms'>Pretty Much Flawless</a></div>)

        if(this.props.videos != undefined) {
            const width = this.getVideoRenderWidth();
            content.push(<div key={1200 +"popvids"}><h2>Here are some of my most popular videos:</h2></div>);
            for (let i = 0; i < this.props.videos.popular.length; i++) {
                const video = this.props.videos.popular[i];
                const embedUrl = `https://www.youtube.com/embed/${video.videoId}`;
                content.push(<div key={'vp' + i} style={{display: 'inline-block'}}>
                    <iframe
                        width={width}
                        height={width * 0.555}
                        src={embedUrl}
                        title="YouTube Video Player"
                        allowFullScreen
                    ></iframe>
                </div>)
            }
            content.push(<div key={1200 +"info2"}><h2>Here are some of my most recent videos:</h2></div>);
            for (let i = 0; i < this.props.videos.recent.length; i++) {
                const video = this.props.videos.recent[i];
                const embedUrl = `https://www.youtube.com/embed/${video.videoId}`;
                content.push(<div key={'vr' + i} style={{display: 'inline-block'}}>
                    <iframe
                        width={width}
                        height={width * 0.555}
                        src={embedUrl}
                        title="YouTube Video Player"
                        allowFullScreen
                    ></iframe>
                </div>)
            }
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, "0");
            const day = String(currentDate.getDate()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;
            content.push(<div key={1200 +"date"}>last updated on {formattedDate} at 5:00am</div>);
        }
        return content;
    }
    render() { 
        const input = (this.props.content != null) ? this.renderInputData() : 'loading';
        return input;
    }
}
 
export default YouTubePage;