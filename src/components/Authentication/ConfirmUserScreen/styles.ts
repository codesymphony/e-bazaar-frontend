import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 50px;
`;

export const Message = styled.div`
  color: ${({ theme }) => theme.colors.darkGrey};
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  margin-bottom: 3rem;
`;
