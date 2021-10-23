import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyDownHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDownHandler);
  }

  keyDownHandler = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  OnOverlayHandler = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.OnOverlayHandler}>
        <div className="Modal">
          <img src={this.props.maxImage} alt="" />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
