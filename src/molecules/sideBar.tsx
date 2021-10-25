import styled from '@emotion/styled';

const SidebarWrapper = styled.nav`
  grid-area: sidebar;
  @media (max-width: 680px) {
    display: none;
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <p>#watch-watch-mints</p>
    </SidebarWrapper>
  );
};
export default Sidebar;
