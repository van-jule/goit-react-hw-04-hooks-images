import { Component } from 'react';

export default class ImageGalleryItem extends Component {
  render() {
    return (
      <li className="ImageGalleryItem" id={this.props.id}>
        <img
          src={this.props.src}
          alt={this.props.alt}
          className="ImageGalleryItem-image"
          onClick={this.props.showImageFunc}
        />
      </li>
    );
  }
}
