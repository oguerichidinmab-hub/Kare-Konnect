import React from 'react';
import { motion } from 'motion/react';
import Logo from './Logo';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-sage-500 flex flex-col items-center justify-center text-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          duration: 0.8,
          ease: "easeOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="mb-6"
      >
        <div className="bg-white/20 p-6 rounded-[2.5rem]">
          <Logo size={48} iconClassName="text-white" className="gap-0" />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold tracking-tight">Kare Konnect</h1>
        <p className="text-sage-100 text-sm mt-2 font-medium">Human-centered support</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]" />
          <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
