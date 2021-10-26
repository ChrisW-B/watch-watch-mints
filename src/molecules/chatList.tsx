import { Duration } from 'luxon';
import React from 'react';

import styled from '@emotion/styled';

import { ChatFragment } from '../schema/__generated__/chatMessages.generated';
import ChatMessage from './chatMessage';

const List = styled.ol`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  flex-flow: column nowrap;
  padding: 0;
`;

const ListWrapper = styled.div`
  margin: 0;
  padding: 0 1.2rem;
  overflow: auto;
  flex: 1;
  display: block;
  grid-area: chat;
`;

type OwnProps = {
  prevChats: (ChatFragment | undefined | null)[] | undefined;
  newChats: (ChatFragment | undefined | null)[] | undefined;
  diffFromToday: Duration;
};

const ChatList: React.FC<OwnProps> = ({ prevChats, newChats, diffFromToday }) => {
  const [pauseScroll, setPauseScroll] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let isRunning: number | null = null;
    const currentRef = listRef.current;
    const listener = () => {
      // use isRunning to debounce
      if (isRunning === null) {
        isRunning = window.requestAnimationFrame(() => {
          setPauseScroll(
            (listRef.current?.scrollTop ?? 0) <
              (listRef.current?.scrollHeight ?? 0) - (listRef.current?.offsetHeight ?? 0),
          );
          isRunning = null;
        });
      }
    };
    listRef.current?.addEventListener('scroll', listener);
    return () => {
      currentRef?.removeEventListener('scroll', listener);
    };
  });

  return (
    <ListWrapper ref={listRef}>
      <List>
        {prevChats?.map((message) =>
          message ? (
            <ChatMessage
              diffFromToday={diffFromToday}
              key={message.id}
              message={message}
              pauseScroll={pauseScroll}
            />
          ) : null,
        )}
        {newChats?.map((message) =>
          message ? (
            <ChatMessage
              diffFromToday={diffFromToday}
              key={message.id}
              message={message}
              pauseScroll={pauseScroll}
            />
          ) : null,
        )}
      </List>
    </ListWrapper>
  );
};

export default ChatList;
