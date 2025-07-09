import React from 'react';
import Tooltip from './Tooltip';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  id: string;
  error?: string;
  tooltip?: string;
  children: React.ReactNode;
}

const Select: React.FC<SelectProps> = ({ label, id, error, tooltip, children, ...props }) => {
  const baseClasses = "w-full px-3 py-2 border rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2 transition-colors duration-200 ease-in-out";
  const colorClasses = error 
    ? 'bg-red-900/20 border-red-500/50 text-red-300 placeholder-red-400/70 focus:ring-red-500 focus:border-red-500' 
    : 'bg-slate-800/80 border-slate-700 text-slate-200 focus:bg-slate-800 focus:ring-indigo-500 focus:border-indigo-500';

  const disabledClasses = props.disabled ? 'bg-slate-800/50 cursor-not-allowed opacity-60' : '';

  return (
    <div className="relative">
      {label && (
        <div className="flex items-center mb-1">
          <label htmlFor={id} className="block text-sm font-medium text-slate-300">
            {label}
          </label>
          {tooltip && <div className="ml-2"><Tooltip text={tooltip} /></div>}
        </div>
      )}
      <div className="relative">
        <select
          id={id}
          {...props}
          className={`${baseClasses} ${colorClasses} ${disabledClasses}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default Select;