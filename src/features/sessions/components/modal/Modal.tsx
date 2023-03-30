import { Dispatch, FC, SetStateAction } from 'react';
import { ModalStyled } from './modal-styled';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  deleteSessionAsync,
  leaveSessionAsync,
  selectSessionState,
} from '../../sessions-slice';

interface ModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  sessionId: string;
}

const Modal: FC<ModalProps> = ({ setIsOpen, sessionId }) => {
  const dispatch = useAppDispatch();
  const sessionDetailState = useAppSelector(selectSessionState);
  const { session } = sessionDetailState;

  const checkForRole = () => {
    if (sessionStorage.getItem('User ID') === session.admin) {
      return (
        <>
          <div className="message-container">
            <h2 className="message__check">
              Are you sure you want to end the session?
            </h2>
            <p className="message__warning">
              This will also end the session for all participants
            </p>
          </div>
          <div className="buttons-container">
            <button
              className="buttons__end"
              onClick={() => {
                dispatch(deleteSessionAsync(sessionId));
                setIsOpen(false);
              }}
              data-testid="modal-end-button"
            >
              End session
            </button>
            <button
              className="buttons__cancel"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="message-container">
            <h2 className="message__participant-check">
              Are you sure you want to disconnect from the session?
            </h2>
          </div>
          <div className="buttons-container">
            <button
              data-testid="leave-session-button"
              className="buttons__end"
              onClick={() => {
                dispatch(leaveSessionAsync(sessionId));
                setIsOpen(false);
              }}
            >
              Leave session
            </button>
            <button
              className="buttons__cancel"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <ModalStyled>{checkForRole()}</ModalStyled>
    </>
  );
};

export default Modal;
