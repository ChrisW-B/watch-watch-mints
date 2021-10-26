import { DateTime } from 'luxon';
import React from 'react';
import Spinner from 'src/atoms/spinner';
import TypingMessage from 'src/molecules/typingMessage';
import { ChatSortByInput } from 'src/schema/dataModel/chat.generated';

import styled from '@emotion/styled';

import ChatList from '../molecules/chatList';
import { useChatMessagesQuery } from '../schema/__generated__/chatMessages.generated';

const LoadingMessage = styled.div`
  flex: 1;
  display: flex;
  place-content: center;
  place-items: center;
  flex-flow: column nowrap;
  gap: 15px;
`;

const LoadingCopy = styled.p`
  font-size: 0.8rem;
  color: var(--light-grey);
`;

type OwnProps = {
  startDate: DateTime;
};

const ChatLog: React.FC<OwnProps> = ({ startDate }) => {
  const mongoTs = startDate.toFormat("yyyy-MM-dd'T'TT.u000+00:00");
  const { data: initialMessages, loading } = useChatMessagesQuery({
    variables: {
      limit: 15,
      sortBy: ChatSortByInput.TIMESTAMP_DESC,
      query: { timestamp_lte: mongoTs },
    },
  });
  const { data: newMessages, fetchMore } = useChatMessagesQuery({
    variables: {
      limit: 100,
      sortBy: ChatSortByInput.TIMESTAMP_ASC,
      query: { timestamp_gt: mongoTs },
    },
  });

  const timeSinceStart = React.useRef(startDate.diffNow());

  const messagesFinishTime = React.useRef(
    DateTime.fromISO(newMessages?.chats?.[newMessages.chats.length - 1]?.timestamp ?? '')
      .setZone('utc')
      .minus(timeSinceStart.current),
  );

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const interval = setInterval(async () => {
      if (
        messagesFinishTime?.current?.isValid &&
        DateTime.now().toUTC() > messagesFinishTime.current
      ) {
        clearInterval(interval);
        await fetchMore({
          variables: {
            timeStampGte: newMessages?.chats?.[newMessages.chats.length - 1]?.timestamp ?? '',
          },
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [newMessages?.chats, fetchMore]);

  React.useEffect(() => {
    messagesFinishTime.current = DateTime.fromISO(
      newMessages?.chats?.[newMessages.chats.length - 1]?.timestamp ?? '',
    )
      .setZone('utc')
      .minus(timeSinceStart.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessages?.chats?.length]);

  return (
    <>
      {loading ? (
        <LoadingMessage>
          <Spinner />
          <LoadingCopy>Travelling back to Season 7...</LoadingCopy>
        </LoadingMessage>
      ) : (
        <ChatList
          diffFromToday={timeSinceStart.current}
          prevChats={initialMessages?.chats?.slice().reverse()}
          newChats={newMessages?.chats}
        />
      )}
      <TypingMessage
        diffFromToday={timeSinceStart.current}
        messagesAuthors={
          newMessages?.chats.map((chat) => ({
            authorName: chat?.author?.username ?? '',
            postTime: DateTime.fromISO(chat?.timestamp ?? ''),
          })) ?? []
        }
      />
    </>
  );
};

export default ChatLog;
