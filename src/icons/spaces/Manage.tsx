
import { useThemeMode } from '@/providers/ThemeProvider';

export type SpaceIconProps = { size?: number; title?: string };

export function ManageIcon({ size = 40, title = 'Manage' }: SpaceIconProps) {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const color1 = isLight ? '#38DCBE' : '#0BD4DC';
  const color2 = isLight ? '#00ADA5' : '#049192';
  const color3 = isLight ? '#009B76' : '#02B4B3';

  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title}>
      <path d="M1.17248 23.7117C-0.390826 22.1484 -0.390827 19.6137 1.17248 18.0504L8.14031 11.0826C9.70362 9.51928 12.2382 9.51928 13.8015 11.0826L26.1818 23.4629C27.7451 25.0262 27.7451 27.5608 26.1818 29.1241L19.214 36.0919C17.6507 37.6553 15.1161 37.6553 13.5528 36.0919L1.17248 23.7117Z" fill={color1} />
      <path d="M26.1686 3.86545C27.7271 2.29738 30.2617 2.28963 31.8298 3.84815L38.8189 10.7947C40.3869 12.3532 40.3947 14.8878 38.8362 16.4559L19.2992 36.1126C17.7407 37.6806 15.2061 37.6884 13.638 36.1299L6.64893 29.1834C5.08085 27.6248 5.07311 25.0902 6.63163 23.5221L26.1686 3.86545Z" fill={color2} />
      <path d="M26.1697 23.5146C27.7325 25.0779 27.7328 27.6125 26.1697 29.1756L19.2018 36.1435C18.0379 37.3073 16.3363 37.6021 14.8974 37.0331C14.4356 36.8393 14.0025 36.5557 13.6254 36.1809L6.63633 29.2342C5.06836 27.6756 5.06041 25.1412 6.61889 23.5731L16.3924 13.7373L26.1697 23.5146Z" fill={color3} />
    </svg>
  );
}
