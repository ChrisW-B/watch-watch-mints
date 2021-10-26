import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const Dash = keyframes`
0%{
  stroke-dasharray: 1,200;
  stroke-dashoffset: 0;
 }
 50%{
  stroke-dasharray: 89,200;
  stroke-dashoffset: -35;
 }
 100%{
  stroke-dasharray: 89,200;
  stroke-dashoffset: -124;
 }
`;
const Rotate = keyframes`
 100%{
  transform: rotate(1turn);
 }
`;

const SVGWrapper = styled.svg`
  animation: ${Rotate} 2s linear infinite;
  height: 40px;
  position: relative;
  width: 40px;
`;
const SVGCircle = styled.circle`
  animation: ${Dash} 1.5s ease-in-out infinite;
  stroke: var(--light-grey);
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
`;

const Spinner: React.FC<React.ComponentPropsWithoutRef<'svg'>> = (props) => {
  return (
    <SVGWrapper viewBox='22 22 44 44' {...props} aria-live='polite' aria-busy='true'>
      <SVGCircle
        className='circle'
        cx='44'
        cy='44'
        r='20.2'
        fill='none'
        strokeWidth='3.6'
        strokeMiterlimit='10'
      />
    </SVGWrapper>
  );
};

export default Spinner;
