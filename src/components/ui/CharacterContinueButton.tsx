'use client';

import React from 'react';
import Image from 'next/image';

interface Props {
  onClick: () => void;
  disabled?: boolean;
  /** Если задано — рисуется бирюзовая кнопка с текстом вместо стандартной "ПРОДОЛЖИТЬ" из SVG. */
  label?: string;
}

const CharacterContinueButton: React.FC<Props> = ({ onClick, disabled, label }) => {
  if (label) {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={label}
        className="transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed relative w-58 h-17 border-0 bg-transparent p-0"
      >
        <svg
          viewBox="0 0 238 67"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
          preserveAspectRatio="none"
        >
          <mask id="ccp-frame-mask" fill="white">
            <path d="M231.222 0C231.222 3.62676 234.07 6.58813 237.651 6.76953L238 6.77832V59.249C234.256 59.249 231.222 62.2837 231.222 66.0273H6.77832C6.77828 62.4007 3.93019 59.4393 0.348633 59.2578L0 59.249V6.77832C3.7436 6.77826 6.77832 3.74361 6.77832 0H231.222Z" />
          </mask>
          <path d="M231.222 0C231.222 3.62676 234.07 6.58813 237.651 6.76953L238 6.77832V59.249C234.256 59.249 231.222 62.2837 231.222 66.0273H6.77832C6.77828 62.4007 3.93019 59.4393 0.348633 59.2578L0 59.249V6.77832C3.7436 6.77826 6.77832 3.74361 6.77832 0H231.222Z" fill="#2F2F2F" />
          <path d="M231.222 0C231.222 3.62676 234.07 6.58813 237.651 6.76953L238 6.77832V59.249C234.256 59.249 231.222 62.2837 231.222 66.0273H6.77832C6.77828 62.4007 3.93019 59.4393 0.348633 59.2578L0 59.249V6.77832C3.7436 6.77826 6.77832 3.74361 6.77832 0H231.222Z" fill="url(#ccp-grad-frame)" />
          <path d="M231.222 0C231.222 3.62676 234.07 6.58813 237.651 6.76953L238 6.77832V59.249C234.256 59.249 231.222 62.2837 231.222 66.0273H6.77832C6.77828 62.4007 3.93019 59.4393 0.348633 59.2578L0 59.249V6.77832C3.7436 6.77826 6.77832 3.74361 6.77832 0H231.222Z" stroke="#00A59D" strokeWidth="2" mask="url(#ccp-frame-mask)" />
          <mask id="ccp-inner-mask" fill="white">
            <path d="M227.42 3.56647C227.42 6.40237 229.373 8.78065 232.007 9.43365V56.5928C229.373 57.2458 227.42 59.625 227.42 62.461C227.42 62.4845 227.422 62.5079 227.422 62.5313H10.8154C10.8157 62.5079 10.8174 62.4845 10.8174 62.461C10.8174 59.1218 8.11071 56.4151 4.77148 56.4151C4.5077 56.4151 4.24804 56.4331 3.99316 56.4659V9.56061C4.24808 9.59338 4.50765 9.61236 4.77148 9.61237C8.11071 9.61237 10.8174 6.90569 10.8174 3.56647H227.42Z" />
          </mask>
          <path d="M227.42 3.56647C227.42 6.40237 229.373 8.78065 232.007 9.43365V56.5928C229.373 57.2458 227.42 59.625 227.42 62.461C227.42 62.4845 227.422 62.5079 227.422 62.5313H10.8154C10.8157 62.5079 10.8174 62.4845 10.8174 62.461C10.8174 59.1218 8.11071 56.4151 4.77148 56.4151C4.5077 56.4151 4.24804 56.4331 3.99316 56.4659V9.56061C4.24808 9.59338 4.50765 9.61236 4.77148 9.61237C8.11071 9.61237 10.8174 6.90569 10.8174 3.56647H227.42Z" fill="#00A59D" />
          <path d="M227.42 3.56647C227.42 6.40237 229.373 8.78065 232.007 9.43365V56.5928C229.373 57.2458 227.42 59.625 227.42 62.461C227.42 62.4845 227.422 62.5079 227.422 62.5313H10.8154C10.8157 62.5079 10.8174 62.4845 10.8174 62.461C10.8174 59.1218 8.11071 56.4151 4.77148 56.4151C4.5077 56.4151 4.24804 56.4331 3.99316 56.4659V9.56061C4.24808 9.59338 4.50765 9.61236 4.77148 9.61237C8.11071 9.61237 10.8174 6.90569 10.8174 3.56647H227.42Z" fill="url(#ccp-grad-inner)" />
          <path d="M227.42 3.56647C227.42 6.40237 229.373 8.78065 232.007 9.43365V56.5928C229.373 57.2458 227.42 59.625 227.42 62.461C227.42 62.4845 227.422 62.5079 227.422 62.5313H10.8154C10.8157 62.5079 10.8174 62.4845 10.8174 62.461C10.8174 59.1218 8.11071 56.4151 4.77148 56.4151C4.5077 56.4151 4.24804 56.4331 3.99316 56.4659V9.56061C4.24808 9.59338 4.50765 9.61236 4.77148 9.61237C8.11071 9.61237 10.8174 6.90569 10.8174 3.56647H227.42Z" stroke="#00A59D" strokeWidth="2" mask="url(#ccp-inner-mask)" />
          <rect x="14.9791" y="10.2238" width="208.517" height="45.4126" rx="4.75524" fill="#00A59D" />
          <defs>
            <radialGradient id="ccp-grad-frame" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(119) rotate(90) scale(24.4777 95.3054)">
              <stop stopColor="#464646" />
              <stop offset="1" stopColor="#C84B2F" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ccp-grad-inner" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(119 3.56647) rotate(90) scale(21.8334 85.0096)">
              <stop stopColor="#00B9B0" />
              <stop offset="1" stopColor="#00B9B0" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
        <span
          className="absolute inset-0 flex items-center justify-center text-white font-firenight uppercase pointer-events-none"
          style={{ fontSize: '21px', lineHeight: '130%', letterSpacing: '0' }}
        >
          {label}
        </span>
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer relative w-58 h-17"
    >
      <Image src="/create_char/Continue_svg.svg" alt="Продолжить" fill className="object-contain pointer-events-none" unoptimized />
    </button>
  );
};

export default CharacterContinueButton;
