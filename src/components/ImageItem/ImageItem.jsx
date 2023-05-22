
import PropTypes from 'prop-types';
import { Image, ImageGalleryItem } from './ImageItem.styled';

export const ImageItem = ({ pix, toggleModal, onGetModalImg }) => {

    const onClick = () => {
        onGetModalImg(pix.largeImageURL, pix.tags);
        toggleModal();
    };

     
        return (
        <ImageGalleryItem>
            <Image
                onClick={onClick} 
                src={pix.webformatURL}
                alt={pix.tags}
            />
        </ImageGalleryItem>
    )
};
    


ImageItem.propTypes = {
    pix: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
    onGetModalImg: PropTypes.func.isRequired
};