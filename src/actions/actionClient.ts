import { DEFAULT_SERVER_ERROR_MESSAGE, createSafeActionClient } from "next-safe-action";
import { z } from "zod";

import { auth, sessionSchemaWithId } from "@/auth";

class ActionError extends Error {}

const actionMetadataSchema = z.object({
  actionName: z.string(),
});

export const baseActionClient = createSafeActionClient({
  handleReturnedServerError: (e) => {
    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema: () => actionMetadataSchema,
});

export const authActionClient = baseActionClient
  .use(async ({ next }) => {
    const session = await auth();

    const parsedSession = sessionSchemaWithId.parse(session);

    return next({ ctx: { userId: parsedSession.user.id } });
  })
  .use(async ({ next, clientInput, metadata, ctx }) => {
    const startTime = performance.now();
    const result = await next({ ctx });
    const endTime = performance.now();

    console.log({
      name: "private_action_log",
      metadata,
      userId: ctx.userId,
      clientInput,
      result,
      duration: `${(endTime - startTime).toFixed(2)}ms`,
    });

    return result;
  });

export const publicActionClient = baseActionClient.use(
  async ({ next, clientInput, metadata, ctx }) => {
    const startTime = performance.now();
    const result = await next({ ctx });
    const endTime = performance.now();

    console.log({
      name: "public_action_log",
      metadata,
      clientInput,
      result,
      duration: `${endTime - startTime}ms`,
    });

    return result;
  }
);
