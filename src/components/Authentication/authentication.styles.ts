import styled, { keyframes } from 'styled-components';
import { rgba } from 'polished';

import marketBackground from '@images/market.jpg';

const slideIntoVisibility = keyframes`
  0% {
    transform: translateY(60px) rotateX(-5deg);
    visibility: hidden;
    opacity: 0;
  }

  100% {
    transform: translateY(0px) rotateX(0deg);
    visibility: visible;
    opacity: 1;
  }
`;

export const Background = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  perspective: 1000px;
  background: ${({ theme }) =>
    `linear-gradient(${theme.colors.primaryDark}, ${theme.colors.primaryLight})`};
`;

export const Content = styled.div`
  display: flex;
  width: 70vw;
  height: 80vh;
  border-radius: 3px;
  background: ${({ theme }) => theme.colors.white};
  transform-style: preserve-3d;
  backface-visibility: hidden;
  animation: ${slideIntoVisibility} 1s ease-out 0.5s backwards;
  box-shadow: 0 0 4rem ${({ theme }) => rgba(theme.colors.black, 0.3)};
`;

export const Section = styled.div`
  flex: 1;
`;

export const Image = styled.div`
  height: 100%;
  background: ${({ theme }) =>
      `linear-gradient(
      ${rgba(theme.colors.primaryDark, 0.7)},
      ${rgba(theme.colors.primaryLight, 0.5)})`},
    url(${marketBackground});
  background-size: cover;
  background-position: 50% 50%;
  padding-top: 12%;
  padding-left: 20%;
`;

export const Tagline = styled.div`
  color: ${({ theme }) => theme.colors.white};
  font-size: 4rem;
  font-weight: 500;
`;
