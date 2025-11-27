ALTER TABLE "list_items" 
  ALTER COLUMN "quantity" TYPE integer USING quantity::numeric::integer;
--> statement-breakpoint
ALTER TABLE "list_items" 
  ALTER COLUMN "quantity" SET DEFAULT 1;