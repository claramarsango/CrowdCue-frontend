import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { createSessionAsync, selectSessionState } from '../../sessions-slice';
import { CreateSessionForm } from './session-form-styled';

const SessionForm = () => {
  const submitState = useAppSelector(selectSessionState);
  const { createSessionState, sessionMsg, session } = submitState;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (createSessionState === 'success' && session._id !== '0') {
      navigate(`/sessions/${session._id}`);
    }
  }, [createSessionState, navigate, session._id]);

  return (
    <>
      <CreateSessionForm
        onSubmit={event => {
          event.preventDefault();
          dispatch(createSessionAsync(event.currentTarget));
        }}
      >
        <div className="form__input-fields">
          <div className="input-fields__image">
            <div className="image__input-container">
              <input
                className="image__input"
                type="file"
                id="session-cover"
                name="session-cover"
                accept="image/png, image/jpeg"
                data-testid="img-input"
              />
            </div>
            <label htmlFor="session-cover" className="image__label">
              upload an image
            </label>
          </div>

          <div className="input-fields__title">
            <label htmlFor="title" className="title__label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="title__input"
              required
            />
            <p
              className={`form__error ${
                createSessionState === 'error' ? '' : 'form__error--hidden'
              }`}
              role="paragraph"
            >
              {sessionMsg}
            </p>
          </div>
        </div>

        <button className="form__submit-button" type="submit">
          Start session
        </button>
      </CreateSessionForm>
    </>
  );
};

export default SessionForm;
