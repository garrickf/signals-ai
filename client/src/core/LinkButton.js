/**
 * LinkButton core component.
 */

import React from 'react';
import styled from 'styled-components';

const Link = styled.div`
  text-transform: uppercase;

  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const LinkButton = ({ onClick, children }) => {
  return <Link onClick={onClick}>{children}</Link>;
};

export default LinkButton;
