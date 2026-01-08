import MemberCard from "@/app/components/MemberCard/MemberCard";
import { getMembers } from "@/app/lib/members";

export default async function MembersPage() {
  const members = await getMembers();
  return (
    <div>
      {members.map((member: any) => (
        <MemberCard
          key={member.user.id}
          name={member.user.name}
          email={member.user.email}
          createdAt={member.user.createdAt}
        ></MemberCard>
      ))}
    </div>
  );
}
