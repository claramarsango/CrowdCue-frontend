import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import SessionControls from '../../features/sessions/components/session-controls/SessionControls';
import {
  getSessionDetailAsync,
  selectSessionState,
} from '../../features/sessions/sessions-slice';

const SessionDetail = () => {
  const dispatch = useAppDispatch();
  const { session } = useAppSelector(selectSessionState);

  useEffect(() => {
    dispatch(getSessionDetailAsync(session._id.toString()));
  }, [dispatch, session._id]);

  return (
    <>
      <SessionControls sessionId={session._id.toString()} />
    </>
  );
};

export default SessionDetail;
