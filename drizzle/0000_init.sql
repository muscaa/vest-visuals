CREATE TYPE "public"."album_archive_status" AS ENUM('idle', 'building', 'failed');--> statement-breakpoint
CREATE TYPE "public"."album_entry_type" AS ENUM('directory', 'media');--> statement-breakpoint
CREATE TYPE "public"."album_status" AS ENUM('draft', 'published');--> statement-breakpoint
CREATE TYPE "public"."upload_status" AS ENUM('pending', 'uploaded', 'processing', 'done', 'failed');--> statement-breakpoint
CREATE TYPE "public"."upload_type" AS ENUM('asset', 'portfolio', 'album', 'album_video');--> statement-breakpoint
CREATE TABLE "album_entries" (
	"id" uuid PRIMARY KEY NOT NULL,
	"album_id" uuid NOT NULL,
	"parent_id" uuid,
	"position" integer NOT NULL,
	"type" "album_entry_type" NOT NULL,
	"name" text,
	"slug" text,
	"filename" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "album_entries_directory_or_media" CHECK (
        ("album_entries"."type" = 'directory' and "album_entries"."name" is not null and "album_entries"."slug" is not null and "album_entries"."filename" is null)
        or ("album_entries"."type" = 'media' and "album_entries"."name" is null and "album_entries"."slug" is null)
    )
);
--> statement-breakpoint
CREATE TABLE "album_entry_variants" (
	"entry_id" uuid NOT NULL,
	"variant" text NOT NULL,
	"content_type" text,
	"youtube_id" text,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "album_entry_variants_entry_id_variant_pk" PRIMARY KEY("entry_id","variant"),
	CONSTRAINT "album_entry_variants_file_or_youtube" CHECK (("album_entry_variants"."content_type" is null) <> ("album_entry_variants"."youtube_id" is null))
);
--> statement-breakpoint
CREATE TABLE "albums" (
	"id" uuid PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"date" date NOT NULL,
	"email" text,
	"cover_entry_id" uuid,
	"status" "album_status" DEFAULT 'draft' NOT NULL,
	"published_at" timestamp with time zone,
	"lock_at" timestamp with time zone,
	"delete_at" timestamp with time zone,
	"archive" jsonb,
	"archive_status" "album_archive_status" DEFAULT 'idle' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "albums_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "assets" (
	"key" text NOT NULL,
	"variant" text NOT NULL,
	"content_type" text NOT NULL,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "assets_key_variant_pk" PRIMARY KEY("key","variant")
);
--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	"impersonated_by" text,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "two_factor" (
	"id" text PRIMARY KEY NOT NULL,
	"secret" text NOT NULL,
	"backup_codes" text NOT NULL,
	"user_id" text NOT NULL,
	"verified" boolean DEFAULT true,
	"failed_verification_count" integer DEFAULT 0,
	"locked_until" timestamp
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"two_factor_enabled" boolean DEFAULT false,
	"role" text,
	"banned" boolean DEFAULT false,
	"ban_reason" text,
	"ban_expires" timestamp,
	"locale" text,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "uploads" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"type" "upload_type" NOT NULL,
	"data" jsonb NOT NULL,
	"filename" text NOT NULL,
	"content_type" text NOT NULL,
	"size" bigint NOT NULL,
	"status" "upload_status" DEFAULT 'pending' NOT NULL,
	"multipart_id" text NOT NULL,
	"workflow_run_id" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_categories" (
	"key" text PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_category_groups" (
	"category_key" text NOT NULL,
	"group_id" uuid NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT "portfolio_category_groups_category_key_group_id_pk" PRIMARY KEY("category_key","group_id")
);
--> statement-breakpoint
CREATE TABLE "portfolio_group_media" (
	"group_id" uuid NOT NULL,
	"media_id" uuid NOT NULL,
	"position" integer NOT NULL,
	CONSTRAINT "portfolio_group_media_group_id_media_id_pk" PRIMARY KEY("group_id","media_id")
);
--> statement-breakpoint
CREATE TABLE "portfolio_groups" (
	"id" uuid PRIMARY KEY NOT NULL,
	"location" text,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_media" (
	"id" uuid PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "portfolio_media_variants" (
	"media_id" uuid NOT NULL,
	"variant" text NOT NULL,
	"content_type" text,
	"youtube_id" text,
	"width" integer NOT NULL,
	"height" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "portfolio_media_variants_media_id_variant_pk" PRIMARY KEY("media_id","variant"),
	CONSTRAINT "portfolio_media_variants_file_or_youtube" CHECK (("portfolio_media_variants"."content_type" is null) <> ("portfolio_media_variants"."youtube_id" is null))
);
--> statement-breakpoint
ALTER TABLE "album_entries" ADD CONSTRAINT "album_entries_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "album_entries" ADD CONSTRAINT "album_entries_parent_id_album_entries_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."album_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "album_entry_variants" ADD CONSTRAINT "album_entry_variants_entry_id_album_entries_id_fk" FOREIGN KEY ("entry_id") REFERENCES "public"."album_entries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "albums" ADD CONSTRAINT "albums_cover_entry_id_album_entries_id_fk" FOREIGN KEY ("cover_entry_id") REFERENCES "public"."album_entries"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "two_factor" ADD CONSTRAINT "two_factor_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "uploads" ADD CONSTRAINT "uploads_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_category_groups" ADD CONSTRAINT "portfolio_category_groups_category_key_portfolio_categories_key_fk" FOREIGN KEY ("category_key") REFERENCES "public"."portfolio_categories"("key") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "portfolio_category_groups" ADD CONSTRAINT "portfolio_category_groups_group_id_portfolio_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."portfolio_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_group_media" ADD CONSTRAINT "portfolio_group_media_group_id_portfolio_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."portfolio_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_group_media" ADD CONSTRAINT "portfolio_group_media_media_id_portfolio_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."portfolio_media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "portfolio_media_variants" ADD CONSTRAINT "portfolio_media_variants_media_id_portfolio_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."portfolio_media"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "album_entries_slug_uidx" ON "album_entries" USING btree ("album_id",coalesce("parent_id", '00000000-0000-0000-0000-000000000000'::uuid),"slug") WHERE "album_entries"."slug" is not null;--> statement-breakpoint
CREATE INDEX "album_entries_parent_idx" ON "album_entries" USING btree ("album_id","parent_id","position");--> statement-breakpoint
CREATE INDEX "albums_email_idx" ON "albums" USING btree ("email");--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "twoFactor_secret_idx" ON "two_factor" USING btree ("secret");--> statement-breakpoint
CREATE INDEX "twoFactor_userId_idx" ON "two_factor" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "portfolio_category_groups_group_id_idx" ON "portfolio_category_groups" USING btree ("group_id");--> statement-breakpoint
CREATE INDEX "portfolio_group_media_media_id_idx" ON "portfolio_group_media" USING btree ("media_id");