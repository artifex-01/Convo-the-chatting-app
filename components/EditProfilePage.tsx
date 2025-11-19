
import React, { useState } from 'react';
import { User } from '../types';
import { CameraIcon, CheckIcon, ChevronLeftIcon } from './Icon';

interface EditProfilePageProps {
  user: User;
  onBack: () => void;
  onSave: () => void;
}

const EditProfilePage: React.FC<EditProfilePageProps> = ({ user, onBack, onSave }) => {
  const [name, setName] = useState(user.name);
  const [tagline, setTagline] = useState(user.tagline || '');
  const [phone, setPhone] = useState('+91 98765 43210'); // Mock phone number

  return (
    <div className="flex flex-col h-full bg-[#F2F4F7] dark:bg-slate-950 relative z-30 animate-[slideIn_0.3s_ease-out] transition-colors duration-300">
      {/* Header */}
      <div className="pt-8 pb-4 px-4 flex items-center justify-between bg-[#F2F4F7] dark:bg-slate-950 transition-colors duration-300">
        <button onClick={onBack} className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-full transition-all">
          <ChevronLeftIcon className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Edit Profile</h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-20 no-scrollbar">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mt-6 mb-10">
          <div className="relative group cursor-pointer">
            <div className="w-32 h-32 rounded-full p-1 bg-white dark:bg-slate-800 shadow-sm transition-colors duration-300">
               <img 
                  src={user.avatar} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover border border-gray-100 dark:border-slate-700"
               />
            </div>
            <div className="absolute bottom-0 right-1 bg-black dark:bg-white p-2.5 rounded-full text-white dark:text-black shadow-lg border-2 border-white dark:border-slate-950 hover:scale-110 transition-transform">
               <CameraIcon className="w-5 h-5" />
            </div>
          </div>
          <p className="mt-4 text-blue-600 dark:text-blue-400 font-bold text-sm cursor-pointer hover:underline">Change Profile Photo</p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-2">Full Name</label>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-800 focus-within:ring-2 focus-within:ring-black/5 dark:focus-within:ring-white/10 transition-all">
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-800 dark:text-white font-semibold text-lg"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-2">About</label>
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-800 focus-within:ring-2 focus-within:ring-black/5 dark:focus-within:ring-white/10 transition-all">
                    <input 
                        type="text" 
                        value={tagline} 
                        onChange={(e) => setTagline(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-800 dark:text-white font-medium"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-2">Phone Number</label>
                <div className="bg-gray-100 dark:bg-slate-900 rounded-2xl p-4 border border-transparent">
                    <input 
                        type="text" 
                        value={phone} 
                        disabled
                        className="w-full bg-transparent outline-none text-gray-500 dark:text-gray-500 font-medium cursor-not-allowed"
                    />
                </div>
                <p className="text-xs text-gray-400 ml-2">Phone number cannot be changed.</p>
            </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="absolute bottom-8 left-0 right-0 px-6">
        <button 
            onClick={onSave}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-[20px] shadow-xl flex items-center justify-center gap-3 font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
            <CheckIcon className="w-6 h-6" />
            <span>Save Changes</span>
        </button>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default EditProfilePage;