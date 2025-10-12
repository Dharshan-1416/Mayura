import React from 'react';

interface HUDLoaderProps {
  variant?: 'micro' | 'fullscreen';
  message?: string;
}

export const HUDLoader: React.FC<HUDLoaderProps> = ({
  variant = 'micro',
  message
}) => {
  if (variant === 'micro') {
    return (
      <div className="hud-loader-micro" role="status" aria-label="Loading">
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hud-ring-micro"
        >
          <circle
            cx="50"
            cy="50"
            r="40"
            stroke="url(#goldGradientMicro)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="60 190"
            className="hud-ring-animate"
          />
          <circle
            cx="50"
            cy="50"
            r="32"
            stroke="url(#goldGradientMicro)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="40 160"
            className="hud-ring-animate-reverse"
          />
          <defs>
            <linearGradient id="goldGradientMicro" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
              <stop offset="50%" stopColor="#FFA500" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  return (
    <div className="hud-loader-fullscreen" role="status" aria-label={message || "Loading"}>
      <div className="hud-backdrop" />
      <div className="hud-container">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="hud-ring-main"
        >
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="url(#goldGradient1)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="80 420"
            className="hud-ring-outer"
            filter="url(#glow)"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="url(#goldGradient2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="60 380"
            className="hud-ring-middle"
            filter="url(#glow)"
          />
          <circle
            cx="100"
            cy="100"
            r="60"
            stroke="url(#goldGradient3)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="40 340"
            className="hud-ring-inner"
            filter="url(#glow)"
          />
          <defs>
            <linearGradient id="goldGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
              <stop offset="33%" stopColor="#FFA500" stopOpacity="0.95" />
              <stop offset="66%" stopColor="#FFD700" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FF8C00" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="goldGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA500" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFA500" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="goldGradient3" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#FF8C00" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.9" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
        {message && (
          <p className="hud-message" aria-live="polite">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};
