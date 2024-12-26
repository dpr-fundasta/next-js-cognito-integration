import React from 'react';
import LoginForm from '../../components/LoginForm';
import Link from 'next/link';
const LoginPage: React.FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
      <p>
        <Link href="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default LoginPage;
