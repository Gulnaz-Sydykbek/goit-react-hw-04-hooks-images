import PropTypes from 'prop-types';
import s from '../imageGallery/Image.module.css';

function Button(props) {
  const { onLoadMoreClick } = props;
  const { ButtonContainer, Button } = s;

  const ref = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className={ButtonContainer}>
      <button ref={ref} className={Button} onClick={onLoadMoreClick}>
        Load more
      </button>
    </div>
  );
}

Button.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};

export default Button;
