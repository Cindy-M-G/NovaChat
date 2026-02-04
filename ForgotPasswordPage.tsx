
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import { useLanguage } from '../hooks/useLanguage';
import Spinner from '../components/common/Spinner';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    // Simulate API call
    setTimeout(() => {
      if (email.trim() !== '' && email.includes('@')) {
        setMessage('If an account with that email exists, a password reset link has been sent.');
      } else {
        setError('Please enter a valid email.');
      }
      setLoading(false);
    }, 500);
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-6 font-cinzel">Reset Password</h2>
      <form onSubmit={handleReset}>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center">{error}</p>}
        {message && <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4 text-center">{message}</p>}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="email">{t('login.email')}</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400" required />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition duration-300 flex items-center justify-center disabled:opacity-50">
          {loading ? <Spinner size="sm" color="border-white" /> : 'Send Reset Link'}
        </button>
      </form>
      <p className="text-center mt-6 text-gray-600">
        <Link to="/login" className="text-purple-600 hover:underline font-semibold">{t('register.loginHere')}</Link>
      </p>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
