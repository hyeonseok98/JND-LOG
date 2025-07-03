import Image, { StaticImageData } from "next/image";

type AvatarProps = {
  src: string | StaticImageData;
  alt?: string;
  size?: number;
  isLive?: boolean;
};

export default function Avatar({ src, alt = "profile image", size = 32, isLive = false }: AvatarProps) {
  return (
    <div className={`rounded-full ${isLive ? "ring-2 ring-green-500" : ""}`} style={{ width: size, height: size }}>
      <Image src={src} alt={alt} width={size} height={size} className="rounded-full object-cover" />
    </div>
  );
}
