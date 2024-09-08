import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DO $$ BEGIN
 CREATE TYPE "public"."enum_posts_related_links_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_posts_appearance" AS ENUM('button', 'link');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum__posts_v_version_related_links_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum__posts_v_version_appearance" AS ENUM('button', 'link');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_pages_related_links_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_pages_appearance" AS ENUM('button', 'link');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum__pages_v_version_related_links_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum__pages_v_version_appearance" AS ENUM('button', 'link');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_menus_items_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "public"."enum_menus_items_submenu_type" AS ENUM('reference', 'custom');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "posts_related_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_posts_related_links_type" DEFAULT 'reference',
	"new_tab" boolean,
	"url" varchar,
	"label" varchar
);

CREATE TABLE IF NOT EXISTS "_posts_v_version_related_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"type" "enum__posts_v_version_related_links_type" DEFAULT 'reference',
	"new_tab" boolean,
	"url" varchar,
	"label" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "pages_related_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_pages_related_links_type" DEFAULT 'reference',
	"new_tab" boolean,
	"url" varchar,
	"label" varchar
);

CREATE TABLE IF NOT EXISTS "_pages_v_version_related_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"type" "enum__pages_v_version_related_links_type" DEFAULT 'reference',
	"new_tab" boolean,
	"url" varchar,
	"label" varchar,
	"_uuid" varchar
);

CREATE TABLE IF NOT EXISTS "menus_items_submenu" (
	"_order" integer NOT NULL,
	"_parent_id" varchar NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_menus_items_submenu_type" DEFAULT 'reference',
	"new_tab" boolean,
	"url" varchar,
	"label" varchar
);

CREATE TABLE IF NOT EXISTS "menus_items" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "enum_menus_items_type" DEFAULT 'reference',
	"new_tab" boolean,
	"url" varchar,
	"label" varchar
);

CREATE TABLE IF NOT EXISTS "menus" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" varchar,
	"label" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "menus_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"pages_id" integer,
	"posts_id" integer
);

ALTER TABLE "posts" ADD COLUMN "appearance" "enum_posts_appearance" DEFAULT 'button';
ALTER TABLE "posts" ADD COLUMN "url" varchar;
ALTER TABLE "_posts_v" ADD COLUMN "version_appearance" "enum__posts_v_version_appearance" DEFAULT 'button';
ALTER TABLE "_posts_v" ADD COLUMN "version_url" varchar;
ALTER TABLE "pages" ADD COLUMN "appearance" "enum_pages_appearance" DEFAULT 'button';
ALTER TABLE "pages" ADD COLUMN "url" varchar;
ALTER TABLE "_pages_v" ADD COLUMN "version_appearance" "enum__pages_v_version_appearance" DEFAULT 'button';
ALTER TABLE "_pages_v" ADD COLUMN "version_url" varchar;
DO $$ BEGIN
 ALTER TABLE "posts_related_links" ADD CONSTRAINT "posts_related_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_posts_v_version_related_links" ADD CONSTRAINT "_posts_v_version_related_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "pages_related_links" ADD CONSTRAINT "pages_related_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "_pages_v_version_related_links" ADD CONSTRAINT "_pages_v_version_related_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_items_submenu" ADD CONSTRAINT "menus_items_submenu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menus_items"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_items" ADD CONSTRAINT "menus_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."menus"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "menus_rels" ADD CONSTRAINT "menus_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE INDEX IF NOT EXISTS "posts_related_links_order_idx" ON "posts_related_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "posts_related_links_parent_id_idx" ON "posts_related_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_posts_v_version_related_links_order_idx" ON "_posts_v_version_related_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_posts_v_version_related_links_parent_id_idx" ON "_posts_v_version_related_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "pages_related_links_order_idx" ON "pages_related_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "pages_related_links_parent_id_idx" ON "pages_related_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "_pages_v_version_related_links_order_idx" ON "_pages_v_version_related_links" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "_pages_v_version_related_links_parent_id_idx" ON "_pages_v_version_related_links" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_items_submenu_order_idx" ON "menus_items_submenu" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "menus_items_submenu_parent_id_idx" ON "menus_items_submenu" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_items_order_idx" ON "menus_items" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "menus_items_parent_id_idx" ON "menus_items" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "menus_slug_idx" ON "menus" USING btree ("slug");
CREATE INDEX IF NOT EXISTS "menus_created_at_idx" ON "menus" USING btree ("created_at");
CREATE INDEX IF NOT EXISTS "menus_rels_order_idx" ON "menus_rels" USING btree ("order");
CREATE INDEX IF NOT EXISTS "menus_rels_parent_idx" ON "menus_rels" USING btree ("parent_id");
CREATE INDEX IF NOT EXISTS "menus_rels_path_idx" ON "menus_rels" USING btree ("path");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`
 DROP TABLE "posts_related_links";
DROP TABLE "_posts_v_version_related_links";
DROP TABLE "pages_related_links";
DROP TABLE "_pages_v_version_related_links";
DROP TABLE "menus_items_submenu";
DROP TABLE "menus_items";
DROP TABLE "menus";
DROP TABLE "menus_rels";
ALTER TABLE "posts" DROP COLUMN IF EXISTS "appearance";
ALTER TABLE "posts" DROP COLUMN IF EXISTS "url";
ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_appearance";
ALTER TABLE "_posts_v" DROP COLUMN IF EXISTS "version_url";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "appearance";
ALTER TABLE "pages" DROP COLUMN IF EXISTS "url";
ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_appearance";
ALTER TABLE "_pages_v" DROP COLUMN IF EXISTS "version_url";`)
}
