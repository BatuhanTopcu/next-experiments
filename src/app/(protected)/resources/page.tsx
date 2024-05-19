import { eq } from "drizzle-orm";

import { auth, sessionSchemaWithId } from "@/auth";
import { db } from "@/db";
import { userResource } from "@/db/schemas";

import CreateResourceForm from "./components/CreateResourceForm";

export default async function Page() {
  const session = sessionSchemaWithId.parse(await auth());
  const userId = session.user.id;

  const resources = await db
    .select()
    .from(userResource)
    .where(eq(userResource.userId, userId))
    .execute();

  return (
    <div>
      <h1>Resources</h1>
      {resources.length > 0 ? (
        <ul>
          {resources.map((resource) => (
            <li key={resource.id}>{resource.name}</li>
          ))}
        </ul>
      ) : (
        <div>No resources</div>
      )}

      <CreateResourceForm />
    </div>
  );
}
