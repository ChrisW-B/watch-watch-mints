import { DateTime, Duration } from 'luxon';
import React from 'react';

import styled from '@emotion/styled';

import DiscordAvatar from '../atoms/avatar';
import DiscordAttachment from '../atoms/chatAttachment';
import ChatText from '../atoms/chatText';
import { ChatFragment } from '../schema/__generated__/chatList.generated';

const ChatMessageItem = styled.li`
  display: grid;
  gap: 0.5rem;
  grid-template:
    'avatar author' min-content
    'avatar content' max-content
    'avatar attachments' min-content
    / 50px auto;
  margin: 0.8rem 0;
  list-style: none;
  padding: 0;
`;

const ChatAuthor = styled.p`
  color: #649c7a;
`;

const ChatTimestamp = styled.a`
  color: var(--light-grey);
  font-size: 0.7rem;
  padding-left: 0.4rem;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const ChatMessage: React.FC<ChatFragment & { diffFromToday: Duration }> = ({
  content,
  mentions,
  author,
  id,
  timestamp,
  attachments,
  diffFromToday,
}) => {
  const messageCreationTime = DateTime.fromISO(timestamp ?? '');

  const messageRef = React.useRef<HTMLLIElement>(null);
  const [shouldDisplay, setShouldDisplay] = React.useState(false);

  React.useEffect(() => {
    if (shouldDisplay) {
      messageRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [shouldDisplay]);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!shouldDisplay) {
      interval = setInterval(() => {
        if (messageCreationTime.minus(diffFromToday) < DateTime.now().toUTC()) {
          setShouldDisplay(true);
        }
      }, 500);
    }
    return () => clearInterval(interval);
  });

  return shouldDisplay ? (
    <ChatMessageItem ref={messageRef}>
      <DiscordAvatar {...author} />
      <ChatAuthor>
        <b>{author?.username}</b>
        <ChatTimestamp
          target='_blank'
          rel='noopener noreferrer'
          href={`https://discord.com/channels/706414667958059078/741054155778687066/${id ?? ''}`}
        >
          {messageCreationTime.toLocaleString(DateTime.DATETIME_MED)}
        </ChatTimestamp>
      </ChatAuthor>
      <ChatText content={content ?? ''} mentions={mentions} />
      {attachments?.map((attachment) => (
        <DiscordAttachment key={attachment?.id} {...attachment} />
      ))}
    </ChatMessageItem>
  ) : null;
};
export default ChatMessage;
