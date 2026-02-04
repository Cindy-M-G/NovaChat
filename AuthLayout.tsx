
import React from 'react';
import NovaLogo from './common/NovaLogo';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-indigo-900 to-purple-900 opacity-70"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

      <div className="z-10 flex flex-col items-center w-full max-w-md">
        <NovaLogo />
        <div className="mt-8 w-full bg-white rounded-lg shadow-2xl p-8 text-gray-800">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
