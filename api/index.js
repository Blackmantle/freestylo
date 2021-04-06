import { API_TWITCH_URL, CLIENT_ID } from './config';

const options = {
  headers: {
    'client-id': CLIENT_ID,
    'accept': 'application/vnd.twitchtv.v5+json'
  },
};

export const fetchChannel = async (name) => {
  try {
    const res = await fetch(`${API_TWITCH_URL}/search/channels?query=${name}&limit=1`, options);
    const { channels: [channel] } = await res.json();
    return channel;
  } catch(e) {
    console.log(e);
  }
};

export const fetchChannelVideos = async (id) => {
  try {
    const res = await fetch(`${API_TWITCH_URL}/channels/${id}/videos?limit=100`, options);
    const { videos } = await res.json();
    return videos;
  } catch(e) {
    console.log(e);
  }
};