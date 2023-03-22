import { Item, Img } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ src, alt, openModal }) => (
  <Item onClick={openModal}>
    <Img src={src} alt={alt} />
  </Item>
);
ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};