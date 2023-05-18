import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { Overlay, ModalShow } from "./Modal.styled";

const modal = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() {
        window.addEventListener ('keydown', this.handleKeyDown)
    };

    componentWillUnmount() {
        window.removeEventListener ('keydown', this.handleKeyDown)
    };

    handleKeyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleBackdropClick = event => {
        if (event.target === event.currentTarget) {
            this.props.onClose();
        }
    }

    render() {
        return( createPortal(
                <Overlay
                    onClick={this.handleBackdropClick}>
                    <ModalShow>
                        {this.props.children}
                    </ModalShow>
                </Overlay>,
                modal
        )
        )
    }
    
};

Modal.propTypes = {
    Children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};
