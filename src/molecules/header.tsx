import styled from '@emotion/styled';

const HeaderWrapper = styled.header`
  grid-area: header;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`;
const ChannelHash = styled.span`
  font-size: 2.4rem;
  padding: 0 1rem;
`;

const Header: React.FC = () => {
  return (
    <HeaderWrapper>
      <p>
        <ChannelHash>#</ChannelHash>
      </p>
      <h2>watch-watch-mints</h2>
    </HeaderWrapper>
  );
};
export default Header;
