import React from 'react';
import s from './styles.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISquareLoaderProps {
  fullScreen: boolean;
  loadingText?: string;
}

const GradientLoader: React.FC<ISquareLoaderProps> = ({ fullScreen, loadingText }) => (
  <div className={fullScreen && s.canvas}>
    <svg className={s.image}>
      <g>
        <path d="M 50,100 A 1,1 0 0 1 50,0" />
      </g>
      <g>
        <path d="M 50,75 A 1,1 0 0 0 50,-25" />
      </g>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" className={s.stop0} />
          <stop offset="100%" className={s.stop100} />
        </linearGradient>
      </defs>
    </svg>
    {loadingText && <span>{loadingText}</span>}
  </div>
);

export default GradientLoader;
