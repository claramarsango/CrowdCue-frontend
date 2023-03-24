import { Dispatch, FC, SetStateAction } from 'react';
import { ModalStyled } from './modal-styled';

import { useAppDispatch } from '../../../../app/hooks';
import { deleteSessionAsync } from '../../sessions-slice';

interface ModalProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  sessionId: string;
}

const Modal: FC<ModalProps> = ({ setIsOpen, sessionId }) => {
  const dispatch = useAppDispatch();

  const checkForRole = () => {
    return (
      <>
        <div className="message-container">
          <h2 className="message__check">
            Are you sure you want to disconnect from the session?
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
          <button className="buttons__cancel" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <ModalStyled>{checkForRole()}</ModalStyled>
    </>
  );
};

export default Modal;
