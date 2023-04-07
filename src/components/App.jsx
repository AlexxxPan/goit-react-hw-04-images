import { useState, useEffect } from "react";
import ImageGallery from "components/ImageGallery/ImageGallery";
import Modal from "components/Modal/Modal";
import Searchbar from "components/Searchbar/Searchbar";
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';
import fetchImages from 'services/Api';

export default function App() {
const [inputValue, setInputValue] = useState('');
const [images, setImages] = useState([]);
const [page, setPage] = useState(0);
const [largeImage, setLargeImage] = useState('');
const [showModal, setShowModal] = useState(false);
const [isLoading, setIsLoading] = useState(false);
// const [error, setError] = useState(null);
const [hits, setHits ] = useState(0);

useEffect(() => {
  if (!page) {
    return;
  }
  try {
    setIsLoading(true);
    const response = fetchImages(inputValue, page);
    response.then(data => {
      data.data.hits.length === 0
        ? alert('Nothing found')
        : data.data.hits.forEach(({ id, webformatURL, largeImageURL }) => {
            !images.some(image => image.id === id) &&
            setImages(images => [...images, { id, webformatURL, largeImageURL }]);
          });
            setHits(data.data.hits.length);
            setIsLoading(false);
    });
  } catch (error) {
    // setError(error);
    setIsLoading(false);
  }

}, [page, inputValue, images]);

const onSubmit = newInputValue => {
  if (newInputValue.trim() === '') {
    return alert('Enter the meaning for search');
  } else if (newInputValue === inputValue) {
    return;
  }
  setInputValue(newInputValue);
  setPage(1);
  setImages([]);
  };

  const nextPage = () => {
    setPage(page => page + 1);
  };

  const openModal = index => {
    setShowModal(true);
    setLargeImage(images[index].largeImageURL);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div
    style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridGap: '16px',
      paddingBottom: '24px',
    }}>
      <Searchbar onSubmit={onSubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {showModal && (
        <Modal toggleModal={toggleModal} largeImage={largeImage} />
      )}
      {isLoading && <Loader />}
      {hits >= 12 && <Button nextPage={nextPage} />}
    </div>
  );
}
