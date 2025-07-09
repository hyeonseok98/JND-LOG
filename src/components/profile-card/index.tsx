import Avatar, { AvatarProps } from "@/components/ui/avatar";

export interface ProfileCardProps extends Omit<AvatarProps, "size"> {
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizeStyles = {
  sm: {
    avatar: 26,
    text: "text-sm",
    spacing: "gap-2.5 px-2 py-1",
  },
  md: {
    avatar: 32,
    text: "text-base",
    spacing: "gap-3 px-3 py-1",
  },
  lg: {
    avatar: 40,
    text: "text-lg",
    spacing: "gap-4 px-4 py-2",
  },
} as const;

export default function ProfileCard({
  src,
  alt = "profile image",
  isLive = false,
  name,
  size = "md",
}: ProfileCardProps) {
  const { avatar, text, spacing } = sizeStyles[size];

  return (
    <div className={`flex items-center w-fit max-w-fit ${spacing}`}>
      <Avatar src={src} alt={alt} size={avatar} isLive={isLive} />
      <span className={`${text} font-semibold whitespace-nowrap`}>{name}</span>
    </div>
  );
}
