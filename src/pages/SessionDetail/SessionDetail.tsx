import { useParams } from 'react-router-dom';
import SessionControls from '../../features/sessions/components/session-controls/SessionControls';

const SessionDetail = () => {
  const { _id } = useParams();

  return (
    <>
      <SessionControls sessionId={_id ?? ''} />
    </>
  );
};

export default SessionDetail;
