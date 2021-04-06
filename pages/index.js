import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.sass';
import Loader from "react-loader-spinner";
import VideoCard from '../components/VideoCard';

function Home({
  channelName,
  videos,
  isVideosLoading,
  onChannelNameChange,
  onFindVideos,
  favoriteVideos,
  onAddVideoToFavorites,
  onDeleteVideoFromFavorites,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>FreeStylo</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap" rel="stylesheet" />
      </Head>

      <main className={styles.main}>
        <div className={styles.navLink}>
          <Link href="/favorites">Перейти в избранное &rarr;</Link>
        </div>
        <div className={styles.searchContainer}>
          <form onSubmit={onFindVideos} className={styles.searchForm}>
            <input
              type="search"
              value={channelName}
              onChange={onChannelNameChange}
              className={styles.searchInput}
              placeholder="Введите название канала"
            />
            <button className={styles.button} type="submit">Найти</button>
          </form>
        </div>

        <div className={styles.videosContainer}>
          {isVideosLoading ? (
            <Loader type="Oval" className={styles.spinner} />
          ) : !videos.length ? (
            <span>Нет видео</span>
          ) : (
            <div className={styles.grid}>
              {videos.map(({ _id, title, preview, url }) => (
                  <VideoCard
                    key={_id}
                    data={{ id: _id, preview: preview.large, title, url }}
                    isInFavorites={favoriteVideos.some(({ id }) => id === _id)}
                    onAddToFavorites={onAddVideoToFavorites}
                    onDeleteFromFavorites={onDeleteVideoFromFavorites}
                  />
                ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Home;