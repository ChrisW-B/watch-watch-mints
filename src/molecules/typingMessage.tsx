import { DateTime, Duration } from 'luxon';
import React from 'react';

import styled from '@emotion/styled';

interface OwnProps {
  messagesAuthors: { authorName: string; postTime: DateTime }[];
  diffFromToday: Duration;
}

const TypingPara = styled.p`
  padding: 0.4rem 1.2rem;
  white-space: nowrap;
  height: 2rem;
`;

const toSentence = (arr: string[]) =>
  arr.length < 3 ? arr.join(' and ') : `${arr.slice(0, -1).join(', ')}, and ${arr[arr.length - 1]}`;

const TypingMessage: React.FC<OwnProps> = ({ messagesAuthors, diffFromToday }) => {
  const [displayedNames, updateDisplayedNames] = React.useState<string[]>([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newNames: string[] = [];
      messagesAuthors.forEach((authorData) => {
        const diffNow = authorData.postTime
          .minus(diffFromToday)
          .diff(DateTime.now().toUTC(), 'seconds');
        if (diffNow.seconds < 5 && diffNow.seconds > 0) {
          newNames.push(authorData.authorName);
        }
        updateDisplayedNames([...new Set(newNames)]);
      });
    }, 500);
    return () => clearInterval(interval);
  });
  return (
    <TypingPara>
      {displayedNames.length
        ? `${toSentence(displayedNames)} ${displayedNames.length > 1 ? 'are' : 'is'} typing...`
        : null}
    </TypingPara>
  );
};

export default TypingMessage;
