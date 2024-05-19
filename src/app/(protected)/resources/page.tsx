import { eq } from "drizzle-orm";

import { auth, sessionSchemaWithId } from "@/auth";
import { db } from "@/db";
import { userResource } from "@/db/schemas";

import { CreateResourceDialog } from "./components/CreateResourceDialog";
import { ResourceCard } from "./components/ResourceCard";

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
        <div className="grid grid-cols-1 gap-4 px-4 py-2 md:grid-cols-2 lg:grid-cols-3">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div>No resources</div>
      )}

      <CreateResourceDialog />
    </div>
  );
}
