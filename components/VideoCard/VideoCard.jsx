import { useState } from 'react';
import StarRegular from '../../public/star-regular.svg';
import StarSolid from '../../public/star-solid.svg';
import styles from './VideoCard.module.sass'

function VideoCard({
  data,
  isInFavorites,
  onAddToFavorites,
  onDeleteFromFavorites,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const { id, title, preview, url } = data;
  
  const onFavoritesChange = () => {
    if (!isInFavorites) {
      onAddToFavorites(data);
    } else {
      onDeleteFromFavorites(id);
    }
  };

  const onMouseOver = () => setIsHovered(true);

  const onMouseOut = () => setIsHovered(false);

  return (
    <div
      className={styles.container}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
        <img src={preview} className={styles.img} />
        <div className={!isHovered ? styles.info : styles.hovered}>
          <a
            className={styles.link}
            href={url}
            title={title}
            target="_blank"
          >
            {title}
          </a>
          <button
            className={styles.favoriteBtn}
            title={!isInFavorites ? 'Добавить в избранное' : 'Удалить из избранного'}
            onClick={onFavoritesChange}
          >
            {!isInFavorites ? <StarRegular /> : <StarSolid />}
          </button>
        </div>
    </div>
  )
}

export default VideoCard;