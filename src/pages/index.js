import React, { useState, useRef, useEffect } from 'react';
import { FaRocket } from 'react-icons/fa';


import { useSpotifyTopArtists, useSpotifyTopTracks } from 'hooks';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Columns from 'components/Columns';
import Column from 'components/Column';
import Player from 'components/Player';


import img_gatsby_zurg from 'assets/images/gatsby-zurg.png';

const IndexPage = () => {
  const [trackPreview, setTrackPreview] = useState();

  const { artists } = useSpotifyTopArtists();
  const { tracks } = useSpotifyTopTracks();

  return (
    <Layout pageName="home">
      <Container className="content">
        <Columns>
          <Column>
            <Player
              src={trackPreview}
            />
            <h2>Top Artists</h2>
            <ul>
              {artists.map(artist => {
                const { id, name, images, genres, top_tracks } = artist;
                const track = top_tracks[0];
                const { preview_url } = track;

                const artistStyles = {
                  backgroundImage: `url(${images[0]?.url})`
                }

                return (
                  <li className="artist" key={id}>
                    <button onClick={() => setTrackPreview(preview_url)}>
                      {images && images[0] && (
                        <p className="artist-image" style={artistStyles}>
                          <span>Image of { name }</span>
                        </p>
                      )}
                      <div className="artist-meta">
                        <h3>{ name }</h3>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
            <h2>Top Tracks</h2>
            <ul>
              {tracks.map(track => {
                const { id, name, album, preview_url } = track;
                const { images, artists } = album;
                const artist = artists && artists[0] && artists[0].name;

                const trackStyles = {
                  backgroundImage: `url(${images[0]?.url})`
                }

                return (
                  <li className="track" key={id}>
                    <button onClick={() => setTrackPreview(preview_url)}>
                      {images && images[0] && (
                        <p className="track-image" style={trackStyles}>
                          <span>Image of { name }</span>
                        </p>
                      )}
                      <div className="track-meta">
                        <h3>{ name }</h3>
                        <p>{ artist }</p>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Column>
        </Columns>
      </Container>
    </Layout>
  );
};

export default IndexPage;
