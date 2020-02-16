/**
 * The Sidebar section houses the post list.
 */

import React, { useState } from 'react';
import { Flex } from 'rebass';
import AnimatedBox from '../core/AnimatedBox';
import { useSpring } from 'react-spring';
import styled from 'styled-components'
import PostList from '../layouts/PostList';

const SidebarBackground = styled(AnimatedBox)`
  background: #e9e9e9;
  height: 100%;
`;

const SidebarContainer = styled(Flex)`
  width: 80%;
  height: 100%;
  margin-left: 5%;
`;

const Sidebar = ({ active }) => {

  const springProps = useSpring({
    width: active ? '25em' : '0em',
    from: { visibility: 'hidden', width: '0em' }
  });

  return (
    <SidebarBackground style={{
      width: springProps.width,
    }}>
      <SidebarContainer flexDirection="column">
        {/* TODO: make API call and pass in posts for PostList */}
        <PostList active={active} />
      </SidebarContainer>
    </SidebarBackground>
  )
}

export default Sidebar;
