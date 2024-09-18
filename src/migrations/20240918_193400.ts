import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DO $$ BEGIN
   CREATE TYPE "public"."enum_payment_links_type" AS ENUM('donate');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   CREATE TYPE "public"."enum_payment_links_submit_type" AS ENUM('book', 'donate', 'pay');
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE TABLE IF NOT EXISTS "payment_links_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"custom_price" boolean DEFAULT true,
  	"value" numeric,
  	"product_id" varchar,
  	"price_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "payment_links" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"type" "enum_payment_links_type" DEFAULT 'donate',
  	"payment_link_id" varchar,
  	"payment_link_url" varchar,
  	"submitType" "enum_payment_links_submit_type" DEFAULT 'donate',
  	"redirect" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "payment_links_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  DO $$ BEGIN
   ALTER TABLE "payment_links_products" ADD CONSTRAINT "payment_links_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."payment_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payment_links_texts" ADD CONSTRAINT "payment_links_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payment_links"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payment_links_products_order_idx" ON "payment_links_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "payment_links_products_parent_id_idx" ON "payment_links_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "payment_links_created_at_idx" ON "payment_links" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "payment_links_texts_order_parent_idx" ON "payment_links_texts" USING btree ("order","parent_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   DROP TABLE "payment_links_products";
  DROP TABLE "payment_links";
  DROP TABLE "payment_links_texts";`)
}
