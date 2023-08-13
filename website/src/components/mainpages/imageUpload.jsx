import React, { Component } from 'react';

class Image extends Component {
    state = {
        id: this.props.id,
        image: null,
        imageURL: null,
        newImage: this.props.newImage
    }
    updateImage = (event) => {
        if(event.target.files[0] == null) {
            this.setState({ 
                image: null,
                imageURL: null,
            });
            this.props.updateImage('', this.state.id);
        }
        else {
            this.setState({ 
                image: event.target.files[0],
                imageURL: URL.createObjectURL(event.target.files[0])
            });
            this.props.updateImage(URL.createObjectURL(event.target.files[0]), this.state.id);
        }
    }
    saveImage() {
        // axios.post('/upload', data)
        //   .then((res) => {
        //     this.setState({ photos: [res.data, ...this.state.photos] });
        // });
    }
    render() {
        console.log(this.state.imageURL);
        console.log(this.props.image)
        console.log(!this.props.new)
        const img = (this.props.image == '') ? <h1>No Image</h1> : ((this.props.new) ? <img src={this.state.imageURL}></img> : <img src={`http://192.168.1.240:3003/${this.props.image}`}></img>);
        return (
            <div>
                <input type='file' onChange={this.updateImage}></input>
                {img}
            </div>
        );
    }
}
 
export default Image;