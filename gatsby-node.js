require('dotenv').config();
const axios = require('axios');

const SPOTIFY_API_TOKEN = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_TOP_ARTISTS = 'https://api.spotify.com/v1/me/top/artists';
const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

const NODE_TYPE = 'SpotifyTopArtist';

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
  getNodesByType,
}) => {
  const { createNode } = actions;

  const { data: tokenData = {} } = await axios({
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

  const { access_token } = tokenData;

  if ( !access_token ) {
    console.log('Error: Failed to get Spotify token');
    return;
  }

  const { data: topArtistData = {} } = await axios({
    method: 'get',
    url: SPOTIFY_API_TOP_ARTISTS,
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });

  if ( !topArtistData ) {
    console.log('Error: Failed to get top Spotify artists');
    return;
  }

  const { items = [] } = topArtistData;

  items.forEach((node, index) =>
    createNode({
      ...node,
      id: createNodeId(`${NODE_TYPE}-${node.id}`),
      parent: null,
      children: [],
      internal: {
        type: NODE_TYPE,
        content: JSON.stringify(node),
        contentDigest: createContentDigest(node),
      },
    })
  )

  return;
};