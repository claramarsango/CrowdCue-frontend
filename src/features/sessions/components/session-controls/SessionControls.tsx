import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import ErrorFeedback from '../../../../shared/components/error-feedback/ErrorFeedback';
import Loading from '../../../../shared/components/loading/Loading';
import {
  deleteSessionAsync,
  getSessionDetailAsync,
  selectSessionState,
} from '../../sessions-slice';
import { SectionTitle } from '../create-form/session-form-styled';
import { SessionControlsStyled } from './session-controls-styled';

interface SessionControlsProps {
  sessionId: string;
}

const SessionControls: FC<SessionControlsProps> = ({ sessionId }) => {
  const sessionDetailState = useAppSelector(selectSessionState);
  const { session, status } = sessionDetailState;
  const { title, participants } = session;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSessionDetailAsync(sessionId));
  }, [dispatch, sessionId]);

  const handleDeleteClick = () => {
    dispatch(deleteSessionAsync(sessionId));
    navigate('/');
  };

  const generateSessionDetail = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <Loading container="page" />
            <h3>Loading session</h3>
          </>
        );
      case 'failed':
        return (
          <>
            <ErrorFeedback />
          </>
        );
      default:
        return (
          <>
            <SectionTitle>{title}</SectionTitle>
            <SessionControlsStyled>
              <p className="participants">
                There are {participants.length} people in this session
              </p>
              <div className="player">
                <p className="player__message">
                  There are no songs playing currently
                </p>
              </div>
              <p className="session-url">
                <span className="url__title">URL</span>:
                {`  ${process.env.REACT_APP_API_URL}api/v1/sessions/${sessionId}`}
              </p>
              <div className="control-buttons">
                <button className="buttons__search">Search</button>
                <button className="buttons__queue">Queue</button>
                <button className="buttons__quit" onClick={handleDeleteClick}>
                  End session
                </button>
              </div>
            </SessionControlsStyled>
          </>
        );
    }
  };

  return <>{generateSessionDetail()}</>;
};

export default SessionControls;
