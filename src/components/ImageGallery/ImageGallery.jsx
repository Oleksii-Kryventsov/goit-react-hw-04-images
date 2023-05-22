import React, { useState, useEffect } from "react";
import { ImageItem } from 'components/ImageItem';
import { Loader } from 'components/Loader';
import { Modal } from 'components/Modal';
import { Button } from 'components/Button';
import { fetchImg } from 'services/fetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { GalleryContainer, ImageGalleryList } from 'components/ImageGallery/ImageGallery.styled';
import PropTypes from 'prop-types';

export const ImageGallery = ({ searchQuery }) => {

    const [response, setResponse] = useState('');
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalImg, setModalImg] = useState('');
    const [alt, setAlt] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {

        if (searchQuery === '') {
            return
        };

        setStatus('pending');

        fetchImg(searchQuery, 1)
            .then(response => {

                if (response.total === 0) {
                    Notify.warning('Nothing was found for your request');
                    setStatus(null);
                    return
                }
                setResponse(response.hits);
                setStatus('resolved');
                setPage(state => state + 1);
                })
            .catch(error => {
                setError(error);
                setStatus('rejected')
                });

    },[searchQuery]);

    const toggleModal = () => {
        setShowModal(!showModal); 
    };

    const getModalImg = (modalImg, alt) => {
        setModalImg(modalImg);
        setAlt(alt);
    };


    const loadMore = () => {
        
        fetchImg(searchQuery, page)
            .then(nextResponse => {
                console.log('old', response);
                console.log('new', nextResponse.hits);
                setResponse([...response, ...nextResponse.hits]);
                setPage(state => state + 1);
            })
            .catch(error => {
                setError(error);
                setStatus('rejected')
                });
    };


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
                                    onGetModalImg={getModalImg}
                                    toggleModal={toggleModal}
                                    key={pix.id}
                                    pix={pix}
                                />
                                )}
                        </ImageGalleryList>
                
                        <GalleryContainer>       
                        <Button onClick={loadMore}>Load more</Button>
                        </GalleryContainer>
                
                        {showModal &&
                            <Modal
                                onClose={toggleModal}>
                                    <img
                                        src={modalImg}
                                        alt={alt}
                                    />
                            </Modal>}
                    </div>
    };


ImageGallery.propTypes = {
    searchQuery: PropTypes.string.isRequired
};


