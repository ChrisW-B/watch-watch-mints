import { DateTime } from 'luxon';
import React from 'react';

import styled from '@emotion/styled';

import ChatMessage from '../molecules/chatMessage';
import { useChatListQuery } from '../schema/__generated__/chatList.generated';

const ChatList = styled.ol`
  list-style: none;
  margin: 0;
  padding: 1.2rem;
  display: block;
  overflow: auto;
  flex: 1;
`;

type OwnProps = {
  startDate: DateTime;
};

const ChatLog: React.FC<OwnProps> = ({ startDate }) => {
  const { data, fetchMore } = useChatListQuery({
    variables: { timeStampGte: startDate.toFormat("yyyy-MM-dd'T'TT.u000+00:00") },
    notifyOnNetworkStatusChange: true,
  });

  const messagesFinishTime = React.useRef(
    DateTime.fromISO(data?.chats?.[data.chats.length - 1]?.timestamp ?? '')
      .setZone('utc')
      .minus(startDate.diffNow()),
  );

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const interval = setInterval(async () => {
      if (messagesFinishTime.current && DateTime.now().toUTC() > messagesFinishTime.current) {
        clearInterval(interval);
        await fetchMore({
          variables: { timeStampGte: data?.chats?.[data.chats.length - 1]?.timestamp ?? '' },
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data?.chats, fetchMore]);

  return (
    <ChatList>
      {data?.chats.map((message) =>
        message ? (
          <ChatMessage diffFromToday={startDate.diffNow()} key={message.id} {...message} />
        ) : null,
      )}
    </ChatList>
  );
};

export default ChatLog;
