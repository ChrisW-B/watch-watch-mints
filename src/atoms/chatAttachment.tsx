import styled from '@emotion/styled';

import { ChatAttachmentFragment } from '../schema/__generated__/chatList.generated';

const Attachment = styled.div`
  grid-area: attachments;
  max-width: 40vw;
`;

const DiscordAttachment: React.FC<ChatAttachmentFragment> = ({ url, height, width, filename }) => {
  return (
    <Attachment>
      <img
        alt={filename ?? ''}
        height={(height ?? 100) * 0.75}
        width={(width ?? 100) * 0.75}
        src={url ?? ''}
      />
    </Attachment>
  );
};

export default DiscordAttachment;
