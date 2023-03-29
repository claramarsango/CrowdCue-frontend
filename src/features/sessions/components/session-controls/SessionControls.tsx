import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import ErrorFeedback from '../../../../shared/components/error-feedback/ErrorFeedback';
import Loading from '../../../../shared/components/loading/Loading';
import { SectionTitle } from '../../../../shared/styles/shared-styled';
import { selectSessionState, restoreAllStatus } from '../../sessions-slice';
import Modal from '../modal/Modal';
import { SessionControlsStyled } from './session-controls-styled';

interface SessionControlsProps {
  sessionId: string;
}

const SessionControls: FC<SessionControlsProps> = ({ sessionId }) => {
  const sessionDetailState = useAppSelector(selectSessionState);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { session, status, exitStatus } = sessionDetailState;
  const { title, participants, admin } = session;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (exitStatus === 'success') navigate('/');
    dispatch(restoreAllStatus());
  }, [dispatch, exitStatus, navigate]);

  const generateSessionDetail = () => {
    switch (status) {
      case 'loading':
        return <Loading container="page" />;
      case 'failed':
        return <ErrorFeedback />;
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
                <button
                  className="buttons__quit"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  {sessionStorage.getItem('User ID') === admin
                    ? 'End session'
                    : 'Leave session'}
                </button>
              </div>
            </SessionControlsStyled>
          </>
        );
    }
  };

  return (
    <>
      {isOpen && <Modal setIsOpen={setIsOpen} sessionId={sessionId} />}
      {generateSessionDetail()}
    </>
  );
};

export default SessionControls;
