
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "px-7 py-3 font-semibold rounded-lg focus:outline-none transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2";
  
  const variantClasses = {
    primary: "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:bg-indigo-500 focus:ring-4 focus:ring-indigo-500/50",
    secondary: "text-slate-300 border border-slate-700 hover:bg-slate-800 hover:border-slate-600 hover:text-white focus:ring-4 focus:ring-indigo-500/50"
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
