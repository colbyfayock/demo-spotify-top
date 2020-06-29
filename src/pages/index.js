import React from 'react';
import { FaRocket } from 'react-icons/fa';

import { useSpotifyTopArtists, useSpotifyTopTracks } from 'hooks';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Columns from 'components/Columns';
import Column from 'components/Column';

import img_gatsby_zurg from 'assets/images/gatsby-zurg.png';

const IndexPage = () => {
  const { artists } = useSpotifyTopArtists();
  const { tracks } = useSpotifyTopTracks();

  console.log('artists', artists)
  console.log('tracks', tracks)

  return (
    <Layout pageName="home">
      <Container className="content">
        <Columns>
          <Column>
            <h2>Top Artists</h2>
            <ul>
              {artists.map(artist => {
                const { id, name, images, genres } = artist;
                return (
                  <li className="artist" key={id}>
                    {images && images[0] && (
                      <p className="artist-image" style={{
                        backgroundImage: `url(${images[0]?.url})`
                      }}>
                        <span>Image of { name }</span>
                      </p>
                    )}
                    <div className="artist-meta">
                      <h3>{ name }</h3>
                    </div>
                  </li>
                )
              })}
            </ul>
            <h2>Top Tracks</h2>
            <ul>
              {tracks.map(track => {
                const { id, name, album } = track;
                const { images, artists } = album;
                const artist = artists && artists[0] && artists[0].name;

                console.log('track', track)

                return (
                  <li className="track" key={id}>
                    {images && images[0] && (
                      <p className="track-image" style={{
                        backgroundImage: `url(${images[0]?.url})`
                      }}>
                        <span>Image of { name }</span>
                      </p>
                    )}
                    <div className="track-meta">
                      <h3>{ name }</h3>
                      <p>{ artist }</p>
                    </div>
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
