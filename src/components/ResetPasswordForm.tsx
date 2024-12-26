"use client";

import React, { useState, useEffect } from 'react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../utils/cognito';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get email from query parameters
    const emailFromQuery = searchParams.get('email');
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    }
  }, [searchParams]);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      setMessage(null);
      return;
    }

    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });

    user.confirmPassword(code, newPassword, {
      onSuccess: () => {
        setMessage('Password has been reset. You can now log in.');
        setError(null);
        setTimeout(() => {
          router.push('/login');
        }, 1500);
      },
      onFailure: (err) => {
        setMessage(null);
        setError(err.message || 'Error in resetting password.');
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleResetPassword}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Reset Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Enter Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ResetPasswordForm;
