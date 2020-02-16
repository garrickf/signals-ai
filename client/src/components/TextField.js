/**
 * Borderless text field component.
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const StyledInput = styled.textarea`
  padding: 20px;
  border: none;
  font: 26px/26px Georgia;
  width: 95%;
  resize: none;
  height: 50vh;

  :focus {
    box-shadow: none;
    outline: none;
  }
`;

const StyledInputContainer = styled(animated.div)`
  position: relative;
`;

const HighlightBar = styled(animated.div)`
  display: block;
  position: absolute;
  width: 5px;
  height: 100%;
  background: blue;
`;

const TextField = ({ onChange, onFocus }) => {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);

  const springProps = useSpring({
    transform: focus ? 'scaleY(1)' : (hover ? 'scaleY(0.5)' : 'scaleY(0)'),
    from: {transform: 'scaleY(0)'},
    config: {tension: 300, clamp: true}
  })

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  }

  return (
    <StyledInputContainer>
      <HighlightBar style={{
        transform: springProps.transform
      }}/>
      <StyledInput
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
    </StyledInputContainer>
  );
};

export default TextField;
