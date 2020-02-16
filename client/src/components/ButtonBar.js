/**
 * Record and discard button bar.
 */

import React from 'react';
import styled from 'styled-components';
import { Flex } from 'rebass';
import { useSpring, animated } from 'react-spring';

const StyledButton = styled.button`
  border: 1px solid #000000;
  border-radius: 5px;
  font-size: 20px;
  margin-left: 5px;
  padding: 5px 10px;
`;

const Button = ({ onClick, children }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

const AnimatedFlex = animated(Flex);

const ButtonBar = ({ active, handleRecord, handleDiscard }) => {
  const springProps = useSpring({
    opacity: active ? 1 : 0,
    from: {opacity: 0}
  })

  return (
    <AnimatedFlex width="100%" flexDirection="row-reverse" px={4} style={{
      opacity: springProps.opacity,
    }}>
      <Button onClick={handleRecord}>Record</Button>
      <Button onClick={handleDiscard}>Discard</Button>
    </AnimatedFlex>
  );
};

ButtonBar.defaultProps = {
  handleRecord: () => {},
  handleDiscard: () => {}
}

export default ButtonBar;
