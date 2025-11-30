import React, { useState } from 'react';
import { FacebookIcon, GoogleIcon, MailIcon } from './Icon';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = username.trim() !== '' && password.trim() !== '';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username !== "admin" || password !== "admin123") {
      setError("Invalid username or password.");
      setShake(true);

      setTimeout(() => setShake(false), 400);
      return;
    }

    // ------------------------------------------
    // 🔥 STORE LOGIN STATUS IN LOCAL STORAGE
    // ------------------------------------------
    localStorage.setItem("isLoggedIn", "true");

    // call parent function (App)
    onLogin();
  };

  return (
    <div className="w-full dark:bg-slate-950 flex flex-col relative font-sans transition-colors duration-300 parent-login">
       
       <div className="pt-24 px-8 pb-12">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
            Welcome to <br />
            Convo 💬  
          </h1>
       </div>

       <div className="flex-1 rounded-t-[3rem] p-8 pt-10 flex flex-col duration-300 main-container-login">

          <div className={`login-container ${shake ? "shake" : ""}`}>
            <label className="block text-gray-900 dark:text-white font-bold text-lg mb-4">
              Enter Login Details
            </label>

            <form onSubmit={handleLogin}>
              
              {/* Username */}
              <div className="input-wrapper">
                <span className="input-icon">#</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="login-input"
                />
              </div>

              {/* Password */}
              <div className="input-wrapper" style={{ position: "relative" }}>
                <span className="input-icon">**</span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                />

                <span
                  onClick={() => setShowPassword((p) => !p)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#555",
                    userSelect: "none"
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

              {error && (
                <span style={{ color: "red", marginBottom: "10px", display: "block" }}>
                  {error}
                </span>
              )}

              {/* Divider */}
              <div className="relative flex items-center justify-center mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100 dark:border-slate-700"></div>
                </div>
                <span className="relative bg-white dark:bg-slate-900 px-4 text-gray-400 text-sm font-medium">Or</span>
              </div>

              {/* Social Login */}
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
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "25px" }}>
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className="continue-btn"
                >
                  Continue
                </button>
              </div>
            </form>

          </div>
       </div>
    </div>
  );
};

export default LoginPage;
