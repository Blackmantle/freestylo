import Head from 'next/head';
import Link from 'next/link';
import HomeStyles from '../../styles/Home.module.sass';
import VideoCard from '../../components/VideoCard';

function Favorites({ favoriteVideos, onDeleteVideoFromFavorites }) {
  return (
    <div className={HomeStyles.container}>
      <Head>
        <title>FreeStylo</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&display=swap" rel="stylesheet" />
      </Head>

      <main className={HomeStyles.main}>
        <div className={HomeStyles.navLink}>
          <Link href="/">&larr; На главную</Link>
        </div>
        <div className={HomeStyles.videosContainer}>
          {!favoriteVideos.length ? (
            <span>Нет видео</span>
          ) : (
            <div className={HomeStyles.grid}>
              {favoriteVideos.map((data) => (
                  <VideoCard
                    key={data.id}
                    data={data}
                    isInFavorites={true}
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

export default Favorites;