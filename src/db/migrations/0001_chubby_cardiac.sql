ALTER TABLE "tickets" RENAME COLUMN "customers_id" TO "customer_id";--> statement-breakpoint
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_customers_id_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id") ON DELETE no action ON UPDATE no action;