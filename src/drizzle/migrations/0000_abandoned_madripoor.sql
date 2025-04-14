CREATE TYPE "public"."cod_options" AS ENUM('Avilable', 'Not avilable');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('Male', 'Female', 'Unisex');--> statement-breakpoint
CREATE TYPE "public"."productQualification" AS ENUM('New Arrived', 'Best Seller', 'Premium', 'Limited Edition', 'Trending', 'Exclusive', 'Hot Deal', 'Customer Favorite', 'Editor''s Pick', 'Top Rated', 'Luxury', 'Eco-Friendly', 'Handmade', 'Budget-Friendly', 'Seasonal', 'Limited Stock', 'Imported', 'Organic', 'High Demand', 'Fast Selling');--> statement-breakpoint
CREATE TYPE "public"."return_time" AS ENUM('7 days', '14 days');--> statement-breakpoint
CREATE TYPE "public"."size" AS ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL');--> statement-breakpoint
CREATE TYPE "public"."warranty" AS ENUM('Avilable', 'Not avilable');--> statement-breakpoint
CREATE TABLE "colors_and_stock" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"color" text NOT NULL,
	"tailwind" text NOT NULL,
	"stock" integer NOT NULL,
	"size_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "des_bulletin" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"text" text NOT NULL,
	"product_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "images" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"secure_url" text NOT NULL,
	"public_id" text NOT NULL,
	"color_and_stock_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"descriptions" text NOT NULL,
	"total_stock" integer NOT NULL,
	"qualification" "productQualification"[],
	"gender" "gender" NOT NULL,
	"category" text NOT NULL,
	"material" text NOT NULL,
	"sub_category" text NOT NULL,
	"main_img_url" text DEFAULT 'https://img.drz.lazcdn.com/static/bd/p/f4a90ab802cab10f6ecebd7f4a0758b7.jpg_400x400q80.jpg_.webp' NOT NULL,
	"original_price" integer NOT NULL,
	"given_price" integer NOT NULL,
	"discount_percent" integer NOT NULL,
	"final_price" integer NOT NULL,
	"dhaka_price" integer NOT NULL,
	"out_dhaka_price" integer NOT NULL,
	"warranty" "warranty" NOT NULL,
	"codoptions" "cod_options" NOT NULL,
	"returnTime" "return_time" NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "products_name_unique" UNIQUE("name"),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "sizes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"size" "size" NOT NULL,
	"product_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "colors_and_stock" ADD CONSTRAINT "colors_and_stock_size_id_sizes_id_fk" FOREIGN KEY ("size_id") REFERENCES "public"."sizes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "des_bulletin" ADD CONSTRAINT "des_bulletin_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "images" ADD CONSTRAINT "images_color_and_stock_id_colors_and_stock_id_fk" FOREIGN KEY ("color_and_stock_id") REFERENCES "public"."colors_and_stock"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sizes" ADD CONSTRAINT "sizes_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "slug_idx" ON "products" USING btree ("slug");