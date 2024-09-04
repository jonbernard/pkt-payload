import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "members" ADD COLUMN "image_id" integer;
DO $$ BEGIN
 ALTER TABLE "members" ADD CONSTRAINT "members_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "members" DROP CONSTRAINT "members_image_id_media_id_fk";

ALTER TABLE "members" DROP COLUMN IF EXISTS "image_id";`)
}
