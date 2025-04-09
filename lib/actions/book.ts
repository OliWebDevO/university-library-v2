
'use server'
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { and, eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
    const { bookId, userId } = params;

    try {
        // Check if the user has already borrowed this book
        const existingRecord = await db
            .select()
            .from(borrowRecords)
            .where(and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, bookId)))
            .limit(1);

        if (existingRecord.length > 0) {
            return {
                success: false,
                message: 'You have already borrowed this book.',
            };
        }

        // Check if the book is available for borrowing
        const book = await db
            .select({ availableCopies: books.availableCopies })
            .from(books)
            .where(eq(books.id, bookId))
            .limit(1);

        if (!book.length || book[0].availableCopies <= 0) {
            return {
                success: false,
                message: 'Book not available for borrowing.',
            };
        }

        // Calculate the due date (7 days from now)
        const dueDate = dayjs().add(7, 'day').toDate();

        // Insert the borrow record
        await db.insert(borrowRecords).values({
            userId,
            bookId,
            borrowDate: new Date(),
            dueDate,
            status: 'borrow',
        });

        // Update the available copies of the book
        await db
            .update(books)
            .set({ availableCopies: book[0].availableCopies - 1 })
            .where(eq(books.id, bookId));

        return {
            success: true,
            message: 'Book borrowed successfully.',
        };
    } catch (error) {
        console.error('Error borrowing book:', error);

        return {
            success: false,
            message: 'An error occurred while borrowing the book.',
        };
    }
};


export const cancelBorrowBook = async (params: { bookId: string; userId: string }) => {
    const { bookId, userId } = params;

    try {
        // Check if the borrow record exists
        const existingRecord = await db
            .select()
            .from(borrowRecords)
            .where(and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, bookId)))
            .limit(1);

        if (existingRecord.length === 0) {
            return {
                success: false,
                message: 'You have not borrowed this book.',
            };
        }

        // Delete the borrow record
        await db
            .delete(borrowRecords)
            .where(and(eq(borrowRecords.userId, userId), eq(borrowRecords.bookId, bookId)));

        // Increment the available copies of the book
        const book = await db
            .select({ availableCopies: books.availableCopies })
            .from(books)
            .where(eq(books.id, bookId))
            .limit(1);

        if (book.length > 0) {
            await db
                .update(books)
                .set({ availableCopies: book[0].availableCopies + 1 })
                .where(eq(books.id, bookId));
        }

        return {
            success: true,
            message: 'Book unborrowed successfully.',
        };
    } catch (error) {
        console.error('Error unborrowing book:', error);

        return {
            success: false,
            message: 'An error occurred while unborrowing the book.',
        };
    }
};





//Previous version of the borrowBook function

// export const borrowBook = async (params: BorrowBookParams) => {
//     const { bookId, userId } = params;

//     try {
//         const book = await db
//             .select({availableCopies: books.availableCopies})
//             .from(books)
//             .where(eq(books.id, bookId))
//             .limit(1)

//         if (!book.length || book[0].availableCopies <= 0) {
//             return {
//                 success: false,
//                 message: 'Book not available for borrowing',
//             }
//         }

//         const dueDate = dayjs().add(7, 'day').toDate().toDateString();

//         const record = db.insert(borrowRecords).values({
//             userId,
//             bookId,
//             dueDate,
//             status: 'borrow',
//         }); 

//         await db
//             .update(books)
//             .set({availableCopies: book[0].availableCopies - 1})
//             .where(eq(books.id, bookId))

//             return {
//                 success: true,
//                 // date: JSON.parse(JSON.stringify(record)),
//                 date: record,
//             }

//     } catch (error) {
//         console.error('Error borrowing book ', error);
        
//         return {
//             success: false,
//             message: 'An error occured while borrowing book',
//         }
//     }
// }