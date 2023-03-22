import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from '../../../app/hooks';
import { selectSessionState } from '../../../features/sessions/sessions-slice';
import { ErrorFeedbackStyled } from './error-feedback-styled';

const ErrorFeedback = () => {
  const sessionListState = useAppSelector(selectSessionState);
  const { sessionMsg } = sessionListState;

  return (
    <>
      <ErrorFeedbackStyled>
        <FontAwesomeIcon
          icon={solid('circle-exclamation')}
          className="error-icon"
        />
        <h3 className="error-message">{sessionMsg}</h3>
      </ErrorFeedbackStyled>
    </>
  );
};

export default ErrorFeedback;
