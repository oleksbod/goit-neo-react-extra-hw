import DocumentTitle from '../../components/DocumentTitle';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function LoginPage() {
  return (
    <div className="main">
      <DocumentTitle>Login</DocumentTitle>
      <LoginForm />
    </div>
  );
}
