// 🔥 PREMIUM SIGNUP - 50/50 Split Screen
// src/pages/Signup.js

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { Eye, EyeOff, Mail, Lock, User, Loader2, ArrowRight } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    setLoading(true);
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });
      toast.success("Account created!");
      navigate("/plan");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already registered");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address");
      } else {
        toast.error("Signup failed. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - 50% */}
      <div className="hidden lg:flex lg:w-1/2 relative min-h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-800/80" />
        
        <div className="relative z-10 flex flex-col justify-between p-16 w-full h-full">
          <div>
            <span className="text-white/60 text-xs tracking-[0.2em] font-light uppercase">
              Trip Planner
            </span>
          </div>
          
          <div className="space-y-4 max-w-md">
            <h1 className="text-4xl font-light text-white leading-tight tracking-tight">
              Start your
              <span className="block font-medium">next journey</span>
            </h1>
            <p className="text-white/40 text-sm leading-relaxed font-light">
              Join thousands of travelers planning their dream trips
            </p>
          </div>
          
          <div className="flex items-center gap-6 text-white/20 text-xs tracking-wider">
            <span>© 2026</span>
            <span className="w-px h-3 bg-white/10" />
            <span className="hover:text-white/40 transition-colors cursor-pointer">Privacy</span>
            <span className="hover:text-white/40 transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </div>

      {/* Right Side - 50% */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12 min-h-screen">
        <div className={`
          w-full max-w-sm transition-all duration-700 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
        `}>
          <div className="lg:hidden mb-10 text-center">
            <span className="text-xs tracking-[0.2em] font-light text-slate-900 uppercase">
              Trip Planner
            </span>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-light text-slate-900 tracking-tight">
                Create account
              </h2>
              <p className="text-slate-400 text-sm mt-1.5 font-light">
                Start planning your next adventure
              </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600 tracking-wide uppercase">
                  Full name
                </label>
                <div className="relative">
                  <User className={`
                    absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
                    transition-colors duration-200
                    ${focusedField === 'name' ? 'text-slate-600' : 'text-slate-300'}
                  `} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="
                      w-full pl-9 pr-4 py-2.5 bg-slate-50 border
                      rounded-lg transition-all duration-200 outline-none
                      focus:border-slate-400 focus:bg-white
                      hover:border-slate-300
                      text-sm placeholder:text-slate-300
                    "
                    style={{
                      borderColor: focusedField === 'name' ? '#94a3b8' : '#e2e8f0'
                    }}
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600 tracking-wide uppercase">
                  Email
                </label>
                <div className="relative">
                  <Mail className={`
                    absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
                    transition-colors duration-200
                    ${focusedField === 'email' ? 'text-slate-600' : 'text-slate-300'}
                  `} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="
                      w-full pl-9 pr-4 py-2.5 bg-slate-50 border
                      rounded-lg transition-all duration-200 outline-none
                      focus:border-slate-400 focus:bg-white
                      hover:border-slate-300
                      text-sm placeholder:text-slate-300
                    "
                    style={{
                      borderColor: focusedField === 'email' ? '#94a3b8' : '#e2e8f0'
                    }}
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-600 tracking-wide uppercase">
                  Password
                </label>
                <div className="relative">
                  <Lock className={`
                    absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
                    transition-colors duration-200
                    ${focusedField === 'password' ? 'text-slate-600' : 'text-slate-300'}
                  `} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className="
                      w-full pl-9 pr-10 py-2.5 bg-slate-50 border
                      rounded-lg transition-all duration-200 outline-none
                      focus:border-slate-400 focus:bg-white
                      hover:border-slate-300
                      text-sm placeholder:text-slate-300
                    "
                    style={{
                      borderColor: focusedField === 'password' ? '#94a3b8' : '#e2e8f0'
                    }}
                    placeholder="Minimum 6 characters"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-1.5">Must be at least 6 characters</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full py-2.5 bg-slate-900 hover:bg-slate-800
                  text-white text-sm font-medium rounded-lg
                  transition-all duration-200
                  hover:shadow-lg hover:shadow-slate-200
                  active:scale-[0.98]
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
                  flex items-center justify-center gap-2
                "
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    Create account
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-slate-400 uppercase tracking-wider">
                  Or
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                toast.info("Google signup coming soon");
              }}
              className="
                w-full py-2.5 bg-white border border-slate-200
                rounded-lg transition-all duration-200
                hover:bg-slate-50 hover:border-slate-300
                hover:shadow-sm
                active:scale-[0.98]
                flex items-center justify-center gap-3
              "
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm text-slate-600">Continue with Google</span>
            </button>

            <p className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-slate-900 hover:text-slate-600 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
