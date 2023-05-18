import { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ImageGalleryItem } from './ImageItem.styled';

export class ImageItem extends Component {

    onClick = () => {
        this.props.onGetModalImg(this.props.pix.largeImageURL, this.props.pix.tags);
        this.props.toggleModal();
    };

    render() { 
        return (
        <ImageGalleryItem>
            <Image
                onClick={this.onClick} 
                src={this.props.pix.webformatURL}
                alt={this.props.pix.tags}
            />
        </ImageGalleryItem>
    )
    }
};

ImageItem.propTypes = {
    pix: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    onGetModalImg: PropTypes.func.isRequired
};
