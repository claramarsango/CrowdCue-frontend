import { FC } from 'react';
import { sessionResponse } from '../../../../models/session-model';
import { SessionCardContainer } from './session-card-styled';

interface SessionCardProps {
  session: sessionResponse;
}

const SessionCard: FC<SessionCardProps> = ({ session }) => {
  return (
    <>
      <SessionCardContainer>
        <img
          src={session.coverImageURL}
          alt={`${session.title} cover`}
          className="session-card__cover"
        />
        <p className="session-card__title">{session.title}</p>
      </SessionCardContainer>
    </>
  );
};

export default SessionCard;
