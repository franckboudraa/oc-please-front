import React from 'react';
import { Container, Menu } from 'semantic-ui-react';

const Footer = props => {
  return props.auth.user && props.location.pathname === '/' ? null : (
    <Menu borderless size="mini" widths={1} inverted className="transparent">
      <Container>
        <Menu.Item>
          <a
            href="http://www.franckboudraa.me"
            target="_blank"
            rel="noopener noreferrer"
            className={props.auth.user && 'text-black'}
          >
            &copy; 2018 Franck Boudraa - All Rights Reserved
          </a>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Footer;
