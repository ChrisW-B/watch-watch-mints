import { DateTime } from 'luxon';
import React from 'react';
import TypingMessage from 'src/molecules/typingMessage';

import { useChatListQuery } from '../schema/__generated__/chatList.generated';
import ChatList from './chatList';

type OwnProps = {
  startDate: DateTime;
};

const ChatLog: React.FC<OwnProps> = ({ startDate }) => {
  const { data, fetchMore } = useChatListQuery({
    variables: { timeStampGte: startDate.toFormat("yyyy-MM-dd'T'TT.u000+00:00") },
    notifyOnNetworkStatusChange: true,
  });

  const timeSinceStart = React.useRef(startDate.diffNow());

  const messagesFinishTime = React.useRef(
    DateTime.fromISO(data?.chats?.[data.chats.length - 1]?.timestamp ?? '')
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
          variables: { timeStampGte: data?.chats?.[data.chats.length - 1]?.timestamp ?? '' },
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data?.chats, fetchMore]);

  React.useEffect(() => {
    messagesFinishTime.current = DateTime.fromISO(
      data?.chats?.[data.chats.length - 1]?.timestamp ?? '',
    )
      .setZone('utc')
      .minus(timeSinceStart.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.chats?.length]);

  return (
    <>
      <ChatList diffFromToday={timeSinceStart.current} chats={data?.chats ?? []} />
      <TypingMessage
        diffFromToday={timeSinceStart.current}
        messagesAuthors={
          data?.chats.map((chat) => ({
            authorName: chat?.author?.username ?? '',
            postTime: DateTime.fromISO(chat?.timestamp ?? ''),
          })) ?? []
        }
      />
    </>
  );
};

export default ChatLog;
