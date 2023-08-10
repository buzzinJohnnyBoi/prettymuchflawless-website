import React, { Component } from 'react';

class Image extends Component {
    state = {
        image: null,
        imageURL: null
    }
    updateImage = (event) => {
        if(event.target.files[0] == null) {
            this.setState({ 
                image: null,
                imageURL: null,
            });
        }
        else {
            this.setState({ 
                image: event.target.files[0],
                imageURL: URL.createObjectURL(event.target.files[0])
            });
        }
    }
    saveImage() {
        // axios.post('/upload', data)
        //   .then((res) => {
        //     this.setState({ photos: [res.data, ...this.state.photos] });
        // });
    }
    render() {
        const img = (this.state.imageURL == null) ? <h1>No Image</h1> : <img src={this.state.imageURL}></img>;
        return (
            <div>
                <input type='file' onChange={this.updateImage}></input>
                {img}
            </div>
        );
    }
}
 
export default Image;