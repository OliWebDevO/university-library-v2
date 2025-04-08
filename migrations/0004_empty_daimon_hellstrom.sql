ALTER TABLE "borrow_records" DROP CONSTRAINT "borrow_records_book_title_books_title_fk";
--> statement-breakpoint
ALTER TABLE "borrow_records" DROP CONSTRAINT "borrow_records_book_author_books_author_fk";
--> statement-breakpoint
ALTER TABLE "borrow_records" DROP COLUMN "book_title";--> statement-breakpoint
ALTER TABLE "borrow_records" DROP COLUMN "book_author";