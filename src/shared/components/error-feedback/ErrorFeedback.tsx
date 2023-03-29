import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  restoreAllStatus,
  selectSessionState,
} from '../../../features/sessions/sessions-slice';
import { ErrorFeedbackStyled } from './error-feedback-styled';

const ErrorFeedback = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sessionListState = useAppSelector(selectSessionState);
  const { sessionMsg } = sessionListState;

  return (
    <ErrorFeedbackStyled>
      <FontAwesomeIcon
        icon={solid('circle-exclamation')}
        className="error-icon"
      />
      <h3 className="error-message">{sessionMsg}</h3>
      <button
        className="error-redirect-button"
        onClick={() => {
          dispatch(restoreAllStatus());
          navigate('/');
        }}
      >
        Go back home
      </button>
    </ErrorFeedbackStyled>
  );
};

export default ErrorFeedback;
