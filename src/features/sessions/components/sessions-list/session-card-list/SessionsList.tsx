import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { sessionResponse } from '../../../../../models/session-model';
import Loading from '../../../../../shared/components/Loading';
import { getSessionsAsync, selectSessionState } from '../../../sessions-slice';
import SessionCard from '../../session-card/SessionCard';
import { SessionsListContainer } from './session-list-styled';

const SessionsList = () => {
  const sessionListState = useAppSelector(selectSessionState);
  const { status, previewSessions } = sessionListState;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSessionsAsync());
  }, [dispatch]);

  const generateSessionsList = () => {
    switch (status) {
      case 'loading':
        return <Loading />;
      case 'failed':
        return (
          <h2>Error</h2>
          //redirect to 500 page
        );
      default:
        return (
          <SessionsListContainer>
            {previewSessions.map((session: sessionResponse) => (
              <SessionCard session={session} />
            ))}
          </SessionsListContainer>
        );
    }
  };

  return <>{generateSessionsList()}</>;
};

export default SessionsList;
