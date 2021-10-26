import styled from '@emotion/styled';

import { AuthorFragment } from '../schema/__generated__/chatMessages.generated';

const Avatar = styled.div<{ imgSrc: string }>`
  border-radius: 100%;
  background-image: url(${(props) => props.imgSrc});
  grid-area: avatar;
  background-size: cover;
  height: 50px;
  width: 50px;
`;

const DiscordAvatar: React.FC<AuthorFragment> = ({ id, avatar }) => {
  return id && avatar ? (
    <Avatar
      aria-hidden='true'
      imgSrc={`https://cdn.discordapp.com/avatars/${id}/${avatar}.png?size=80`}
    />
  ) : (
    <div />
  );
};

export default DiscordAvatar;
