import styled from '@emotion/styled';

const SidebarWrapper = styled.nav`
  grid-area: sidebar;
  background-color: var(--off-dark);
  padding: 0 0.8rem;
  @media (max-width: 680px) {
    display: none;
  }
`;

const ChannelName = styled.p`
  color: var(--dark-mode-dark);
  padding: 0.5rem 2rem;
  background-color: var(--light-mode-dark-grey);
  border-radius: 4px;
  font-weight: bold;
`;

const SidecordName = styled.h1`
  color: var(--dark-mode-dark);
  padding: 2rem 0;
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <SidecordName>The Breath Mints Historical Discord Presents</SidecordName>
      <ChannelName># watch-watch-mints</ChannelName>
    </SidebarWrapper>
  );
};
export default Sidebar;
