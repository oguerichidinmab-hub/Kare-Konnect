import React from 'react';
import { HandHeart } from 'lucide-react';
import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  iconClassName, 
  size = 32, 
  showText = false,
  textColor = "text-gray-900"
}) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        "bg-sage-500 rounded-2xl flex items-center justify-center shrink-0",
        size > 40 ? "p-4" : "p-2.5"
      )}>
        <HandHeart 
          size={size} 
          className={cn("text-white", iconClassName)} 
          strokeWidth={2.5}
        />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn("font-bold tracking-tight leading-none", textColor, size > 40 ? "text-2xl" : "text-lg")}>
            Kare Konnect
          </span>
          <span className={cn("text-[10px] font-medium opacity-60", textColor)}>
            Human-centered support
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
