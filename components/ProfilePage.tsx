
import React from 'react';
import { User } from '../types';
import { BriefcaseIcon, ChevronRightIcon, BellIcon, LockIcon, UserIcon, LogOutIcon, MoonIcon } from './Icon';

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
  onEditProfile: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout, onEditProfile, isDarkMode, onToggleDarkMode }) => {
  return (
    <div className="flex flex-col h-full bg-[#F2F4F7] dark:bg-slate-950 pt-8 px-6 pb-32 overflow-y-auto no-scrollbar transition-colors duration-300">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Settings</h1>

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none mb-6 flex flex-col items-center text-center relative overflow-hidden transition-colors duration-300">
         <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-gray-50 to-transparent dark:from-slate-800"></div>
         <div className="relative z-10 mb-4 group cursor-pointer">
            <div className="absolute -inset-1 bg-gradient-to-tr from-gray-200 to-transparent rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-lg relative" />
            <span className={`absolute bottom-1 right-1 w-5 h-5 border-4 border-white dark:border-slate-700 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
         </div>
         <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
         <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mt-1 text-sm font-medium bg-gray-50 dark:bg-slate-800 px-3 py-1 rounded-full">
            <BriefcaseIcon className="w-3.5 h-3.5" />
            <span>{user.tagline}</span>
         </div>
         <button 
            onClick={onEditProfile}
            className="mt-5 px-6 py-2.5 bg-black dark:bg-white dark:text-black text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
         >
            Edit Profile
         </button>
      </div>

      {/* Settings List */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-2 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none space-y-1 transition-colors duration-300">
        <MenuItem icon={<UserIcon />} label="Account" onClick={onEditProfile} />
        <MenuItem icon={<BellIcon />} label="Notifications" badge="2" />
        <MenuItem icon={<LockIcon />} label="Privacy & Security" />
        
        {/* Dark Mode Toggle Item */}
        <div 
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 rounded-2xl transition-colors group cursor-pointer"
            onClick={onToggleDarkMode}
        >
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 dark:group-hover:bg-slate-700 text-gray-600 dark:text-gray-400 flex items-center justify-center group-hover:bg-white dark:group-hover:shadow-sm transition-all duration-300">
                    <MoonIcon className="w-5 h-5" />
                </div>
                <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Dark Mode</span>
            </div>
            <div className={`w-12 h-7 rounded-full p-1 transition-colors duration-300 ${isDarkMode ? 'bg-green-500' : 'bg-gray-200 dark:bg-slate-700'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
        </div>
      </div>

      {/* Logout */}
      <button 
        onClick={onLogout}
        className="mt-6 flex items-center justify-center gap-2 w-full py-4 text-red-500 font-bold bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] dark:shadow-none hover:bg-red-50 dark:hover:bg-slate-800 hover:shadow-md active:scale-[0.99] transition-all duration-200"
      >
        <LogOutIcon className="w-5 h-5" />
        <span>Log Out</span>
      </button>
    </div>
  );
};

const MenuItem = ({ icon, label, badge, onClick }: { icon: React.ReactNode, label: string, badge?: string, onClick?: () => void }) => (
    <button onClick={onClick} className="w-full p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800 rounded-2xl transition-colors group cursor-pointer">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 flex items-center justify-center group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:shadow-sm transition-all duration-300">
                {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{label}</span>
        </div>
        <div className="flex items-center gap-3">
            {badge && <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">{badge}</span>}
            <ChevronRightIcon className="w-5 h-5 text-gray-300 dark:text-slate-600 group-hover:text-gray-500 dark:group-hover:text-slate-400 transition-colors" />
        </div>
    </button>
);

export default ProfilePage;