import { redirect } from "next/navigation";

import { auth, sessionSchemaWithId } from "@/auth";

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  const result = sessionSchemaWithId.safeParse(session);

  if (!result.success) {
    return redirect(
      "http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F"
    );
  }

  return children;
}
