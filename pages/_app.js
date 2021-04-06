import { useState, useEffect } from 'react';
import { fetchChannel, fetchChannelVideos } from '../api';
import '../styles/globals.sass'

function MyApp({ Component, pageProps }) {
  const [isVideosLoading, setIsVideosLoading] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [videos, setVideos] = useState([]);
  const [favoriteVideos, setFavoriteVideos] = useState([]);

  useEffect(() => {
    try {
      const savedFavoriteVideos = localStorage.getItem('favoriteVideos');
      if (savedFavoriteVideos) {
        setFavoriteVideos(JSON.parse(savedFavoriteVideos));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      const favoriteVideosToSave = JSON.stringify(favoriteVideos);
      localStorage.setItem('favoriteVideos', favoriteVideosToSave);
    } catch {}
  }, [favoriteVideos]);

  const changeChannelName = (e) => setChannelName(e.target.value);

  const findVideos = async (e) => {
    e.preventDefault();

    if (!channelName.length) {
      return;
    }

    setIsVideosLoading(true);

    const channel = await fetchChannel(channelName);
    if (channel) {
      const channelVideos = await fetchChannelVideos(channel._id);
      setVideos(channelVideos ? channelVideos : []);
    } else {
      setVideos([]);
    }
    
    setIsVideosLoading(false);
  }

  const addVideoToFavorites = (videoInfo) => setFavoriteVideos(prev => ([...prev, videoInfo]));

  const deleteVideoFromFavorites = (videoId) => setFavoriteVideos(prev => prev.filter(({ id }) => id !== videoId));

  return (
    <Component
      channelName={channelName}
      videos={videos}
      isVideosLoading={isVideosLoading}
      onChannelNameChange={changeChannelName}
      onFindVideos={findVideos}
      favoriteVideos={favoriteVideos}
      onAddVideoToFavorites={addVideoToFavorites}
      onDeleteVideoFromFavorites={deleteVideoFromFavorites}
      {...pageProps}
    />
  );
}

export default MyApp
