import type { IconType } from 'react-icons';
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid } from 'react-icons/fa';
import { MdPhoneIphone } from 'react-icons/md';
import { SiNokia } from 'react-icons/si';
import { BsGlobe } from 'react-icons/bs';
import type { Platform } from '../entities';

interface Props {
  platforms: Platform[];
}

const PlatformIconList = ({ platforms }: Props) => {
  const iconMap: Record<string, IconType> = {
    pc: FaWindows,
    playstation: FaPlaystation,
    xbox: FaXbox,
    nintendo: SiNokia,
    mac: FaApple,
    linux: FaLinux,
    android: FaAndroid,
    ios: MdPhoneIphone,
    web: BsGlobe,
  };

  return (
    <div className="platform-icons">
      {platforms.map((platform) => {
        const Icon = iconMap[platform.slug];
        if (!Icon) return null; // slug necunoscut → sar peste, fără crash
        return <Icon key={platform.id} className="platform-icon" />;
      })}
    </div>
  );
};

export default PlatformIconList;