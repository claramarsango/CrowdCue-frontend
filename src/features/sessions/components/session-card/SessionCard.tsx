import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { sessionResponse } from '../../../../models/session-model';
import { joinSessionAsync, selectSessionState } from '../../sessions-slice';

interface SessionCardProps {
  session: sessionResponse;
}

const SessionCard: FC<SessionCardProps> = ({ session }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const sessionState = useAppSelector(selectSessionState);
  const { joinStatus, user } = sessionState;

  const { _id, title, coverImageURL } = session;

  useEffect(() => {
    if (joinStatus === 'success') navigate(`sessions/${_id}`);
  }, [_id, navigate, joinStatus, dispatch]);

  const handleClick = () => {
    if (user.inSession === _id.toString()) {
      navigate(`sessions/${_id}`);
      return;
    }
    dispatch(joinSessionAsync(_id.toString()));
  };

  return (
    <>
      <div onClick={handleClick}>
        <img
          src={coverImageURL}
          alt={`${title} cover`}
          className="session-card__cover"
        />
        <p className="session-card__title" role="paragraph">
          {title}
        </p>
      </div>
    </>
  );
};

export default SessionCard;
