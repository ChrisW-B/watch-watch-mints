import { DateTime } from 'luxon';
import React from 'react';

import styled from '@emotion/styled';

import { DAYS_AGO } from './constants';
import Header from './molecules/header';
import Sidebar from './molecules/sideBar';
import ChatLog from './organisms/chatLog';

const MainGrid = styled.main`
  display: grid;
  grid-template:
    'sidebar header' 4rem
    'sidebar chat' auto
    'sidebar typing-message' min-content
    / 16rem auto;
  height: 100vh;
  overflow-y: hidden;

  @media (max-width: 680px) {
    grid-template:
      'header' 4rem
      'chat' auto
      'typing-message' 2rem
      / auto;
  }
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
  return (
    <MainGrid>
      <Sidebar />
      <Header />
      {startTime ? <ChatLog startDate={startTime} /> : null}
    </MainGrid>
  );
};

export default App;
