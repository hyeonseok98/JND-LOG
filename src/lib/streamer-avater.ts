import { StreamerInfos } from "@/constants/streamers";

// member 중 name + avatar 만 Pick
type AllMember = (typeof StreamerInfos)[number]["members"][number];
export type NameAvatar = Pick<AllMember, "name" | "avatar">;

const simpleList: NameAvatar[] = StreamerInfos.flatMap((line) =>
  line.members.map(({ name, avatar }) => ({ name, avatar })),
);

// { "name" : avater } 형태로 변환
const avatarMap = simpleList.reduce<Record<string, any>>((acc, cur) => ({ ...acc, [cur.name]: cur.avatar }), {});

export const getAvatarByName = (name: string) => avatarMap[name];
