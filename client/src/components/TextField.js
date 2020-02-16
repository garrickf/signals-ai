/**
 * Borderless text field component.
 */

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

const StyledInput = styled.textarea`
  padding: 20px;
  border: none;
  font: 26px/26px Georgia;
  width: 95%;
  height: 350px;
  resize: none;

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
  background: #0094FF;
`;

const TextField = ({ handleInputChange, text }) => {
  const [focus, setFocus] = useState(false);
  const [hover, setHover] = useState(false);
  const inputRef = useRef();

  const springProps = useSpring({
    transform: focus ? 'scaleY(1)' : (hover ? 'scaleY(0.5)' : 'scaleY(0)'),
    from: {transform: 'scaleY(0)'},
    config: {tension: 300, clamp: true}
  })

  const handleChange = (e) => {
    handleInputChange(e)
    // Autosize
    console.log(inputRef.current.scrollHeight);
    // setHeight(inputRef.current.scrollHeight + 'px');
  }

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
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={inputRef}
        value={text}
      />
    </StyledInputContainer>
  );
};

TextField.defaultProps = {
  handleTextFieldFocus: () => {},
  handleTextFieldBlur: () => {}
}

export default TextField;
