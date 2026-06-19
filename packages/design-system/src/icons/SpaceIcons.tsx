// Space icons — theme-aware SVG components used in the Sidebar space switcher.
// These are product-adjacent but live in the DS because they are used generically
// by the space registry and not tied to a specific feature domain.

import React from 'react';
import { useThemeMode } from '../theme/ThemeProvider';

export interface SpaceIconProps {
  size?: number;
  title?: string;
}

export const AccessIcon: React.FC<SpaceIconProps> = ({ size = 40, title = 'Access' }) => {
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
};

export const ManageIcon: React.FC<SpaceIconProps> = ({ size = 40, title = 'Manage' }) => {
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
};

export const RiskIcon: React.FC<SpaceIconProps> = ({ size = 40, title = 'Detect and Respond' }) => {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const color1 = isLight ? '#F39200' : '#FEBB09';
  const color2 = isLight ? '#F3A714' : 'rgba(255,178,0,0.80)';
  const color3 = isLight ? '#FFEA00' : '#FFEA00';
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title}>
      <path d="M15.0001 17.9586C15.0001 17.1671 15.4669 16.45 16.1907 16.1297L26.0657 11.7596C26.5812 11.5314 27.169 11.5314 27.6844 11.7596L37.5594 16.1297C38.2832 16.45 38.7501 17.1671 38.7501 17.9586V22.3971C38.7501 27.1607 36.4874 31.6411 32.6538 34.4687L28.0622 37.8553C27.3564 38.3759 26.3937 38.3759 25.6879 37.8553L21.0964 34.4687C17.2627 31.6411 15.0001 27.1607 15.0001 22.3971V17.9586Z" fill={color3} />
      <path d="M1.24997 9.75058C1.24997 8.96534 1.70948 8.25275 2.42476 7.92876L16.3444 1.62378C16.8688 1.38621 17.4703 1.38621 17.9948 1.62378L31.9144 7.92876C32.6296 8.25275 33.0891 8.96534 33.0891 9.75058V18.7633C33.0891 23.7817 30.7346 28.5094 26.7294 31.533L18.3746 37.8403C17.6614 38.3787 16.6777 38.3787 15.9645 37.8403L7.60974 31.533C3.60451 28.5094 1.24997 23.7817 1.24997 18.7633V9.75058Z" fill={color2} />
      <path d="M26.0653 11.7695C26.5807 11.5414 27.1689 11.5414 27.6844 11.7695L33.0887 14.1611V18.7734C33.0886 23.7917 30.7345 28.5194 26.7293 31.543L21.9784 35.1289L21.0965 34.4785C17.263 31.651 15 27.1707 14.9998 22.4072V17.9687C14.9998 17.1774 15.4667 16.46 16.1903 16.1396L26.0653 11.7695Z" fill={color1} />
    </svg>
  );
};

export const AuditSpaceIcon: React.FC<SpaceIconProps> = ({ size = 40, title = 'Audit and Reports' }) => {
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
};

export const SetupIcon: React.FC<SpaceIconProps> = ({ size = 40, title = 'Setup' }) => {
  const { mode } = useThemeMode();
  const isLight = mode === 'light';
  const color1 = isLight ? '#8916F6' : '#A375FF';
  const layer2 = isLight ? 'rgba(172,89,255,0.82)' : 'rgba(151,95,255,0.82)';
  const color3 = isLight ? '#DCBCF6' : '#C0BBFF';
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={title}>
      <path d="M25.7789 12.0054C26.7855 11.5255 27.9558 11.5255 28.9624 12.0054L35.6372 15.1872C36.6522 15.671 37.3906 16.5902 37.6428 17.6837L39.281 24.7885C39.5343 25.8871 39.269 27.0409 38.5611 27.9196L33.958 33.6332C33.2573 34.5028 32.1991 35.0087 31.0805 35.0087H23.6608C22.5422 35.0087 21.484 34.5028 20.7833 33.6332L16.1802 27.9196C15.4723 27.0409 15.207 25.8871 15.4603 24.7885L17.0985 17.6837C17.3507 16.5902 18.0891 15.671 19.1041 15.1872L25.7789 12.0054Z" fill={color3} />
      <path fillRule="evenodd" clipRule="evenodd" d="M35.6856 19.4059C36.3506 17.3623 35.8852 15.1157 34.4646 13.5124L26.4853 4.50698C25.0647 2.9037 22.9048 2.1873 20.8191 2.62765L9.10408 5.10104C7.01841 5.54138 5.32387 7.07157 4.65879 9.1152L0.92308 20.5941C0.257997 22.6377 0.723407 24.8843 2.144 26.4876L10.1233 35.493C11.5439 37.0963 13.7039 37.8127 15.7895 37.3723L27.5046 34.899C29.5902 34.4586 31.2848 32.9284 31.9499 30.8848L35.6856 19.4059ZM15.9942 27.097C19.877 28.3848 24.0588 26.2512 25.3344 22.3314C26.6101 18.4116 24.4966 14.19 20.6138 12.9022C16.731 11.6144 12.5493 13.748 11.2736 17.6678C9.99792 21.5876 12.1114 25.8092 15.9942 27.097Z" fill={layer2} />
      <path d="M25.809 12.0491C26.8154 11.5695 27.9855 11.5695 28.992 12.0491L35.5118 15.1566C36.0912 16.494 36.1796 18.0202 35.7149 19.4481L31.9791 30.9265C31.314 32.9701 29.6201 34.5009 27.5344 34.9412L27.0069 35.0527H23.6905C22.572 35.0526 21.5133 34.5465 20.8127 33.6769L16.2106 27.9641C15.9747 27.6713 15.7891 27.347 15.6543 27.0053C15.7757 27.0528 15.8992 27.098 16.0244 27.1396C19.9071 28.4271 24.0887 26.2931 25.3644 22.3735C26.4455 19.0508 25.0908 15.5125 22.2883 13.7269L25.809 12.0491Z" fill={color1} />
    </svg>
  );
};

export const CommandCenterIcon: React.FC<SpaceIconProps> = ({ size = 40, title = 'Command Center' }) => {
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
};
