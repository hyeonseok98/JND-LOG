import Image, { StaticImageData } from "next/image";

export interface AvatarProps {
  src: string | StaticImageData;
  alt?: string;
  size?: number;
  isLive?: boolean;
}

export default function Avatar({ src, alt = "profile image", size = 32, isLive = false }: AvatarProps) {
  return (
    <div
      className={`relative rounded-full overflow-hidden bg-gray-300 flex-none ${
        isLive ? "ring-2 ring-green-500" : "ring-1 ring-gray-400"
      }`}
      style={{ width: size, height: size, minWidth: size, minHeight: size }}
    >
      <Image src={src || "/logo/wave.png"} alt={alt} fill sizes={`${size}px`} className="object-cover" priority />
    </div>
  );
}
