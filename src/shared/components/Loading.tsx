import { FC } from 'react';
import { LoadingSpinner } from './LoadingStyled';

interface LoadingProps {
  container: string;
}
const Loading: FC<LoadingProps> = ({ container }) => {
  return (
    <>
      <LoadingSpinner container={container}>
        <div className="spinner" data-testid="loading-spinner"></div>
      </LoadingSpinner>
    </>
  );
};

export default Loading;
