import React from 'react';

interface VideoPlaceholderProps {
  label?: string;
  className?: string;
}

export const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({
  label = 'Видео',
  className = '',
}) => {
  return (
    <div className={`aspect-video bg-[#0F172A] rounded-2xl flex items-center justify-center border border-[#334155] ${className}`}>
      <div className="text-center">
        <div className="w-16 h-16 bg-[#334155] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" fill="#94A3B8" />
          </svg>
        </div>
        <p className="text-[#64748B] text-sm">{label}</p>
      </div>
    </div>
  );
};
