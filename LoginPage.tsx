
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

import AuthLayout from '../components/AuthLayout';
import { useLanguage } from '../hooks/useLanguage';
import Spinner from '../components/common/Spinner';
import { useAuth } from '../hooks/useAuth';
import { User } from '../context/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate network delay and local authentication
    setTimeout(() => {
      try {
        const storedUsers = localStorage.getItem('novaChatUsers');
        const users = storedUsers ? JSON.parse(storedUsers) : {};
        const userData = Object.values(users).find((u: any) => u.email === email) as (User & { password?: string }) | undefined;

        if (userData && userData.password === password) {
          const { password: _, ...userToLogin } = userData; // Exclude password from user object
          login(userToLogin);
          navigate('/');
        } else {
          setError(t('login.invalidCredentials'));
        }
      } catch (err) {
        setError('An unexpected error occurred during login.');
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold text-center text-gray-700 mb-2 font-cinzel">{t('login.welcome')}</h2>
      <p className="text-center text-gray-500 mb-6">{t('login.loginButton')}</p>
      <form onSubmit={handleLogin}>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-600 mb-2" htmlFor="email">{t('login.email')}</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-2" htmlFor="password">{t('login.password')}</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-purple-600 transition-transform duration-150 ease-in-out active:scale-90"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition duration-300 flex items-center justify-center disabled:opacity-50"
        >
          {loading ? <Spinner size="sm" color="border-white" /> : t('login.loginButton')}
        </button>
      </form>
      <div className="text-center mt-4">
        <Link to="/forgot-password" className="text-sm text-purple-600 hover:underline">{t('login.forgotPassword')}</Link>
      </div>
      <p className="text-center mt-6 text-gray-600">
        {t('login.noAccount')} <Link to="/register" className="text-purple-600 hover:underline font-semibold">{t('login.registerHere')}</Link>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
