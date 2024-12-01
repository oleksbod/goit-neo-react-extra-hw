import DocumentTitle from '../../components/DocumentTitle';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

export default function RegisterPage() {
  return (
    <div className="main">
      <DocumentTitle>Registration</DocumentTitle>
      <RegistrationForm />
    </div>
  );
}
