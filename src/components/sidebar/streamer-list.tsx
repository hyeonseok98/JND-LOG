import ProfileCard from "@/components/profile-card";
import Avatar from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface StreamerProps {
  opened: boolean;
  loading: boolean;
  name: string;
  avatar: StaticImageData;
  isLive?: boolean;
  thumbnailUrl?: string | null;
  channelId: string;
}

export default function StreamerList({
  opened,
  loading,
  name,
  avatar,
  isLive,
  thumbnailUrl,
  channelId,
}: StreamerProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={`https://chzzk.naver.com/live/${channelId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          {opened ? (
            <div>
              <ProfileCard src={avatar} name={name} size="sm" isLive={isLive} />
            </div>
          ) : (
            <div>
              <Avatar src={avatar} alt={name} size={28} isLive={isLive} />
            </div>
          )}
        </Link>
      </TooltipTrigger>

      <TooltipContent side="right" sideOffset={14} className="p-0 border-none">
        <div className="w-48 p-2 rounded-md bg-dark text-white">
          <p className="mb-1 text-center text-xs font-medium">{name}</p>

          {loading ? (
            <Placeholder>로딩 중…</Placeholder>
          ) : isLive && thumbnailUrl ? (
            <Image
              src={thumbnailUrl.replace("{type}", "360")}
              alt={`${name} 라이브 썸네일`}
              width={192}
              height={108}
              className="rounded-md object-cover"
              priority
            />
          ) : (
            <Placeholder>오프라인</Placeholder>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

const Placeholder = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center h-[108px] rounded-md bg-gray-400 text-xs">{children}</div>
);
