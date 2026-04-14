import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail 
} from 'firebase/auth';
import { auth } from '../firebase';
import { Button, Card } from './UI';
import Logo from './Logo';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, AlertCircle, ArrowRight, ChevronLeft } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      if (isForgot) {
        await sendPasswordResetEmail(auth, email);
        setMessage('Password reset link sent to your email.');
      } else if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-sage-50 min-h-screen p-6 flex flex-col justify-center shadow-2xl md:shadow-sage-200/50">
      <div className="text-center mb-8">
        <Logo size={40} className="justify-center mb-4" />
        <h1 className="text-3xl font-bold text-gray-900">
          {isForgot ? 'Reset Password' : isLogin ? 'Welcome Back' : 'Create Account'}
        </h1>
        <p className="text-gray-500 mt-2">
          {isForgot 
            ? 'Enter your email to receive a reset link' 
            : isLogin 
              ? 'Sign in to continue your journey' 
              : 'Join Kare Konnect for personalized support'}
        </p>
      </div>

      <Card className="space-y-4">
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                required
                type="email" 
                placeholder="email@example.com"
                className="w-full p-3 pl-10 rounded-xl border border-sage-100 focus:ring-2 focus:ring-sage-500 outline-none text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {!isForgot && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••"
                  className="w-full p-3 pl-10 rounded-xl border border-sage-100 focus:ring-2 focus:ring-sage-500 outline-none text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          )}

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-xs"
              >
                <AlertCircle size={14} />
                {error}
              </motion.div>
            )}
            {message && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-50 border border-green-100 rounded-xl flex items-center gap-2 text-green-600 text-xs"
              >
                <AlertCircle size={14} />
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          <Button type="submit" className="w-full py-4 text-lg" disabled={loading}>
            {loading ? 'Processing...' : isForgot ? 'Send Reset Link' : isLogin ? 'Sign In' : 'Sign Up'}
            {!loading && <ArrowRight size={20} className="ml-2" />}
          </Button>
        </form>

        <div className="flex flex-col gap-3 pt-2">
          {!isForgot && isLogin && (
            <button 
              onClick={() => setIsForgot(true)}
              className="text-sm text-sage-600 font-medium hover:underline"
            >
              Forgot Password?
            </button>
          )}
          
          {isForgot ? (
            <button 
              onClick={() => { setIsForgot(false); setError(''); setMessage(''); }}
              className="text-sm text-sage-600 font-medium flex items-center justify-center gap-1 hover:underline"
            >
              <ChevronLeft size={16} /> Back to Login
            </button>
          ) : (
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); setMessage(''); }}
              className="text-sm text-gray-500 font-medium"
            >
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <span className="text-sage-600 font-bold">{isLogin ? 'Sign Up' : 'Sign In'}</span>
            </button>
          )}
        </div>
      </Card>

      <p className="text-center text-[10px] text-gray-400 font-medium mt-8 px-6">
        By continuing, you agree to Kare Konnect's terms of service and privacy policy.
      </p>
    </div>
  );
};

export default Auth;
