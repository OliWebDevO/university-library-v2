import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { Button } from '@/components/ui/button';
import { db } from '@/database/drizzle';
import { borrowRecords, books, users } from '@/database/schema';
import { desc, eq } from 'drizzle-orm';
import React from 'react';
import { approveUser, revertUser } from '@/lib/actions/userActions'; // Import the actions
import { auth } from '@/auth'; // Import auth to fetch session
import { redirect } from 'next/navigation'; // Import redirect from next/navigation

const page = async () => {
  const session = await auth(); // Fetch the session to get the logged-in user's ID

  if (!session || !session.user?.id) {
    return <p>You must be logged in to view this page.</p>;
  }

  const userId = session.user?.id; // Get the user ID from the session

  // Fetch the borrowed books for the logged-in user
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
    .where(eq(borrowRecords.userId, userId)) // Filter by the logged-in user's ID
    .orderBy(desc(borrowRecords.createdAt))
    .limit(10);

  // Fetch the current user's status
  const currentUser = await db
    .select({
      id: users.id,
      status: users.status,
    })
    .from(users)
    .where(eq(users.id, userId)) // Use the actual user ID
    .limit(1);

  return (
    <div className='w-[80vw] md:w-[92vw] flex flex-col items-start justify-start'>
      <div className='flex items-start justify-start gap-4'>
        <form
          action={async () => {
            'use server';
            await signOut();
            redirect('/my-profile'); // Redirect to the same page after logout
          }}
          className="mb-10"
        >
          <Button>Logout</Button>
        </form>
        {/* Button to toggle user status */}
        {currentUser[0]?.status === 'pending' ? (
          <form
            action={async () => {
              'use server';
              await approveUser(currentUser[0].id); // Call the approveUser action
              redirect('/'); // Redirect to the home page
            }}
          >
            <Button>Approve Membership</Button>
          </form>
        ) : (
          <form
            action={async () => {
              'use server';
              await revertUser(currentUser[0].id); // Call the revertUser action
              redirect('/'); // Redirect to the home page
            }}
          >
            <Button>Disapprove Membership</Button>
          </form>
        )}
        {/* Show the user's current status */}
        {/* <p className="text-light-300">Current Status: {currentUser[0]?.status}</p> */}
      </div>

      {/* Borrowed Books List */}
      {borrowedBooks.length > 0 ? (
        <BookList title="Borrowed books" books={borrowedBooks} />
      ) : (
        <p className="mt-4 text-light-100">You have not borrowed any books yet.</p>
      )}
    </div>
  );
};

export default page;