/**
 * The PostCard is a small preview of a post.
 */

import React from 'react';
import { Box, Heading } from 'rebass';
import styled from 'styled-components';

const PostCardContainer = styled(Box)`
  background: #fff;
  border: 1px solid #aaa;
  border-radius: 5px;
  padding: 1em;
  margin-bottom: 0.5em;
  height: 150px;
`;

const Grayed = styled.span`
  opacity: 0.4;
`

const DAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const PostCard = ({ post }) => {
  // A post consists of content, datetime(?), tags, and mood
  const { content, date, tags, mood } = post;
  const d = new Date(date);

  const dateTitle = d.getMonth() + 1 + '/' + d.getDate();
  const dayOfWeek = DAYS[d.getDay()];
  const time = d.toLocaleTimeString('en-US', { timeStyle: 'short' } )
  const summary = content.substring(0, 140) + '...';

  return (
    <PostCardContainer>
    <Heading>{dateTitle} <Grayed>{dayOfWeek}</Grayed></Heading>
      <Box mt={2}>
        {summary}<br /><Grayed>{time}</Grayed>
      </Box>
    </PostCardContainer>
  );
};

export default PostCard;
