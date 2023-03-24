import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { sessionResponse } from '../../../../../models/session-model';
import Loading from '../../../../../shared/components/loading/Loading';
import {
  getSessionsAsync,
  selectSessionState,
  restoreDeleteStatus,
} from '../../../sessions-slice';
import { SessionCardContainer } from '../../session-card/session-card-styled';
import SessionCard from '../../session-card/SessionCard';
import { SessionsListContainer } from './session-list-styled';
import ErrorFeedback from '../../../../../shared/components/error-feedback/ErrorFeedback';

const SessionsList = () => {
  const sessionListState = useAppSelector(selectSessionState);
  const { status, previewSessions } = sessionListState;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(restoreDeleteStatus());
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
        return <ErrorFeedback />;
      default:
        return (
          <SessionsListContainer>
            {previewSessions.map((session: sessionResponse) => (
              <SessionCardContainer key={`session-id-${session._id}`}>
                <SessionCard session={session} data-testid="session-card" />
              </SessionCardContainer>
            ))}
          </SessionsListContainer>
        );
    }
  };

  return <>{generateSessionsList()}</>;
};

export default SessionsList;
