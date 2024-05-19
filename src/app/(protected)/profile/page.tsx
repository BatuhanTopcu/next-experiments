import Link from "next/link";

import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  return (
    <div>
      <h1>Profile</h1>
      <p>{JSON.stringify(session?.user)}</p>
      <div>
        <Link href="/">Home</Link>
      </div>
    </div>
  );
}
