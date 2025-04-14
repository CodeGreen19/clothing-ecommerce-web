CREATE TABLE "verificationPhoneOtp" (
	"identifier" text NOT NULL,
	"otp" text NOT NULL,
	"expires" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "authenticator" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "verificationToken" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "authenticator" CASCADE;--> statement-breakpoint
DROP TABLE "verificationToken" CASCADE;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone_no" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "promotional_email" text;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_phone_no_unique" UNIQUE("phone_no");