import PropTypes from 'prop-types';

import s from './Image.module.css';
import ImageGalleryItem from './ImageGalleryItem';

function ImageGallery(props) {
  const { images, onOpenLargeImg } = props;
  const { ImageGallery } = s;

  return (
    <div>
      <ul className={ImageGallery}>
        {images.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
            onOpenLargeImgUrl={onOpenLargeImg}
          />
        ))}
      </ul>
    </div>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default ImageGallery;
