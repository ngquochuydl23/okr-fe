import { Avatar as RadixAvatar } from '@radix-ui/themes';
import './avatar.scss';

interface AvatarProps {
  size?: '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
}

export const Avatar = ({ 
  size = '3', 
  src, 
  alt = 'Avatar',
  fallback,
  className = '' 
}: AvatarProps) => {
  return (
    <RadixAvatar
      size={size}
      src={src}
      alt={alt}
      fallback={fallback}
      className={`custom-avatar ${className}`}
    />
  );
};
