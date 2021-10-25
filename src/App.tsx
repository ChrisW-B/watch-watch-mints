import { DateTime } from 'luxon';
import React from 'react';

import styled from '@emotion/styled';

import { DAYS_AGO } from './constants';
import ChatLog from './organisms/chatLog';

const MainFlex = styled.main`
  display: flex;
  flex-flow: column nowrap;
  height: 100vh;
  overflow-y: hidden;
`;

const getParams = (location: Location) => {
  const searchParams = new URLSearchParams(location.search);
  return {
    time: searchParams.get('time') ?? '',
  };
};

const App = (): React.ReactElement => {
  const { time } = getParams(window.location);
  const startTime = time
    ? DateTime.fromISO(time).setZone('utc')
    : DateTime.now().setZone('utc').minus(DAYS_AGO);
  return <MainFlex>{startTime ? <ChatLog startDate={startTime} /> : null}</MainFlex>;
};

export default App;
