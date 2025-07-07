import hejing from "@/assets/images/player-profile/mid/mid-헤징-default.webp";
import ProfileCard from "@/components/profile-card";
import Avatar from "@/components/ui/avatar";

export default function HomePage() {
  return (
    <div>
      main page
      <Avatar src={hejing} alt="헤징 프로필 이미지" size={32} isLive={true} />
      <ProfileCard src={hejing} name="헤징" size="lg" />
      <ProfileCard src={hejing} name="헤징" size="md" />
      <ProfileCard src={hejing} name="헤징" size="sm" />
    </div>
  );
}
