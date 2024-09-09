import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "pages" DROP COLUMN IF EXISTS "short_title";
ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_short_title";`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "pages" ADD COLUMN "short_title" varchar;
ALTER TABLE "_pages_v" ADD COLUMN "version_short_title" varchar;`)
}
