import styled from '@emotion/styled';

import { ChatAttachmentFragment } from '../schema/__generated__/chatMessages.generated';

const Attachment = styled.div<{ width: number; height: number }>`
  grid-area: attachments;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-width: 40vw;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
`;

const DiscordAttachment: React.FC<ChatAttachmentFragment> = ({ url, width, height, filename }) => {
  return (
    <Attachment width={width ?? 0} height={height ?? 0}>
      <Image alt={filename ?? ''} src={url ?? ''} />
    </Attachment>
  );
};

export default DiscordAttachment;
