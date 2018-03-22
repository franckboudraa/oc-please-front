import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

const Footer = () => {
  return (
    <Menu
      borderless
      size="mini"
      fixed="bottom"
      widths={1}
      inverted
      className="transparent"
    >
      <Container>
        <Menu.Item>
          <a
            href="http://www.franckboudraa.me"
            target="_blank"
            rel="noopener noreferrer"
          >
            &copy; 2018 Franck Boudraa - All Rights Reserved
          </a>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Footer;
