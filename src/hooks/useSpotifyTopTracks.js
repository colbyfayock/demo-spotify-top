import { useStaticQuery, graphql } from 'gatsby';

function useSpotifyTopTracks() {
  const { allSpotifyTopTrack = {} } = useStaticQuery(
    graphql`
      query {
        allSpotifyTopTrack {
          edges {
            node {
              name
              id
              album {
                images {
                  url
                }
                artists {
                  name
                }
              }
              preview_url
            }
          }
        }
      }
    `
  );

  const { edges } = allSpotifyTopTrack;

  const tracks = edges.map(({ node }) => node);

  return {
    tracks
  };
}

export default useSpotifyTopTracks;
