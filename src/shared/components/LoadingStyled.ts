import styled from 'styled-components';

export const LoadingSpinner = styled.span`
  .spinner {
    margin: auto;
    width: 2rem;
    height: 2rem;
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

  .spinner::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 4px;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
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
