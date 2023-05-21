import { useEffect, useState } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { ImageGallery } from './ImageGallery/ImageGallery';
import './styles.css'
import { Button } from "./Button/Button";
import { getSearchImage } from "api/getSearchImage";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";
export const App = () => {
  const [images, setImages] = useState([]);
  const [findText, setFindText] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(1);
  const [imageURL, setImageURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (error !== '') {
      console.log(error);
    }
  },[error])
  useEffect(() => {    
    if (findText !== ''){
    setIsLoading(true);
    getSearchImage(findText, page)
      .then(data => {
        if (page === 1) {
          setImages([]);
          setImages([...data.hits]);
          setTotalHits(data.totalHits);
          return;
        }
        setImages(prev => [...prev, ...data.hits]);
        })
        .catch(error => {
          setError({ error });
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  }, [findText,page])
  

  const hendlerSavedData = event => {   
    setFindText(event)
    setPage(1)
    setError('')
  };
  const hendlerPageIncrement = () => {    
    setPage((prev) => prev + 1);
  };
  const hendlerClickImage = event => {
    event.preventDefault();
    setImageURL(event.target.attributes[3].value);
    setOpenModal(true);    
    window.addEventListener('keydown', hendlerCloseModalEsc);
  };
  const hendlerCloseModalEsc = event => {
    if (event.key === 'Escape') {
      setOpenModal(false);
      window.removeEventListener('keydown', hendlerCloseModalEsc);
      return;
    }
  };
  const hendlerCloseModalClick = event => {
    if (event.target.className === 'Overlay') {
      setOpenModal(false);
    }
  };
  return (
    <div className="app">
      <Searchbar saved={hendlerSavedData} />
      {openModal && (
        <Modal
          imageURL={imageURL}
          closeModal={hendlerCloseModalClick}
        />
      )}
      <Loader isLoading={isLoading} />
      <ImageGallery>
        <ImageGalleryItem
          data={images}
          onClick={hendlerClickImage}
        />
      </ImageGallery>
      {totalHits !== 0 &&
        totalHits - page * 12 > 0 && (
          <Button click={hendlerPageIncrement} />
        )}
    </div>
  );
}