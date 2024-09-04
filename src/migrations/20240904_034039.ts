import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "posts" ADD COLUMN "image_id" integer;
ALTER TABLE "_posts_v" ADD COLUMN "version_image_id" integer;
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "posts" DROP CONSTRAINT "posts_image_id_media_id_fk";

ALTER TABLE "_posts_v" DROP CONSTRAINT "_posts_v_version_image_id_media_id_fk";

ALTER TABLE "posts" DROP COLUMN IF EXISTS "image_id";
ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_image_id";`)
}
