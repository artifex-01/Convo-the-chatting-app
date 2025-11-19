
import React, { useState } from 'react';
import { FacebookIcon, GoogleIcon, MailIcon } from './Icon';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className="w-full h-full bg-[#E8ECEF] dark:bg-slate-950 flex flex-col relative font-sans transition-colors duration-300">
       {/* Header */}
       <div className="pt-24 px-8 pb-12">
          <div className="flex items-center gap-3 mb-2">
             {/* Language indicator removed as requested */}
          </div>
          <h1 className="text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
            Welcome to <br />
            Convo 👋
          </h1>
       </div>

       {/* Main Card */}
       <div className="flex-1 bg-white dark:bg-slate-900 rounded-t-[3rem] p-8 pt-12 shadow-2xl dark:shadow-slate-800/50 flex flex-col transition-colors duration-300">
          
          {/* Phone Input Section */}
          <div className="mb-8">
            <label className="block text-gray-900 dark:text-white font-bold text-lg mb-4">Enter your phone number</label>
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-4 flex items-center border border-gray-200 dark:border-slate-700 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
               <div className="flex items-center gap-2 pr-3 border-r border-gray-300 dark:border-slate-600">
                  <span className="text-2xl">🇮🇳</span>
                  <span className="font-medium text-gray-500 dark:text-gray-400">+91</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
               </div>
               <input 
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Phone number"
                  className="flex-1 bg-transparent border-none focus:ring-0 px-4 text-gray-900 dark:text-white font-medium placeholder-gray-400 focus:outline-none"
               />
            </div>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-8">
             <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100 dark:border-slate-700"></div>
             </div>
             <span className="relative bg-white dark:bg-slate-900 px-4 text-gray-400 text-sm font-medium">Or</span>
          </div>

          {/* Social Login Options */}
          <div className="space-y-4 mb-auto">
             <button className="w-full bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 p-4 rounded-2xl flex items-center justify-center gap-3 transition-colors group">
                <MailIcon className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform" fill />
                <span className="font-bold text-gray-700 dark:text-gray-300">Mail</span>
             </button>
             <button className="w-full bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 p-4 rounded-2xl flex items-center justify-center gap-3 transition-colors group">
                <GoogleIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-gray-700 dark:text-gray-300">Google</span>
             </button>
             <button className="w-full bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 p-4 rounded-2xl flex items-center justify-center gap-3 transition-colors group">
                <FacebookIcon className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-gray-700 dark:text-gray-300">Facebook</span>
             </button>
          </div>

          {/* Continue Button */}
          <div className="flex justify-end mt-6">
             <button 
                onClick={onLogin}
                className="bg-[#6B8AFD] hover:bg-[#5a76e0] text-white px-10 py-4 rounded-full font-bold shadow-lg shadow-blue-200 dark:shadow-blue-900/20 transform hover:scale-105 active:scale-95 transition-all"
             >
                Continue
             </button>
          </div>

       </div>
    </div>
  );
};

export default LoginPage;