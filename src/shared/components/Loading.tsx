import { LoadingSpinner } from './LoadingStyled';

const Loading = () => {
  return (
    <LoadingSpinner>
      <div className="spinner" data-testid="loading-spinner"></div>
    </LoadingSpinner>
  );
};

export default Loading;
