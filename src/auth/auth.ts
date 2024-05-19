import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { z } from "zod";

import { db } from "@/db";
import { isDev } from "@/lib/env";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
  debug: isDev,
});

export const sessionSchemaWithId = z.object({
  user: z.object({
    id: z.string(),
  }),
});
