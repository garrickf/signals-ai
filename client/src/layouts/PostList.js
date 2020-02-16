/**
 * The PostList is a list of posts
 */

import React from 'react';
import { Flex } from 'rebass';
import PostCard from '../components/PostCard';
import styled from 'styled-components';

const ScrollContainer = styled(Flex)`
  height: 100%;
  flex-direction: column;
  overflow-y: scroll;
`;

const PostList = ({ active, posts }) => {

  return (
    <ScrollContainer style={{
      transition: active ? 'opacity 0.2s 0.4s' : 'opacity 0.1s',
      opacity: active ? 1 : 0
    }}>
      <Flex flexDirection="column">
        {posts.map(post => (
          <PostCard post={post} />
        ))}
      </Flex>
    </ScrollContainer>
  );
};

PostList.defaultProps = {
  posts: [
    {
      content: 'Feeling a little weird today. I think it started when I got a call from Ryan while waiting in line at the store...',
      date: 'Sat Feb 15 2020 15:38:06 GMT-0800 (Pacific Standard Time)'
    },
    {
      content: 'Hello2',
      date: 'Sat Feb 15 2020 15:38:06 GMT-0800 (Pacific Standard Time)'
    },
    {
      content: 'Hello2',
      date: 'Sat Feb 15 2020 15:38:06 GMT-0800 (Pacific Standard Time)'
    },
    {
      content: 'Hello2',
      date: 'Sat Feb 15 2020 15:38:06 GMT-0800 (Pacific Standard Time)'
    },
    {
      content: 'Hello2',
      date: 'Sat Feb 15 2020 15:38:06 GMT-0800 (Pacific Standard Time)'
    },
    {
      content: 'Hello2',
      date: 'Sat Feb 15 2020 15:38:06 GMT-0800 (Pacific Standard Time)'
    },
    {
      content: 'Hello2',
      date: 'Sat Feb 15 2020 15:38:06 GMT-0800 (Pacific Standard Time)'
    },
    {
      content: 'Hello2',
      date: 'Sat Feb 15 2020 15:38:06 GMT-0800 (Pacific Standard Time)'
    },
    {
      content: 'Hello2',
      date: 'Sat Feb 15 2020 15:38:06 GMT-0800 (Pacific Standard Time)'
    }
  ]
};

export default PostList;
