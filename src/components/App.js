import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import fetchImages from '../services/images-api';
import Searchbar from './images/searchbar/Searchbar';
import ImageGallery from './images/imageGallery/ImageGallery';
import Loader from './images/loader/Loader';
import Error from './images/error/Error';
import Button from './images/button/Button';
import Modal from './images/modal/Modal';

function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (imageName !== '') {
      setStatus('pending');

      imagesFetchApi();
    }
  }, [imageName]);

  const imagesFetchApi = () => {
    fetchImages(imageName, page)
      .then(images => {
        setImages(state => [...state, ...images]);
        setPage(state => state + 1);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setImages([]);
    setPage(1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const openLargeImg = largeImageURL => {
    setLargeImageURL(largeImageURL);

    toggleModal();
  };

  if (status === 'idle') {
    return <Searchbar onFormSubmit={handleFormSubmit} />;
  }

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <Error message={error.message} />;
  }

  if (status === 'resolved') {
    return (
      <div>
        <Searchbar onFormSubmit={handleFormSubmit} />
        <ImageGallery images={images} onOpenLargeImg={openLargeImg} />

        {images.length > 0 && <Button onLoadMoreClick={imagesFetchApi} />}

        {showModal && (
          <Modal onToggleModal={toggleModal} showModal={showModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
