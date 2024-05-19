"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  deleteUserResourceSchema,
  insertUserResourceSchema,
  updateUserResourceSchema,
  userResource,
} from "@/db/schemas";

import { authActionClient } from "./actionClient";

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
  });

export const updateUserResource = authActionClient
  .metadata({ actionName: "updateUserResource" })
  .schema(updateUserResourceSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    await db
      .update(userResource)
      .set(parsedInput)
      .where(and(eq(userResource.userId, userId), eq(userResource.id, parsedInput.id)))
      .execute();
  });

export const deleteUserResource = authActionClient
  .metadata({ actionName: "deleteUserResource" })
  .schema(deleteUserResourceSchema)
  .action(async ({ parsedInput, ctx: { userId } }) => {
    await db
      .delete(userResource)
      .where(and(eq(userResource.userId, userId), eq(userResource.id, parsedInput.id)))
      .execute();
  });
