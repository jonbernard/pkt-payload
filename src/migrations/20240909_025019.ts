import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "posts" ADD COLUMN "meta_title" varchar;
ALTER TABLE "posts" ADD COLUMN "meta_description" varchar;
ALTER TABLE "_posts_v" ADD COLUMN "version_meta_title" varchar;
ALTER TABLE "_posts_v" ADD COLUMN "version_meta_description" varchar;
ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
ALTER TABLE "_pages_v" ADD COLUMN "version_meta_title" varchar;
ALTER TABLE "_pages_v" ADD COLUMN "version_meta_description" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_url" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_width" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_height" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_mime_type" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filesize" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filename" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_card_url" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_card_width" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_card_height" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_card_mime_type" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_card_filesize" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_card_filename" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_tablet_url" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_tablet_width" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_tablet_height" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_tablet_mime_type" varchar;
ALTER TABLE "media" ADD COLUMN "sizes_tablet_filesize" numeric;
ALTER TABLE "media" ADD COLUMN "sizes_tablet_filename" varchar;
CREATE INDEX IF NOT EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
CREATE INDEX IF NOT EXISTS "media_sizes_tablet_sizes_tablet_filename_idx" ON "media" USING btree ("sizes_tablet_filename");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP INDEX IF EXISTS "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
DROP INDEX IF EXISTS "media_sizes_card_sizes_card_filename_idx";
DROP INDEX IF EXISTS "media_sizes_tablet_sizes_tablet_filename_idx";
ALTER TABLE "posts" DROP COLUMN IF EXISTS "meta_title";
ALTER TABLE "posts" DROP COLUMN IF EXISTS "meta_description";
ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_meta_title";
ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_meta_description";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_title";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "meta_description";
ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_title";
ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_meta_description";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_url";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_width";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_height";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_mime_type";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filesize";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_filename";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_url";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_width";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_height";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_mime_type";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filesize";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filename";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_tablet_url";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_tablet_width";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_tablet_height";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_tablet_mime_type";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_tablet_filesize";
ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_tablet_filename";`)
}
