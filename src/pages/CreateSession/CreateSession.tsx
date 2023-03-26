import SessionForm from '../../features/sessions/components/create-form/SessionForm';
import { SectionTitle } from '../../shared/styles/shared-styled';

const CreateSession = () => {
  return (
    <>
      <SectionTitle>Start a session</SectionTitle>
      <SessionForm />
    </>
  );
};
export default CreateSession;
