"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../utils/cognito';
import { AuthDetails } from '../types/auth';

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<AuthDetails>({ Username: '', Password: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const authDetails = new AuthenticationDetails({
      Username: formData.Username,
      Password: formData.Password,
    });

    const user = new CognitoUser({
      Username: formData.Username,
      Pool: UserPool,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log('Login successful:', data);
        localStorage.setItem('idToken', data.getIdToken().getJwtToken());
        router.push('/home'); // Redirect to Home page
      },
      onFailure: (err) => {
        // console.error('Login failed:', err);
        setError(err.message || 'Login failed');
      },
    });
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="Username"
          value={formData.Username}
          onChange={handleInputChange}
          required
        />
      </div>
      <br></br>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="Password"
          value={formData.Password}
          onChange={handleInputChange}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
