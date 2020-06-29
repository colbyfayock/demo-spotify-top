import React from 'react';
import { Link } from 'gatsby';
import { FaGithub } from 'react-icons/fa';

import Container from 'components/Container';
import Columns from 'components/Columns';
import Column from 'components/Column';

const Header = () => {
  return (
    <header className="header">
      <Container>
        <h1>🔥🎸 Colby's Top on Spotify 🎸🔥</h1>
        <p>
          <a href="https://github.com/colbyfayock/demo-spotify-top">
            View on Github <FaGithub />
          </a>
        </p>
      </Container>
    </header>
  );
};

export default Header;
