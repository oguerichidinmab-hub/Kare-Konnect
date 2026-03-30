import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, HeartPulse, Calendar, MessageSquare, User } from 'lucide-react';
import { cn } from '../lib/utils';

const BottomNav = () => {
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Counselors', path: '/counselors' },
    { icon: HeartPulse, label: 'Support', path: '/support' },
    { icon: Calendar, label: 'Sessions', path: '/sessions' },
    { icon: MessageSquare, label: 'Assistant', path: '/assistant' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 nav-blur border-t border-sage-100 safe-bottom z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }: { isActive: boolean }) =>
              cn(
                "flex flex-col items-center justify-center flex-1 h-full transition-colors",
                isActive ? "text-sage-600" : "text-gray-400"
              )
            }
          >
            <item.icon size={20} strokeWidth={2} />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
