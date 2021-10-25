import styled from '@emotion/styled';

const HeaderWrapper = styled.header`
  grid-area: header;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075);
  position: relative;
  z-index: 100;
`;

const ChannelHash = styled.span`
  font-size: 2.4rem;
  padding: 0 1rem;
`;

const ChannelDescription = styled.p`
  border-left: 1px solid var(--light-grey);
  margin: 0 1.2rem;
  padding: 0 1.2rem;
  color: var(--light-grey);
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <p>
        <ChannelHash>#</ChannelHash>
      </p>
      <h2>watch-watch-mints</h2>
      <ChannelDescription>watch the breath mints watch the breath mints.</ChannelDescription>
    </HeaderWrapper>
  );
};
export default Header;
