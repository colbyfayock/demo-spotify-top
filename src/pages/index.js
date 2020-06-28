import React from 'react';
import { FaRocket } from 'react-icons/fa';

import { useSpotifyTopArtists } from 'hooks';

import Layout from 'components/Layout';
import Container from 'components/Container';
import Columns from 'components/Columns';
import Column from 'components/Column';

import img_gatsby_zurg from 'assets/images/gatsby-zurg.png';

const IndexPage = () => {
  const { artists } = useSpotifyTopArtists();
  console.log('artists', artists)
  // We don't include the title in Helmet here because we'll inherit the
  // default title from Layout
  return (
    <Layout pageName="home">
      <Container className="content">
        <Columns>
          <Column>
            <h1>
              🔥🎸 My Top Artists 🎸🔥
            </h1>
            <ul>
              {artists.map(artist => {
                const { id, name, images, genres } = artist;
                return (
                  <li key={id}>
                    {images && images[0] && (
                      <p>
                        <img src={images[0]?.url} />
                      </p>
                    )}
                    <div>
                      <h3>{ name }</h3>
                      <p>{ genres.join(', ') }</p>
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
