import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "payment_links" ALTER COLUMN "redirect" DROP NOT NULL;
  ALTER TABLE "payment_links" ADD COLUMN "use_link" boolean DEFAULT false;
  ALTER TABLE "payment_links" ADD COLUMN "link" varchar;`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "payment_links" ALTER COLUMN "redirect" SET NOT NULL;
  ALTER TABLE "payment_links" DROP COLUMN IF EXISTS "use_link";
  ALTER TABLE "payment_links" DROP COLUMN IF EXISTS "link";`)
}
