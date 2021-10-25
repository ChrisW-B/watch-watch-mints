import { Duration } from 'luxon';

import styled from '@emotion/styled';

import ChatMessage from '../molecules/chatMessage';
import { ChatFragment } from '../schema/__generated__/chatList.generated';

const List = styled.ol`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  flex-flow: column nowrap;
  padding: 0;
`;

const ListWrapper = styled.div`
  margin: 0;
  padding: 1.2rem;
  overflow: auto;
  flex: 1;
`;

type OwnProps = {
  chats: (ChatFragment | undefined | null)[] | undefined;
  diffFromToday: Duration;
};

const ChatList: React.FC<OwnProps> = ({ chats, diffFromToday }) => {
  return (
    <ListWrapper>
      <List>
        {chats?.map((message) =>
          message ? (
            <ChatMessage diffFromToday={diffFromToday} key={message.id} {...message} />
          ) : null,
        )}
      </List>
    </ListWrapper>
  );
};

export default ChatList;
