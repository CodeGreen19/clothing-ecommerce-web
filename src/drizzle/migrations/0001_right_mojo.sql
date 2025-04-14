ALTER TABLE "public"."products" ALTER COLUMN "codoptions" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."cod_options";--> statement-breakpoint
CREATE TYPE "public"."cod_options" AS ENUM('Available', 'Not available');--> statement-breakpoint
ALTER TABLE "public"."products" ALTER COLUMN "codoptions" SET DATA TYPE "public"."cod_options" USING "codoptions"::"public"."cod_options";--> statement-breakpoint
ALTER TABLE "public"."products" ALTER COLUMN "warranty" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."warranty";--> statement-breakpoint
CREATE TYPE "public"."warranty" AS ENUM('Available', 'Not available');--> statement-breakpoint
ALTER TABLE "public"."products" ALTER COLUMN "warranty" SET DATA TYPE "public"."warranty" USING "warranty"::"public"."warranty";