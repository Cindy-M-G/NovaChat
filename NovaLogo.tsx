
import React from 'react';

const NovaLogo: React.FC<{ size?: string }> = ({ size = 'h-16' }) => (
    <div className="flex flex-col items-center justify-center space-y-2">
        <svg
            className={`${size} text-white animate-glow`}
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <radialGradient id="starGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,1)', stopOpacity: 1 }} />
                    <stop offset="70%" style={{ stopColor: 'rgba(196, 181, 253, 1)', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: 'rgba(139, 92, 246, 1)', stopOpacity: 1 }} />
                </radialGradient>
            </defs>
            <path
                d="M50 0 L61.2 35.5 L98.1 38.2 L70.5 64.5 L78.4 99 L50 79.5 L21.6 99 L29.5 64.5 L1.9 38.2 L38.8 35.5 Z"
                fill="url(#starGradient)"
            />
        </svg>
        <h1 className="text-4xl font-cinzel font-bold text-white tracking-widest" style={{ textShadow: "0 0 8px rgba(196, 181, 253, 0.5)" }}>
            NovaChat
        </h1>
    </div>
);

export default NovaLogo;