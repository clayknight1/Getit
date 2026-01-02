import SignInClient from "./SignInClient";
export default async function SignIn({
  searchParams,
}: {
  searchParams: { inviteCode?: string };
}) {
  const inviteCode = (await searchParams.inviteCode) ?? null;

  return <SignInClient inviteCode={inviteCode}></SignInClient>;
}
