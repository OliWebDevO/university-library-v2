

import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import { db } from '@/database/drizzle';
import { borrowRecords, books } from '@/database/schema';
import { desc, eq } from 'drizzle-orm';
import React from 'react';

const page = async () => {
  const borrowedBooks = await db
      .select({
          id: books.id,
          title: books.title,
          author: books.author,
          coverUrl: books.coverUrl,
          coverColor: books.coverColor,
          borrowDate: borrowRecords.borrowDate,
          dueDate: borrowRecords.dueDate,
          status: borrowRecords.status,
      })
      .from(borrowRecords)
      .innerJoin(books, eq(borrowRecords.bookId, books.id)) // Join with books table
      .orderBy(desc(borrowRecords.createdAt))
      .limit(10);

  return (
    <div className='w-[92vw]  flex flex-col items-start justify-start'>
        <form
            action={async () => {
              'use server';
                await signOut();
            }}
            className="mb-10"
        >
            <Button>Logout</Button>
        </form>
        <BookList title="Borrowed books" books={borrowedBooks} />
    </div>
  );
};

export default page;