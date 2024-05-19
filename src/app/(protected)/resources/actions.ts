"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { authActionClient } from "@/actions";
import { db } from "@/db";
import { insertUserResourceSchema, userResource } from "@/db/schemas";

export const createUserResource = authActionClient
  .metadata({ actionName: "createUserResource" })
  .schema(insertUserResourceSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    await db
      .insert(userResource)
      .values({
        userId,
        ...parsedInput,
      })
      .execute();

    revalidatePath("/resources");
  });

export const deleteUserResource = authActionClient
  .metadata({ actionName: "deleteUserResource" })
  .schema(z.string())
  .action(async ({ parsedInput, ctx: { userId } }) => {
    await db
      .delete(userResource)
      .where(and(eq(userResource.userId, userId), eq(userResource.id, parsedInput)))
      .execute();

    revalidatePath("/resources");
  });

export const updateUserResource = authActionClient
  .metadata({ actionName: "updateUserResource" })
  .schema(z.object({ id: z.string(), name: z.string().min(8).max(255) }))
  .action(async ({ parsedInput, ctx: { userId } }) => {
    await db
      .update(userResource)
      .set({ name: parsedInput.name })
      .where(and(eq(userResource.userId, userId), eq(userResource.id, parsedInput.id)))
      .execute();

    revalidatePath("/resources");
  });
