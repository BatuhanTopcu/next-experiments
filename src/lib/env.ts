import "server-only";

import { loadEnvConfig } from "@next/env";
import { z } from "zod";

const dir = process.cwd();
loadEnvConfig(dir);

const envSchema = z.object({
  DATABASE_URL: z.string(),
  NODE_ENV: z.string(),
});

export type EnvConfig = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
export const isDev = env.NODE_ENV === "development";
