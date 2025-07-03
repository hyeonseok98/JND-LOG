import hejing from "@/assets/images/player-profile/mid/mid-헤징-default.webp";
import Avatar from "@/components/ui/avatar";

export default function HomePage() {
  return (
    <div>
      main page
      <Avatar src={hejing} alt="헤징 프로필 이미지" size={32} isLive={true} />
    </div>
  );
}
