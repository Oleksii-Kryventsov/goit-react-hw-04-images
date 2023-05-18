import { Component } from "react";
import { ImageItem } from 'components/ImageItem';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';
import { Button } from 'components/Button';
import { fetchImg } from 'services/fetch';
import { GalleryContainer, ImageGalleryList } from 'components/ImageGallery/ImageGallery.styled';
import PropTypes from 'prop-types';

export class ImageGallery extends Component {
    state = {
        response: '',
        error: null,
        status: null,
        showModal: false,
        modalImg: '',
        alt: '',
        page: 1,
    }

    componentDidUpdate(prevProps, prevState) {
        const prevSearchQuery = prevProps.searchQuery;
        const nextSearchQuery = this.props.searchQuery;

        if (prevSearchQuery !== nextSearchQuery) {
            
            this.setState({ status: 'pending' });
            
            fetchImg(nextSearchQuery, 1)
                .then(response => this.setState(prevState => {
                    return {
                        response: response.hits,
                        status: 'resolved',
                        page: prevState.page +1, 
                    }
                }))
                .catch(error => this.setState({ error, status: 'rejected' }));
        };
    };

    toggleModal = () => {
        this.setState(state => ({
            showModal: !state.showModal,
        })); 
    };

    getModalImg = (modalImg, alt) => {
        this.setState({
            modalImg,
            alt,
        })
    };

    loadMore = () => {
            fetchImg(this.props.searchQuery, this.state.page)
            .then(nextResponse => this.setState(prevState => {
                return {
                    response: [...prevState.response, ...nextResponse.hits],
                    page: prevState.page + 1,
                }
            })  
            )
            .catch(error => this.setState({ error, status: 'rejected' }));
    };

    render() {
        const { response, error, status } = this.state;

        if (status === 'pending') {
            return  <GalleryContainer>
                        <Loader />
                    </GalleryContainer>
        };

        if (status === 'rejected') {
            return <h1>{error.message}</h1>
        };

        if (status === 'resolved')
            return <div>
                        <ImageGalleryList>
                            {response.map(pix =>
                                <ImageItem
                                    onGetModalImg={this.getModalImg}
                                    toggleModal={this.toggleModal}
                                    key={pix.id}
                                    pix={pix}
                                />
                                )}
                        </ImageGalleryList>
                
                        <GalleryContainer>       
                        <Button onClick={this.loadMore}>Load more</Button>
                        </GalleryContainer>
                
                        {this.state.showModal &&
                            <Modal
                                onClose={this.toggleModal}>
                                    <img
                                        src={this.state.modalImg}
                                        alt={this.state.alt}
                                    />
                            </Modal>}
                    </div>
        };
};

ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired
};


