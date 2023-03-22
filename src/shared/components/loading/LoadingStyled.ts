import styled from 'styled-components';

interface LoadingSpinnerProps {
  container: string;
}

export const LoadingSpinner = styled.span<LoadingSpinnerProps>`
  .spinner {
    margin: ${props =>
      props.container === 'button' ? '0 auto' : '6rem auto 1rem'};
    width: ${props => (props.container === 'button' ? '2' : '9')}rem;
    height: ${props => (props.container === 'button' ? '2' : '9')}rem;
    border-radius: 100%;
    animation: spin 1.5s linear infinite;
    background: conic-gradient(
      from 46.16deg at 58.37% 50%,
      rgba(166, 177, 188, 0) -19.34deg,
      rgba(166, 177, 188, 0) 87.5deg,
      #a6b1bc 273.75deg,
      #a6b1bc 340.63deg,
      rgba(166, 177, 188, 0) 340.66deg,
      rgba(166, 177, 188, 0) 447.5deg
    );
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
