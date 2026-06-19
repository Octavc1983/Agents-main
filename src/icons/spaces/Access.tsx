
import { useThemeMode } from '@/providers/ThemeProvider';

export type SpaceIconProps = { size?: number; title?: string };

export function AccessIcon({ size = 40, title = 'Access' }: SpaceIconProps) {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const color1 = isLight ? '#0033E0' : '#1EA2E8';
  const color2 = isLight ? '#52C8EF' : '#52C8EF';
  const color3 = isLight ? '#0000C0' : 'rgba(58,103,255,0.80)';

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title}>
      <rect x="1.24985" y="1.25" width="26.7858" height="32.144" rx="2" fill={color2} />
      <path d="M36.75 6.60645C37.8546 6.60645 38.75 7.50188 38.75 8.60645V36.75C38.75 37.8546 37.8546 38.75 36.75 38.75H13.9639C12.8595 38.7498 11.9639 37.8544 11.9639 36.75V8.60645C11.9639 7.50201 12.8595 6.60666 13.9639 6.60645H36.75ZM34.6328 20C33.5235 20.0001 32.6241 20.8994 32.624 22.0088C32.624 23.1183 33.5234 24.0175 34.6328 24.0176C35.7423 24.0176 36.6416 23.1183 36.6416 22.0088C36.6415 20.8993 35.7422 20 34.6328 20Z" fill={color3} />
      <path d="M28.0072 31.3936C28.0072 32.498 27.1116 33.3933 26.0072 33.3936H11.9359V8.60645C11.9359 7.50204 12.8306 6.60671 13.9349 6.60645H28.0072V31.3936Z" fill={color1} />
    </svg>
  );
}
