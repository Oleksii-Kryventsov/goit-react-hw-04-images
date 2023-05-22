import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { Overlay, ModalShow } from "./Modal.styled";
import React, { useEffect } from "react";

const modal = document.querySelector('#modal-root');

export const Modal = ({children, onClose}) => {

    const handleBackdropClick = event => {
        if (event.target === event.currentTarget) onClose();
    };

    useEffect(() => {
        const handleEscDown = event => {
            if (event.code === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleEscDown);

        return () => {
            document.removeEventListener('keydown', handleEscDown);
        }
    }, [onClose]);


    function handleKeyDown (event) {
        if (event.code === 'Escape') {
            onClose();
        }
    };
window.addEventListener('keydown', handleKeyDown);
    
    return( createPortal(
                <Overlay
                    onClick={handleBackdropClick}>
                    <ModalShow>
                        {children}
                    </ModalShow>
                </Overlay>,
                modal
        )
        )
};
    

Modal.propTypes = {
    Children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};
