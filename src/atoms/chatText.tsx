import React from 'react';
import ReactMarkdown from 'react-markdown';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

import styled from '@emotion/styled';

import { MentionFragment } from '../schema/__generated__/chatList.generated';

const MarkdownBlockquote = styled.blockquote`
  border-left: 4px solid var(--light-grey);
  margin: 0.3rem 0 0 0.2rem;
  padding: 0.3rem 0 0.3rem 0.5rem;
`;

const MarkdownA = styled.a`
  color: var(--link-blue);
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const SpoileredSpan = styled.span`
  color: grey;
  background: grey;
  padding: 0.1rem;
  border-radius: 4px;
  :hover {
    background-color: var(--light-grey);
    color: var(--dark);
  }
`;

const ParaWithSpoilers: React.FC<Omit<ReactMarkdownProps, 'children'>> = ({ node }) => {
  const spoiledChildren = node.children.map((child) =>
    child.type === 'text'
      ? child.value
          .split('||')
          .reduce(
            (newChildren, childSection, i) => [
              ...newChildren,
              i % 2 === 0 ? (
                <React.Fragment key={i}>{childSection}</React.Fragment>
              ) : (
                <SpoileredSpan key={i}>{childSection}</SpoileredSpan>
              ),
            ],
            [] as (string | JSX.Element)[],
          )
      : child.type === 'element'
      ? React.createElement(
          child.tagName,
          { ...child.properties, key: child.position?.start.column },
          <ParaWithSpoilers node={child} />,
        )
      : null ?? null,
  );

  return spoiledChildren?.length ? <>{spoiledChildren}</> : null;
};

const ChatMessage = styled.div`
  grid-area: content;
`;

type OwnProps = {
  content: string;
  mentions: (MentionFragment | null | undefined)[] | null | undefined;
};

const ChatText: React.FC<OwnProps> = ({ content, mentions }) => {
  const withMentions =
    mentions?.reduce((text, mention) => {
      return text.replaceAll(`<@!${mention?.id ?? ''}>`, `[@${mention?.username ?? ''}](#)`);
    }, content) ?? content;

  return (
    <ChatMessage>
      <ReactMarkdown
        components={{
          blockquote: (props) => <MarkdownBlockquote {...props} />,
          // eslint-disable-next-line styled-components-a11y/anchor-has-content
          a: (props) => <MarkdownA {...props} />,
          p: ({ node, ...props }) => (
            <p {...props}>
              <ParaWithSpoilers node={node} />
            </p>
          ),
        }}
      >
        {withMentions ?? ''}
      </ReactMarkdown>
    </ChatMessage>
  );
};
export default ChatText;
