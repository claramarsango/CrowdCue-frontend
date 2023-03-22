import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
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
  const { session } = sessionDetailState;
  const { title, participants } = session;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSessionDetailAsync(sessionId));
  }, [dispatch, sessionId]);

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
          <button className="buttons__quit">Leave session</button>
        </div>
      </SessionControlsStyled>
    </>
  );
};

export default SessionControls;
