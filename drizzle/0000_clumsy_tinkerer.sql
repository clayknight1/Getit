-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" text DEFAULT 'MEMBER' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "list_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"quantity" numeric(8, 2) DEFAULT '1',
	"notes" text,
	"needed" boolean DEFAULT true,
	"purchased" boolean DEFAULT false,
	"purchased_by" integer,
	"purchased_at" timestamp with time zone,
	"is_optional" boolean DEFAULT false,
	"store_id" integer,
	"added_by" integer,
	"position" integer DEFAULT 0,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "stores" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"group_id" integer,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "group_members" (
	"user_id" integer NOT NULL,
	"group_id" integer NOT NULL,
	"role" text DEFAULT 'MEMBER',
	CONSTRAINT "group_members_pkey" PRIMARY KEY("user_id","group_id")
);
--> statement-breakpoint
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_purchased_by_fkey" FOREIGN KEY ("purchased_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "list_items" ADD CONSTRAINT "list_items_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stores" ADD CONSTRAINT "stores_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_members" ADD CONSTRAINT "group_members_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_list_items_added_by" ON "list_items" USING btree ("added_by" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_list_items_purchased" ON "list_items" USING btree ("purchased" bool_ops);--> statement-breakpoint
CREATE INDEX "idx_list_items_store_id" ON "list_items" USING btree ("store_id" int4_ops);--> statement-breakpoint
CREATE INDEX "idx_stores_group_id" ON "stores" USING btree ("group_id" int4_ops);
*/