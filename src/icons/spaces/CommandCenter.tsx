
import { useThemeMode } from '@/providers/ThemeProvider';

export type SpaceIconProps = { size?: number; title?: string };

export function CommandCenterIcon({ size = 40, title = 'Command Center' }: SpaceIconProps) {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const color1 = isLight ? '#FF333A' : '#FF4D2D';
  const color2 = isLight ? '#FF9D84' : '#FFB05C';
  const overlay = isLight ? 'rgba(255,83,113,0.66)' : 'rgba(255,75,93,0.66)';

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title}>
      <circle cx="22.2813" cy="22.284" r="16.4687" fill={color2} />
      <path d="M21.0586 1.25C18.4573 1.25 15.8814 1.76236 13.4782 2.75784C11.0749 3.75331 8.89119 5.2124 7.05179 7.0518C5.2124 8.89119 3.75331 11.0749 2.75784 13.4782C1.76236 15.8814 1.25 18.4573 1.25 21.0586L21.0586 21.0586L21.0586 1.25Z" fill={overlay} />
      <path d="M21.0588 21.0531H5.85863C6.45813 12.9359 12.9405 6.45541 21.0588 5.85971V21.0531Z" fill={color1} />
    </svg>
  );
}
