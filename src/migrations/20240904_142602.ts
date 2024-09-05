import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "posts" ADD COLUMN "description" varchar;
ALTER TABLE "_posts_v" ADD COLUMN "version_description" varchar;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "posts" DROP COLUMN IF EXISTS "description";
ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_description";`)
}
