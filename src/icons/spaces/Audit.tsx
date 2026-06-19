
import { useThemeMode } from '@/providers/ThemeProvider';

export type SpaceIconProps = { size?: number; title?: string };

export function AuditIcon({ size = 40, title = 'Audit and Reports' }: SpaceIconProps) {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const layer1 = isLight ? 'rgba(143,0,120,0.80)' : 'rgba(171,36,157,0.80)';
  const layer2 = isLight ? '#E99CE0' : '#E99CE0';
  const layer3 = isLight ? '#A52D97' : '#C931B8';

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title}>
      <path d="M36.3667 15.2202C39.5445 17.5772 39.5445 22.4228 36.3667 24.7798L19.0598 37.6166C15.2454 40.4458 9.90426 37.6573 9.90426 32.8367L9.90427 7.16323C9.90427 2.34263 15.2454 -0.445795 19.0598 2.38343L36.3667 15.2202Z" fill={layer1} />
      <path d="M23.7168 16.0628C26.4206 17.7381 26.4622 21.6732 23.7945 23.4058L7.91839 33.7171C5.04256 35.5849 1.25 33.5108 1.25 30.0703L1.25 9.92191C1.25 6.52285 4.96118 4.44158 7.84071 6.22577L23.7168 16.0628Z" fill={layer2} />
      <path d="M23.7403 16.0848C26.444 17.76 26.4858 21.6949 23.8185 23.4276L9.92101 32.454V7.52234L23.7403 16.0848Z" fill={layer3} />
    </svg>
  );
}
