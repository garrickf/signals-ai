/**
 * The Insights section is a sidebar with suggestions that expands
 * into a panel with visualizations.
 */

import React, { useState } from 'react';
import { Flex } from 'rebass';
import AnimatedBox from '../core/AnimatedBox';
import { useSpring } from 'react-spring';
import LinkButton from '../core/LinkButton';

const Insights = ({ handleExpandSidebar }) => {
  const [active, setActive] = useState(false);

  const springProps = useSpring({
    width: active ? '70%' : '20em',
    from: { width: '20em' }
  });

  const expandInsights = () => {
    setActive(s => !s);
  }

  return (
    <AnimatedBox
      style={{
        width: springProps.width,
        backgroundColor: 'aliceblue'
      }}
      height="100%"
    >
      <Flex flexDirection="column">
        <LinkButton onClick={expandInsights}> More Insights... </LinkButton>
        <LinkButton onClick={handleExpandSidebar}> All Entries </LinkButton>
      </Flex>
    </AnimatedBox>
  );
};

export default Insights;
