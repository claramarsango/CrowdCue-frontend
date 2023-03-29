import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import SessionControls from '../../features/sessions/components/session-controls/SessionControls';
import { getSessionDetailAsync } from '../../features/sessions/sessions-slice';

const SessionDetail = () => {
  const dispatch = useAppDispatch();

  const currentSession = sessionStorage.getItem('Current Session') ?? '';

  useEffect(() => {
    dispatch(getSessionDetailAsync(currentSession));
  }, [currentSession, dispatch]);

  return (
    <>
      <SessionControls sessionId={currentSession} />
    </>
  );
};

export default SessionDetail;
