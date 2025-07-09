import React, { useState } from 'react';

const Tooltip: React.FC<{ text: string }> = ({ text }) => {
    const [show, setShow] = useState(false);
    
    return (
        <div className="relative flex items-center" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <svg
                className="w-4 h-4 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
                />
            </svg>
            <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-950 text-slate-200 text-xs rounded-lg shadow-lg z-10 transition-all duration-200 ease-in-out ${
                    show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1 pointer-events-none'
                }`}
                style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)' }}
            >
                {text}
                <svg
                    className="absolute left-1/2 -translate-x-1/2 top-full h-2 w-2 text-slate-950"
                    x="0px"
                    y="0px"
                    viewBox="0 0 255 255"
                >
                    <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
                </svg>
            </div>
        </div>
    );
};

export default Tooltip;