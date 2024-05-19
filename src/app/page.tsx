import Link from "next/link";

import { auth } from "@/auth";

import { LogOutButton, LoginButton } from "@/components/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      {session ? (
        <>
          <p>Hello, {session.user?.name}</p>
          <Link href="/profile">
            <button>Profile</button>
          </Link>
          <Link href="/resources">
            <div>Resources</div>
          </Link>
          <LogOutButton />
        </>
      ) : (
        <>
          <LoginButton />
        </>
      )}
    </div>
  );
}
