import { FC } from 'react';
import { sessionResponse } from '../../../../models/session-model';

interface SessionCardProps {
  session: sessionResponse;
}

const SessionCard: FC<SessionCardProps> = ({ session }) => {
  return (
    <>
      <img
        src={session.coverImageURL}
        alt={`${session.title} cover`}
        className="session-card__cover"
      />
      <p className="session-card__title">{session.title}</p>
    </>
  );
};

export default SessionCard;
