import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Container, Chip, Text } from './App.styled';
import { fetchGallery } from 'components/fetch/fetch';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Spinner } from 'components/Spinner/Spinner';
import { Searchbar } from 'components/Searchbar/Searchbar';
import  Modal from 'components/Modal/Modal';
import { Button } from 'components/Button/Button'; 





export function App() {

  const [imageGallery, setImageGallery] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [largeUrl, setLargeUrl] = useState(null);
  const [tag, setTag] = useState(null);
  const [isEmpty, setIsEmpty] = useState(null);


  useEffect(() => {
    if (!searchQuery) return;
    const imgGalleryList = async (searchQuery, page) => {
      setIsLoader(true);
      try {
        const { hits, totalHits } = await fetchGallery(searchQuery, page);
        if (hits.length === 0) {
          setIsEmpty(true);
        }
        setImageGallery(prevImageGallery => [...prevImageGallery, ...hits]);
        setIsVisible(page < Math.ceil(totalHits / 12));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoader(false);
      }
    };
    imgGalleryList(searchQuery, page);
  }, [searchQuery, page]);


  const loadMore = () => {
    setPage(() => page + 1);
  };
 
  const openModal = (url, alt) => {
    setLargeUrl(url);
    setTag(alt);
  };
  
  const handleSubmit = nameSearch => {
    if (searchQuery !== nameSearch) {
      setSearchQuery(nameSearch);
    }
  };

 const onModalClose = () => {
    setLargeUrl(null);
    setTag(null);
  };
    
  useEffect(() => {
    setImageGallery([]);
    setIsVisible(false);
    setIsLoader(false);
    setPage(1);
    setIsEmpty(false);
    setError(null);
  }, [searchQuery]);
  
  return (
      <Container>
        <Toaster
          position="top-right"
          toastOptions={{
            className: '',
            duration: 1000,
            style: {
              background: '#ff0303',
              color: '#fff',
            },
          }}
        />
        <Searchbar onSearch={handleSubmit} />

        {searchQuery && (
          <ImageGallery imageGallery={imageGallery} onOpenModal={openModal} />
        )}

        {largeUrl && <Modal url={largeUrl} alt={tag} onClose={onModalClose}></Modal>}
        
        {isLoader && <Chip> {Spinner()} </Chip>}

        {isVisible && <Button loadMore={loadMore} />}

        {isEmpty && <Text> Sorry. There are no images ... </Text>}

        {error && <Text> Something went wrong. Try again later. </Text>}

      </Container>
    );
  };

