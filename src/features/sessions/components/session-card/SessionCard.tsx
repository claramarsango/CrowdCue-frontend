import { FC } from 'react';
import { Link } from 'react-router-dom';
import { sessionResponse } from '../../../../models/session-model';

interface SessionCardProps {
  session: sessionResponse;
}

const SessionCard: FC<SessionCardProps> = ({ session }) => {
  const { _id, title, coverImageURL } = session;

  return (
    <>
      <Link to={`sessions/${_id}`} className="session-card-link">
        <img
          src={coverImageURL}
          alt={`${title} cover`}
          className="session-card__cover"
        />
        <p className="session-card__title">{title}</p>
      </Link>
    </>
  );
};

export default SessionCard;
