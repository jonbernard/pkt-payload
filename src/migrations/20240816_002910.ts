import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "members_spouse" ALTER COLUMN "current" SET DEFAULT true;
ALTER TABLE "members" ALTER COLUMN "prefix" SET DEFAULT 'Mr';
ALTER TABLE "members" ALTER COLUMN "subscribed" SET DEFAULT true;
ALTER TABLE "members" ALTER COLUMN "lost" SET DEFAULT false;
ALTER TABLE "members" ALTER COLUMN "dead" SET DEFAULT false;
ALTER TABLE "members" ALTER COLUMN "hrog" SET DEFAULT false;
ALTER TABLE "posts" ALTER COLUMN "_status" SET DEFAULT 'draft';
ALTER TABLE "_posts_v" ALTER COLUMN "version__status" SET DEFAULT 'draft';
ALTER TABLE "users" ALTER COLUMN "login_attempts" SET DEFAULT 0;
CREATE INDEX IF NOT EXISTS "posts__status_idx" ON "posts" USING btree ("_status");
CREATE INDEX IF NOT EXISTS "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP INDEX IF EXISTS "posts__status_idx";
DROP INDEX IF EXISTS "_posts_v_version_version__status_idx";
ALTER TABLE "members_spouse" ALTER COLUMN "current" DROP DEFAULT;
ALTER TABLE "members" ALTER COLUMN "prefix" DROP DEFAULT;
ALTER TABLE "members" ALTER COLUMN "subscribed" DROP DEFAULT;
ALTER TABLE "members" ALTER COLUMN "lost" DROP DEFAULT;
ALTER TABLE "members" ALTER COLUMN "dead" DROP DEFAULT;
ALTER TABLE "members" ALTER COLUMN "hrog" DROP DEFAULT;
ALTER TABLE "posts" ALTER COLUMN "_status" DROP DEFAULT;
ALTER TABLE "_posts_v" ALTER COLUMN "version__status" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "login_attempts" DROP DEFAULT;`)
}
