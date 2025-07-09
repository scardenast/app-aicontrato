import React from 'react';
import Tooltip from './Tooltip';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id: string;
  error?: string;
  tooltip?: string;
}

const Textarea: React.FC<TextareaProps> = ({ label, id, error, tooltip, ...props }) => {
  const baseClasses = "w-full px-3 py-2 border rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 transition-colors duration-200 ease-in-out";
  const colorClasses = error 
    ? 'bg-red-900/20 border-red-500/50 text-red-300 placeholder-red-400/70 focus:ring-red-500 focus:border-red-500' 
    : 'bg-slate-800/80 border-slate-700 text-slate-200 focus:bg-slate-800 focus:ring-indigo-500 focus:border-indigo-500';

  return (
    <div>
      {label && (
        <div className="flex items-center mb-1">
            <label htmlFor={id} className="block text-sm font-medium text-slate-300">
                {label}
            </label>
            {tooltip && <div className="ml-2"><Tooltip text={tooltip} /></div>}
        </div>
      )}
      <textarea
        id={id}
        rows={5}
        {...props}
        className={`${baseClasses} ${colorClasses}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <p id={`${id}-error`} className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default Textarea;