import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "users" ADD COLUMN "member_id" integer;
ALTER TABLE "users" ADD COLUMN "image_id" integer;
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 ALTER TABLE "users" DROP CONSTRAINT "users_member_id_members_id_fk";

ALTER TABLE "users" DROP CONSTRAINT "users_image_id_media_id_fk";

ALTER TABLE "users" DROP COLUMN IF EXISTS "member_id";
ALTER TABLE "users" DROP COLUMN IF EXISTS "image_id";`)
}
