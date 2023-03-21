import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { sessionResponse } from '../../../../../models/session-model';
import Loading from '../../../../../shared/components/Loading';
import { getSessionsAsync, selectSessionState } from '../../../sessions-slice';
import { SessionCardContainer } from '../../session-card/session-card-styled';
import SessionCard from '../../session-card/SessionCard';
import { ListFeedback, SessionsListContainer } from './session-list-styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const SessionsList = () => {
  const sessionListState = useAppSelector(selectSessionState);
  const { status, previewSessions, sessionMsg } = sessionListState;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSessionsAsync());
  }, [dispatch]);

  const generateSessionsList = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <Loading container="page" />
            <h3>Loading sessions</h3>
          </>
        );
      case 'failed':
        return (
          <ListFeedback>
            <FontAwesomeIcon
              icon={solid('circle-exclamation')}
              className="error-icon"
            />
            <h3 className="error-message">{sessionMsg}</h3>
          </ListFeedback>
        );
      default:
        return (
          <SessionsListContainer>
            {previewSessions.map((session: sessionResponse) => (
              <SessionCardContainer key={`session-id-${session._id}`}>
                <SessionCard session={session} />
              </SessionCardContainer>
            ))}
          </SessionsListContainer>
        );
    }
  };

  return <>{generateSessionsList()}</>;
};

export default SessionsList;
