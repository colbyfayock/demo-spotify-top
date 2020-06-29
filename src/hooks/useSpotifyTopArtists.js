import { useStaticQuery, graphql } from 'gatsby';

function useSpotifyTopArtists() {
  const { allSpotifyTopArtist = {} } = useStaticQuery(
    graphql`
      query {
        allSpotifyTopArtist {
          edges {
            node {
              name
              images {
                url
              }
              genres
              id
              popularity
              top_tracks {
                preview_url
              }
            }
          }
        }
      }
    `
  );

  const { edges } = allSpotifyTopArtist;

  const artists = edges.map(({ node }) => node);

  return {
    artists
  };
}

export default useSpotifyTopArtists;
