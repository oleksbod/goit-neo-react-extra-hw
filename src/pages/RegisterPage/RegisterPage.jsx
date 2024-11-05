import DocumentTitle from '../../components/DocumentTitle';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="main">
      <DocumentTitle>Registration</DocumentTitle>
      <RegisterForm />
    </div>
  );
}
