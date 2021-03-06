require('dotenv').config();
const axios = require('axios');

const SPOTIFY_API_TOKEN = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_TOP_ARTISTS = 'https://api.spotify.com/v1/me/top/artists';
const SPOTIFY_API_TOP_TRACKS = 'https://api.spotify.com/v1/me/top/tracks';
const SPOTIFY_API_ARTIST_TOP_TRACKS = 'https://api.spotify.com/v1/artists/{id}/top-tracks';
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const NODE_TYPE_TOP_ARTIST = 'SpotifyTopArtist';
const NODE_TYPE_TOP_TRACK = 'SpotifyTopTrack';

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions;

  const accessToken = await getToken();

  const topArtists = await getTopArtists({
    token: accessToken
  });

  const topArtistsWithTracks = await getTopArtistsTracks({
    artists: topArtists,
    token: accessToken
  })

  topArtistsWithTracks.forEach((node, index) =>
    createNode({
      ...node,
      id: createNodeId(`${NODE_TYPE_TOP_ARTIST}-${node.id}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE_TOP_ARTIST,
        content: JSON.stringify(node),
        contentDigest: createContentDigest(node),
      },
    })
  )

  const topTracks = await getTopTracks({
    token: accessToken
  });

  topTracks.forEach((node, index) =>
    createNode({
      ...node,
      id: createNodeId(`${NODE_TYPE_TOP_TRACK}-${node.id}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE_TOP_TRACK,
        content: JSON.stringify(node),
        contentDigest: createContentDigest(node),
      },
    })
  )

  return;
};

/**
 * getToken
 */

async function getToken() {
  let response;
  try {
    response = await axios({
      method: 'post',
      url: SPOTIFY_API_TOKEN,
      params: {
        grant_type: 'refresh_token',
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
        refresh_token: SPOTIFY_REFRESH_TOKEN,
        redirect_uri: SPOTIFY_REDIRECT_URI
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  } catch(e) {
    throw new Error(`Failed to get token: ${e.message}`);
  }
  const { data = {} } = response;
  const { access_token } = data;
  return access_token;
}

/**
 * getTopArtists
 */

async function getTopArtists({ token }) {
  let response;
  try {
    response = await axios({
      method: 'get',
      url: `${SPOTIFY_API_TOP_ARTISTS}?time_range=medium_term`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch(e) {
    throw new Error(`Failed to get top artists: ${e.message}`);
  }
  const { data = {} } = response;
  const { items = [] } = data;
  return items;
}

/**
 * getTopTracks
 */

async function getTopTracks({ token }) {
  let response;
  try {
    response = await axios({
      method: 'get',
      url: `${SPOTIFY_API_TOP_TRACKS}?time_range=medium_term`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch(e) {
    throw new Error(`Failed to get top artists: ${e.message}`);
  }
  const { data = {} } = response;
  const { items = [] } = data;
  return items;
}

/**
 * getTopTracksByArtistId
 */

async function getTopTracksByArtistId({ id, token }) {
  const endpoint = SPOTIFY_API_ARTIST_TOP_TRACKS.replace('{id}', id);
  let response;
  try {
    response = await axios({
      method: 'get',
      url: `${endpoint}?country=US`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch(e) {
    throw new Error(`Failed to get artist top tracks: ${e.message}`);
  }
  const { data = {} } = response;
  const { tracks = [] } = data;
  return tracks;
}

/**
 * getTopArtistsTracks
 */

function getTopArtistsTracks({ artists, token }) {
  return Promise.all(artists.map(async (artist) => {
    const { id } = artist;
    const tracks = await getTopTracksByArtistId({
      id,
      token
    });
    return {
      ...artist,
      top_tracks: tracks
    }
  }));
}