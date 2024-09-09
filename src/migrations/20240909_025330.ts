import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "media" ADD COLUMN "sizes_desktop_url" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_desktop_width" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_desktop_height" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_desktop_mime_type" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_desktop_filesize" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_desktop_filename" varchar;
CREATE INDEX IF NOT EXISTS "media_sizes_desktop_sizes_desktop_filename_idx" ON "media" USING btree ("sizes_desktop_filename");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP INDEX IF EXISTS "media_sizes_desktop_sizes_desktop_filename_idx";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_desktop_url";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_desktop_width";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_desktop_height";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_desktop_mime_type";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_desktop_filesize";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_desktop_filename";`)
}
